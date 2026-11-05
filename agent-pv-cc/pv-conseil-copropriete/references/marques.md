# Marques et chartes

Chaque marque est un dossier `brands/<id>/` :

```
brands/<id>/
  brand.json        charte, éléments graphiques, mentions du pied de page
  logo.png          logo pour fond clair (en-tête de la page 1)
  logo-blanc.png    logo pour fond de couleur (bandeaux d'en-tête et de pied)
  logo-entete.png   (facultatif) version compacte pour l'en-tête des pages 2+
  fonts/*.ttf       (facultatif) polices libres de la marque : embarquées dans le .docx
                    (Word les affiche sans installation) et utilisées pour le PDF
```

État : `python3 scripts/generate_pv.py --list-brands`.

| id | marque | site | charte relevée le 05/11/2026 |
|---|---|---|---|
| `emeria` | Emeria (groupe) | emeriagroup.com | charte 2026, logos officiels, bandeau de pied navy à coin arrondi |
| `op` | Office des Propriétaires (entités `op-bruxelles`, `op-wallonie`) | op.be | emblème rouge (SVG), Inter + Source Serif 4 italique rouge pour le nom de l'ACP, encadrés à barre rouge sur beige, pied à filets |
| `syncura` | Syncura — VM Vastgoedbeheer BV (Gand) — **PV en néerlandais** | syncura.be | bandeau en dégradé bleu nuit → prune avec pastille blanche et logo couleur (comme le header du site), Hanken Grotesk, accents rose, pied bleu nuit |
| `easy-syndic` | Easy Syndic SRL | easysyndic.be | logo SVG, Hanken Grotesk Black, filet orange sous le titre, encadrés beige, pied bleu nuit avec logo blanc |
| `gestea` | Gestea SRL | gestea.be | logo rouge (300 px, seul fichier publié), titre terminé par un point rouge, pied noir en dégradé avec logo blanc |
| `agigest` | Agigest S.A. (Luxembourg ; entités `agigest-sud`, `agigest-est`) — « conseil syndical » | agigest.lu | logo bleu, titres Cormorant Garamond, filet menthe, en-têtes de tableau bleus, pied gris sans logo |
| `noblue` | Noblué — Noblué Immobilier SRL (Petit-Rechain) | syndic-noblue.be | bandeau bleu nuit #000085 avec logo blanc et jaune (seule version publiée), accents jaunes, pied bleu nuit |
| `dr-syndic` | DR Syndic — DR Syndic SRL (Huy, bureau à Liège) | drsyndic.be | bandeau bleu nuit avec logo blanc (400 px), titres Palatino, accents dorés, encadrés crème, pied bleu nuit |

Chaque `brand.json` liste ses `sources` (URL du logo, jetons CSS, pages des mentions) et
ses `points_ouverts` (logo basse définition, police remplacée, entité à confirmer).

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

