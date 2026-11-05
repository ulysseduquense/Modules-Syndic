# Brief — Agent « PV de CC » aux chartes des marques Emeria

## Objectif

Je veux un agent qui rédige le **procès-verbal d'une réunion du conseil de copropriété
(PV de CC)** à partir de notes que je tape en vrac dans le chat, et qui le livre en
**Word (.docx) modifiable + PDF**, **mis en page exactement à la charte graphique du
syndic** qui gère l'immeuble : son vrai logo, ses couleurs, ses polices et ses éléments
graphiques, tels qu'on les voit sur son site internet. Pas une simple couleur : le PV
doit ressembler à un document officiel de la marque.

## Point de départ (déjà construit)

Le skill `pv-conseil-copropriete` existe : `dist/pv-conseil-copropriete.zip` dans le dépôt
GitHub `ulysseduquense/Modules-Syndic`, branche `claude/tender-fermi-20s7fy`, dossier
`agent-pv-cc/`. Il contient :
- `SKILL.md` : le déroulé de l'agent ; `references/` : règles de rédaction (FR et NL),
  cadre légal belge, format JSON, procédure de capture des chartes ;
- `scripts/generate_pv.py` : JSON → DOCX/PDF à la charte (bandeaux de couleur à fond
  perdu en en-tête et pied de page, logo blanc sur fond de couleur, police de la marque,
  styles d'encadrés et de tableaux, langue FR/NL) ;
- `scripts/capture_site.js` (Node + Playwright) : capture d'un site (logos en PNG
  transparent, couleurs, polices, styles calculés, captures d'écran, mentions légales) ;
- `scripts/brand_from_capture.py` : intègre une capture dans `brands/<id>/` ;
- `brands/<id>/brand.json` pour les 8 marques, avec leurs coordonnées officielles déjà
  vérifiées. **Seule Emeria a sa charte graphique complète** ; pour les 7 autres, le
  logo, les couleurs, les polices et le style restent à capturer (les sites n'étaient pas
  joignables depuis l'environnement de développement).

## Ce que je te demande dans Cowork

**Pour chacune des 7 marques ci-dessous, aller sur son site et reprendre sa charte
graphique complète**, puis mettre à jour le skill :

| id | Marque | Site | Langue des PV |
|---|---|---|---|
| `op` | Office des Propriétaires (OP Bruxelles, OP Wallonie) | https://www.op.be | FR |
| `syncura` | Syncura (VM Vastgoedbeheer BV, Gand) | https://www.syncura.be | **NL** |
| `easy-syndic` | Easy Syndic | https://easysyndic.be | FR |
| `gestea` | Gestea | https://gestea.be/fr | FR |
| `agigest` | Agigest S.A. (Luxembourg — « conseil syndical ») | https://www.agigest.lu | FR |
| `noblue` | Noblué (Petit-Rechain / Liège) | https://www.syndic-noblue.be/fr/ | FR |
| `dr-syndic` | DR Syndic (Huy, bureau à Liège) | https://www.drsyndic.be | FR |

Pour chaque marque, relever :
1. **Logo** : la version pour fond clair **et** la version pour fond de couleur (souvent
   celle du footer), en haute définition (SVG converti en PNG transparent ≥ 1 600 px de
   large, ou le PNG d'origine). Jamais redessiné, recoloré ni déformé.
2. **Couleurs** (hex) : primaire (header, titres, boutons principaux), secondaire
   (accents), couleur du texte, fond clair éventuel.
3. **Polices** des titres et du texte (fichiers TTF/OTF si la police est libre, ex.
   Google Fonts ; sinon le nom + une police de secours).
4. **Éléments graphiques** à reproduire dans le PV : header en bandeau de couleur ou
   blanc, footer foncé ou non, titres en capitales ou non, filet sous les titres, forme
   des encadrés, style des tableaux.
5. **Vérifier les mentions légales** déjà dans `brand.json` (raison sociale, adresse,
   BCE/KBO, IPI/BIV, téléphone, e-mail) contre le pied de page, la page contact et les
   mentions légales du site, et compléter ce qui manque (IPI d'Easy Syndic, coordonnées
   d'OP Wallonie).

Méthode : si Node + Playwright sont disponibles, `node scripts/capture_site.js <url>
<dossier> [url_contact] [url_mentions]`, puis **regarder les captures d'écran** avant de
choisir, puis `python3 scripts/brand_from_capture.py <dossier> <id> --logo … --logo-blanc
… --primaire … --entete bandeau|blanc --pied bandeau|filet …` (procédure complète dans
`references/marques.md`). Sinon, faire la même chose à la main avec le navigateur :
télécharger les logos, lire les couleurs et polices dans le CSS, et remplir
`brands/<id>/brand.json` + `logo.png` + `logo-blanc.png` (+ `fonts/`).

Ensuite, pour chaque marque : générer un PV de test
(`python3 scripts/generate_pv.py assets/exemple-pv.json --marque <id> -o sortie/
--render sortie/qa`, et `assets/voorbeeld-verslag-nl.json` pour Syncura), **comparer
visuellement le PDF avec le site**, ajuster jusqu'à ce que ce soit fidèle, puis passer
`"statut_charte": "complete"` et vider `a_verifier`. Livrer le skill mis à jour
(`./build.sh` → zip) et une planche avec la page 1 du PV de chaque marque à côté d'une
capture de son site.

## Ce que l'agent doit faire ensuite au quotidien (rappel du fonctionnement)

- Je tape mes notes de réunion dans le chat (abrégées, en plusieurs messages). L'agent
  identifie la marque, vérifie les infos indispensables (ACP, date, heures, lieu,
  présents/excusés/absents, président, représentant du syndic) et pose **une seule
  question groupée** s'il en manque ; sinon il met `[À COMPLÉTER : …]` surligné.
- Il rédige un PV propre : présent de narration, ton neutre, **rien d'inventé**, un point
  numéroté par sujet dans l'ordre de la réunion, encadré « Position du conseil » avec
  les suites à donner (quoi, qui, échéance), tableau récapitulatif des actions,
  prochaine réunion, clôture, signatures (président du conseil + pour le syndic).
- Droit belge (art. 3.90 C. civ.) : le conseil contrôle et conseille, il ne « décide »
  que sur délégation de l'AG citée dans les notes ; un copropriétaire en défaut de
  paiement est désigné par son lot, pas par son nom ; « FR » (fonds de roulement ou de
  réserve) est toujours demandé.
- **Syncura : PV entièrement en néerlandais** (VME, raad van mede-eigendom, syndicus,
  werkkapitaal/reservekapitaal), même si mes notes sont en français.
  **Agigest : Luxembourg**, l'organe est le « conseil syndical ».
- Livraison : .docx + .pdf, contrôle visuel des pages avant livraison, puis 3-5 lignes
  de résumé (marque, points, actions, infos à compléter). Corrections ensuite dans le
  chat sans repartir de zéro.

## Critères de réussite

- Pour chaque marque, la page 1 du PV est reconnaissable comme un document de la
  marque à côté de son site : vrai logo net, bonnes couleurs, bonne police, mêmes codes
  graphiques.
- Aucun logo, couleur ou coordonnée inventé : chaque valeur vient du site (source notée
  dans `brand.json > sources`).
- Le PV reste lisible et propre : pas de texte qui déborde, pas de titre orphelin, pas
  de tableau coupé, pied de page avec les mentions légales exactes de la marque.

## Points ouverts à me signaler

- Agigest : le cadre légal luxembourgeois diffère du droit belge (les références du
  skill sont belges) — me dire ce qui doit changer.
- OP : faut-il des variantes par entité (OP Bruxelles, OP Wallonie, OP BW) au-delà du
  pied de page ?
- Toute marque dont le site n'a pas de logo exploitable en haute définition.
