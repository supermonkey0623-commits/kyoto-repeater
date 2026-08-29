'use client';

// ユーザーが投稿したもの。認証もサーバーも無いので localStorage に保存する。
// この端末のブラウザにだけ残る。デモでは「投稿→即フィードに出る」まで動く。

import type { Post } from './posts';

const KEY = 'kyoto-repeater/userPosts';

/** 保存された投稿。写真は縮小済みのデータURL */
export type UserPost = Post & {
  photoDataUrl?: string;
  createdAt: string;
  lat?: number;
  lng?: number;
};

export function getUserPosts(): UserPost[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as UserPost[]) : [];
  } catch {
    return [];
  }
}

/** 追加して、保存後の一覧を返す。容量超過時は false を返す */
export function addUserPost(post: UserPost): { ok: boolean; posts: UserPost[] } {
  const next = [post, ...getUserPosts()];
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
    return { ok: true, posts: next };
  } catch {
    // 容量上限。写真を落として本文だけでも残す
    try {
      const withoutPhoto = next.map((p, i) =>
        i === 0 ? { ...p, photoDataUrl: undefined, hasPhoto: false } : p
      );
      window.localStorage.setItem(KEY, JSON.stringify(withoutPhoto));
      return { ok: false, posts: withoutPhoto };
    } catch {
      return { ok: false, posts: getUserPosts() };
    }
  }
}

export function removeUserPost(id: string): UserPost[] {
  const next = getUserPosts().filter((p) => p.id !== id);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // 消せなくても画面は動かす
  }
  return next;
}
