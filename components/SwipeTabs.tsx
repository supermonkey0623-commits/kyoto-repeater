'use client';

// 左右スワイプでボトムメニューを切り替える。
//
// 注意点:
// - 縦スクロールを邪魔しないよう、横方向がはっきり優勢なときだけ反応する
// - 横スクロールする要素（チップ列など）の上から始まったスワイプは無視する
// - タブ以外の画面（検索・投稿詳細）では無効。戻る操作と競合するため

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

/** ボトムメニューと同じ並び。左スワイプで次、右スワイプで前へ */
export const TAB_ORDER = ['/home', '/new', '/me'] as const;

const MIN_DISTANCE = 60; // px。これ未満はタップのぶれとみなす
const RATIO = 1.5; // 横が縦の1.5倍を超えたら横スワイプ
const MAX_DURATION = 700; // ms

function startedOnScrollable(target: EventTarget | null): boolean {
  // target は要素とは限らない（window / document / テキストノード）。
  // getComputedStyle に要素以外を渡すと例外になるので必ず絞り込む。
  let el = target instanceof Element ? (target as HTMLElement) : null;
  try {
    while (el && el !== document.body) {
      const style = window.getComputedStyle(el);
      if (
        (style.overflowX === 'auto' || style.overflowX === 'scroll') &&
        el.scrollWidth > el.clientWidth
      ) {
        return true;
      }
      el = el.parentElement;
    }
  } catch {
    // 判定できないときはスワイプを許可する（機能が死ぬより良い）
    return false;
  }
  return false;
}

export default function SwipeTabs({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const start = useRef<{ x: number; y: number; t: number; skip: boolean } | null>(null);

  useEffect(() => {
    const index = TAB_ORDER.indexOf(pathname as (typeof TAB_ORDER)[number]);
    if (index === -1) return; // タブ以外の画面では無効

    const onStart = (e: TouchEvent) => {
      const t = e.touches[0];
      start.current = {
        x: t.clientX,
        y: t.clientY,
        t: Date.now(),
        skip: startedOnScrollable(e.target),
      };
    };

    const onEnd = (e: TouchEvent) => {
      const s = start.current;
      start.current = null;
      if (!s || s.skip) return;

      const t = e.changedTouches[0];
      const dx = t.clientX - s.x;
      const dy = t.clientY - s.y;

      if (Date.now() - s.t > MAX_DURATION) return;
      if (Math.abs(dx) < MIN_DISTANCE) return;
      if (Math.abs(dx) < Math.abs(dy) * RATIO) return;

      const next = dx < 0 ? index + 1 : index - 1;
      if (next < 0 || next >= TAB_ORDER.length) return;
      router.push(TAB_ORDER[next]);
    };

    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend', onEnd);
    };
  }, [pathname, router]);

  return <>{children}</>;
}
