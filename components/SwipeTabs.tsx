'use client';

// 左右スワイプでボトムメニューを切り替える。
//
// 指追従の要点:
// - 行き先がある方向は制約を大きく取り、指と 1:1 で画面が動く
// - 行き先がない端だけ 0 で止め、ゴムのように少し伸びて戻る
// - 離したら、閾値を超えていれば送り出し、足りなければバネで戻す
//
// dragElastic は「制約を越えた分の追従率」。
// 制約を 0 にしたまま elastic を下げると全体の動きが鈍り、指から離れて感じる。

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { animate, motion, useMotionValue, useReducedMotion } from 'motion/react';
import { trackPath } from '@/lib/nav';

/** ボトムメニューと同じ並び。左へ引くと次、右へ引くと前 */
export const TAB_ORDER = ['/home', '/new', '/me'] as const;

const DISTANCE = 55; // px。これを超えたら切り替え
const VELOCITY = 350; // px/s。速く弾いた場合は距離が足りなくても切り替え

// 画面が切り替わらなかったときに元へ戻すまでの待ち時間。
// 送り出す動き(0.15s)より十分長く、待たされたと感じるより短い
const RECOVER_MS = 450;

const SPRING = { type: 'spring', stiffness: 560, damping: 44, mass: 0.6 } as const;

export default function SwipeTabs({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const [width, setWidth] = useState(430);
  const enterFrom = useRef(0);

  // 送り出してから次の画面が来るまでの間、次のスワイプを受け付けない。
  // 同じ行き先へ二重に push すると pathname が変わらず、
  // 画面を押し出したまま戻す処理が走らない（＝白い画面のまま止まる）
  const navigating = useRef(false);
  const recover = useRef<number | null>(null);

  useEffect(() => {
    const measure = () => setWidth(window.innerWidth);
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const index = TAB_ORDER.indexOf(pathname as (typeof TAB_ORDER)[number]);
  const isTab = index !== -1;

  // 画面が変わったら、出ていった方向の反対側から滑り込ませる
  useEffect(() => {
    // 遷移が届いたので、送り出しの見張りは解除する
    navigating.current = false;
    if (recover.current !== null) {
      window.clearTimeout(recover.current);
      recover.current = null;
    }

    // アプリ内を通ったことを覚えておく（戻るボタンの行き先の判定に使う）
    trackPath(pathname);

    if (!isTab) return;

    const from = enterFrom.current;
    enterFrom.current = 0;

    // 走っている動きがあれば止める。ボトムメニューを
    // 押した直後にスワイプの戻りが残っていると画面が二重に動く
    x.stop();

    if (from === 0) {
      x.set(0);
      return;
    }
    x.set(from);
    const controls = animate(x, 0, SPRING);
    return () => controls.stop();
  }, [pathname, isTab, x]);

  // タブ以外（検索・投稿詳細）ではドラッグさせない。戻る操作と競合するため
  if (!isTab || reduced) return <>{children}</>;

  const canPrev = index > 0;
  const canNext = index < TAB_ORDER.length - 1;

  const go = (delta: number) => {
    if (navigating.current) return;
    const next = index + delta;
    if (next < 0 || next >= TAB_ORDER.length) return;

    navigating.current = true;
    enterFrom.current = delta > 0 ? width : -width;
    animate(x, delta > 0 ? -width : width, {
      type: 'tween',
      duration: 0.15,
      ease: 'easeOut',
    });
    router.push(TAB_ORDER[next]);

    // 画面が来なければ押し出したままにせず、元の位置へ戻す。
    // 回線が遅いときに白い画面で固まるのを防ぐ
    recover.current = window.setTimeout(() => {
      if (!navigating.current) return;
      navigating.current = false;
      recover.current = null;
      enterFrom.current = 0;
      animate(x, 0, SPRING);
    }, RECOVER_MS);
  };

  return (
    <motion.div
      style={{ x, touchAction: 'pan-y' }}
      drag="x"
      dragDirectionLock
      // 行ける方向は画面幅まで許可＝指と1:1。行けない端は 0 で止める
      dragConstraints={{
        left: canNext ? -width : 0,
        right: canPrev ? width : 0,
      }}
      // 制約を越えた分（＝端）だけゴムにする
      dragElastic={0.12}
      dragMomentum={false}
      onDragEnd={(_, info) => {
        const far = Math.abs(info.offset.x) > DISTANCE;
        const fast = Math.abs(info.velocity.x) > VELOCITY;
        if ((far || fast) && info.offset.x < 0 && canNext) return go(1);
        if ((far || fast) && info.offset.x > 0 && canPrev) return go(-1);
        animate(x, 0, SPRING); // 足りなければ戻す
      }}
    >
      {children}
    </motion.div>
  );
}
