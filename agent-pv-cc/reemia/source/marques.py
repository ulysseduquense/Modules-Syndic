# Données des 8 chartes pour la version Reemia (HTML imprimable). Sert à générer les skills « chartes »
# et les PV de test. Valeurs reprises de brands/<id>/brand.json (relevé du 05/11/2026).
import base64
from pathlib import Path

LOGOS = Path(__file__).parent / "logos"


def mix(h, p):
    h = h.lstrip("#")
    c = [int(h[i:i + 2], 16) for i in (0, 2, 4)]
    return "#" + "".join(f"{round(x * (1 - p) + 255 * p):02X}" for x in c)


def data_uri(name):
    f = LOGOS / name
    raw = f.read_bytes()
    if f.suffix == ".svg":
        s = raw.decode("utf-8").strip().replace('"', "'")
        s = s.replace("%", "%25").replace("#", "%23").replace("<", "%3C").replace(">", "%3E").replace("\n", " ")
        return f"data:image/svg+xml,{s}"
    mime = {"png": "image/png", "webp": "image/webp"}[f.suffix[1:]]
    return f"data:{mime};base64,{base64.b64encode(raw).decode()}"


P = "Page "
FR = {"surtitre": "Procès-verbal", "titre": "Réunion du conseil de copropriété", "rappel": "PV du conseil de copropriété"}

