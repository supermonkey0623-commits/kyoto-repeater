// 投稿データ（モック）。
//
// ★ここは全部サンプル。8/29中にチーム3人が実際に京都で撮った写真と
//   実際に行った場所の投稿に差し替える。差し替え時は IS_SAMPLE を false にする。
//
// タイトルは「場所名」ではなく「体験」で書く。
// 実在の店名を勝手に作らないこと（Q&Aで崩れる）。

import type { CategoryId } from './data';

export const IS_SAMPLE = true;

export type Post = {
  id: string;
  tag: string; // 東山 / 祇園 など
  title: string;
  area: string; // 京都府・東山
  body: string;
  categories: CategoryId[];
  author: string;
  /** 紐づく場所のGoogle口コミ件数。「本当に知られていない」ことの客観的な証拠 */
  reviewCount: number;
  /** 閲覧に必要なポイント */
  costPt: number;
  /** public/photos/<id>.jpg を置いたら true にする。false ならグラデーションで埋める */
  hasPhoto?: boolean;
};

export const POSTS: Post[] = [
  {
    id: 'p01',
    tag: '東山',
    title: '朝の東山を歩く静かな時間',
    area: '京都府・東山',
    body: '澄んだ空気の中、石畳の道をゆっくりと。朝7時前なら人がほとんどいなくて、同じ道とは思えない静けさでした。日が昇ると一気に人が増えるので、早起きする価値があります。',
    categories: ['quiet', 'photo'],
    author: 'サンプル投稿',
    reviewCount: 12,
    costPt: 1,
  },
  {
    id: 'p02',
    tag: '祇園',
    title: '路地裏の古民家カフェ',
    area: '京都府・祇園',
    body: '町家を改装した落ち着いた店。表通りから一本入るだけで人通りが消えます。二階の窓際の席が良くて、コーヒー一杯で一時間座っていられました。',
    categories: ['quiet', 'food'],
    author: 'サンプル投稿',
    reviewCount: 8,
    costPt: 1,
  },
  {
    id: 'p03',
    tag: '嵐山',
    title: '夕暮れの保津川沿い',
    area: '京都府・嵐山',
    body: '渡月橋から少し上流に歩くと、人がほとんどいなくなります。夕方の光が川面に反射する時間帯がいちばん良かった。ベンチがあるので座って眺められます。',
    categories: ['nature', 'photo'],
    author: 'サンプル投稿',
    reviewCount: 15,
    costPt: 1,
  },
  {
    id: 'p04',
    tag: '左京区',
    title: '看板のない小さな古書店',
    area: '京都府・左京区',
    body: '知らないと通り過ぎる。棚の並びに趣味が出ていて、目的なく入って一時間いました。店主さんが静かな方で、話しかけられないのが逆に良い。',
    categories: ['quiet', 'culture'],
    author: 'サンプル投稿',
    reviewCount: 5,
    costPt: 1,
  },
  {
    id: 'p05',
    tag: '伏見区',
    title: '観光客が来ない寺の裏庭',
    area: '京都府・伏見区',
    body: '本堂の横をまわると、手入れされた小さな庭があります。誰もいませんでした。拝観料も要らず、ただ座っているだけの場所。',
    categories: ['quiet', 'nature', 'culture'],
    author: 'サンプル投稿',
    reviewCount: 9,
    costPt: 1,
  },
  {
    id: 'p06',
    tag: '北区',
    title: '川沿いのベンチで何もしない',
    area: '京都府・北区',
    body: '地元の人が犬の散歩をしているだけの場所。観光地ではないけれど、京都に来て一番よかったのがここでした。予定を詰めすぎた日の逃げ場に。',
    categories: ['quiet', 'nature'],
    author: 'サンプル投稿',
    reviewCount: 12,
    costPt: 1,
  },
  {
    id: 'p07',
    tag: '上京区',
    title: '町家を改装した小さなギャラリー',
    area: '京都府・上京区',
    body: '入場無料。作家さんが在廊していて、話を聞けました。展示が数週間で変わるらしいので、次に来たときも寄りたい。',
    categories: ['culture', 'photo'],
    author: 'サンプル投稿',
    reviewCount: 27,
    costPt: 1,
  },
  {
    id: 'p08',
    tag: '東山区',
    title: '朝だけ開いている定食屋',
    area: '京都府・東山区',
    body: '7時から10時まで。地元の人しかいませんでした。観光の前に腹ごしらえするならここ。値段も観光地価格ではないです。',
    categories: ['food'],
    author: 'サンプル投稿',
    reviewCount: 44,
    costPt: 1,
  },
  {
    id: 'p09',
    tag: '左京区',
    title: '夜景が見える階段',
    area: '京都府・左京区',
    body: '展望台ではなく、ただの住宅街の階段。でも登りきったところから街が見えます。地図には何も書いていない場所。',
    categories: ['night', 'photo'],
    author: 'サンプル投稿',
    reviewCount: 15,
    costPt: 1,
  },
  {
    id: 'p10',
    tag: '右京区',
    title: '苔がきれいな小径',
    area: '京都府・右京区',
    body: '有名な寺の裏手にある細い道。雨上がりがいちばん良かったです。5分で歩き終わってしまうけれど、その5分の価値があります。',
    categories: ['nature', 'quiet', 'photo'],
    author: 'サンプル投稿',
    reviewCount: 6,
    costPt: 1,
  },
  {
    id: 'p11',
    tag: '下京区',
    title: '終電を逃してもここがある',
    area: '京都府・下京区',
    body: '深夜まで開いている立ち飲み。観光客はまずいません。一人で入っても浮かない空気があります。',
    categories: ['night', 'food'],
    author: 'サンプル投稿',
    reviewCount: 31,
    costPt: 1,
  },
  {
    id: 'p12',
    tag: '山科区',
    title: '高台から京都市街を見下ろす',
    area: '京都府・山科区',
    body: '観光ルートから完全に外れた場所。登りは少ししんどいけれど、着いたときに誰もいないのが良い。夕方がおすすめです。',
    categories: ['photo', 'nature'],
    author: 'サンプル投稿',
    reviewCount: 23,
    costPt: 1,
  },
];

export function getPost(id: string): Post | undefined {
  return POSTS.find((p) => p.id === id);
}
