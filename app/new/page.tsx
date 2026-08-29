'use client';

// 投稿する。
// 保存先は localStorage（認証もサーバーも無いため、この端末に残る）。
// 写真は縮小してデータURLで保存し、EXIFに位置情報があれば場所として取り込む。

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import PointBadge from '@/components/PointBadge';
import Photo from '@/components/Photo';
import { CATEGORIES, CategoryId } from '@/lib/data';
import { GeoPoint, mapsUrl, readGeoFromFile } from '@/lib/exif';
import { fileToThumbnail } from '@/lib/image';
import { addUserPost } from '@/lib/userPosts';
import { notify } from '@/lib/notifications';

const WHO = [
  { value: 'solo', label: 'ひとり' },
  { value: 'pair', label: 'ふたり' },
  { value: 'group', label: 'グループ' },
] as const;

const PLACE_TYPE = [
  { value: false, label: '屋外' },
  { value: true, label: '屋内' },
] as const;

const TIME = [
  { value: 'morning', label: '朝' },
  { value: 'day', label: '日中' },
  { value: 'night', label: '夜' },
] as const;

const MINUTES = [
  { value: 30, label: '30分' },
  { value: 60, label: '1時間' },
  { value: 120, label: '半日' },
] as const;

const BUDGET = [
  { value: 0, label: 'かからない' },
  { value: 1, label: '〜1000円' },
  { value: 2, label: '1000円〜' },
] as const;

