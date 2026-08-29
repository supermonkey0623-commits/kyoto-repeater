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
//   - 自分の投稿の削除は kyoto_delete_post 経由。投稿時に端末で作った
//     秘密の文字列を知っていないと通らない（DBにはハッシュしか無い）
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

function forgetMyPost(id: string): void {
  try {
    window.localStorage.setItem(
      MINE_KEY,
      JSON.stringify(getMyPostIds().filter((x) => x !== id))
    );
  } catch {
    // 消せなくても投稿自体は消えている
  }
}

export function isMyPost(id: string): boolean {
  return getMyPostIds().includes(id);
}

// 削除用の合言葉。投稿ごとに作り、この端末にだけ残す。
// DBにはこれのハッシュしか入らないので、他の端末からは消せない。
const TOKENS_KEY = 'kyoto-repeater/postTokens';

function readTokens(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(TOKENS_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

function writeTokens(map: Record<string, string>): void {
  try {
    window.localStorage.setItem(TOKENS_KEY, JSON.stringify(map));
  } catch {
    // 保存できないと消せなくなるが、投稿はできる
  }
}

function newToken(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

async function sha256Hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('');
}

/** 削除できる投稿か。合言葉を持っていない投稿は消せない */
export function canDeletePost(id: string): boolean {
  return isMyPost(id) && Boolean(readTokens()[id]);
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
    // 合言葉を作ってハッシュだけ送る。作れない環境でも投稿は通す（消せなくなるだけ）
    let token: string | null = null;
    let tokenHash: string | null = null;
    try {
      token = newToken();
      tokenHash = await sha256Hex(token);
    } catch {
      token = null;
      tokenHash = null;
    }

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
        delete_token_hash: tokenHash,
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
    if (token) writeTokens({ ...readTokens(), [p.id]: token });
    return { ok: true };
  } catch {
    return { ok: false, error: '共有に失敗しました。通信環境を確認してください。' };
  }
}

/**
 * 自分の投稿を消す。合言葉が合った時だけDB側が消してくれる。
 * テーブルにDELETEポリシーは無いので、この関数以外からは消せない。
 */
export async function deleteRemotePost(id: string): Promise<boolean> {
  const token = readTokens()[id];
  if (!token) return false;

  try {
    const res = await fetch(`${URL}/rest/v1/rpc/kyoto_delete_post`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ p_id: id, p_token: token }),
    });
    if (!res.ok) return false;
    // 関数は消せたかどうかを true/false で返す
    if ((await res.json()) !== true) return false;
  } catch {
    return false;
  }

  const rest = readTokens();
  delete rest[id];
  writeTokens(rest);
  forgetMyPost(id);
  return true;
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
