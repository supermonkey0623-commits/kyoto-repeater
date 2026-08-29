// オンボーディング／横並び比較の左列に使う「誰もが知っている京都」を取得する。
//
// 使い方: node scripts/fetch-landmarks.mjs
//   → data/famous.json を上書きする
//
// なぜ名指しで取るか:
// searchNearby の結果から口コミ上位を拾うと、商業観光施設が混ざる。
// 左列は「リピーターが"行った"と答える場所」でなければ比較が成立しないため、
// 定番のランドマークを固定リストで指定し、口コミ件数だけを実データで取る。

import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function loadKey() {
  if (process.env.GOOGLE_MAPS_API_KEY) return process.env.GOOGLE_MAPS_API_KEY;
  const p = join(ROOT, '.env.local');
  if (!existsSync(p)) return null;
  const buf = readFileSync(p);
  let text;
  if (buf[0] === 0xff && buf[1] === 0xfe) text = buf.toString('utf16le');
  else if (buf[0] === 0xfe && buf[1] === 0xff) text = buf.swap16().toString('utf16le');
  else text = buf.toString('utf8');
  text = text.replace(/^﻿/, '');
  const line = text.split(/\r?\n/).find((l) => l.trim().startsWith('GOOGLE_MAPS_API_KEY='));
  return line ? line.split('=').slice(1).join('=').trim().replace(/^["']|["']$/g, '') : null;
}

const API_KEY = loadKey();
if (!API_KEY) {
  console.error('GOOGLE_MAPS_API_KEY が見つかりません。');
  process.exit(1);
}

// 「京都に来たことがあるなら、まず行っている」場所
const LANDMARKS = [
  '清水寺 京都', '金閣寺 京都', '伏見稲荷大社 京都', '銀閣寺 京都',
  '嵐山 渡月橋 京都', '八坂神社 京都', '二条城 京都', '平安神宮 京都',
  '南禅寺 京都', '錦市場 京都', '哲学の道 京都', '東寺 京都',
  '三十三間堂 京都', '天龍寺 京都', '龍安寺 京都', '貴船神社 京都',
  '京都タワー', '祇園 花見小路 京都', '鴨川デルタ 京都', '北野天満宮 京都',
];

async function textSearch(query) {
  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': [
        'places.id', 'places.displayName', 'places.location',
        'places.rating', 'places.userRatingCount', 'places.primaryType',
      ].join(','),
    },
    body: JSON.stringify({ textQuery: query, languageCode: 'ja', maxResultCount: 1 }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const json = await res.json();
  return json.places?.[0] ?? null;
}

const found = [];
for (const q of LANDMARKS) {
  try {
    const p = await textSearch(q);
    if (!p) { console.error(`  見つからず: ${q}`); continue; }
    found.push({
      id: p.id,
      name: p.displayName?.text ?? q,
      reviewCount: p.userRatingCount ?? 0,
      rating: p.rating ?? null,
      lat: p.location?.latitude ?? null,
      lng: p.location?.longitude ?? null,
    });
    process.stdout.write(`\r取得中... ${found.length}/${LANDMARKS.length}`);
  } catch (e) {
    console.error(`\n[エラー] ${q}: ${e.message}`);
  }
}

// 道・通りは口コミが付かず0件になる。左列に出すと比較が壊れるので落とす。
const usable = found.filter((f) => f.reviewCount > 0);
usable.sort((a, b) => b.reviewCount - a.reviewCount);

const avgFamous = Math.round(
  usable.reduce((s, x) => s + x.reviewCount, 0) / (usable.length || 1)
);

writeFileSync(
  join(ROOT, 'data/famous.json'),
  JSON.stringify({ avgFamous, top20: usable }, null, 2)
);

console.log('\n\n=== 完了 ===');
usable.forEach((f) => console.log(String(f.reviewCount).padStart(7), f.name));
console.log('');
console.log(`定番${usable.length}か所の平均口コミ件数: ${avgFamous}`);
console.log('\n出力: data/famous.json（次に build-data.mjs を実行）');