M = {
 "op": dict(nom="Office des Propriétaires (OP)", site="op.be", langue="fr",
    fonts="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Source+Serif+4:ital,wght@1,400&display=swap",
    v=dict(primaire="#1C242B", secondaire="#D44036", accent="#D44036", texte="#1C242B", texte2="#333333",
           fond="#F6F3EF", filet="#E2DAD0", th="#1C242B", th_txt="#FFFFFF", texte_pied="#333333",
           titres="'Inter', Arial, sans-serif", texte_f="'Inter', Arial, sans-serif", accent_f="'Source Serif 4', Georgia, serif",
           surtitre_f="'Inter', Arial, sans-serif", g_titre=400, g_h2=700, ech=1, interligne=1.32),
    p1="blanc", logo_p1=("op_logo.svg", "15.5mm", "19.6mm"), suite="blanc", logo_suite=("op_logo.svg", "6.2mm", "7.8mm"),
    pied="filet", pied_fond="#FFFFFF", pied_h="17mm", page_couleur="#333333", logo_pied=None,
    filet_accent=None, point=False, acp_accent=True, majuscules=False, nb_logo_classes=1,
    mentions=["Office des Propriétaires SA · Rue Vilain XIIII 53-55, 1000 Bruxelles · TVA BE 0841.885.269 · IPI n° 508 167",
              "Tél. +32 2 626 08 26 · reception@op.be · op.be",
              "Autorité de contrôle : Institut Professionnel de l'Immobilier (IPI), rue du Luxembourg 16B, 1000 Bruxelles · RC professionnelle : Axa, police n° 730.390.160"]),
 "syncura": dict(nom="Syncura", site="syncura.be", langue="nl",
    fonts="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;700;800&display=swap",
    v=dict(primaire="#211747", secondaire="#CF4861", accent="#CF4861", texte="#211747", texte2=mix("#211747", .28),
           fond="#F6F5F7", filet="#EBE6FF", th="#211747", th_txt="#FFFFFF", texte_pied="#FFFFFF",
           titres="'Hanken Grotesk', Arial, sans-serif", texte_f="'Hanken Grotesk', Arial, sans-serif", accent_f="'Hanken Grotesk', Arial, sans-serif",
           surtitre_f="'Hanken Grotesk', Arial, sans-serif", g_titre=800, g_h2=800, ech=1, interligne=1.3),
    p1="pastille", p1_h="30mm", entete_fond="linear-gradient(116.56deg, #211747 62.72%, #985192 117.11%)",
    logo_p1=("syncura_logo.webp", "32mm", "9.6mm"), suite="bandeau", logo_suite=("syncura_syncura-logo-white.svg", "16mm", "4.8mm"),
    pied="bandeau", pied_fond="#211747", pied_h="21mm", page_couleur="#FFFFFF", logo_pied=("syncura_syncura-logo-white.svg", "24mm", "7.4mm"),
    filet_accent=None, point=False, acp_accent=False, majuscules=False,
    mentions=["Syncura (VM Vastgoedbeheer BV) · Poortakkerstraat 91/501, 9051 Gent · RPR Gent 0437.396.556",
              "Tel. +32 9 280 80 34 · gent@syncura.be · syncura.be",
              "Guillaume Pinte (BIV 508167) · BA en borgstelling: NV AXA Belgium, polisnr. 730.390.160",
              "In geval van nood: +32 9 280 80 30"]),
 "easy-syndic": dict(nom="Easy Syndic", site="easysyndic.be", langue="fr",
    fonts="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;700;900&display=swap",
    v=dict(primaire="#211746", secondaire="#18A2AC", accent="#FF832E", texte="#211746", texte2=mix("#211746", .28),
           fond="#F5EBE4", filet=mix("#211746", .78), th="#211746", th_txt="#FFFFFF", texte_pied="#FFFFFF",
           titres="'Hanken Grotesk', Arial, sans-serif", texte_f="'Hanken Grotesk', Arial, sans-serif", accent_f="'Hanken Grotesk', Arial, sans-serif",
           surtitre_f="'Hanken Grotesk', Arial, sans-serif", g_titre=900, g_h2=900, ech=1, interligne=1.3),
    p1="blanc", logo_p1=("easy-syndic_logo.svg", "46mm", "11.2mm"), suite="blanc", logo_suite=("easy-syndic_logo.svg", "28mm", "6.8mm"),
    pied="bandeau", pied_fond="#211746", pied_h="18mm", page_couleur="#FFFFFF", logo_pied=("easy-syndic_logo-white.svg", "30mm", "7.2mm"),
    filet_accent="32mm", point=False, acp_accent=False, majuscules=False,
    mentions=["Easy Syndic SRL · Rue Vilain XIIII 53-55, 1000 Bruxelles · BE 0506.828.166",
              "Tél. +32 2 219 04 51 · info@easysyndic.be · easysyndic.be",
              "IPI : Guillaume Pinte 508167 · Luc Vander Meeren 200957 · Léandre Harmegnies 512354"]),
 "gestea": dict(nom="Gestea", site="gestea.be", langue="fr", fonts=None,
    v=dict(primaire="#111827", secondaire="#C04332", accent="#C04332", texte="#111827", texte2=mix("#111827", .28),
           fond=mix("#111827", .93), filet=mix("#111827", .78), th="#1E1F1F", th_txt="#FFFFFF", texte_pied="#FFFFFF",
           titres="Arial, Helvetica, sans-serif", texte_f="Arial, Helvetica, sans-serif", accent_f="Arial, sans-serif",
           surtitre_f="Arial, Helvetica, sans-serif", g_titre=700, g_h2=700, ech=1, interligne=1.3),
    p1="blanc", logo_p1=("gestea_logo.webp", "46mm", "12mm"), suite="blanc", logo_suite=("gestea_logo.webp", "28mm", "7.3mm"),
    pied="bandeau", pied_fond="#1E1F1F", pied_h="18mm", page_couleur="#FFFFFF", logo_pied=("gestea_logo-blanc.webp", "28mm", "7.3mm"),
    filet_accent=None, point=True, acp_accent=False, majuscules=False,
    mentions=["Gestea SRL · Rue Vilain XIIII 53-55, 1000 Bruxelles · BCE 0846.809.505 · IPI 508.167",
              "Tél. 02 779 09 90 · syndic@gestea.be · gestea.be",
              "Agent immobilier agréé IPI (Belgique) · Autorité de surveillance : IPI, rue du Luxembourg 16 B, 1000 Bruxelles"]),
 "agigest": dict(nom="Agigest (Luxembourg)", site="agigest.lu", langue="fr", fonts="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&display=swap",
    v=dict(primaire="#243853", secondaire="#0059A6", accent="#77E8CA", texte="#243853", texte2="#3B4C66",
           fond="#E6E9EB", filet="#D0D0D0", th="#0059A6", th_txt="#FFFFFF", texte_pied="#243853",
           titres="'Cormorant Garamond', Georgia, serif", texte_f="Arial, Helvetica, sans-serif", accent_f="Arial, sans-serif",
           surtitre_f="Arial, Helvetica, sans-serif", g_titre=600, g_h2=600, ech=1.25, interligne=1.3),
    p1="blanc", logo_p1=("agigest_logo.webp", "46mm", "12.9mm"), suite="blanc", logo_suite=("agigest_logo.webp", "28mm", "7.9mm"),
    pied="bandeau", pied_fond="#D0D0D0", pied_h="18mm", page_couleur="#243853", logo_pied=None,
    filet_accent="36mm", point=False, acp_accent=False, majuscules=False,
    mentions=["AGIGEST S.A. · 55, rue de Luxembourg, L-8077 Bertrange",
              "Tél. (+352) 203 047 00 · info@agigest.lu · agigest.lu",
              "TVA LU 19153507 · RCS Luxembourg B87094"]),
 "noblue": dict(nom="Noblué", site="syndic-noblue.be", langue="fr", fonts="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;700&display=swap",
    v=dict(primaire="#000085", secondaire="#000085", accent="#FFB81C", texte="#515162", texte2="#8C8C8C",
           fond="#F5F5F6", filet=mix("#000085", .78), th="#000085", th_txt="#FFFFFF", texte_pied="#FFFFFF",
           titres="'Hanken Grotesk', Arial, sans-serif", texte_f="'Hanken Grotesk', Arial, sans-serif", accent_f="'Hanken Grotesk', Arial, sans-serif",
           surtitre_f="'Hanken Grotesk', Arial, sans-serif", g_titre=700, g_h2=700, ech=1, interligne=1.3),
    p1="bandeau", p1_h="27mm", entete_fond="#000085", logo_p1=("noblue_logo.svg", "44mm", "16.3mm"),
    suite="bandeau", logo_suite=("noblue_logo.svg", "13mm", "4.8mm"),
    pied="bandeau", pied_fond="#000085", pied_h="22mm", page_couleur="#FFFFFF", logo_pied=("noblue_logo.svg", "22mm", "8.2mm"),
    filet_accent="26mm", point=False, acp_accent=False, majuscules=False,
    mentions=["Noblué Immobilier SRL · Rue de Battice 46, 4800 Petit-Rechain · TVA BE 0466.867.532 · IPI 513.309",
              "Tél. 087/44 64 09 · syndic@noblue.be · syndic-noblue.be",
              "Agent immobilier intermédiaire, syndic et régisseur · Autorité de surveillance : IPI, rue du Luxembourg 16b, 1000 Bruxelles",
              "RC professionnelle et cautionnement via AXA Belgium SA – police n° 730.390.160"]),
 "dr-syndic": dict(nom="DR Syndic", site="drsyndic.be", langue="fr", fonts=None,
    v=dict(primaire="#15223F", secondaire="#B98F4E", accent="#B98F4E", texte="#1B2436", texte2="#5C6678",
           fond="#F5F0E8", filet="#E4DDD1", th="#15223F", th_txt="#FFFFFF", texte_pied="#C7CFDD",
           titres="'Palatino Linotype', Palatino, 'Book Antiqua', 'TeX Gyre Pagella', Georgia, serif", texte_f="Arial, Helvetica, sans-serif",
           accent_f="Arial, sans-serif", surtitre_f="Arial, Helvetica, sans-serif", g_titre=700, g_h2=700, ech=1, interligne=1.3),
    p1="bandeau", p1_h="28mm", entete_fond="#15223F", logo_p1=("dr-syndic_logo-blanc.webp", "30mm", "14.8mm"),
    suite="bandeau", logo_suite=("dr-syndic_logo-blanc.webp", "12mm", "5.9mm"),
    pied="bandeau", pied_fond="#15223F", pied_h="22mm", page_couleur="#C7CFDD", logo_pied=("dr-syndic_logo-blanc.webp", "20mm", "9.9mm"),
    filet_accent="24mm", point=False, acp_accent=False, majuscules=False,
    mentions=["DR Syndic SRL · Rue des Brasseurs 1, 4500 Huy · TVA BE 0740.869.271 · IPI 800.039",
              "Tél. 085/25.47.28 – 0491/91.42.70 · info@drsyndic.be · drsyndic.be",
              "Bureau de Liège : Rue Charles Magnette 24/40, 4000 Liège",
              "Agréée IPI comme agent immobilier intermédiaire et syndic · RC professionnelle et cautionnement : AXA Belgium SA, police n° 730.390.160"]),
 "emeria": dict(nom="Emeria", site="emeriagroup.com", langue="fr", fonts=None,
    v=dict(primaire="#06187D", secondaire="#2440FF", accent="#2440FF", texte="#06187D", texte2="#262D98",
           fond="#F1F5FF", filet="#D1DFFF", th="#262D98", th_txt="#FFFFFF", texte_pied="#FFFFFF",
           titres="Arial, Helvetica, sans-serif", texte_f="Arial, Helvetica, sans-serif", accent_f="Arial, sans-serif",
           surtitre_f="Arial, Helvetica, sans-serif", g_titre=700, g_h2=700, ech=1, interligne=1.3),
    p1="blanc", logo_p1=("emeria_logo.webp", "42mm", "12.5mm"), suite="bandeau", entete_fond="#06187D", logo_suite=("emeria_logo-blanc.webp", "20mm", "3.5mm"),
    pied="bandeau", pied_fond="#06187D", pied_h="15mm", page_couleur="#FFFFFF", logo_pied=("emeria_logo-blanc.webp", "24mm", "4.2mm"),
    filet_accent=None, point=False, acp_accent=False, majuscules=True, pied_rayon="6.5mm",
    mentions=["Emeria", "Tél. [téléphone du gestionnaire] · [e-mail du gestionnaire] · emeriagroup.com"]),
}


