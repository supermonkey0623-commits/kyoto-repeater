// 線画アイコン。絵文字をUIに使わないための最小セット。
// currentColor を継承するので、色は使う側のCSSで決める。

type Props = {
  name: IconName;
  size?: number;
  /** 選択中など、線を少し太くしたいとき */
  strong?: boolean;
};

export type IconName =
  | 'home'
  | 'plus'
  | 'person'
  | 'search'
  | 'camera'
  | 'image'
  | 'pin'
  | 'spark'
  | 'bell'
  | 'note'
  | 'chevron'
  | 'back'
  | 'menu'
  | 'close'
  | 'external';

const PATHS: Record<IconName, React.ReactNode> = {
  home: <path d="M3 9.2 10 3.6l7 5.6V16a1 1 0 0 1-1 1h-3.6v-4.4H7.6V17H4a1 1 0 0 1-1-1V9.2Z" />,
  plus: <path d="M10 4.2v11.6M4.2 10h11.6" />,
  person: (
    <>
      <circle cx="10" cy="6.6" r="2.9" />
      <path d="M4 16.4c.7-2.9 3-4.5 6-4.5s5.3 1.6 6 4.5" />
    </>
  ),
  search: (
    <>
      <circle cx="9" cy="9" r="5.2" />
      <path d="m12.9 12.9 3.4 3.4" />
    </>
  ),
  camera: (
    <>
      <path d="M3 7.2h2.8l1.2-2h6l1.2 2H17v8.6H3V7.2Z" />
      <circle cx="10" cy="11.2" r="2.8" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="4.4" width="14" height="11.2" />
      <path d="m3 12.6 3.6-3.4 3 2.6 3.2-3.4L17 12" />
      <circle cx="7.2" cy="7.8" r="1.1" />
    </>
  ),
  pin: (
    <>
      <path d="M10 17s5-5.1 5-8.6a5 5 0 0 0-10 0C5 11.9 10 17 10 17Z" />
      <circle cx="10" cy="8.4" r="1.9" />
    </>
  ),
  spark: <path d="M10 3.4 11.5 8 16 9.5 11.5 11 10 15.6 8.5 11 4 9.5 8.5 8Z" />,
  bell: (
    <>
      <path d="M5.6 8.6a4.4 4.4 0 0 1 8.8 0c0 3.1.9 4.4 1.4 5H4.2c.5-.6 1.4-1.9 1.4-5Z" />
      <path d="M8.4 16.2a1.8 1.8 0 0 0 3.2 0" />
    </>
  ),
  note: (
    <>
      <path d="M4.6 3.6h10.8v12.8H4.6z" />
      <path d="M7.2 7.4h5.6M7.2 10.2h5.6M7.2 13h3.4" />
    </>
  ),
  chevron: <path d="m8 5.4 4.6 4.6L8 14.6" />,
  back: <path d="M12.4 5.4 7.8 10l4.6 4.6" />,
  menu: <path d="M4 6.2h12M4 10h12M4 13.8h12" />,
  close: <path d="m5.6 5.6 8.8 8.8M14.4 5.6l-8.8 8.8" />,
  external: (
    <>
      <path d="M11 4.4h4.6V9" />
      <path d="M15.6 4.4 9 11" />
      <path d="M14 11.4v4.2H4.4V6h4.2" />
    </>
  ),
};

const FILLED: IconName[] = ['spark'];

export default function Icon({ name, size = 20, strong = false }: Props) {
  const filled = FILLED.includes(name);
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={strong ? 1.7 : 1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
