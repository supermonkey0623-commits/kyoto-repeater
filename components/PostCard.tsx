'use client';

import Link from 'next/link';
import PhotoPlaceholder from './PhotoPlaceholder';
import type { Post } from '@/lib/posts';

type Props = {
  post: Post;
  saved: boolean;
  unlocked: boolean;
  onToggleSave: (id: string) => void;
};

export default function PostCard({ post, saved, unlocked, onToggleSave }: Props) {
  return (
    <article className="post-card">
      <Link href={`/post/${post.id}`} className="post-link">
        <PhotoPlaceholder seed={post.id} />
        <div className="post-body">
          <span className="post-tag">{post.tag}</span>
          <h3 className="post-title">{post.title}</h3>
          <p className="post-area">📍 {post.area}</p>
          <p className="post-excerpt">
            {unlocked ? post.body : post.body.slice(0, 28) + '…'}
          </p>
        </div>
      </Link>

      <div className="post-foot">
        {unlocked ? (
          <span className="post-open">読んだ</span>
        ) : (
          <span className="post-cost">{post.costPt}pt で読む</span>
        )}
        <button
          className="post-save"
          aria-label={saved ? '保存を外す' : '保存する'}
          onClick={() => onToggleSave(post.id)}
        >
          {saved ? '🔖' : '📑'}
        </button>
      </div>
    </article>
  );
}
