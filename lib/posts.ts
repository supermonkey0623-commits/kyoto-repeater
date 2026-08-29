// 投稿データ。写真は public/photos/<id>.jpg。
//
// タイトルは「場所名」ではなく「体験」で書く。
// 正確な場所は place に持ち、投稿を開いたときだけ表示する（サムネには出さない）。

import type { CategoryId } from './data';

/** 投稿がまだ仮の状態か。true の間は画面にバナーが出る */
export const IS_SAMPLE = false;

export type Post = {
  id: string;
  tag: string;
  title: string;
  area: string;
  body: string;
  categories: CategoryId[];
  author: string;
  /**
   * 正確な場所。投稿を開いたときだけ表示する（サムネには出さない）。
   * これがポイントを払って得られるものの中身。
   */
  place?: string;
  /** Googleマップ検索に渡す文字列。未設定なら place をそのまま使う */
  mapQuery?: string;

  // ---- かんたん検索の条件に使う属性 ----
  /** 屋内か。雨の日の絞り込みに使う */
  isIndoor: boolean;
  /** 滞在時間の目安（分）。空き時間との照合に使う */
  minutes: number;
  /** 予算感 0=かからない / 1=〜1000円 / 2=1000円以上 */
  budget: 0 | 1 | 2;
  /** おすすめの時間帯 */
  timeOfDay: ('morning' | 'day' | 'night')[];
  /** 向いている人数 */
  who: ('solo' | 'pair' | 'group')[];

  /** 閲覧に必要なポイント */
  costPt: number;
  /** public/photos/<id>.jpg を置いたら true */
  hasPhoto?: boolean;
  /** 'ai' なら画面に「イメージ」バッジが出る。実写は 'real' */
  photoKind?: 'ai' | 'real';
  /** ユーザー投稿の写真（縮小済みデータURL）。あればこちらを表示する */
  photoDataUrl?: string;
};