def logo_classes(m):
    """Une classe CSS par fichier logo, définie une seule fois (data URI)."""
    files = []
    for k in ("logo_p1", "logo_suite", "logo_pied"):
        if m.get(k) and m[k][0] not in files:
            files.append(m[k][0])
    names = {f: f"logo-{i + 1}" for i, f in enumerate(files)}
    css = "\n".join(f'.{names[f]}{{background-image:url("{data_uri(f)}")}}' for f in files)
    return names, css


def bloc_style(bid):
    m = M[bid]
    v = m["v"]
    names, logos_css = logo_classes(m)
    lp1 = m["logo_p1"]; ls = m["logo_suite"]; lpied = m.get("logo_pied")
    haut_h = "17mm"
    pied_h = m["pied_h"]
    p1_h = m.get("p1_h", haut_h)
    page = "Pagina " if m["langue"] == "nl" else "Page "
    font_num = v["texte_f"].replace("'", '"')
    fond = m["pied_fond"]
    root = f""":root{{--primaire:{v['primaire']};--secondaire:{v['secondaire']};--accent:{v['accent']};--texte:{v['texte']};--texte-2:{v['texte2']};
--fond-clair:{v['fond']};--filet:{v['filet']};--entete-tableau:{v['th']};--texte-entete-tableau:{v['th_txt']};--texte-pied:{v['texte_pied']};
--entete-fond:{m.get('entete_fond', v['primaire'])};--pied-fond:{fond};
--police-titres:{v['titres']};--police-texte:{v['texte_f']};--police-accent:{v['accent_f']};--police-surtitre:{v['surtitre_f']};
--graisse-titre:{v['g_titre']};--graisse-h2:{v['g_h2']};--echelle-titres:{v['ech']};--interligne:{v['interligne']};
--haut-h:{haut_h};--esp-haut:24mm;--pied-h:{pied_h};--esp-bas:calc({pied_h} + 6mm);--p1-h:{p1_h};--pastille-h:15.5mm;
--filet-accent-l:{m.get('filet_accent') or '0'};
--logo-p1-l:{lp1[1]};--logo-p1-h:{lp1[2]};--logo-suite-l:{ls[1]};--logo-suite-h:{ls[2]};--logo-pied-l:{lpied[1] if lpied else '0'};--logo-pied-h:{lpied[2] if lpied else '0'}}}"""
    page_css = (f"@page{{size:A4;margin:0 0 7mm 0;"
                + "".join(f"@{b}{{background:{fond};content:\"\"}}" for b in ("bottom-left-corner", "bottom-left", "bottom-center", "bottom-right-corner"))
                + f"@bottom-right{{background:{fond};content:\"{page}\" counter(page) \" / \" counter(pages);color:{m['page_couleur']};"
                f"font:7.5pt {font_num};text-align:right;vertical-align:top;padding-right:20mm}}}}")
    extra = []
    if m["majuscules"]:
        extra.append("h1.titre,h2.section{text-transform:uppercase}")
    if m.get("pied_rayon"):
        extra.append(f".pied{{border-top-right-radius:{m['pied_rayon']}}}")
    font_link = f'<link rel="stylesheet" href="{m["fonts"]}">\n' if m["fonts"] else ""
    style = f"<style>\n{root}\n{page_css}\n{logos_css}\n" + ("\n".join(extra) + "\n" if extra else "") + "</style>"
    return font_link + style, names


