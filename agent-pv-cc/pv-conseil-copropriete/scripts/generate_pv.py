#!/usr/bin/env python3
"""Génère le procès-verbal d'une réunion du conseil de copropriété (PV de CC)
au format Word (.docx), et en PDF si LibreOffice est disponible, à la charte
de la marque / du syndic choisi.

Usage :
    python3 generate_pv.py pv.json                    # -> PV_CC_<acp>_<date>.docx (+ .pdf)
    python3 generate_pv.py pv.json -o sortie/          # dossier ou chemin .docx
    python3 generate_pv.py pv.json --render qa/        # + aperçu PNG des pages (QA)
    python3 generate_pv.py pv.json --no-pdf
    python3 generate_pv.py --list-brands               # marques disponibles et état de leur charte

Le format du fichier JSON est décrit dans references/schema.md.
Les marques sont dans brands/<id>/brand.json (voir references/marques.md).
"""

import argparse
import datetime as dt
import json
import re
import shutil
import subprocess
import sys
import unicodedata
from pathlib import Path

try:
    from docx import Document
    from docx.enum.section import WD_SECTION  # noqa: F401
    from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT
    from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_COLOR_INDEX
    from docx.oxml import OxmlElement
    from docx.oxml.ns import qn
    from docx.shared import Cm, Pt, RGBColor
except ImportError:  # pragma: no cover
    sys.exit("python-docx manquant : pip install python-docx --break-system-packages")

SKILL_DIR = Path(__file__).resolve().parent.parent
BRANDS_DIR = SKILL_DIR / "brands"

# Palette neutre utilisée quand la charte d'une marque n'est pas encore renseignée.
# Ce n'est PAS la charte de la marque : c'est un rendu sobre, sans couleur de marque.
NEUTRE = {
    "primaire": "#1F2937",
    "secondaire": "#4B5563",
    "texte": "#111827",
    "texte_secondaire": "#4B5563",
    "fond_clair": "#F3F4F6",
    "filet": "#D1D5DB",
    "entete_tableau": "#374151",
    "texte_entete_tableau": "#FFFFFF",
    "alerte": "#B45309",
}

MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août",
        "septembre", "octobre", "novembre", "décembre"]
JOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]

PRESENCE = {
    "present": "Présent",
    "présent": "Présent",
    "presente": "Présente",
    "présente": "Présente",
    "excuse": "Excusé",
    "excusé": "Excusé",
    "excusee": "Excusée",
    "excusée": "Excusée",
    "absent": "Absent",
    "absente": "Absente",
    "represente": "Représenté",
    "représenté": "Représenté",
    "representee": "Représentée",
    "représentée": "Représentée",
    "visio": "Présent (visio)",
}

MONTANT_RE = re.compile(r"-?\d{1,3}(?:[.\u202f\u00a0 ]\d{3})*(?:,\d{2})?\s?(?:€|EUR)(?:\s?(?:TVAC|HTVA))?", re.IGNORECASE)
# Éléments graphiques de la charte (brand.json -> "style"), voir references/marques.md.
STYLE_DEFAUT = {
    "entete": "blanc",              # blanc | bandeau (bandeau de couleur à fond perdu en haut de la page 1)
    "entete_couleur": "primaire",
    "entete_hauteur_cm": 2.8,
    "pied": "filet",                # filet | bandeau (bandeau de couleur à fond perdu en bas de chaque page)
    "pied_couleur": "primaire",
    "pied_hauteur_cm": 1.3,
    "pied_coins_arrondis": "",      # ex. "tr" : coin supérieur droit arrondi (signature Emeria)
    "encadre": "bordure_gauche",    # bordure_gauche | fond_plein | contour
    "tableau_entete": "plein",      # plein | souligne
    "accent_titre": False,          # petit filet de couleur sous le titre du document
    "surtitre": True,               # « PROCÈS-VERBAL » au-dessus du titre
}
PLACEHOLDER_RE = re.compile(r"\[(?:À|A) COMPL[ÉE]TER[^\]]*\]", re.IGNORECASE)


# --------------------------------------------------------------------------- utilitaires

def strip_accents(s):
    return "".join(c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn")


def slug(s):
    s = strip_accents(str(s)).lower()
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s or "acp"


def hex_to_rgb(h):
    h = h.lstrip("#")
    return RGBColor(int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))


def mix(h, pct_white):
    """Éclaircit une couleur hex en la mélangeant avec du blanc (pct_white entre 0 et 1)."""
    h = h.lstrip("#")
    r, g, b = (int(h[i:i + 2], 16) for i in (0, 2, 4))
    r, g, b = (round(c + (255 - c) * pct_white) for c in (r, g, b))
    return f"#{r:02X}{g:02X}{b:02X}"


def fmt_date(value, long=True):
    """'2026-11-05' -> 'jeudi 5 novembre 2026' (long) ou '05/11/2026'. Texte libre conservé."""
    if not value:
        return ""
    s = str(value).strip()
    m = re.fullmatch(r"(\d{4})-(\d{2})-(\d{2})", s)
    if not m:
        return s
    d = dt.date(int(m[1]), int(m[2]), int(m[3]))
    if not long:
        return d.strftime("%d/%m/%Y")
    jour = "1er" if d.day == 1 else str(d.day)
    return f"{JOURS[d.weekday()]} {jour} {MOIS[d.month - 1]} {d.year}"


def fmt_heure(value):
    """'18:00' -> '18h00' ; '18:30' -> '18h30'. Texte libre conservé."""
    if not value:
        return ""
    s = str(value).strip()
    m = re.fullmatch(r"(\d{1,2})[:hH.](\d{2})", s)
    if m:
        return f"{int(m[1])}h{m[2]}"
    m = re.fullmatch(r"(\d{1,2})[hH]?", s)
    if m:
        return f"{int(m[1])}h00"
    return s


# --------------------------------------------------------------------------- marques

def load_brands():
    brands = {}
    for f in sorted(BRANDS_DIR.glob("*/brand.json")):
        data = json.loads(f.read_text(encoding="utf-8"))
        data["_dir"] = f.parent
        brands[data["id"]] = data
    return brands


def resolve_brand(name, brands):
    key = strip_accents(str(name)).lower().strip()
    for b in brands.values():
        names = [b["id"], b.get("nom_affiche", "")] + list(b.get("alias", []))
        if key in {strip_accents(n).lower().strip() for n in names if n}:
            return b
    dispo = ", ".join(sorted(brands))
    sys.exit(f"Marque inconnue : « {name} ». Marques disponibles : {dispo}")


