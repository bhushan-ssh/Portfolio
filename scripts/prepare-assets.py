"""Optional setup: python -m pip install pillow pypdfium2; python scripts/prepare-assets.py.
Original images/PDFs are preserved; optimized assets are committed for normal builds.
"""
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont
import pypdfium2 as pdfium

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
for source in [PUBLIC / 'profile.jpg', *(PUBLIC / 'projects').glob('*.png')]:
    image = ImageOps.exif_transpose(Image.open(source)).convert('RGB')
    image.thumbnail((960, 1440) if source.name == 'profile.jpg' else (1440, 900))
    image.save(source.with_suffix('.webp'), quality=85, method=6)

thumbs = PUBLIC / 'certs' / 'thumbs'
thumbs.mkdir(exist_ok=True)
for source in (PUBLIC / 'certs').glob('*.pdf'):
    document = pdfium.PdfDocument(source)
    image = document[0].render(scale=1).to_pil().convert('RGB')
    if source.stem.startswith(('hackverse-', 'spark-', 'techfusion-', 'technofest-')):
        image = image.rotate(90, expand=True)
    image.thumbnail((640, 450))
    image.save(thumbs / f'{source.stem}.webp', quality=78, method=6)
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
card.save(PUBLIC / 'og-image.png', optimize=True)
for size, name in [(32, 'favicon-32.png'), (180, 'apple-touch-icon.png')]:
    icon = Image.new('RGB', (size, size), '#527653')
    d = ImageDraw.Draw(icon)
    d.text((size * .2, size * .02), 'b', font=font(int(size * .78)), fill='white')
    icon.save(PUBLIC / name)
print('Prepared WebP images, 21 certificate thumbnails, social card, and icons.')
