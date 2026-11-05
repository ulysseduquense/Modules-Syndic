#!/usr/bin/env python3
"""Relève la charte graphique d'un site internet (logo, couleurs, polices) pour
compléter brands/<id>/brand.json.

Usage :
    python3 extract_brand.py https://www.exemple.be noblue            # propose, n'écrit rien dans brand.json
    python3 extract_brand.py https://www.exemple.be noblue --apply    # met à jour brand.json (statut « partielle »)

Ce que fait le script :
- télécharge la page d'accueil et jusqu'à 6 feuilles de style ;
- classe les couleurs (variables CSS « primary / brand / accent », meta theme-color,
  fréquence d'usage), en écartant blancs, noirs et gris ;
- relève les polices (font-family, Google Fonts) ;
- télécharge les logos candidats (balises <img> « logo », SVG inline, favicon) dans
  brands/<id>/candidats/ et convertit un SVG en PNG si un convertisseur est disponible.

Le résultat est une PROPOSITION : un humain choisit le bon logo et valide les couleurs,
puis passe "statut_charte" à "complete" dans brand.json.
"""

import argparse
import colorsys
import json
import re
import shutil
import subprocess
import sys
import urllib.parse
import urllib.request
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path

SKILL_DIR = Path(__file__).resolve().parent.parent
UA = "Mozilla/5.0 (compatible; charte-pv-cc/1.0)"


def fetch(url, binary=False, timeout=25):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        data = r.read()
        final = r.geturl()
    return (data if binary else data.decode("utf-8", "replace")), final


VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.css_links, self.styles, self.inline, self.imgs = [], [], [], []
        self.icons, self.theme_color, self.og_image, self.svgs = [], None, None, []
        self._in_style = False
        self._stack = []          # (balise, zone, classes) des éléments ouverts
        self._svg_depth = 0
        self._svg_buf = []
        self._svg_is_logo = False

    def zone(self):
        return self._stack[-1][1] if self._stack else ""

    def handle_starttag(self, tag, attrs):
        a = {k: (v or "") for k, v in attrs}
        ident = " ".join([a.get("class", ""), a.get("id", "")]).lower()
        if a.get("style"):
            self.inline.append(a["style"])
        if tag == "link":
            rel = a.get("rel", "").lower()
            if "stylesheet" in rel and a.get("href"):
                self.css_links.append(a["href"])
            if "icon" in rel and a.get("href"):
                self.icons.append(a["href"])
        elif tag == "meta":
            if a.get("name", "").lower() == "theme-color":
                self.theme_color = a.get("content")
            if a.get("property", "").lower() == "og:image":
                self.og_image = a.get("content")
        elif tag == "style":
            self._in_style = True
        elif tag == "img":
            src = a.get("src") or a.get("data-src") or ""
            if not src and a.get("srcset"):
                src = a["srcset"].split(",")[0].split()[0]
            parents = " ".join(x[2] for x in self._stack[-3:])
            blob = " ".join([src, a.get("alt", ""), ident, parents]).lower()
            if src:
                self.imgs.append({"src": src, "logo": "logo" in blob, "zone": self.zone(), "alt": a.get("alt", "")})
        if tag == "svg" or self._svg_depth:
            if tag == "svg" and not self._svg_depth:
                self._svg_buf = []
                parents = " ".join(x[2] for x in self._stack[-3:])
                self._svg_is_logo = "logo" in (ident + " " + parents + " " + a.get("aria-label", "").lower())
            attr = "".join(f' {k}="{v}"' for k, v in attrs if v is not None)
            if tag in VOID:
                self._svg_buf.append(f"<{tag}{attr}/>")
            else:
                self._svg_depth += 1
                self._svg_buf.append(f"<{tag}{attr}>")
        if tag in VOID:
            return
        if tag in ("header", "nav", "footer"):
            z = tag
        elif re.search(r"\bfooter\b|pied", ident):
            z = "footer"
        elif re.search(r"\bheader\b|navbar|entete", ident):
            z = "header"
        else:
            z = self.zone()
        self._stack.append((tag, z, ident))

    def handle_startendtag(self, tag, attrs):
        if self._svg_depth:
            attr = "".join(f' {k}="{v}"' for k, v in attrs if v is not None)
            self._svg_buf.append(f"<{tag}{attr}/>")
            return
        self.handle_starttag(tag, attrs)
        if tag not in VOID and self._stack and self._stack[-1][0] == tag:
            self._stack.pop()

    def handle_endtag(self, tag):
        if tag == "style":
            self._in_style = False
        if self._svg_depth:
            self._svg_buf.append(f"</{tag}>")
            self._svg_depth -= 1
            if self._svg_depth == 0 and self._svg_is_logo:
                self.svgs.append("".join(self._svg_buf))
        for i in range(len(self._stack) - 1, -1, -1):
            if self._stack[i][0] == tag:
                del self._stack[i:]
                break

    def handle_data(self, data):
        if self._in_style:
            self.styles.append(data)