export const POSTS: Post[] = [
  {
    id: 'p01',
    tag: '東山',
    title: '夜が明けたばかりの石畳',
    area: '京都府・東山区',
    place: '石塀小路',
    mapQuery: '石塀小路 京都',
    body: '同じ道とは思えないくらい人がいませんでした。石畳が濡れていて、軒先の灯りがまだ点いている時間。昼に来たことのある場所でも、この時間だけは別の街に見えます。',
    categories: ['quiet', 'photo'],
    author: 'チーム投稿',
    isIndoor: false,
    minutes: 30,
    budget: 0,
    timeOfDay: ['morning'],
    who: ['solo','pair'],
    costPt: 1,
    hasPhoto: true,
    photoKind: 'real',
  },
  {
    id: 'p02',
    tag: '路地',
    title: '飛び石をたどって奥へ',
    area: '京都府・東山区',
    place: '石塀小路 周辺の路地',
    mapQuery: '石塀小路 京都',
    body: '表からは中が見えません。飛び石の先に建物が続いていて、雨の日は石が濡れていい色になります。知らないと通り過ぎてしまう入口。',
    categories: ['quiet', 'culture'],
    author: 'チーム投稿',
    isIndoor: false,
    minutes: 20,
    budget: 0,
    timeOfDay: ['day'],
    who: ['solo','pair'],
    costPt: 1,
    hasPhoto: true,
    photoKind: 'real',
  },
  {
    id: 'p03',
    tag: '嵐山',
    title: '夕方の川は誰もいない',
    area: '京都府・右京区',
    place: '嵐山・大堰川沿い',
    mapQuery: '大堰川 嵐山 京都',
    body: '橋のあたりは人だらけですが、少し上流に歩くと静かになります。日が沈む方向に山が重なって、水面に色が乗る時間帯がいちばんきれいでした。',
    categories: ['nature', 'photo'],
    author: 'チーム投稿',
    isIndoor: false,
    minutes: 45,
    budget: 0,
    timeOfDay: ['day'],
    who: ['pair','group'],
    costPt: 1,
    hasPhoto: true,
    photoKind: 'real',
  },
  {
    id: 'p04',
    tag: '庭',
    title: '誰もいない庭に座る',
    area: '京都府・伏見区',
    place: '醍醐寺 三宝院庭園',
    mapQuery: '醍醐寺 三宝院 京都',
    body: '有名な庭園のような整いかたではないけれど、その分ずっと座っていられます。松と飛び石だけの広い庭で、聞こえるのは風の音だけでした。',
    categories: ['quiet', 'nature', 'culture'],
    author: 'チーム投稿',
    isIndoor: false,
    minutes: 60,
    budget: 2,
    timeOfDay: ['day'],
    who: ['solo','pair'],
    costPt: 1,
    hasPhoto: true,
    photoKind: 'real',
  },
  {
    id: 'p05',
    tag: '鴨川',
    title: '川沿いのベンチで何もしない',
    area: '京都府・北区',
    place: '鴨川公園・出雲路周辺',
    mapQuery: '鴨川公園 出雲路 京都',
    body: '観光地ではありません。地元の人が散歩しているだけの場所です。予定を詰めすぎた日に、ここに座って何もしない時間がいちばんよかった。',
    categories: ['quiet', 'nature'],
    author: 'チーム投稿',
    isIndoor: false,
    minutes: 30,
    budget: 0,
    timeOfDay: ['day'],
    who: ['solo','pair'],
    costPt: 1,
    hasPhoto: true,
    photoKind: 'real',
  },
  {
    id: 'p06',
    tag: 'ギャラリー',
    title: '暖簾をくぐると展示室',
    area: '京都府・上京区',
    place: 'be京都',
    mapQuery: 'be京都 ギャラリー',
    body: '普通の建物の一階が展示室になっています。開いているかどうかは暖簾が出ているかで分かる。展示が入れ替わるので、次に来たときも寄りたい場所。',
    categories: ['culture', 'photo'],
    author: 'チーム投稿',
    isIndoor: true,
    minutes: 30,
    budget: 0,
    timeOfDay: ['day'],
    who: ['solo','pair'],
    costPt: 1,
    hasPhoto: true,
    photoKind: 'real',
  },
  {
    id: 'p07',
    tag: '貴船',
    title: '夜の石段をのぼる',
    area: '京都府・左京区',
    place: '貴船神社 参道',
    mapQuery: '貴船神社 京都',
    body: '昼間は人が多い道でも、夜になると街灯だけになります。上りきったところで振り返ると、灯りが一列に並んで見えました。',
    categories: ['night', 'photo'],
    author: 'チーム投稿',
    isIndoor: false,
    minutes: 60,
    budget: 0,
    timeOfDay: ['night'],
    who: ['pair','group'],
    costPt: 1,
    hasPhoto: true,
    photoKind: 'real',
  },
  {
    id: 'p08',
    tag: '嵯峨野',
    title: '緑に挟まれた細い道',
    area: '京都府・右京区',
    place: '祇王寺 周辺の参道',
    mapQuery: '祇王寺 京都',
    body: '目的地までの通り道でしかないのですが、ここを歩く時間がいちばん記憶に残りました。片側が苔むした石垣で、雨上がりが特にきれいです。',
    categories: ['nature', 'quiet', 'photo'],
    author: 'チーム投稿',
    isIndoor: false,
    minutes: 30,
    budget: 1,
    timeOfDay: ['day'],
    who: ['solo','pair'],
    costPt: 1,
    hasPhoto: true,
    photoKind: 'real',
  },
  {
    id: 'p09',
    tag: '木屋町',
    title: '遅い時間に開いている立ち飲み',
    area: '京都府・下京区',
    place: 'たち呑み しゃーぷ 四条木屋町',
    mapQuery: 'たち呑み しゃーぷ 四条木屋町',
    body: '観光客はまずいません。一人で入っても浮かない空気があって、遅くなった日の逃げ場になります。看板が小さいので、知らないと気づかない。',
    categories: ['night', 'food'],
    author: 'チーム投稿',
    isIndoor: true,
    minutes: 60,
    budget: 2,
    timeOfDay: ['night'],
    who: ['solo','pair'],
    costPt: 1,
    hasPhoto: true,
    photoKind: 'real',
  },
  {
    id: 'p10',
    tag: '古書店',
    title: '自転車を停めて本を眺める',
    area: '京都府・左京区',
    place: 'マヤルカ古書店',
    mapQuery: 'マヤルカ古書店 京都',
    body: '間口の狭い店ですが、中に入ると壁一面が棚になっています。目的なく入って、気づいたら一時間いました。静かなので長居できます。',
    categories: ['quiet', 'culture'],
    author: 'チーム投稿',
    isIndoor: true,
    minutes: 45,
    budget: 1,
    timeOfDay: ['day'],
    who: ['solo'],
    costPt: 1,
    hasPhoto: true,
    photoKind: 'real',
  },
  {
    id: 'p11',
    tag: '定食',
    title: '観光価格じゃない食事処',
    area: '京都府・東山区',
    place: '食堂 はやし',
    mapQuery: '食堂 はやし 京都 東山区',
    body: '観光地から少し離れると、こういう店が普通にあります。地元の人しかいませんでした。値段も観光地価格ではないので、旅の途中の食事はこのあたりで。',
    categories: ['food'],
    author: 'チーム投稿',
    isIndoor: true,
    minutes: 45,
    budget: 1,
    timeOfDay: ['day'],
    who: ['solo','pair'],
    costPt: 1,
    hasPhoto: true,
    photoKind: 'real',
  },
  {
    id: 'p12',
    tag: '嵯峨野',
    title: '苔の上を通る細い砂利道',
    area: '京都府・右京区',
    place: '祇王寺',
    mapQuery: '祇王寺 京都',
    body: '一面の苔に、砂利の道が一本だけ通っています。5分で歩き終わってしまうけれど、その5分のために来る価値がありました。雨上がりがいちばんきれい。',
    categories: ['nature', 'quiet', 'photo'],
    author: 'チーム投稿',
    isIndoor: false,
    minutes: 30,
    budget: 1,
    timeOfDay: ['day'],
    who: ['solo','pair'],
    costPt: 1,
    hasPhoto: true,
    photoKind: 'real',
  },
];

export function getPost(id: string): Post | undefined {
  return POSTS.find((p) => p.id === id);
}
