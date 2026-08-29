'use client';

// アカウント設定。認証が無いので、この端末のブラウザに保存する。
//
// 「サーバーに保存されている」ように見せない。
// アカウント連携が入るまで端末を跨がないことは、画面にも書いておく。

const KEY = 'kyoto-repeater/settings';

export type Settings = {
  displayName: string;
  email: string;
  /** 自分の投稿への反応を通知する */
  notifyReaction: boolean;
  /** おすすめの新着を通知する */
  notifyDigest: boolean;
  /** 投稿に位置情報を含める */
  sharePlace: boolean;
};

export const DEFAULT_SETTINGS: Settings = {
  displayName: 'ゲスト',
  email: '',
  notifyReaction: true,
  notifyDigest: false,
  sharePlace: true,
};

export function getSettings(): Settings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw
      ? { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<Settings>) }
      : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(next: Settings): Settings {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // 保存できなくても画面は動かす
  }
  return next;
}
