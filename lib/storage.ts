'use client';

// 消費ログ。認証を作らないため localStorage に置く（要件定義書 §6）。
// ユーザーは「自分の提案を良くするため」に押す。他人のための貢献操作は置かない。

const KEYS = {
  visited: 'kyoto-repeater/visited',
  saved: 'kyoto-repeater/saved',
  rejected: 'kyoto-repeater/rejected',
} as const;

export type LogKind = keyof typeof KEYS;

function read(kind: LogKind): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(KEYS[kind]);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function write(kind: LogKind, ids: string[]): void {
  try {
    window.localStorage.setItem(KEYS[kind], JSON.stringify(ids));
  } catch {
    // プライベートブラウジング等で失敗しても、アプリは動き続ける
  }
}

export function get(kind: LogKind): string[] {
  return read(kind);
}

export function set(kind: LogKind, ids: string[]): string[] {
  write(kind, ids);
  return ids;
}

export function add(kind: LogKind, id: string): string[] {
  const next = Array.from(new Set([...read(kind), id]));
  write(kind, next);
  return next;
}

export function remove(kind: LogKind, id: string): string[] {
  const next = read(kind).filter((x) => x !== id);
  write(kind, next);
  return next;
}
