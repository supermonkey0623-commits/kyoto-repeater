// JPEGのEXIFから撮影位置（GPS）を読む。
//
// 外部ライブラリを使わずに、必要なタグだけを読む最小実装。
// 読めない写真（GPSオフ、SNS経由で削除済み、PNG/HEIC）では null を返す。
//
// 構造: JPEG の APP1 セグメント → "Exif\0\0" → TIFFヘッダ → IFD0 →
//       GPS IFD ポインタ(0x8825) → GPS IFD の 0x0001〜0x0004

export type GeoPoint = { lat: number; lng: number };

const TAG_GPS_IFD = 0x8825;
const GPS_LAT_REF = 0x0001;
const GPS_LAT = 0x0002;
const GPS_LNG_REF = 0x0003;
const GPS_LNG = 0x0004;

/** 度分秒（それぞれ有理数）を10進の度に直す */
function toDegrees(dms: number[], ref: string): number {
  const [d = 0, m = 0, s = 0] = dms;
  const value = d + m / 60 + s / 3600;
  return ref === 'S' || ref === 'W' ? -value : value;
}

function readRational(view: DataView, offset: number, little: boolean): number {
  const numerator = view.getUint32(offset, little);
  const denominator = view.getUint32(offset + 4, little);
  return denominator === 0 ? 0 : numerator / denominator;
}

function readAscii(view: DataView, offset: number, count: number): string {
  let out = '';
  for (let i = 0; i < count; i++) {
    const c = view.getUint8(offset + i);
    if (c === 0) break;
    out += String.fromCharCode(c);
  }
  return out;
}

/** IFD を読み、タグ番号 → { type, count, valueOffset } の対応を返す */
function readIfd(
  view: DataView,
  ifdStart: number,
  tiffStart: number,
  little: boolean
) {
  const entries = new Map<number, { type: number; count: number; offset: number }>();
  const count = view.getUint16(ifdStart, little);

  for (let i = 0; i < count; i++) {
    const entry = ifdStart + 2 + i * 12;
    if (entry + 12 > view.byteLength) break;

    const tag = view.getUint16(entry, little);
    const type = view.getUint16(entry + 2, little);
    const num = view.getUint32(entry + 4, little);

    // 値が4バイトに収まる場合はその場に、収まらない場合はオフセットが入る
    const sizes: Record<number, number> = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 7: 1, 9: 4, 10: 8 };
    const total = (sizes[type] ?? 1) * num;
    const offset = total <= 4 ? entry + 8 : tiffStart + view.getUint32(entry + 8, little);

    entries.set(tag, { type, count: num, offset });
  }
  return entries;
}

/** JPEGのArrayBufferからGPS座標を取り出す。無ければ null */
export function readGeoFromJpeg(buffer: ArrayBuffer): GeoPoint | null {
  try {
    const view = new DataView(buffer);
    if (view.byteLength < 4 || view.getUint16(0, false) !== 0xffd8) return null; // JPEGでない

    // APP1 (0xFFE1) を探す
    let offset = 2;
    let tiffStart = -1;
    while (offset + 4 < view.byteLength) {
      if (view.getUint8(offset) !== 0xff) break;
      const marker = view.getUint8(offset + 1);
      const size = view.getUint16(offset + 2, false);

      if (marker === 0xe1) {
        const exifStart = offset + 4;
        if (readAscii(view, exifStart, 4) === 'Exif') {
          tiffStart = exifStart + 6;
          break;
        }
      }
      if (marker === 0xda) break; // 画像データに到達
      offset += 2 + size;
    }
    if (tiffStart < 0 || tiffStart + 8 > view.byteLength) return null;

    // TIFFヘッダ: バイトオーダー
    const order = view.getUint16(tiffStart, false);
    const little = order === 0x4949; // 'II'
    if (!little && order !== 0x4d4d) return null;

    const ifd0Offset = view.getUint32(tiffStart + 4, little);
    const ifd0 = readIfd(view, tiffStart + ifd0Offset, tiffStart, little);

    const gpsPointer = ifd0.get(TAG_GPS_IFD);
    if (!gpsPointer) return null;

    const gpsIfdOffset = view.getUint32(gpsPointer.offset, little);
    const gps = readIfd(view, tiffStart + gpsIfdOffset, tiffStart, little);

    const latEntry = gps.get(GPS_LAT);
    const lngEntry = gps.get(GPS_LNG);
    const latRefEntry = gps.get(GPS_LAT_REF);
    const lngRefEntry = gps.get(GPS_LNG_REF);
    if (!latEntry || !lngEntry || !latRefEntry || !lngRefEntry) return null;

    const latRef = readAscii(view, latRefEntry.offset, 2);
    const lngRef = readAscii(view, lngRefEntry.offset, 2);

    const lat = toDegrees(
      [0, 1, 2].map((i) => readRational(view, latEntry.offset + i * 8, little)),
      latRef
    );
    const lng = toDegrees(
      [0, 1, 2].map((i) => readRational(view, lngEntry.offset + i * 8, little)),
      lngRef
    );

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
    if (lat === 0 && lng === 0) return null;
    return { lat, lng };
  } catch {
    // 壊れたEXIFで落とさない
    return null;
  }
}

export function readGeoFromFile(file: File): Promise<GeoPoint | null> {
  return new Promise((resolve) => {
    // GPSは先頭のEXIFにあるので、先頭256KBだけ読めば足りる
    const slice = file.slice(0, 256 * 1024);
    const reader = new FileReader();
    reader.onload = () =>
      resolve(
        reader.result instanceof ArrayBuffer ? readGeoFromJpeg(reader.result) : null
      );
    reader.onerror = () => resolve(null);
    reader.readAsArrayBuffer(slice);
  });
}

export function mapsUrl(geo: GeoPoint): string {
  return `https://www.google.com/maps/search/?api=1&query=${geo.lat},${geo.lng}`;
}