HEX_RE = re.compile(r"#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b")
RGB_RE = re.compile(r"rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})")
VAR_RE = re.compile(r"(--[\w-]+)\s*:\s*([^;}{]+)")
FONT_RE = re.compile(r"font-family\s*:\s*([^;}{]+)", re.IGNORECASE)
GF_RE = re.compile(r"fonts\.googleapis\.com/css2?\?([^\"')\s]+)")
CSS_URL_RE = re.compile(r"url\(\s*['\"]?([^'\")]+)")


def norm_hex(h):
    h = h.lstrip("#").upper()
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    return "#" + h


def is_brandish(h):
    r, g, b = (int(h[i:i + 2], 16) / 255 for i in (1, 3, 5))
    hh, l, s = colorsys.rgb_to_hls(r, g, b)
    return 0.08 < l < 0.93 and s > 0.15


def colors_in(text):
    out = [norm_hex(h) for h in HEX_RE.findall(text)]
    out += ["#%02X%02X%02X" % tuple(min(255, int(x)) for x in m) for m in RGB_RE.findall(text)]
    return out


def hue_dist(a, b):
    ha = colorsys.rgb_to_hls(*(int(a[i:i + 2], 16) / 255 for i in (1, 3, 5)))
    hb = colorsys.rgb_to_hls(*(int(b[i:i + 2], 16) / 255 for i in (1, 3, 5)))
    d = abs(ha[0] - hb[0])
    return min(d, 1 - d) + abs(ha[1] - hb[1]) * 0.5


def svg_to_png(svg_path, png_path):
    try:
        import cairosvg  # type: ignore
        cairosvg.svg2png(url=str(svg_path), write_to=str(png_path), output_width=1600)
        return True
    except Exception:
        pass
    if shutil.which("rsvg-convert"):
        r = subprocess.run(["rsvg-convert", "-w", "1600", "-o", str(png_path), str(svg_path)])
        return r.returncode == 0
    if shutil.which("inkscape"):
        r = subprocess.run(["inkscape", str(svg_path), "--export-type=png", f"--export-filename={png_path}", "-w", "1600"])
        return r.returncode == 0
    try:
        from playwright.sync_api import sync_playwright  # type: ignore
        with sync_playwright() as p:
            b = p.chromium.launch()
            pg = b.new_page()
            pg.goto(svg_path.resolve().as_uri())
            el = pg.query_selector("svg")
            if el:
                el.screenshot(path=str(png_path), omit_background=True)
            b.close()
        return png_path.exists()
    except Exception:
        return False


