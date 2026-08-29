'use client';

// プロフィール。ポイント残高と、自分の投稿・読んだ投稿。
// 認証を作っていないため、すべてこの端末のブラウザに保存された記録。

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Photo from '@/components/Photo';
import { POSTS } from '@/lib/posts';
import {
  INITIAL_POINTS,
  creditFromReactions,
  getBalance,
  getReacted,
  getUnlocked,
  resetAll,
} from '@/lib/points';
import { RemotePost, fetchRemotePosts, getMyPostIds } from '@/lib/remotePosts';
import { getUnreadCount, notify } from '@/lib/notifications';
import { DEFAULT_SETTINGS, Settings, getSettings } from '@/lib/settings';

export default function MePage() {
  const [balance, setBalance] = useState<number | null>(null);
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [reacted, setReacted] = useState<string[]>([]);
  const [mine, setMine] = useState<RemotePost[]>([]);
  const [allRemote, setAllRemote] = useState<RemotePost[]>([]);
  const [tab, setTab] = useState<'mine' | 'read'>('mine');
  const [menuOpen, setMenuOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  const load = () => {
    setBalance(getBalance());
    setUnlocked(getUnlocked());
    setReacted(getReacted());
    setUnread(getUnreadCount());
    setSettings(getSettings());
  };

  useEffect(() => {
    load();
    // 自分の投稿も共有DBから引く（端末に覚えたIDで絞る）
    fetchRemotePosts().then((list) => {
      setAllRemote(list);
      const ids = getMyPostIds();
      const my = list.filter((p) => ids.includes(p.id));
      setMine(my);

      // 自分の投稿に付いた反応を、まだ換算していない分だけポイントにする
      const { gained, balance: next } = creditFromReactions(my);
      setBalance(next);
      if (gained > 0) {
        notify({
          kind: 'points',
          title: `${gained}pt 受け取りました`,
          body: '自分の投稿が「役に立った」と言われました',
        });
        setUnread(getUnreadCount());
      }
    });
  }, []);

  // 自分の投稿が受け取った「✨新しい」の数。
  // 他の人からの反応は、アカウントが無いので今は届かない（記録はこの端末のみ）。
  const received = mine.reduce((sum, p) => sum + (p.reactions ?? 0), 0);

  // 「読んだ投稿」に自分の投稿は含めない。自分で書いたものを読んだとは言わない。
  const myIds = new Set(mine.map((p) => p.id));
  const readPosts = [...allRemote, ...POSTS].filter(
    (p) => unlocked.includes(p.id) && !myIds.has(p.id)
  );

  const list = tab === 'mine' ? mine : readPosts;

  return (
    <main>
      <div className="me-head">
        <div>
          <h1 className="page-title">プロフィール</h1>
          <p className="page-lead">あなたの京都体験を、より豊かに。</p>
        </div>

        <div className="menu-wrap">
          <button
            className="hamburger"
            aria-label="メニュー"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {menuOpen && (
            <>
              <div className="menu-backdrop" onClick={() => setMenuOpen(false)} />
              <div className="menu" role="menu">
                <Link className="menu-item" role="menuitem" href="/settings">
                  アカウント設定
                </Link>
                <Link className="menu-item" role="menuitem" href="/notifications">
                  通知
                  {unread > 0 && <span className="menu-badge">{unread}</span>}
                </Link>
                <Link className="menu-item" role="menuitem" href="/help">
                  ヘルプ
                </Link>
                <button className="menu-item menu-danger" role="menuitem" disabled>
                  ログアウト
                </button>
                <p className="menu-note">
                  ログインなしで使えるため、ログアウトはありません。
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="profile">
        <div className="profile-row">
          <div className="avatar">京</div>
          <div style={{ flex: 1 }}>
            <div className="profile-name">{settings.displayName || 'ゲスト'}</div>
            <div className="hint">ログインなしで使えます</div>
          </div>
          <span className="pt-badge">
            ✨ {balance === null ? '—' : balance} <small>pt</small>
          </span>
        </div>

        <div className="stats">
          <div className="stat">
            <div className="stat-num">{mine.length}</div>
            <div className="stat-label">投稿</div>
          </div>
          <div className="stat">
            <div className="stat-num">{readPosts.length}</div>
            <div className="stat-label">読んだ</div>
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
          return (
            <div key={p.id} className="mine-row">
              <Link href={`/post/${p.id}`} className="mine-link">
                <Photo
                  id={p.id}
                  hasPhoto={p.hasPhoto}
                  photoKind={p.photoKind}
                  src={(p as RemotePost).photoDataUrl}
                  alt={p.title}
                />
                <div className="hit-body">
                  <span className="post-tag">{p.tag}</span>
                  <div className="post-title">{p.title}</div>
                  {isMine && (
                    <div className="reasons">
                      <span className="reason">✨ {(p as RemotePost).reactions ?? 0}</span>
                    </div>
                  )}
                </div>
              </Link>

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