def brand_palette(brand):
    """Palette effective. Couleurs absentes -> dérivées de la primaire, ou palette neutre."""
    src = brand.get("couleurs") or {}
    if not src.get("primaire"):
        return dict(NEUTRE), True
    p = src["primaire"]
    s = src.get("secondaire", p)
    pal = {
        "primaire": p,
        "secondaire": s,
        "texte": src.get("texte", "#1A1A1A"),
        "texte_secondaire": src.get("texte_secondaire", "#4D4D4D"),
        "fond_clair": src.get("fond_clair", mix(p, 0.93)),
        "filet": src.get("filet", mix(p, 0.78)),
        "entete_tableau": src.get("entete_tableau", p),
        "texte_entete_tableau": src.get("texte_entete_tableau", "#FFFFFF"),
        "alerte": src.get("alerte", s),
    }
    return pal, False


def list_brands():
    brands = load_brands()
    etat = {"complete": "charte complète", "partielle": "charte partielle", "a_completer": "charte à compléter"}
    for b in brands.values():
        logo = "logo ✓" if b.get("logo") and (b["_dir"] / b["logo"]).exists() else "pas de logo"
        print(f"- {b['id']:<10} {b['nom_affiche']:<12} {etat.get(b.get('statut_charte'), b.get('statut_charte'))} · {logo}")
        for v in b.get("a_verifier", []):
            print(f"      à vérifier : {v}")


# --------------------------------------------------------------------------- bas niveau Word

def set_run_font(run, font, size=None, bold=None, italic=None, color=None):
    run.font.name = font
    rpr = run._element.get_or_add_rPr()
    rfonts = rpr.find(qn("w:rFonts"))
    if rfonts is None:
        rfonts = OxmlElement("w:rFonts")
        rpr.insert(0, rfonts)
    for att in ("w:ascii", "w:hAnsi", "w:cs", "w:eastAsia"):
        rfonts.set(qn(att), font)
    if size is not None:
        run.font.size = Pt(size)
    if bold is not None:
        run.font.bold = bold
    if italic is not None:
        run.font.italic = italic
    if color:
        run.font.color.rgb = hex_to_rgb(color)


def style_font(style, font, size, color, bold=False):
    style.font.name = font
    style.font.size = Pt(size)
    style.font.bold = bold
    style.font.italic = False
    style.font.color.rgb = hex_to_rgb(color)
    rpr = style.element.get_or_add_rPr()
    rfonts = rpr.find(qn("w:rFonts"))
    if rfonts is None:
        rfonts = OxmlElement("w:rFonts")
        rpr.insert(0, rfonts)
    for att in list(rfonts.attrib):
        if att.endswith("Theme"):
            del rfonts.attrib[att]
    for att in ("w:ascii", "w:hAnsi", "w:cs", "w:eastAsia"):
        rfonts.set(qn(att), font)


def char_spacing(run, twips):
    rpr = run._element.get_or_add_rPr()
    sp = OxmlElement("w:spacing")
    sp.set(qn("w:val"), str(twips))
    rpr.append(sp)


def shade(cell, hex_color):
    tcpr = cell._element.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), hex_color.lstrip("#"))
    tcpr.append(shd)


def cell_borders(cell, **edges):
    """edges : top/left/bottom/right = (taille en 1/8 pt, couleur hex) ou None pour aucune."""
    tcpr = cell._element.get_or_add_tcPr()
    borders = tcpr.find(qn("w:tcBorders"))
    if borders is None:
        borders = OxmlElement("w:tcBorders")
        tcpr.append(borders)
    for edge, spec in edges.items():
        el = OxmlElement(f"w:{edge}")
        if spec is None:
            el.set(qn("w:val"), "nil")
        else:
            el.set(qn("w:val"), "single")
            el.set(qn("w:sz"), str(spec[0]))
            el.set(qn("w:color"), spec[1].lstrip("#"))
            el.set(qn("w:space"), "0")
        borders.append(el)


def cell_margins(cell, top=60, bottom=60, left=100, right=100):
    tcpr = cell._element.get_or_add_tcPr()
    mar = OxmlElement("w:tcMar")
    for k, v in (("top", top), ("bottom", bottom), ("start", left), ("end", right)):
        el = OxmlElement(f"w:{k}")
        el.set(qn("w:w"), str(v))
        el.set(qn("w:type"), "dxa")
        mar.append(el)
    tcpr.append(mar)


def table_borders(table, color=None, size=4, inside_h=True, inside_v=False, outer=True):
    tblpr = table._element.tblPr
    borders = OxmlElement("w:tblBorders")
    for edge in ("top", "left", "bottom", "right", "insideH", "insideV"):
        el = OxmlElement(f"w:{edge}")
        on = (edge in ("top", "left", "bottom", "right") and outer) or \
             (edge == "insideH" and inside_h) or (edge == "insideV" and inside_v)
        if on and color:
            el.set(qn("w:val"), "single")
            el.set(qn("w:sz"), str(size))
            el.set(qn("w:color"), color.lstrip("#"))
            el.set(qn("w:space"), "0")
        else:
            el.set(qn("w:val"), "nil")
        borders.append(el)
    tblpr.append(borders)


def table_widths(table, widths_cm):
    table.autofit = False
    tblpr = table._element.tblPr
    layout = OxmlElement("w:tblLayout")
    layout.set(qn("w:type"), "fixed")
    tblpr.append(layout)
    for row in table.rows:
        for i, w in enumerate(widths_cm):
            row.cells[i].width = Cm(w)
    grid = table._element.find(qn("w:tblGrid"))
    if grid is not None:
        for i, gc in enumerate(grid.findall(qn("w:gridCol"))):
            if i < len(widths_cm):
                gc.set(qn("w:w"), str(int(widths_cm[i] / 2.54 * 1440)))


def row_no_split(row, header=False):
    trpr = row._tr.get_or_add_trPr()
    el = OxmlElement("w:cantSplit")
    trpr.append(el)
    if header:
        h = OxmlElement("w:tblHeader")
        trpr.append(h)


def para_border(paragraph, edge="bottom", color="#000000", size=6, space=4):
    ppr = paragraph._p.get_or_add_pPr()
    pbdr = ppr.find(qn("w:pBdr"))
    if pbdr is None:
        pbdr = OxmlElement("w:pBdr")
        ppr.append(pbdr)
    el = OxmlElement(f"w:{edge}")
    el.set(qn("w:val"), "single")
    el.set(qn("w:sz"), str(size))
    el.set(qn("w:space"), str(space))
    el.set(qn("w:color"), color.lstrip("#"))
    pbdr.append(el)


def keep_with_next(paragraph):
    paragraph.paragraph_format.keep_with_next = True


