'use client';

// ポイント。認証を作らないため localStorage に持つ。
//
// 貯める: 開いた投稿に「✨新しい」を押す (+1)
// 使う  : 投稿の中身を開く (-1)
//
// 「他人が自分の投稿にリアクションして貯まる」部分は、ユーザーが複数いないと
// 動かないため今回は実装しない（発表では構想として語る）。

const KEYS = {
  balance: 'kyoto-repeater/points',
  unlocked: 'kyoto-repeater/unlocked',
  reacted: 'kyoto-repeater/reacted',
  saved: 'kyoto-repeater/saved',
  /** 自分の投稿ごとに、何件分の反応をポイントに換算済みか */
  credited: 'kyoto-repeater/credited',
} as const;

/** 初回に配るポイント。これが無いと新規ユーザーが何も見られない */
export const INITIAL_POINTS = 10;

export const REACTION_REWARD = 1;

function readList(key: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeList(key: string, ids: string[]): string[] {
  try {
    window.localStorage.setItem(key, JSON.stringify(ids));
  } catch {
    // プライベートブラウジング等で失敗してもアプリは動き続ける
  }
  return ids;
}

export function getBalance(): number {
  if (typeof window === 'undefined') return INITIAL_POINTS;
  try {
    const raw = window.localStorage.getItem(KEYS.balance);
    if (raw === null) {
      window.localStorage.setItem(KEYS.balance, String(INITIAL_POINTS));
      return INITIAL_POINTS;
    }
    const n = Number(raw);
    return Number.isFinite(n) ? n : INITIAL_POINTS;
  } catch {
    return INITIAL_POINTS;
  }
}

/** 残高が変わったことを画面全体に知らせるイベント名 */
export const POINTS_CHANGED = 'points-changed';

function setBalance(n: number): number {
  try {
    window.localStorage.setItem(KEYS.balance, String(n));
  } catch {
    // 保存できなくても画面は動かす
  }
  // バッジは別コンポーネントなので、通知しないと古い残高を出したままになる
  try {
    window.dispatchEvent(new Event(POINTS_CHANGED));
  } catch {
    // イベントが飛ばなくても残高自体は正しい
  }
  return n;
}

export function getUnlocked(): string[] {
  return readList(KEYS.unlocked);
}

export function isUnlocked(id: string): boolean {
  return getUnlocked().includes(id);
}

/**
 * ポイントを払って投稿を開く。
 * 既に開いている投稿は再課金しない。残高不足なら false。
 */
export function unlock(id: string, cost: number): { ok: boolean; balance: number } {
  const unlocked = getUnlocked();
  if (unlocked.includes(id)) return { ok: true, balance: getBalance() };

  const balance = getBalance();
  if (balance < cost) return { ok: false, balance };

  writeList(KEYS.unlocked, [...unlocked, id]);
  return { ok: true, balance: setBalance(balance - cost) };
}

export function getReacted(): string[] {
  return readList(KEYS.reacted);
}

/**
 * 「役に立った」を押す。
 *
 * 押した本人にポイントは入らない。ポイントが入るのは投稿者。
 * 共有DBの反応数が増え、投稿者の端末で creditFromReactions() が換算する。
 */
export function react(id: string): { reacted: string[] } {
  const reacted = getReacted();
  if (reacted.includes(id)) return { reacted };
  return { reacted: writeList(KEYS.reacted, [...reacted, id]) };
}

function readCredited(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(KEYS.credited);
    return raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    return {};
  }
}

/**
 * 自分の投稿が受け取った反応を、まだ換算していない分だけポイントにする。
 *
 * 反応は共有DBに溜まるが、ポイント残高は各端末にある。
 * そのため投稿者が自分の端末でアプリを開いたときに差分を精算する。
 */
export function creditFromReactions(
  myPosts: { id: string; reactions: number }[]
): { gained: number; balance: number } {
  const credited = readCredited();
  let gained = 0;
  const next: Record<string, number> = { ...credited };

  for (const p of myPosts) {
    const already = credited[p.id] ?? 0;
    const diff = Math.max(0, (p.reactions ?? 0) - already);
    if (diff > 0) {
      gained += diff * REACTION_REWARD;
      next[p.id] = p.reactions;
    } else if (!(p.id in next)) {
      next[p.id] = p.reactions ?? 0;
    }
  }

  try {
    window.localStorage.setItem(KEYS.credited, JSON.stringify(next));
  } catch {
    // 保存できなくても残高は正しい
  }

  return { gained, balance: gained > 0 ? setBalance(getBalance() + gained) : getBalance() };
}

export function getSaved(): string[] {
  return readList(KEYS.saved);
}

export function toggleSaved(id: string): string[] {
  const saved = getSaved();
  return writeList(
    KEYS.saved,
    saved.includes(id) ? saved.filter((x) => x !== id) : [...saved, id]
  );
}

export function resetAll(): void {
  try {
    Object.values(KEYS).forEach((k) => window.localStorage.removeItem(k));
    // 通知もこの端末の記録なので一緒に消す
    window.localStorage.removeItem('kyoto-repeater/notifications');
  } catch {
    // 失敗しても支障はない
  }
}
