'use client';

// プロフィール・設定。ポイント残高と、保存／読んだ投稿の一覧。
// 認証を作っていないため、すべてこの端末のブラウザに保存された記録。

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { POSTS } from '@/lib/posts';
import {
  INITIAL_POINTS,
  getBalance,
  getReacted,
  getSaved,
  getUnlocked,
  resetAll,
} from '@/lib/points';

export default function MePage() {
  const [balance, setBalance] = useState<number | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [reacted, setReacted] = useState<string[]>([]);
  const [tab, setTab] = useState<'saved' | 'read'>('saved');

  const load = () => {
    setBalance(getBalance());
    setSaved(getSaved());
    setUnlocked(getUnlocked());
    setReacted(getReacted());
  };

  useEffect(load, []);

  const list = POSTS.filter((p) =>
    (tab === 'saved' ? saved : unlocked).includes(p.id)
  );

  return (
    <main>
      <h1 className="page-title">プロフィール・設定</h1>
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

        <div className="stats">
          <div className="stat">
            <div className="stat-num">{unlocked.length}</div>
            <div className="stat-label">読んだ</div>
          </div>
          <div className="stat">
            <div className="stat-num">{saved.length}</div>
            <div className="stat-label">保存</div>
          </div>
          <div className="stat">
            <div className="stat-num">{reacted.length}</div>
            <div className="stat-label">✨を送った</div>
          </div>
        </div>
      </div>

      <div className="tabs">
        <button
          className="tab"
          data-selected={tab === 'saved'}
          onClick={() => setTab('saved')}
        >
          保存した投稿
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
          まだありません。
          <br />
          <Link href="/home">ホームを見る →</Link>
        </p>
      ) : (
        list.map((p) => (
          <Link key={p.id} href={`/post/${p.id}`} className="mini">
            <span className="post-tag">{p.tag}</span>
            <div className="mini-title">{p.title}</div>
            <div className="hint">📍 {p.area}</div>
          </Link>
        ))
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