def add_field(paragraph, instr, font, size, color):
    """Insère un champ Word (PAGE, NUMPAGES…)."""
    def fld(kind):
        el = OxmlElement("w:fldChar")
        el.set(qn("w:fldCharType"), kind)
        return el
    r1 = paragraph.add_run()
    set_run_font(r1, font, size, color=color)
    r1._element.append(fld("begin"))
    r2 = paragraph.add_run()
    set_run_font(r2, font, size, color=color)
    it = OxmlElement("w:instrText")
    it.set(qn("xml:space"), "preserve")
    it.text = f" {instr} "
    r2._element.append(it)
    r3 = paragraph.add_run()
    set_run_font(r3, font, size, color=color)
    r3._element.append(fld("separate"))
    r4 = paragraph.add_run("1")
    set_run_font(r4, font, size, color=color)
    r5 = paragraph.add_run()
    set_run_font(r5, font, size, color=color)
    r5._element.append(fld("end"))


def band_png(color_hex, w_cm, h_cm, corners="", radius_cm=0.0, dpi=200):
    """Rectangle plein (PNG) aux couleurs de la marque, coins arrondis optionnels (tl, tr, br, bl)."""
    import tempfile
    from PIL import Image, ImageDraw
    w, h = round(w_cm / 2.54 * dpi), round(h_cm / 2.54 * dpi)
    rgb = tuple(int(color_hex.lstrip("#")[i:i + 2], 16) for i in (0, 2, 4)) + (255,)
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    r = round(radius_cm / 2.54 * dpi)
    if corners and r:
        d.rounded_rectangle([0, 0, w - 1, h - 1], radius=r, fill=rgb,
                            corners=tuple(c in corners for c in ("tl", "tr", "br", "bl")))
    else:
        d.rectangle([0, 0, w, h], fill=rgb)
    f = tempfile.NamedTemporaryFile(suffix=".png", delete=False)
    img.save(f.name)
    return f.name


def image_ratio(path):
    from PIL import Image
    with Image.open(path) as im:
        return im.size[1] / im.size[0]


def anchor_picture(paragraph, path, w_cm, h_cm, x_cm, y_cm, behind=True):
    """Image positionnée par rapport à la page (bandeaux à fond perdu), derrière le texte."""
    run = paragraph.add_run()
    run.add_picture(str(path), width=Cm(w_cm), height=Cm(h_cm))
    inline = run._r.find(".//" + qn("wp:inline"))
    anchor = OxmlElement("wp:anchor")
    for k, v in (("distT", "0"), ("distB", "0"), ("distL", "0"), ("distR", "0"), ("simplePos", "0"),
                 ("relativeHeight", "251658240"), ("behindDoc", "1" if behind else "0"), ("locked", "0"),
                 ("layoutInCell", "1"), ("allowOverlap", "1")):
        anchor.set(k, v)
    sp = OxmlElement("wp:simplePos")
    sp.set("x", "0")
    sp.set("y", "0")
    anchor.append(sp)
    for tag, val in (("wp:positionH", x_cm), ("wp:positionV", y_cm)):
        el = OxmlElement(tag)
        el.set("relativeFrom", "page")
        off = OxmlElement("wp:posOffset")
        off.text = str(int(Cm(val)))
        el.append(off)
        anchor.append(el)
    anchor.append(inline.find(qn("wp:extent")))
    ee = OxmlElement("wp:effectExtent")
    for k in ("l", "t", "r", "b"):
        ee.set(k, "0")
    anchor.append(ee)
    anchor.append(OxmlElement("wp:wrapNone"))
    anchor.append(inline.find(qn("wp:docPr")))
    cnv = inline.find(qn("wp:cNvGraphicFramePr"))
    anchor.append(cnv if cnv is not None else OxmlElement("wp:cNvGraphicFramePr"))
    anchor.append(inline.find(qn("a:graphic")))
    inline.getparent().replace(inline, anchor)


def renumber_docpr(doc):
    """Identifiants d'images uniques dans tout le document (corps, en-têtes, pieds)."""
    n = 1
    for part in doc.part.package.iter_parts():
        el = getattr(part, "_element", None)
        if el is None:
            continue
        for d in el.iter(qn("wp:docPr")):
            d.set("id", str(n))
            n += 1


