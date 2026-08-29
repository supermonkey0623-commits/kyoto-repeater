'use client';

// ホーム: 投稿のサムネ一覧。
// サムネには人気の数字（いいね数）も場所も出さない。
// 場所は投稿を開いてから見せる（それがポイントを払って得られるもの）。

import Link from 'next/link';
import { useEffect, useState } from 'react';
import PostCard from '@/components/PostCard';
import PointBadge from '@/components/PointBadge';
import { IS_SAMPLE, POSTS } from '@/lib/posts';
import { UserPost, getUserPosts } from '@/lib/userPosts';

export default function HomePage() {
  const [mine, setMine] = useState<UserPost[]>([]);

  useEffect(() => {
    setMine(getUserPosts());
  }, []);

  // カテゴリの絞り込みはかんたん検索側に集約したので、ここでは全件を出す。
  // 自分の投稿は新しいので先頭に置く。
  const posts = [...mine, ...POSTS];

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



      {posts.length === 0 ? (
        <p className="empty">このカテゴリの投稿はまだありません。</p>
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))
      )}
    </main>
  );
}
