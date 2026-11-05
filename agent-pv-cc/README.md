# Agent PV de CC — procès-verbal du conseil de copropriété

Agent Claude (skill `pv-conseil-copropriete`) qui transforme des **notes de réunion
prises dans le chat** en **procès-verbal de conseil de copropriété** rédigé, structuré
et mis en page à la charte de la marque qui gère l'immeuble. Sortie : Word (.docx)
modifiable + PDF.

```
agent-pv-cc/
  pv-conseil-copropriete/      le skill (à importer dans Claude)
    SKILL.md                   instructions de l'agent
    references/                rédaction, cadre légal et plan type, format JSON, marques
    brands/                    une charte par marque : brand.json + logo
    scripts/generate_pv.py     JSON → DOCX/PDF à la charte
    scripts/capture_site.js    capture la charte d'un site (Playwright)
    scripts/brand_from_capture.py  intègre une capture dans brands/<id>/
    scripts/extract_brand.py   relevé simplifié sans navigateur
    assets/exemple-pv.json     exemple complet
  build.sh                     fabrique dist/pv-conseil-copropriete.zip
```

## Utilisation (dans le chat)

> « PV de CC pour la résidence Les Hêtres (Noblué). Réunion hier 19h-20h30 chez
> Mme Collin. Présents : … Points : PV précédent ok ; façade 2 devis … »

L'agent identifie la marque, vérifie les informations indispensables (ACP, date,
présences, président, représentant du syndic), pose une seule question groupée s'il en
manque, rédige le PV (présent de narration, ton neutre, rien d'inventé), le génère, le
contrôle visuellement et livre le .docx et le .pdf. Les corrections se font ensuite
dans le chat (« ajoute M. X excusé », « reformule le point 3 »).

## Marques

| marque | site | état |
|---|---|---|
| Emeria | emeriagroup.com | charte complète : logos officiels, bandeau de pied navy à coin arrondi |
| Office des Propriétaires (OP Bruxelles, OP Wallonie) | op.be | coordonnées et IPI renseignés, couleurs connues ; logo et éléments graphiques à capturer |
| Syncura | syncura.be | coordonnées et BIV renseignés ; charte à capturer |
| Easy Syndic | easysyndic.be | coordonnées renseignées ; charte à capturer |
| Gestea | gestea.be | coordonnées et IPI renseignés ; charte à capturer |
| Agigest (Luxembourg, « conseil syndical ») | agigest.lu | coordonnées renseignées ; charte à capturer |
| Noblué | syndic-noblue.be | coordonnées et IPI renseignés ; charte à capturer |
| DR Syndic | drsyndic.be | coordonnées et IPI renseignés ; charte à capturer |

Le générateur reproduit la charte de chaque marque : logo sur fond clair, logo blanc
sur bandeau de couleur à fond perdu (en-tête et/ou pied de page), couleurs, police de la
marque (embarquée pour le PDF), style des titres, des encadrés et des tableaux. Tant
qu'une charte n'est pas capturée, le PV sort en gris neutre avec le nom de la marque
en texte, et l'agent le signale.

Capture d'une charte (le site et ses CDN doivent être joignables) :

```bash
node pv-conseil-copropriete/scripts/capture_site.js https://www.drsyndic.be/ /tmp/cap-dr https://www.drsyndic.be/contact https://www.drsyndic.be/legal
python3 pv-conseil-copropriete/scripts/brand_from_capture.py /tmp/cap-dr dr-syndic --logo … --logo-blanc … --primaire … --entete bandeau --pied bandeau
```

Procédure complète : `pv-conseil-copropriete/references/marques.md`.

## Installation

```bash
./build.sh            # -> dist/pv-conseil-copropriete.zip
```

Importer `dist/pv-conseil-copropriete.zip` comme skill dans Claude (paramètres de
l'organisation ou du compte, rubrique Skills). En local avec Claude Code : copier le
dossier `pv-conseil-copropriete/` dans `~/.claude/skills/`.

Dépendances d'exécution : Python 3 + `python-docx` + Pillow ; LibreOffice pour le PDF
et `pdftoppm` pour l'aperçu de contrôle (sans eux, seul le .docx est produit). Capture
des chartes : Node + Playwright (Chromium), `fonttools` et `brotli` pour les polices.

## Test rapide

```bash
python3 pv-conseil-copropriete/scripts/generate_pv.py --list-brands
python3 pv-conseil-copropriete/scripts/generate_pv.py pv-conseil-copropriete/assets/exemple-pv.json -o /tmp/pv/ --render /tmp/pv/qa
python3 pv-conseil-copropriete/scripts/generate_pv.py pv-conseil-copropriete/assets/exemple-pv.json --marque dr-syndic -o /tmp/pv-dr/
```
