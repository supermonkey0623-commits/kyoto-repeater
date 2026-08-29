'use client';

// F-01 オンボーディング。
// 行ったことのある有名スポットを選ばせ、そのままホームへ送る。
// 選んだ場所は提案から除外される（同じ定番をまた見せないため）。

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FAMOUS_SPOTS } from '@/lib/data';
import { get, set } from '@/lib/storage';

export default function OnboardingPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  // 選んだ内容は保存してあるので、戻ってきたときに選び直さなくていい
  useEffect(() => setSelected(get('visited')), []);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const confirm = () => {
    set('visited', selected);
    router.push('/home');
  };

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
          : '知らない京都を見る →'}
      </button>

      <Link href="/home" className="btn btn-ghost">
        あとで
      </Link>
    </main>
  );
}
