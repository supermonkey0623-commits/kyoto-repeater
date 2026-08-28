'use client';

import { KYOTO_AVG_REVIEWS, Spot, getRarity } from '@/lib/data';

type Props = {
  spot: Spot;
  saved: boolean;
  onVisit: (id: string) => void;
  onSave: (id: string) => void;
  onReject: (id: string) => void;
};

export default function SpotCard({
  spot,
  saved,
  onVisit,
  onSave,
  onReject,
}: Props) {
  const rarity = getRarity(spot.reviewCount);

  return (
    <article className="card">
      <div className="card-photo">写真（未実装 / F-06）</div>

      <div className="card-body">
        <h3 className="card-name">{spot.name}</h3>
        <p className="card-area">{spot.area}</p>

        <div className="card-stats">
          ★{spot.rating.toFixed(1)}　口コミ {spot.reviewCount}件
        </div>

        {/* 口コミ件数の対比。構成を変えないこと */}
        <div className="contrast">
          京都の観光スポット平均：{KYOTO_AVG_REVIEWS.toLocaleString()}件
          <strong>
            評価は高いのに、{spot.reviewCount}人しか書いていない場所
          </strong>
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

        {/* 消費ログ。すべて「自分の提案を良くするため」の操作 */}
        <div className="card-actions">
          <button className="btn-sm" onClick={() => onVisit(spot.id)}>
            行った
          </button>
          <button
            className="btn-sm"
            data-done={saved}
            onClick={() => onSave(spot.id)}
          >
            {saved ? '♥ 気になる' : '♡ 気になる'}
          </button>
          <button className="btn-sm" onClick={() => onReject(spot.id)}>
            違う
          </button>
        </div>
      </div>
    </article>
  );
}
