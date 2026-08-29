import type { MetadataRoute } from 'next';

// ホーム画面に追加したときの見え方。
// アイコンは maskable と通常で分けている（端末が丸めるものは自前で丸めない）。
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'よりみち',
    short_name: 'よりみち',
    description:
      '定番を回り尽くした人へ。写真で出会って、まだ知らない京都へ寄り道する。',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      {
        src: '/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
