'use client';

// 投稿の詳細。ポイントを払って開く（noteの有料記事に近い体験）。
// タイトル・場所・写真までは無料で見せ、本文だけを閉じる。
// 何を買うのか分からない状態で払わせないため。

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Photo from '@/components/Photo';
import PointBadge from '@/components/PointBadge';
import { Post, getPost } from '@/lib/posts';
import { getUserPosts } from '@/lib/userPosts';
import { notify } from '@/lib/notifications';
import { getSettings } from '@/lib/settings';
import {
  getBalance,
  getReacted,
  isUnlocked,
  react,
  unlock,
} from '@/lib/points';

export default function PostDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  // 自分の投稿は localStorage にあるので、初期表示では見つからない。
  // 描画後に探し直す。
  const [post, setPost] = useState<Post | undefined>(() => getPost(params.id));
  const [ready, setReady] = useState(false);

  const [open, setOpen] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [reacted, setReacted] = useState<string[]>([]);
  const [shortfall, setShortfall] = useState(false);

  useEffect(() => {
    const found =
      getPost(params.id) ?? getUserPosts().find((p) => p.id === params.id);
    setPost(found);
    setReady(true);
    if (!found) return;
    setOpen(isUnlocked(found.id));
    setBalance(getBalance());
    setReacted(getReacted());
  }, [params.id]);

  if (!post) {
    if (!ready) return <main />;
    return (
      <main>
        <p className="empty">投稿が見つかりませんでした。</p>
        <Link href="/home" className="btn">
          ホームに戻る
        </Link>
      </main>
    );
  }

  const handleUnlock = () => {
    const res = unlock(post.id, post.costPt);
    setBalance(res.balance);
    if (res.ok) {
      setOpen(true);
      setShortfall(false);
    } else {
      setShortfall(true);
    }
  };

  const handleReact = () => {
    const res = react(post.id);
    setBalance(res.balance);
    setReacted(res.reacted);

    // 自分の投稿に反応が付いたら通知する。
    // 他人からの反応はアカウントが要るので、いまはこの端末で起きた分だけ。
    const isMine = getUserPosts().some((p) => p.id === post.id);
    if (isMine && getSettings().notifyReaction) {
      notify({
        kind: 'reaction',
        title: '「✨新しい」が届きました',
        body: post.title,
        postId: post.id,
      });
    }
  };

  const hasReacted = reacted.includes(post.id);

  return (
    <main>
      <div className="detail-head">
        <button className="back" onClick={() => router.back()}>
          ← 戻る
        </button>
        <PointBadge />
      </div>

      <span className="post-tag">{post.tag}</span>
      <h1 className="detail-title">{post.title}</h1>

      <Photo
        id={post.id}
        hasPhoto={post.hasPhoto}
        photoKind={post.photoKind}
        src={post.photoDataUrl}
        alt={post.title}
        ratio="wide"
      />

      {open ? (
        <>
          {/* ポイントを払って得られるものの中心が「正確な場所」。
              サムネには出さず、開いたときだけ見せる */}
          <div className="place">
            <div className="place-label">場所</div>
            {post.place ? (
              <>
                <div className="place-name">{post.place}</div>
                <a
                  className="map-link"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    post.mapQuery ?? post.place
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Googleマップで開く ↗
                </a>
              </>
            ) : (
              <div className="hint">場所は準備中です。</div>
            )}
          </div>

          <p className="detail-body">{post.body}</p>

          <button
            className="btn"
            onClick={handleReact}
            disabled={hasReacted}
            style={hasReacted ? { background: '#b9bcd0' } : undefined}
          >
            {hasReacted ? '✨ 「新しい」を送りました（+1pt）' : '✨ 新しい（+1pt）'}
          </button>
          <p className="hint" style={{ textAlign: 'center' }}>
            知らなかった場所だと感じたら押してください。投稿者にポイントが入ります。
          </p>
        </>
      ) : (
        <div className="paywall">
          <p className="paywall-lead">
            この続きは <strong>{post.costPt}pt</strong> で読めます
          </p>
          <p className="hint">
            正確な場所（Googleマップつき）と、実際に行った人の言葉が読めます。
          </p>
          <button className="btn" onClick={handleUnlock}>
            {post.costPt}pt を使って読む
          </button>
          {shortfall && (
            <p className="hint" style={{ color: '#b34' }}>
              ポイントが足りません。他の投稿に「✨新しい」を送ると貯まります。
            </p>
          )}
          <p className="hint">残高 {balance === null ? '—' : balance}pt</p>
        </div>
      )}

    </main>
  );
}
