'use client';

// ホーム: 投稿のサムネ一覧。
// サムネには人気の数字（いいね数）も場所も出さない。
// 場所は投稿を開いてから見せる（それがポイントを払って得られるもの）。

import Link from 'next/link';
import { useEffect, useState } from 'react';
import PostCard from '@/components/PostCard';
import PointBadge from '@/components/PointBadge';
import { IS_SAMPLE, POSTS } from '@/lib/posts';
import { RemotePost, fetchRemotePosts, getMyPostIds } from '@/lib/remotePosts';
import { getUnlocked } from '@/lib/points';

export default function HomePage() {
  const [remote, setRemote] = useState<RemotePost[]>([]);
  const [loading, setLoading] = useState(true);

  // みんなの投稿を共有DBから読む。取れなくても種データだけで動く。
  useEffect(() => {
    let alive = true;
    fetchRemotePosts().then((list) => {
      if (!alive) return;
      setRemote(list);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, []);

  // おすすめには、自分の投稿と読み終わった投稿を出さない。
  // 知らない場所に出会う場所なので、既に知っているものが並ぶと意味が薄れる。
  const [excluded, setExcluded] = useState<Set<string>>(new Set());

  useEffect(() => {
    setExcluded(new Set([...getMyPostIds(), ...getUnlocked()]));
  }, []);

  const posts = [...remote, ...POSTS].filter((p) => !excluded.has(p.id));

  return (
    <main>
      {IS_SAMPLE && (
        <div className="dummy-banner">
          サンプル投稿で表示中。実際の写真と投稿に差し替え予定です。
        </div>
      )}

      <header className="home-head">
        <div>
          <h1 className="page-title">よりみち</h1>
        </div>
        <PointBadge />
      </header>

      {/* 上のタグ行はかんたん検索の入口。条件を選んで提案を受け取る */}
      <Link href="/search" className="search-entry">
        <span className="search-icon">🔍</span>
        <span className="search-text">気分・天気・空き時間から探す</span>
        <span className="search-go">›</span>
      </Link>



      {loading && remote.length === 0 && (
        <p className="hint" style={{ marginBottom: 12 }}>
          みんなの投稿を読み込んでいます…
        </p>
      )}

      {posts.length === 0 ? (
        <p className="empty">まだ投稿がありません。</p>
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))
      )}
    </main>
  );
}
