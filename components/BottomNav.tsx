'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// ボトムメニューは「提案」「気になる」の2つのみ。
// 投稿メニューは廃止（消費ログに置き換え / 要件定義書 §4.4）。
const ITEMS = [
  { href: '/suggest', icon: '◎', label: '提案' },
  { href: '/saved', icon: '♡', label: '気になる' },
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
