'use client';

// F-02 条件選択 ＋ F-03 提案結果 ＋ F-04 消費ログ
// 抽出はフィルタとソートのみ。AIは使用しない（要件定義書 §5 F-03）。

import { useEffect, useMemo, useState } from 'react';
import SpotCard from '@/components/SpotCard';
import {
  CATEGORIES,
  CategoryId,
  IS_CURATED_DATA,
  SUGGEST_SPOTS,
} from '@/lib/data';
import { add, get } from '@/lib/storage';

const PARTY = ['ひとり', 'ふたり', 'グループ'];
const WEATHER = ['晴れ', '雨'];
const STAY = ['日帰り', '泊まり'];

const RESULT_LIMIT = 5;

export default function SuggestPage() {
  const [category, setCategory] = useState<CategoryId | null>(null);
  const [party, setParty] = useState<string | null>(null);
  const [weather, setWeather] = useState<string | null>(null);
  const [stay, setStay] = useState<string | null>(null);

  const [visited, setVisited] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [rejected, setRejected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setVisited(get('visited'));
    setSaved(get('saved'));
    setRejected(get('rejected'));
  }, []);

  // 本番では下記をSupabaseのクエリに置き換える:
  //   WHERE categories @> 選択カテゴリ
  //     AND review_count < 50 AND rating >= 4.0
  //     AND id NOT IN (訪問済み ∪ 除外)
  //   ORDER BY review_count ASC LIMIT 5
  const results = useMemo(() => {
    return SUGGEST_SPOTS.filter((s) => {
      if (visited.includes(s.id) || rejected.includes(s.id)) return false;
      if (s.reviewCount >= 50) return false;
      if (s.rating < 4.0) return false;
      if (category && !s.categories.includes(category)) return false;
      if (weather === '雨' && !s.isIndoor) return false;
      return true;
    })
      .sort((a, b) => a.reviewCount - b.reviewCount)
      .slice(0, RESULT_LIMIT);
  }, [category, weather, visited, rejected]);

  const logCount = visited.length + saved.length + rejected.length;

  return (
    <main>
      {!IS_CURATED_DATA && (
        <div className="dummy-banner">
          未選別データで動作中（{SUGGEST_SPOTS.length}件）。人の目による選別が未完了です。
        </div>
      )}

      <h1 className="page-title">今日はどんな気分？</h1>
      <p className="page-lead">
        反応するほど提案が変わります（記録 {logCount}件）
      </p>

      <div className="field">
        <div className="field-label">気分・目的</div>
        <div className="options">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              className="option"
              data-selected={category === c.id}
              onClick={() => setCategory(category === c.id ? null : c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <div className="field-label">人数</div>
        <div className="options">
          {PARTY.map((p) => (
            <button
              key={p}
              className="option"
              data-selected={party === p}
              onClick={() => setParty(party === p ? null : p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <div className="field-label">天気</div>
        <div className="options">
          {WEATHER.map((w) => (
            <button
              key={w}
              className="option"
              data-selected={weather === w}
              onClick={() => setWeather(weather === w ? null : w)}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <div className="field-label">滞在</div>
        <div className="options">
          {STAY.map((s) => (
            <button
              key={s}
              className="option"
              data-selected={stay === s}
              onClick={() => setStay(stay === s ? null : s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <button className="btn" onClick={() => setSubmitted(true)}>
        知らない京都を探す
      </button>

      {submitted && (
        <section style={{ marginTop: 28 }}>
          <h2 className="page-title">有名じゃない順に {results.length}件</h2>
          <p className="page-lead">口コミの少ない順に並んでいます。</p>

          {results.length === 0 ? (
            <p className="empty">
              条件に合う場所がありませんでした。
              <br />
              条件を減らしてみてください。
            </p>
          ) : (
            results.map((spot) => (
              <SpotCard
                key={spot.id}
                spot={spot}
                saved={saved.includes(spot.id)}
                onVisit={(id) => setVisited(add('visited', id))}
                onSave={(id) => setSaved(add('saved', id))}
                onReject={(id) => setRejected(add('rejected', id))}
              />
            ))
          )}
        </section>
      )}
    </main>
  );
}
