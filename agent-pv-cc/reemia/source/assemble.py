# Simule la sortie de l'agent Reemia : PV d'exemple assemblé selon le gabarit (CSS commun + bloc marque).
import json, re, sys, html
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from marques import M, bloc_style, fragments

SK = Path(__file__).resolve().parents[2] / "pv-conseil-copropriete"
CSS = (Path(__file__).parent / "commun.css").read_text()
MOIS = "janvier février mars avril mai juin juillet août septembre octobre novembre décembre".split()
MAAND = "januari februari maart april mei juni juli augustus september oktober november december".split()
JOURS = "lundi mardi mercredi jeudi vendredi samedi dimanche".split()
DAGEN = "maandag dinsdag woensdag donderdag vrijdag zaterdag zondag".split()
import datetime as dt


def e(s):
    s = html.escape(str(s), quote=False)
    s = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"\[(À COMPLÉTER|AAN TE VULLEN)([^\]]*)\]", r'<mark class="a-completer">[\1\2]</mark>', s)
    return s


def fdate(iso, nl, long=True):
    d = dt.date.fromisoformat(iso)
    if not long:
        return d.strftime("%d/%m/%Y")
    if nl:
        return f"{DAGEN[d.weekday()]} {d.day} {MAAND[d.month-1]} {d.year}"
    return f"{JOURS[d.weekday()]} {d.day} {MOIS[d.month-1]} {d.year}"


def h(x, nl):
    return x.replace(":", "u" if nl else "h")


MONTANT = re.compile(r"^-?[\d.]+(,\d{2})? ?€")


def tableau(cols, lignes):
    numc = {i for i in range(len(cols)) if all(MONTANT.match(str(l[i])) or l[i] in ("", "—") for l in lignes) and any(MONTANT.match(str(l[i])) for l in lignes)}
    th = "".join(f'<th{" class=\"num\"" if i in numc else ""}>{e(c)}</th>' for i, c in enumerate(cols))
    rows = "".join("<tr>" + "".join(f'<td{" class=\"num\"" if i in numc else ""}>{e(v)}</td>' for i, v in enumerate(l)) + "</tr>" for l in lignes)
    return f'<table class="donnees"><thead><tr>{th}</tr></thead><tbody>{rows}</tbody></table>'


def contenu(blocs):
    out = []
    for b in blocs or []:
        if isinstance(b, str):
            out.append(f"<p>{e(b)}</p>")
        elif "liste" in b:
            if b.get("intro"):
                out.append(f'<p class="intro-liste">{e(b["intro"])}</p>')
            out.append("<ul>" + "".join(f"<li>{e(x)}</li>" for x in b["liste"]) + "</ul>")
        elif "tableau" in b:
            t = b["tableau"]
            if t.get("titre"):
                out.append(f'<p class="titre-tableau">{e(t["titre"])}</p>')
            out.append(tableau(t["colonnes"], t["lignes"]))
    return out


