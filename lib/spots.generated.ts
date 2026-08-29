// このファイルは scripts/build-data.mjs が生成する。直接編集しないこと。
// 生成日時: 2026-08-29T00:22:07.532Z
// 出典: Google Places API (New) / 京都市内9地点を探索
// 選別状態: 機械フィルタのみ（291件・未選別）

import type { CategoryId } from './data';

export type GeneratedSpot = {
  id: string;
  name: string;
  area: string;
  rating: number;
  reviewCount: number;
  categories: CategoryId[];
  isIndoor: boolean;
  lat: number;
  lng: number;
  source: 'google';
};

/** 定番観光地の平均口コミ件数。カードの対比に使う */
export const FAMOUS_AVG_REVIEWS = 29382;

/** 平均の母数（定番観光地の件数）。ラベルに出すので実数と一致させること */
export const FAMOUS_COUNT = 18;

/** 人の目による選別が済んでいるか */
export const IS_CURATED = false;

/** オンボーディング用。口コミ件数の上位20件 */
export const GENERATED_FAMOUS: { id: string; name: string; reviewCount: number }[] =
[
  {
    "id": "ChIJIW0uPRUPAWAR6eI6dRzKGns",
    "name": "伏見稲荷大社",
    "reviewCount": 90855
  },
  {
    "id": "ChIJB_vchdMIAWARujTEUIZlr2I",
    "name": "清水寺",
    "reviewCount": 71959
  },
  {
    "id": "ChIJvUbrwCCoAWARX2QiHCsn5A4",
    "name": "金閣寺",
    "reviewCount": 69942
  },
  {
    "id": "ChIJT8uMzZwIAWARnGzsARCjnrY",
    "name": "錦市場",
    "reviewCount": 53617
  },
  {
    "id": "ChIJC5srCtQHAWARLy9qkFmHaxA",
    "name": "元離宮二条城",
    "reviewCount": 42758
  },
  {
    "id": "ChIJqewQoHkIAWAR6RokWp3Iesc",
    "name": "八坂神社",
    "reviewCount": 33620
  },
  {
    "id": "ChIJTar7hQQGAWAREHkXsNkt7tM",
    "name": "東寺",
    "reviewCount": 19857
  },
  {
    "id": "ChIJd9pWqK8IAWAR1L-X_-4WKew",
    "name": "ニデック京都タワー",
    "reviewCount": 18259
  },
  {
    "id": "ChIJ4W9CCwUJAWARyauI6BzKiiU",
    "name": "銀閣寺",
    "reviewCount": 17764
  },
  {
    "id": "ChIJs4Cbj8oIAWARiBZl2-sBK6o",
    "name": "三十三間堂",
    "reviewCount": 17435
  },
  {
    "id": "ChIJk54PuAGqAWARwEgz_9o-nM0",
    "name": "天龍寺",
    "reviewCount": 17001
  },
  {
    "id": "ChIJbeDwe-0HAWARGu4ubMH-Jls",
    "name": "北野天満宮",
    "reviewCount": 16838
  },
  {
    "id": "ChIJjch8GOUIAWART0WX2JLZvnU",
    "name": "平安神宮",
    "reviewCount": 16228
  },
  {
    "id": "ChIJ_fuXcyEJAWARTQDnx6Q5szg",
    "name": "南禅寺",
    "reviewCount": 12586
  },
  {
    "id": "ChIJCZEK8wimAWARi1RkteQaAh0",
    "name": "貴船神社",
    "reviewCount": 12256
  },
  {
    "id": "ChIJp7ocMCqoAWARQoXXRj4Xq-E",
    "name": "龍安寺",
    "reviewCount": 11447
  },
  {
    "id": "ChIJd2mRAFMHAWARPSiWJOj4FOw",
    "name": "渡月橋",
    "reviewCount": 5503
  },
  {
    "id": "ChIJYfiJTR0JAWAR6aLRNJZqn-k",
    "name": "鴨川デルタ（府立公園）",
    "reviewCount": 950
  }
];

