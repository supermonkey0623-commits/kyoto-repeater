'use client';

// みんなの投稿。Supabase の kyoto_posts テーブルを直接読み書きする。
//
// キーについて:
//   publishable key はブラウザに出す前提で発行される公開鍵。
//   秘密は行レベルセキュリティ(RLS)側で守る設計になっている。
//   - 読み取り: 誰でも可
//   - 追加: 誰でも可（文字数と画像サイズに上限）
//   - 更新・削除: ポリシーを作っていないので誰もできない
//   - 「✨新しい」の加算だけ、本文を書き換えられない関数経由で許可
//
// SDKは入れずに fetch で叩く。依存を増やさないため。

import type { Post } from './posts';

const URL = 'https://fbzdratrelvtaavoqzle.supabase.co';
const KEY = 'sb_publishable_t-zX1HyBMU4_S8axVbaD4w_U-upnuqh';
const TABLE = `${URL}/rest/v1/kyoto_posts`;

const HEADERS = {
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  'Content-Type': 'application/json',
};

/** 自分が投稿したもののID。認証が無いので端末に覚えておく */
const MINE_KEY = 'kyoto-repeater/myPostIds';

export function getMyPostIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(MINE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function rememberMyPost(id: string): void {
  try {
    window.localStorage.setItem(
      MINE_KEY,
      JSON.stringify([id, ...getMyPostIds()])
    );
  } catch {
    // 覚えられなくても投稿自体は成功している
  }
}

export function isMyPost(id: string): boolean {
  return getMyPostIds().includes(id);
}

export type RemotePost = Post & {
  photoDataUrl?: string;
  lat?: number;
  lng?: number;
  reactions: number;
  createdAt: string;
};

type Row = {
  id: string;
  title: string;
  body: string;
  tag: string;
  area: string;
  place: string | null;
  map_query: string | null;
  categories: string[];
  is_indoor: boolean;
  minutes: number;
  budget: number;
  time_of_day: string[];
  who: string[];
  photo_data_url: string | null;
  lat: number | null;
  lng: number | null;
  author: string;
  reactions: number;
  created_at: string;
};

function toPost(r: Row): RemotePost {
  return {
    id: r.id,
    title: r.title,
    body: r.body,
    tag: r.tag,
    area: r.area,
    place: r.place ?? undefined,
    mapQuery: r.map_query ?? undefined,
    categories: r.categories as Post['categories'],
    isIndoor: r.is_indoor,
    minutes: r.minutes,
    budget: (r.budget as 0 | 1 | 2) ?? 0,
    timeOfDay: r.time_of_day as Post['timeOfDay'],
    who: r.who as Post['who'],
    author: r.author,
    costPt: 1,
    hasPhoto: Boolean(r.photo_data_url),
    photoKind: 'real',
    photoDataUrl: r.photo_data_url ?? undefined,
    lat: r.lat ?? undefined,
    lng: r.lng ?? undefined,
    reactions: r.reactions,
    createdAt: r.created_at,
  };
}

/** みんなの投稿を新しい順に取得する。失敗しても例外は投げない */
export async function fetchRemotePosts(limit = 60): Promise<RemotePost[]> {
  try {
    const res = await fetch(
      `${TABLE}?select=*&order=created_at.desc&limit=${limit}`,
      { headers: HEADERS, cache: 'no-store' }
    );
    if (!res.ok) return [];
    const rows = (await res.json()) as Row[];
    return rows.map(toPost);
  } catch {
    // オフラインや障害時は空を返し、種データだけで動かす
    return [];
  }
}

export async function fetchRemotePost(id: string): Promise<RemotePost | null> {
  try {
    const res = await fetch(`${TABLE}?select=*&id=eq.${encodeURIComponent(id)}`, {
      headers: HEADERS,
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const rows = (await res.json()) as Row[];
    return rows[0] ? toPost(rows[0]) : null;
  } catch {
    return null;
  }
}

export type NewRemotePost = {
  id: string;
  title: string;
  body: string;
  tag: string;
  area: string;
  place?: string;
  mapQuery?: string;
  categories: string[];
  isIndoor: boolean;
  minutes: number;
  budget: number;
  timeOfDay: string[];
  who: string[];
  photoDataUrl?: string;
  lat?: number;
  lng?: number;
};

/** 投稿を共有DBに追加する。成功したらこの端末の「自分の投稿」に覚える */
export async function createRemotePost(
  p: NewRemotePost
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(TABLE, {
      method: 'POST',
      headers: { ...HEADERS, Prefer: 'return=minimal' },
      body: JSON.stringify({
        id: p.id,
        title: p.title,
        body: p.body,
        tag: p.tag,
        area: p.area,
        place: p.place ?? null,
        map_query: p.mapQuery ?? null,
        categories: p.categories,
        is_indoor: p.isIndoor,
        minutes: p.minutes,
        budget: p.budget,
        time_of_day: p.timeOfDay,
        who: p.who,
        photo_data_url: p.photoDataUrl ?? null,
        lat: p.lat ?? null,
        lng: p.lng ?? null,
        author: 'みんなの投稿',
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      // 画像が大きすぎるとRLSのチェックで弾かれる
      return {
        ok: false,
        error: /photo_data_url|row-level/i.test(text)
          ? '写真が大きすぎて共有できませんでした。'
          : '共有に失敗しました。通信環境を確認してください。',
      };
    }

    rememberMyPost(p.id);
    return { ok: true };
  } catch {
    return { ok: false, error: '共有に失敗しました。通信環境を確認してください。' };
  }
}

/** 「✨新しい」を1つ足す。本文は書き換えられない関数経由 */
export async function addRemoteReaction(id: string): Promise<void> {
  try {
    await fetch(`${URL}/rest/v1/rpc/kyoto_add_reaction`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ post_id: id }),
    });
  } catch {
    // 失敗しても手元の表示は進める
  }
}
