// data/spots.json から提案候補を絞り込み、人が選別するためのCSVを出力する。
//
// 使い方:
//   node scripts/curate-spots.mjs
//   → data/shortlist.csv が出る。keep 列に 1 を入れたものが採用される。
//
// なぜ機械だけで決めないか:
// 「口コミが少ない」は「隠れた名店」の証明にならない。
// デパ地下のカウンター・サービス業・新規開店・スパム登録も口コミが少ない。
// 機械で明らかなノイズを落としたうえで、最後は人が見て決める。

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(join(ROOT, 'data/spots.json'), 'utf8'));

// ---- 除外するGoogleのタイプ（観光の目的地にならない業種） ----
const EXCLUDED_TYPES = new Set([
  'massage', 'beauty_salon', 'hair_salon', 'nail_salon', 'spa',
  'dental_clinic', 'doctor', 'hospital', 'pharmacy',
  'real_estate_agency', 'insurance_agency', 'lawyer', 'accounting',
  'car_repair', 'car_dealer', 'gas_station', 'parking',
  'storage', 'moving_company', 'laundry', 'atm', 'bank',
  'convenience_store', 'supermarket', 'grocery_store',
  'pastry_shop', 'ice_cream_shop', 'dessert_shop', // デパ地下カウンターが多い
  'corporate_office', 'travel_agency',
  // 接客を伴う夜の店。観光客への提案として不適切
  'lounge_bar', 'night_club', 'karaoke', 'adult_entertainment_store',
]);

// ---- 除外する住所パターン（大型商業施設内のテナント） ----
const EXCLUDED_ADDRESS = [
  '伊勢丹', 'ポルタ', 'ザ・キューブ', 'アバンティ', 'イオンモール',
  '高島屋', '大丸', '藤井大丸', 'BAL', 'ヨドバシ', 'ビブレ',
  'ショッピングセンター', '地下街',
];

// ---- 除外する名前パターン（チェーン・スパム的なもの） ----
const EXCLUDED_NAME = [
  'スターバックス', 'ドトール', 'タリーズ', 'コメダ', 'サンマルク',
  'マクドナルド', 'モスバーガー', 'ケンタッキー', 'すき家', '吉野家',
  'ローソン', 'セブン', 'ファミリーマート',
  'quiz spot', 'Travel quiz',
];

const MIN_REVIEWS = 5; // 1〜2件は統計的に意味がないので落とす
const MAX_REVIEWS = 50;
const MIN_RATING = 4.0;

function isNoise(s) {
  if (EXCLUDED_TYPES.has(s.googleType)) return 'タイプ除外';
  const addr = s.address || '';
  for (const w of EXCLUDED_ADDRESS) if (addr.includes(w)) return '商業施設内';
  const name = s.name || '';
  for (const w of EXCLUDED_NAME) if (name.includes(w)) return 'チェーン';
  if (name.trim().length < 2) return '名称不正';
  return null;
}

const rated = data.all.filter((s) => s.rating !== null && s.reviewCount > 0);

// 対比に使う「有名観光地20か所の平均」
const top20 = [...rated].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 20);
const avgFamous = Math.round(
  top20.reduce((sum, s) => sum + s.reviewCount, 0) / top20.length
);

const candidates = rated.filter(
  (s) =>
    s.rating >= MIN_RATING &&
    s.reviewCount >= MIN_REVIEWS &&
    s.reviewCount < MAX_REVIEWS
);

const reasons = {};
const clean = [];
for (const s of candidates) {
  const r = isNoise(s);
  if (r) {
    reasons[r] = (reasons[r] || 0) + 1;
  } else {
    clean.push(s);
  }
}

clean.sort((a, b) => a.reviewCount - b.reviewCount);

// ---- 選別用CSVの出力 ----
const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
const header = [
  'keep', 'name', 'reviewCount', 'rating', 'googleType',
  'address', 'categories', 'isIndoor', 'lat', 'lng', 'id',
].join(',');

const rows = clean.map((s) =>
  [
    '', // keep: 採用するものに 1 を入れる
    esc(s.name),
    s.reviewCount,
    s.rating,
    esc(s.googleType),
    esc(s.address),
    esc(s.categories.join('|')),
    s.isIndoor,
    s.lat,
    s.lng,
    esc(s.id),
  ].join(',')
);

// Excelで開く前提なのでBOM付きUTF-8にする
writeFileSync(
  join(ROOT, 'data/shortlist.csv'),
  '﻿' + header + '\n' + rows.join('\n')
);

// ---- 有名スポット（オンボーディング用）も出力 ----
writeFileSync(
  join(ROOT, 'data/famous.json'),
  JSON.stringify({ avgFamous, top20 }, null, 2)
);

console.log('=== 選別結果 ===');
console.log(`評価ありの総数        : ${rated.length}`);
console.log(`条件通過（★4.0以上 / 口コミ${MIN_REVIEWS}〜${MAX_REVIEWS - 1}件）: ${candidates.length}`);
console.log('');
console.log('--- 機械的に落としたもの ---');
Object.entries(reasons).forEach(([k, v]) => console.log(`  ${k.padEnd(12)} ${v}件`));
console.log('');
console.log(`人が選別する候補      : ${clean.length} 件 → data/shortlist.csv`);
console.log('');
console.log(`有名観光地20か所の平均: ${avgFamous} 件  ← カードの対比に使う確定値`);
console.log('');
console.log('次: shortlist.csv の keep 列に 1 を入れて、60〜80件選んでください。');
