// 京都市内のスポットを Google Places API (New) から取得する。
//
// 使い方:
//   1. .env.local に GOOGLE_MAPS_API_KEY=... を書く
//   2. node scripts/fetch-spots.mjs
//   3. data/spots.json が出力される
//
// ポイント: rankPreference を DISTANCE にしている。
// POPULARITY だと有名店ばかり返ってくるため、無名スポットが取れない。
// 「近い順」で拾って、あとから口コミ件数でフィルタするのが正解。

import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ---- APIキーの読み込み ----
function loadKey() {
  if (process.env.GOOGLE_MAPS_API_KEY) return process.env.GOOGLE_MAPS_API_KEY;
  const envPath = join(ROOT, '.env.local');
  if (!existsSync(envPath)) return null;

  // PowerShell の `>` は UTF-16LE で書き込むため、BOMを見て読み分ける。
  const buf = readFileSync(envPath);
  let text;
  if (buf[0] === 0xff && buf[1] === 0xfe) {
    text = buf.toString('utf16le');
  } else if (buf[0] === 0xfe && buf[1] === 0xff) {
    text = buf.swap16().toString('utf16le');
  } else {
    text = buf.toString('utf8');
  }
  text = text.replace(/^﻿/, ''); // UTF-8 BOM を除去

  const line = text
    .split(/\r?\n/)
    .find((l) => l.trim().startsWith('GOOGLE_MAPS_API_KEY='));
  if (!line) return null;

  return line
    .split('=')
    .slice(1)
    .join('=')
    .trim()
    .replace(/^["']|["']$/g, ''); // 前後のクォートを除去
}

const API_KEY = loadKey();
if (!API_KEY) {
  console.error('GOOGLE_MAPS_API_KEY が見つかりません。');
  console.error('.env.local に GOOGLE_MAPS_API_KEY=xxxx を書いてください。');
  process.exit(1);
}

// ---- 探索する場所（京都市内をグリッドで覆う） ----
const GRID = [
  { name: '中京・四条', lat: 35.0045, lng: 135.7681 },
  { name: '京都駅・下京', lat: 34.9858, lng: 135.7588 },
  { name: '東山・祇園', lat: 35.0036, lng: 135.7788 },
  { name: '左京・出町', lat: 35.0301, lng: 135.7731 },
  { name: '左京・北白川', lat: 35.0244, lng: 135.7936 },
  { name: '北区・上京', lat: 35.0324, lng: 135.7480 },
  { name: '右京・嵐山', lat: 35.0094, lng: 135.6779 },
  { name: '伏見', lat: 34.9324, lng: 135.7616 },
  { name: '山科', lat: 34.9689, lng: 135.8155 },
];

// Places API (New) のタイプ
const TYPES = [
  'cafe',
  'restaurant',
  'bar',
  'park',
  'book_store',
  'art_gallery',
  'museum',
  'bakery',
  'tourist_attraction',
];

const RADIUS = 1500; // メートル
const MAX_PER_REQUEST = 20; // APIの上限

// 我々のカテゴリへの対応づけ
const CATEGORY_MAP = {
  cafe: ['quiet', 'food'],
  restaurant: ['food'],
  bakery: ['food'],
  bar: ['night', 'food'],
  park: ['nature', 'quiet'],
  book_store: ['quiet', 'culture'],
  art_gallery: ['culture', 'photo'],
  museum: ['culture'],
  tourist_attraction: ['photo', 'culture'],
};

const INDOOR_TYPES = new Set([
  'cafe',
  'restaurant',
  'bar',
  'book_store',
  'art_gallery',
  'museum',
  'bakery',
]);

async function searchNearby(point, type) {
  const res = await fetch(
    'https://places.googleapis.com/v1/places:searchNearby',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        // フィールドマスクは課金額に直結する。必要なものだけ requesting する。
        'X-Goog-FieldMask': [
          'places.id',
          'places.displayName',
          'places.location',
          'places.rating',
          'places.userRatingCount',
          'places.primaryType',
          'places.shortFormattedAddress',
        ].join(','),
      },
      body: JSON.stringify({
        includedTypes: [type],
        maxResultCount: MAX_PER_REQUEST,
        // DISTANCE にしないと有名店ばかり返る
        rankPreference: 'DISTANCE',
        languageCode: 'ja',
        locationRestriction: {
          circle: {
            center: { latitude: point.lat, longitude: point.lng },
            radius: RADIUS,
          },
        },
      }),
    }
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`HTTP ${res.status}: ${body.slice(0, 300)}`);
  }
  const json = await res.json();
  return json.places ?? [];
}

