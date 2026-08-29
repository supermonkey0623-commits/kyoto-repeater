// 投稿データ。
//
// 写真は public/photos/<id>.jpg。9枚に対応する9件を用意している。
// タイトルは「場所名」ではなく「体験」で書く。実在の店名を勝手に作らないこと。
//
// ★残っている作業
//   1. 各投稿の場所を確定させる（どこで撮ったか）
//   2. その場所の口コミ件数をPlaces APIで引いて reviewCount に入れ、
//      reviewVerified を true にする
//   3. 全部そろったら IS_SAMPLE を false にする（サンプルバナーが消える）

import type { CategoryId } from './data';

/** 投稿がまだ仮の状態か。true の間は画面にバナーが出る */
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
  /**
   * reviewCount が実際にPlaces APIで確認した値かどうか。
   *
   * false の投稿では対比（「この場所を知っているのは◯人」）を表示しない。
   * ここはコンセプトの根拠になる数字なので、確認していない値を出すと
   * 証拠を捏造したことになる。場所が確定したら scripts/fetch-landmarks.mjs の
   * 要領で実データを引いて true にすること。
   */
  reviewVerified?: boolean;
  /** 閲覧に必要なポイント */
  costPt: number;
  /** public/photos/<id>.jpg を置いたら true にする。false ならグラデーションで埋める */
  hasPhoto?: boolean;
  /**
   * 写真の種類。
   * 'ai'  … AI生成のイメージ画像。画面に「イメージ」バッジが出る
   * 'real'… 実際に撮った写真。バッジは出ない
   *
   * ★差し替えたら必ず 'real' に変えること。
   *   変え忘れるとバッジが残るので、公開URLに嘘が出たままにはならない。
   */
  photoKind?: 'ai' | 'real';
};

export const POSTS: Post[] = [
  {
    id: 'p01',
    tag: '東山',
    title: '夜が明けたばかりの石畳',
    area: '京都府・東山',
    body: '同じ道とは思えないくらい人がいませんでした。石畳が濡れていて、灯りがまだ点いている時間。昼に来たことのある場所でも、この時間だけは別の街に見えます。',
    categories: ['quiet', 'photo'],
    author: 'チーム投稿',
    reviewCount: 0,
    reviewVerified: false,
    costPt: 1,
    hasPhoto: true,
    photoKind: 'real',
  },
  {
    id: 'p02',
    tag: '中京',
    title: '飛び石をたどって奥へ',
    area: '京都府・中京区',
    body: '表からは中が見えません。飛び石の先に店が続いていて、雨の日は石が濡れていい色になります。知らないと通り過ぎる場所。',
    categories: ['quiet', 'culture'],
    author: 'チーム投稿',
    reviewCount: 0,
    reviewVerified: false,
    costPt: 1,
    hasPhoto: true,
    photoKind: 'real',
  },
  {
    id: 'p03',
    tag: '嵐山',
    title: '夕方の川は誰もいない',
    area: '京都府・右京区',
    body: '渡月橋のあたりは人だらけですが、少し上流に歩くと静かになります。日が沈む方向に山が重なって、水面に色が乗る時間帯がいちばんきれいでした。',
    categories: ['nature', 'photo'],
    author: 'チーム投稿',
    reviewCount: 0,
    reviewVerified: false,
    costPt: 1,
    hasPhoto: true,
    photoKind: 'real',
  },
  {
    id: 'p04',
    tag: '寺の庭',
    title: '誰もいない庭に座る',
    area: '京都府・京都市内',
    body: '有名な庭園のような整いかたではないけれど、その分ずっと座っていられます。松と飛び石だけの広い庭で、聞こえるのは風の音だけでした。',
    categories: ['quiet', 'nature', 'culture'],
    author: 'チーム投稿',
    reviewCount: 0,
    reviewVerified: false,
    costPt: 1,
    hasPhoto: true,
    photoKind: 'real',
  },
  {
    id: 'p05',
    tag: '鴨川',
    title: '川沿いのベンチで何もしない',
    area: '京都府・京都市内',
    body: '観光地ではありません。地元の人が散歩しているだけの場所です。予定を詰めすぎた日に、ここに座って何もしない時間がいちばんよかった。',
    categories: ['quiet', 'nature'],
    author: 'チーム投稿',
    reviewCount: 0,
    reviewVerified: false,
    costPt: 1,
    hasPhoto: true,
    photoKind: 'real',
  },
  {
    id: 'p06',
    tag: 'ギャラリー',
    title: '暖簾をくぐると展示室',
    area: '京都府・京都市内',
    body: '普通の建物の一階が展示室になっています。入場無料で、開いているかどうかは暖簾が出ているかで分かる。展示が変わるので、次に来たときも寄りたい場所。',
    categories: ['culture', 'photo'],
    author: 'チーム投稿',
    reviewCount: 0,
    reviewVerified: false,
    costPt: 1,
    hasPhoto: true,
    photoKind: 'real',
  },
  {
    id: 'p07',
    tag: '東山',
    title: '夜の石段をのぼる',
    area: '京都府・東山',
    body: '昼間は人が多い道でも、夜になると街灯だけになります。上りきったところで振り返ると、灯りが一列に並んで見えました。',
    categories: ['night', 'photo'],
    author: 'チーム投稿',
    reviewCount: 0,
    reviewVerified: false,
    costPt: 1,
    hasPhoto: true,
    photoKind: 'real',
  },
  {
    id: 'p08',
    tag: '山の道',
    title: '緑に挟まれた細い道',
    area: '京都府・京都市内',
    body: '目的地までの通り道でしかないのですが、ここを歩く時間がいちばん記憶に残りました。片側が苔むした石垣で、雨上がりが特にきれいです。',
    categories: ['nature', 'quiet', 'photo'],
    author: 'チーム投稿',
    reviewCount: 0,
    reviewVerified: false,
    costPt: 1,
    hasPhoto: true,
    photoKind: 'real',
  },
  {
    id: 'p09',
    tag: '夜',
    title: '遅い時間に開いている立ち飲み',
    area: '京都府・京都市内',
    body: '観光客はまずいません。一人で入っても浮かない空気があって、遅くなった日の逃げ場になります。看板が小さいので、知らないと気づかない。',
    categories: ['night', 'food'],
    author: 'チーム投稿',
    reviewCount: 0,
    reviewVerified: false,
    costPt: 1,
    hasPhoto: true,
    photoKind: 'real',
  },
];

export function getPost(id: string): Post | undefined {
  return POSTS.find((p) => p.id === id);
}
