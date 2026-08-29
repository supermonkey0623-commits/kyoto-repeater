'use client';

// ホーム: 投稿フィード。
// カードには人気の数字（いいね数）を出さない。人気順を否定するのがこのアプリの前提のため。
// 「知られていない」ことの証拠は、リスト先頭に1行だけ置く。

import { useEffect, useMemo, useState } from 'react';
import PostCard from '@/components/PostCard';
import PointBadge from '@/components/PointBadge';
import { CATEGORIES, CategoryId, FAMOUS_AVG, FAMOUS_AVG_COUNT } from '@/lib/data';
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

  const avgReviews = posts.length
    ? Math.round(posts.reduce((s, p) => s + p.reviewCount, 0) / posts.length)
    : 0;

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

      {/* 証拠はここに1回だけ。カードには出さない */}
      {posts.length > 0 && (
        <p className="evidence">
          この{posts.length}件は、定番観光地{FAMOUS_AVG_COUNT}か所の平均{' '}
          <strong>{FAMOUS_AVG.toLocaleString()}人</strong> に対して、
          平均 <strong>{avgReviews}人</strong> しか知りません。
        </p>
      )}

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
