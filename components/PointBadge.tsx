'use client';

import { useEffect, useState } from 'react';
import { POINTS_CHANGED, getBalance } from '@/lib/points';

/**
 * 残高バッジ。
 * 残高を変えるのは別のコンポーネント（投稿詳細）なので、
 * POINTS_CHANGED イベントを購読していないと古い値を表示したままになる。
 */
export default function PointBadge() {
  const [pt, setPt] = useState<number | null>(null);

  useEffect(() => {
    const read = () => setPt(getBalance());
    read();
    window.addEventListener(POINTS_CHANGED, read);
    window.addEventListener('focus', read);
    return () => {
      window.removeEventListener(POINTS_CHANGED, read);
      window.removeEventListener('focus', read);
    };
  }, []);

  return (
    <span className="pt-badge">
      ✨ {pt === null ? '—' : pt} <small>pt</small>
    </span>
  );
}
