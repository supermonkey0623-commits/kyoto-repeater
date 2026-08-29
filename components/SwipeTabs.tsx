'use client';

// 左右スワイプでボトムメニューを切り替える。指の動きに画面が追従する。
//
// 挙動:
// - ドラッグ中は指に吸い付いて画面が動く
// - 閾値を超える／速く弾くと、その方向へ送り出して次のタブへ
// - 足りなければゴムのように元へ戻る
// - 端（最初・最後のタブ）では抵抗を強くして、行き止まりを手で分からせる
//
// 制約: ルートを分けたままなので、ドラッグ中に隣の画面は覗けない。
//       3画面を横に並べるにはルート構造の作り直しが必要。

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
} from 'motion/react';

/** ボトムメニューと同じ並び。左へ引くと次、右へ引くと前 */
export const TAB_ORDER = ['/home', '/new', '/me'] as const;

const DISTANCE = 70; // px。これを超えたら切り替え
const VELOCITY = 480; // px/s。速く弾いた場合は距離が足りなくても切り替え

const SPRING = { type: 'spring', stiffness: 420, damping: 38, mass: 0.7 } as const;

export default function SwipeTabs({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const x = useMotionValue(0);

  // 切り替え方向。入場アニメーションをどちらから始めるかに使う
  const [dir, setDir] = useState(0);

  const index = TAB_ORDER.indexOf(pathname as (typeof TAB_ORDER)[number]);
  const isTab = index !== -1;
  const canPrev = isTab && index > 0;
  const canNext = isTab && index < TAB_ORDER.length - 1;

  // 画面が変わったら位置をリセットしておく（前の画面のずれを持ち越さない）
  useEffect(() => {
    x.set(0);
  }, [pathname, x]);

  // タブ以外（検索・投稿詳細）ではドラッグさせない。戻る操作と競合するため
  if (!isTab || reduced) return <>{children}</>;

  const go = (delta: number) => {
    const next = index + delta;
    if (next < 0 || next >= TAB_ORDER.length) return;
    setDir(delta);
    router.push(TAB_ORDER[next]);
  };

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={pathname}
        style={{ x, touchAction: 'pan-y' }}
        drag="x"
        dragDirectionLock
        dragConstraints={{ left: 0, right: 0 }}
        // 行き先がない方向は抵抗を強くして、端であることを指に返す
        dragElastic={{
          left: canNext ? 0.55 : 0.06,
          right: canPrev ? 0.55 : 0.06,
          top: 0,
          bottom: 0,
        }}
        dragMomentum={false}
        onDragEnd={(_, info) => {
          const far = Math.abs(info.offset.x) > DISTANCE;
          const fast = Math.abs(info.velocity.x) > VELOCITY;
          if (!far && !fast) return; // 足りなければ元へ戻る（constraintsが戻す）
          if (info.offset.x < 0 && canNext) go(1);
          else if (info.offset.x > 0 && canPrev) go(-1);
        }}
        initial={{ x: dir === 0 ? 0 : dir > 0 ? 220 : -220, opacity: dir === 0 ? 1 : 0.4 }}
        animate={{ x: 0, opacity: 1 }}
        transition={SPRING}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
