#!/usr/bin/env python3
"""Planche de contrôle d'une charte : capture du site (en-tête + pied de page) à côté de la page 1 du PV.

Usage :
    python3 planche_charte.py <dossier_capture> <pv.pdf> <sortie.png> [--titre "Marque — site"]

<dossier_capture> est la sortie de capture_site.js (accueil-haut.png, accueil-complet.png).
Sert à l'étape « Validation » de references/marques.md : la page 1 du PV doit être
reconnaissable à côté du site (logo, couleurs, police, codes graphiques).
"""

import argparse
import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


def font(size, bold=False):
    for name in (("DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf"), "LiberationSans-Regular.ttf"):
        for base in ("/usr/share/fonts/truetype/dejavu/", "/usr/share/fonts/truetype/liberation/"):
            if Path(base + name).exists():
                return ImageFont.truetype(base + name, size)
    return ImageFont.load_default()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("capture")
    ap.add_argument("pdf")
    ap.add_argument("sortie")
    ap.add_argument("--titre", default="")
    a = ap.parse_args()
    cap = Path(a.capture)
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(["pdftoppm", "-png", "-r", "150", "-f", "1", "-l", "1", a.pdf, f"{tmp}/p"], check=True)
        pv = Image.open(next(Path(tmp).glob("p*.png"))).convert("RGB")
    W, H = 2480, 1754
    c = Image.new("RGB", (W, H), "#ECEDEF")
    d = ImageDraw.Draw(c)
    d.text((60, 40), a.titre or cap.name, font=font(40, True), fill="#111")
    top = Image.open(cap / "accueil-haut.png").convert("RGB")
    full = Image.open(cap / "accueil-complet.png").convert("RGB")
    colw = 1220
    t = top.resize((colw, round(top.height * colw / top.width)), Image.LANCZOS)
    w = min(full.width, 1440)
    foot = full.crop((0, max(0, full.height - 820), w, full.height))
    f = foot.resize((colw, round(foot.height * colw / w)), Image.LANCZOS)
    y = 130
    d.text((60, y), "Site — en-tête", font=font(22), fill="#666")
    y += 34
    c.paste(t, (60, y))
    y += t.height + 24
    d.text((60, y), "Site — pied de page", font=font(22), fill="#666")
    y += 34
    room = H - 40 - y
    if f.height > room:
        f = f.crop((0, f.height - room, colw, f.height))
    c.paste(f, (60, y))
    ph = H - 164 - 40
    pv = pv.resize((round(pv.width * ph / pv.height), ph), Image.LANCZOS)
    x = W - 60 - pv.width
    d.text((x, 130), "PV généré (page 1)", font=font(22), fill="#666")
    c.paste(pv, (x, 164))
    d.rectangle([x - 1, 163, x + pv.width, 164 + pv.height], outline="#999")
    c.save(a.sortie)
    print(a.sortie)


if __name__ == "__main__":
    main()
