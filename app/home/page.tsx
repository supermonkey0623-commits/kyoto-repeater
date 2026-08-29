'use client';

// ホーム: 投稿のサムネ一覧。
// サムネには人気の数字（いいね数）も場所も出さない。
// 場所は投稿を開いてから見せる（それがポイントを払って得られるもの）。

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import PostCard from '@/components/PostCard';
import PointBadge from '@/components/PointBadge';
import { CATEGORIES, CategoryId } from '@/lib/data';
import { IS_SAMPLE, POSTS } from '@/lib/posts';
import { getSaved, getUnlocked, toggleSaved } from '@/lib/points';

export default function HomePage() {
  const [category, setCategory] = useState<CategoryId | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [unlocked, setUnlocked] = useState<string[]>([]);

  useEffect(() => {
    setSaved(getSaved());
    setUnlocked(getUnlocked());
  }, []);

  const posts = useMemo(
    () =>
      category ? POSTS.filter((p) => p.categories.includes(category)) : POSTS,
    [category]
  );

  return (
    <main>
      {IS_SAMPLE && (
        <div className="dummy-banner">
          サンプル投稿で表示中。実際の写真と投稿に差し替え予定です。
        </div>
      )}

      <header className="home-head">
        <div>
          <h1 className="page-title">まだ知らない京都</h1>
          <p className="page-lead">有名じゃない順に並んでいます</p>
        </div>
        <PointBadge />
      </header>

      {/* 上のタグ行はかんたん検索の入口。条件を選んで提案を受け取る */}
      <Link href="/search" className="search-entry">
        <span className="search-icon">🔍</span>
        <span className="search-text">気分・天気・空き時間から探す</span>
        <span className="search-go">›</span>
      </Link>

      <div className="chips">
        <button
          className="chip"
          data-selected={category === null}
          onClick={() => setCategory(null)}
        >
          すべて
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            className="chip"
            data-selected={category === c.id}
            onClick={() => setCategory(category === c.id ? null : c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>


      {posts.length === 0 ? (
        <p className="empty">このカテゴリの投稿はまだありません。</p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            saved={saved.includes(post.id)}
            unlocked={unlocked.includes(post.id)}
            onToggleSave={(id) => setSaved(toggleSaved(id))}
          />
        ))
      )}
    </main>
  );
}
