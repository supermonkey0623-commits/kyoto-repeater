'use client';

// F-01 オンボーディング → F-02 横並び比較（アハの発火点）
//
// 踏破率は廃止（分母が恣意的で、根拠を問われると弱いため）。
// 代わりに、タップした有名スポットをそのまま比較の左側に使う。
// 「検索すると定番ばかり」という課題定義を、そのまま画面で証明する。

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FAMOUS_SPOTS, SUGGEST_SPOTS } from '@/lib/data';
import { get, set } from '@/lib/storage';

export default function OnboardingPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  // 選んだ内容は保存してあるので、戻ってきたときに選び直さなくていい
  useEffect(() => setSelected(get('visited')), []);

  // 2画面目は URL が変わらないため、端末の「戻る」だと
  // アプリごと出てしまう。履歴を1つ積んで、戻ると選び直しに帰るようにする
  useEffect(() => {
    const onPop = () => setDone(false);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const confirm = () => {
    set('visited', selected);
    setDone(true);
    window.history.pushState({ step: 'compare' }, '');
  };

  if (done) {
    // 左：選んだ有名スポットを口コミの多い順に
    const left = FAMOUS_SPOTS.filter((s) => selected.includes(s.id))
      .sort((a, b) => b.reviewCount - a.reviewCount)
      .slice(0, 5);

    // 右：口コミの少ない順に
    const right = [...SUGGEST_SPOTS]
      .sort((a, b) => a.reviewCount - b.reviewCount)
      .slice(0, 5);

    return (
      <main>
        <button className="back" onClick={() => window.history.back()}>
          ← 選び直す
        </button>

        <h1 className="page-title">あなたが見てきた京都</h1>
        <p className="page-lead">
          左は、あなたが行った場所。右は、同じ京都にある場所です。
        </p>

        <div className="compare">
          <div className="compare-col">
            <div className="compare-head">行ったことがある</div>
            {left.map((s) => (
              <div key={s.id} className="compare-row">
                <span className="compare-name">{s.name}</span>
                <span className="compare-count big">
                  {s.reviewCount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="compare-col">
            <div className="compare-head accent">まだ知らない</div>
            {right.map((s) => (
              <div key={s.id} className="compare-row">
                <span className="compare-name">{s.name}</span>
                <span className="compare-count small">{s.reviewCount}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="compare-note">
          数字は口コミ件数。
          <strong>
            右側はどれも評価4.0以上。知られていないだけです。
          </strong>
        </p>

        <Link href="/home" className="btn">
          知らない京都を見る →
        </Link>
      </main>
    );
  }

  return (
    <main>
      <h1 className="page-title">京都で行ったことある場所は？</h1>
      <p className="page-lead">
        タップして選んでください。選んだ場所は提案から除外されます。
      </p>

      <div className="spot-grid">
        {FAMOUS_SPOTS.map((spot) => (
          <button
            key={spot.id}
            className="spot-chip"
            data-selected={selected.includes(spot.id)}
            onClick={() => toggle(spot.id)}
          >
            {spot.name}
          </button>
        ))}
      </div>

      <button className="btn" onClick={confirm} disabled={selected.length === 0}>
        {selected.length === 0
          ? '1つ以上選んでください'
          : `${selected.length}件を選んで次へ`}
      </button>

      <Link href="/home" className="btn btn-ghost">
        あとで
      </Link>
    </main>
  );
}
