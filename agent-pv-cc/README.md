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
    scripts/extract_brand.py   relève logo/couleurs/polices d'un site
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

| marque | état |
|---|---|
| Emeria | charte complète (charte Emeria 2026, logos officiels) |
| Noblué | identité légale renseignée (BCE) ; **logo, couleurs et coordonnées à compléter** |
| DR Syndic | identité légale renseignée (BCE, siège à Huy) ; **logo, couleurs, IPI à compléter** |
| OP | couleurs connues ; logo et coordonnées à compléter |

Tant qu'une charte est incomplète, le PV sort en rendu neutre gris et le nom de la
marque remplace le logo ; l'agent le signale à chaque génération. Pour compléter une
marque depuis son site :

```bash
python3 pv-conseil-copropriete/scripts/extract_brand.py https://<site> noblue --apply
```

Détails et vérifications manuelles : `pv-conseil-copropriete/references/marques.md`.

## Installation

```bash
./build.sh            # -> dist/pv-conseil-copropriete.zip
```

Importer `dist/pv-conseil-copropriete.zip` comme skill dans Claude (paramètres de
l'organisation ou du compte, rubrique Skills). En local avec Claude Code : copier le
dossier `pv-conseil-copropriete/` dans `~/.claude/skills/`.

Dépendances d'exécution : Python 3 + `python-docx` ; LibreOffice pour le PDF et
`pdftoppm` pour l'aperçu de contrôle (sans eux, seul le .docx est produit).

## Test rapide

```bash
python3 pv-conseil-copropriete/scripts/generate_pv.py --list-brands
python3 pv-conseil-copropriete/scripts/generate_pv.py pv-conseil-copropriete/assets/exemple-pv.json -o /tmp/pv/ --render /tmp/pv/qa
python3 pv-conseil-copropriete/scripts/generate_pv.py pv-conseil-copropriete/assets/exemple-pv.json --marque dr-syndic -o /tmp/pv-dr/
```
