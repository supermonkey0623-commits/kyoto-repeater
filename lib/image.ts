'use client';

// 選んだ写真を縮小してデータURLにする。
//
// 認証もサーバーも無いので、投稿写真はブラウザのlocalStorageに置く。
// 原寸のまま入れると数枚で容量上限に当たるため、必ず縮小してから保存する。

const MAX_EDGE = 900;
const QUALITY = 0.72;

export function fileToThumbnail(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      try {
        const scale = Math.min(1, MAX_EDGE / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(null);
        ctx.drawImage(img, 0, 0, w, h);

        resolve(canvas.toDataURL('image/jpeg', QUALITY));
      } catch {
        resolve(null);
      } finally {
        URL.revokeObjectURL(url);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };

    img.src = url;
  });
}
