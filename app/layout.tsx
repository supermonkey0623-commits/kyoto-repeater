import type { Metadata, Viewport } from 'next';
import BottomNav from '@/components/BottomNav';
import SwipeTabs from '@/components/SwipeTabs';
import './globals.css';

export const metadata: Metadata = {
  title: 'よりみち',
  description:
    '定番を回り尽くした人へ。写真で出会って、まだ知らない京都へ寄り道する。',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        {/* ボトムナビはドラッグ対象の外に出す。
            transform された祖先の中では position:fixed が効かなくなるため */}
        <SwipeTabs>
          <div className="shell">{children}</div>
        </SwipeTabs>
        <BottomNav />
      </body>
    </html>
  );
}