// ---- 取得 ----
const seen = new Map();
let requestCount = 0;
let errorCount = 0;

for (const point of GRID) {
  for (const type of TYPES) {
    try {
      const places = await searchNearby(point, type);
      requestCount++;
      for (const p of places) {
        if (seen.has(p.id)) continue;
        seen.set(p.id, {
          id: p.id,
          name: p.displayName?.text ?? '(名称不明)',
          area: point.name,
          address: p.shortFormattedAddress ?? '',
          lat: p.location?.latitude ?? null,
          lng: p.location?.longitude ?? null,
          rating: p.rating ?? null,
          reviewCount: p.userRatingCount ?? 0,
          googleType: p.primaryType ?? type,
          categories: CATEGORY_MAP[type] ?? [],
          isIndoor: INDOOR_TYPES.has(type),
          source: 'google',
        });
      }
      process.stdout.write(
        `\r取得中... ${requestCount}件のリクエスト / ${seen.size}件のスポット`
      );
    } catch (e) {
      errorCount++;
      console.error(`\n[エラー] ${point.name} / ${type}: ${e.message}`);
      if (errorCount >= 3) {
        console.error('\nエラーが3回続いたため中断します。APIキーと有効化状況を確認してください。');
        process.exit(1);
      }
    }
  }
}

const all = [...seen.values()];

// ---- 集計 ----
const rated = all.filter((s) => s.rating !== null && s.reviewCount > 0);

// 提案候補: 評価4.0以上 × 口コミ50件未満
const suggestPool = rated
  .filter((s) => s.rating >= 4.0 && s.reviewCount < 50)
  .sort((a, b) => a.reviewCount - b.reviewCount);

// 有名スポット: 口コミ件数の上位20件（オンボーディング用）
const famous = [...rated]
  .sort((a, b) => b.reviewCount - a.reviewCount)
  .slice(0, 20);

// 「京都の観光スポット平均口コミ件数」（カードの対比に使う確定値）
const avgReviews = Math.round(
  rated.reduce((sum, s) => sum + s.reviewCount, 0) / (rated.length || 1)
);

// 観光地に限った平均（tourist_attraction のみ）— こちらの方が対比として正確
const attractions = rated.filter((s) => s.googleType === 'tourist_attraction');
const avgAttractionReviews = attractions.length
  ? Math.round(
      attractions.reduce((sum, s) => sum + s.reviewCount, 0) / attractions.length
    )
  : null;

const out = {
  fetchedAt: new Date().toISOString(),
  stats: {
    requests: requestCount,
    total: all.length,
    rated: rated.length,
    suggestPool: suggestPool.length,
    avgReviews,
    avgAttractionReviews,
  },
  famous,
  suggestPool,
  all,
};

mkdirSync(join(ROOT, 'data'), { recursive: true });
writeFileSync(join(ROOT, 'data/spots.json'), JSON.stringify(out, null, 2));

console.log('\n\n=== 完了 ===');
console.log(`リクエスト数     : ${requestCount}`);
console.log(`取得スポット総数 : ${all.length}`);
console.log(`評価ありのもの   : ${rated.length}`);
console.log(`提案候補         : ${suggestPool.length} 件（★4.0以上・口コミ50件未満）`);
console.log(`平均口コミ件数   : ${avgReviews}`);
console.log(`観光地の平均     : ${avgAttractionReviews ?? '(該当なし)'}`);
console.log('\n出力: data/spots.json');

if (suggestPool.length < 30) {
  console.log('\n⚠ 提案候補が30件未満です。GRID の点を増やすか RADIUS を広げてください。');
}
if (all.length < 300) {
  console.log('⚠ 総数が300件未満です。要件定義 §7.2 の下限を満たしていません。');
}
