'use client';

// 投稿の詳細。ポイントを払って開く（noteの有料記事に近い体験）。
// タイトル・場所・写真までは無料で見せ、本文だけを閉じる。
// 何を買うのか分からない状態で払わせないため。

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Photo from '@/components/Photo';
import PointBadge from '@/components/PointBadge';
import { FAMOUS_AVG, FAMOUS_AVG_COUNT } from '@/lib/data';
import { getPost } from '@/lib/posts';
import {
  getBalance,
  getReacted,
  getSaved,
  isUnlocked,
  react,
  toggleSaved,
  unlock,
} from '@/lib/points';

export default function PostDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const post = getPost(params.id);

  const [open, setOpen] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [reacted, setReacted] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [shortfall, setShortfall] = useState(false);

  useEffect(() => {
    if (!post) return;
    setOpen(isUnlocked(post.id));
    setBalance(getBalance());
    setReacted(getReacted());
    setSaved(getSaved());
  }, [post]);

  if (!post) {
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
  };

  const hasReacted = reacted.includes(post.id);
  const isSaved = saved.includes(post.id);

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
      <p className="post-area">📍 {post.area}</p>

      <Photo
        id={post.id}
        hasPhoto={post.hasPhoto}
        photoKind={post.photoKind}
        alt={post.title}
        ratio="wide"
      />

      {open ? (
        <>
          <p className="detail-body">{post.body}</p>

          {/* 払った理由をここで回収する */}
          <div className="contrast">
            この場所を知っているのは {post.reviewCount}人
            <strong>
              定番観光地{FAMOUS_AVG_COUNT}か所の平均は{' '}
              {FAMOUS_AVG.toLocaleString()}人
            </strong>
          </div>

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
            行き方・時間帯・実際に行った人の言葉が書かれています。
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

      <button
        className="btn btn-ghost"
        onClick={() => setSaved(toggleSaved(post.id))}
      >
        {isSaved ? '🔖 保存済み（外す）' : '📑 保存する'}
      </button>
    </main>
  );
}