export default function NewPostPage() {
  const router = useRouter();
  const libraryRef = useRef<HTMLInputElement>(null);

  const [photo, setPhoto] = useState<string | null>(null);
  const [geo, setGeo] = useState<GeoPoint | null>(null);
  const [geoSource, setGeoSource] = useState<'exif' | 'device' | null>(null);
  const [geoChecked, setGeoChecked] = useState(false);
  const [reading, setReading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [locateError, setLocateError] = useState('');
  const [resolving, setResolving] = useState(false);

  // 座標から地名を引いて場所欄に入れる。
  // APIキーが無い・応答が無い環境では座標をそのまま入れる（空欄で放置しない）。
  const fillPlaceFrom = async (point: GeoPoint) => {
    setResolving(true);
    const fallback = `${point.lat.toFixed(5)}, ${point.lng.toFixed(5)}`;
    try {
      const res = await fetch(
        `/api/reverse-geocode?lat=${point.lat}&lng=${point.lng}`
      );
      if (res.ok && res.status !== 204) {
        const json = await res.json();
        setPlace(json.name || fallback);
      } else {
        setPlace(fallback);
      }
    } catch {
      setPlace(fallback);
    } finally {
      setResolving(false);
    }
  };

  // EXIFが無い写真は多い（SNS・Web経由・スクリーンショットでは削除される）。
  // 撮ってすぐ投稿するなら現在地＝撮影地なので、代わりに使えるようにする。
  const useCurrentLocation = () => {
    if (!('geolocation' in navigator)) {
      setLocateError('この端末では現在地を取得できません。');
      return;
    }
    setLocating(true);
    setLocateError('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const point = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setGeo(point);
        setGeoSource('device');
        setLocating(false);
        fillPlaceFrom(point);
      },
      (err) => {
        setLocating(false);
        setLocateError(
          err.code === err.PERMISSION_DENIED
            ? '位置情報の利用が許可されませんでした。場所は手入力してください。'
            : '現在地を取得できませんでした。場所は手入力してください。'
        );
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const [title, setTitle] = useState('');
  const [place, setPlace] = useState('');
  const [body, setBody] = useState('');
  const [categories, setCategories] = useState<CategoryId[]>([]);
  const [who, setWho] = useState<'solo' | 'pair' | 'group'>('solo');
  const [isIndoor, setIsIndoor] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'day' | 'night'>('day');
  const [minutes, setMinutes] = useState(30);
  const [budget, setBudget] = useState<0 | 1 | 2>(0);

  const [error, setError] = useState('');

  const onPick = async (file?: File) => {
    if (!file) return;
    setReading(true);
    setError('');
    // EXIFは縮小前の元ファイルから読む（縮小すると位置情報は消える）
    const [thumb, point] = await Promise.all([
      fileToThumbnail(file),
      readGeoFromFile(file),
    ]);
    setPhoto(thumb);
    setGeo(point);
    setGeoSource(point ? 'exif' : null);
    setGeoChecked(true);
    setLocateError('');
    setReading(false);
    // 撮影地点が取れたら、場所欄まで自動で埋める
    if (point) fillPlaceFrom(point);
  };

  const toggleCategory = (id: CategoryId) =>
    setCategories((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const canSubmit =
    title.trim() !== '' && body.trim() !== '' && categories.length > 0;

  const submit = () => {
    const id = `u${Date.now()}`;
    const result = addUserPost({
      id,
      tag: place.trim() ? place.trim().slice(0, 6) : '投稿',
      title: title.trim(),
      area: place.trim() || '京都府',
      place: place.trim() || (geo ? `${geo.lat.toFixed(5)}, ${geo.lng.toFixed(5)}` : ''),
      mapQuery: place.trim() || undefined,
      body: body.trim(),
      categories,
      author: 'あなたの投稿',
      isIndoor,
      minutes,
      budget,
      timeOfDay: [timeOfDay],
      who: [who],
      costPt: 1,
      hasPhoto: Boolean(photo),
      photoKind: 'real',
      photoDataUrl: photo ?? undefined,
      lat: geo?.lat,
      lng: geo?.lng,
      createdAt: new Date().toISOString(),
    });

    if (!result.ok) {
      setError('写真が大きくて保存しきれませんでした。本文だけ保存しています。');
      return;
    }
    notify({
      kind: 'posted',
      title: '投稿を公開しました',
      body: title.trim(),
      postId: id,
    });
    router.push(`/post/${id}`);
  };

  return (
    <main>
      <header className="home-head">
        <div>
          <h1 className="page-title">投稿する</h1>
          <p className="page-lead">あなただけの、とっておきの京都をシェアしよう。</p>
        </div>
        <PointBadge />
      </header>

      {/* 写真 */}
      <div className="field">
        <div className="field-label">写真</div>

        {photo ? (
          <>
            <Photo id="preview" src={photo} alt="選んだ写真" ratio="wide" />
            <button className="btn-sm" onClick={() => { setPhoto(null); setGeo(null); setGeoSource(null); setGeoChecked(false); setLocateError(''); }}>
              写真を変える
            </button>
          </>
        ) : (
          // 選択肢はOSの純正メニューに任せる。
          // capture を付けないと iOS は「写真ライブラリ／写真を撮る／ファイルを選択」を出す。
          <button
            className="upload"
            type="button"
            disabled={reading}
            onClick={() => libraryRef.current?.click()}
          >
            <span className="upload-plus">＋</span>
            <span className="upload-label">
              {reading ? '読み込み中…' : '写真を追加'}
            </span>
          </button>
        )}

        <input
          ref={libraryRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => onPick(e.target.files?.[0])}
        />

        {geoChecked && (
          <div className={geo ? 'geo-ok' : 'geo-none'}>
            {geo ? (
              <>
                {geoSource === 'exif'
                  ? '写真から撮影地点を取得しました'
                  : '現在地を使いました'}
                （{geo.lat.toFixed(5)}, {geo.lng.toFixed(5)}）
                <br />
                <a
                  className="map-link"
                  href={mapsUrl(geo)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Googleマップで確認 ↗
                </a>
              </>
            ) : (
              <>
                この写真に位置情報がありません。
                <br />
                （SNSやWeb経由の画像は、送信時にEXIFが削除されます）
                <br />
                <button
                  className="btn-sm"
                  style={{ marginTop: 8 }}
                  disabled={locating}
                  onClick={useCurrentLocation}
                >
                  {locating ? '取得中…' : '📍 いまいる場所を使う'}
                </button>
                {locateError && (
                  <div style={{ marginTop: 6 }}>{locateError}</div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      <div className="field">
        <div className="field-label">タイトル（必須）</div>
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="例：静かな路地裏の古民家カフェ"
        />
      </div>

      <div className="field">
        <div className="field-label">場所</div>
        <input
          className="input"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder={resolving ? '写真の位置から取得中…' : '例：京都市左京区岡崎周辺'}
        />
        {resolving && <p className="hint">写真の位置情報から場所を調べています…</p>}
        {!resolving && geo && place && (
          <p className="hint">写真の位置から自動入力しました。直せます。</p>
        )}
      </div>

      <div className="field">
        <div className="field-label">ひとこと（必須）</div>
        <textarea
          className="textarea"
          maxLength={140}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="例：地元の人しか知らない落ち着ける空間でした。"
        />
        <p className="hint" style={{ textAlign: 'right' }}>{body.length}/140</p>
      </div>

      <div className="field">
        <div className="field-label">気分・趣味（必須・複数可）</div>
        <div className="options">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              className="option"
              data-selected={categories.includes(c.id)}
              onClick={() => toggleCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <div className="field-label">誰と行くのが向いているか</div>
        <div className="options">
          {WHO.map((o) => (
            <button key={o.value} className="option" data-selected={who === o.value} onClick={() => setWho(o.value)}>
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <div className="field-label">屋内・屋外（雨の日の検索に使われます）</div>
        <div className="options">
          {PLACE_TYPE.map((o) => (
            <button key={String(o.value)} className="option" data-selected={isIndoor === o.value} onClick={() => setIsIndoor(o.value)}>
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <div className="field-label">おすすめの時間帯</div>
        <div className="options">
          {TIME.map((o) => (
            <button key={o.value} className="option" data-selected={timeOfDay === o.value} onClick={() => setTimeOfDay(o.value)}>
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <div className="field-label">滞在時間の目安</div>
        <div className="options">
          {MINUTES.map((o) => (
            <button key={o.value} className="option" data-selected={minutes === o.value} onClick={() => setMinutes(o.value)}>
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <div className="field-label">予算</div>
        <div className="options">
          {BUDGET.map((o) => (
            <button key={o.value} className="option" data-selected={budget === o.value} onClick={() => setBudget(o.value)}>
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="hint" style={{ color: '#b34' }}>{error}</p>}

      <button className="btn" disabled={!canSubmit} onClick={submit}>
        投稿する
      </button>

    </main>
  );
}
