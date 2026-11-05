#!/usr/bin/env python3
"""Intègre une capture de site (capture_site.js) dans brands/<id>/ : logos, polices, couleurs, style.

Usage (après avoir regardé les captures d'écran et choisi) :
    python3 brand_from_capture.py <dossier_capture> <id> \\
        --logo logos/logo-1-header-rendu.png            # logo couleur pour fond blanc
        [--logo-blanc logos/logo-2-footer-rendu.png]    # logo pour fond de couleur (bandeaux)
        --primaire "#7A1F5C" [--secondaire "#F2A541"] [--texte "#2B2B2B"] \\
        [--police-titres "MarqueSerif"] [--police-texte "Arial"] \\
        [--entete bandeau|blanc] [--pied bandeau|filet] [--encadre bordure_gauche|fond_plein|contour] \\
        [--tableau-entete plein|souligne] [--accent-titre] [--majuscules]

- recadre les logos sur leur contenu (marges transparentes supprimées) ;
- convertit les polices web (woff2/woff) en TTF dans brands/<id>/fonts/ (fontTools + brotli) ;
- écrit couleurs, polices, logos et style dans brand.json, statut « partielle »
  (un humain valide le rendu puis passe le statut à « complete »).
"""

import argparse
import json
import shutil
from pathlib import Path

SKILL_DIR = Path(__file__).resolve().parent.parent


def trim_logo(src, dest):
    from PIL import Image
    im = Image.open(src)
    if im.mode not in ("RGBA", "LA"):
        im = im.convert("RGBA")
    bbox = im.getchannel("A").getbbox()
    if bbox:
        im = im.crop(bbox)
    # Marge de sécurité de 2 %.
    pad = max(2, round(im.size[0] * 0.02))
    out = Image.new("RGBA", (im.size[0] + 2 * pad, im.size[1] + 2 * pad), (0, 0, 0, 0))
    out.paste(im, (pad, pad))
    out.save(dest)
    return out.size


def convert_fonts(cap, bdir, families):
    src = cap / "fonts"
    if not src.is_dir():
        return []
    dest = bdir / "fonts"
    dest.mkdir(exist_ok=True)
    done = []
    for f in sorted(src.iterdir()):
        ext = f.suffix.lower()
        target = dest / (f.stem + (".otf" if ext == ".otf" else ".ttf"))
        try:
            if ext in (".ttf", ".otf"):
                shutil.copy(f, target)
            elif ext in (".woff", ".woff2"):
                from fontTools.ttLib import TTFont  # pip install fonttools brotli
                font = TTFont(str(f))
                font.flavor = None
                font.save(str(target))
            else:
                continue
        except Exception as e:  # noqa: BLE001
            print(f"  police ignorée ({f.name}) : {e}")
            continue
        # Ne garder que les familles retenues pour le PV.
        try:
            from fontTools.ttLib import TTFont
            fam = TTFont(str(target))["name"].getDebugName(1) or ""
        except Exception:  # noqa: BLE001
            fam = ""
        if families and not any(x.lower() in fam.lower() for x in families):
            target.unlink(missing_ok=True)
            continue
        done.append(f"{target.name} ({fam})")
    if not any(dest.iterdir()):
        dest.rmdir()
    return done


def main():
    ap = argparse.ArgumentParser(description="Intègre une capture de site dans une marque.")
    ap.add_argument("capture")
    ap.add_argument("marque")
    ap.add_argument("--logo", required=True)
    ap.add_argument("--logo-blanc")
    ap.add_argument("--logo-entete", help="version compacte pour l'en-tête des pages 2+ (défaut : --logo)")
    ap.add_argument("--primaire", required=True)
    ap.add_argument("--secondaire")
    ap.add_argument("--texte")
    ap.add_argument("--fond-clair")
    ap.add_argument("--police-titres")
    ap.add_argument("--police-texte")
    ap.add_argument("--entete", choices=["blanc", "bandeau"])
    ap.add_argument("--pied", choices=["filet", "bandeau"])
    ap.add_argument("--encadre", choices=["bordure_gauche", "fond_plein", "contour"])
    ap.add_argument("--tableau-entete", choices=["plein", "souligne"])
    ap.add_argument("--accent-titre", action="store_true")
    ap.add_argument("--majuscules", action="store_true")
    a = ap.parse_args()

    cap = Path(a.capture)
    bdir = SKILL_DIR / "brands" / a.marque
    brand = json.loads((bdir / "brand.json").read_text(encoding="utf-8"))
    info = json.loads((cap / "capture.json").read_text(encoding="utf-8")) if (cap / "capture.json").exists() else {}

    size = trim_logo(cap / a.logo, bdir / "logo.png")
    brand["logo"] = "logo.png"
    print(f"logo.png {size}")
    if a.logo_entete:
        trim_logo(cap / a.logo_entete, bdir / "logo-entete.png")
        brand["logo_entete"] = "logo-entete.png"
    else:
        brand["logo_entete"] = None
    if a.logo_blanc:
        size = trim_logo(cap / a.logo_blanc, bdir / "logo-blanc.png")
        brand["logo_sur_fond"] = "logo-blanc.png"
        print(f"logo-blanc.png {size}")

    couleurs = {"primaire": a.primaire.upper()}
    for k, v in (("secondaire", a.secondaire), ("texte", a.texte), ("fond_clair", a.fond_clair)):
        if v:
            couleurs[k] = v.upper()
    brand["couleurs"] = couleurs
    if a.police_titres:
        brand["police_titres"] = a.police_titres
    if a.police_texte:
        brand["police_texte"] = a.police_texte
    fams = [x for x in (a.police_titres, a.police_texte) if x and x.lower() != "arial"]
    fonts = convert_fonts(cap, bdir, fams)
    if fonts:
        print("polices :", ", ".join(fonts))

    style = dict(brand.get("style") or {})
    for k, v in (("entete", a.entete), ("pied", a.pied), ("encadre", a.encadre), ("tableau_entete", a.tableau_entete)):
        if v:
            style[k] = v
    if a.accent_titre:
        style["accent_titre"] = True
    brand["style"] = style
    brand["titres_majuscules"] = bool(a.majuscules)
    if info.get("url"):
        brand["site"] = info["url"].split("//")[-1].split("/")[0].removeprefix("www.")
    brand["statut_charte"] = "partielle"
    src = f"Charte relevée sur {info.get('url', a.capture)} (capture_site.js + brand_from_capture.py)"
    brand["sources"] = [s for s in brand.get("sources", []) if not s.startswith("Charte relevée")] + [src]
    keep = [x for x in brand.get("a_verifier", []) if not x.lower().startswith(("site internet", "logo", "couleurs", "valider"))]
    brand["a_verifier"] = ["Valider le rendu d'un PV de test, puis passer statut_charte à « complete »"] + keep
    (bdir / "brand.json").write_text(json.dumps(brand, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"brands/{a.marque}/brand.json mis à jour (statut « partielle »).")


if __name__ == "__main__":
    main()
