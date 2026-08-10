"""Generate a 16:9 Google Business Profile cover photo from og-image.png.

Crops to 16:9 centered on the image, upscales if needed to meet Google's
minimum recommended size (1080x608), and saves as a high-quality JPEG.
Does not modify the source file.
"""

import os
from PIL import Image

SRC = os.path.join("public", "assets", "og-image.png")
DST = os.path.join("public", "assets", "gbp-cover-photo.jpg")

TARGET_RATIO = 16 / 9
MIN_WIDTH, MIN_HEIGHT = 1080, 608
JPEG_QUALITY = 88

im = Image.open(SRC).convert("RGB")
w, h = im.size
current_ratio = w / h

if current_ratio > TARGET_RATIO:
    # Wider than 16:9: crop width, keep height, center horizontally.
    new_w = round(h * TARGET_RATIO)
    x0 = (w - new_w) // 2
    box = (x0, 0, x0 + new_w, h)
elif current_ratio < TARGET_RATIO:
    # Taller than 16:9: crop height, keep width, center vertically.
    new_h = round(w / TARGET_RATIO)
    y0 = (h - new_h) // 2
    box = (0, y0, w, y0 + new_h)
else:
    box = (0, 0, w, h)

cropped = im.crop(box)

cw, ch = cropped.size
if cw < MIN_WIDTH or ch < MIN_HEIGHT:
    scale = max(MIN_WIDTH / cw, MIN_HEIGHT / ch)
    new_size = (round(cw * scale), round(ch * scale))
    cropped = cropped.resize(new_size, Image.LANCZOS)

cropped.save(DST, "JPEG", quality=JPEG_QUALITY, optimize=True)

out_w, out_h = cropped.size
file_size = os.path.getsize(DST)
print(f"Saved: {DST}")
print(f"Dimensions: {out_w}x{out_h} (ratio {out_w/out_h:.4f}, target 1.7778)")
print(f"File size: {file_size / 1024:.1f} KB")
