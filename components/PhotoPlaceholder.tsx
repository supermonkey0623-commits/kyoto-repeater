// 写真の仮置き。チームが撮った実写に差し替えるまでの繋ぎ。
//
// 「写真（未実装）」のようなラベルは出さない。作りかけに見えて完成度を落とすため。
// タグ名からグラデーションを決めるので、フィードが単調にならない。

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

export default function PhotoPlaceholder({
  seed,
  ratio = 'card',
}: {
  seed: string;
  ratio?: 'card' | 'wide';
}) {
  const [from, to] = PALETTES[hashOf(seed) % PALETTES.length];
  return (
    <div
      className={ratio === 'wide' ? 'photo photo-wide' : 'photo'}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      aria-hidden="true"
    />
  );
}
