'use client';

// 「気になる」リスト。消費ログのうち保存したものを見返す画面。
// 投稿メニューの跡地。ユーザーが自分のために使う機能だけを置く。

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SUGGEST_SPOTS, getRarity } from '@/lib/data';
import { get, remove } from '@/lib/storage';

export default function SavedPage() {
  const [saved, setSaved] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSaved(get('saved'));
    setReady(true);
  }, []);

  const spots = SUGGEST_SPOTS.filter((s) => saved.includes(s.id));

  return (
    <main>
      <h1 className="page-title">気になる</h1>
      <p className="page-lead">保存した場所（{spots.length}件）</p>

      {!ready ? null : spots.length === 0 ? (
        <p className="empty">
          まだありません。
          <br />
          提案から「♡ 気になる」を押すとここに溜まります。
          <br />
          <br />
          <Link href="/suggest">提案を見る →</Link>
        </p>
      ) : (
        spots.map((spot) => {
          const rarity = getRarity(spot.reviewCount);
          return (
            <article key={spot.id} className="card">
              <div className="card-body">
                <h3 className="card-name">{spot.name}</h3>
                <p className="card-area">{spot.area}</p>
                <div className="card-stats">
                  ★{spot.rating.toFixed(1)}　口コミ {spot.reviewCount}件
                </div>
                <div className="rarity">
                  レア度 {rarity.stars}　{rarity.label}
                </div>
                {spot.comment && (
                  <div className="recommender">
                    「{spot.comment}」
                    {spot.recommenderNote && (
                      <span className="recommender-note">
                        — {spot.recommenderNote}
                      </span>
                    )}
                  </div>
                )}
                <div className="card-actions">
                  <button
                    className="btn-sm"
                    onClick={() => setSaved(remove('saved', spot.id))}
                  >
                    はずす
                  </button>
                </div>
              </div>
            </article>
          );
        })
      )}
    </main>
  );
}
