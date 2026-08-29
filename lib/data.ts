// スポットデータの入口。
// 実データは scripts/fetch-spots.mjs → curate-spots.mjs → build-data.mjs で
// lib/spots.generated.ts に生成される。ここではその再エクスポートと型定義を行う。

import {
  FAMOUS_AVG_REVIEWS,
  FAMOUS_COUNT,
  GENERATED_FAMOUS,
  GENERATED_SPOTS,
  IS_CURATED,
} from './spots.generated';

export type CategoryId =
  | 'quiet'
  | 'photo'
  | 'food'
  | 'nature'
  | 'night'
  | 'culture';

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'quiet', label: '静かに過ごす' },
  { id: 'photo', label: '写真を撮る' },
  { id: 'food', label: '食べる' },
  { id: 'nature', label: '自然' },
  { id: 'night', label: '夜に楽しむ' },
  { id: 'culture', label: '文化に触れる' },
];

export type Spot = {
  id: string;
  name: string;
  area: string;
  rating: number;
  reviewCount: number;
  categories: CategoryId[];
  isIndoor: boolean;
  lat?: number;
  lng?: number;
  source: 'google' | 'collected';
  comment?: string;
  recommenderNote?: string;
};

/**
 * カード内の対比に使う「京都の定番観光地の平均口コミ件数」。
 * 清水寺・金閣寺・伏見稲荷など、名指しした定番ランドマークの実測平均。
 * ※「京都の全観光スポットの平均」ではない。ラベルを取り違えないこと。
 */
export const FAMOUS_AVG = FAMOUS_AVG_REVIEWS;

/** 平均の母数。ラベルに出す件数と実数を一致させるために使う */
export const FAMOUS_AVG_COUNT = FAMOUS_COUNT;

/** 人の目による選別が済んでいるか。false の間は画面に警告を出す */
export const IS_CURATED_DATA = IS_CURATED;

/** オンボーディングのグリッド兼、横並び比較の左側に使う有名スポット */
export const FAMOUS_SPOTS = GENERATED_FAMOUS;

/** 提案候補 */
export const SUGGEST_SPOTS: Spot[] = GENERATED_SPOTS;

/** 口コミ件数からレア度を導出する（要件定義書 §5 F-04） */
export function getRarity(reviewCount: number): {
  stars: string;
  label: string;
} {
  if (reviewCount < 10) return { stars: '★★★★★', label: '超レア' };
  if (reviewCount < 30) return { stars: '★★★★☆', label: 'レア' };
  return { stars: '★★★☆☆', label: 'やや希少' };
}
