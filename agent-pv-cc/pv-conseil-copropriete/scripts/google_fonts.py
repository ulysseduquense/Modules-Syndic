#!/usr/bin/env python3
"""Télécharge des polices Google Fonts (licence libre OFL) en TrueType statique dans brands/<id>/fonts/.

Ces fichiers servent au rendu PDF et sont embarqués dans le .docx (Word affiche alors la police
de la marque même si elle n'est pas installée sur le poste).

Usage :
    python3 google_fonts.py <id> "Inter:400,700" "Source Serif 4:400i"
    python3 google_fonts.py easy-syndic "Hanken Grotesk:400,400i,700,900"

Graisses : 100…900 ; suffixe « i » pour l'italique. Une graisse autre que 400/700 devient une famille à part
dans Word (ex. « Hanken Grotesk Black ») : l'utiliser telle quelle dans police_titres avec "titres_gras": false.
Ne jamais mettre ici une police commerciale (Typekit, Avenir, Nexa…) : noter son nom dans brand.json
(police_titres_site) et choisir une police de secours.
"""

import re
import subprocess
import sys
from pathlib import Path

SKILL_DIR = Path(__file__).resolve().parent.parent
# Ancien navigateur : l'API renvoie un fichier complet (non découpé par plages Unicode) par graisse.
UA = "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:20.0) Gecko/20100101 Firefox/20.0"
NOMS = {100: "Thin", 200: "ExtraLight", 300: "Light", 400: "Regular", 500: "Medium",
        600: "SemiBold", 700: "Bold", 800: "ExtraBold", 900: "Black"}


def subset_latin(font):
    """Réduit la police aux alphabets latins (FR, NL, DE, LU) et à la ponctuation : fichier 4 à 5 fois plus léger,
    donc .docx plus léger une fois la police embarquée. Les noms de famille et les fonctions OpenType sont conservés."""
    from fontTools import subset
    unicodes = list(range(0x20, 0x250)) + list(range(0x2000, 0x2070)) + [0x20AC, 0x2116, 0x2122, 0x2190, 0x2192,
                                                                         0x2212, 0x2713, 0xFB01, 0xFB02]
    opts = subset.Options()
    opts.layout_features = ["*"]
    opts.name_IDs = ["*"]
    opts.name_languages = ["*"]
    opts.notdef_outline = True
    opts.glyph_names = False
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=unicodes)
    sub.subset(font)


def main():
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    from fontTools.ttLib import TTFont  # pip install fonttools
    dest = SKILL_DIR / "brands" / sys.argv[1] / "fonts"
    dest.mkdir(parents=True, exist_ok=True)
    for spec in sys.argv[2:]:
        fam, _, poids = spec.partition(":")
        styles = [(int(p.rstrip("i")), p.endswith("i")) for p in (poids or "400,700").split(",")]
        axes = ";".join(f"{int(i)},{w}" for w, i in sorted(styles, key=lambda x: (x[1], x[0])))
        url = f"https://fonts.googleapis.com/css2?family={fam.strip().replace(' ', '+')}:ital,wght@{axes}"
        css = subprocess.run(["curl", "-sS", "-A", UA, url], capture_output=True, text=True, check=True).stdout
        found = re.findall(r"font-style: (\w+);\s*font-weight: (\d+);.*?url\(([^)]+)\)", css, re.S)
        if not found:
            sys.exit(f"Famille introuvable sur Google Fonts : {fam}\n{css[:300]}")
        for style, weight, src in found:
            nom = NOMS[int(weight)] + ("Italic" if style == "italic" else "")
            nom = nom.replace("RegularItalic", "Italic")
            base = dest / f"{fam.strip().replace(' ', '')}-{nom}"
            tmp = base.with_suffix(".woff")
            subprocess.run(["curl", "-sS", "-o", str(tmp), src], check=True)
            font = TTFont(str(tmp))
            font.flavor = None
            subset_latin(font)
            font.save(str(base.with_suffix(".ttf")))
            tmp.unlink()
            n = font["name"]
            print(f"{base.with_suffix('.ttf').name:40} famille Word « {n.getDebugName(1)} » {n.getDebugName(2)}")


if __name__ == "__main__":
    main()
