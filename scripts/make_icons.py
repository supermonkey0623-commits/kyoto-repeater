# アプリアイコンの生成。
#
# 「よ」一文字。日本語のアプリらしく、32pxまで縮めても読める形を優先した。
# 図形（道・ピン）も試したが、小さくすると警告マークや染みに見えたため採用しなかった。
#
# 端末側でマスクがかかるもの（iOSのホーム画面・Androidのmaskable）は
# 角を丸めず全面ベタで書き出す。自前で丸めると二重に切られるため。
#
# 実行: python scripts/make_icons.py

from PIL import Image, ImageDraw, ImageFont

BLUE, BLUE_DARK = (76, 110, 245), (54, 81, 201)
FONT = r'C:\Windows\Fonts\NotoSansJP-Bold.ttf'
CHAR = 'よ'
SS = 4  # 拡大して描いてから縮小する（縁を滑らかにするため）


def icon(size: int, rx_ratio: float = 0.22, char_ratio: float = 0.56) -> Image.Image:
    n = size * SS
    img = Image.new('RGBA', (n, n), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    # 上から下へのグラデーション
    for y in range(n):
        t = y / (n - 1)
        c = tuple(int(BLUE[i] + (BLUE_DARK[i] - BLUE[i]) * t) for i in range(3))
        d.line([(0, y), (n, y)], fill=c + (255,))

    if rx_ratio > 0:
        mask = Image.new('L', (n, n), 0)
        ImageDraw.Draw(mask).rounded_rectangle(
            [0, 0, n - 1, n - 1], radius=int(n * rx_ratio), fill=255)
        img.putalpha(mask)

    f = ImageFont.truetype(FONT, int(n * char_ratio))
    l, t, r, b = d.textbbox((0, 0), CHAR, font=f)
    # 文字の実寸で中央に置く（フォントの余白を無視して光学的に合わせる）
    d.text(((n - (r - l)) / 2 - l, (n - (b - t)) / 2 - t), CHAR,
           font=f, fill=(255, 255, 255, 255))

    return img.resize((size, size), Image.LANCZOS)


# 端末が丸めるもの: 角丸なし・文字は少し小さく（マスクで欠けないように）
icon(180, rx_ratio=0, char_ratio=0.54).save('app/apple-icon.png')
icon(512, rx_ratio=0, char_ratio=0.46).save('public/icon-maskable-512.png')

# 自前で丸めるもの
icon(192).save('public/icon-192.png')
icon(512).save('public/icon-512.png')
icon(64).save('app/icon.png')  # タブのファビコン（高解像度ぶん）

# 確認用
icon(256).save('scripts/preview-256.png')
icon(48).save('scripts/preview-48.png')
icon(32).save('scripts/preview-32.png')
print('done')
