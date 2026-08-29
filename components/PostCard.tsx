'use client';

import Link from 'next/link';
import Photo from './Photo';
import type { Post } from '@/lib/posts';

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  return (
    <article className="post-card">
      <Link href={`/post/${post.id}`} className="post-link">
        <Photo
          id={post.id}
          hasPhoto={post.hasPhoto}
          photoKind={post.photoKind}
          src={post.photoDataUrl}
          alt={post.title}
        />
        <div className="post-body">
          <span className="post-tag">{post.tag}</span>
          <h3 className="post-title">{post.title}</h3>
          {/* サムネには場所を出さない。場所は投稿を開いてから見せる */}
          <p className="post-excerpt">
            {post.body.slice(0, 28) + '…'}
          </p>
        </div>
      </Link>
    </article>
  );
}
