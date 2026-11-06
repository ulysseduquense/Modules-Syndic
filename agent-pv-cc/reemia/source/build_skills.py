# Construit les textes Reemia (instructions et skills ; un skill = un seul texte de 65 000 caractères au plus) :
# chartes communes (commun/), agent PV de CC (pv-cc/), agent tâches post-AG (taches-post-ag/).
import sys
from pathlib import Path
HERE = Path(__file__).parent
sys.path.insert(0, str(HERE))
from marques import M, bloc_style, fragments

LIVR = (HERE.parent if HERE.name == "source" else HERE) / "livrables"
LIMITE = 65000

T_SIMPLE = '<p class="surtitre">[SURTITRE]</p>\n<h1 class="titre">[TITRE]</h1>\n<p class="acp">[COPROPRIÉTÉ]</p>\n<p class="acp-sous">[SOUS-LIGNE]</p>'
T_FILET = '<p class="surtitre">[SURTITRE]</p>\n<h1 class="titre">[TITRE]</h1>\n<div class="filet-accent"></div>\n<p class="acp">[COPROPRIÉTÉ]</p>\n<p class="acp-sous">[SOUS-LIGNE]</p>'

FICHES = {
 "op": dict(
    titre="OP — Office des Propriétaires",
    alias="OP, O.P., Office des Propriétaires, OP Bruxelles, Opbrussels, OP Wallonie, OPBW, OP BW",
    langue="français", organe="conseil de copropriété", copro="« ACP <nom> »",
    signature="emblème rouge sur en-tête blanc, Inter, nom de l'ACP en serif italique rouge, encadrés à barre rouge sur fond beige, pied de page blanc à filet",
    titre_bloc='<p class="surtitre">[SURTITRE]</p>\n<h1 class="titre">[TITRE]</h1>\n<p class="acp accent">[COPROPRIÉTÉ]</p>\n<p class="acp-sous">[SOUS-LIGNE]</p>',
    entites="""**OP Wallonie** (immeubles gérés par la société OP Wallonie) : dans le pied de page, remplacer la
ligne 1 par `Office des Propriétaires Wallonie SRL · Rue Vilain XIIII 53-55, 1000 Bruxelles · BCE 0432.691.858 · IPI n° 508 167`,
et, dans la ligne « Syndic » de la grille d'informations, écrire « Office des Propriétaires Wallonie SRL, représentée par … ».

**Bureaux** (ligne 2 du pied de page, si le gestionnaire en dépend) :

| bureau | adresse | téléphone | e-mail |
|---|---|---|---|
| OP Bruxelles Sud | Rue Vilain XIIII 53-55, 1000 Bruxelles | +32 2 626 08 26 | reception@op.be |
| OP Bruxelles Est | Boulevard Brand Whitlock 87, 1200 Woluwe-Saint-Lambert | +32 2 268 17 77 | reception@op.be |
| OP Brabant Wallon | Avenue de France 26, 1400 Nivelles | +32 67 84 23 00 | syndic.brabantwallon@op.be |
| OP Louvain-la-Neuve | Place de l'Equerre 33, 1348 Ottignies-Louvain-la-Neuve | +32 10 45 39 90 | syndic.brabantwallon@op.be |
| OP Namur (Jambes) | Chaussée de Liège 652, 5100 Namur | +32 81 84 14 84 | syndic.brabantwallon@op.be |""",
    attention="Logo publié uniquement en rouge : en-tête toujours blanc. Rattachement des bureaux wallons à OP Wallonie SRL à confirmer par l'utilisateur en cas de doute."),
 "easy-syndic": dict(
    titre="Easy Syndic",
    alias="Easy Syndic, EasySyndic, easy-syndic",
    langue="français", organe="conseil de copropriété", copro="« ACP <nom> »",
    signature="logo bleu-vert sur en-tête blanc, Hanken Grotesk très gras, filet orange sous le titre, encadrés beige à barre orange, pied bleu nuit avec logo blanc",
    titre_bloc=T_FILET,
    entites="**Bureaux** (Bruxelles, Liège, Namur, Gand, Anvers, Hasselt, Mons, Marche-en-Famenne, Arlon, Luxembourg) : le site ne publie pas leurs coordonnées ; mettre en ligne 2 du pied de page le téléphone et l'e-mail du gestionnaire s'ils sont donnés, sinon garder ceux du siège.",
    attention="Pas de numéro IPI de société : le pied reprend les trois agents IPI publiés sur le site."),
 "gestea": dict(
    titre="Gestea",
    alias="Gestea",
    langue="français", organe="conseil de copropriété", copro="« ACP <nom> »",
    signature="logo rouge sur en-tête blanc, Arial, titre terminé par un point rouge, encadrés à barre rouge, pied noir avec logo blanc",
    titre_bloc='<p class="surtitre">[SURTITRE]</p>\n<h1 class="titre">[TITRE]<span class="point">.</span></h1>\n<p class="acp">[COPROPRIÉTÉ]</p>\n<p class="acp-sous">[SOUS-LIGNE]</p>',
    entites="Un seul siège (Rue Vilain XIIII 53-55, 1000 Bruxelles).",
    attention="Le site ne publie le logo qu'en 300 px : net à l'écran et en impression A4 à cette taille, ne pas l'agrandir."),
 "syncura": dict(
    titre="Syncura — PV en néerlandais",
    alias="Syncura, Syncura Services, VM Vastgoedbeheer",
    langue="**néerlandais**, même si les notes sont en français (`lang=\"nl\"`)", organe="raad van mede-eigendom", copro="« VME <naam> »",
    signature="bandeau en dégradé bleu nuit → prune avec pastille blanche et logo couleur (comme le header du site), Hanken Grotesk, accents rose, pied bleu nuit",
    titre_bloc=T_SIMPLE,
    entites="**Kantoren** : 12 bureaux en Flandre et à Bruxelles (Antwerpen, Beveren, Brussel, Erpe-Mere, Gent, Hasselt, Knokke-Heist, Kortrijk, Leuven, Mechelen-Vilvoorde, Oostende, Oudenaarde). Tous publient le +32 9 280 80 34 et une adresse <ville>@syncura.be (ex. antwerpen@syncura.be) : en ligne 2 du pied, mettre l'e-mail du bureau du gestionnaire s'il est connu.",
    attention="Document entièrement en néerlandais, avec les libellés néerlandais du skill du document ; dates « donderdag 5 november 2026 », heures « 18u00 »."),
 "noblue": dict(
    titre="Noblué",
    alias="Noblué, Noblue, Noblué Immobilier, Noblué Syndic",
    langue="français", organe="conseil de copropriété", copro="« ACP <nom> »",
    signature="bandeau bleu nuit avec logo blanc et jaune, Hanken Grotesk, filet jaune sous le titre, encadrés à barre jaune, pied bleu nuit",
    titre_bloc=T_FILET,
    entites="Un seul bureau syndic (Petit-Rechain).",
    attention="Le logo Noblué Syndic n'existe qu'en version pour fond bleu nuit : en-tête toujours en bandeau. Ne jamais utiliser les logos « Noblué Immo » ou « Noblué Assurances »."),
 "dr-syndic": dict(
    titre="DR Syndic",
    alias="DR Syndic, DR. Syndic, D.R. Syndic, drsyndic",
    langue="français", organe="conseil de copropriété", copro="« ACP <nom> »",
    signature="bandeau bleu nuit avec logo blanc, titres Palatino, filet doré sous le titre, encadrés crème à barre dorée, pied bleu nuit",
    titre_bloc=T_FILET,
    entites="Bureaux de Huy (siège) et de Liège, tous deux déjà dans le pied de page.",
    attention="Logo publié en 400 px, blanc uniquement : en-tête toujours en bandeau."),
 "agigest": dict(
    titre="Agigest — Luxembourg",
    alias="Agigest, Agigest SA, AGIGEST S.A.",
    langue="français (Luxembourg)", organe="**conseil syndical**", copro="le nom de la résidence (« Résidence … ») ou « Copropriété <nom> » ; jamais « ACP » ni « BCE »",
    signature="logo bleu sur en-tête blanc, titres Cormorant Garamond, filet menthe sous le titre, en-têtes de tableau bleus, pied gris clair sans logo",
    titre_bloc=T_FILET,
    entites="""**Bureaux** : dans le pied de page, remplacer les lignes 1 et 2 si l'immeuble dépend d'un autre bureau :
- Sud : `AGIGEST S.A. Sud · 6, Boulevard des Lumières, L-4369 Belvaux` / `Tél. (+352) 203 048 00 · info-sud@agigest.lu · agigest.lu`
- Est : `AGIGEST S.A. Est · 10, rue du Pont, L-6471 Echternach` / `Tél. (+352) 203 049 00 · info-est@agigest.lu · agigest.lu`

La ligne « Syndic » de la grille d'informations reste « AGIGEST S.A., représentée par … » quel que soit le bureau (Sud et Est sont des bureaux, pas des sociétés).""",
    attention="Droit luxembourgeois (voir le skill du document) : syndicat des copropriétaires, conseil syndical, règlement de copropriété ; « FR » n'existe pas (avance de trésorerie, fonds de travaux ou provision). Signataire éventuel : « Présidente (Président) du conseil syndical »."),
 "emeria": dict(
    titre="Emeria (groupe) — par défaut",
    alias="Emeria, Emeria Group, groupe Emeria",
    langue="français", organe="conseil de copropriété", copro="« ACP <nom> »",
    signature="logo Emeria bleu marine sur en-tête blanc, titres en capitales, encadrés à barre bleue, pied bleu marine à coin supérieur droit arrondi",
    titre_bloc=T_SIMPLE,
    entites="Pas de société ni de mentions légales propres : utiliser Emeria seulement si l'utilisateur le confirme (l'immeuble est normalement géré par une des marques syndic). Remplacer les crochets de la ligne 2 du pied par le téléphone et l'e-mail du gestionnaire.",
    attention="Ligne « Syndic » de la grille d'informations : « Emeria, représentée par … »."),
}

