'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// ボトムメニューは3つ。
// 保存した投稿はプロフィール内のタブから見られるので、ここには置かない。
const ITEMS = [
  { href: '/home', icon: '⌂', label: 'ホーム' },
  { href: '/new', icon: '＋', label: '投稿' },
  { href: '/me', icon: '☺', label: 'プロフィール' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="nav">
      {ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          data-active={pathname === item.href}
        >
          <span className="nav-icon">{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
