// 投稿に紐づく場所の口コミ件数を Places API で引く。
//
// 使い方: node scripts/fetch-post-places.mjs
//
// 「無名かどうか」は主観では決められないので、必ず実データで確認する。

import { readFileSync, existsSync, writeFileSync } from 'node:fs';
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

const TARGETS = [
  { id: 'p01', label: '夜明けの石畳', query: '石塀小路 京都' },
  { id: 'p02', label: '飛び石の路地', query: '石塀小路 京都' },
  { id: 'p03', label: '川の夕暮れ', query: '大堰川 嵐山 京都' },
  { id: 'p04', label: '寺の庭', query: '醍醐寺 三宝院 京都' },
  { id: 'p05', label: '鴨川のベンチ', query: '鴨川公園 出雲路 京都' },
  { id: 'p06', label: 'ギャラリー', query: 'be京都 ギャラリー' },
  { id: 'p07', label: '夜の石段', query: '貴船神社 京都' },
  { id: 'p08', label: '緑の細道', query: '祇王寺 京都' },
  { id: 'p09', label: '立呑屋', query: 'たち呑み しゃーぷ 四条木屋町' },
  { id: 'p10', label: '本のある店', query: 'マヤルカ古書店 京都' },
  { id: 'p11', label: '定食屋', query: '食堂 はやし 京都 東山区' },
  { id: 'p12', label: '苔と砂利道', query: '祇王寺 京都' },
];

async function textSearch(query) {
  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': [
        'places.id', 'places.displayName', 'places.formattedAddress',
        'places.rating', 'places.userRatingCount', 'places.location',
      ].join(','),
    },
    body: JSON.stringify({ textQuery: query, languageCode: 'ja', maxResultCount: 1 }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 160)}`);
  return (await res.json()).places?.[0] ?? null;
}

const results = [];
for (const t of TARGETS) {
  try {
    const p = await textSearch(t.query);
    results.push({
      ...t,
      found: p?.displayName?.text ?? null,
      address: p?.formattedAddress ?? '',
      rating: p?.rating ?? null,
      reviewCount: p?.userRatingCount ?? null,
      lat: p?.location?.latitude ?? null,
      lng: p?.location?.longitude ?? null,
    });
  } catch (e) {
    results.push({ ...t, error: e.message });
  }
}

writeFileSync(join(ROOT, 'data/post-places.json'), JSON.stringify(results, null, 2));

console.log('ID   ラベル          口コミ件数   評価   検索でヒットした場所');
console.log('─'.repeat(76));
for (const r of results) {
  if (r.error) {
    console.log(`${r.id}  ${r.label.padEnd(14)} エラー: ${r.error}`);
    continue;
  }
  const n = r.reviewCount ?? 0;
  const flag = n < 50 ? '無名' : n < 1000 ? '中' : '★有名';
  console.log(
    `${r.id}  ${r.label.padEnd(14)} ${String(n).padStart(7)}  ${String(r.rating ?? '-').padStart(4)}   ${r.found ?? '(見つからず)'}  [${flag}]`
  );
}

const obscure = results.filter((r) => (r.reviewCount ?? 0) < 50).length;
console.log('');
console.log(`口コミ50件未満（＝コンセプトが成立する）: ${obscure} / ${results.length} 件`);
console.log('出力: data/post-places.json');