GROUPES = {
 "op-easy-gestea": ("Chartes syndic — OP, Easy Syndic, Gestea", ["op", "easy-syndic", "gestea"]),
 "syncura-noblue-dr": ("Chartes syndic — Syncura, Noblué, DR Syndic", ["syncura", "noblue", "dr-syndic"]),
 "agigest-emeria": ("Chartes syndic — Agigest, Emeria", ["agigest", "emeria"]),
}


def fiche(bid):
    f = FICHES[bid]
    st, _ = bloc_style(bid)
    p1, suite, pied = fragments(bid, "[RAPPEL]")
    pied = pied.replace("</p><p>", "</p>\n<p>").replace('<div class="mentions">', '<div class="mentions">\n').replace("</p></div>", "</p>\n</div>")
    return f"""## {f['titre']}

- **Reconnaître** : {f['alias']}.
- **Langue** : {f['langue']} · **organe** : {f['organe']} · **copropriété** : {f['copro']}.
- **Charte** (site {M[bid]['site']}, relevé du 05/11/2026) : {f['signature']}.

**1. Bloc marque** — dans `<head>`, à la place de `⟦BLOC MARQUE⟧`, tel quel :

```html
{st}
```

**2. En-tête page 1** — à la place de `⟦EN-TÊTE PAGE 1⟧` :

```html
{p1}
```

**3. En-tête des pages suivantes** — à la place de `⟦EN-TÊTE DES PAGES SUIVANTES⟧` ; remplacer `[RAPPEL]` par le rappel défini dans le skill du document :

```html
{suite}
```

**4. Pied de page** — à la place de `⟦PIED DE PAGE⟧`. La ligne 2 donne le contact : la remplacer par le téléphone et l'e-mail du gestionnaire ou de son bureau s'ils sont connus. Ne rien changer d'autre :

```html
{pied}
```

**5. Bloc titre** — début de `⟦CONTENU⟧` ; remplacer `[SURTITRE]`, `[TITRE]`, `[COPROPRIÉTÉ]` et `[SOUS-LIGNE]` par les libellés du skill du document, sans changer les balises :

```html
{f['titre_bloc']}
```

**6. Entités et bureaux** — {f['entites']}

**7. Attention** — {f['attention']}
"""