Points de vigilance relevés lors des captures de novembre 2026 :
- **Logo** : préférer le fichier d'origine. Un SVG se rend sans perte (le `-rendu.png`
  de 2000 px est net) ; pour un PNG/JPG, le `-rendu.png` n'est qu'un agrandissement flou :
  garder `logos/logo-N-zone.png` et chercher une version plus grande (attribut `srcset`,
  URL sans paramètres de taille — chez Wix, couper l'URL après `~mv2.png`). Un logo à fond
  blanc d'origine (webp RGB) se garde tel quel en en-tête blanc ou en pastille blanche.
- **Couleurs** : lire les jetons du thème (variables `--color-*` des sites Tailwind,
  `--e-global-color-*` des kits Elementor) plutôt que de deviner sur la capture ; une
  teinte pipetée sur une capture d'écran se note comme telle dans `sources`.
- **Polices** : seules les polices **libres** (Google Fonts, OFL) vont dans `fonts/`, via
  `scripts/google_fonts.py <id> "Famille:400,700"` (TTF statiques réduits aux alphabets
  latins, prêts à être embarqués). Une police commerciale du site (Adobe Fonts, Avenir,
  Nexa…) ne se copie jamais : noter son nom dans `police_titres_site` /
  `police_texte_site` et choisir la police libre la plus proche (ou Arial).
- **Site qui bloque la capture** (Gestea : polices qui ne finissent pas de charger) :
  `capture_site.js` bascule seul sur une capture par le protocole DevTools.

### 4. Validation

```bash
python3 scripts/generate_pv.py assets/exemple-pv.json --marque noblue -o /tmp/pv-test/ --render /tmp/pv-test/qa
```

Comparer les pages rendues avec les captures du site, côte à côte :

```bash
python3 scripts/planche_charte.py /tmp/capture-noblue /tmp/pv-test/PV_CC_*.pdf /tmp/pv-test/planche.png --titre "Noblué"
```

Si c'est fidèle, passer `"statut_charte": "complete"`, vider `a_verifier` et noter dans
`points_ouverts` ce qui reste à obtenir de la marque (logo vectoriel, version claire…).

## Polices

Les polices TrueType de `brands/<id>/fonts/` sont **embarquées dans le .docx** (norme
Office : fichiers `.odttf` obfusqués, `w:embedTrueTypeFonts`) : Word et LibreOffice
affichent la police de la marque même si elle n'est pas installée sur le poste, et la
modification du texte reste possible. Elles sont aussi installées avant la conversion PDF.
N'y mettre que des polices dont la licence autorise l'embarquement (OFL : Google Fonts).

Une police système absente des postes Linux (Palatino Linotype chez DR Syndic) est
remplacée au rendu PDF par son équivalent fontconfig (TeX Gyre Pagella) ; sous Windows,
Word utilise la vraie police.

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
| `couleurs.accent` | filet sous le titre, bord des encadrés, point final du titre (défaut : secondaire) |
| `couleurs.texte_pied` | mentions et numéro de page posés sur le bandeau de pied (défaut : blanc) |
| `couleurs.entete_tableau`, `texte_entete_tableau` | en-tête des tableaux (défaut : primaire / blanc) |
| `police_titres`, `police_texte` | polices (défaut Arial) ; une graisse hors 400/700 est une famille Word à part (« Hanken Grotesk Black ») |
| `police_accent` | police du nom de l'ACP quand `style.acp_accent` (ex. Source Serif 4 chez OP) |
| `police_titres_site`, `police_texte_site` | police commerciale du site remplacée dans le PV (traçabilité) |
| `interligne` | interligne du texte (défaut 1,12 ; 1,0 pour Hanken Grotesk, dont l'interligne natif est grand) |
| `embarquer_polices` | `false` pour ne pas embarquer `fonts/` dans le .docx (défaut `true`) |
| `libelles` | remplace des libellés fixes du PV (Agigest : pas d'« ACP » ni de « BCE ») |
| `bureaux` | bureaux relevés sur le site (nom, adresse, téléphone, e-mail) pour remplir le bloc `syndic` |
| `titres_majuscules` | titres en capitales |
| `logo`, `logo_entete`, `logo_sur_fond`, `logo_pied` | logos (fond clair, pages 2+, fond de couleur, bandeau de pied) |
| `logo_largeur_cm`, `logo_entete_largeur_cm`, `logo_sur_fond_largeur_cm`, `logo_hauteur_max_cm` | dimensions |
| `style.entete` | `blanc` (logo sur fond blanc) · `bandeau` (bandeau de couleur à fond perdu, logo blanc) |
| `style.entete_couleur`, `style.entete_hauteur_cm` | couleur (rôle : `primaire`, `secondaire`, `filet`…) et hauteur du bandeau |
| `style.entete_degrade`, `style.pied_degrade` | dégradé CSS du bandeau : `{"angle": 116.56, "arrets": [["#211747", 0.63], ["#985192", 1.17]]}` |
| `style.entete_coins_arrondis` | coins arrondis du bandeau d'en-tête (`"bl,br"`) |
| `style.entete_pastille` | pastille blanche arrondie dans le bandeau, logo couleur dedans (header Syncura) ; `{"hauteur_cm", "largeur_cm", "logo_hauteur_cm"}` |
| `style.pied` | `filet` · `bandeau` (bandeau de couleur à fond perdu, logo blanc, numéro de page) |
| `style.pied_couleur`, `style.pied_hauteur_cm`, `style.pied_coins_arrondis` | ex. `"tr"` = coin supérieur droit arrondi (signature Emeria) |
| `style.pied_mentions` | `dessus` (mentions au-dessus du bandeau, défaut) · `dans_bandeau` (mentions en texte clair dans le bandeau, comme le pied des sites) |
| `style.pied_logo` | `false` : pas de logo dans le bandeau de pied (Agigest) |
| `style.encadre` | `bordure_gauche` · `fond_plein` · `contour` |
| `style.tableau_entete` | `plein` · `souligne` |
| `style.accent_titre`, `style.accent_titre_longueur_cm` | filet court de couleur (accent) sous le titre du document |
| `style.titre_gras`, `style.titres_gras` | `false` : titre du document / titres de section dans la graisse de la police (Inter Regular chez OP, Cormorant SemiBold chez Agigest) |
| `style.titres_echelle` | facteur de taille des titres (police à petit œil : Cormorant 1,25) |
| `style.titre_point` | point final de couleur après le titre (signature Gestea) |
| `style.acp_accent`, `style.acp_accent_italique` | nom de l'ACP dans `police_accent`, couleur accent (signature OP) |
| `style.surtitre_police` | `texte` : surtitre « PROCÈS-VERBAL » dans la police du texte |
| `style.surtitre` | « PROCÈS-VERBAL » au-dessus du titre (défaut `true`) |
| `mentions_pied` | lignes supplémentaires du pied de page |
| `sources`, `a_verifier`, `points_ouverts` | traçabilité ; `a_verifier` est affiché à chaque génération tant que la charte n'est pas complète ; `points_ouverts` documente ce qui reste à obtenir de la marque |

## Ajouter une marque

Copier `brands/gestea/` vers `brands/<nouvel-id>/`, adapter `id`, `alias`,
`nom_affiche` et les mentions, puis suivre « Capturer la charte ». Aucune modification
du script n'est nécessaire.
