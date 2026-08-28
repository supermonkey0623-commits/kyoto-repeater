import type { Metadata, Viewport } from 'next';
import BottomNav from '@/components/BottomNav';
import './globals.css';

export const metadata: Metadata = {
  title: '京都リピーター向け発見アプリ（仮）',
  description:
    '有名じゃない順に並べる、京都リピーターのための発見アプリ。関西ビギナーズハッカソン vol.8',
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
        <div className="shell">{children}</div>
        <BottomNav />
      </body>
    </html>
  );
}
