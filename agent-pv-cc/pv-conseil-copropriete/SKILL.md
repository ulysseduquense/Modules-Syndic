---
name: pv-conseil-copropriete
description: >-
  Rédige et met en page le procès-verbal d'une réunion du conseil de copropriété
  (PV de CC) à partir de notes prises en vrac dans le chat, et le livre en Word
  (.docx) et PDF à la charte de la marque ou du syndic qui gère l'immeuble
  (Emeria, Office des Propriétaires, Syncura, Easy Syndic, Gestea, Agigest,
  Noblué, DR Syndic). À utiliser dès qu'Ulysse ou un gestionnaire
  parle de « PV de CC », « PV du conseil », « procès-verbal du conseil de
  copropriété », « compte rendu de la réunion du conseil », « rapport de
  réunion CC », colle des notes de réunion d'un conseil de copropriété, ou dit
  « voici mes notes du conseil d'hier, fais-moi le PV » — même sans préciser la
  marque ni le format. Pas pour un PV d'assemblée générale (AG), qui a d'autres
  mentions légales obligatoires (votes, majorités, quotités).
---

# PV de conseil de copropriété — notes → PV propre, à la charte

Le gestionnaire tape ses notes dans le chat (abrégées, souvent en plusieurs messages).
Le plus souvent, elles suivent le déroulé de la réunion. L'agent en fait un **procès-verbal rédigé, structuré et mis en page** à la
charte du syndic, prêt à relire et à signer : `.docx` (modifiable) + `.pdf`.

`SKILL_DIR` = dossier qui contient ce fichier.

| chemin | rôle |
|---|---|
| `scripts/generate_pv.py` | JSON → DOCX (+ PDF, + aperçu PNG pour le QA) à la charte de la marque |
| `scripts/capture_site.js` | capture la charte d'un site (logos, couleurs, polices, styles, captures d'écran) |
| `scripts/brand_from_capture.py` | intègre une capture dans `brands/<id>/` (logos recadrés, polices TTF, style) |
| `scripts/extract_brand.py` | relevé simplifié sans navigateur (HTML + CSS) |
| `brands/<id>/` | charte de chaque marque : `brand.json`, logos, polices |
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
`python3 SKILL_DIR/scripts/generate_pv.py --list-brands` (Office des Propriétaires =
`op`, avec l'entité `op-bruxelles` ou `op-wallonie` dans le champ `entite` ; Syncura =
`syncura` ; Easy Syndic = `easy-syndic` ; Gestea = `gestea` ; Agigest = `agigest` ;
Noblué = `noblue` ; DR Syndic = `dr-syndic` ; Emeria = `emeria`). Emeria par défaut si
l'utilisateur le confirme. Agigest est luxembourgeoise : l'organe s'y appelle « conseil
syndical » (géré par la marque).

Si la charte de la marque est « à compléter » ou « partielle » (voir `--list-brands`),
le dire **avant** de générer : le PV sortira sans logo et/ou en rendu neutre gris. Ne
jamais inventer un logo ou des couleurs. Si le site de la marque est joignable, proposer
de capturer sa charte (`references/marques.md`, « Capturer la charte ») : capture,
lecture des captures d'écran, intégration, PV de test comparé au site.

### 2. Recueillir les notes

- Accepter les notes telles quelles : abréviations, fautes, raccourcis. Si l'utilisateur annonce plusieurs messages (« je te dicte », « attends »),
  accuser réception en une ligne et attendre « c'est tout » / « génère ».
- Si l'outil **Copro** est disponible et que l'immeuble est identifiable, y lire la
  fiche de la copropriété (nom exact, adresse, BCE) plutôt que de la redemander.
  Immeuble introuvable dans Copro → travailler avec les notes seules, sans le signaler
  comme un problème.

### 3. Contrôler les informations indispensables

Avant de rédiger, vérifier qu'on a : nom et adresse de l'ACP · date · heures de début
(et de fin) · lieu ou visio · membres du conseil présents / excusés / absents ·
président(e) de séance · représentant du syndic. S'il en manque, poser **une seule
question groupée** qui liste uniquement ce qui manque. Si l'utilisateur répond « mets à
compléter » ou ne sait pas, écrire `[À COMPLÉTER : …]` (surligné en jaune dans le Word).

Ne pas demander ni marquer `[À COMPLÉTER]` pour une civilité, un prénom ou une fonction
inconnus : écrire le nom tel qu'il figure dans les notes (« Collin », « M. Mertens »).
Sauf mention contraire, « prés. » désigne la présidente ou le président du conseil, qui
préside aussi la séance. Dans les phrases générées (fonction du représentant du syndic,
secrétariat, lieu), ne mettre que ce qui est dans les notes ou le contexte certain.

Poser aussi une question si une note est **ambiguë sur le fond** (ex. « FR » = fonds de
roulement ou fonds de réserve ? « ok devis X » = le conseil recommande ou le syndic a
déjà commandé ?). Ne pas questionner la forme : c'est le travail de l'agent.

### 4. Rédiger

Lire `references/redaction.md` (obligatoire) et `references/structure-pv.md`, puis écrire
le JSON du PV (`references/schema.md`, modèle `assets/exemple-pv.json`) :

- un point de l'ordre du jour = un `point` ; regrouper sous un même point les notes
  qui portent sur le même sujet ;
- **ordre des points** : celui de la réunion, c'est-à-dire l'ordre des notes, sauf si
  l'utilisateur donne un ordre du jour. Si les notes sont manifestement en vrac (ajouts
  après coup, sujets mélangés), utiliser l'ordre type de `structure-pv.md` ;
- une action sans responsable explicite qui relève de la gestion (courrier, relance,
  devis, mise à l'ordre du jour) → responsable « Syndic » ; sans échéance dans les
  notes → pas d'échéance ;
- pour chaque point : l'exposé factuel (`contenu`), la **position du conseil**
  (`decision`) quand il y en a une, et les **suites à donner** (`actions` : quoi, qui,
  échéance) — elles alimentent le tableau récapitulatif ;
- les comparaisons de devis et les chiffres → `tableau` ;
- `afficher_quorum` à `false` si les notes ne listent pas tous les membres du conseil
  (le décompte « X membres sur Y » serait faux) ;
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
marque utilisée, nombre de points et d'actions, informations à compléter (le générateur
les liste, sans doublon), questions restées ouvertes, et les avertissements de charte
éventuels. Ne pas recopier le PV dans le chat.

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
