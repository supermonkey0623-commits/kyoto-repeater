'use client';

// プロフィール。ポイント残高と、自分の投稿・読んだ投稿。
// 認証を作っていないため、すべてこの端末のブラウザに保存された記録。

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Photo from '@/components/Photo';
import { POSTS } from '@/lib/posts';
import {
  INITIAL_POINTS,
  getBalance,
  getReacted,
  getUnlocked,
  resetAll,
} from '@/lib/points';
import { UserPost, getUserPosts, removeUserPost } from '@/lib/userPosts';

export default function MePage() {
  const [balance, setBalance] = useState<number | null>(null);
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [reacted, setReacted] = useState<string[]>([]);
  const [mine, setMine] = useState<UserPost[]>([]);
  const [tab, setTab] = useState<'mine' | 'read'>('mine');

  const load = () => {
    setBalance(getBalance());
    setUnlocked(getUnlocked());
    setReacted(getReacted());
    setMine(getUserPosts());
  };

  useEffect(load, []);

  // 自分の投稿が受け取った「✨新しい」の数。
  // 他の人からの反応は、アカウントが無いので今は届かない（記録はこの端末のみ）。
  const received = mine.filter((p) => reacted.includes(p.id)).length;

  const readPosts = [...mine, ...POSTS].filter((p) => unlocked.includes(p.id));
  const list = tab === 'mine' ? mine : readPosts;

  return (
    <main>
      <h1 className="page-title">プロフィール</h1>
      <p className="page-lead">あなたの京都体験を、より豊かに。</p>

      <div className="profile">
        <div className="profile-row">
          <div className="avatar">京</div>
          <div style={{ flex: 1 }}>
            <div className="profile-name">ゲスト</div>
            <div className="hint">ログインなしで使えます</div>
          </div>
          <span className="pt-badge">
            ✨ {balance === null ? '—' : balance} <small>pt</small>
          </span>
        </div>

        <div className="stats stats-4">
          <div className="stat">
            <div className="stat-num">{mine.length}</div>
            <div className="stat-label">投稿</div>
          </div>
          <div className="stat">
            <div className="stat-num">{unlocked.length}</div>
            <div className="stat-label">読んだ</div>
          </div>
          <div className="stat">
            <div className="stat-num">{reacted.length}</div>
            <div className="stat-label">送った✨</div>
          </div>
          <div className="stat">
            <div className="stat-num">{received}</div>
            <div className="stat-label">もらった✨</div>
          </div>
        </div>
      </div>

      <div className="tabs">
        <button
          className="tab"
          data-selected={tab === 'mine'}
          onClick={() => setTab('mine')}
        >
          自分の投稿
        </button>
        <button
          className="tab"
          data-selected={tab === 'read'}
          onClick={() => setTab('read')}
        >
          読んだ投稿
        </button>
      </div>

      {list.length === 0 ? (
        <p className="empty">
          {tab === 'mine' ? (
            <>
              まだ投稿がありません。
              <br />
              <Link href="/new">投稿してみる →</Link>
            </>
          ) : (
            <>
              まだありません。
              <br />
              <Link href="/home">ホームを見る →</Link>
            </>
          )}
        </p>
      ) : (
        list.map((p) => {
          const isMine = tab === 'mine';
          const got = reacted.includes(p.id);
          return (
            <div key={p.id} className="mine-row">
              <Link href={`/post/${p.id}`} className="mine-link">
                <Photo
                  id={p.id}
                  hasPhoto={p.hasPhoto}
                  photoKind={p.photoKind}
                  src={(p as UserPost).photoDataUrl}
                  alt={p.title}
                />
                <div className="hit-body">
                  <span className="post-tag">{p.tag}</span>
                  <div className="post-title">{p.title}</div>
                  {isMine && (
                    <div className="reasons">
                      <span className="reason">✨ {got ? 1 : 0}</span>
                    </div>
                  )}
                </div>
              </Link>
              {isMine && (
                <button
                  className="btn-sm"
                  onClick={() => setMine(removeUserPost(p.id))}
                >
                  削除
                </button>
              )}
            </div>
          );
        })
      )}

      <button
        className="btn btn-ghost"
        onClick={() => {
          resetAll();
          load();
        }}
      >
        記録を消す（初期{INITIAL_POINTS}ptに戻す）
      </button>
    </main>
  );
}
