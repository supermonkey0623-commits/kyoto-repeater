'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon, { IconName } from './Icon';

// 3タブ。低く、静かに、現在地だけ分かる。
// 選択中を丸や面で囲まない。色と線の太さだけで示す。
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
            <Icon name={item.icon} size={21} strong={active} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
