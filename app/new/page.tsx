'use client';

// 投稿する。現状はモック（保存されない）。
// 実データはチームが撮った写真を lib/posts.ts に入れる運用で回す。

import { useState } from 'react';
import Link from 'next/link';
import PointBadge from '@/components/PointBadge';
import { CATEGORIES, CategoryId } from '@/lib/data';

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [place, setPlace] = useState('');
  const [body, setBody] = useState('');
  const [categories, setCategories] = useState<CategoryId[]>([]);
  const [done, setDone] = useState(false);

  const toggle = (id: CategoryId) =>
    setCategories((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const canSubmit =
    title.trim() !== '' && place.trim() !== '' && body.trim() !== '';

  if (done) {
    return (
      <main>
        <div className="notice">
          投稿を受け付けました（※モック動作。まだ保存されません）
        </div>
        <h1 className="page-title">{title}</h1>
        <p className="post-area">📍 {place}</p>
        <p className="detail-body">{body}</p>
        <Link href="/home" className="btn">
          ホームに戻る
        </Link>
        <button
          className="btn btn-ghost"
          onClick={() => {
            setTitle('');
            setPlace('');
            setBody('');
            setCategories([]);
            setDone(false);
          }}
        >
          続けて投稿する
        </button>
      </main>
    );
  }

  return (
    <main>
      <div className="detail-head">
        <div>
          <h1 className="page-title">投稿する</h1>
          <p className="page-lead">あなただけの、とっておきの京都をシェアしよう。</p>
        </div>
        <PointBadge />
      </div>

      <div className="dummy-banner">
        モック動作中。送信しても保存されません。
      </div>

      <div className="upload">
        <div className="upload-plus">＋</div>
        <div className="upload-label">写真を追加</div>
        <div className="hint">タップして写真を選択（最大10枚）</div>
      </div>

      <div className="field">
        <div className="field-label">タイトル</div>
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="例：静かな路地裏の古民家カフェ"
        />
      </div>

      <div className="field">
        <div className="field-label">場所</div>
        <input
          className="input"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="例：京都市左京区岡崎周辺"
        />
      </div>

      <div className="field">
        <div className="field-label">ひとこと</div>
        <textarea
          className="textarea"
          maxLength={140}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="例：地元の人しか知らない落ち着ける空間でした。"
        />
        <p className="hint" style={{ textAlign: 'right' }}>
          {body.length}/140
        </p>
      </div>

      <div className="field">
        <div className="field-label">カテゴリー（複数選択可）</div>
        <div className="options">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              className="option"
              data-selected={categories.includes(c.id)}
              onClick={() => toggle(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <button className="btn" disabled={!canSubmit} onClick={() => setDone(true)}>
        投稿する
      </button>
    </main>
  );
}
