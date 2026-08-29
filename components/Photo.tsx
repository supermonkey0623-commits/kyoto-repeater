// 投稿の写真。
//
// public/photos/<id>.jpg があればそれを表示し、無ければグラデーションで埋める。
// 写真は1枚ずつ差し替えられる（全部揃うまで待つ必要がない）。
//
// 写真がある投稿は lib/posts.ts の hasPhoto を true にする。

const PALETTES: [string, string][] = [
  ['#e8d5c4', '#c9a88a'],
  ['#d6e0d8', '#a8bfae'],
  ['#e5dced', '#bda9cf'],
  ['#f0dcd2', '#d4a898'],
  ['#d8e2ec', '#a3b8cc'],
  ['#ece0cd', '#cbb389'],
];

function hashOf(text: string): number {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0;
  return h;
}

export default function Photo({
  id,
  hasPhoto,
  photoKind,
  alt,
  ratio = 'card',
  src,
}: {
  id: string;
  hasPhoto?: boolean;
  photoKind?: 'ai' | 'real';
  alt: string;
  ratio?: 'card' | 'wide';
  /** ユーザー投稿の写真（データURL）。指定時はこちらを優先する */
  src?: string;
}) {
  const className = ratio === 'wide' ? 'photo photo-wide' : 'photo';

  if (src) {
    return (
      <span className={ratio === 'wide' ? 'photo-slot wide' : 'photo-slot'}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={className} src={src} alt={alt} decoding="async" />
      </span>
    );
  }

  if (hasPhoto) {
    return (
      <span className={ratio === 'wide' ? 'photo-slot wide' : 'photo-slot'}>
        {/* next/image ではなく img を使う。写真は事前に縮小して置く運用のため、
            最適化サーバーを挟まないほうが会場の回線では速い。 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={className}
          src={`/photos/${id}.jpg`}
          alt={photoKind === 'ai' ? `${alt}（イメージ画像）` : alt}
          loading="lazy"
          decoding="async"
        />
        {/* 実写に差し替えたら photoKind を 'real' にする。
            変え忘れてもこのバッジが残るので、実写だと誤解される事故は起きない */}
        {photoKind === 'ai' && <span className="ai-badge">イメージ</span>}
      </span>
    );
  }

  const [from, to] = PALETTES[hashOf(id) % PALETTES.length];
  return (
    <div
      className={className}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      aria-hidden="true"
    />
  );
}