def skill_chartes(slug, titre, ids):
    noms = ", ".join(FICHES[i]["titre"].split(" — ")[0] for i in ids)
    alias = " ; ".join(FICHES[i]["alias"] for i in ids)
    head = f"""---
name: charte-syndic-{slug}
description: Charte graphique des documents HTML A4 imprimables des syndics {noms} ({alias}). Pour chaque marque, le bloc de style (couleurs, polices, logos officiels intégrés), l'en-tête de la page 1, l'en-tête des pages suivantes, le pied de page avec les mentions légales exactes et le bloc titre. Commun à tous les agents qui produisent un document à la charte d'un syndic Emeria (PV de conseil de copropriété, plan d'actions post-AG…) ; s'utilise avec le skill du document, qui donne le squelette HTML, le CSS commun et les libellés.
---

# {titre}

Ces fiches complètent le skill du document en cours (PV de conseil de copropriété, plan
d'actions post-AG…), qui donne le squelette HTML, le CSS commun, les composants et les
libellés. Pour la marque du document, copier ses blocs **tels quels** aux marqueurs du squelette.

- Ne jamais modifier un logo (les adresses `data:` sont les fichiers officiels relevés sur le site
  de la marque), une couleur ou une mention légale, ni mélanger les blocs de deux marques.
- Seuls changements permis : `[RAPPEL]` dans l'en-tête des pages suivantes ; `[SURTITRE]`,
  `[TITRE]`, `[COPROPRIÉTÉ]` et `[SOUS-LIGNE]` dans le bloc titre ; la ligne 2 du pied (contact
  du gestionnaire ou de son bureau) ; pour une entité ou un bureau listé dans la fiche, les
  lignes indiquées.
- Les polices viennent de Google Fonts : sans connexion, le navigateur bascule sur Arial ; le PDF
  reste propre.

"""
    return head + "\n".join(fiche(i) for i in ids)


def main():
    css = (HERE / "commun.css").read_text().strip()
    plan_css = (HERE / "plan-compact.css").read_text().strip()
    files = {
        "pv-cc/Skill PV de CC - redaction et gabarit.md": (HERE / "core.src.md").read_text().replace("{{CSS}}", css),
        "pv-cc/Instructions agent - PV de CC.md": (HERE / "instructions-pv-cc.md").read_text(),
        "taches-post-ag/Skill Taches post-AG - lecture du PV et plan d'actions.md": (HERE / "post_ag.src.md").read_text().replace("{{CSS}}", plan_css),
        "taches-post-ag/Instructions agent - Taches post-AG.md": (HERE / "instructions-post-ag.md").read_text(),
    }
    for slug, (titre, ids) in GROUPES.items():
        files[f"commun/Skill {titre.replace(' — ', ' - ')}.md"] = skill_chartes(slug, titre, ids)
    for name, txt in sorted(files.items()):
        f = LIVR / name
        f.parent.mkdir(parents=True, exist_ok=True)
        f.write_text(txt, encoding="utf-8")
        flag = "OK" if len(txt) <= LIMITE else "TROP LONG"
        print(f"{len(txt):6} car.  {flag:9} {name}")


if __name__ == "__main__":
    main()
