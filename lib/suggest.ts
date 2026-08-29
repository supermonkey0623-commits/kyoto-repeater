// かんたん検索の提案ロジック。
//
// 条件を2種類に分けている。
//
//   絞り込み（ハード）… キーワード / 気分・趣味
//     ユーザーが明確に指定したもの。合わないものを混ぜると「効いていない」と感じる。
//     該当が無ければ 0件と正直に出す。
//
//   並べ替え（ソフト）… 誰と / 天気 / 時間帯 / 空き時間 / 予算
//     好みの度合い。これで0件にすると使い物にならないので、順位付けだけに使う。
//
// AIは使っていない。文字列一致と加点、並べ替えのみ。

import type { CategoryId } from './data';
import type { Post } from './posts';

export type Conditions = {
  keyword: string;
  mood: CategoryId | null;
  who: 'solo' | 'pair' | 'group' | null;
  weather: 'sunny' | 'rain' | null;
  freeMinutes: number | null;
  /** 予算は下限・上限の円額で範囲指定する（単一の段階選択ではない） */
  budgetMin: number | null;
  budgetMax: number | null;
  timeOfDay: 'morning' | 'day' | 'night' | null;
};

export const EMPTY_CONDITIONS: Conditions = {
  keyword: '',
  mood: null,
  who: null,
  weather: null,
  freeMinutes: null,
  budgetMin: null,
  budgetMax: null,
  timeOfDay: null,
};

/**
 * 投稿の budget（0=かからない／1=〜1000円／2=1000円〜）を、
 * 範囲比較に使う円額の目安に変換する。
 * データモデル自体は変えず、検索側だけで円額として扱う。
 */
export const BUDGET_YEN: Record<0 | 1 | 2, number> = {
  0: 0,
  1: 800,
  2: 2500,
};

export type Scored = {
  post: Post;
  score: number;
  /** なぜ上位に来たのか。画面に出して納得感を出す */
  reasons: string[];
};

const WEIGHT = {
  keyword: 5,
  timeOfDay: 2,
  weather: 2,
  freeMinutes: 2,
  who: 1,
  budget: 1,
};

/** キーワード照合の対象。日本語は分かち書きが無いので部分一致で拾う */
function haystack(post: Post): string {
  return [post.title, post.tag, post.area, post.body, post.place ?? '']
    .join(' ')
    .toLowerCase();
}

export function splitTerms(keyword: string): string[] {
  return keyword.trim().toLowerCase().split(/[\s　]+/).filter(Boolean);
}

/** キーワードに1語でも一致するか。一致した語も返す */
function matchKeyword(post: Post, terms: string[]): string[] {
  if (terms.length === 0) return [];
  const text = haystack(post);
  return terms.filter((t) => text.includes(t));
}

function scoreSoft(post: Post, c: Conditions): Scored {
  let score = 0;
  const reasons: string[] = [];

  if (c.timeOfDay && post.timeOfDay.includes(c.timeOfDay)) {
    score += WEIGHT.timeOfDay;
    reasons.push(
      c.timeOfDay === 'morning' ? '朝がいい' : c.timeOfDay === 'night' ? '夜がいい' : '日中がいい'
    );
  }

  // 雨は屋内への加点だけでは足りない。屋外を減点しないと、
  // 雨を選んでいるのに濡れる場所が上に来てしまう。
  if (c.weather === 'rain') {
    if (post.isIndoor) {
      score += WEIGHT.weather;
      reasons.push('雨でも大丈夫');
    } else {
      score -= WEIGHT.weather;
    }
  }
  if (c.weather === 'sunny' && !post.isIndoor) {
    score += WEIGHT.weather;
    reasons.push('晴れ向き');
  }

  if (c.freeMinutes !== null && post.minutes <= c.freeMinutes) {
    score += WEIGHT.freeMinutes;
    reasons.push(`${post.minutes}分で足りる`);
  }

  if (c.who && post.who.includes(c.who)) {
    score += WEIGHT.who;
    reasons.push(
      c.who === 'solo' ? 'ひとり向き' : c.who === 'pair' ? 'ふたり向き' : 'グループ向き'
    );
  }

  if (c.budgetMin !== null || c.budgetMax !== null) {
    const yen = BUDGET_YEN[post.budget];
    const aboveMin = c.budgetMin === null || yen >= c.budgetMin;
    const belowMax = c.budgetMax === null || yen <= c.budgetMax;
    if (aboveMin && belowMax) {
      score += WEIGHT.budget;
      reasons.push(yen === 0 ? 'お金がかからない' : '予算内');
    }
  }

  return { post, score, reasons };
}

/** 条件が1つも選ばれていないか（キーワードは空文字が未入力） */
export function isEmpty(c: Conditions): boolean {
  const { keyword, ...rest } = c;
  return keyword.trim() === '' && Object.values(rest).every((v) => v === null);
}

/** 選ばれている条件の数。ボタンの文言に使う */
export function countChosen(c: Conditions): number {
  const { keyword, ...rest } = c;
  return (
    (keyword.trim() === '' ? 0 : 1) +
    Object.values(rest).filter((v) => v !== null).length
  );
}

/**
 * 条件に合う投稿を返す。
 * キーワードと気分は絞り込み。合わなければ 0件になる（正直に出す）。
 * それ以外の条件は並べ替えにのみ使う。
 */
export function suggest(posts: Post[], c: Conditions, limit = 8): Scored[] {
  const terms = splitTerms(c.keyword);

  const filtered = posts.filter((p) => {
    if (terms.length > 0 && matchKeyword(p, terms).length === 0) return false;
    if (c.mood && !p.categories.includes(c.mood)) return false;
    return true;
  });

  return filtered
    .map((p) => {
      const soft = scoreSoft(p, c);
      const hits = matchKeyword(p, terms);
      if (hits.length > 0) {
        soft.score += WEIGHT.keyword * hits.length;
        soft.reasons.unshift(`「${hits.join('・')}」に一致`);
      }
      if (c.mood) soft.reasons.unshift('気分に合う');
      return soft;
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
