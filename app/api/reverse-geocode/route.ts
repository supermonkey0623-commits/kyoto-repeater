// 緯度経度から地名を返す。
//
// APIキーをブラウザに出さないため、サーバー側で叩いて結果だけ返す。
// キーが無い環境では 204 を返し、呼び出し側は座標表示にフォールバックする。

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const lat = Number(req.nextUrl.searchParams.get('lat'));
  const lng = Number(req.nextUrl.searchParams.get('lng'));

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return NextResponse.json({ error: 'lat/lng が不正です' }, { status: 400 });
  }

  const key = process.env.GOOGLE_MAPS_API_KEY;
  // キー未設定でも壊さない。呼び出し側が座標にフォールバックする
  if (!key) return new NextResponse(null, { status: 204 });

  try {
    // まず近くの施設名を探す（「マヤルカ古書店」のように名前で返るのが理想）
    const nearby = await fetch(
      'https://places.googleapis.com/v1/places:searchNearby',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': key,
          'X-Goog-FieldMask':
            'places.displayName,places.shortFormattedAddress,places.userRatingCount',
        },
        body: JSON.stringify({
          maxResultCount: 1,
          rankPreference: 'DISTANCE',
          languageCode: 'ja',
          locationRestriction: {
            circle: { center: { latitude: lat, longitude: lng }, radius: 60 },
          },
        }),
        // 会場回線で詰まったら諦める
        signal: AbortSignal.timeout(6000),
      }
    );

    if (nearby.ok) {
      const json = await nearby.json();
      const place = json.places?.[0];
      if (place?.displayName?.text) {
        return NextResponse.json({
          name: place.displayName.text,
          address: place.shortFormattedAddress ?? '',
          source: 'place',
        });
      }
    }

    // 施設が見つからなければ住所に落とす（公園や道はこちらになる）
    const geo = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=ja&key=${key}`,
      { signal: AbortSignal.timeout(6000) }
    );

    if (geo.ok) {
      const json = await geo.json();
      const first = json.results?.[0];
      if (first?.formatted_address) {
        // 「日本、〒600-8001 京都府…」の接頭辞を落とす
        const address = String(first.formatted_address)
          .replace(/^日本、?\s*/, '')
          .replace(/^〒\d{3}-?\d{4}\s*/, '');
        return NextResponse.json({ name: address, address, source: 'address' });
      }
    }

    return new NextResponse(null, { status: 204 });
  } catch {
    // タイムアウト・ネットワーク断。座標フォールバックに任せる
    return new NextResponse(null, { status: 204 });
  }
}
