// かんたん検索の提案ロジック。
//
// 重要: 条件をANDで絞り込まない。
// 投稿が12件しかない段階でAND検索にすると、条件を2つ選んだだけで0件になる。
// 「条件に合うほど上に来る」スコア方式にして、必ず上位が出るようにしている。
//
// AIは使っていない。加点と並び替えだけ。

import type { CategoryId } from './data';
import type { Post } from './posts';

export type Conditions = {
  /** フリーワード。空白区切りで複数語を受け付ける */
  keyword: string;
  /** 気分・趣味 */
  mood: CategoryId | null;
  /** 誰と */
  who: 'solo' | 'pair' | 'group' | null;
  /** 天気 */
  weather: 'sunny' | 'rain' | null;
  /** 空き時間（分）。これより短く済む場所を上に出す */
  freeMinutes: number | null;
  /** 予算感 */
  budget: 0 | 1 | 2 | null;
  /** 時間帯 */
  timeOfDay: 'morning' | 'day' | 'night' | null;
};

export const EMPTY_CONDITIONS: Conditions = {
  keyword: '',
  mood: null,
  who: null,
  weather: null,
  freeMinutes: null,
  budget: null,
  timeOfDay: null,
};

export type Scored = {
  post: Post;
  score: number;
  /** なぜ上位に来たのか。画面に出して納得感を出す */
  reasons: string[];
};

const WEIGHT = {
  /** キーワードは明示的な意思表示なので、他の条件より重く見る */
  keyword: 4,
  mood: 3,
  timeOfDay: 2,
  weather: 2,
  freeMinutes: 2,
  who: 1,
  budget: 1,
};

/** 投稿のうちキーワード照合の対象にする文字列 */
function haystack(post: Post): string {
  return [post.title, post.tag, post.area, post.body, post.place ?? '']
    .join(' ')
    .toLowerCase();
}

export function scorePost(post: Post, c: Conditions): Scored {
  let score = 0;
  const reasons: string[] = [];

  const terms = c.keyword.trim().toLowerCase().split(/[\s　]+/).filter(Boolean);
  if (terms.length > 0) {
    const text = haystack(post);
    const matched = terms.filter((t) => text.includes(t));
    if (matched.length > 0) {
      score += WEIGHT.keyword * matched.length;
      reasons.push(`「${matched.join('・')}」に一致`);
    }
  }

  if (c.mood && post.categories.includes(c.mood)) {
    score += WEIGHT.mood;
    reasons.push('気分に合う');
  }

  if (c.timeOfDay && post.timeOfDay.includes(c.timeOfDay)) {
    score += WEIGHT.timeOfDay;
    reasons.push(
      c.timeOfDay === 'morning' ? '朝がいい' : c.timeOfDay === 'night' ? '夜がいい' : '日中がいい'
    );
  }

  // 雨は「屋内に加点」だけでは足りない。屋外を減点しないと、
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

  if (c.budget !== null && post.budget <= c.budget) {
    score += WEIGHT.budget;
    reasons.push(post.budget === 0 ? 'お金がかからない' : '予算内');
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
 * 条件に合う順に並べて返す。
 * 該当0件にはならない（スコア0の投稿も後ろに並ぶ）。
 */
export function suggest(posts: Post[], c: Conditions, limit = 5): Scored[] {
  return posts
    .map((p) => scorePost(p, c))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
