'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon, { IconName } from './Icon';

// ボトムメニューは3つ。
// 絵文字（⌂/＋/☺）を線画SVGに置き換えた。それ以外の見た目・配色は元のまま。
const ITEMS: { href: string; icon: IconName; label: string }[] = [
  { href: '/home', icon: 'home', label: 'ホーム' },
  { href: '/new', icon: 'plus', label: '投稿' },
  { href: '/me', icon: 'person', label: 'プロフィール' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="nav">
      {ITEMS.map((item) => {
        const active = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} data-active={active}>
            <span className="nav-icon">
              <Icon name={item.icon} size={22} strong={active} />
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
