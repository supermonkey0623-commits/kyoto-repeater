// 実ファイルのEXIFを調べる診断スクリプト。
// 「写真にGPSが無い」のか「読み取りロジックの不具合」なのかを切り分ける。
//
// 使い方: node scripts/check-exif.mjs <フォルダ or ファイル>

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

function ascii(view, offset, count) {
  let out = '';
  for (let i = 0; i < count; i++) {
    const c = view.getUint8(offset + i);
    if (c === 0) break;
    out += String.fromCharCode(c);
  }
  return out;
}

function readIfd(view, ifdStart, tiffStart, little) {
  const entries = new Map();
  const count = view.getUint16(ifdStart, little);
  for (let i = 0; i < count; i++) {
    const entry = ifdStart + 2 + i * 12;
    if (entry + 12 > view.byteLength) break;
    const tag = view.getUint16(entry, little);
    const type = view.getUint16(entry + 2, little);
    const num = view.getUint32(entry + 4, little);
    const sizes = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 7: 1, 9: 4, 10: 8 };
    const total = (sizes[type] ?? 1) * num;
    const offset = total <= 4 ? entry + 8 : tiffStart + view.getUint32(entry + 8, little);
    entries.set(tag, { type, count: num, offset });
  }
  return entries;
}

function rational(view, offset, little) {
  const n = view.getUint32(offset, little);
  const d = view.getUint32(offset + 4, little);
  return d === 0 ? 0 : n / d;
}

function diagnose(path) {
  const buf = readFileSync(path);
  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  const out = { file: path.split(/[\\/]/).pop(), size: `${Math.round(buf.length / 1024)}KB` };

  if (view.getUint16(0, false) !== 0xffd8) {
    out.result = 'JPEGではない';
    return out;
  }

  // セグメントを歩いて Exif APP1 を探す
  let offset = 2;
  let tiffStart = -1;
  const segments = [];
  while (offset + 4 < view.byteLength) {
    if (view.getUint8(offset) !== 0xff) break;
    const marker = view.getUint8(offset + 1);
    const size = view.getUint16(offset + 2, false);
    segments.push('FF' + marker.toString(16).toUpperCase());
    if (marker === 0xe1) {
      const head = ascii(view, offset + 4, 4);
      if (head === 'Exif') {
        tiffStart = offset + 10;
        break;
      }
    }
    if (marker === 0xda) break;
    offset += 2 + size;
  }
  out.segments = segments.slice(0, 8).join(' ');

  if (tiffStart < 0) {
    out.result = 'EXIFセグメントなし（GPSも当然なし）';
    return out;
  }

  const order = view.getUint16(tiffStart, false);
  const little = order === 0x4949;
  out.byteOrder = little ? 'II(little)' : order === 0x4d4d ? 'MM(big)' : `不明(${order.toString(16)})`;
  if (!little && order !== 0x4d4d) {
    out.result = 'TIFFヘッダが不正';
    return out;
  }

  const ifd0 = readIfd(view, tiffStart + view.getUint32(tiffStart + 4, little), tiffStart, little);
  out.ifd0Tags = ifd0.size;

  const gpsPointer = ifd0.get(0x8825);
  if (!gpsPointer) {
    out.result = 'EXIFはあるがGPS IFDへのポインタなし（位置情報オフ、または削除済み）';
    return out;
  }

  const gps = readIfd(view, tiffStart + view.getUint32(gpsPointer.offset, little), tiffStart, little);
  out.gpsTags = [...gps.keys()].map((k) => '0x' + k.toString(16)).join(',');

  const lat = gps.get(0x0002);
  const lng = gps.get(0x0004);
  const latRef = gps.get(0x0001);
  const lngRef = gps.get(0x0003);
  if (!lat || !lng || !latRef || !lngRef) {
    out.result = 'GPS IFDはあるが緯度経度タグが欠けている';
    return out;
  }

  const toDeg = (e, ref) => {
    const v = [0, 1, 2].map((i) => rational(view, e.offset + i * 8, little));
    const deg = v[0] + v[1] / 60 + v[2] / 3600;
    return ref === 'S' || ref === 'W' ? -deg : deg;
  };

  out.lat = toDeg(lat, ascii(view, latRef.offset, 2)).toFixed(6);
  out.lng = toDeg(lng, ascii(view, lngRef.offset, 2)).toFixed(6);
  out.result = '✅ GPSあり';
  return out;
}

const target = process.argv[2];
if (!target) {
  console.error('使い方: node scripts/check-exif.mjs <フォルダ or ファイル>');
  process.exit(1);
}

const files = statSync(target).isDirectory()
  ? readdirSync(target)
      .filter((f) => ['.jpg', '.jpeg'].includes(extname(f).toLowerCase()))
      .map((f) => join(target, f))
  : [target];

for (const f of files) {
  const d = diagnose(f);
  console.log(
    `${(d.file ?? '').padEnd(10)} ${String(d.size).padStart(7)}  ${d.result}` +
      (d.lat ? `  → ${d.lat}, ${d.lng}` : '') +
      (d.byteOrder ? `  [${d.byteOrder}]` : '')
  );
}
