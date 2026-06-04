# Generates tasteful on-brand SVG placeholder images for the beauty template.
# Run once: python _gen_placeholders.py   (output committed to repo)
import os

OUT = os.path.dirname(os.path.abspath(__file__))

# Soft, premium duotone palettes (top, bottom). Warm beauty tones.
PALETTES = [
    ("#caa39b", "#7E3E3A"),  # rose / clay
    ("#d8c9a3", "#9c7b3f"),  # champagne / gold
    ("#b9a7a9", "#5f4a4d"),  # mauve / plum
    ("#c9b3a0", "#6e5240"),  # nude / mocha
    ("#cdb0a6", "#88514a"),  # blush / terracotta
    ("#bdb0ad", "#4f4441"),  # warm grey / espresso
]

ICONS = {
    "scissors": '<circle cx="32" cy="64" r="9"/><circle cx="32" cy="36" r="9"/><path d="M40 58 76 34M40 42 76 66"/>',
    "polish":   '<path d="M44 22h12v10H44zM42 32h16v8H42zM40 40h20v36a4 4 0 0 1-4 4H44a4 4 0 0 1-4-4z"/><path d="M44 52h12"/>',
    "lash":     '<path d="M22 60c10 8 46 8 56 0"/><path d="M30 58l-4 10M44 64l-2 12M58 64l2 12M72 58l4 10M50 65v13"/>',
    "comb":     '<path d="M24 44h52v8H24z"/><path d="M30 52v18M40 52v18M50 52v18M60 52v18M70 52v18"/>',
    "drop":     '<path d="M50 24c10 14 16 22 16 32a16 16 0 0 1-32 0c0-10 6-18 16-32z"/>',
    "sparkle":  '<path d="M50 26c2 12 8 18 20 20-12 2-18 8-20 20-2-12-8-18-20-20 12-2 18-8 20-20z"/>',
}

def svg(w, h, pal_i, icon, label):
    top, bot = PALETTES[pal_i % len(PALETTES)]
    icon_path = ICONS[icon]
    icon_block = ""
    label_block = ""
    if label:
        icon_block = (
            f'<g transform="translate({w/2-50},{h/2-64})" fill="none" stroke="#ffffff" '
            f'stroke-opacity="0.5" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">{icon_path}</g>'
        )
        label_block = (
            f'<text x="{w/2}" y="{h/2+58}" text-anchor="middle" font-family="Georgia, serif" '
            f'font-style="italic" font-size="{max(15,w//34)}" fill="#ffffff" fill-opacity="0.88">{label}</text>'
        )
    return (
f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-label="{label or 'photo'}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="{top}"/><stop offset="1" stop-color="{bot}"/>
    </linearGradient>
    <radialGradient id="v" cx="0.5" cy="0.36" r="0.85">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.10"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0.20"/>
    </radialGradient>
  </defs>
  <rect width="{w}" height="{h}" fill="url(#g)"/>
  <rect width="{w}" height="{h}" fill="url(#v)"/>
  {icon_block}
  {label_block}
</svg>
''')

def write(name, content):
    with open(os.path.join(OUT, name), "w", encoding="utf-8") as f:
        f.write(content)

# hero (wide) — clean gradient, NO label (hero text sits on top)
write("hero.svg", svg(1600, 1000, 4, "sparkle", ""))
write("about.svg", svg(900, 1100, 2, "comb", "Our studio"))

gallery = [
    (800, 1000, 0, "scissors", "Dimensional balayage"),
    (800, 600,  1, "lash",     "Soft glam lashes"),
    (800, 950,  2, "comb",     "French-girl layers"),
    (800, 650,  3, "polish",   "Gel manicure"),
    (800, 1000, 4, "sparkle",  "Bridal updo"),
    (800, 600,  5, "drop",     "Copper transformation"),
    (800, 900,  1, "drop",     "Glass-skin glow"),
    (800, 700,  0, "lash",     "Brow shaping"),
]
for i, (w, h, p, ic, lab) in enumerate(gallery, 1):
    write(f"gallery-{i}.svg", svg(w, h, p, ic, lab))

team = [
    (600, 800, 0, "scissors", "Camille R."),
    (600, 800, 2, "drop",     "Naomi B."),
    (600, 800, 4, "lash",     "Sofia M."),
    (600, 800, 1, "polish",   "Avery C."),
]
for i, (w, h, p, ic, lab) in enumerate(team, 1):
    write(f"team-{i}.svg", svg(w, h, p, ic, lab))

print("Generated placeholder SVGs in", OUT)
