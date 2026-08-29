'use client';

// 通知。サーバーもアカウントも無いので localStorage に置く。
//
// 実際に起きた出来事だけを記録する。
// 「他の人が反応した」風の偽の通知は作らない（デモで説明できなくなるため）。
// 他ユーザーからの反応は、アカウント連携が入るまで届かない。

const KEY = 'kyoto-repeater/notifications';
const LIMIT = 50;

export type NotificationKind = 'reaction' | 'posted' | 'points';

export type AppNotification = {
  id: string;
  kind: NotificationKind;
  title: string;
  body?: string;
  /** タップしたときに開く投稿 */
  postId?: string;
  createdAt: string;
  read: boolean;
};

export const NOTIFICATIONS_CHANGED = 'notifications-changed';

function read(): AppNotification[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AppNotification[]) : [];
  } catch {
    return [];
  }
}

function write(list: AppNotification[]): AppNotification[] {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list.slice(0, LIMIT)));
    window.dispatchEvent(new Event(NOTIFICATIONS_CHANGED));
  } catch {
    // 保存できなくても画面は動かす
  }
  return list;
}

export function getNotifications(): AppNotification[] {
  return read();
}

export function getUnreadCount(): number {
  return read().filter((n) => !n.read).length;
}

export function notify(
  input: Omit<AppNotification, 'id' | 'createdAt' | 'read'>
): AppNotification[] {
  const item: AppNotification = {
    ...input,
    id: `n${Date.now()}${Math.random().toString(36).slice(2, 6)}`,
    createdAt: new Date().toISOString(),
    read: false,
  };
  return write([item, ...read()]);
}

export function markAllRead(): AppNotification[] {
  return write(read().map((n) => ({ ...n, read: true })));
}

export function clearNotifications(): AppNotification[] {
  return write([]);
}

/** 「3分前」「昨日」のような表示にする */
export function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return 'たった今';
  if (min < 60) return `${min}分前`;
  const hour = Math.floor(min / 60);
  if (hour < 24) return `${hour}時間前`;
  const day = Math.floor(hour / 24);
  return day === 1 ? '昨日' : `${day}日前`;
}
