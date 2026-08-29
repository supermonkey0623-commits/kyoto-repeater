'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// 検索は作らないため、代わりに「保存」を置く。
const ITEMS = [
  { href: '/home', icon: '⌂', label: 'ホーム' },
  { href: '/new', icon: '＋', label: '投稿' },
  { href: '/saved', icon: '🔖', label: '保存' },
  { href: '/me', icon: '☺', label: 'プロフィール' },
];

export default function BottomNav() {
  const pathname = usePathname();

  // オンボーディング（比較画面）ではナビを出さない
  if (pathname === '/') return null;

  return (
    <nav className="nav">
      {ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          data-active={pathname.startsWith(item.href)}
        >
          <span className="nav-icon">{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
