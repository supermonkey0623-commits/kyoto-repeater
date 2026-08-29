'use client';

// 「戻る」の行き先を安全にするための記録。
//
// router.back() は、その画面をアプリ内の遷移で開いたときしか正しく動かない。
// 共有リンクを直接開いた・再読み込みした場合、履歴の1つ前はアプリの外にあり、
// 戻るボタンを押すとアプリから出てしまう。
// アプリ内で1回でも遷移したかを覚えておき、押したときの行き先を切り替える。

let lastPath: string | null = null;
let navigated = false;

/**
 * 表示中の画面を記録する。
 * 同じ画面で2回呼ばれても遷移とは数えないので、
 * React の開発モードで effect が二度走っても誤判定しない。
 */
export function trackPath(path: string): void {
  if (lastPath === path) return;
  if (lastPath !== null) navigated = true;
  lastPath = path;
}

export function hasInAppHistory(): boolean {
  return navigated;
}
