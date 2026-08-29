'use client';

// 保存した投稿の一覧。

import { useEffect, useState } from 'react';
import Link from 'next/link';
import PostCard from '@/components/PostCard';
import { POSTS } from '@/lib/posts';
import { getSaved, getUnlocked, toggleSaved } from '@/lib/points';

export default function SavedPage() {
  const [saved, setSaved] = useState<string[]>([]);
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSaved(getSaved());
    setUnlocked(getUnlocked());
    setReady(true);
  }, []);

  const list = POSTS.filter((p) => saved.includes(p.id));

  return (
    <main>
      <h1 className="page-title">保存した投稿</h1>
      <p className="page-lead">{list.length}件</p>

      {!ready ? null : list.length === 0 ? (
        <p className="empty">
          まだありません。
          <br />
          気になる投稿の 📑 を押すとここに溜まります。
          <br />
          <br />
          <Link href="/home">ホームを見る →</Link>
        </p>
      ) : (
        list.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            saved
            unlocked={unlocked.includes(post.id)}
            onToggleSave={(id) => setSaved(toggleSaved(id))}
          />
        ))
      )}
    </main>
  );
}