def install_brand_fonts(brand):
    """Installe les polices de la marque (brands/<id>/fonts/*.ttf|otf) pour le rendu PDF."""
    src = brand["_dir"] / "fonts"
    files = [f for f in src.glob("*") if f.suffix.lower() in (".ttf", ".otf")] if src.is_dir() else []
    if not files:
        return 0
    dest = Path.home() / ".local" / "share" / "fonts" / "pv-cc" / brand["id"]
    dest.mkdir(parents=True, exist_ok=True)
    for f in files:
        shutil.copy(f, dest / f.name)
    if shutil.which("fc-cache"):
        subprocess.run(["fc-cache", "-f", str(dest)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return len(files)


def no_space(paragraph, before=0, after=0):
    paragraph.paragraph_format.space_before = Pt(before)
    paragraph.paragraph_format.space_after = Pt(after)


# --------------------------------------------------------------------------- rendu du PV

class PV:
    def __init__(self, data, brand):
        self.d = data
        self.b = brand
        self.pal, self.neutre = brand_palette(brand)
        self.font = brand.get("police_texte") or "Arial"
        self.font_t = brand.get("police_titres") or self.font
        self.caps = bool(brand.get("titres_majuscules"))
        self.organe = brand.get("organe") or "conseil de copropriété"
        st = dict(STYLE_DEFAUT)
        st.update(brand.get("style") or {})
        self.st = st
        self.placeholders = set()
        self.doc = Document()
        self.acp = data.get("acp", {}) or {}
        self.reu = data.get("reunion", {}) or {}
        self.syn = data.get("syndic", {}) or {}
        self.actions = []

    # -- texte enrichi : **gras**, *italique*, [À COMPLÉTER …] surligné
    def rich(self, paragraph, text, size=10, color=None, bold=False, italic=False):
        color = color or self.pal["texte"]
        text = "" if text is None else str(text)
        tokens = re.split(r"(\*\*[^*]+\*\*|\*[^*]+\*|\[(?:À|A) COMPL[ÉE]TER[^\]]*\])", text, flags=re.IGNORECASE)
        for tok in tokens:
            if not tok:
                continue
            b, i, hl = bold, italic, False
            if tok.startswith("**") and tok.endswith("**") and len(tok) > 4:
                tok, b = tok[2:-2], True
            elif tok.startswith("*") and tok.endswith("*") and len(tok) > 2:
                tok, i = tok[1:-1], True
            elif PLACEHOLDER_RE.fullmatch(tok):
                hl = True
                self.placeholders.add(tok.strip())
            r = paragraph.add_run(tok)
            set_run_font(r, self.font, size, bold=b or hl, italic=i, color=color)
            if hl:
                r.font.highlight_color = WD_COLOR_INDEX.YELLOW
        return paragraph

    def para(self, text="", size=10, color=None, bold=False, italic=False, align=None, before=0, after=4):
        p = self.doc.add_paragraph()
        no_space(p, before, after)
        if align:
            p.alignment = align
        if text:
            self.rich(p, text, size, color, bold, italic)
        return p

    def titre(self, text):
        return text.upper() if self.caps else text

    # -- mise en page générale
    def setup(self):
        sec = self.doc.sections[0]
        sec.page_width, sec.page_height = Cm(21), Cm(29.7)
        sec.left_margin = sec.right_margin = Cm(2.0)
        sec.top_margin = Cm(2.3)
        sec.bottom_margin = Cm(2.2)
        sec.header_distance = Cm(0.9)
        sec.footer_distance = Cm(0.8)
        if self.st["pied"] == "bandeau":
            sec.bottom_margin = Cm(2.4 + self.st["pied_hauteur_cm"])
            sec.footer_distance = Cm(0.2)
        sec.different_first_page_header_footer = True

        st = self.doc.styles
        style_font(st["Normal"], self.font, 10, self.pal["texte"])
        st["Normal"].paragraph_format.space_after = Pt(4)
        st["Normal"].paragraph_format.line_spacing = 1.12
        for name, size, color, before, after in (
            ("Heading 1", 12.5, self.pal["primaire"], 14, 5),
            ("Heading 2", 10.5, self.pal["secondaire"], 8, 3),
        ):
            s = st[name]
            style_font(s, self.font_t, size, color, bold=True)
            s.paragraph_format.space_before = Pt(before)
            s.paragraph_format.space_after = Pt(after)
            s.paragraph_format.keep_with_next = True
        try:
            lb = st["List Bullet"]
            style_font(lb, self.font, 10, self.pal["texte"])
            lb.paragraph_format.space_after = Pt(2)
        except KeyError:
            pass

    def logo(self, container, which="logo", width_key="logo_largeur_cm", size_text=16, blanc=False):
        """Insère le logo ; renvoie sa hauteur en cm. blanc=True : version pour fond de couleur."""
        f = self.b.get(which) if blanc else (self.b.get(which) or self.b.get("logo"))
        p = container.add_paragraph() if hasattr(container, "add_paragraph") else container
        no_space(p)
        if f and (self.b["_dir"] / f).exists():
            path = self.b["_dir"] / f
            width = self.b.get(width_key) or self.b.get("logo_largeur_cm") or 4
            ratio = image_ratio(path)
            hmax = self.b.get("logo_hauteur_max_cm") or (1.4 if blanc else 2.0)
            if width * ratio > hmax:
                width = hmax / ratio
            p.add_run().add_picture(str(path), width=Cm(width))
            return width * ratio
        # Pas de logo fourni : nom de la marque en mot-symbole typographique.
        r = p.add_run(self.b.get("nom_affiche", ""))
        set_run_font(r, self.font_t, size_text, bold=True, color="#FFFFFF" if blanc else self.pal["primaire"])
        return size_text * 0.035

    def header_footer(self):
        sec = self.doc.sections[0]
        # En-tête page 1 : logo seul (le bloc titre est dans le corps).
        h1 = sec.first_page_header
        p = h1.paragraphs[0]
        no_space(p)
        if self.st["entete"] == "bandeau":
            hb = float(self.st["entete_hauteur_cm"])
            anchor_picture(p, band_png(self.pal.get(self.st["entete_couleur"], self.pal["primaire"]), 21.0, hb), 21.0, hb, 0, 0)
            logo_h = self.logo(p, "logo_sur_fond", "logo_sur_fond_largeur_cm", 18, blanc=True)
            spacer = h1.add_paragraph()
            no_space(spacer, 0, 0)
            spacer.paragraph_format.space_before = Pt(max(0.0, (hb + 0.5 - 0.9 - logo_h)) * 28.35)
        else:
            self.logo(p, "logo", "logo_largeur_cm", 18)
        # En-tête pages suivantes : petit logo + rappel du document.
        h = sec.header
        if self.st["entete"] == "bandeau":
            self.header_bandeau_suite(h)
            for footer in (sec.first_page_footer, sec.footer):
                self.footer(footer)
            return
        t = h.add_table(1, 2, Cm(17))
        table_borders(t, None)
        table_widths(t, [6, 11])
        c0, c1 = t.rows[0].cells
        self.logo(c0.paragraphs[0], "logo_entete", "logo_entete_largeur_cm", 11)
        rp = c1.paragraphs[0]
        rp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        no_space(rp)
        r = rp.add_run(self.rappel())
        set_run_font(r, self.font, 8, color=self.pal["texte_secondaire"])
        c1.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.BOTTOM
        if h.paragraphs and not h.paragraphs[0].text:
            no_space(h.paragraphs[0])
        para_border(h.add_paragraph(), "bottom", self.pal["filet"], 4, 1)

        for footer in (sec.first_page_footer, sec.footer):
            self.footer(footer)

    def rappel(self):
        txt = f"PV du {self.organe}"
        if self.acp.get("nom"):
            txt += f" — {self.acp['nom']}"
        if self.reu.get("date"):
            txt += f" — {fmt_date(self.reu['date'], long=False)}"
        return txt

    def header_bandeau_suite(self, h):
        """Pages 2+ des marques à bandeau : bandeau fin, logo blanc, rappel du document en blanc."""
        hb = 1.7
        p0 = h.paragraphs[0]
        no_space(p0)
        p0.paragraph_format.line_spacing = Pt(1)  # paragraphe porteur du bandeau : hauteur nulle
        coul = self.pal.get(self.st["entete_couleur"], self.pal["primaire"])
        anchor_picture(p0, band_png(coul, 21.0, hb), 21.0, hb, 0, 0)
        sec = self.doc.sections[0]
        t = h.add_table(1, 2, Cm(17))
        table_borders(t, None)
        table_widths(t, [6, 11])
        row = t.rows[0]
        trpr = row._tr.get_or_add_trPr()
        trh = OxmlElement("w:trHeight")
        # La ligne commence à header_distance (0,9 cm) : elle s'arrête au bas du bandeau.
        trh.set(qn("w:val"), str(int((hb - 0.9 - 0.05) / 2.54 * 1440)))
        trh.set(qn("w:hRule"), "exact")
        trpr.append(trh)
        c0, c1 = row.cells
        for c in (c0, c1):
            c.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
            cell_margins(c, 0, 0, 0, 0)
        pl = c0.paragraphs[0]
        no_space(pl)
        f = self.b.get("logo_sur_fond")
        if f and (self.b["_dir"] / f).exists():
            pl.add_run().add_picture(str(self.b["_dir"] / f), height=Cm(0.4))
        else:
            r = pl.add_run(self.b.get("nom_affiche", ""))
            set_run_font(r, self.font_t, 10, bold=True, color="#FFFFFF")
        pr = c1.paragraphs[0]
        pr.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        no_space(pr)
        r = pr.add_run(self.rappel())
        set_run_font(r, self.font, 8, color="#FFFFFF")
        sec.header_distance = Cm(0.9)

    def footer_lines(self):
        b = self.b
        l1 = [b.get("raison_sociale") or b.get("nom_affiche")]
        if b.get("adresse"):
            l1.append(b["adresse"])
        if b.get("bce"):
            l1.append(f"BCE {b['bce']}")
        if b.get("ipi"):
            l1.append(f"IPI {b['ipi']}")
        l2 = []
        tel = self.syn.get("telephone") or b.get("telephone")
        mail = self.syn.get("email") or b.get("email")
        if tel:
            l2.append(f"Tél. {tel}")
        if mail:
            l2.append(mail)
        if b.get("site"):
            l2.append(b["site"])
        lines = [" · ".join(x for x in l1 if x)]
        if l2:
            lines.append(" · ".join(l2))
        lines += list(b.get("mentions_pied") or [])
        return lines

    def footer(self, footer):
        if self.st["pied"] == "bandeau":
            return self.footer_bandeau(footer)
        p0 = footer.paragraphs[0]
        no_space(p0)
        para_border(p0, "top", self.pal["filet"], 4, 1)
        t = footer.add_table(1, 2, Cm(17))
        table_borders(t, None)
        table_widths(t, [14, 3])
        c0, c1 = t.rows[0].cells
        for i, line in enumerate(self.footer_lines()):
            p = c0.paragraphs[0] if i == 0 else c0.add_paragraph()
            no_space(p)
            r = p.add_run(line)
            set_run_font(r, self.font, 7.5, bold=(i == 0), color=self.pal["texte_secondaire"])
        pp = c1.paragraphs[0]
        pp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        no_space(pp)
        r = pp.add_run("Page ")
        set_run_font(r, self.font, 7.5, color=self.pal["texte_secondaire"])
        add_field(pp, "PAGE", self.font, 7.5, self.pal["texte_secondaire"])
        r = pp.add_run(" / ")
        set_run_font(r, self.font, 7.5, color=self.pal["texte_secondaire"])
        add_field(pp, "NUMPAGES", self.font, 7.5, self.pal["texte_secondaire"])

    def footer_bandeau(self, footer):
        """Mentions légales au-dessus d'un bandeau de couleur à fond perdu (logo blanc + numéro de page)."""
        hb = float(self.st["pied_hauteur_cm"])
        p0 = footer.paragraphs[0]
        no_space(p0)
        coul = self.pal.get(self.st["pied_couleur"], self.pal["primaire"])
        anchor_picture(p0, band_png(coul, 21.0, hb, self.st["pied_coins_arrondis"], hb / 2), 21.0, hb, 0, 29.7 - hb)
        for i, line in enumerate(self.footer_lines()):
            p = footer.add_paragraph()
            no_space(p, 0, 0)
            r = p.add_run(line)
            set_run_font(r, self.font, 7.5, bold=(i == 0), color=self.pal["texte_secondaire"])
        t = footer.add_table(1, 2, Cm(17))
        table_borders(t, None)
        table_widths(t, [12, 5])
        row = t.rows[0]
        trpr = row._tr.get_or_add_trPr()
        trh = OxmlElement("w:trHeight")
        trh.set(qn("w:val"), str(int((hb - 0.2) / 2.54 * 1440)))
        trh.set(qn("w:hRule"), "exact")
        trpr.append(trh)
        c0, c1 = row.cells
        for c in (c0, c1):
            c.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
            cell_margins(c, 0, 0, 0, 0)
        pl = c0.paragraphs[0]
        no_space(pl)
        f = self.b.get("logo_pied") or self.b.get("logo_sur_fond")
        if f and (self.b["_dir"] / f).exists():
            path = self.b["_dir"] / f
            h = min(0.42, hb * 0.38)
            pl.add_run().add_picture(str(path), height=Cm(h))
        else:
            r = pl.add_run(self.b.get("nom_affiche", ""))
            set_run_font(r, self.font_t, 10, bold=True, color="#FFFFFF")
        pp = c1.paragraphs[0]
        pp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        no_space(pp)
        for txt, fld in (("Page ", None), (None, "PAGE"), (" / ", None), (None, "NUMPAGES")):
            if fld:
                add_field(pp, fld, self.font, 8, "#FFFFFF")
            else:
                r = pp.add_run(txt)
                set_run_font(r, self.font, 8, color="#FFFFFF")

    # -- blocs
    def bloc_titre(self):
        if self.st["surtitre"]:
            p = self.para(before=6, after=2)
            r = p.add_run("PROCÈS-VERBAL")
            set_run_font(r, self.font_t, 9, bold=True, color=self.pal["secondaire"])
            char_spacing(r, 40)
        type_reu = self.reu.get("intitule") or f"Réunion du {self.organe}"
        p = self.para(before=0 if self.st["surtitre"] else 6, after=6)
        r = p.add_run(self.titre(type_reu))
        set_run_font(r, self.font_t, 19, bold=True, color=self.pal["primaire"])
        if self.st["accent_titre"]:
            # Filet court de couleur sous le titre : bordure basse d'un paragraphe vide de 2,2 cm.
            p.paragraph_format.space_after = Pt(0)
            pa = self.para(after=10)
            pa.paragraph_format.right_indent = Cm(17 - 2.2)
            para_border(pa, "bottom", self.pal["secondaire"], 30, 1)
            r = pa.add_run()
            r.font.size = Pt(2)
        nom = self.acp.get("nom") or "[À COMPLÉTER : nom de l'ACP]"
        prefix = "" if strip_accents(nom).lower().startswith(("acp", "association")) else "ACP "
        self.rich(self.para(after=1), f"{prefix}{nom}", 12.5, self.pal["texte"], bold=True)
        sub = []
        if self.acp.get("adresse"):
            sub.append(self.acp["adresse"])
        if self.acp.get("bce"):
            sub.append(f"BCE {self.acp['bce']}")
        if self.acp.get("reference"):
            sub.append(f"Réf. {self.acp['reference']}")
        p = self.para(" · ".join(sub), 9.5, self.pal["texte_secondaire"], after=8) if sub else self.para(after=8)
        para_border(p, "bottom", self.pal["filet"], 6, 6)

    def grille_infos(self):
        r = self.reu
        horaire = fmt_heure(r.get("heure_debut"))
        if r.get("heure_fin"):
            horaire = f"{horaire} – {fmt_heure(r['heure_fin'])}" if horaire else fmt_heure(r["heure_fin"])
        lieu = r.get("lieu") or ""
        if r.get("mode") and strip_accents(r["mode"]).lower() not in ("presentiel", ""):
            lieu = f"{lieu} ({r['mode']})" if lieu else str(r["mode"]).capitalize()
        syndic = self.b.get("raison_sociale") or self.b.get("nom_affiche")
        if self.syn.get("representant"):
            fct = f", {self.syn['fonction'].lower()}" if self.syn.get("fonction") else ""
            syndic += f", représentée par {self.syn['representant']}{fct}"
        rows = [
            ("Date", fmt_date(r.get("date")) or "[À COMPLÉTER : date]"),
            ("Horaire", horaire or "[À COMPLÉTER : heure]"),
            ("Lieu", lieu or "[À COMPLÉTER : lieu]"),
            ("Présidence de séance", self.d.get("president_seance") or ""),
            ("Secrétariat", self.d.get("secretaire") or ""),
            ("Syndic", syndic),
        ]
        rows = [x for x in rows if x[1]]
        t = self.doc.add_table(len(rows), 2)
        table_borders(t, self.pal["filet"], 4, inside_h=True, outer=False)
        table_widths(t, [4.2, 12.8])
        for i, (k, v) in enumerate(rows):
            a, b = t.rows[i].cells
            for c in (a, b):
                cell_margins(c, 50, 50, 80, 80)
            pa = a.paragraphs[0]
            no_space(pa)
            ra = pa.add_run(k)
            set_run_font(ra, self.font, 9, bold=True, color=self.pal["primaire"])
            pb = b.paragraphs[0]
            no_space(pb)
            self.rich(pb, v, 9.5)
        self.para(after=2)

    def h1(self, text):
        p = self.doc.add_paragraph(style="Heading 1")
        r = p.add_run(self.titre(text))
        set_run_font(r, self.font_t, 12.5, bold=True, color=self.pal["primaire"])
        return p

    def h2(self, text):
        p = self.doc.add_paragraph(style="Heading 2")
        self.rich(p, text, 10.5, self.pal["secondaire"], bold=True)
        return p

    def tableau(self, colonnes, lignes, widths=None, numero_col=False):
        n = len(colonnes)
        t = self.doc.add_table(1 + len(lignes), n)
        t.alignment = WD_TABLE_ALIGNMENT.CENTER
        table_borders(t, self.pal["filet"], 4, inside_h=True, inside_v=False, outer=True)
        if not widths:
            widths = [17 / n] * n
        table_widths(t, widths)
        hdr = t.rows[0]
        row_no_split(hdr, header=True)
        def est_montant_col(i):
            vals = [str(l[i]).strip() for l in lignes if i < len(l)]
            return any(MONTANT_RE.fullmatch(v) for v in vals) and all(
                MONTANT_RE.fullmatch(v) or v in ("", "—", "-") for v in vals)
        montant_cols = {i for i in range(n) if est_montant_col(i)}
        souligne = self.st["tableau_entete"] == "souligne"
        for i, c in enumerate(colonnes):
            cell = hdr.cells[i]
            if souligne:
                cell_borders(cell, bottom=(14, self.pal["secondaire"]))
            else:
                shade(cell, self.pal["entete_tableau"])
            cell_margins(cell, 50, 50, 80, 80)
            p = cell.paragraphs[0]
            no_space(p)
            if i in montant_cols:
                p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
            r = p.add_run(str(c))
            set_run_font(r, self.font, 8.5, bold=True,
                         color=self.pal["primaire"] if souligne else self.pal["texte_entete_tableau"])
        for j, ligne in enumerate(lignes, start=1):
            row = t.rows[j]
            row_no_split(row)
            for i in range(n):
                cell = row.cells[i]
                cell_margins(cell, 45, 45, 80, 80)
                if j % 2 == 0:
                    shade(cell, self.pal["fond_clair"])
                p = cell.paragraphs[0]
                no_space(p)
                val = ligne[i] if i < len(ligne) else ""
                if MONTANT_RE.fullmatch(str(val).strip()):
                    p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
                self.rich(p, val, 9)
        if len(t.rows) <= 12:
            # Petit tableau : ne pas le couper entre deux pages.
            for row in t.rows[:-1]:
                for cell in row.cells:
                    for cp in cell.paragraphs:
                        keep_with_next(cp)
        self.para(after=3)
        return t

    def encadre(self, label, text, actions=None):
        t = self.doc.add_table(1, 1)
        table_borders(t, None)
        table_widths(t, [17])
        cell = t.rows[0].cells[0]
        row_no_split(t.rows[0])
        variante = self.st["encadre"]
        if variante == "contour":
            cell_borders(cell, left=(8, self.pal["primaire"]), top=(8, self.pal["primaire"]),
                         bottom=(8, self.pal["primaire"]), right=(8, self.pal["primaire"]))
        elif variante == "fond_plein":
            shade(cell, self.pal["fond_clair"])
            cell_borders(cell, left=None, top=None, bottom=None, right=None)
        else:
            shade(cell, self.pal["fond_clair"])
            cell_borders(cell, left=(18, self.pal["secondaire"]), top=None, bottom=None, right=None)
        cell_margins(cell, 70, 70, 140, 100)
        p = cell.paragraphs[0]
        no_space(p, 0, 1)
        r = p.add_run(label)
        set_run_font(r, self.font, 8, bold=True, color=self.pal["secondaire"])
        char_spacing(r, 15)
        texts = text if isinstance(text, list) else [text]
        for tx in texts:
            pp = cell.add_paragraph()
            no_space(pp, 0, 1)
            self.rich(pp, tx, 10)
        if actions:
            # Suites à donner dans le même encadré : une ligne de tableau insécable,
            # donc jamais séparées de la position du conseil par un saut de page.
            pp = cell.add_paragraph()
            no_space(pp, 5, 1)
            r = pp.add_run("SUITES À DONNER")
            set_run_font(r, self.font, 8, bold=True, color=self.pal["secondaire"])
            char_spacing(r, 15)
            for it in actions:
                try:
                    pp = cell.add_paragraph(style="List Bullet")
                except KeyError:
                    pp = cell.add_paragraph()
                    it = f"– {it}"
                no_space(pp, 0, 1)
                self.rich(pp, it, 9.5)
        self.para(after=2)

    def puces(self, items, size=10):
        for it in items:
            try:
                p = self.doc.add_paragraph(style="List Bullet")
            except KeyError:
                p = self.doc.add_paragraph()
                it = f"– {it}"
            no_space(p, 0, 2)
            self.rich(p, it, size)

    def contenu(self, blocs):
        if isinstance(blocs, str):
            blocs = [blocs]
        for bl in blocs or []:
            if isinstance(bl, str):
                p = self.para(bl, after=4)
                if bl.rstrip().endswith(":"):
                    keep_with_next(p)
            elif "liste" in bl:
                if bl.get("intro"):
                    keep_with_next(self.para(bl["intro"], after=2))
                self.puces(bl["liste"])
            elif "tableau" in bl:
                tb = bl["tableau"]
                if tb.get("titre"):
                    keep_with_next(self.para(tb["titre"], 9.5, self.pal["primaire"], bold=True, after=2))
                self.tableau(tb["colonnes"], tb["lignes"], tb.get("largeurs_cm"))
            elif "sous_titre" in bl:
                self.h2(bl["sous_titre"])
            elif "texte" in bl:
                self.para(bl["texte"], after=4)

    def presences(self):
        parts = self.d.get("participants") or []
        invites = self.d.get("invites") or []
        self.h1("Présences")
        if parts:
            def k(x):
                pr = strip_accents(str(x.get("presence", "present"))).lower()
                for prefix, rang in (("present", 0), ("visio", 0), ("represent", 1), ("excus", 2), ("absent", 3)):
                    if pr.startswith(prefix):
                        return rang
                return 4

            avec_lot = any(x.get("lot") for x in parts)
            lignes = []
            for x in sorted(parts, key=k):
                pr = str(x.get("presence", "present"))
                pr_txt = PRESENCE.get(pr.lower(), pr)
                if x.get("represente_par"):
                    base = pr_txt if pr_txt.lower().startswith("représenté") else "Représenté(e)"
                    pr_txt = f"{base} par {x['represente_par']}"
                ligne = [x.get("nom", ""), x.get("qualite", "Membre du conseil")]
                if avec_lot:
                    ligne.append(x.get("lot", ""))
                lignes.append(ligne + [pr_txt])
            if avec_lot:
                self.tableau(["Membre du conseil", "Qualité", "Lot", "Présence"], lignes, [5.6, 4.4, 2.6, 4.4])
            else:
                self.tableau(["Membre du conseil", "Qualité", "Présence"], lignes, [6.6, 5, 5.4])
            tot = len(parts)
            pres = sum(1 for x in parts if strip_accents(str(x.get("presence", "present"))).lower().startswith(("present", "visio", "represent")))
            if self.d.get("afficher_quorum", True):
                self.para(f"{pres} membre{'s' if pres > 1 else ''} sur {tot} présent{'s' if pres > 1 else ''} ou représenté{'s' if pres > 1 else ''}.",
                          9.5, self.pal["texte_secondaire"], italic=True, after=4)
        else:
            self.para("[À COMPLÉTER : membres du conseil présents, excusés, absents]")
        if invites:
            keep_with_next(self.para("Assistent également à la réunion :", 10, bold=True, before=2, after=2))
            items = []
            for x in invites:
                s = x.get("nom", "")
                if x.get("qualite"):
                    s += f" ({x['qualite']})"
                if x.get("presence") and strip_accents(x["presence"]).lower() not in ("present", "presente"):
                    s += f" — {PRESENCE.get(x['presence'].lower(), x['presence'])}"
                items.append(s)
            self.puces(items)

    def ouverture(self):
        txt = self.d.get("ouverture")
        if not txt:
            h = fmt_heure(self.reu.get("heure_debut"))
            txt = "La séance est ouverte"
            if h:
                txt += f" à {h}"
            if self.d.get("president_seance"):
                txt += f" sous la présidence de {self.d['president_seance']}"
            txt += "."
        self.para(txt, before=6, after=4)
        if self.d.get("introduction"):
            self.contenu(self.d["introduction"])

    def points(self):
        pts = self.d.get("points") or []
        if not pts:
            return
        for n, pt in enumerate(pts, start=1):
            num = pt.get("numero", n)
            self.h1(f"{num}. {pt.get('titre', '')}")
            self.contenu(pt.get("contenu"))
            acts = pt.get("actions") or []
            items = []
            for a in acts:
                s = a.get("action", "")
                meta = [m for m in (a.get("responsable"), fmt_date(a.get("echeance"), long=False)) if m]
                if meta:
                    s += f" — *{' · '.join(meta)}*"
                items.append(s)
                self.actions.append((str(num), a))
            dec = pt.get("decision") or pt.get("position")
            if dec:
                label = pt.get("label_decision") or self.d.get("label_decision") or "POSITION DU CONSEIL"
                self.encadre(label.upper(), dec, items)
            elif items:
                keep_with_next(self.para("Suites à donner :", 9.5, self.pal["primaire"], bold=True, before=2, after=2))
                self.puces(items, 9.5)

    def recap_actions(self):
        if not self.actions or self.d.get("recapitulatif_actions") is False:
            return
        self.h1("Récapitulatif des actions")
        lignes = []
        for num, a in self.actions:
            lignes.append([num, a.get("action", ""), a.get("responsable", ""),
                           fmt_date(a.get("echeance"), long=False) or "—", a.get("statut", "À faire")])
        self.tableau(["Pt", "Action", "Responsable", "Échéance", "Statut"], lignes, [1.1, 8.1, 3.2, 2.3, 2.3])

    def cloture(self):
        nx = self.d.get("prochaine_reunion")
        if nx:
            self.h1("Prochaine réunion")
            if isinstance(nx, str):
                self.para(nx)
            else:
                s = f"La prochaine réunion du {self.organe} est fixée au "
                s += fmt_date(nx.get("date")) or "[À COMPLÉTER : date]"
                if nx.get("heure"):
                    s += f" à {fmt_heure(nx['heure'])}"
                if nx.get("lieu"):
                    s += f", {nx['lieu']}"
                s += "."
                self.para(s)
        txt = self.d.get("cloture_texte")
        if not txt:
            h = fmt_heure(self.d.get("cloture") or self.reu.get("heure_fin"))
            txt = "L'ordre du jour étant épuisé, la séance est levée"
            txt += f" à {h}." if h else "."
        self.para(txt, before=10, after=8)

    def signatures(self):
        sig = self.d.get("signataires")
        if sig is False:
            return
        if not sig:
            sig = []
            pres = next((x for x in self.d.get("participants") or [] if "presid" in strip_accents(str(x.get("qualite", ""))).lower()), None)
            q = strip_accents(str(pres.get("qualite", ""))).lower() if pres else ""
            titre = "Présidente" if q.startswith("presidente") else ("Président" if q.startswith("president") else "Président(e)")
            sig.append({"role": f"{titre} du {self.organe}", "nom": pres.get("nom") if pres else ""})
            sig.append({"role": "Pour le syndic", "nom": self.syn.get("representant", "")})
        sig = [s if isinstance(s, dict) else {"role": "", "nom": s} for s in sig]
        keep_with_next(self.para(self.titre("Signatures"), 10, self.pal["primaire"], bold=True, before=6, after=4))
        cols = 2
        rows = (len(sig) + cols - 1) // cols
        t = self.doc.add_table(rows, cols)
        table_borders(t, None)
        table_widths(t, [8.5, 8.5])
        for i, s in enumerate(sig):
            cell = t.rows[i // cols].cells[i % cols]
            row_no_split(t.rows[i // cols])
            cell_margins(cell, 60, 60, 80, 200)
            p = cell.paragraphs[0]
            no_space(p, 0, 1)
            r = p.add_run(s.get("role", ""))
            set_run_font(r, self.font, 8.5, bold=True, color=self.pal["primaire"])
            p = cell.add_paragraph()
            no_space(p, 0, 22)
            self.rich(p, s.get("nom", ""), 9.5)
            p = cell.add_paragraph()
            no_space(p, 0, 8)
            para_border(p, "bottom", self.pal["filet"], 6, 1)

    def annexes(self):
        ann = self.d.get("annexes") or []
        if ann:
            keep_with_next(self.para("Annexes :", 9.5, self.pal["primaire"], bold=True, before=10, after=2))
            self.puces(ann, 9.5)
        if self.d.get("diffusion"):
            self.para(f"Diffusion : {self.d['diffusion']}", 8.5, self.pal["texte_secondaire"], italic=True, before=6)

    def build(self, out):
        self.setup()
        self.header_footer()
        self.bloc_titre()
        self.grille_infos()
        self.presences()
        self.ouverture()
        self.points()
        self.recap_actions()
        self.cloture()
        self.signatures()
        self.annexes()
        core = self.doc.core_properties
        core.title = f"PV du {self.organe} — {self.acp.get('nom', '')}".strip(" —")
        core.author = self.b.get("raison_sociale") or self.b.get("nom_affiche")
        core.subject = f"Procès-verbal de réunion du {self.organe}"
        renumber_docpr(self.doc)
        self.doc.save(out)


# --------------------------------------------------------------------------- sortie

def to_pdf(docx_path):
    exe = shutil.which("soffice") or shutil.which("libreoffice")
    if not exe:
        return None
    outdir = docx_path.parent
    try:
        subprocess.run([exe, "--headless", "--convert-to", "pdf", "--outdir", str(outdir), str(docx_path)],
                       check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=180)
    except (subprocess.SubprocessError, OSError):
        return None
    pdf = docx_path.with_suffix(".pdf")
    return pdf if pdf.exists() else None


def render(pdf, outdir):
    outdir = Path(outdir)
    outdir.mkdir(parents=True, exist_ok=True)
    if not shutil.which("pdftoppm"):
        print("pdftoppm absent : pas d'aperçu PNG.")
        return []
    subprocess.run(["pdftoppm", "-png", "-r", "70", str(pdf), str(outdir / "page")], check=True)
    return sorted(outdir.glob("page-*.png"))


def main():
    ap = argparse.ArgumentParser(description="Génère un PV de conseil de copropriété à la charte de la marque.")
    ap.add_argument("json", nargs="?", help="fichier JSON du PV (voir references/schema.md)")
    ap.add_argument("-o", "--out", help="chemin .docx ou dossier de sortie")
    ap.add_argument("--marque", help="force la marque (sinon champ « marque » du JSON)")
    ap.add_argument("--no-pdf", action="store_true", help="ne pas produire le PDF")
    ap.add_argument("--render", metavar="DOSSIER", help="exporte un aperçu PNG des pages pour le QA")
    ap.add_argument("--list-brands", action="store_true", help="liste les marques disponibles")
    a = ap.parse_args()

    if a.list_brands:
        list_brands()
        return
    if not a.json:
        ap.error("fichier JSON requis")

    data = json.loads(Path(a.json).read_text(encoding="utf-8"))
    brands = load_brands()
    brand = resolve_brand(a.marque or data.get("marque") or "emeria", brands)

    acp = (data.get("acp") or {}).get("nom") or "acp"
    date = (data.get("reunion") or {}).get("date") or "sans-date"
    name = f"PV_CC_{slug(acp)}_{slug(date)}.docx"
    if a.out:
        out = Path(a.out)
        if out.suffix.lower() != ".docx":
            out.mkdir(parents=True, exist_ok=True)
            out = out / name
    else:
        out = Path(a.json).resolve().parent / name
    out.parent.mkdir(parents=True, exist_ok=True)

    ent = data.get("entite")
    if ent:
        entites = brand.get("entites") or {}
        cle = next((k for k in entites if strip_accents(k).lower() == strip_accents(str(ent)).lower()), None)
        if cle is None:
            sys.exit(f"Entité « {ent} » inconnue pour {brand['nom_affiche']}. Entités : {', '.join(entites) or 'aucune'}")
        brand = {**brand, **entites[cle]}
    pv = PV(data, brand)
    pv.build(out)
    print(f"DOCX : {out}")

    warnings = []
    if pv.neutre:
        warnings.append(f"Charte de « {brand['nom_affiche']} » non renseignée : rendu neutre (gris), sans couleurs de marque.")
    if not (brand.get("logo") and (brand["_dir"] / brand["logo"]).exists()):
        warnings.append(f"Pas de logo pour « {brand['nom_affiche']} » : nom de la marque affiché en texte.")
    if brand.get("statut_charte") != "complete":
        for v in brand.get("a_verifier", []):
            warnings.append(f"À vérifier ({brand['nom_affiche']}) : {v}")
    if pv.placeholders:
        warnings.append(f"{len(pv.placeholders)} information(s) à compléter (surlignées en jaune) : "
                        + " ; ".join(sorted(pv.placeholders)))

    pdf = None
    if not a.no_pdf or a.render:
        install_brand_fonts(brand)
        pdf = to_pdf(out)
        print(f"PDF  : {pdf}" if pdf else "PDF  : non généré (LibreOffice indisponible)")
    if a.render and pdf:
        pages = render(pdf, a.render)
        print(f"QA   : {len(pages)} page(s) -> {a.render}")
    for w in warnings:
        print(f"ATTENTION : {w}")


if __name__ == "__main__":
    main()
