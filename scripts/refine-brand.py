"""Reproduce the path-only logo. Requires fonttools; not part of the site build.
The unmodified Manrope source font and its OFL are retained in review/brand-source.
"""
from pathlib import Path
import json
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

root = Path(__file__).resolve().parent.parent
font = instantiateVariableFont(TTFont(root / 'review/brand-source/Manrope.ttf'), {'wght': 650})
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
mark = '<path d="M3 34V6h6l10 11v9L9 15v19Z"/><path d="m21 17 10-11h6v28h-6V15L21 26Z"/>'

def outlined(text, x, baseline, size, color, tracking=0):
    scale = size / font['head'].unitsPerEm
    pen = SVGPathPen(glyphs)
    cursor = x
    for char in text:
        glyph = glyphs[cmap[ord(char)]]
        glyph.draw(TransformPen(pen, (scale, 0, 0, -scale, cursor, baseline)))
        cursor += glyph.width * scale + tracking
    # SVGPathPen emits contours only: no text or runtime font dependency.
    return f'<path fill="{color}" d="{pen.getCommands()}"/>', cursor - x - tracking

width = sum(glyphs[cmap[ord(c)]].width for c in 'Manolinq')
size = 158 / width * font['head'].unitsPerEm
bounds = []
for char in 'Manolinq':
    pen = BoundsPen(glyphs)
    glyphs[cmap[ord(char)]].draw(pen)
    bounds.append(pen.bounds)
min_y, max_y = min(b[1] for b in bounds), max(b[3] for b in bounds)
baseline = 20 + (min_y + max_y) * size / font['head'].unitsPerEm / 2
for name, color in [('logo-light', '#FFFFFF'), ('logo-primary', '#FFFFFF'), ('logo-dark', '#0B101B')]:
    word, _ = outlined('Manolinq', 53, baseline, size, color)
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="224" height="40" viewBox="0 0 224 40" role="img" aria-label="Manolinq"><title>Manolinq</title><g fill="#248BFF">{mark}</g>{word}</svg>\n'
    (root / f'public/brand/{name}.svg').write_text(svg, encoding='utf-8')
(root / 'public/brand/icon.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" role="img" aria-label="Manolinq"><title>Manolinq</title><g fill="#248BFF">{mark}</g></svg>\n', encoding='utf-8')
(root / 'public/brand/favicon.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="10" fill="#0B101B"/><g transform="translate(4 4)" fill="#248BFF">{mark}</g></svg>\n', encoding='utf-8')
# Keep the existing social-preview composition, with the same path-based identity.
word, _ = outlined('Manolinq', 53, baseline, size, '#FFFFFF')
og = '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#0B101B"/>'
og += f'<g transform="translate(80 70) scale(1.5)"><g fill="#248BFF">{mark}</g>{word}</g>'
for args in [('Sterk design.',80,290,70,'#FFFFFF'),('Persoonlijk ontwikkeld.',80,375,70,'#248BFF'),('Websites & AI-oplossingen',80,542,26,'#A9B9CC'),('manolinq.com',920,542,26,'#A9B9CC')]:
    og += outlined(*args)[0]
og += '<path d="M80 480H1120" stroke="#334155"/></svg>'
(root / 'review/brand-source/social-preview.svg').write_text(og,encoding='utf-8')
(root / 'review/brand-source/README.md').write_text('''# Vectorwoordmerk

Manrope, gewicht 650, omgezet naar SVG-contouren. Geen SVG bevat een `<text>`-element of verwijzing naar een geïnstalleerd lettertype. De M bestaat uit twee evenwichtige geometrische delen, gescheiden door een smalle verticale naad.

Bron: https://github.com/google/fonts/tree/main/ofl/manrope

Copyright 2018 The Manrope Project Authors. SIL Open Font License 1.1, zie OFL.txt. De bronfont is ongewijzigd behouden; de website laadt deze bronfont niet voor het logo.

Reproduceren: installeer Python fonttools en voer `python scripts/refine-brand.py` uit. Rasteriseer daarna `review/brand-source/social-preview.svg` naar `public/brand/social-preview.png` op 1200 × 630 pixels. Dit is alleen assetgereedschap; de productiebuild vereist geen Python.
''', encoding='utf-8')
print(json.dumps({'logo': [224,40], 'wordmark': 'Manrope 650, SVG paths', 'fontSize': round(size,2)}))
