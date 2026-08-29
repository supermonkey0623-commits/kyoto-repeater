# 提出用サムネイルの生成。
# アイコンと同じ青、実際にアプリで使っている写真を素材にする。
# 一覧に小さく並ぶ前提なので、アプリ名が最優先で読めることを狙う。
#
# 実行: python scripts/make_thumb.py

from PIL import Image, ImageDraw, ImageFilter

W, H = 1200, 675
BLUE, BLUE_DARK = (76, 110, 245), (54, 81, 201)
BOLD = r'C:\Windows\Fonts\NotoSansJP-Bold.ttf'
REG = r'C:\Windows\Fonts\YuGothR.ttc'
PHOTO = 'public/photos/p03.jpg'

NAME = 'よりみち'
LEAD = '定番を回り尽くした人の、次の京都'
SUB = '口コミの少ない順に並ぶ、京都の寄り道アプリ'


def font(path, size, index=0):
    from PIL import ImageFont
    return ImageFont.truetype(path, size, index=index)


def cover(im, w, h):
    """比率を保ったまま切り抜いて w x h に収める"""
    r = max(w / im.width, h / im.height)
    im = im.resize((max(1, int(im.width * r)), max(1, int(im.height * r))), Image.LANCZOS)
    l, t = (im.width - w) // 2, (im.height - h) // 2
    return im.crop((l, t, l + w, t + h))


def gradient(w, h, top, bottom):
    g = Image.new('RGB', (w, h))
    d = ImageDraw.Draw(g)
    for y in range(h):
        t = y / max(1, h - 1)
        d.line([(0, y), (w, y)],
               fill=tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3)))
    return g


def app_icon(size):
    ic = Image.open('public/icon-512.png').convert('RGBA')
    return ic.resize((size, size), Image.LANCZOS)


def draw_texts(d, x, y, name_px, lead_px, sub_px, on_dark=True):
    white = (255, 255, 255, 255)
    soft = (255, 255, 255, 224) if on_dark else (60, 60, 60, 255)
    f_name, f_lead, f_sub = font(BOLD, name_px), font(BOLD, lead_px), font(REG, sub_px)
    d.text((x, y), NAME, font=f_name, fill=white)
    y += int(name_px * 1.32)
    d.text((x, y), LEAD, font=f_lead, fill=soft)
    y += int(lead_px * 1.75)
    d.text((x, y), SUB, font=f_sub, fill=soft)


def text_block(d, x, y, name_px, lead_px, sub_px):
    """アイコンの下に3行。描いた高さを返す"""
    from PIL import ImageFont
    white, soft = (255, 255, 255, 255), (255, 255, 255, 226)
    f_name, f_lead, f_sub = font(BOLD, name_px), font(BOLD, lead_px), font(REG, sub_px)
    y0 = y
    d.text((x, y), NAME, font=f_name, fill=white)
    y += int(name_px * 1.26)
    d.text((x, y), LEAD, font=f_lead, fill=soft)
    y += int(lead_px * 1.72)
    d.text((x, y), SUB, font=f_sub, fill=soft)
    return int(name_px * 1.26) + int(lead_px * 1.72) + int(sub_px * 1.4)


def block_height(name_px, lead_px, sub_px, icon_px, gap):
    return icon_px + gap + int(name_px * 1.26) + int(lead_px * 1.72) + int(sub_px * 1.4)


# ---- 案A: 左に青パネル、右に写真。中身は縦中央に置く ----
def variant_a():
    img = Image.new('RGBA', (W, H))
    split = int(W * 0.52)
    img.paste(gradient(split, H, BLUE, BLUE_DARK), (0, 0))
    img.paste(cover(Image.open(PHOTO).convert('RGB'), W - split, H), (split, 0))

    pad, icon_px, gap = 76, 96, 40
    name_px, lead_px, sub_px = 100, 31, 24
    total = block_height(name_px, lead_px, sub_px, icon_px, gap)
    top = (H - total) // 2

    img.alpha_composite(app_icon(icon_px), (pad, top))
    text_block(ImageDraw.Draw(img), pad, top + icon_px + gap, name_px, lead_px, sub_px)
    return img.convert('RGB')


# ---- 案C: 写真を上に敷き、下の青帯に名前を横並びで置く ----
def variant_c():
    img = Image.new('RGBA', (W, H))
    photo_h = int(H * 0.58)
    img.paste(cover(Image.open(PHOTO).convert('RGB'), W, photo_h), (0, 0))
    img.paste(gradient(W, H - photo_h, BLUE, BLUE_DARK), (0, photo_h))

    d = ImageDraw.Draw(img)
    band_top, band_h = photo_h, H - photo_h
    pad, icon_px = 60, 112
    img.alpha_composite(app_icon(icon_px), (pad, band_top + (band_h - icon_px) // 2))

    x = pad + icon_px + 36
    name_px, lead_px, sub_px = 74, 29, 23
    total = int(name_px * 1.22) + int(lead_px * 1.7) + int(sub_px * 1.4)
    y = band_top + (band_h - total) // 2
    f_name, f_lead, f_sub = font(BOLD, name_px), font(BOLD, lead_px), font(REG, sub_px)
    d.text((x, y), NAME, font=f_name, fill=(255, 255, 255, 255))
    y += int(name_px * 1.22)
    d.text((x, y), LEAD, font=f_lead, fill=(255, 255, 255, 230))
    y += int(lead_px * 1.7)
    d.text((x, y), SUB, font=f_sub, fill=(255, 255, 255, 220))
    return img.convert('RGB')


# ---- 案D: 写真を使わない版（写真の権利が不明なときはこちら） ----
def variant_d():
    img = gradient(W, H, BLUE, BLUE_DARK).convert('RGBA')
    d = ImageDraw.Draw(img)
    icon_px, gap = 128, 44
    name_px, lead_px, sub_px = 104, 33, 25
    total = block_height(name_px, lead_px, sub_px, icon_px, gap)
    top = (H - total) // 2

    f_name = font(BOLD, name_px)
    name_w = d.textbbox((0, 0), NAME, font=f_name)[2]
    x = (W - name_w) // 2

    img.alpha_composite(app_icon(icon_px), ((W - icon_px) // 2, top))
    y = top + icon_px + gap
    d.text((x, y), NAME, font=f_name, fill=(255, 255, 255, 255))
    y += int(name_px * 1.26)
    for text, px, alpha in ((LEAD, lead_px, 230), (SUB, sub_px, 218)):
        f = font(BOLD if px == lead_px else REG, px)
        w = d.textbbox((0, 0), text, font=f)[2]
        d.text(((W - w) // 2, y), text, font=f, fill=(255, 255, 255, alpha))
        y += int(px * 1.72)
    return img.convert('RGB')


a, c = variant_a(), variant_c()
variant_d().save('thumbnail-nophoto.png')
a.save('scripts/thumb-a.png')
c.save('scripts/thumb-c.png')
sheet = Image.new('RGB', (W, H * 2 + 24), (255, 255, 255))
sheet.paste(a, (0, 0)); sheet.paste(c, (0, H + 24))
sheet.resize((W // 2, (H * 2 + 24) // 2), Image.LANCZOS).save('scripts/thumb-compare.png')

# 提出用。JPEGでも出しておく（フォームはJPEG/PNGどちらも可）
c.save('thumbnail.png')
c.convert('RGB').save('thumbnail.jpg', quality=92, optimize=True)
a.save('thumbnail-alt.png')
print('ok')
