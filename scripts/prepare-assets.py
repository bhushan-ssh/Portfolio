"""Optional setup: python -m pip install pillow pypdfium2; python scripts/prepare-assets.py.
Original images/PDFs are preserved; optimized assets are committed for normal builds.
"""
from pathlib import Path
from io import BytesIO
import time
import sys
from PIL import Image, ImageOps, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'

def save_asset(image, path, **options):
    # Avoid truncating an asset while a local preview server is reading it.
    buffer = BytesIO()
    image.save(buffer, format={'.webp': 'WEBP', '.ico': 'ICO'}.get(path.suffix, 'PNG'), **options)
    payload = buffer.getvalue()
    if path.exists() and path.read_bytes() == payload:
        return
    temporary = path.with_suffix(path.suffix + '.tmp')
    temporary.write_bytes(payload)
    for attempt in range(10):
        try:
            temporary.replace(path)
            return
        except OSError:
            if attempt == 9:
                raise
            time.sleep(0.1)

for source in [PUBLIC / 'profile.jpg', *(PUBLIC / 'projects').glob('*.png'), *(PUBLIC / 'projects').glob('*.jpg')]:
    image = ImageOps.exif_transpose(Image.open(source)).convert('RGB')
    image.thumbnail((960, 1440) if source.name == 'profile.jpg' else (1440, 900))
    save_asset(image, source.with_suffix('.webp'), quality=85, method=6)
    if source.name != 'profile.jpg':
        for width in [480, 640]:
            thumbnail = image.resize((width, round(width * image.height / image.width)), Image.Resampling.LANCZOS)
            save_asset(thumbnail, source.with_name(f'{source.stem}-{width}.webp'), quality=80, method=6)

portrait = ImageOps.exif_transpose(Image.open(PUBLIC / 'profile.jpg')).convert('RGB')
for width in [400, 600, 800]:
    cropped = ImageOps.fit(portrait, (width, width * 5 // 4), centering=(0.5, 0.38))
    save_asset(cropped, PUBLIC / f'profile-{width}.webp', quality=55, method=6)

if '--images-only' in sys.argv:
    sys.exit(0)

import pypdfium2 as pdfium

thumbs = PUBLIC / 'certs' / 'thumbs'
thumbs.mkdir(exist_ok=True)
for source in (PUBLIC / 'certs').glob('*.pdf'):
    document = pdfium.PdfDocument(source)
    image = document[0].render(scale=1).to_pil().convert('RGB')
    if source.stem.startswith(('hackverse-', 'spark-', 'techfusion-', 'technofest-')):
        image = image.rotate(90, expand=True)
    image.thumbnail((640, 450))
    save_asset(image, thumbs / f'{source.stem}.webp', quality=78, method=6)
    if image.width > 320:
        image.thumbnail((320, 450))
        save_asset(image, thumbs / f'{source.stem}-320.webp', quality=78, method=6)
    document.close()

# A simple typographic social card, not a fabricated project screenshot.
card = Image.new('RGB', (1200, 630), '#f7f9f5')
draw = ImageDraw.Draw(card)
font_path = Path('C:/Windows/Fonts/seguisb.ttf')
if not font_path.exists():
    font_path = Path('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf')
def font(size):
    return ImageFont.truetype(str(font_path), size) if font_path.exists() else ImageFont.load_default(size=size)
draw.text((70, 80), 'bhushan.', fill='#527653', font=font(28))
draw.text((70, 210), 'Bhushan\nSonawane.', fill='#252a23', font=font(70), spacing=2)
draw.text((74, 430), 'Full-Stack Developer\n& Data Science Student', fill='#527653', font=font(28), spacing=10)
photo = ImageOps.fit(Image.open(PUBLIC / 'profile.jpg'), (350, 470), centering=(0.5, 0.38))
card.paste(photo, (780, 80))
save_asset(card, PUBLIC / 'og-image.png', optimize=True)
for size, name in [(32, 'favicon-32.png'), (180, 'apple-touch-icon.png'), (192, 'icon-192.png'), (512, 'icon-512.png')]:
    icon = Image.new('RGB', (size, size), '#527653')
    d = ImageDraw.Draw(icon)
    d.text((size * .2, size * .02), 'b', font=font(int(size * .78)), fill='white')
    save_asset(icon, PUBLIC / name)
save_asset(icon, PUBLIC / 'favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)])
print('Prepared WebP images, 21 certificate thumbnails, social card, and icons.')
