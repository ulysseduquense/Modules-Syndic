# Marques et chartes

Chaque marque est un dossier `brands/<id>/` :

```
brands/<id>/
  brand.json        charte, éléments graphiques, mentions du pied de page
  logo.png          logo pour fond clair (en-tête de la page 1)
  logo-blanc.png    logo pour fond de couleur (bandeaux d'en-tête et de pied)
  logo-entete.png   (facultatif) version compacte pour l'en-tête des pages 2+
  fonts/*.ttf|otf   (facultatif) polices de la marque, installées pour le rendu PDF
```

État : `python3 scripts/generate_pv.py --list-brands`.

| id | marque | site | charte |
|---|---|---|---|
| `emeria` | Emeria (groupe) | emeriagroup.com | **complète** : charte 2026, logos officiels, bandeau de pied navy à coin arrondi |
| `noblue` | Noblué — Noblué Immobilier SRL (Verviers / Liège) | syndic-noblue.be | à capturer |
| `dr-syndic` | DR Syndic — DR Syndic SRL (Huy, bureau à Liège) | drsyndic.be | à capturer |
| `op` | Office des Propriétaires (entités `op-bruxelles`, `op-wallonie`) | op.be | partielle : couleurs connues, logo à capturer |
| `syncura` | Syncura — VM Vastgoedbeheer BV (Gand) — **PV en néerlandais** | syncura.be | à capturer |
| `easy-syndic` | Easy Syndic SRL | easysyndic.be | à capturer |
| `gestea` | Gestea SRL | gestea.be | à capturer |
| `agigest` | Agigest S.A. (Luxembourg) | agigest.lu | à capturer ; organe « conseil syndical » |

Tant qu'une marque n'a pas de couleurs, le PV sort en **rendu neutre gris** ; sans
logo, le nom de la marque est écrit en texte à la place. Le générateur l'annonce
(`ATTENTION : …`) et l'agent doit le dire à l'utilisateur. Ne jamais inventer un logo,
une couleur ou une coordonnée.

## Capturer la charte d'une marque depuis son site

Le site **et les serveurs de ses images et polices** (CDN, Google Fonts…) doivent être
joignables depuis l'environnement d'exécution.

### 1. Capture (Playwright + Chromium)

```bash
node scripts/capture_site.js https://www.syndic-noblue.be/fr/ /tmp/capture-noblue \
     https://www.syndic-noblue.be/fr/contact
node scripts/capture_site.js https://www.drsyndic.be/ /tmp/capture-dr \
     https://www.drsyndic.be/contact https://www.drsyndic.be/legal
```

Produit : captures d'écran (`accueil-haut.png`, `accueil-complet.png`, `pied.png`,
`contact.png`), tous les logos (`logos/` : fichiers d'origine, rendu PNG transparent de
2000 px, capture dans leur contexte), les polices chargées (`fonts/`), les styles
calculés des titres, boutons, header et footer (`styles.json`), les couleurs pondérées
par surface et par usage (`couleurs.json`), le texte du pied de page, du contact et des
mentions légales (`mentions.txt`), et une synthèse (`capture.json`).

Sans Playwright, `scripts/extract_brand.py <url> <id>` fait un relevé simplifié
(HTML + CSS, sans rendu).

### 2. Lecture des captures (étape humaine ou agent, à ne pas sauter)

Regarder `accueil-haut.png`, `accueil-complet.png` et `pied.png`, puis décider :
- **logo fond clair** et **logo fond de couleur** (souvent header et footer) ;
- **couleur primaire** (header, titres, boutons principaux), **secondaire** (accent,
  boutons secondaires, surlignages), **texte** (couleur du corps) ;
- **police des titres** et **du texte** (`styles.json`, `polices_declarees`) ;
- **éléments graphiques** à reprendre dans le PV : header en bandeau de couleur ou blanc,
  footer foncé, titres en capitales, filet sous les titres, encadrés pleins ou
  contours, tableaux à en-tête plein ou souligné ;
- coordonnées et mentions légales (`mentions.txt`, `capture.json > reperes`).

### 3. Intégration

```bash
python3 scripts/brand_from_capture.py /tmp/capture-noblue noblue \
  --logo logos/logo-1-header-rendu.png --logo-blanc logos/logo-3-footer-rendu.png \
  --primaire "#xxxxxx" --secondaire "#xxxxxx" --texte "#xxxxxx" \
  --police-titres "Nom de la police" --police-texte Arial \
  --entete bandeau --pied bandeau --encadre fond_plein --accent-titre
```

