'use client';

// 通知。実際に起きた出来事だけを出す。
// 他ユーザーからの反応はアカウント連携が要るため、まだ届かない。それも画面に書く。

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon, { IconName } from '@/components/Icon';
import {
  AppNotification,
  clearNotifications,
  getNotifications,
  markAllRead,
  relativeTime,
} from '@/lib/notifications';

const ICON: Record<string, IconName> = {
  reaction: 'spark',
  posted: 'note',
  points: 'spark',
};

export default function NotificationsPage() {
  const router = useRouter();
  const [list, setList] = useState<AppNotification[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setList(getNotifications());
    setReady(true);
    // 開いた時点で既読にする
    const t = setTimeout(() => markAllRead(), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <main>
      <div className="detail-head">
        <button className="back" onClick={() => router.back()}>
          ← 戻る
        </button>
        {list.length > 0 && (
          <button
            className="back"
            onClick={() => setList(clearNotifications())}
          >
            すべて消す
          </button>
        )}
      </div>

      <h1 className="page-title">通知</h1>
      <p className="page-lead">この端末で起きたことが並びます</p>

      {!ready ? null : list.length === 0 ? (
        <p className="empty">
          まだ通知はありません。
          <br />
          投稿したり、「役に立った」を受け取るとここに届きます。
        </p>
      ) : (
        list.map((n) => {
          const inner = (
            <>
              <span className="noti-icon">
                <Icon name={ICON[n.kind] ?? 'note'} size={17} />
              </span>
              <span className="noti-body">
                <span className="noti-title">{n.title}</span>
                {n.body && <span className="noti-text">{n.body}</span>}
                <span className="noti-time">{relativeTime(n.createdAt)}</span>
              </span>
              {!n.read && <span className="noti-dot" aria-label="未読" />}
            </>
          );
          return n.postId ? (
            <Link key={n.id} href={`/post/${n.postId}`} className="noti">
              {inner}
            </Link>
          ) : (
            <div key={n.id} className="noti">
              {inner}
            </div>
          );
        })
      )}

      <div className="note" style={{ marginTop: 22 }}>
        <span className="note-label">まだ届かない通知について</span>
        <p>
          他の人があなたの投稿に「役に立った」を送ったときの通知は、
          アカウント連携を入れたあとに届くようになります。
          いまはログインなしで使える設計のため、通知はこの端末の記録だけです。
        </p>
      </div>
    </main>
  );
}