def fragments(bid, rappel="[RAPPEL]", mentions=None):
    m = M[bid]
    names, _ = logo_classes(m)
    mentions = mentions or m["mentions"]
    lp1 = names[m["logo_p1"][0]]
    if m["p1"] == "blanc":
        p1 = f'<header class="entete-p1 p1-blanc"><div class="logo {lp1}" role="img" aria-label="{m["nom"]}"></div></header>'
    elif m["p1"] == "pastille":
        p1 = f'<header class="entete-p1 p1-bandeau"><div class="pastille"><div class="logo {lp1}" role="img" aria-label="{m["nom"]}"></div></div></header>'
    else:
        p1 = f'<header class="entete-p1 p1-bandeau"><div class="logo {lp1}" role="img" aria-label="{m["nom"]}"></div></header>'
    ls = names[m["logo_suite"][0]]
    suite = f'<div class="haut-suite suite-{m["suite"]}"><div class="logo {ls}"></div><div class="rappel">{rappel}</div></div>'
    lignes = "".join(f"<p>{x}</p>" for x in mentions)
    lp = f'<div class="logo {names[m["logo_pied"][0]]}"></div>' if m.get("logo_pied") else ""
    pied = f'<div class="pied pied-{m["pied"]}"><div class="mentions">{lignes}</div>{lp}</div>'
    return p1, suite, pied
