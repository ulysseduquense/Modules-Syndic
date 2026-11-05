---
name: pv-conseil-copropriete
description: >-
  Rédige et met en page le procès-verbal d'une réunion du conseil de copropriété
  (PV de CC) à partir de notes prises en vrac dans le chat, et le livre en Word
  (.docx) et PDF à la charte de la marque ou du syndic qui gère l'immeuble
  (Emeria, Noblué, DR Syndic, OP…). À utiliser dès qu'Ulysse ou un gestionnaire
  parle de « PV de CC », « PV du conseil », « procès-verbal du conseil de
  copropriété », « compte rendu de la réunion du conseil », « rapport de
  réunion CC », colle des notes de réunion d'un conseil de copropriété, ou dit
  « voici mes notes du conseil d'hier, fais-moi le PV » — même sans préciser la
  marque ni le format. Pas pour un PV d'assemblée générale (AG), qui a d'autres
  mentions légales obligatoires (votes, majorités, quotités).
---

# PV de conseil de copropriété — notes → PV propre, à la charte

Le gestionnaire tape ses notes dans le chat (abrégées, dans le désordre, en plusieurs
messages). L'agent en fait un **procès-verbal rédigé, structuré et mis en page** à la
charte du syndic, prêt à relire et à signer : `.docx` (modifiable) + `.pdf`.

`SKILL_DIR` = dossier qui contient ce fichier.

| chemin | rôle |
|---|---|
| `scripts/generate_pv.py` | JSON → DOCX (+ PDF, + aperçu PNG pour le QA) à la charte de la marque |
| `scripts/extract_brand.py` | relève logo / couleurs / polices d'un site pour compléter une marque |
| `brands/<id>/brand.json` | charte et mentions légales de chaque marque (+ `logo.png`) |
| `references/redaction.md` | **style de rédaction** : passer des notes au PV, vocabulaire, pièges |
| `references/structure-pv.md` | cadre légal belge du conseil de copropriété, plan type, signatures |
| `references/schema.md` | format du JSON lu par le générateur |
| `references/marques.md` | marques disponibles, état de leur charte, ajout d'une marque |
| `assets/exemple-pv.json` | exemple complet (6 points, tableaux, actions) |

## Déroulé

### 1. Identifier la marque

La marque = le syndic qui gère l'immeuble ; elle fixe logo, couleurs et pied de page.
Si elle n'est pas dite, la déduire du contexte (nom du gestionnaire, de la société, de
l'immeuble déjà vu) ; sinon la demander en une ligne. Marques et alias :
`python3 SKILL_DIR/scripts/generate_pv.py --list-brands` (Noblué = `noblue`, DR Syndic =
`dr-syndic`, Emeria = `emeria`, OP = `op`). Emeria par défaut si l'utilisateur le confirme.

Si la charte de la marque est « à compléter » ou « partielle » (voir `--list-brands`),
le dire **avant** de générer : le PV sortira sans logo et/ou en rendu neutre gris. Ne
jamais inventer un logo ou des couleurs. Pour compléter : `references/marques.md`.

### 2. Recueillir les notes

- Accepter les notes telles quelles : abréviations, fautes, ordre chronologique de la
  réunion. Si l'utilisateur annonce plusieurs messages (« je te dicte », « attends »),
  accuser réception en une ligne et attendre « c'est tout » / « génère ».
- Si l'outil **Copro** est disponible et que l'immeuble est identifiable, y lire la
  fiche de la copropriété (nom exact, adresse, BCE) plutôt que de la redemander.

### 3. Contrôler les informations indispensables

Avant de rédiger, vérifier qu'on a : nom et adresse de l'ACP · date · heures de début
(et de fin) · lieu ou visio · membres du conseil présents / excusés / absents ·
président(e) de séance · représentant du syndic. S'il en manque, poser **une seule
question groupée** qui liste uniquement ce qui manque. Si l'utilisateur répond « mets à
compléter » ou ne sait pas, écrire `[À COMPLÉTER : …]` (surligné en jaune dans le Word).

Poser aussi une question si une note est **ambiguë sur le fond** (ex. « FR » = fonds de
roulement ou fonds de réserve ? « ok devis X » = le conseil recommande ou le syndic a
déjà commandé ?). Ne pas questionner la forme : c'est le travail de l'agent.

### 4. Rédiger

Lire `references/redaction.md` (obligatoire) et `references/structure-pv.md`, puis écrire
le JSON du PV (`references/schema.md`, modèle `assets/exemple-pv.json`) :

- un point de l'ordre du jour = un `point` ; regrouper les notes éparses par sujet ;
  ordre type : PV précédent → suivi des actions → finances → travaux → contrats →
  sinistres → contentieux → préparation AG → divers ;
- pour chaque point : l'exposé factuel (`contenu`), la **position du conseil**
  (`decision`) quand il y en a une, et les **suites à donner** (`actions` : quoi, qui,
  échéance) — elles alimentent le tableau récapitulatif ;
- les comparaisons de devis et les chiffres → `tableau` ;
- **ne rien inventer** : aucun montant, nom, date, décision ou échéance absent des notes.

### 5. Générer et contrôler

```bash
pip install python-docx --break-system-packages -q   # si absent
python3 SKILL_DIR/scripts/generate_pv.py pv.json -o <dossier_de_sortie>/ --render <dossier_de_travail>/qa
```

Le script écrit `PV_CC_<acp>_<date>.docx` et `.pdf` (si LibreOffice est présent) et liste
les points d'attention (`ATTENTION : …`). **QA obligatoire** : regarder chaque
`qa/page-N.png` — titres orphelins en bas de page, tableau coupé, texte qui déborde,
encadrés vides, `[À COMPLÉTER]` restants. Corriger le JSON et regénérer.

### 6. Livrer

Présenter le `.docx` et le `.pdf` à l'utilisateur, puis en 3-5 lignes maximum :
marque utilisée, nombre de points et d'actions, champs `[À COMPLÉTER]` restants, et
les avertissements de charte éventuels. Ne pas recopier le PV dans le chat.

Corrections ensuite (« change le point 3 », « ajoute M. X excusé ») : modifier le JSON
et regénérer le même fichier, sans repartir de zéro.

## Règles non négociables

- Fidélité aux notes : reformuler, structurer, corriger la langue — jamais ajouter un
  fait. Un doute → question ou `[À COMPLÉTER]`.
- Le conseil de copropriété **contrôle et conseille** ; il ne « décide » que sur
  délégation expresse de l'AG (à citer). Voir `references/structure-pv.md`.
- Données personnelles : un copropriétaire en défaut de paiement est désigné par son
  lot, pas par son nom ; aucune donnée de santé ou de vie privée dans le PV.
- Charte : uniquement les couleurs, polices et logos de `brands/<id>/` ; ne pas
  redessiner, recolorer ni déformer un logo ; pas de logo inventé.
- Format : A4 portrait, Word modifiable ; le PDF n'est qu'une copie de lecture.
