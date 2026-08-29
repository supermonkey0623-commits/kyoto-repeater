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
  const cameraRef = useRef<HTMLInputElement>(null);
  const libraryRef = useRef<HTMLInputElement>(null);

  const [photo, setPhoto] = useState<string | null>(null);
  const [geo, setGeo] = useState<GeoPoint | null>(null);
  const [geoChecked, setGeoChecked] = useState(false);
  const [reading, setReading] = useState(false);

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
    setGeoChecked(true);
    setReading(false);
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
            <button className="btn-sm" onClick={() => { setPhoto(null); setGeo(null); setGeoChecked(false); }}>
              写真を変える
            </button>
          </>
        ) : (
          <div className="upload">
            <div className="upload-plus">＋</div>
            <div className="upload-label">
              {reading ? '読み込み中…' : '写真を追加'}
            </div>
            <div className="pick-row">
              <button className="btn-sm" onClick={() => cameraRef.current?.click()}>
                📷 カメラで撮る
              </button>
              <button className="btn-sm" onClick={() => libraryRef.current?.click()}>
                🖼 写真から選ぶ
              </button>
            </div>
          </div>
        )}

        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="environment"
          hidden
          onChange={(e) => onPick(e.target.files?.[0])}
        />
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
                撮影地点を取得しました（{geo.lat.toFixed(5)}, {geo.lng.toFixed(5)}）
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
              'この写真に位置情報はありませんでした。場所は手入力してください。'
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
          placeholder={geo ? '写真から座標を取得済み。名前があれば入力' : '例：京都市左京区岡崎周辺'}
        />
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
