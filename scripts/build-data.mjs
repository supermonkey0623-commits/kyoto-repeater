// data/spots.json + data/shortlist.csv から lib/spots.generated.ts を生成する。
//
// 使い方:
//   node scripts/build-data.mjs
//
// shortlist.csv の keep 列に 1 が入っている行があれば、それだけを採用する。
// 1つも無ければ、機械フィルタを通過した全件を採用する（選別前の暫定状態）。

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const famousData = JSON.parse(readFileSync(join(ROOT, 'data/famous.json'), 'utf8'));

// ---- CSVの読み込み ----
function parseCsv(text) {
  const lines = text.replace(/^﻿/, '').split(/\r?\n/).filter((l) => l.trim());
  const header = splitLine(lines[0]);
  return lines.slice(1).map((l) => {
    const cells = splitLine(l);
    return Object.fromEntries(header.map((h, i) => [h, cells[i] ?? '']));
  });
}

function splitLine(line) {
  const out = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { cur += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) { out.push(cur); cur = ''; }
    else cur += ch;
  }
  out.push(cur);
  return out;
}

const rows = parseCsv(readFileSync(join(ROOT, 'data/shortlist.csv'), 'utf8'));
const kept = rows.filter((r) => String(r.keep).trim() === '1');
const selected = kept.length > 0 ? kept : rows;
const curated = kept.length > 0;

// ---- Googleのタイプ → 我々のカテゴリ ----
const TYPE_TO_CATEGORY = {
  cafe: ['quiet', 'food'], coffee_shop: ['quiet', 'food'],
  restaurant: ['food'], japanese_restaurant: ['food'],
  japanese_izakaya_restaurant: ['food', 'night'],
  ramen_restaurant: ['food'], sushi_restaurant: ['food'],
  bakery: ['food'], food: ['food'], food_store: ['food'],
  meal_takeaway: ['food'], bar: ['night', 'food'], wine_bar: ['night'],
  park: ['nature', 'quiet'], city_park: ['nature', 'quiet'],
  garden: ['nature', 'quiet', 'photo'], hiking_area: ['nature'],
  book_store: ['quiet', 'culture'], library: ['quiet', 'culture'],
  art_gallery: ['culture', 'photo'], art_museum: ['culture'],
  museum: ['culture'], historical_landmark: ['culture', 'photo'],
  historical_place: ['culture', 'photo'],
  buddhist_temple: ['culture', 'quiet'], shinto_shrine: ['culture', 'quiet'],
  church: ['culture', 'quiet'], place_of_worship: ['culture', 'quiet'],
  tourist_attraction: ['photo', 'culture'],
  observation_deck: ['photo', 'night'],
};

const INDOOR = new Set([
  'cafe', 'coffee_shop', 'restaurant', 'japanese_restaurant',
  'japanese_izakaya_restaurant', 'ramen_restaurant', 'sushi_restaurant',
  'bakery', 'food', 'food_store', 'meal_takeaway', 'bar', 'wine_bar',
  'book_store', 'library', 'art_gallery', 'art_museum', 'museum',
]);

// 住所から区名を取り出す（無ければ元の値を使う）
function toArea(address, fallback) {
  const m = String(address).match(/京都市([^\s]{1,4}区)/);
  if (m) return m[1];
  const m2 = String(address).match(/([^\s]{2,6}[市町村])/);
  if (m2) return m2[1];
  return fallback || '京都市内';
}

function toCategories(googleType, csvCategories) {
  const mapped = TYPE_TO_CATEGORY[googleType];
  if (mapped) return mapped;
  const fromCsv = String(csvCategories || '').split('|').filter(Boolean);
  return fromCsv.length ? fromCsv : ['culture'];
}

const spots = selected
  .map((r) => ({
    id: r.id,
    name: r.name,
    area: toArea(r.address, ''),
    rating: Number(r.rating),
    reviewCount: Number(r.reviewCount),
    categories: toCategories(r.googleType, r.categories),
    isIndoor: INDOOR.has(r.googleType) || String(r.isIndoor) === 'true',
    lat: Number(r.lat),
    lng: Number(r.lng),
    source: 'google',
  }))
  .filter((s) => s.name && Number.isFinite(s.rating) && Number.isFinite(s.lat))
  .sort((a, b) => a.reviewCount - b.reviewCount);

const famous = famousData.top20.map((s) => ({
  id: s.id,
  name: s.name,
  reviewCount: s.reviewCount,
}));

const ts = `// このファイルは scripts/build-data.mjs が生成する。直接編集しないこと。
// 生成日時: ${new Date().toISOString()}
// 出典: Google Places API (New) / 京都市内9地点を探索
// 選別状態: ${curated ? `人による選別済み（${spots.length}件）` : `機械フィルタのみ（${spots.length}件・未選別）`}

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
export const FAMOUS_AVG_REVIEWS = ${famousData.avgFamous};

/** 平均の母数（定番観光地の件数）。ラベルに出すので実数と一致させること */
export const FAMOUS_COUNT = ${famous.length};

/** 人の目による選別が済んでいるか */
export const IS_CURATED = ${curated};

/** オンボーディング用。口コミ件数の上位20件 */
export const GENERATED_FAMOUS: { id: string; name: string; reviewCount: number }[] =
${JSON.stringify(famous, null, 2)};

/** 提案候補 */
export const GENERATED_SPOTS: GeneratedSpot[] =
${JSON.stringify(spots, null, 2)};
`;

writeFileSync(join(ROOT, 'lib/spots.generated.ts'), ts);

console.log('=== 生成完了 ===');
console.log(`提案候補        : ${spots.length} 件`);
console.log(`選別状態        : ${curated ? '人による選別済み' : '機械フィルタのみ（未選別）'}`);
console.log(`有名観光地の平均: ${famousData.avgFamous} 件`);
console.log('');
console.log('出力: lib/spots.generated.ts');