def main():
    ap = argparse.ArgumentParser(description="Relève la charte graphique d'un site pour une marque.")
    ap.add_argument("url")
    ap.add_argument("marque", help="id du dossier brands/<id> (ex. noblue, dr-syndic)")
    ap.add_argument("--apply", action="store_true", help="écrit la proposition dans brand.json")
    a = ap.parse_args()

    bdir = SKILL_DIR / "brands" / a.marque
    if not (bdir / "brand.json").exists():
        sys.exit(f"brands/{a.marque}/brand.json introuvable")
    try:
        html, base = fetch(a.url)
    except Exception as e:  # noqa: BLE001
        sys.exit(f"Impossible de lire {a.url} : {e}\n"
                 "Si l'erreur vient du proxy (403) ou du DNS, le domaine n'est pas autorisé dans "
                 "les réglages réseau de l'environnement.")

    page = Page()
    page.feed(html)
    css_texts = list(page.styles) + list(page.inline)
    for href in page.css_links[:6]:
        u = urllib.parse.urljoin(base, href)
        try:
            txt, _ = fetch(u)
            css_texts.append(txt)
        except Exception:  # noqa: BLE001
            print(f"  (feuille de style ignorée : {u})")
    css = "\n".join(css_texts)

    # --- couleurs
    freq = Counter(c for c in colors_in(css) if is_brandish(c))
    weighted = Counter(freq)
    variables = {}
    for name, val in VAR_RE.findall(css):
        cs = [c for c in colors_in(val) if is_brandish(c)]
        if cs:
            variables[name] = cs[0]
            if re.search(r"primary|brand|main|theme|principal", name, re.I):
                weighted[cs[0]] += 50
            elif re.search(r"secondary|accent|secondaire", name, re.I):
                weighted[cs[0]] += 25
    if page.theme_color:
        for c in colors_in(page.theme_color):
            if is_brandish(c):
                weighted[c] += 40
    ranked = [c for c, _ in weighted.most_common()]
    primaire = ranked[0] if ranked else None
    secondaire = next((c for c in ranked[1:] if primaire and hue_dist(c, primaire) > 0.08), None)

    # --- polices
    fonts = Counter()
    for decl in FONT_RE.findall(css):
        first = decl.split(",")[0].strip().strip("'\"")
        if first and not first.startswith("var(") and first.lower() not in ("inherit", "initial", "sans-serif", "serif"):
            fonts[first] += 1
    for q in GF_RE.findall(html + css):
        for fam in urllib.parse.parse_qs(urllib.parse.unquote(q)).get("family", []):
            fonts[fam.split(":")[0].replace("+", " ")] += 5

    # --- logos
    cand_dir = bdir / "candidats"
    cand_dir.mkdir(exist_ok=True)
    logos = sorted(page.imgs, key=lambda i: (not i["logo"], i["zone"] != "header"))
    logos = [i for i in logos if i["logo"]][:4] or logos[:2]
    saved = []
    for n, im in enumerate(logos, 1):
        u = urllib.parse.urljoin(base, im["src"])
        ext = Path(urllib.parse.urlparse(u).path).suffix.lower() or ".png"
        try:
            data, _ = fetch(u, binary=True)
        except Exception:  # noqa: BLE001
            continue
        f = cand_dir / f"logo-{n}{ext}"
        f.write_bytes(data)
        saved.append({"fichier": str(f.relative_to(bdir)), "source": u, "zone": im["zone"], "alt": im["alt"]})
    for n, svg in enumerate(page.svgs[:2], 1):
        f = cand_dir / f"logo-inline-{n}.svg"
        if "xmlns" not in svg[:200]:
            svg = svg.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"', 1)
        f.write_text(svg, encoding="utf-8")
        saved.append({"fichier": str(f.relative_to(bdir)), "source": "SVG inline", "zone": "", "alt": ""})
    for ic in page.icons[:1]:
        u = urllib.parse.urljoin(base, ic)
        try:
            data, _ = fetch(u, binary=True)
            f = cand_dir / ("favicon" + (Path(urllib.parse.urlparse(u).path).suffix or ".ico"))
            f.write_bytes(data)
            saved.append({"fichier": str(f.relative_to(bdir)), "source": u, "zone": "favicon", "alt": ""})
        except Exception:  # noqa: BLE001
            pass
    for s in saved:
        p = bdir / s["fichier"]
        if p.suffix == ".svg":
            png = p.with_suffix(".png")
            if svg_to_png(p, png):
                s["png"] = str(png.relative_to(bdir))

    proposition = {
        "site": urllib.parse.urlparse(base).netloc.removeprefix("www.") or a.url,
        "couleurs_proposees": {"primaire": primaire, "secondaire": secondaire},
        "couleurs_classees": [{"hex": c, "occurrences": freq.get(c, 0)} for c in ranked[:10]],
        "variables_css": variables,
        "theme_color": page.theme_color,
        "polices": [f for f, _ in fonts.most_common(5)],
        "logos_candidats": saved,
    }
    (bdir / "brand.proposition.json").write_text(json.dumps(proposition, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(proposition, ensure_ascii=False, indent=2))

    if a.apply:
        brand = json.loads((bdir / "brand.json").read_text(encoding="utf-8"))
        brand["site"] = proposition["site"]
        if primaire:
            brand["couleurs"] = {k: v for k, v in (("primaire", primaire), ("secondaire", secondaire)) if v}
        if proposition["polices"]:
            brand["police_titres"] = brand["police_texte"] = proposition["polices"][0]
        best = next((s.get("png") or s["fichier"] for s in saved
                     if (s.get("png") or s["fichier"]).lower().endswith((".png", ".jpg", ".jpeg"))), None)
        if best:
            dest = "logo" + Path(best).suffix
            shutil.copy(bdir / best, bdir / dest)
            brand["logo"] = dest
        brand["statut_charte"] = "partielle"
        brand.setdefault("sources", []).append(f"Relevé automatique sur {base} (extract_brand.py)")
        av = [x for x in brand.get("a_verifier", []) if not x.lower().startswith(("site internet", "logo", "couleurs"))]
        brand["a_verifier"] = ["Valider le logo retenu et les couleurs relevées automatiquement, "
                               "puis passer statut_charte à « complete »"] + av
        (bdir / "brand.json").write_text(json.dumps(brand, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"\nbrand.json mis à jour (statut « partielle »). Logo retenu : {brand.get('logo')}")
    else:
        print(f"\nProposition écrite dans brands/{a.marque}/brand.proposition.json — relancer avec --apply pour l'appliquer.")


if __name__ == "__main__":
    main()
