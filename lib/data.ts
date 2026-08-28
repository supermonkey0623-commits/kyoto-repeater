// ================================================================
// ダミーデータ。本番では Supabase の spots テーブルから取得する。
// ここにある評価・口コミ件数はすべて仮の値であり、実データではない。
// 実データ投入は要件定義書 §7.2 を参照。
// ================================================================

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
  source: 'google' | 'collected';
  comment?: string;
  recommenderNote?: string;
};

/**
 * カード内の対比に使う「京都の観光スポット平均口コミ件数」。仮の値。
 * 本番ではシード投入時に算出して確定させる。
 */
export const KYOTO_AVG_REVIEWS = 1847;

/**
 * オンボーディングのグリッド兼、横並び比較の左側に使う有名スポット。
 * 本番では review_count の上位20件を取得して並べる。
 */
export const FAMOUS_SPOTS: {
  id: string;
  name: string;
  reviewCount: number;
}[] = [
  { id: 'f01', name: '清水寺', reviewCount: 28900 },
  { id: 'f02', name: '金閣寺', reviewCount: 26400 },
  { id: 'f03', name: '伏見稲荷大社', reviewCount: 31200 },
  { id: 'f04', name: '嵐山・渡月橋', reviewCount: 19800 },
  { id: 'f05', name: '銀閣寺', reviewCount: 14600 },
  { id: 'f06', name: '錦市場', reviewCount: 12400 },
  { id: 'f07', name: '二条城', reviewCount: 16100 },
  { id: 'f08', name: '八坂神社', reviewCount: 15700 },
  { id: 'f09', name: '平安神宮', reviewCount: 11300 },
  { id: 'f10', name: '南禅寺', reviewCount: 9800 },
  { id: 'f11', name: '哲学の道', reviewCount: 8700 },
  { id: 'f12', name: '先斗町', reviewCount: 6900 },
  { id: 'f13', name: '東寺', reviewCount: 8200 },
  { id: 'f14', name: '三十三間堂', reviewCount: 9100 },
  { id: 'f15', name: '貴船神社', reviewCount: 7400 },
  { id: 'f16', name: '天龍寺', reviewCount: 8900 },
  { id: 'f17', name: '龍安寺', reviewCount: 7800 },
  { id: 'f18', name: '祇園・花見小路', reviewCount: 10200 },
  { id: 'f19', name: '京都タワー', reviewCount: 13500 },
  { id: 'f20', name: '鴨川デルタ', reviewCount: 4300 },
];

/**
 * 提案候補。名前はすべて「（仮）」付きのプレースホルダで、実在の店舗ではない。
 * 本番では Places API 由来（source:'google'）＋
 * 我々が聞き込みで集めた分（source:'collected'）が入る。
 */
export const SUGGEST_SPOTS: Spot[] = [
  {
    id: 's01',
    name: '路地裏の喫茶店（仮）',
    area: '左京区',
    rating: 4.6,
    reviewCount: 8,
    categories: ['quiet', 'food'],
    isIndoor: true,
    source: 'collected',
    comment: '観光客はまず来ない。夕方の光が一番きれい',
    recommenderNote: '京都在住8年・カフェ好きの方',
  },
  {
    id: 's02',
    name: '川沿いのベンチ（仮）',
    area: '北区',
    rating: 4.4,
    reviewCount: 12,
    categories: ['quiet', 'nature'],
    isIndoor: false,
    source: 'google',
  },
  {
    id: 's03',
    name: '小さな古書店（仮）',
    area: '中京区',
    rating: 4.5,
    reviewCount: 19,
    categories: ['quiet', 'culture'],
    isIndoor: true,
    source: 'collected',
    comment: '2階の椅子で1時間座っていられる',
    recommenderNote: '会場で聞いた運営スタッフの方',
  },
  {
    id: 's04',
    name: '高台の展望スポット（仮）',
    area: '山科区',
    rating: 4.7,
    reviewCount: 23,
    categories: ['photo', 'nature'],
    isIndoor: false,
    source: 'google',
  },
  {
    id: 's05',
    name: '深夜までやってる立ち飲み（仮）',
    area: '下京区',
    rating: 4.3,
    reviewCount: 31,
    categories: ['night', 'food'],
    isIndoor: true,
    source: 'collected',
    comment: '終電を逃してもここがある',
    recommenderNote: '京都の大学に通っていた参加者',
  },
  {
    id: 's06',
    name: '苔のきれいな小径（仮）',
    area: '右京区',
    rating: 4.5,
    reviewCount: 6,
    categories: ['nature', 'photo', 'quiet'],
    isIndoor: false,
    source: 'google',
  },
  {
    id: 's07',
    name: '町家を改装したギャラリー（仮）',
    area: '上京区',
    rating: 4.4,
    reviewCount: 27,
    categories: ['culture', 'photo'],
    isIndoor: true,
    source: 'google',
  },
  {
    id: 's08',
    name: '朝だけ開く定食屋（仮）',
    area: '東山区',
    rating: 4.6,
    reviewCount: 44,
    categories: ['food'],
    isIndoor: true,
    source: 'collected',
    comment: '7時から10時まで。地元の人しかいない',
    recommenderNote: '近所の商店の方',
  },
  {
    id: 's09',
    name: '夜景が見える階段（仮）',
    area: '左京区',
    rating: 4.2,
    reviewCount: 15,
    categories: ['night', 'photo'],
    isIndoor: false,
    source: 'google',
  },
  {
    id: 's10',
    name: '静かな寺の裏庭（仮）',
    area: '伏見区',
    rating: 4.8,
    reviewCount: 9,
    categories: ['quiet', 'culture', 'nature'],
    isIndoor: false,
    source: 'google',
  },
];

/** 口コミ件数からレア度を導出する（要件定義書 §5 F-03） */
export function getRarity(reviewCount: number): {
  stars: string;
  label: string;
} {
  if (reviewCount < 10) return { stars: '★★★★★', label: '超レア' };
  if (reviewCount < 30) return { stars: '★★★★☆', label: 'レア' };
  return { stars: '★★★☆☆', label: 'やや希少' };
}