/** 提案候補 */
export const GENERATED_SPOTS: GeneratedSpot[] =
[
  {
    "id": "ChIJiRw6XIQJAWARI9929souiLs",
    "name": "後藤象二郎寓居跡記念ギャラリー",
    "area": "中京区",
    "rating": 4.2,
    "reviewCount": 5,
    "categories": [
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.007866899999996,
    "lng": 135.76950349999998,
    "source": "google"
  },
  {
    "id": "ChIJy49Nb8IIAWAR9CtXfBTfJjM",
    "name": "ギャラリー礼",
    "area": "東山区",
    "rating": 4,
    "reviewCount": 5,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.005697999999995,
    "lng": 135.777517,
    "source": "google"
  },
  {
    "id": "ChIJV0PMHgEJAWARLFU0TcbFe6s",
    "name": "ニャムカフェ",
    "area": "左京区",
    "rating": 5,
    "reviewCount": 5,
    "categories": [
      "quiet",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0299178,
    "lng": 135.7737641,
    "source": "google"
  },
  {
    "id": "ChIJ18NV18IJAWARVNIL6UJsUTw",
    "name": "miklo art gallery ミクロアートギャラリー",
    "area": "左京区",
    "rating": 4.6,
    "reviewCount": 5,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.02851460000001,
    "lng": 135.777041,
    "source": "google"
  },
  {
    "id": "ChIJy6OidNMJAWARqzjzGBmSpEQ",
    "name": "迷子",
    "area": "左京区",
    "rating": 4.6,
    "reviewCount": 5,
    "categories": [
      "quiet",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.025539699999996,
    "lng": 135.7948257,
    "source": "google"
  },
  {
    "id": "ChIJL0ysAlAJAWARxnW3CotFEmk",
    "name": "Plus81 Gallery - Kyoto",
    "area": "鹿ケ谷法然院町",
    "rating": 4.2,
    "reviewCount": 5,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.0229296,
    "lng": 135.79592590000001,
    "source": "google"
  },
  {
    "id": "ChIJJ0yfcJIJAWARpXB4pbjVC5A",
    "name": "Kai coffee&whisky",
    "area": "左京区",
    "rating": 5,
    "reviewCount": 5,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0281868,
    "lng": 135.7892871,
    "source": "google"
  },
  {
    "id": "ChIJx0q9IwMJAWAR6xpW_W6j0og",
    "name": "コトバヨネット",
    "area": "左京区",
    "rating": 5,
    "reviewCount": 5,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.0233017,
    "lng": 135.7928,
    "source": "google"
  },
  {
    "id": "ChIJ94ij6fYJAWARxqR50LUWPk4",
    "name": "ギャラリー黒壁ことりみゆき美術館",
    "area": "左京区",
    "rating": 5,
    "reviewCount": 5,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.0252487,
    "lng": 135.7902617,
    "source": "google"
  },
  {
    "id": "ChIJp-BLEAAJAWAREzQomVe1lmE",
    "name": "清宗記念館",
    "area": "左京区",
    "rating": 4.6,
    "reviewCount": 5,
    "categories": [
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.0318623,
    "lng": 135.7916857,
    "source": "google"
  },
  {
    "id": "ChIJtYjKL1IIAWAR6UmAUq2-gCQ",
    "name": "Kathy's Kitchen",
    "area": "左京区",
    "rating": 5,
    "reviewCount": 5,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0351778,
    "lng": 135.7858067,
    "source": "google"
  },
  {
    "id": "ChIJITBXiRIJAWAR8IdtrsD_8hg",
    "name": "あおいろごはん",
    "area": "上京区",
    "rating": 4.8,
    "reviewCount": 5,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 35.033668,
    "lng": 135.7562949,
    "source": "google"
  },
  {
    "id": "ChIJIT7K5N8HAWARr3PV-vU0Qdk",
    "name": "西陣舟橋 高師直邸宅跡",
    "area": "上京区",
    "rating": 4.4,
    "reviewCount": 5,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": false,
    "lat": 35.0298127,
    "lng": 135.7514915,
    "source": "google"
  },
  {
    "id": "ChIJW_QUweYHAWARXnKkQCshcfc",
    "name": "すずめ",
    "area": "右京区",
    "rating": 4.8,
    "reviewCount": 5,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0142647,
    "lng": 135.687329,
    "source": "google"
  },
  {
    "id": "ChIJ7eaVZNUHAWARQpJjfKgc7is",
    "name": "嵯峨中山公園 平等寺故地",
    "area": "右京区",
    "rating": 4,
    "reviewCount": 5,
    "categories": [
      "nature",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 35.014440199999996,
    "lng": 135.6851398,
    "source": "google"
  },
  {
    "id": "ChIJNcdOpPIPAWARzf0bXTJM8LA",
    "name": "中書島公園",
    "area": "伏見区",
    "rating": 4.2,
    "reviewCount": 5,
    "categories": [
      "nature",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 34.9271866,
    "lng": 135.76118409999998,
    "source": "google"
  },
  {
    "id": "ChIJizLi2GIOAWARtl4KnYY0wOc",
    "name": "プチトマト",
    "area": "山科区",
    "rating": 4.2,
    "reviewCount": 5,
    "categories": [
      "quiet",
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9694089,
    "lng": 135.81769939999998,
    "source": "google"
  },
  {
    "id": "ChIJiSAWjp0PAWAR0C4FrU8E_pU",
    "name": "おばんざい舞川",
    "area": "山科区",
    "rating": 5,
    "reviewCount": 5,
    "categories": [
      "food",
      "night"
    ],
    "isIndoor": true,
    "lat": 34.9697351,
    "lng": 135.8137279,
    "source": "google"
  },
  {
    "id": "ChIJJ0VZ-G4OAWARDe4torX88cE",
    "name": "薬医門",
    "area": "山科区",
    "rating": 4.8,
    "reviewCount": 5,
    "categories": [
      "culture",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 34.9592054,
    "lng": 135.8160239,
    "source": "google"
  },
  {
    "id": "ChIJkROJZbQJAWARZ9Sk9vtw7ew",
    "name": "TAKAキューブ",
    "area": "中京区",
    "rating": 5,
    "reviewCount": 6,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0044684,
    "lng": 135.7683433,
    "source": "google"
  },
  {
    "id": "ChIJy4ZrKREJAWARiqaU-PZE54A",
    "name": "休憩所(四条小橋南)",
    "area": "下京区",
    "rating": 4.8,
    "reviewCount": 6,
    "categories": [
      "nature",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 35.003479299999995,
    "lng": 135.7704206,
    "source": "google"
  },
  {
    "id": "ChIJbR1uTvMJAWARHuwIjKhbuyg",
    "name": "南広場",
    "area": "下京区",
    "rating": 4.7,
    "reviewCount": 6,
    "categories": [
      "nature",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 34.9858556,
    "lng": 135.7587624,
    "source": "google"
  },
  {
    "id": "ChIJ90ZHgQIJAWARvheq6_wdvvs",
    "name": "祇をん 壱梅（旧祇をん貴々）",
    "area": "東山区",
    "rating": 4.2,
    "reviewCount": 6,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0044196,
    "lng": 135.7771206,
    "source": "google"
  },
  {
    "id": "ChIJzettDm4JAWARiVRCtGkATKM",
    "name": "清水坂観光駐車場 休憩所",
    "area": "東山区",
    "rating": 4,
    "reviewCount": 6,
    "categories": [
      "nature",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 34.9961568,
    "lng": 135.7802223,
    "source": "google"
  },
  {
    "id": "ChIJJc_ZYgAJAWARW66EBZPNxMU",
    "name": "Kyoto Book Swap Free Library",
    "area": "東山区",
    "rating": 4.8,
    "reviewCount": 6,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.001323899999996,
    "lng": 135.77183549999998,
    "source": "google"
  },
  {
    "id": "ChIJ2-YVYKsJAWAR3wxxEvcr_iw",
    "name": "Yozo Art Gallery 祇園",
    "area": "東山区",
    "rating": 5,
    "reviewCount": 6,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.0026283,
    "lng": 135.7771283,
    "source": "google"
  },
  {
    "id": "ChIJw5qmKAAJAWARKj1zQi7wnJA",
    "name": "暮靄書房",
    "area": "上京区",
    "rating": 4.7,
    "reviewCount": 6,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.03022550000001,
    "lng": 135.7683406,
    "source": "google"
  },
  {
    "id": "ChIJ6wTFc1cIAWAR_nqFwD3pMe0",
    "name": "井上書店",
    "area": "左京区",
    "rating": 4.2,
    "reviewCount": 6,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.028707,
    "lng": 135.781484,
    "source": "google"
  },
  {
    "id": "ChIJcTFchf8IAWARHLryhYwp8p8",
    "name": "Bar O'AXEL(ザクセル)",
    "area": "左京区",
    "rating": 4.3,
    "reviewCount": 6,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.028749999999995,
    "lng": 135.788245,
    "source": "google"
  },
  {
    "id": "ChIJI2ybLRsJAWARUb9Jamm-KzE",
    "name": "哲学の道ブルー",
    "area": "左京区",
    "rating": 4.5,
    "reviewCount": 6,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.023893699999995,
    "lng": 135.79658999999998,
    "source": "google"
  },
  {
    "id": "ChIJGRdjDgIJAWARiqb-5Qdsn0I",
    "name": "日本画体験処 絵まき",
    "area": "左京区",
    "rating": 4.2,
    "reviewCount": 6,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.0249879,
    "lng": 135.79047749999998,
    "source": "google"
  },
  {
    "id": "ChIJ3RNOnIMJAWARO3il_kZevIA",
    "name": "Nunuka life",
    "area": "左京区",
    "rating": 4.5,
    "reviewCount": 6,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.0260947,
    "lng": 135.7963009,
    "source": "google"
  },
  {
    "id": "ChIJyUUU9u8HAWARaGO7wvb-ysg",
    "name": "bar jaehoe (チェフェ)",
    "area": "上京区",
    "rating": 4.8,
    "reviewCount": 6,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0341963,
    "lng": 135.741433,
    "source": "google"
  },
  {
    "id": "ChIJea67k-AHAWARSJFVGsqTFdg",
    "name": "（有）西陣書院",
    "area": "上京区",
    "rating": 4.7,
    "reviewCount": 6,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.0299484,
    "lng": 135.7489305,
    "source": "google"
  },
  {
    "id": "ChIJeZ1n1ecHAWARitPEoS3Bass",
    "name": "三盛堂書店",
    "area": "上京区",
    "rating": 4.2,
    "reviewCount": 6,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.0282572,
    "lng": 135.7426298,
    "source": "google"
  },
  {
    "id": "ChIJkwqkdXMIAWAR-BYFFRQmeyU",
    "name": "獺祭書房",
    "area": "上京区",
    "rating": 4.8,
    "reviewCount": 6,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.0309311,
    "lng": 135.757735,
    "source": "google"
  },
  {
    "id": "ChIJa0JkWgAHAWARd2qfUyteBZk",
    "name": "ギャラリーABRI/蓄音機Gallery Yu",
    "area": "北区",
    "rating": 5,
    "reviewCount": 6,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.0378092,
    "lng": 135.74749889999998,
    "source": "google"
  },
  {
    "id": "ChIJTcxFHVUHAWARj8tEVQ3UYCE",
    "name": "京・おいもやさんの田中屋",
    "area": "右京区",
    "rating": 4.3,
    "reviewCount": 6,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0120468,
    "lng": 135.6797986,
    "source": "google"
  },
  {
    "id": "ChIJyet79FQHAWARFVRVBF1ey70",
    "name": "洛西用水",
    "area": "西京区",
    "rating": 4.7,
    "reviewCount": 6,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": false,
    "lat": 35.0110612,
    "lng": 135.6785543,
    "source": "google"
  },
  {
    "id": "ChIJHciidgAHAWAR79JYOE8FJ38",
    "name": "아라시야마 인력거",
    "area": "右京区",
    "rating": 4.8,
    "reviewCount": 6,
    "categories": [
      "photo",
      "culture"
    ],
    "isIndoor": false,
    "lat": 35.0135419,
    "lng": 135.6768482,
    "source": "google"
  },
  {
    "id": "ChIJDfAjxOUPAWAR22Eplwyh-Pk",
    "name": "伏水 焼鉄",
    "area": "伏見区",
    "rating": 4.3,
    "reviewCount": 6,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9325,
    "lng": 135.7605556,
    "source": "google"
  },
  {
    "id": "ChIJFSBisGQOAWARMHkGKjKORKM",
    "name": "アポイント",
    "area": "山科区",
    "rating": 4.8,
    "reviewCount": 6,
    "categories": [
      "quiet",
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9664974,
    "lng": 135.8179463,
    "source": "google"
  },
  {
    "id": "ChIJEeYQWAAPAWARv6kytxoHq30",
    "name": "名神高速道路起工の地",
    "area": "山科区",
    "rating": 4.8,
    "reviewCount": 6,
    "categories": [
      "photo",
      "culture"
    ],
    "isIndoor": false,
    "lat": 34.9642626,
    "lng": 135.8124837,
    "source": "google"
  },
  {
    "id": "ChIJgwcRU9MJAWARnr7ca_WKerE",
    "name": "コトチカ広場",
    "area": "下京区",
    "rating": 4.3,
    "reviewCount": 7,
    "categories": [
      "photo",
      "culture"
    ],
    "isIndoor": false,
    "lat": 34.9864751,
    "lng": 135.7600027,
    "source": "google"
  },
  {
    "id": "ChIJeQmPBrIJAWARPj7RcayrSzg",
    "name": "長楽館ライブラリーバー マデイラ",
    "area": "東山区",
    "rating": 4.9,
    "reviewCount": 7,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.003143699999995,
    "lng": 135.7800244,
    "source": "google"
  },
  {
    "id": "ChIJcddYve8JAWARXRB597qW0uc",
    "name": "粟田坊町公園",
    "area": "東山区",
    "rating": 4.3,
    "reviewCount": 7,
    "categories": [
      "nature",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 35.0084532,
    "lng": 135.7814565,
    "source": "google"
  },
  {
    "id": "ChIJhbGLmvMJAWARRDNm3LA-4XI",
    "name": "銀雅廊",
    "area": "東山区",
    "rating": 4.9,
    "reviewCount": 7,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.0049999,
    "lng": 135.7764909,
    "source": "google"
  },
  {
    "id": "ChIJTwx4M9sIAWARAoGFgxQPPBk",
    "name": "大雅堂旧跡",
    "area": "東山区",
    "rating": 4.4,
    "reviewCount": 7,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": false,
    "lat": 35.0021073,
    "lng": 135.7807803,
    "source": "google"
  },
  {
    "id": "ChIJg1Vz9AEJAWAR3zZwEnHe-z4",
    "name": "アガルタ",
    "area": "左京区",
    "rating": 4.9,
    "reviewCount": 7,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.026284499999996,
    "lng": 135.79098150000002,
    "source": "google"
  },
  {
    "id": "ChIJm5bi6pQJAWARm_lLPOuiUHw",
    "name": "gallery Biga",
    "area": "左京区",
    "rating": 5,
    "reviewCount": 7,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.0247406,
    "lng": 135.795359,
    "source": "google"
  },
  {
    "id": "ChIJvzAgXgAJAWAR2QPOrUftYjc",
    "name": "ドンク北白川店",
    "area": "左京区",
    "rating": 4.1,
    "reviewCount": 7,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0345005,
    "lng": 135.7913815,
    "source": "google"
  },
  {
    "id": "ChIJraPNSQQJAWAR4wImWGDhMq4",
    "name": "法然院森のセンター",
    "area": "左京区",
    "rating": 4,
    "reviewCount": 7,
    "categories": [
      "photo",
      "culture"
    ],
    "isIndoor": false,
    "lat": 35.0233299,
    "lng": 135.7966457,
    "source": "google"
  },
  {
    "id": "ChIJ2X98o3MIAWARLR8HBCwABPY",
    "name": "大宮書房",
    "area": "上京区",
    "rating": 4.6,
    "reviewCount": 7,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.030617,
    "lng": 135.7583,
    "source": "google"
  },
  {
    "id": "ChIJETYHyjcPAWARkJcBoVvoIs8",
    "name": "cafe&bar Milla",
    "area": "伏見区",
    "rating": 4.1,
    "reviewCount": 7,
    "categories": [
      "quiet",
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9321889,
    "lng": 135.7601278,
    "source": "google"
  },
  {
    "id": "ChIJq6IaDVoPAWARfldC4DOKNSA",
    "name": "MrSIS ー珈琲とフォカッチャとー",
    "area": "伏見区",
    "rating": 4.9,
    "reviewCount": 7,
    "categories": [
      "quiet",
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9334151,
    "lng": 135.76067840000002,
    "source": "google"
  },
  {
    "id": "ChIJlUStU1kPAWAR6S8g_KHWzmk",
    "name": "アトリエ悠",
    "area": "伏見区",
    "rating": 4.6,
    "reviewCount": 7,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 34.935327699999995,
    "lng": 135.7632114,
    "source": "google"
  },
  {
    "id": "ChIJ21W7CvQOAWARv5pfuWE-oto",
    "name": "宮道朝臣列子墓(宮道古墳)",
    "area": "山科区",
    "rating": 4.1,
    "reviewCount": 7,
    "categories": [
      "photo",
      "culture"
    ],
    "isIndoor": false,
    "lat": 34.9703016,
    "lng": 135.8053803,
    "source": "google"
  },
  {
    "id": "ChIJ7ylxCwAJAWARkMq0hG74qfI",
    "name": "立ち呑みChoBORRACHO",
    "area": "中京区",
    "rating": 4.9,
    "reviewCount": 8,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 35.00464240000001,
    "lng": 135.7682635,
    "source": "google"
  },
  {
    "id": "ChIJweHG-6IJAWARQM-0O-WJnQs",
    "name": "Bar Osome",
    "area": "中京区",
    "rating": 4.5,
    "reviewCount": 8,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.004335399999995,
    "lng": 135.768584,
    "source": "google"
  },
  {
    "id": "ChIJAQCQVZQIAWARcq6MvJjF8PA",
    "name": "浄心寺",
    "area": "中京区",
    "rating": 4.3,
    "reviewCount": 8,
    "categories": [
      "culture",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 35.0048473,
    "lng": 135.7686507,
    "source": "google"
  },
  {
    "id": "ChIJYZPuZQAJAWARbiw41-QBy6Y",
    "name": "高島屋入口マリオの土管オブジェ",
    "area": "下京区",
    "rating": 4.5,
    "reviewCount": 8,
    "categories": [
      "photo",
      "culture"
    ],
    "isIndoor": false,
    "lat": 35.0036716,
    "lng": 135.76833249999999,
    "source": "google"
  },
  {
    "id": "ChIJsb-V3KAJAWARZEDkcQLm50w",
    "name": "ぎゃらりぃ百之助",
    "area": "下京区",
    "rating": 5,
    "reviewCount": 8,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 34.9906017,
    "lng": 135.75671549999998,
    "source": "google"
  },
  {
    "id": "ChIJx7d8RwAJAWAR9HL3Vtcnu94",
    "name": "Cafe KUN",
    "area": "東山区",
    "rating": 4.8,
    "reviewCount": 8,
    "categories": [
      "quiet",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0048124,
    "lng": 135.7795217,
    "source": "google"
  },
  {
    "id": "ChIJaUCYi8UIAWARxgUKfhe67Mc",
    "name": "東山書院",
    "area": "東山区",
    "rating": 4.1,
    "reviewCount": 8,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 34.997679399999996,
    "lng": 135.777162,
    "source": "google"
  },
  {
    "id": "ChIJywQVRAAJAWARVU8H9xuZTGo",
    "name": "鴨川スタンド",
    "area": "左京区",
    "rating": 4.6,
    "reviewCount": 8,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0306561,
    "lng": 135.77178890000002,
    "source": "google"
  },
  {
    "id": "ChIJy59iD4UJAWARItxr7KLuuuQ",
    "name": "京都大学歴史展示室",
    "area": "左京区",
    "rating": 4.5,
    "reviewCount": 8,
    "categories": [
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.0260539,
    "lng": 135.7809748,
    "source": "google"
  },
  {
    "id": "ChIJxaTHt-MIAWARkYu_H0Bmnk8",
    "name": "千茜ニューサパー",
    "area": "左京区",
    "rating": 4.3,
    "reviewCount": 8,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.016568,
    "lng": 135.7873085,
    "source": "google"
  },
  {
    "id": "ChIJHzqzQvoIAWARQERBEdSIoMs",
    "name": "奥井理想米店",
    "area": "左京区",
    "rating": 4.6,
    "reviewCount": 8,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0201498,
    "lng": 135.7817876,
    "source": "google"
  },
  {
    "id": "ChIJEesy3d4HAWARZ-SWg4wVFvg",
    "name": "名和児童公園",
    "area": "上京区",
    "rating": 4,
    "reviewCount": 8,
    "categories": [
      "nature",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 35.025656999999995,
    "lng": 135.7491425,
    "source": "google"
  },
  {
    "id": "ChIJcYxIbmIHAWARjM_raJvD3y8",
    "name": "LACE MUSEUM LOOP",
    "area": "上京区",
    "rating": 4.8,
    "reviewCount": 8,
    "categories": [
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.0286422,
    "lng": 135.7478464,
    "source": "google"
  },
  {
    "id": "ChIJw5kCrsmrAWAR_BRchADRRHs",
    "name": "アートギャラリーシグナス",
    "area": "右京区",
    "rating": 5,
    "reviewCount": 8,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.017468400000006,
    "lng": 135.67612259999999,
    "source": "google"
  },
  {
    "id": "ChIJ7XekrFMHAWARUei7TntI-nc",
    "name": "慈恵山 金剛寺",
    "area": "西京区",
    "rating": 4.4,
    "reviewCount": 8,
    "categories": [
      "culture",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 35.0081229,
    "lng": 135.67909540000002,
    "source": "google"
  },
  {
    "id": "ChIJ10hvLawPAWARDGdXjIuyjSw",
    "name": "atelier uta-ざくざくさぶれ-",
    "area": "山科区",
    "rating": 4.8,
    "reviewCount": 8,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9720187,
    "lng": 135.8225999,
    "source": "google"
  },
  {
    "id": "ChIJnxm76ZMIAWARJV2Y5azVUUk",
    "name": "福音の家 KYOTO",
    "area": "中京区",
    "rating": 4.8,
    "reviewCount": 9,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.0072311,
    "lng": 135.7670932,
    "source": "google"
  },
  {
    "id": "ChIJx5ijHucJAWARhQ2FiCJKg3Q",
    "name": "Cafe 鴨しれない",
    "area": "左京区",
    "rating": 4.7,
    "reviewCount": 9,
    "categories": [
      "quiet",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0301689,
    "lng": 135.7735027,
    "source": "google"
  },
  {
    "id": "ChIJSwl0zUUIAWAR1t-gIFmscoE",
    "name": "プロレス美術館",
    "area": "左京区",
    "rating": 4.4,
    "reviewCount": 9,
    "categories": [
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.0373693,
    "lng": 135.7783087,
    "source": "google"
  },
  {
    "id": "ChIJ-Rn6Yx4JAWARmqo3h6JzuKg",
    "name": "Coffice",
    "area": "左京区",
    "rating": 5,
    "reviewCount": 9,
    "categories": [
      "quiet",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0223158,
    "lng": 135.7930517,
    "source": "google"
  },
  {
    "id": "ChIJAQAd7v4IAWARKP3m2XzwFg4",
    "name": "茂庵田舎席",
    "area": "左京区",
    "rating": 4.1,
    "reviewCount": 9,
    "categories": [
      "photo",
      "culture"
    ],
    "isIndoor": false,
    "lat": 35.0256458,
    "lng": 135.7870479,
    "source": "google"
  },
  {
    "id": "ChIJT8uMKoEJAWARMvy_LHz9nP4",
    "name": "こっとう・雑貨 密眼堂",
    "area": "上京区",
    "rating": 4.8,
    "reviewCount": 9,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.025597499999996,
    "lng": 135.75501470000003,
    "source": "google"
  },
  {
    "id": "ChIJu0_MOuQHAWARaVjotRtZ6eM",
    "name": "天鵞絨美術館",
    "area": "上京区",
    "rating": 4.9,
    "reviewCount": 9,
    "categories": [
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.0325347,
    "lng": 135.7457292,
    "source": "google"
  },
  {
    "id": "ChIJr9RxrdYHAWAR8Rfx32NHmC8",
    "name": "嵐山西一川第二公園",
    "area": "西京区",
    "rating": 4.3,
    "reviewCount": 9,
    "categories": [
      "nature",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 35.0112425,
    "lng": 135.6808221,
    "source": "google"
  },
  {
    "id": "ChIJjTK5QFSrAWARrkFAASDoWMM",
    "name": "Doll Gallery",
    "area": "右京区",
    "rating": 5,
    "reviewCount": 9,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.0190407,
    "lng": 135.6694623,
    "source": "google"
  },
  {
    "id": "ChIJUflZGwAHAWARD-Cb6MfDAac",
    "name": "マルシェすみのくら",
    "area": "右京区",
    "rating": 4.7,
    "reviewCount": 9,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0150627,
    "lng": 135.6815456,
    "source": "google"
  },
  {
    "id": "ChIJr2XJ-2gHAWARR0Agq6ECEbY",
    "name": "A Private Boat Shamisen Experience",
    "area": "西京区",
    "rating": 4.6,
    "reviewCount": 9,
    "categories": [
      "photo",
      "culture"
    ],
    "isIndoor": false,
    "lat": 35.011623799999995,
    "lng": 135.6767869,
    "source": "google"
  },
  {
    "id": "ChIJtyT5UnMHAWARTYXmjRYSt20",
    "name": "方位案内盤",
    "area": "右京区",
    "rating": 4.9,
    "reviewCount": 9,
    "categories": [
      "photo",
      "culture"
    ],
    "isIndoor": false,
    "lat": 35.0123862,
    "lng": 135.6791744,
    "source": "google"
  },
  {
    "id": "ChIJDQ5auRgPAWARa32Ao3wnFtg",
    "name": "ねことバナナの木",
    "area": "伏見区",
    "rating": 4.2,
    "reviewCount": 9,
    "categories": [
      "quiet",
      "food"
    ],
    "isIndoor": true,
    "lat": 34.933622899999996,
    "lng": 135.7619217,
    "source": "google"
  },
  {
    "id": "ChIJ084yj5APAWARhwhHLgPAhYE",
    "name": "おっさんsBAR ピアレス",
    "area": "伏見区",
    "rating": 4.4,
    "reviewCount": 9,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9326501,
    "lng": 135.7608502,
    "source": "google"
  },
  {
    "id": "ChIJq2dqsrAIAWAR0u1J8bGMdzA",
    "name": "眼科・外科医療器具歴史博物館",
    "area": "下京区",
    "rating": 4,
    "reviewCount": 10,
    "categories": [
      "culture"
    ],
    "isIndoor": true,
    "lat": 34.991788199999995,
    "lng": 135.7661047,
    "source": "google"
  },
  {
    "id": "ChIJCUPitdEJAWAR4c2RPFiCL1g",
    "name": "WA MATCHA 京都祇園店",
    "area": "東山区",
    "rating": 4.7,
    "reviewCount": 10,
    "categories": [
      "quiet",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0045465,
    "lng": 135.7797397,
    "source": "google"
  },
  {
    "id": "ChIJ2a2MGgAJAWARwiUovhA3p7w",
    "name": "やきとり とり穂",
    "area": "左京区",
    "rating": 4.7,
    "reviewCount": 10,
    "categories": [
      "food",
      "night"
    ],
    "isIndoor": true,
    "lat": 35.0302226,
    "lng": 135.77334399999998,
    "source": "google"
  },
  {
    "id": "ChIJn5v31f8IAWARIysrivOtP_Q",
    "name": "竹岡書店",
    "area": "左京区",
    "rating": 4,
    "reviewCount": 10,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.028029,
    "lng": 135.79001599999998,
    "source": "google"
  },
  {
    "id": "ChIJxbabov8IAWARavWLBIAb_BA",
    "name": "朋友書店",
    "area": "左京区",
    "rating": 4.2,
    "reviewCount": 10,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.0280333,
    "lng": 135.78814409999998,
    "source": "google"
  },
  {
    "id": "ChIJY40sJ2YIAWARcQjGceaNrh0",
    "name": "只本屋",
    "area": "左京区",
    "rating": 4.7,
    "reviewCount": 10,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.0220198,
    "lng": 135.7825942,
    "source": "google"
  },
  {
    "id": "ChIJhUPt974HAWARAhlselyF1GE",
    "name": "Japanese traditional bedding \"FUTON\" experience museum 日本伝統寝具体験資料館",
    "area": "北区",
    "rating": 4.2,
    "reviewCount": 10,
    "categories": [
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.042906599999995,
    "lng": 135.7484413,
    "source": "google"
  },
  {
    "id": "ChIJKwicJKYPAWARYQQqlumNxP8",
    "name": "ザ・コロニーバー",
    "area": "伏見区",
    "rating": 4.6,
    "reviewCount": 10,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9323215,
    "lng": 135.7633404,
    "source": "google"
  },
  {
    "id": "ChIJdcUrgm0PAWAR6A7pyRQJNqY",
    "name": "からくり時計おやかまっさん",
    "area": "伏見区",
    "rating": 4.1,
    "reviewCount": 10,
    "categories": [
      "photo",
      "culture"
    ],
    "isIndoor": false,
    "lat": 34.9330576,
    "lng": 135.7638508,
    "source": "google"
  },
  {
    "id": "ChIJx__kNfQOAWARIgRRCMU97T8",
    "name": "マホロバ",
    "area": "山科区",
    "rating": 4.2,
    "reviewCount": 10,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 34.968373299999996,
    "lng": 135.8054028,
    "source": "google"
  },
  {
    "id": "ChIJDYxE2ZcJAWARYjIwM0qZb00",
    "name": "be there",
    "area": "下京区",
    "rating": 5,
    "reviewCount": 11,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.003062799999995,
    "lng": 135.7660141,
    "source": "google"
  },
  {
    "id": "ChIJy0T61UYJAWARtQ1dunKpi-w",
    "name": "COFFEE BAR Beige",
    "area": "東山区",
    "rating": 4.3,
    "reviewCount": 11,
    "categories": [
      "quiet",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0026242,
    "lng": 135.7782087,
    "source": "google"
  },
  {
    "id": "ChIJNYAI2c8IAWARIXpEJojk7D0",
    "name": "京都市文化財建造物保存技術研修センター",
    "area": "東山区",
    "rating": 4.7,
    "reviewCount": 11,
    "categories": [
      "culture"
    ],
    "isIndoor": true,
    "lat": 34.997403999999996,
    "lng": 135.780342,
    "source": "google"
  },
  {
    "id": "ChIJ61WdaGcJAWARepc8HVVpXSY",
    "name": "シネマチックサルーン",
    "area": "上京区",
    "rating": 5,
    "reviewCount": 11,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.028284899999996,
    "lng": 135.7697598,
    "source": "google"
  },
  {
    "id": "ChIJGw9LDLIJAWARYpyp9j3B99E",
    "name": "賀茂川ウッドデッキ",
    "area": "上京区",
    "rating": 4.7,
    "reviewCount": 11,
    "categories": [
      "nature",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 35.0296999,
    "lng": 135.7710157,
    "source": "google"
  },
  {
    "id": "ChIJgUuiML8JAWAR6ZKgh-lxCb0",
    "name": "文顕堂",
    "area": "左京区",
    "rating": 5,
    "reviewCount": 11,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.025732399999995,
    "lng": 135.79555589999998,
    "source": "google"
  },
  {
    "id": "ChIJCVtscwAJAWARbgIe8LhsBEo",
    "name": "巽橋疏水",
    "area": "左京区",
    "rating": 4.5,
    "reviewCount": 11,
    "categories": [
      "photo",
      "culture"
    ],
    "isIndoor": false,
    "lat": 35.0214654,
    "lng": 135.7942618,
    "source": "google"
  },
  {
    "id": "ChIJ2WnBNwAHAWARGrr5SV5VVEc",
    "name": "LOWSTARRY",
    "area": "上京区",
    "rating": 5,
    "reviewCount": 11,
    "categories": [
      "quiet",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0338147,
    "lng": 135.7507844,
    "source": "google"
  },
  {
    "id": "ChIJr_jdp-IHAWAR3hYxy4nIrPk",
    "name": "アルコーヴ",
    "area": "北区",
    "rating": 4.5,
    "reviewCount": 11,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.038723,
    "lng": 135.75202199999998,
    "source": "google"
  },
  {
    "id": "ChIJJ7-JrLEJAWAR249PhzbWYr0",
    "name": "新生さくら広場",
    "area": "上京区",
    "rating": 4.5,
    "reviewCount": 11,
    "categories": [
      "nature",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 35.033573,
    "lng": 135.756979,
    "source": "google"
  },
  {
    "id": "ChIJ6wYxW_sHAWARRLKwVNnhlnw",
    "name": "藤森寮",
    "area": "北区",
    "rating": 4.9,
    "reviewCount": 11,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.0376374,
    "lng": 135.7467983,
    "source": "google"
  },
  {
    "id": "ChIJTdJUMwAHAWARBp5ZgYXAADE",
    "name": "HO-OH Pokemon Manhole Cover",
    "area": "右京区",
    "rating": 5,
    "reviewCount": 11,
    "categories": [
      "photo",
      "culture"
    ],
    "isIndoor": false,
    "lat": 35.011853699999996,
    "lng": 135.6787345,
    "source": "google"
  },
  {
    "id": "ChIJKUd4OEcPAWARna4RrYf15aQ",
    "name": "京食パン工房 ここん 大手筋店",
    "area": "伏見区",
    "rating": 4.2,
    "reviewCount": 11,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9329002,
    "lng": 135.7637331,
    "source": "google"
  },
  {
    "id": "ChIJSdLnCgAPAWARMWI6E2KsblE",
    "name": "Clair Bakery",
    "area": "山科区",
    "rating": 4,
    "reviewCount": 11,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9729363,
    "lng": 135.8148974,
    "source": "google"
  },
  {
    "id": "ChIJE64Yd20PAWARlXx5Q9m3wT4",
    "name": "Atelier bonheur bonbon (アトリエボヌールボンボン)",
    "area": "山科区",
    "rating": 4.5,
    "reviewCount": 11,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9732705,
    "lng": 135.8145001,
    "source": "google"
  },
  {
    "id": "ChIJwWaY5ZQIAWARR3nK80fxXDg",
    "name": "ギャラリーにしかわ",
    "area": "中京区",
    "rating": 4.3,
    "reviewCount": 12,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.0055252,
    "lng": 135.7694462,
    "source": "google"
  },
  {
    "id": "ChIJbxoaH8MIAWARPUOrHOYDdT0",
    "name": "eN arts",
    "area": "東山区",
    "rating": 4.7,
    "reviewCount": 12,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.0049069,
    "lng": 135.7792253,
    "source": "google"
  },
  {
    "id": "ChIJY1FXzEkJAWARpvLXn_D2WkE",
    "name": "ammel",
    "area": "上京区",
    "rating": 5,
    "reviewCount": 12,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.0241484,
    "lng": 135.7429995,
    "source": "google"
  },
  {
    "id": "ChIJwy7QqeAHAWARNGnjVl2RDE4",
    "name": "箔屋野口",
    "area": "上京区",
    "rating": 4.7,
    "reviewCount": 12,
    "categories": [
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.0285547,
    "lng": 135.7477583,
    "source": "google"
  },
  {
    "id": "ChIJGz3jaWgHAWAR_NlQHYEiPmA",
    "name": "Japanese traditional tea & lamp museum あかりと茶の湯 日本伝統燈具博物館",
    "area": "門前町",
    "rating": 4.5,
    "reviewCount": 12,
    "categories": [
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.0429035,
    "lng": 135.7485083,
    "source": "google"
  },
  {
    "id": "ChIJT_HvTw8PAWARxptrSCAF2lM",
    "name": "La Neige",
    "area": "伏見区",
    "rating": 4.8,
    "reviewCount": 12,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 34.9318194,
    "lng": 135.7704171,
    "source": "google"
  },
  {
    "id": "ChIJrWv2TRsPAWARN2BlnpfmX3M",
    "name": "ナナホシテントウ",
    "area": "伏見区",
    "rating": 4.7,
    "reviewCount": 12,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 34.927745,
    "lng": 135.7658993,
    "source": "google"
  },
  {
    "id": "ChIJFw0cjAoPAWARxtbz8fDZdS4",
    "name": "三十石船乗り場",
    "area": "伏見区",
    "rating": 4.5,
    "reviewCount": 12,
    "categories": [
      "photo",
      "culture"
    ],
    "isIndoor": false,
    "lat": 34.929973,
    "lng": 135.7590214,
    "source": "google"
  },
  {
    "id": "ChIJDRgtGNQPAWAR6a1tZg8SFGo",
    "name": "Cafe bar and",
    "area": "山科区",
    "rating": 4.8,
    "reviewCount": 12,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9696873,
    "lng": 135.8137118,
    "source": "google"
  },
  {
    "id": "ChIJVbCql10OAWAR4XFgmwuT-Qo",
    "name": "氷室園",
    "area": "山科区",
    "rating": 4.1,
    "reviewCount": 12,
    "categories": [
      "nature",
      "quiet",
      "photo"
    ],
    "isIndoor": false,
    "lat": 34.9610838,
    "lng": 135.80795279999998,
    "source": "google"
  },
  {
    "id": "ChIJRVAHxJsJAWARd19x4yM0yy8",
    "name": "Buddhist Paintings of Nirvana",
    "area": "東山区",
    "rating": 4.4,
    "reviewCount": 13,
    "categories": [
      "culture"
    ],
    "isIndoor": true,
    "lat": 34.9996188,
    "lng": 135.7804263,
    "source": "google"
  },
  {
    "id": "ChIJXUmBaGgIAWARgwHF4GjZHRs",
    "name": "風の駅",
    "area": "上京区",
    "rating": 4.8,
    "reviewCount": 13,
    "categories": [
      "quiet",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.030381,
    "lng": 135.7693766,
    "source": "google"
  },
  {
    "id": "ChIJrRtBcQAJAWARS59w9etAnBs",
    "name": "うどんバーぽんこつ",
    "area": "左京区",
    "rating": 4.8,
    "reviewCount": 13,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0299541,
    "lng": 135.7797178,
    "source": "google"
  },
  {
    "id": "ChIJaYSe5rUJAWAROlo1NZsAP_I",
    "name": "いろり文庫 京都本店",
    "area": "左京区",
    "rating": 4.5,
    "reviewCount": 13,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.0266683,
    "lng": 135.7839616,
    "source": "google"
  },
  {
    "id": "ChIJiUIWWxsJAWARoAmSn8KL5aw",
    "name": "japanese art GALLERY YAMADA",
    "area": "左京区",
    "rating": 5,
    "reviewCount": 13,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.0227876,
    "lng": 135.7952757,
    "source": "google"
  },
  {
    "id": "ChIJpeUPZo4HAWARovGhxFNu7SE",
    "name": "ちーずきっちん",
    "area": "上京区",
    "rating": 4.7,
    "reviewCount": 13,
    "categories": [
      "quiet",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.031511,
    "lng": 135.7503772,
    "source": "google"
  },
  {
    "id": "ChIJP1PVD0AHAWAROU3dM5G6cYk",
    "name": "萬又",
    "area": "上京区",
    "rating": 4.9,
    "reviewCount": 13,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0311419,
    "lng": 135.7460178,
    "source": "google"
  },
  {
    "id": "ChIJF92BinUIAWARYrKfiyTBIXU",
    "name": "戻橋公園",
    "area": "上京区",
    "rating": 4,
    "reviewCount": 13,
    "categories": [
      "nature",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 35.0272369,
    "lng": 135.75210049999998,
    "source": "google"
  },
  {
    "id": "ChIJJfRXI9YJAWAR1Hh3jDKbfXQ",
    "name": "NITESHA KYOTO 二手舎 京都",
    "area": "上京区",
    "rating": 4.7,
    "reviewCount": 13,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.035231800000005,
    "lng": 135.7572722,
    "source": "google"
  },
  {
    "id": "ChIJ7_YtckupAWARuUm4zmUTqi8",
    "name": "ラウンジ ジール",
    "area": "右京区",
    "rating": 4.3,
    "reviewCount": 13,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.016166399999996,
    "lng": 135.67901,
    "source": "google"
  },
  {
    "id": "ChIJF8u0SQAPAWAR-MXkMCdqPko",
    "name": "らーめん歩",
    "area": "山科区",
    "rating": 4.7,
    "reviewCount": 13,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9694049,
    "lng": 135.8175349,
    "source": "google"
  },
  {
    "id": "ChIJh5IQxPIOAWAR36-V9JdMHmU",
    "name": "Flower Road KICHI",
    "area": "山科区",
    "rating": 4.7,
    "reviewCount": 13,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9746692,
    "lng": 135.8082279,
    "source": "google"
  },
  {
    "id": "ChIJHUhsEL4IAWARezaSX6ClbY4",
    "name": "大観堂書店（吉村大観堂）",
    "area": "下京区",
    "rating": 4.6,
    "reviewCount": 14,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.001107,
    "lng": 135.766996,
    "source": "google"
  },
  {
    "id": "ChIJZZuxuwMJAWARGiEv2iOUot8",
    "name": "植松児童公園",
    "area": "下京区",
    "rating": 4.3,
    "reviewCount": 14,
    "categories": [
      "nature",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 34.9913978,
    "lng": 135.7546907,
    "source": "google"
  },
  {
    "id": "ChIJafAYhOoIAWARNC49HgyfAag",
    "name": "ぶどうの蔵ヴァンファン",
    "area": "東山区",
    "rating": 4.1,
    "reviewCount": 14,
    "categories": [
      "night"
    ],
    "isIndoor": true,
    "lat": 35.004342,
    "lng": 135.777663,
    "source": "google"
  },
  {
    "id": "ChIJKw4QRAAJAWARbguKeeleNDg",
    "name": "おにぎり利次郎 澤利",
    "area": "左京区",
    "rating": 4.4,
    "reviewCount": 14,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0304751,
    "lng": 135.7730671,
    "source": "google"
  },
  {
    "id": "ChIJ09OTHEIIAWARnZOLbfONXOo",
    "name": "末社 任部社",
    "area": "左京区",
    "rating": 4.1,
    "reviewCount": 14,
    "categories": [
      "culture",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 35.0347888,
    "lng": 135.771758,
    "source": "google"
  },
  {
    "id": "ChIJqdMoHQsIAWAR2_w6xWOhbdc",
    "name": "ANEWAL Gallery 現代美術製作所",
    "area": "上京区",
    "rating": 4.9,
    "reviewCount": 14,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.033214199999996,
    "lng": 135.7545718,
    "source": "google"
  },
  {
    "id": "ChIJuw8I0oMHAWARd5UX2ZMIrLU",
    "name": "芥 Aquta",
    "area": "上京区",
    "rating": 4.6,
    "reviewCount": 14,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.0279588,
    "lng": 135.74395819999998,
    "source": "google"
  },
  {
    "id": "ChIJgVEsDpgHAWAR8h2l4VG5w44",
    "name": "霊宝殿",
    "area": "上京区",
    "rating": 4.9,
    "reviewCount": 14,
    "categories": [
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.032308799999996,
    "lng": 135.739486,
    "source": "google"
  },
  {
    "id": "ChIJkdTBVAAHAWAR4P-3YPtd__w",
    "name": "大市",
    "area": "右京区",
    "rating": 4.6,
    "reviewCount": 14,
    "categories": [
      "quiet",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0116442,
    "lng": 135.6776313,
    "source": "google"
  },
  {
    "id": "ChIJnfthw7UJAWARJwXuA_3SIT0",
    "name": "シスターフッド書店Kanin",
    "area": "左京区",
    "rating": 5,
    "reviewCount": 15,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.0319399,
    "lng": 135.79137269999998,
    "source": "google"
  },
  {
    "id": "ChIJAY7Wls8HAWARa-826DggIeA",
    "name": "イ酒ヤ ちこめん",
    "area": "上京区",
    "rating": 4.5,
    "reviewCount": 15,
    "categories": [
      "food",
      "night"
    ],
    "isIndoor": true,
    "lat": 35.031614999999995,
    "lng": 135.74872890000003,
    "source": "google"
  },
  {
    "id": "ChIJq6rpQN4HAWARrgm6HSpgUbA",
    "name": "水野克比古フォトスペース 町家写真館",
    "area": "上京区",
    "rating": 4.3,
    "reviewCount": 15,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.0277226,
    "lng": 135.74885229999998,
    "source": "google"
  },
  {
    "id": "ChIJBXAJaEQPAWARWPN8LMaiSLM",
    "name": "ダイニング Kamiya",
    "area": "伏見区",
    "rating": 4.3,
    "reviewCount": 15,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9321842,
    "lng": 135.7601856,
    "source": "google"
  },
  {
    "id": "ChIJgZViiXwOAWARfa-ueuRKADw",
    "name": "喫茶のえる",
    "area": "山科区",
    "rating": 4.2,
    "reviewCount": 15,
    "categories": [
      "quiet",
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9691854,
    "lng": 135.8207525,
    "source": "google"
  },
  {
    "id": "ChIJSTIgXFEJAWARfwBvOUi4oK0",
    "name": "ギャルリーためなが京都",
    "area": "東山区",
    "rating": 4.6,
    "reviewCount": 16,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 34.990771099999996,
    "lng": 135.76817119999998,
    "source": "google"
  },
  {
    "id": "ChIJDevC89cJAWARxMaHtLulix8",
    "name": "ルネバレーヌ",
    "area": "上京区",
    "rating": 4.9,
    "reviewCount": 16,
    "categories": [
      "quiet",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.030132099999996,
    "lng": 135.7679664,
    "source": "google"
  },
  {
    "id": "ChIJARnJLAwJAWARayWa1ZmkplI",
    "name": "ユニコ",
    "area": "左京区",
    "rating": 4.8,
    "reviewCount": 16,
    "categories": [
      "quiet",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.022487399999996,
    "lng": 135.7936981,
    "source": "google"
  },
  {
    "id": "ChIJi414TuYHAWAR4cjnRsvlNbE",
    "name": "BRILL",
    "area": "上京区",
    "rating": 4.8,
    "reviewCount": 16,
    "categories": [
      "quiet",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.033486599999996,
    "lng": 135.74879289999998,
    "source": "google"
  },
  {
    "id": "ChIJRcooE-IHAWARB8EuXbT68po",
    "name": "堀川せせらぎ第1公園",
    "area": "上京区",
    "rating": 4.4,
    "reviewCount": 16,
    "categories": [
      "nature",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 35.0356186,
    "lng": 135.7513404,
    "source": "google"
  },
  {
    "id": "ChIJsXMhDZMIAWARblQTo-XZY_8",
    "name": "後藤象二郎寓居跡",
    "area": "中京区",
    "rating": 4.1,
    "reviewCount": 17,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.0079133,
    "lng": 135.76925400000002,
    "source": "google"
  },
  {
    "id": "ChIJJaallsMIAWAR9hhoN9gcuV8",
    "name": "ぎおんギャラリー八坂",
    "area": "東山区",
    "rating": 4.4,
    "reviewCount": 17,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.002859099999995,
    "lng": 135.7772965,
    "source": "google"
  },
  {
    "id": "ChIJtQn_DcMIAWARCztzPNpUYuk",
    "name": "五社",
    "area": "東山区",
    "rating": 4.1,
    "reviewCount": 17,
    "categories": [
      "culture",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 35.0040088,
    "lng": 135.77872739999998,
    "source": "google"
  },
  {
    "id": "ChIJdRtzYQ4JAWARBlyYAEmxE6U",
    "name": "山を翔る魚",
    "area": "左京区",
    "rating": 4.5,
    "reviewCount": 17,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0302443,
    "lng": 135.7786255,
    "source": "google"
  },
  {
    "id": "ChIJ3a_PCgoIAWARaM-BpxzVr8I",
    "name": "表千家会館",
    "area": "上京区",
    "rating": 4.1,
    "reviewCount": 17,
    "categories": [
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.033795399999995,
    "lng": 135.75220339999998,
    "source": "google"
  },
  {
    "id": "ChIJx8gh8OUPAWARIAGMIqLALB0",
    "name": "ゲームバー京都",
    "area": "伏見区",
    "rating": 4.6,
    "reviewCount": 17,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9324898,
    "lng": 135.7597712,
    "source": "google"
  },
  {
    "id": "ChIJf_Vd-2cPAWARkfLobQHRW4Y",
    "name": "雲のむこうはいつもあお空",
    "area": "山科区",
    "rating": 4.8,
    "reviewCount": 17,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9671126,
    "lng": 135.80267229999998,
    "source": "google"
  },
  {
    "id": "ChIJReXQZmgIAWARyFPyss0eKHo",
    "name": "CAVA BOOKS(サヴァ・ブックス)",
    "area": "上京区",
    "rating": 4.4,
    "reviewCount": 18,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.0302451,
    "lng": 135.769012,
    "source": "google"
  },
  {
    "id": "ChIJG4lRhzAJAWARExW6fyq6LK0",
    "name": "トララ",
    "area": "左京区",
    "rating": 4.9,
    "reviewCount": 18,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0244208,
    "lng": 135.7926149,
    "source": "google"
  },
  {
    "id": "ChIJ44_0K-0JAWAR-x9NtxeX5jw",
    "name": "Bakery ほのぼの",
    "area": "左京区",
    "rating": 4.4,
    "reviewCount": 18,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0269224,
    "lng": 135.78966889999998,
    "source": "google"
  },
  {
    "id": "ChIJZxxEawAPAWARaLs9ywSLa_Q",
    "name": "お酒と一品 輪Rin",
    "area": "伏見区",
    "rating": 4.9,
    "reviewCount": 18,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9323512,
    "lng": 135.7607854,
    "source": "google"
  },
  {
    "id": "ChIJcSFE2GMOAWARE8zd3jflcNg",
    "name": "ピックアップ 山科",
    "area": "山科区",
    "rating": 4.2,
    "reviewCount": 18,
    "categories": [
      "quiet",
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9668784,
    "lng": 135.8138324,
    "source": "google"
  },
  {
    "id": "ChIJAQB0SIkOAWARe17cH1IRrJ0",
    "name": "ミュージックサロンヨシカワ",
    "area": "山科区",
    "rating": 4.2,
    "reviewCount": 18,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9740463,
    "lng": 135.8148434,
    "source": "google"
  },
  {
    "id": "ChIJOWk0jV0JAWARLdTfWAHk-zM",
    "name": "京都 IP書店",
    "area": "下京区",
    "rating": 4.3,
    "reviewCount": 19,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.0035271,
    "lng": 135.76825499999998,
    "source": "google"
  },
  {
    "id": "ChIJ44GFHdkAAWARL3Fpt0e5SZI",
    "name": "京都市立芸術大学芸術資料館",
    "area": "下京区",
    "rating": 4.3,
    "reviewCount": 19,
    "categories": [
      "culture"
    ],
    "isIndoor": true,
    "lat": 34.9870353,
    "lng": 135.7637168,
    "source": "google"
  },
  {
    "id": "ChIJVVVJyfkIAWAR6LqgjeahXXY",
    "name": "軟弱古書店",
    "area": "左京区",
    "rating": 4.5,
    "reviewCount": 19,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.0235437,
    "lng": 135.781445,
    "source": "google"
  },
  {
    "id": "ChIJv3FFBQAHAWAR4VoxaKG8-nM",
    "name": "大垣書店 堀川新文化ビルヂング店",
    "area": "上京区",
    "rating": 4.7,
    "reviewCount": 19,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.0240825,
    "lng": 135.75153989999998,
    "source": "google"
  },
  {
    "id": "ChIJcyyOlrIHAWARBdloji5nja0",
    "name": "SONS",
    "area": "右京区",
    "rating": 4.8,
    "reviewCount": 19,
    "categories": [
      "night"
    ],
    "isIndoor": true,
    "lat": 35.017240699999995,
    "lng": 135.6857349,
    "source": "google"
  },
  {
    "id": "ChIJr4sb9HIPAWARuxyRQXxHdBY",
    "name": "Aqua Garden Woopy",
    "area": "伏見区",
    "rating": 4.7,
    "reviewCount": 19,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 34.932552400000006,
    "lng": 135.7619651,
    "source": "google"
  },
  {
    "id": "ChIJA8_fxwYPAWAR7emkvo4J2bY",
    "name": "hana no 音",
    "area": "山科区",
    "rating": 4.7,
    "reviewCount": 19,
    "categories": [
      "quiet",
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9692619,
    "lng": 135.8206574,
    "source": "google"
  },
  {
    "id": "ChIJVV3nUsIIAWARGmBdVtLAG7M",
    "name": "大雅堂",
    "area": "東山区",
    "rating": 4.4,
    "reviewCount": 20,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.004442499999996,
    "lng": 135.7777064,
    "source": "google"
  },
  {
    "id": "ChIJneZqVgAJAWARGfCBei8qbo0",
    "name": "Bello vero",
    "area": "左京区",
    "rating": 4.4,
    "reviewCount": 20,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0287973,
    "lng": 135.7877888,
    "source": "google"
  },
  {
    "id": "ChIJBxFgnRwJAWARhGHX1kpzLFw",
    "name": "Gallery Takano",
    "area": "左京区",
    "rating": 4.9,
    "reviewCount": 20,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.0216992,
    "lng": 135.7947548,
    "source": "google"
  },
  {
    "id": "ChIJk8qbyOQHAWARicNHS8WOa5E",
    "name": "GALLERYやなせ",
    "area": "北区",
    "rating": 4.6,
    "reviewCount": 20,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.0360028,
    "lng": 135.74599139999998,
    "source": "google"
  },
  {
    "id": "ChIJG1I3EgIHAWARDctLEqvg0wk",
    "name": "すずしろ・週イチカフェ",
    "area": "西京区",
    "rating": 5,
    "reviewCount": 20,
    "categories": [
      "quiet",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0092968,
    "lng": 135.6817658,
    "source": "google"
  },
  {
    "id": "ChIJJx0OtWMOAWARCRyZWiLWwt8",
    "name": "活かしわや 鳥irodori彩",
    "area": "山科区",
    "rating": 4.5,
    "reviewCount": 20,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9679047,
    "lng": 135.815035,
    "source": "google"
  },
  {
    "id": "ChIJVz75SGAIAWAR4KP8X42JiwM",
    "name": "art space co-jin",
    "area": "宮垣町",
    "rating": 4.1,
    "reviewCount": 21,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.0217084,
    "lng": 135.76915789999998,
    "source": "google"
  },
  {
    "id": "ChIJU24OJgMJAWAR0k7aeXp_fMY",
    "name": "喫茶白河",
    "area": "左京区",
    "rating": 4,
    "reviewCount": 21,
    "categories": [
      "quiet",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0228456,
    "lng": 135.79254070000002,
    "source": "google"
  },
  {
    "id": "ChIJq6qHXPoIAWARy7Ceo_k-ZQk",
    "name": "ごはんぱん工房つぶつぶ",
    "area": "左京区",
    "rating": 4.7,
    "reviewCount": 21,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0201348,
    "lng": 135.7818448,
    "source": "google"
  },
  {
    "id": "ChIJ7RWXS_wIAWARqJaVTqQD8cU",
    "name": "東北院",
    "area": "左京区",
    "rating": 4.3,
    "reviewCount": 21,
    "categories": [
      "culture",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 35.0230653,
    "lng": 135.787458,
    "source": "google"
  },
  {
    "id": "ChIJtfOa60IPAWARanA-KiEoSP4",
    "name": "蛸焼逸品 蛸若 京都伏見",
    "area": "伏見区",
    "rating": 4.7,
    "reviewCount": 21,
    "categories": [
      "food",
      "night"
    ],
    "isIndoor": true,
    "lat": 34.932552400000006,
    "lng": 135.7619651,
    "source": "google"
  },
  {
    "id": "ChIJhUFHTEwPAWARjPuG231a0vo",
    "name": "Daubry & Beer UMESAN",
    "area": "伏見区",
    "rating": 4.7,
    "reviewCount": 21,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9321889,
    "lng": 135.7601278,
    "source": "google"
  },
  {
    "id": "ChIJoS3TDQAJAWAR7-RjV6_KWyk",
    "name": "鴨川河川敷（西岸 ： 三条～四条）",
    "area": "中京区",
    "rating": 4.6,
    "reviewCount": 22,
    "categories": [
      "nature",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 35.0038698,
    "lng": 135.7712756,
    "source": "google"
  },
  {
    "id": "ChIJC3dQc8IIAWARnQNOSX1xlTY",
    "name": "ギャラリー鉄斎堂",
    "area": "東山区",
    "rating": 4.6,
    "reviewCount": 22,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.0059919,
    "lng": 135.7770181,
    "source": "google"
  },
  {
    "id": "ChIJE0Iin6oJAWARmk7AB0a-2u4",
    "name": "SORA×INU",
    "area": "左京区",
    "rating": 4.7,
    "reviewCount": 22,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.030787,
    "lng": 135.791342,
    "source": "google"
  },
  {
    "id": "ChIJ1XL-96MHAWAR5jqV6erGzAw",
    "name": "Steam Kitchen",
    "area": "上京区",
    "rating": 4.8,
    "reviewCount": 22,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0306517,
    "lng": 135.7424658,
    "source": "google"
  },
  {
    "id": "ChIJo1j3UwAHAWAR1eajYAAx7Sc",
    "name": "La cloche de vache（クロッシュ）",
    "area": "上京区",
    "rating": 4.8,
    "reviewCount": 22,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 35.033483499999996,
    "lng": 135.74134279999998,
    "source": "google"
  },
  {
    "id": "ChIJsYRpXY4PAWAR7JjA_DESK_A",
    "name": "Girl's bar True 〜ﾄｩﾙｰ〜",
    "area": "伏見区",
    "rating": 4.4,
    "reviewCount": 22,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9328448,
    "lng": 135.75971819999998,
    "source": "google"
  },
  {
    "id": "ChIJ-3KKAE0PAWARooipy-m5UD8",
    "name": "レストラン Lamaglama",
    "area": "伏見区",
    "rating": 4.6,
    "reviewCount": 22,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9353714,
    "lng": 135.7638405,
    "source": "google"
  },
  {
    "id": "ChIJtYPuTbcJAWAR2OKKfzKvrCs",
    "name": "お酒とごはんと たか",
    "area": "中京区",
    "rating": 4.8,
    "reviewCount": 23,
    "categories": [
      "food",
      "night"
    ],
    "isIndoor": true,
    "lat": 35.0047083,
    "lng": 135.7683326,
    "source": "google"
  },
  {
    "id": "ChIJM3ZOpVgJAWAROGYc3jzYwRQ",
    "name": "MASTER PLAN",
    "area": "中京区",
    "rating": 4.8,
    "reviewCount": 23,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.004442499999996,
    "lng": 135.7682628,
    "source": "google"
  },
  {
    "id": "ChIJm7NKtB0JAWARSdffvJbni7k",
    "name": "宮ノ前児童公園",
    "area": "左京区",
    "rating": 4,
    "reviewCount": 23,
    "categories": [
      "nature",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 35.018917,
    "lng": 135.792173,
    "source": "google"
  },
  {
    "id": "ChIJQW4KWwAJAWAR8mxd5K7pr3Y",
    "name": "BAR HERITAGE",
    "area": "東山区",
    "rating": 5,
    "reviewCount": 24,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0048974,
    "lng": 135.7786314,
    "source": "google"
  },
  {
    "id": "ChIJA2ppxIkJAWAR2AyGBUfcJwM",
    "name": "祇園セレブリテ",
    "area": "東山区",
    "rating": 4.8,
    "reviewCount": 24,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 35.005114299999995,
    "lng": 135.7743669,
    "source": "google"
  },
  {
    "id": "ChIJU4frZFAIAWARtJ9hvbvpywI",
    "name": "すみれや食堂 & 乾物と生活雑貨すみれや",
    "area": "左京区",
    "rating": 4.5,
    "reviewCount": 24,
    "categories": [
      "quiet",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0299178,
    "lng": 135.7737641,
    "source": "google"
  },
  {
    "id": "ChIJgTR-emwJAWAR4OFMkyX441k",
    "name": "kojin kyoto",
    "area": "上京区",
    "rating": 4.7,
    "reviewCount": 24,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.021298,
    "lng": 135.7708102,
    "source": "google"
  },
  {
    "id": "ChIJ383raQAHAWARyCgZ5i8ngi8",
    "name": "余波舎 / NAGORO BOOKS",
    "area": "上京区",
    "rating": 4.8,
    "reviewCount": 24,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.0340722,
    "lng": 135.74873979999998,
    "source": "google"
  },
  {
    "id": "ChIJI2Adr_8HAWARPB2_Yj10TjE",
    "name": "西陣織国際美術館",
    "area": "上京区",
    "rating": 4.5,
    "reviewCount": 24,
    "categories": [
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.0273792,
    "lng": 135.7396228,
    "source": "google"
  },
  {
    "id": "ChIJc_xK3wsBAWARXgbnb-NdXkU",
    "name": "モンキーパーク児童遊園",
    "area": "西京区",
    "rating": 4.2,
    "reviewCount": 24,
    "categories": [
      "nature",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 35.009577,
    "lng": 135.6744689,
    "source": "google"
  },
  {
    "id": "ChIJcyjUxagPAWARBhhrkAvVUzI",
    "name": "酒場 ギルロイ",
    "area": "伏見区",
    "rating": 4.5,
    "reviewCount": 24,
    "categories": [
      "food",
      "night"
    ],
    "isIndoor": true,
    "lat": 34.9322209,
    "lng": 135.76083110000002,
    "source": "google"
  },
  {
    "id": "ChIJA9vDgKAIAWARDLxbdmolpxI",
    "name": "安穏殿",
    "area": "下京区",
    "rating": 4.3,
    "reviewCount": 25,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 34.9927074,
    "lng": 135.75222879999998,
    "source": "google"
  },
  {
    "id": "ChIJAyRjQFsJAWARvewHlfIfwYU",
    "name": "アンコルク",
    "area": "左京区",
    "rating": 4.9,
    "reviewCount": 25,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0289772,
    "lng": 135.785763,
    "source": "google"
  },
  {
    "id": "ChIJ07bNUwAPAWARB6xbMAG-Yu8",
    "name": "鉄板焼ひがしまる。",
    "area": "伏見区",
    "rating": 4.8,
    "reviewCount": 25,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9318737,
    "lng": 135.7599695,
    "source": "google"
  },
  {
    "id": "ChIJ34DFG1QPAWARQSUv4ks9B8Y",
    "name": "sammo",
    "area": "伏見区",
    "rating": 4.6,
    "reviewCount": 25,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 34.935299199999996,
    "lng": 135.7599267,
    "source": "google"
  },
  {
    "id": "ChIJ10Lt254JAWAR1s_ZgV2kjNo",
    "name": "Traditional Japanese Music Experience & Cultural Show | Oto Monogatari Kyoto",
    "area": "中京区",
    "rating": 5,
    "reviewCount": 26,
    "categories": [
      "photo",
      "culture"
    ],
    "isIndoor": false,
    "lat": 35.0042252,
    "lng": 135.7666553,
    "source": "google"
  },
  {
    "id": "ChIJJSbDCx0JAWARrv3DHEGzSxY",
    "name": "ナイトアンドデー",
    "area": "左京区",
    "rating": 4.3,
    "reviewCount": 26,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0197244,
    "lng": 135.7915807,
    "source": "google"
  },
  {
    "id": "ChIJVVUp2P0IAWARe_XC098Ulqo",
    "name": "黎明教会資料研修館",
    "area": "左京区",
    "rating": 4.5,
    "reviewCount": 26,
    "categories": [
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.024653799999996,
    "lng": 135.7882616,
    "source": "google"
  },
  {
    "id": "ChIJYZnsScIIAWARph95imxnGNU",
    "name": "Bar Eniac",
    "area": "東山区",
    "rating": 4.2,
    "reviewCount": 27,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.004411999999995,
    "lng": 135.77705,
    "source": "google"
  },
  {
    "id": "ChIJ4xpwE5MIAWARzg2ebXh-LkQ",
    "name": "MEDIA SHOP",
    "area": "中京区",
    "rating": 4.3,
    "reviewCount": 27,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.0084377,
    "lng": 135.7695832,
    "source": "google"
  },
  {
    "id": "ChIJQ7T9SwAJAWARM6DoZB5d5rE",
    "name": "Howene",
    "area": "左京区",
    "rating": 5,
    "reviewCount": 27,
    "categories": [
      "night"
    ],
    "isIndoor": true,
    "lat": 35.0284464,
    "lng": 135.791619,
    "source": "google"
  },
  {
    "id": "ChIJ_6NL5FQHAWARzHB47Id5NyA",
    "name": "朝乃家",
    "area": "右京区",
    "rating": 4,
    "reviewCount": 27,
    "categories": [
      "quiet",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0115729,
    "lng": 135.67791599999998,
    "source": "google"
  },
  {
    "id": "ChIJ8_oOTb8OAWARValhqxHB3IE",
    "name": "鉄板居酒屋こてっぱん",
    "area": "山科区",
    "rating": 4.6,
    "reviewCount": 27,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9611811,
    "lng": 135.8139199,
    "source": "google"
  },
  {
    "id": "ChIJUVZkPQAJAWAR2vbmRQ9jn3Q",
    "name": "ロクソンノウブルワリー",
    "area": "下京区",
    "rating": 4.4,
    "reviewCount": 28,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9846542,
    "lng": 135.7585528,
    "source": "google"
  },
  {
    "id": "ChIJpcvGRVwIAWARsyw_tnrsRDI",
    "name": "漫画BAR",
    "area": "左京区",
    "rating": 4.5,
    "reviewCount": 28,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.028632,
    "lng": 135.774112,
    "source": "google"
  },
  {
    "id": "ChIJmWFg51kIAWARYu4IjoA8M3k",
    "name": "吉岡書店",
    "area": "左京区",
    "rating": 4.3,
    "reviewCount": 28,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.0288537,
    "lng": 135.7801485,
    "source": "google"
  },
  {
    "id": "ChIJfdVn1v8IAWARdYfx5tL4OqA",
    "name": "善行堂",
    "area": "左京区",
    "rating": 4.8,
    "reviewCount": 28,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.0280877,
    "lng": 135.7899136,
    "source": "google"
  },
  {
    "id": "ChIJD4tnsUIJAWARf7eFDNtQMRw",
    "name": "濱口商店",
    "area": "左京区",
    "rating": 4.9,
    "reviewCount": 28,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0248746,
    "lng": 135.7882041,
    "source": "google"
  },
  {
    "id": "ChIJAQ1H6bqpAWAR6KeKaTG3t9Q",
    "name": "Arashiyama Tenryu Tempura Bar",
    "area": "右京区",
    "rating": 4,
    "reviewCount": 28,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.014497,
    "lng": 135.6771595,
    "source": "google"
  },
  {
    "id": "ChIJ073QNgAJAWARnOfILsiacAs",
    "name": "クラシックカフェ 名曲喫茶ウグイス堂",
    "area": "中京区",
    "rating": 4.9,
    "reviewCount": 29,
    "categories": [
      "quiet",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0045007,
    "lng": 135.7682668,
    "source": "google"
  },
  {
    "id": "ChIJTa9St4sJAWARAjYXx33KDbk",
    "name": "みやこの滝",
    "area": "南区",
    "rating": 4,
    "reviewCount": 29,
    "categories": [
      "photo",
      "culture"
    ],
    "isIndoor": false,
    "lat": 34.98462680000001,
    "lng": 135.7560058,
    "source": "google"
  },
  {
    "id": "ChIJV8RmOFwIAWARPBPJb6F6AM4",
    "name": "アシュクルク",
    "area": "左京区",
    "rating": 4.5,
    "reviewCount": 29,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0282695,
    "lng": 135.7741725,
    "source": "google"
  },
  {
    "id": "ChIJk_p_IFoIAWARU4aatCSv_cs",
    "name": "楽園酒屋 アンナチュラル",
    "area": "左京区",
    "rating": 4.2,
    "reviewCount": 29,
    "categories": [
      "food",
      "night"
    ],
    "isIndoor": true,
    "lat": 35.029513699999995,
    "lng": 135.7792254,
    "source": "google"
  },
  {
    "id": "ChIJPZH0c_6pAWARzY_K514QtLk",
    "name": "天龍堂",
    "area": "右京区",
    "rating": 4.1,
    "reviewCount": 29,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.016770699999995,
    "lng": 135.6810382,
    "source": "google"
  },
  {
    "id": "ChIJIzzVVQAJAWARzc1tWfyfiLA",
    "name": "炭火焼ぜん",
    "area": "左京区",
    "rating": 4.6,
    "reviewCount": 30,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0287502,
    "lng": 135.7727688,
    "source": "google"
  },
  {
    "id": "ChIJsb6fiVwIAWARCWy_dY8cCCE",
    "name": "トランスポップギャラリー",
    "area": "左京区",
    "rating": 4.7,
    "reviewCount": 30,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.0299484,
    "lng": 135.77492100000003,
    "source": "google"
  },
  {
    "id": "ChIJo0UrtgMJAWAR9iXi3WqB-g4",
    "name": "お食事処さつき",
    "area": "左京区",
    "rating": 4.7,
    "reviewCount": 30,
    "categories": [
      "food",
      "night"
    ],
    "isIndoor": true,
    "lat": 35.0257346,
    "lng": 135.7928426,
    "source": "google"
  },
  {
    "id": "ChIJl6fvPPgHAWARxtyPW4P7WNA",
    "name": "Bighand Bros. Beer CHIEKOIN Brewery & Taproom",
    "area": "上京区",
    "rating": 4.5,
    "reviewCount": 30,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.028099499999996,
    "lng": 135.74687849999998,
    "source": "google"
  },
  {
    "id": "ChIJC9Gn4wkHAWARTLGm9GdNjp8",
    "name": "イタリアンバル amau",
    "area": "北区",
    "rating": 4.7,
    "reviewCount": 30,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.039387399999995,
    "lng": 135.7488281,
    "source": "google"
  },
  {
    "id": "ChIJGcgKQK4IAWAR5U19eGb4dPw",
    "name": "羅城門 復元模型",
    "area": "下京区",
    "rating": 4.3,
    "reviewCount": 31,
    "categories": [
      "photo",
      "culture"
    ],
    "isIndoor": false,
    "lat": 34.986559799999995,
    "lng": 135.760412,
    "source": "google"
  },
  {
    "id": "ChIJW_iI5okOAWARomvW-tjI6Cw",
    "name": "キッチン木の芽",
    "area": "山科区",
    "rating": 4.3,
    "reviewCount": 31,
    "categories": [
      "food",
      "night"
    ],
    "isIndoor": true,
    "lat": 34.970538999999995,
    "lng": 135.81467179999999,
    "source": "google"
  },
  {
    "id": "ChIJj5sO_MIIAWARa5adiv4g7Nk",
    "name": "ラッキーフェイセス",
    "area": "東山区",
    "rating": 4.6,
    "reviewCount": 32,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.004722,
    "lng": 135.7773891,
    "source": "google"
  },
  {
    "id": "ChIJMRPSKmsJAWAR__KZqajhZf4",
    "name": "親水テラス",
    "area": "東山区",
    "rating": 4.9,
    "reviewCount": 32,
    "categories": [
      "nature",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 35.006872699999995,
    "lng": 135.7784965,
    "source": "google"
  },
  {
    "id": "ChIJPdCJxWAJAWAR6IawpS6MDfc",
    "name": "翠路 籠と民藝喫茶",
    "area": "左京区",
    "rating": 4.8,
    "reviewCount": 32,
    "categories": [
      "quiet",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.023098399999995,
    "lng": 135.7956803,
    "source": "google"
  },
  {
    "id": "ChIJz-MatQKqAWARfsEAhTRrTa0",
    "name": "嵯峩螺鈿 野村",
    "area": "右京区",
    "rating": 4.6,
    "reviewCount": 32,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.021778999999995,
    "lng": 135.675284,
    "source": "google"
  },
  {
    "id": "ChIJE6bwzpUIAWAR99KEMKwaR3M",
    "name": "冠者殿社",
    "area": "下京区",
    "rating": 4.2,
    "reviewCount": 33,
    "categories": [
      "culture",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 35.0036325,
    "lng": 135.7671615,
    "source": "google"
  },
  {
    "id": "ChIJP335EV0JAWARZt8PTiKLKQg",
    "name": "ENTERTAINMENT HUB KYOTO",
    "area": "下京区",
    "rating": 4.1,
    "reviewCount": 33,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9886404,
    "lng": 135.760086,
    "source": "google"
  },
  {
    "id": "ChIJYfuT16cIAWARuVdCeXt_wkY",
    "name": "オムロン コミュニケーションプラザ",
    "area": "下京区",
    "rating": 4.4,
    "reviewCount": 33,
    "categories": [
      "culture"
    ],
    "isIndoor": true,
    "lat": 34.98692500000001,
    "lng": 135.7541368,
    "source": "google"
  },
  {
    "id": "ChIJV5TKCWAJAWARomRKzTz0Yo4",
    "name": "語り×Café＆Bar Katharsis",
    "area": "左京区",
    "rating": 4.5,
    "reviewCount": 33,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.029146,
    "lng": 135.7791018,
    "source": "google"
  },
  {
    "id": "ChIJe_KHFFYIAWAReuOibO_f-7U",
    "name": "関西地図センター",
    "area": "左京区",
    "rating": 4.6,
    "reviewCount": 33,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.028422,
    "lng": 135.7843603,
    "source": "google"
  },
  {
    "id": "ChIJu5xBavYPAWARCR5x3sXzCbQ",
    "name": "伏水89丁目食堂",
    "area": "伏見区",
    "rating": 4.3,
    "reviewCount": 33,
    "categories": [
      "food",
      "night"
    ],
    "isIndoor": true,
    "lat": 34.9325002,
    "lng": 135.76055589999999,
    "source": "google"
  },
  {
    "id": "ChIJ-We4eSgJAWAR3FwOiC3H6rY",
    "name": "HOHO HOJICHA 焙茶専門店 京都駅店",
    "area": "下京区",
    "rating": 4.5,
    "reviewCount": 34,
    "categories": [
      "quiet",
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9860824,
    "lng": 135.7585756,
    "source": "google"
  },
  {
    "id": "ChIJb8rAEwAJAWARM-w15YbDP7U",
    "name": "喫煙所",
    "area": "京都市",
    "rating": 4.6,
    "reviewCount": 34,
    "categories": [
      "nature",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 34.9965347,
    "lng": 135.78012049999998,
    "source": "google"
  },
  {
    "id": "ChIJpcvGRVwIAWARoP2SFCQ2xtU",
    "name": "酒とつまみ 蓮",
    "area": "左京区",
    "rating": 4.5,
    "reviewCount": 34,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.028632,
    "lng": 135.774112,
    "source": "google"
  },
  {
    "id": "ChIJ26K__68HAWARmvvhQz3yGOw",
    "name": "ラストドロップ",
    "area": "上京区",
    "rating": 4.8,
    "reviewCount": 34,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0353954,
    "lng": 135.74865010000002,
    "source": "google"
  },
  {
    "id": "ChIJIYvJ4foHAWARNan0_EA_6Fg",
    "name": "立ち飲み カドヤ",
    "area": "北区",
    "rating": 4.4,
    "reviewCount": 34,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.037292199999996,
    "lng": 135.7449676,
    "source": "google"
  },
  {
    "id": "ChIJ1WKbrYkHAWAR1BROYXizaUQ",
    "name": "おうちごはん Home Cooking 華",
    "area": "西京区",
    "rating": 5,
    "reviewCount": 34,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0100565,
    "lng": 135.679247,
    "source": "google"
  },
  {
    "id": "ChIJFZ8oR44PAWARmp4IC0o9SaU",
    "name": "藤澤山 寳厳院 大光寺",
    "area": "伏見区",
    "rating": 4,
    "reviewCount": 34,
    "categories": [
      "culture",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 34.9332902,
    "lng": 135.7603613,
    "source": "google"
  },
  {
    "id": "ChIJH9Oe6K4IAWARff0fUcPmRDo",
    "name": "室町小路広場",
    "area": "下京区",
    "rating": 4.3,
    "reviewCount": 35,
    "categories": [
      "photo",
      "culture"
    ],
    "isIndoor": false,
    "lat": 34.9858556,
    "lng": 135.7587624,
    "source": "google"
  },
  {
    "id": "ChIJwZ9E258PAWARwu_FO-FZ6Rc",
    "name": "Parade - パレード伏見洋菓子店",
    "area": "伏見区",
    "rating": 4.1,
    "reviewCount": 35,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 34.931803699999996,
    "lng": 135.7635202,
    "source": "google"
  },
  {
    "id": "ChIJzy3nuK0IAWARCG8y-DIlVNs",
    "name": "京都駅八条口駅前広場 サンクガーデン",
    "area": "南区",
    "rating": 4.3,
    "reviewCount": 36,
    "categories": [
      "nature",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 34.9839785,
    "lng": 135.7599976,
    "source": "google"
  },
  {
    "id": "ChIJo6AW0IMPAWAR4XIyUZpO3FU",
    "name": "パン工房 くーぺ",
    "area": "伏見区",
    "rating": 4.3,
    "reviewCount": 36,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 34.937750699999995,
    "lng": 135.75683519999998,
    "source": "google"
  },
  {
    "id": "ChIJl0DioY0JAWARGZiHQITyrvc",
    "name": "吉田山公園",
    "area": "左京区",
    "rating": 4.2,
    "reviewCount": 37,
    "categories": [
      "nature",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 35.024608,
    "lng": 135.7860301,
    "source": "google"
  },
  {
    "id": "ChIJ948Yv2MOAWAR4nwJ-BLbO-4",
    "name": "いろは寿司",
    "area": "山科区",
    "rating": 4.3,
    "reviewCount": 37,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9671632,
    "lng": 135.8150425,
    "source": "google"
  },
  {
    "id": "ChIJi3f2qmAIAWARX4PONONS9CY",
    "name": "鴨川河川敷グラウンド",
    "area": "上京区",
    "rating": 4.3,
    "reviewCount": 38,
    "categories": [
      "nature",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 35.02561300000001,
    "lng": 135.770963,
    "source": "google"
  },
  {
    "id": "ChIJ3z5firMPAWARs_9rFpbN8Fk",
    "name": "バーイロコイ",
    "area": "伏見区",
    "rating": 4.9,
    "reviewCount": 38,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 34.932840399999996,
    "lng": 135.7597065,
    "source": "google"
  },
  {
    "id": "ChIJ-f8vAIoOAWARnWNVrP7ZKpw",
    "name": "DINING PUB おりべ",
    "area": "山科区",
    "rating": 4,
    "reviewCount": 38,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9696803,
    "lng": 135.8137697,
    "source": "google"
  },
  {
    "id": "ChIJq566EKEIAWARqSPUNMq2CZE",
    "name": "ICHIRO TSURUTA Gallery",
    "area": "下京区",
    "rating": 4.7,
    "reviewCount": 39,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 34.9937421,
    "lng": 135.7558283,
    "source": "google"
  },
  {
    "id": "ChIJY49qyvQJAWARq0-dCwgmnog",
    "name": "こばち屋 MUM",
    "area": "左京区",
    "rating": 4.2,
    "reviewCount": 39,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0286508,
    "lng": 135.7736989,
    "source": "google"
  },
  {
    "id": "ChIJPRw6M3IIAWARGV8d1K5brZg",
    "name": "ハリス理化学館 同志社ギャラリー",
    "area": "上京区",
    "rating": 4.4,
    "reviewCount": 39,
    "categories": [
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.0303091,
    "lng": 135.7609797,
    "source": "google"
  },
  {
    "id": "ChIJycQjg_8IAWARSiLZh3PTS-k",
    "name": "きくた",
    "area": "左京区",
    "rating": 4.6,
    "reviewCount": 39,
    "categories": [
      "food",
      "night"
    ],
    "isIndoor": true,
    "lat": 35.0285219,
    "lng": 135.7878764,
    "source": "google"
  },
  {
    "id": "ChIJ_TpekG0OAWARF1Yn6mw5luA",
    "name": "ロレーヌ",
    "area": "伏見区",
    "rating": 4,
    "reviewCount": 39,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9565869,
    "lng": 135.8177541,
    "source": "google"
  },
  {
    "id": "ChIJieg0-FwIAWARq4dmNhJ0kbw",
    "name": "しみず COFFEE SHOP",
    "area": "左京区",
    "rating": 4.4,
    "reviewCount": 40,
    "categories": [
      "quiet",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0289188,
    "lng": 135.7736406,
    "source": "google"
  },
  {
    "id": "ChIJv9Az1-YHAWARM78sY4kq9tw",
    "name": "桜井公園",
    "area": "上京区",
    "rating": 4.3,
    "reviewCount": 40,
    "categories": [
      "nature",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 35.03053010000001,
    "lng": 135.7468678,
    "source": "google"
  },
  {
    "id": "ChIJ0X65DJIPAWARGrYpQ7v4F-0",
    "name": "フルール",
    "area": "伏見区",
    "rating": 4.5,
    "reviewCount": 40,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9316375,
    "lng": 135.7620412,
    "source": "google"
  },
  {
    "id": "ChIJ9XBvP5oPAWAR0gRtWyvqv-c",
    "name": "若林書店 伏見店",
    "area": "伏見区",
    "rating": 4.1,
    "reviewCount": 41,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 34.939903799999996,
    "lng": 135.7651962,
    "source": "google"
  },
  {
    "id": "ChIJk3d4NHIIAWARpuiOYzFO7jc",
    "name": "フードバー エネル(ener)",
    "area": "上京区",
    "rating": 4.5,
    "reviewCount": 42,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0294409,
    "lng": 135.7411345,
    "source": "google"
  },
  {
    "id": "ChIJ47QZBIkOAWARrR51MGxvH1M",
    "name": "Lodgepole",
    "area": "山科区",
    "rating": 4.2,
    "reviewCount": 42,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9730583,
    "lng": 135.8157611,
    "source": "google"
  },
  {
    "id": "ChIJTSOwxmIOAWARIjsswBixZ1Q",
    "name": "幸楽",
    "area": "山科区",
    "rating": 4.1,
    "reviewCount": 42,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 34.9701223,
    "lng": 135.8176312,
    "source": "google"
  },
  {
    "id": "ChIJ8RqBslIPAWARTXBKz6YLaVw",
    "name": "遠藤書店",
    "area": "南区",
    "rating": 4.5,
    "reviewCount": 43,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 34.981055999999995,
    "lng": 135.76097199999998,
    "source": "google"
  },
  {
    "id": "ChIJCeMNzcEIAWARinO8CPDvNao",
    "name": "まいこと 祇園店",
    "area": "東山区",
    "rating": 4,
    "reviewCount": 43,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0040592,
    "lng": 135.7735401,
    "source": "google"
  },
  {
    "id": "ChIJOxdGbTsHAWARPsqhvwdsHws",
    "name": "noki noki 自家焙煎コーヒーショップ&カフェ",
    "area": "上京区",
    "rating": 4.8,
    "reviewCount": 43,
    "categories": [
      "quiet",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0303867,
    "lng": 135.7456669,
    "source": "google"
  },
  {
    "id": "ChIJEZuGAwQJAWAR0pnlmmMglLg",
    "name": "スーパーマリオ壁面",
    "area": "下京区",
    "rating": 4.8,
    "reviewCount": 44,
    "categories": [
      "photo",
      "culture"
    ],
    "isIndoor": false,
    "lat": 35.0037034,
    "lng": 135.76643719999998,
    "source": "google"
  },
  {
    "id": "ChIJkzfQKcUIAWARBnvTyjx7mQg",
    "name": "月真院",
    "area": "東山区",
    "rating": 4.2,
    "reviewCount": 44,
    "categories": [
      "culture",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 35.0010013,
    "lng": 135.780156,
    "source": "google"
  },
  {
    "id": "ChIJJcxVzOYHAWAR2Kmx1WQItrw",
    "name": "しづ",
    "area": "上京区",
    "rating": 4.7,
    "reviewCount": 44,
    "categories": [
      "food",
      "night"
    ],
    "isIndoor": true,
    "lat": 35.031132,
    "lng": 135.7472,
    "source": "google"
  },
  {
    "id": "ChIJ55oM4Y0PAWARDjKtdcM9luo",
    "name": "イタリアワイン Enoteca C.d.G",
    "area": "伏見区",
    "rating": 4.7,
    "reviewCount": 44,
    "categories": [
      "night"
    ],
    "isIndoor": true,
    "lat": 34.9319294,
    "lng": 135.7606114,
    "source": "google"
  },
  {
    "id": "ChIJ1Y9VzB0JAWAR-ABkq7aPT4w",
    "name": "茶寮桐山",
    "area": "左京区",
    "rating": 4.8,
    "reviewCount": 45,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 35.022038099999996,
    "lng": 135.7947821,
    "source": "google"
  },
  {
    "id": "ChIJ13pDlVMHAWAR7_7s0PVO9q8",
    "name": "パン処太陽",
    "area": "右京区",
    "rating": 4.2,
    "reviewCount": 45,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 35.017187,
    "lng": 135.6862691,
    "source": "google"
  },
  {
    "id": "ChIJs6bT_cMIAWARydfsEx03GU8",
    "name": "八坂倶楽部",
    "area": "東山区",
    "rating": 4.6,
    "reviewCount": 46,
    "categories": [
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.00116,
    "lng": 135.7755674,
    "source": "google"
  },
  {
    "id": "ChIJ_XZSyPQOAWARvdBqZjiyk1c",
    "name": "坂上田村麻呂之墓",
    "area": "山科区",
    "rating": 4,
    "reviewCount": 46,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": false,
    "lat": 34.9705563,
    "lng": 135.8085323,
    "source": "google"
  },
  {
    "id": "ChIJE4UnOsMIAWAREtDvDTgtfY8",
    "name": "ズッカ・ダ・ヴィーノ｜京都の四季を感じるイタリアン 祇園八坂",
    "area": "東山区",
    "rating": 4.3,
    "reviewCount": 47,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0045487,
    "lng": 135.7798522,
    "source": "google"
  },
  {
    "id": "ChIJ4fjFueMIAWARofU7rcl26ag",
    "name": "NAM HALL (ナムホール)",
    "area": "左京区",
    "rating": 4.2,
    "reviewCount": 47,
    "categories": [
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.0165739,
    "lng": 135.78699229999998,
    "source": "google"
  },
  {
    "id": "ChIJJ8SqiEcHAWARpCpMJ5mOcCI",
    "name": "パン工房 橙",
    "area": "西京区",
    "rating": 4.1,
    "reviewCount": 47,
    "categories": [
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0008629,
    "lng": 135.68781389999998,
    "source": "google"
  },
  {
    "id": "ChIJzTdBjYkOAWARLVyUHqoSUaw",
    "name": "レモンハート21",
    "area": "山科区",
    "rating": 4.9,
    "reviewCount": 47,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 34.971105,
    "lng": 135.8142949,
    "source": "google"
  },
  {
    "id": "ChIJ-9TRAeIJAWARqSMOo9izTqo",
    "name": "El camino（エルカミノ）",
    "area": "上京区",
    "rating": 4.6,
    "reviewCount": 48,
    "categories": [
      "quiet",
      "culture"
    ],
    "isIndoor": true,
    "lat": 35.0301992,
    "lng": 135.76894,
    "source": "google"
  },
  {
    "id": "ChIJ26jWR5wJAWARZjjGQFVKYnc",
    "name": "haku kyoto ( gallery / tea stand )",
    "area": "下京区",
    "rating": 4.9,
    "reviewCount": 49,
    "categories": [
      "culture",
      "photo"
    ],
    "isIndoor": true,
    "lat": 35.0020933,
    "lng": 135.766763,
    "source": "google"
  },
  {
    "id": "ChIJR_WlcdAJAWARi7vO_vUSViE",
    "name": "祇をん香kou",
    "area": "東山区",
    "rating": 4.8,
    "reviewCount": 49,
    "categories": [
      "night"
    ],
    "isIndoor": true,
    "lat": 35.0026455,
    "lng": 135.7782064,
    "source": "google"
  },
  {
    "id": "ChIJxTg-1ZsHAWARTHyzX76VG8c",
    "name": "西陣麦酒 醸造所 / 京町家タップルーム",
    "area": "上京区",
    "rating": 4.6,
    "reviewCount": 49,
    "categories": [
      "night",
      "food"
    ],
    "isIndoor": true,
    "lat": 35.0293724,
    "lng": 135.7487577,
    "source": "google"
  },
  {
    "id": "ChIJ0zOICAoIAWARPAl24qT0kVo",
    "name": "慈受院門跡",
    "area": "上京区",
    "rating": 4.2,
    "reviewCount": 49,
    "categories": [
      "culture",
      "quiet"
    ],
    "isIndoor": false,
    "lat": 35.034236,
    "lng": 135.7522019,
    "source": "google"
  }
];
