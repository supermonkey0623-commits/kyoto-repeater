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
  alt,
  ratio = 'card',
}: {
  id: string;
  hasPhoto?: boolean;
  alt: string;
  ratio?: 'card' | 'wide';
}) {
  const className = ratio === 'wide' ? 'photo photo-wide' : 'photo';

  if (hasPhoto) {
    return (
      // next/image ではなく img を使う。写真は事前に縮小して置く運用のため、
      // 最適化サーバーを挟まないほうが会場の回線では速い。
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className={className}
        src={`/photos/${id}.jpg`}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
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
