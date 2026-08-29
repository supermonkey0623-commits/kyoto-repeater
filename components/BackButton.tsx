'use client';

// 戻るボタン。
// アプリ内を通ってきたときだけ履歴を戻り、そうでなければ決めた画面へ送る。
// （直リンクや再読み込みで開いた画面で back() を呼ぶとアプリの外に出るため）

import { useRouter } from 'next/navigation';
import { hasInAppHistory } from '@/lib/nav';

type Props = {
  /** アプリ内の履歴が無いときの行き先 */
  fallback: string;
  label?: string;
};

export default function BackButton({ fallback, label = '← 戻る' }: Props) {
  const router = useRouter();

  return (
    <button
      className="back"
      onClick={() => {
        if (hasInAppHistory()) router.back();
        else router.push(fallback);
      }}
    >
      {label}
    </button>
  );
}