def build(bid, json_path, organe=None, lu=False):
    m = M[bid]
    nl = m["langue"] == "nl"
    d = json.loads(Path(json_path).read_text())
    T = dict(surtitre="Verslag" if nl else "Procès-verbal",
             titre="Vergadering van de raad van mede-eigendom" if nl else ("Réunion du conseil syndical" if lu else "Réunion du conseil de copropriété"),
             rappel="Verslag raad van mede-eigendom" if nl else ("PV du conseil syndical" if lu else "PV du conseil de copropriété"))
    acp = d["acp"]
    rappel = f'{T["rappel"]} — {acp["nom"]} — {fdate(d["reunion"]["date"], nl, False)}'
    style, _ = bloc_style(bid)
    syn = d.get("syndic", {})
    mentions = list(m["mentions"])
    if bid == "emeria":
        mentions[1] = f'Tél. {syn.get("telephone")} · {syn.get("email")} · emeriagroup.com'
    p1, suite, pied = fragments(bid, e(rappel), mentions)
    c = []
    c.append(f'<p class="surtitre">{T["surtitre"]}</p>')
    c.append(f'<h1 class="titre">{T["titre"]}' + ('<span class="point">.</span>' if m["point"] else "") + "</h1>")
    if m.get("filet_accent"):
        c.append('<div class="filet-accent"></div>')
    nom = acp["nom"] if (lu or nl and acp["nom"].lower().startswith("vme")) else (("VME " if nl else "ACP ") + acp["nom"])
    c.append(f'<p class="acp{" accent" if m["acp_accent"] else ""}">{e(nom)}</p>')
    sous = [acp.get("adresse")] + ([("KBO " if nl else "BCE ") + acp["bce"]] if acp.get("bce") and not lu else [])
    c.append(f'<p class="acp-sous">{" · ".join(e(x) for x in sous if x)}</p>')
    r = d["reunion"]
    L = (["Datum", "Uur", "Plaats", "Voorzitter van de vergadering", "Secretariaat", "Syndicus"] if nl else
         ["Date", "Horaire", "Lieu", "Présidence de séance", "Secrétariat", "Syndic"])
    synd = m["mentions"][0].split(" · ")[0]
    synd += (", vertegenwoordigd door " if nl else ", représentée par ") + syn["representant"] + (", " + syn["fonction"].lower() if syn.get("fonction") else "")
    vals = [fdate(r["date"], nl), f'{h(r["heure_debut"], nl)} – {h(r["heure_fin"], nl)}', r["lieu"], d.get("president_seance"), d.get("secretaire"), synd]
    c.append('<table class="infos">' + "".join(f"<tr><th>{k}</th><td>{e(v)}</td></tr>" for k, v in zip(L, vals) if v) + "</table>")
    c.append(f'<h2 class="section">{"Aanwezigheden" if nl else "Présences"}</h2>')
    cols = ["Lid van de raad", "Hoedanigheid", "Kavel", "Aanwezigheid"] if nl else ["Membre du conseil", "Qualité", "Lot", "Présence"]
    rows = [[p["nom"], p["qualite"], p.get("lot", ""), p["presence"].capitalize()] for p in d["participants"]]
    c.append(tableau(cols, rows))
    pres = sum(1 for p in d["participants"] if not re.match(r"excus|absent|verontsch|afwez", p["presence"]))
    c.append(f'<p class="quorum">{pres} van de {len(rows)} leden aanwezig of vertegenwoordigd.</p>' if nl else f'<p class="quorum">{pres} membres sur {len(rows)} présents ou représentés.</p>')
    if d.get("invites"):
        c.append(f'<p class="intro-liste">{"Wonen de vergadering eveneens bij:" if nl else "Assistent également à la réunion :"}</p><ul>' + "".join(f'<li>{e(i["nom"])} ({e(i["qualite"])})</li>' for i in d["invites"]) + "</ul>")
    c.append(f'<p>{"De vergadering wordt geopend om" if nl else "La séance est ouverte à"} {h(r["heure_debut"], nl)} {"onder voorzitterschap van" if nl else "sous la présidence de"} {e(d["president_seance"])}.</p>')
    actions = []
    for n, pt in enumerate(d["points"], 1):
        blocs = contenu(pt.get("contenu"))
        k = 2 if len(blocs) > 1 and blocs[0].rstrip("</p>").rstrip().endswith(":") and blocs[1].startswith("<table") else 1
        c.append('<div class="garde">' + f'<h2 class="section">{n}. {e(pt["titre"])}</h2>' + "".join(blocs[:k]) + "</div>")
        c.extend(blocs[k:])
        items = []
        for a in pt.get("actions") or []:
            meta = " · ".join(x for x in [a.get("responsable"), fdate(a["echeance"], nl, False) if a.get("echeance") else None] if x)
            items.append(f'<li>{e(a["action"])}' + (f' — <span class="meta">{e(meta)}</span>' if meta else "") + "</li>")
            actions.append([str(n), a["action"], a.get("responsable", ""), fdate(a["echeance"], nl, False) if a.get("echeance") else "—", "Te doen" if nl else "À faire"])
        dec = pt.get("decision")
        lbl = ("Standpunt van de raad" if nl else "Position du conseil")
        if dec:
            s = f'<div class="encadre"><p class="lbl">{lbl}</p><p>{e(dec)}</p>'
            if items:
                s += f'<p class="lbl suites">{"Opvolging" if nl else "Suites à donner"}</p><ul>{"".join(items)}</ul>'
            c.append(s + "</div>")
        elif items:
            c.append(f'<p class="intro-liste">{"Opvolging:" if nl else "Suites à donner :"}</p><ul>{"".join(items)}</ul>')
    if actions:
        c.append(f'<h2 class="section">{"Overzicht van de acties" if nl else "Récapitulatif des actions"}</h2>')
        cols = ["Pt", "Actie", "Verantwoordelijke", "Termijn", "Status"] if nl else ["Pt", "Action", "Responsable", "Échéance", "Statut"]
        c.append(tableau(cols, actions).replace("<th>Pt</th>", '<th class="pt">Pt</th>').replace('class="donnees"', 'class="donnees recap"'))
    nx = d.get("prochaine_reunion")
    fin = f'<div class="bloc-fin"><h2 class="section">{"Volgende vergadering" if nl else "Prochaine réunion"}</h2>'
    if nl:
        fin += f'<p>De volgende vergadering van de raad van mede-eigendom vindt plaats op {fdate(nx["date"], nl)} om {h(nx["heure"], nl)}, {e(nx["lieu"])}.</p>'
        fin += f'<p>Na afhandeling van de agenda wordt de vergadering gesloten om {h(r["heure_fin"], nl)}.</p>'
    else:
        org = "conseil syndical" if lu else "conseil de copropriété"
        fin += f'<p>La prochaine réunion du {org} est fixée au {fdate(nx["date"], nl)} à {h(nx["heure"], nl)}, {e(nx["lieu"])}.</p>'
        fin += f'<p>L\'ordre du jour étant épuisé, la séance est levée à {h(r["heure_fin"], nl)}.</p>'
    sig = d.get("signataires") or ([{"role": "Voorzitter van de raad van mede-eigendom", "nom": d.get("president_seance", "").split(",")[0]}, {"role": "Voor de syndicus", "nom": syn.get("representant", "")}] if nl else [])
    if lu:
        sig = [{"role": "Présidente du conseil syndical", "nom": sig[0]["nom"]}, sig[1]]
    fin += f'<p class="titre-tableau">{"Handtekeningen" if nl else "Signatures"}</p><div class="signatures">' + "".join(
        f'<div class="sig"><p class="role">{e(s["role"])}</p><p class="nom">{e(s["nom"])}</p><div class="ligne"></div></div>' for s in sig) + "</div></div>"
    c.append(fin)
    if d.get("annexes"):
        c.append(f'<p class="titre-tableau">{"Bijlagen" if nl else "Annexes"}</p><ul>' + "".join(f"<li>{e(a)}</li>" for a in d["annexes"]) + "</ul>")
    if d.get("diffusion"):
        c.append(f'<p class="diffusion">{"Verspreiding" if nl else "Diffusion"} : {e(d["diffusion"])}</p>')
    body_cls = ""
    doc = f"""<!doctype html>
<html lang="{'nl' if nl else 'fr'}">
<head>
<meta charset="utf-8">
<title>{e(rappel)}</title>
{style}
<style>
{CSS}
</style>
</head>
<body{body_cls}>
{suite}
{pied}
<table class="cadre"><thead><tr><td><div class="esp-haut"></div></td></tr></thead><tfoot><tr><td><div class="esp-bas"></div></td></tr></tfoot><tbody><tr><td>
{p1}
<main class="contenu">
{chr(10).join(c)}
</main>
</td></tr></tbody></table>
</body>
</html>
"""
    return doc


if __name__ == "__main__":
    out = Path(sys.argv[1])
    out.mkdir(parents=True, exist_ok=True)
    for bid in M:
        j = SK / ("assets/voorbeeld-verslag-nl.json" if bid == "syncura" else "assets/exemple-pv.json")
        (out / f"{bid}.html").write_text(build(bid, j, lu=(bid == "agigest")), encoding="utf-8")
        print(bid, round((out / f"{bid}.html").stat().st_size / 1024, 1), "Ko")
