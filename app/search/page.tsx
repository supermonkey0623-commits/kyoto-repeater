'use client';

// かんたん検索。条件をタップで選ぶと、条件に合う順に提案が並ぶ。
// 詳細は lib/suggest.ts（ANDで絞らずスコアで並べる理由もそこに書いてある）。

import { useMemo, useState } from 'react';
import Link from 'next/link';
import PointBadge from '@/components/PointBadge';
import { CATEGORIES, CategoryId } from '@/lib/data';
import { POSTS } from '@/lib/posts';
import {
  Conditions,
  EMPTY_CONDITIONS,
  countChosen,
  isEmpty,
  suggest,
} from '@/lib/suggest';
import Photo from '@/components/Photo';

type Row<T> = { label: string; options: { value: T; label: string }[] };

const WHO: Row<'solo' | 'pair' | 'group'> = {
  label: '誰と',
  options: [
    { value: 'solo', label: 'ひとり' },
    { value: 'pair', label: 'ふたり' },
    { value: 'group', label: 'グループ' },
  ],
};

const WEATHER: Row<'sunny' | 'rain'> = {
  label: '天気',
  options: [
    { value: 'sunny', label: '晴れ' },
    { value: 'rain', label: '雨' },
  ],
};

const TIME: Row<'morning' | 'day' | 'night'> = {
  label: '時間帯',
  options: [
    { value: 'morning', label: '朝' },
    { value: 'day', label: '日中' },
    { value: 'night', label: '夜' },
  ],
};

const FREE: Row<number> = {
  label: '空き時間',
  options: [
    { value: 30, label: '30分' },
    { value: 60, label: '1時間' },
    { value: 120, label: '半日' },
  ],
};

const BUDGET: Row<0 | 1 | 2> = {
  label: '予算',
  options: [
    { value: 0, label: 'かけない' },
    { value: 1, label: '〜1000円' },
    { value: 2, label: 'こだわらない' },
  ],
};

export default function SearchPage() {
  const [c, setC] = useState<Conditions>(EMPTY_CONDITIONS);
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof Conditions>(key: K, value: Conditions[K]) =>
    setC((prev) => ({ ...prev, [key]: prev[key] === value ? null : value }));

  const results = useMemo(() => suggest(POSTS, c, 5), [c]);
  const chosen = countChosen(c);

  return (
    <main>
      <header className="home-head">
        <div>
          <h1 className="page-title">かんたん検索</h1>
          <p className="page-lead">選ぶほど、合うものが上に来ます</p>
        </div>
        <PointBadge />
      </header>

      <div className="field">
        <div className="field-label">キーワード</div>
        <input
          className="input"
          type="search"
          value={c.keyword}
          onChange={(e) => setC((prev) => ({ ...prev, keyword: e.target.value }))}
          placeholder="例：苔　古本　朝　嵐山"
        />
        <p className="hint">空白で区切ると複数の言葉で探せます</p>
      </div>

      <div className="field">
        <div className="field-label">気分・趣味</div>
        <div className="options">
          {CATEGORIES.map((o) => (
            <button
              key={o.id}
              className="option"
              data-selected={c.mood === o.id}
              onClick={() => set('mood', o.id as CategoryId)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {([WHO, WEATHER, TIME, FREE, BUDGET] as Row<never>[]).map((row, i) => {
        const key = (['who', 'weather', 'timeOfDay', 'freeMinutes', 'budget'] as const)[i];
        return (
          <div className="field" key={row.label}>
            <div className="field-label">{row.label}</div>
            <div className="options">
              {row.options.map((o) => (
                <button
                  key={String(o.value)}
                  className="option"
                  data-selected={c[key] === (o.value as never)}
                  onClick={() => set(key, o.value as never)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        );
      })}

      <button className="btn" onClick={() => setSubmitted(true)}>
        {chosen === 0 ? '条件なしで見る' : `${chosen}つの条件で探す`}
      </button>

      {submitted && (
        <section style={{ marginTop: 26 }}>
          <h2 className="page-title">
            {isEmpty(c) ? '新着の投稿' : '条件に合う順に5件'}
          </h2>
          <p className="page-lead">
            場所は開いてから分かります
          </p>

          {results.map(({ post, score, reasons }) => (
            <Link key={post.id} href={`/post/${post.id}`} className="hit">
              <Photo
                id={post.id}
                hasPhoto={post.hasPhoto}
                photoKind={post.photoKind}
                alt={post.title}
              />
              <div className="hit-body">
                <span className="post-tag">{post.tag}</span>
                <div className="post-title">{post.title}</div>
                {reasons.length > 0 && (
                  <div className="reasons">
                    {reasons.map((r) => (
                      <span className="reason" key={r}>
                        {r}
                      </span>
                    ))}
                  </div>
                )}
                {score <= 0 && !isEmpty(c) && (
                  <div className="hint">条件には合いませんが、近い候補です</div>
                )}
              </div>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}