Le script recadre les logos, convertit les polices web (woff2/woff) en TTF dans
`brands/<id>/fonts/` (`pip install fonttools brotli`), écrit couleurs, polices, logos
et style dans `brand.json` (statut « partielle »). Compléter ensuite à la main
`raison_sociale`, `adresse`, `bce`, `ipi`, `telephone`, `email`.

### 4. Validation

```bash
python3 scripts/generate_pv.py assets/exemple-pv.json --marque noblue -o /tmp/pv-test/ --render /tmp/pv-test/qa
```

Comparer les pages rendues avec les captures du site. Si c'est fidèle, passer
`"statut_charte": "complete"` et vider `a_verifier`.

## Polices

Le PDF utilise les polices de `brands/<id>/fonts/` (installées automatiquement avant la
conversion). Le .docx référence la police par son nom : sur un poste où elle n'est pas
installée, Word la remplace. Si la police de la marque est une police web non installée
sur les postes, préférer `"police_texte": "Arial"` et ne garder la police de la marque
que pour les titres.

## Champs de `brand.json`

| champ | rôle |
|---|---|
| `id`, `alias` | identifiant et noms acceptés (`--marque`, champ `marque` du JSON) |
| `nom_affiche` | nom court (mot-symbole de secours) |
| `statut_charte` | `complete` · `partielle` · `a_completer` |
| `langue` | langue des PV : `fr` (défaut) ou `nl` (Syncura) — libellés, dates et heures traduits |
| `organe` | nom de l'organe (défaut « conseil de copropriété » / « raad van mede-eigendom » ; « conseil syndical » au Luxembourg) |
| `raison_sociale`, `adresse`, `bce`, `ipi`, `telephone`, `email`, `site` | pied de page (`libelle_ipi` / `libelle_bce` : « BIV » / « KBO » pour une marque néerlandophone) |
| `entites` | sociétés distinctes d'une même marque : `{"op-wallonie": {"raison_sociale": …, "bce": …}}`, choisies par le champ `entite` du PV |
| `couleurs.primaire` | titres, en-têtes de tableau, bandeaux |
| `couleurs.secondaire` | surtitre, filet d'accent, encadrés, sous-titres |
| `couleurs.texte`, `texte_secondaire` | texte courant, pied de page (défaut : quasi-noir, gris) |
| `couleurs.fond_clair`, `filet` | fond des encadrés et lignes paires, filets (défaut : dérivés de la primaire) |
| `couleurs.entete_tableau`, `texte_entete_tableau` | en-tête des tableaux (défaut : primaire / blanc) |
| `police_titres`, `police_texte` | polices (défaut Arial) |
| `titres_majuscules` | titres en capitales |
| `logo`, `logo_entete`, `logo_sur_fond`, `logo_pied` | logos (fond clair, pages 2+, fond de couleur, bandeau de pied) |
| `logo_largeur_cm`, `logo_entete_largeur_cm`, `logo_sur_fond_largeur_cm`, `logo_hauteur_max_cm` | dimensions |
| `style.entete` | `blanc` (logo sur fond blanc) · `bandeau` (bandeau de couleur à fond perdu, logo blanc) |
| `style.entete_couleur`, `style.entete_hauteur_cm` | couleur (rôle : `primaire`, `secondaire`…) et hauteur du bandeau |
| `style.pied` | `filet` · `bandeau` (bandeau de couleur à fond perdu, logo blanc, numéro de page) |
| `style.pied_couleur`, `style.pied_hauteur_cm`, `style.pied_coins_arrondis` | ex. `"tr"` = coin supérieur droit arrondi (signature Emeria) |
| `style.encadre` | `bordure_gauche` · `fond_plein` · `contour` |
| `style.tableau_entete` | `plein` · `souligne` |
| `style.accent_titre` | filet court de couleur sous le titre du document |
| `style.surtitre` | « PROCÈS-VERBAL » au-dessus du titre (défaut `true`) |
| `mentions_pied` | lignes supplémentaires du pied de page |
| `sources`, `a_verifier` | traçabilité ; `a_verifier` est affiché à chaque génération |

## Ajouter une marque

Copier `brands/gestea/` vers `brands/<nouvel-id>/`, adapter `id`, `alias`,
`nom_affiche` et les mentions, puis suivre « Capturer la charte ». Aucune modification
du script n'est nécessaire.
