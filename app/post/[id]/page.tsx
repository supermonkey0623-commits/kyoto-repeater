'use client';

// 投稿の詳細。ポイントを払って開く（noteの有料記事に近い体験）。
// タイトル・場所・写真までは無料で見せ、本文だけを閉じる。
// 何を買うのか分からない状態で払わせないため。

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import BackButton from '@/components/BackButton';
import Photo from '@/components/Photo';
import PointBadge from '@/components/PointBadge';
import { Post, getPost } from '@/lib/posts';
import {
  addRemoteReaction,
  canDeletePost,
  deleteRemotePost,
  fetchRemotePost,
  isMyPost,
} from '@/lib/remotePosts';
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

  const [isMine, setIsMine] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    let alive = true;
    const mine = isMyPost(params.id);
    setIsMine(mine);
    setCanDelete(canDeletePost(params.id));
    setBalance(getBalance());
    setReacted(getReacted());

    const seed = getPost(params.id);
    if (seed) {
      setPost(seed);
      setOpen(isUnlocked(seed.id));
      setReady(true);
      return;
    }
    // 種データに無ければ共有DBから引く
    fetchRemotePost(params.id).then((found) => {
      if (!alive) return;
      setPost(found ?? undefined);
      // 自分の投稿にポイントは要らない。書いた本人が買うのはおかしい
      if (found) setOpen(mine || isUnlocked(found.id));
      setReady(true);
    });
    return () => {
      alive = false;
    };
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
    // 押した本人にポイントは入らない。入るのは投稿者
    const res = react(post.id);
    setReacted(res.reacted);

    // 共有DBのカウントも増やす
    addRemoteReaction(post.id);

  };

  const handleDelete = async () => {
    if (!window.confirm('この投稿を消します。元に戻せません。よろしいですか？')) return;
    setDeleting(true);
    setDeleteError('');
    const ok = await deleteRemotePost(post.id);
    if (ok) {
      router.push('/me');
      return;
    }
    setDeleting(false);
    setDeleteError('削除できませんでした。通信環境を確認してください。');
  };

  const hasReacted = reacted.includes(post.id);

  return (
    <main>
      <div className="detail-head">
        <BackButton fallback="/home" />
        <PointBadge />
      </div>

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

          {/* 自分の投稿には押せない。自分で自分に送るのはおかしい */}
          {isMine ? (
            <>
              <p className="hint" style={{ textAlign: 'center' }}>
                あなたの投稿です。読んだ人が「役に立った」を送ると1ptが入ります。
              </p>
              {canDelete && (
                <button
                  className="btn btn-ghost danger"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? '削除しています…' : 'この投稿を削除する'}
                </button>
              )}
              {deleteError && (
                <p className="hint" style={{ textAlign: 'center', color: 'var(--danger)' }}>
                  {deleteError}
                </p>
              )}
            </>
          ) : (
            <>
              <button
                className="btn"
                onClick={handleReact}
                disabled={hasReacted}
                style={hasReacted ? { background: '#b9bcd0' } : undefined}
              >
                {hasReacted ? '✨ 「役に立った」を送りました' : '✨ 役に立った'}
              </button>
              <p className="hint" style={{ textAlign: 'center' }}>
                行ってみたいと思えたら押してください。投稿者に1ptが入ります。
              </p>
            </>
          )}
        </>
      ) : (
        <>
          {/* 本文を途中まで見せて断ち切る。続きがあることを文章そのもので伝える */}
          <p className="paywall-preview">{post.body}</p>

          <div className="paywall">
            <p className="paywall-lead">
              この続きは <strong>{post.costPt}pt</strong> で読めます
            </p>
            <button className="btn" onClick={handleUnlock}>
              {post.costPt}pt を使って読む
            </button>
            {shortfall && (
              <p className="hint" style={{ color: 'var(--danger)' }}>
                ポイントが足りません。自分の投稿が「役に立った」と言われると貯まります。
              </p>
            )}
            <p className="hint">残高 {balance === null ? '—' : balance}pt</p>
          </div>
        </>
      )}

    </main>
  );
}
