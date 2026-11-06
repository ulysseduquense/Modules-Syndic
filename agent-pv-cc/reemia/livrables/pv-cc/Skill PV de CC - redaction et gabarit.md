---
name: pv-cc-redaction-gabarit
description: Rédige le procès-verbal d'une réunion du conseil de copropriété (PV de CC ; « conseil syndical » au Luxembourg, « raad van mede-eigendom » en néerlandais) à partir de notes tapées en vrac, et le livre en document HTML A4 imprimable à la charte du syndic. Contient la méthode de rédaction (FR et NL), le cadre légal belge et luxembourgeois, les libellés fixes et le gabarit HTML. S'utilise avec le skill de charte de la marque (« Chartes syndic — … »). Pas pour un PV d'assemblée générale.
---

# PV de conseil de copropriété — rédaction et gabarit HTML

Le gestionnaire tape ses notes de réunion dans le chat, abrégées, souvent en plusieurs
messages. Tu en fais un **procès-verbal rédigé, structuré et mis en page à la charte du
syndic**, prêt à relire, imprimer et signer.

## 1. Ce que tu livres

- **Un fichier HTML complet et autonome**, nommé `PV CC - <copropriété> - <AAAA-MM-JJ>.html`
  (Syncura : `Verslag RME - <copropriété> - <AAAA-MM-JJ>.html` ; Agigest :
  `PV conseil syndical - <copropriété> - <AAAA-MM-JJ>.html`), où `<copropriété>` est le nom
  sans « ACP » ni « VME » (« Résidence Les Coteaux »).
- Format A4 portrait. Ouvert dans Edge ou Chrome, **Ctrl+P → « Enregistrer au format PDF »**
  donne le PDF à la charte : bandeaux à fond perdu, logo, en-tête répété, pied de page et
  numéros de page. Rien à régler dans la boîte d'impression (marges « Par défaut »).
- Version Word modifiable si on la demande : ouvrir le PDF dans Word (Fichier > Ouvrir),
  qui le convertit ; la mise en page y est approchée, le PDF reste la référence.
- **Une réponse courte** (section 10).

## 2. Déroulé

1. **Identifier la marque** : le syndic qui gère l'immeuble. Elle fixe le logo, les couleurs,
   le pied de page et la langue. Si elle n'est pas dite, la déduire du contexte (société,
   gestionnaire, immeuble) ; sinon la demander en une ligne. Ouvrir ensuite le skill
   « Chartes syndic » qui contient cette marque et y lire sa fiche.
2. **Recueillir les notes** telles quelles (abréviations, fautes). Si l'utilisateur annonce
   plusieurs messages (« je te dicte », « attends »), accuser réception en une ligne et
   attendre « c'est tout » ou « génère ».
3. **Contrôler les informations indispensables** : nom et adresse de la copropriété · date ·
   heures de début et de fin · lieu ou visio · membres du conseil présents, excusés, absents ·
   président(e) de séance · représentant du syndic. S'il en manque, poser **une seule
   question groupée** qui ne liste que ce qui manque. Si l'utilisateur répond « mets à
   compléter » ou ne sait pas : `[À COMPLÉTER : …]` (surligné dans le document).
   - Ne pas demander une civilité, un prénom ou une fonction inconnus : écrire le nom tel
     qu'il est dans les notes (« Collin », « M. Mertens »).
   - « prés. » = la présidente ou le président du conseil, qui préside aussi la séance, sauf
     mention contraire.
   - Poser aussi une question si une note est **ambiguë sur le fond** : « FR » = fonds de
     roulement ou fonds de réserve ? (Luxembourg : avance de trésorerie ou fonds de
     travaux ?) ; « ok devis X » = le conseil recommande, ou le syndic a déjà commandé ?
     Ne jamais questionner la forme.
   - « génère » dans le même message que les notes ne dispense pas de cette question. Si
     l'utilisateur répond « génère quand même », ne sait pas ou demande de compléter plus
     tard : `[À COMPLÉTER : …]` à l'endroit exact du doute (texte, cellule du responsable…),
     cité dans la réponse.
4. **Rédiger** selon les sections 3 à 7 : un point numéroté par sujet, dans l'ordre de la
   réunion (l'ordre des notes, sauf ordre du jour donné ; notes en vrac → ordre type, § 6).
5. **Assembler le HTML** selon la section 8, avec les blocs de la fiche de la marque.
6. **Contrôler** (section 9) avant de livrer.
7. **Livrer** le fichier et la réponse courte.
8. **Corrections** ensuite (« ajoute M. X excusé », « reformule le point 3 ») : repartir du
   dernier document, modifier seulement ce qui est demandé, relivrer le fichier complet et
   dire en une ligne ce qui a changé.

## 3. Règles non négociables

- **Fidélité aux notes** : reformuler, structurer, corriger la langue — jamais ajouter un
  fait, un montant, un nom, une date, une décision ou une échéance absents des notes. Un
  doute → question ou `[À COMPLÉTER : …]`.
- **Le conseil contrôle et conseille** ; il ne « décide » que sur délégation expresse de
  l'assemblée générale, citée dans les notes. Sans délégation : avis, recommandation,
  demande au syndic, prise d'acte. Jamais « le conseil décide ».
- **Données personnelles** : un copropriétaire en défaut de paiement, en litige ou mis en
  demeure est désigné par son **lot**, jamais par son nom. Pas de santé, de situation
  familiale ni de conflit de voisinage nominatif détaillé : résumer. Les membres du conseil
  et les intervenants professionnels sont nommés normalement.
- **Charte** : uniquement les blocs de la fiche de la marque, copiés tels quels. Ne jamais
  modifier un logo (fichier, couleurs, proportions), ni inventer une couleur, un logo ou une
  mention légale.
- Une action sans responsable explicite qui relève de la gestion (courrier, relance, devis,
  inscription à l'ordre du jour) → responsable « Syndic » ; sans échéance dans les notes →
  pas d'échéance.

## 4. Rédaction en français

Le PV peut être relu par l'AG, un commissaire aux comptes, un avocat ou un juge : il est
**factuel, neutre, complet et daté**.

- Français administratif belge (luxembourgeois pour Agigest), phrases courtes, voix active,
  **présent de narration** tenu d'un bout à l'autre, troisième personne. Jamais « je »,
  « on », « nous ».
- Pas d'adjectif de jugement : décrire les faits, attribuer les opinions (« Mme Peeters
  estime que… »). Un désaccord : « M. X exprime son désaccord quant à… ; les autres membres
  présents ne partagent pas cet avis. »

| nature | formulation |
|---|---|
| information du syndic | Le syndic informe / précise / rappelle que… |
| constat d'un membre | Mme X signale / constate / fait remarquer que… |
| prise de connaissance | Le conseil prend acte de… / prend connaissance de… |
| avis | Le conseil émet un avis favorable (défavorable) sur… / recommande… |
| demande au syndic | Le conseil demande au syndic de… (+ échéance si donnée) |
| décision sur délégation | En vertu de la délégation accordée par l'AG du [date], le conseil approuve… |
| report | Le point est reporté à la prochaine réunion, dans l'attente de… |

| note | dans le PV |
|---|---|
| `asc en panne 22/10 → 24/10, carte HS, couvert omnium` | L'ascenseur a été immobilisé du 22 au 24 octobre 2026 en raison d'une carte de commande défectueuse. Le remplacement est couvert par le contrat omnium. |
| `3 devis toiture: meuse 8740 / ourthe 7980 sans nacelle / batiplus 9320 → CC préfère meuse` | tableau des trois devis + « Le conseil recommande le devis de Toitures Meuse SRL. » |
| `lot 9 tjrs pas payé, relancer` | Le syndic informe que l'arriéré du lot 9 n'est pas régularisé. Le conseil demande au syndic de poursuivre le recouvrement. → action Syndic |
| `marc regarde bornes recharge` | M. Dubois se propose d'étudier l'installation de bornes de recharge. → action M. Dubois |
| `PV précédent ok` | Le procès-verbal de la réunion du [date] est approuvé. (« à l'unanimité » seulement si les notes le disent) |
| `CC ok pour mise en demeure par avocat` | Le conseil émet un avis favorable à l'envoi d'une mise en demeure au propriétaire du lot 7 par l'intermédiaire d'un avocat. → action Syndic |
| `FR à 12k` | Le fonds `[À COMPLÉTER : de roulement ou de réserve]` s'élève à 12.000 €. |

- Chaque note atterrit quelque part ; une note incompréhensible → question. Une idée répétée
  → une seule mention, au bon point.
- Échéance relative (« dans 15 jours », « avant l'AG ») → date absolue si la date de la
  réunion le permet, sinon garder la formulation.
- « ok » ou « vu » sur une information → « Le conseil prend acte. » ; « CC ok pour [une
  démarche] » → avis favorable ; seul le PV précédent est « approuvé ».
- Années absentes des notes (« PV du 15/09 », « avant fin février ») : déduire l'année de la
  date de la réunion (un fait passé est antérieur à la réunion, une échéance postérieure). Une
  saison (« au printemps ») reste telle quelle.

| abréviation | sens | piège |
|---|---|---|
| ACP | association des copropriétaires | |
| AG / AGO / AGE | assemblée générale (ordinaire / extraordinaire) | |
| CC | conseil de copropriété | ≠ commissaire aux comptes (écrire celui-ci en toutes lettres) |
| FR / FdR | fonds de roulement **ou** fonds de réserve | **ambigu : demander** |
| ROI | règlement d'ordre intérieur | |
| PEB | performance énergétique des bâtiments | |
| TVAC / HTVA | TVA comprise / hors TVA | toujours préciser pour un devis |
| OS / BC | ordre de service / bon de commande | |
| asc., chauff., ent. | ascenseur, chauffage, entretien | |

**Forme des données**
- Dates : « jeudi 5 novembre 2026 » dans la grille, « 5 novembre 2026 » dans le texte,
  `05/11/2026` dans les tableaux. Heures : `18h00`.
- Montants : point des milliers, virgule décimale, TVAC/HTVA si connu. Un montant précis
  (devis, facture, solde, arriéré) prend deux décimales : « 8740 » → `8.740,00 €`. Un montant
  approché (« 12k », « env. 20.000 ») n'en prend pas : `12.000 €`, « environ 20.000 € ».
- Personnes : la civilité (M., Mme ; Dhr., Mevr.) seulement si les notes la donnent ou si
  l'accord l'impose (« Excusée » → Mme) ; jamais déduite d'un prénom. Première mention :
  civilité + prénom + nom s'ils sont connus (« M. Marc Dubois »), ensuite civilité + nom.
  Genre inconnu : « présent(e) », « excusé(e) ».
- Fournisseurs : raison sociale exacte si connue, sinon le nom des notes. Lots : la
  désignation des notes (« lot 7 », « app. 2B »).

## 5. Rédaction en néerlandais (Syncura)

Le PV Syncura est rédigé **entièrement en néerlandais de Belgique**, registre administratif,
même si les notes sont en français ; les messages du chat restent dans la langue de
l'utilisateur. Les règles de fond (sections 3 et 4) s'appliquent à l'identique.

- Présent, troisième personne : « De syndicus deelt mee dat… », « De raad neemt kennis
  van… », « Mevr. Peeters meldt dat… ». Civilités : **Dhr.** (M.), **Mevr.** (Mme).
- Jamais « de raad beslist » sans délégation de l'AV citée dans les notes.

| situation | formulation |
|---|---|
| information du syndic | De syndicus deelt mee / licht toe / herinnert eraan dat… |
| constat d'un membre | Mevr. X meldt / stelt vast / merkt op dat… |
| prise d'acte | De raad neemt kennis van… |
| avis | De raad geeft een gunstig (ongunstig) advies over… / De raad beveelt … aan. |
| demande au syndic | De raad vraagt de syndicus om… |
| décision sur délégation | Op grond van de delegatie door de algemene vergadering van [datum] keurt de raad … goed. |
| report | Het punt wordt uitgesteld tot de volgende vergadering, in afwachting van… |
| PV précédent | Het verslag van de vergadering van [datum] wordt goedgekeurd. |

| français | néerlandais |
|---|---|
| ACP | VME (vereniging van mede-eigenaars) |
| conseil de copropriété / syndic / AG | raad van mede-eigendom / syndicus / algemene vergadering (AV) |
| commissaire aux comptes | commissaris van de rekeningen |
| fonds de roulement / de réserve | werkkapitaal / reservekapitaal |
| décompte de charges / appel de fonds | afrekening van de lasten / opvraging van provisies |
| arriérés / rappel / mise en demeure | achterstallige lasten / herinnering / ingebrekestelling |
| devis / bon de commande / entrepreneur | offerte / bestelbon / aannemer |
| sinistre / franchise | schadegeval / vrijstelling |
| parties communes / privatives | gemeenschappelijke delen / privatieve delen |
| ROI / règlement de copropriété / acte de base | huishoudelijk reglement / reglement van mede-eigendom / basisakte |
| lot / quote-part / ordre du jour / divers | kavel / aandeel / agenda / varia |
| ascenseur, chauffage, nettoyage | lift, verwarming, schoonmaak |
| TVAC / HTVA · BCE / IPI | incl. btw / excl. btw · KBO / BIV |

Dates : « 5 november 2026 », tableaux `05/11/2026` ; heures `18u00` ; montants `8.740,00 €`
« incl. btw » / « excl. btw » ; information manquante `[AAN TE VULLEN: …]`.

## 6. Cadre légal et plan type

**Belgique** (art. 3.90 du Code civil). Ne citer aucun article dans le PV sauf si les notes
le font.
- Conseil obligatoire à partir de 20 lots (caves, garages et parkings non compris),
  facultatif ailleurs ; membres copropriétaires nommés par l'AG.
- Mission : veiller à la bonne exécution par le syndic de ses missions ; il peut prendre
  connaissance et copie des pièces de la gestion. Pas de pouvoir de décision propre ; une
  délégation de l'AG pour des actes déterminés est possible.
- Il fait rapport à l'AG : d'où des actions datées et suivies.
- Le syndic n'est pas membre du conseil ; il y assiste à son invitation et en assure souvent
  le secrétariat.

**Luxembourg — Agigest** (loi modifiée du 16 mai 1975, règlement grand-ducal du 13 juin 1975).
- Collectivité : **syndicat des copropriétaires** ; jamais « ACP » ni « BCE ».
- **Conseil syndical** facultatif, créé par le règlement de copropriété ou par l'AG ;
  membres : copropriétaires, leurs conjoints ou représentants légaux, jamais le syndic ni
  ses préposés.
- Il donne son **avis** au syndic ou à l'AG et **contrôle la gestion du syndic** :
  comptabilité, répartition des dépenses, passation et exécution des marchés et contrats.
- Délégation de l'AG seulement pour un acte ou une décision précisément déterminé, avec
  compte rendu à l'AG.
- Travaux urgents : le syndic recueille l'avis du conseil syndical avant de demander une
  provision. Le conseil peut se faire assister d'un technicien ; il peut demander au syndic
  de convoquer l'AG et l'ajout de questions à l'ordre du jour.
- « FR » n'existe pas : **avance de trésorerie permanente**, **fonds de travaux** ou
  **provision** — toujours demander lequel.
- Montants : « TTC » / « HTVA » comme dans les notes (usage luxembourgeois). « Le conseil
  syndical » à la première mention d'un point, ensuite « le conseil ».

**Plan type** (celui du gabarit) : bloc titre · informations · présences · ouverture · points
numérotés · récapitulatif des actions · prochaine réunion · clôture · signatures · annexes et
diffusion. Ordre usuel des points : approbation du PV précédent · suivi des actions
précédentes · situation financière, contrôle des comptes et des factures, arriérés · travaux
et entretien · contrats et fournisseurs · sinistres et assurances · contentieux · préparation
de la prochaine AG · divers. Ne garder que les points abordés.

- **Encadré « Position du conseil »** : une ou deux phrases qui concluent le point (avis,
  recommandation, demande, prise d'acte, report), suivies des suites à donner (quoi, qui,
  échéance). Libellé « Décision » uniquement en cas de délégation de l'AG ; « Conclusion »
  pour un point d'information qui se conclut (le conseil prend acte, par exemple). Pas
  d'encadré sur un point purement informatif, sans conclusion.
- **Présences** : ordre présents, représentés, excusés, absents. Le décompte « X membres sur
  Y » seulement si les notes donnent la composition complète du conseil (un appel avec
  présents et excusés ou absents, ou « conseil de N membres ») ; sinon l'omettre.
- **Prochaine réunion non fixée** : garder le titre et écrire « La date de la prochaine
  réunion sera fixée ultérieurement. » (période connue : « … , prévue fin janvier 2027, sera
  fixée ultérieurement. » ; NL : « De datum van de volgende vergadering wordt later
  vastgelegd. »).
- **PV précédent** : une phrase (« Le procès-verbal de la réunion du … est approuvé. ») ;
  encadré seulement s'il y a des remarques ou une suite à donner.
- **Signatures** : président(e) du conseil + « Pour le syndic » (représentant), sauf autre
  demande.
- Hors PV de conseil : votes en quotes-parts, majorités et quorum de l'AG ; débats
  verbatim ; informations non abordées en réunion (à défaut, dans « Divers » avec la
  mention « Information communiquée après la réunion »).

## 7. Libellés fixes

| élément | Belgique, français | Agigest (Luxembourg) | Syncura, néerlandais |
|---|---|---|---|
| surtitre | Procès-verbal | Procès-verbal | Verslag |
| titre | Réunion du conseil de copropriété | Réunion du conseil syndical | Vergadering van de raad van mede-eigendom |
| nom de la copropriété | ACP <nom> (sauf s'il commence par « ACP » ou « Association ») | <nom> (« Résidence … ») ou « Copropriété <nom> » | VME <nom> |
| sous-ligne (éléments absents des notes omis) | adresse · BCE <n°> · Réf. <réf> | adresse · Réf. <réf> | adres · KBO <n°> · Ref. <ref> |
| grille | Date · Horaire · Lieu · Présidence de séance · Secrétariat · Syndic | idem | Datum · Uur · Plaats · Voorzitter van de vergadering · Secretariaat · Syndicus |
| ligne Syndic | <raison sociale>, représentée par <nom>, <fonction> | idem | <raison sociale>, vertegenwoordigd door <naam>, <functie> |
| ligne Secrétariat | <nom>, pour le syndic | idem | <naam>, voor de syndicus |
| qualités | Président(e), Vice-président(e), Membre | idem | Voorzitter, Ondervoorzitter, Lid |
| présences | Présences ; Membre du conseil · Qualité · Lot · Présence | idem | Aanwezigheden ; Lid van de raad · Hoedanigheid · Kavel · Aanwezigheid |
| valeurs | Présent(e), Représenté(e) par …, Excusé(e), Absent(e) | idem | Aanwezig, Vertegenwoordigd door …, Verontschuldigd, Afwezig |
| décompte | 3 membres sur 4 présents ou représentés. | idem | 2 van de 3 leden aanwezig of vertegenwoordigd. |
| invités | Assistent également à la réunion : | idem | Wonen de vergadering eveneens bij: |
| ouverture | La séance est ouverte à 18h00 sous la présidence de … | idem | De vergadering wordt geopend om 18u00 onder voorzitterschap van … |
| encadré | Position du conseil · Suites à donner | idem | Standpunt van de raad · Opvolging |
| actions sans encadré | Suites à donner : | idem | Opvolging: |
| récapitulatif | Récapitulatif des actions ; Pt · Action · Responsable · Échéance · Statut ; « À faire » | idem | Overzicht van de acties ; Pt · Actie · Verantwoordelijke · Termijn · Status ; « Te doen » |
| prochaine réunion | Prochaine réunion — La prochaine réunion du conseil de copropriété est fixée au <jour date> à <heure>, <lieu>. | … du conseil syndical … | Volgende vergadering — De volgende vergadering van de raad van mede-eigendom vindt plaats op <dag datum> om <uur>, <plaats>. |
| clôture | L'ordre du jour étant épuisé, la séance est levée à <heure>. | idem | Na afhandeling van de agenda wordt de vergadering gesloten om <uur>. |
| signatures | Signatures ; Présidente (Président) du conseil de copropriété · Pour le syndic | Présidente (Président) du conseil syndical · Pour le syndic | Handtekeningen ; Voorzitter van de raad van mede-eigendom · Voor de syndicus |
| fin | Annexes · Diffusion : … | idem | Bijlagen · Verspreiding: … |
| rappel des pages 2+ | PV du conseil de copropriété — <nom> — JJ/MM/AAAA | PV du conseil syndical — … | Verslag raad van mede-eigendom — … |

## 8. Gabarit HTML

### 8.1 Squelette

Copier ce squelette, puis remplacer les quatre marqueurs `⟦…⟧` par les blocs de la fiche de
la marque (skill « Chartes syndic »), et `⟦CONTENU⟧` par le PV rédigé avec les composants du § 8.3.

```html
<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>PV du conseil de copropriété — Résidence … — 05/11/2026</title>
⟦BLOC MARQUE⟧
<style>
⟦CSS COMMUN : copier tel quel le § 8.2⟧
</style>
</head>
<body>
⟦EN-TÊTE DES PAGES SUIVANTES⟧
⟦PIED DE PAGE⟧
<table class="cadre"><thead><tr><td><div class="esp-haut"></div></td></tr></thead><tfoot><tr><td><div class="esp-bas"></div></td></tr></tfoot><tbody><tr><td>
⟦EN-TÊTE PAGE 1⟧
<main class="contenu">
⟦CONTENU⟧
</main>
</td></tr></tbody></table>
</body>
</html>
```

- `lang="nl"` pour Syncura. `<title>` = le rappel des pages 2+ (§ 7).
- Le bloc marque contient son propre `<style>` ; le CSS commun va dans le second `<style>` du
  squelette. Les deux sont nécessaires.
- **Copie des blocs** : copier-coller exact, d'un seul tenant. Les adresses `data:` des logos
  sont très longues : ne pas les couper, les raccourcir, ni reformater leurs nombres (`1.91`
  reste `1.91`). Une erreur d'un seul caractère peut casser le logo.
- Le tableau `cadre` réserve, sur chaque page, la place de l'en-tête et du pied (fixes) :
  ne pas le retirer et ne rien mettre en dehors de lui, sauf l'en-tête des pages suivantes
  et le pied de page.

### 8.2 CSS commun (à copier tel quel, sans rien changer)

```css
*{box-sizing:border-box}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{margin:0;font-family:var(--police-texte);font-size:10pt;line-height:var(--interligne);color:var(--texte);background:#fff}
@media screen{body{background:#9aa0a6;display:flex;flex-direction:column;align-items:center;padding:12px 0}.cadre{width:210mm;background:#fff;box-shadow:0 2px 10px rgba(0,0,0,.3)}.haut-suite{display:none}.pied{position:static;order:2;width:210mm;box-shadow:0 2px 10px rgba(0,0,0,.3)}}
table.cadre{width:100%;border-collapse:collapse}
table.cadre>thead>tr>td,table.cadre>tfoot>tr>td,table.cadre>tbody>tr>td{padding:0}
.esp-haut{height:var(--esp-haut)}
.esp-bas{height:var(--esp-bas)}
.haut-suite{position:fixed;top:0;left:0;right:0;height:var(--haut-h);padding:0 20mm;display:flex;align-items:center;justify-content:space-between;z-index:1}
.haut-suite .rappel{font-size:7.5pt}
.pied{position:fixed;bottom:-0.4mm;left:0;right:0;height:var(--pied-h);padding:0 20mm;display:flex;align-items:center;justify-content:space-between;gap:8mm;font-size:7pt;line-height:1.35;z-index:1}
.pied .mentions p{margin:0}
.pied .mentions p:first-child{font-weight:700}
.entete-p1{position:relative;z-index:3;margin-top:calc(-1 * var(--esp-haut));min-height:var(--p1-h);background:#fff}
.logo{background-repeat:no-repeat;background-position:left center;background-size:contain}
.contenu{padding:0 20mm}
.surtitre{font-family:var(--police-surtitre);font-weight:700;font-size:8.5pt;letter-spacing:.22em;text-transform:uppercase;color:var(--secondaire);margin:0 0 2pt}
h1.titre{font-family:var(--police-titres);font-weight:var(--graisse-titre);font-size:calc(19pt * var(--echelle-titres));line-height:1.15;color:var(--primaire);margin:0 0 6pt}
h1.titre .point{color:var(--accent)}
.filet-accent{width:var(--filet-accent-l);height:3.5pt;background:var(--accent);margin:2pt 0 12pt}
.acp{font-weight:700;font-size:12.5pt;color:var(--texte);margin:0 0 1pt}
.acp.accent{font-family:var(--police-accent);font-style:italic;font-weight:400;font-size:14.5pt;color:var(--accent)}
.acp-sous{font-size:9pt;color:var(--texte-2);margin:0 0 10pt;padding-bottom:7pt;border-bottom:1px solid var(--filet)}
table.infos{width:100%;border-collapse:collapse;margin:0 0 6pt;font-size:9.5pt}
table.infos th{width:4.2cm;text-align:left;vertical-align:top;font-weight:700;font-size:9pt;color:var(--primaire);padding:3pt 6pt 3pt 4pt}
table.infos td{padding:3pt 4pt}
table.infos tr+tr th,table.infos tr+tr td{border-top:1px solid var(--filet)}
h2.section{font-family:var(--police-titres);font-weight:var(--graisse-h2);font-size:calc(12.5pt * var(--echelle-titres));line-height:1.2;color:var(--primaire);margin:16pt 0 5pt;break-after:avoid;page-break-after:avoid}
h3.sous-titre{font-size:10.5pt;font-weight:700;color:var(--secondaire);margin:8pt 0 3pt;break-after:avoid}
.garde{break-inside:avoid;page-break-inside:avoid}
p{margin:0 0 5pt}
ul{margin:0 0 5pt;padding-left:16pt}
li{margin:0 0 2pt}
.quorum{font-style:italic;font-size:9pt;color:var(--texte-2)}
.intro-liste{font-weight:700;margin:3pt 0 2pt}
table.donnees{width:100%;border-collapse:collapse;margin:3pt 0 8pt;font-size:9pt;border:1px solid var(--filet)}
table.donnees th{background:var(--entete-tableau);color:var(--texte-entete-tableau);font-size:8.5pt;font-weight:700;text-align:left;padding:4pt 6pt}
table.donnees td{padding:3.5pt 6pt;border-top:1px solid var(--filet);vertical-align:top}
table.donnees tbody tr:nth-child(even) td{background:var(--fond-clair)}
table.donnees tr{break-inside:avoid;page-break-inside:avoid}
table.donnees .num{text-align:right;white-space:nowrap}
table.donnees .pt{width:1cm}
table.recap td:nth-child(n+3),table.recap th:nth-child(n+3){white-space:nowrap}
.tableau-souligne table.donnees th{background:none;color:var(--primaire);border-bottom:2pt solid var(--secondaire)}
.titre-tableau{font-weight:700;font-size:9.5pt;color:var(--primaire);margin:4pt 0 2pt;break-after:avoid}
.encadre{background:var(--fond-clair);border-left:4.5pt solid var(--accent);padding:6pt 10pt 6pt 9pt;margin:4pt 0 8pt;break-inside:avoid;page-break-inside:avoid}
.encadre-fond .encadre{border-left:0}
.encadre-contour .encadre{background:none;border:1pt solid var(--primaire)}
.encadre .lbl{font-size:7.5pt;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--secondaire);margin:0 0 1pt}
.encadre .lbl.suites{margin-top:5pt}
.encadre p{margin:0 0 2pt}
.encadre ul{margin:0;font-size:9.5pt}
.meta{font-style:italic}
.signatures{display:flex;gap:1cm;margin-top:6pt;break-inside:avoid;page-break-inside:avoid}
.signatures .sig{flex:1}
.signatures .role{font-size:8.5pt;font-weight:700;color:var(--primaire);margin:0}
.signatures .nom{margin:0}
.signatures .ligne{border-bottom:1px solid var(--filet);height:34pt}
.bloc-fin{break-inside:avoid;page-break-inside:avoid}
.diffusion{font-style:italic;font-size:8.5pt;color:var(--texte-2);margin-top:6pt}
mark.a-completer{background:#FFF200;color:inherit;font-weight:700;padding:0 1pt}
.p1-blanc{padding:10mm 20mm 4mm}
.p1-blanc .logo{width:var(--logo-p1-l);height:var(--logo-p1-h)}
.p1-bandeau{height:var(--p1-h);background:var(--entete-fond);padding:0 20mm;display:flex;align-items:center;margin-bottom:9mm}
.p1-bandeau .logo{width:var(--logo-p1-l);height:var(--logo-p1-h)}
.pastille{flex:1;height:var(--pastille-h);background:#fff;border-radius:999px;display:flex;align-items:center;padding:0 7mm}
.suite-blanc{background:#fff;align-items:flex-end;padding-bottom:2.5mm}
.suite-blanc::after{content:"";position:absolute;left:20mm;right:20mm;bottom:0;border-bottom:1px solid var(--filet)}
.suite-blanc .rappel{color:var(--texte-2)}
.suite-bandeau{background:var(--entete-fond);color:#fff}
.haut-suite .logo{width:var(--logo-suite-l);height:var(--logo-suite-h)}
.pied-bandeau{background:var(--pied-fond);color:var(--texte-pied)}
.pied-filet{background:#fff;color:var(--texte-2)}
.pied-filet::before{content:"";position:absolute;left:20mm;right:20mm;top:0;border-top:1px solid var(--filet)}
.pied .logo{flex:none;width:var(--logo-pied-l);height:var(--logo-pied-h);background-position:right center}
p:has(+ .encadre),.garde:has(+ .encadre),ul:has(+ .encadre){break-after:avoid;page-break-after:avoid}
.intro-liste{break-after:avoid;page-break-after:avoid}
```

### 8.3 Composants du contenu

Échapper `&` en `&amp;` et `<` en `&lt;` dans le texte. Les exemples sont en français ; pour
Syncura et Agigest, prendre les libellés du § 7.

**Bloc titre** — prendre la variante de la fiche de la marque (filet d'accent, point final, nom
en italique) et y remplacer `[SURTITRE]`, `[TITRE]`, `[COPROPRIÉTÉ]` et `[SOUS-LIGNE]` par les
libellés du § 7 ; résultat, par exemple :

```html
<p class="surtitre">Procès-verbal</p>
<h1 class="titre">Réunion du conseil de copropriété</h1>
<p class="acp">ACP Résidence Les Coteaux</p>
<p class="acp-sous">Rue de l'Exemple 12, 4000 Liège · BCE 0800.000.000</p>
```

**Grille d'informations** (une ligne par information connue ; ligne absente si inconnue,
sauf date, horaire et lieu qui reçoivent `[À COMPLÉTER : …]`) :

```html
<table class="infos">
<tr><th>Date</th><td>jeudi 5 novembre 2026</td></tr>
<tr><th>Horaire</th><td>18h00 – 19h50</td></tr>
<tr><th>Lieu</th><td>Salle commune du rez-de-chaussée</td></tr>
<tr><th>Présidence de séance</th><td>Mme Anne Lambert, présidente du conseil</td></tr>
<tr><th>Secrétariat</th><td>Julie Martin, pour le syndic</td></tr>
<tr><th>Syndic</th><td>Office des Propriétaires SA, représentée par Julie Martin, gestionnaire de copropriété</td></tr>
</table>
```

La raison sociale de la ligne Syndic est le texte de la ligne 1 du pied de page jusqu'au
premier « · » (ex. « Syncura (VM Vastgoedbeheer BV) »). La ligne 2 du pied (contact) ne change
que si les notes ou l'utilisateur donnent le bureau, le téléphone ou l'e-mail du gestionnaire.

**Titre de section et présences**

```html
<h2 class="section">Présences</h2>
<table class="donnees"><thead><tr><th>Membre du conseil</th><th>Qualité</th><th>Lot</th><th>Présence</th></tr></thead>
<tbody>
<tr><td>Mme Anne Lambert</td><td>Présidente</td><td>App. 4B</td><td>Présente</td></tr>
<tr><td>M. Karim Haddad</td><td>Membre</td><td>App. 6C</td><td>Excusé</td></tr>
</tbody></table>
<p class="quorum">3 membres sur 4 présents ou représentés.</p>
<p class="intro-liste">Assistent également à la réunion :</p>
<ul><li>M. Paul Renard (commissaire aux comptes)</li></ul>
<p>La séance est ouverte à 18h00 sous la présidence de Mme Anne Lambert, présidente du conseil.</p>
```

Sans lots dans les notes : supprimer la colonne Lot.

**Point de l'ordre du jour** — le titre, le premier paragraphe et, si ce paragraphe annonce
un tableau (il finit par « : »), ce tableau, dans un même `div class="garde"` : un titre ne
reste jamais seul en bas de page.

```html
<div class="garde">
<h2 class="section">4. Toiture : remplacement des descentes d'eau pluviale</h2>
<p>Suite aux infiltrations constatées au 6e étage, trois devis ont été demandés :</p>
<table class="donnees"><thead><tr><th>Entreprise</th><th class="num">Montant TVAC</th><th>Délai</th></tr></thead>
<tbody>
<tr><td>Toitures Meuse SRL</td><td class="num">8.740,00 €</td><td>4 semaines</td></tr>
<tr><td>Zinguerie Ourthe</td><td class="num">7.980,50 €</td><td>6 semaines</td></tr>
</tbody></table>
</div>
<p>Le devis de Zinguerie Ourthe n'inclut pas la location de la nacelle, estimée à <mark class="a-completer">[À COMPLÉTER : coût de la nacelle]</mark>.</p>
<div class="encadre">
<p class="lbl">Position du conseil</p>
<p>Le conseil recommande le devis de Toitures Meuse SRL.</p>
<p class="lbl suites">Suites à donner</p>
<ul><li>Demander à Zinguerie Ourthe un devis complet incluant la nacelle — <span class="meta">Syndic · 20/11/2026</span></li></ul>
</div>
```

- Colonnes de montants : `class="num"` sur le `th` et les `td` (alignés à droite).
- Paragraphe → `<p>` ; liste → `<ul><li>` (introduite par `<p class="intro-liste">` si besoin) ;
  sous-titre dans un point → `<h3 class="sous-titre">` ; titre de tableau →
  `<p class="titre-tableau">` ; gras → `<strong>`.
- Suites à donner sans position du conseil : `<p class="intro-liste">Suites à donner :</p>`
  puis la liste.
- Information manquante : `<mark class="a-completer">[À COMPLÉTER : …]</mark>`.

**Récapitulatif des actions** (toutes les suites à donner, dans l'ordre des points ;
échéance absente → « — ») :

```html
<h2 class="section">Récapitulatif des actions</h2>
<table class="donnees recap"><thead><tr><th class="pt">Pt</th><th>Action</th><th>Responsable</th><th>Échéance</th><th>Statut</th></tr></thead>
<tbody><tr><td>4</td><td>Demander à Zinguerie Ourthe un devis complet incluant la nacelle</td><td>Syndic</td><td>20/11/2026</td><td>À faire</td></tr></tbody></table>
```

**Fin du PV** (prochaine réunion, clôture et signatures ne sont jamais séparées) :

```html
<div class="bloc-fin">
<h2 class="section">Prochaine réunion</h2>
<p>La prochaine réunion du conseil de copropriété est fixée au jeudi 14 janvier 2027 à 18h00, salle commune.</p>
<p>L'ordre du jour étant épuisé, la séance est levée à 19h50.</p>
<p class="titre-tableau">Signatures</p>
<div class="signatures">
<div class="sig"><p class="role">Présidente du conseil de copropriété</p><p class="nom">Mme Anne Lambert</p><div class="ligne"></div></div>
<div class="sig"><p class="role">Pour le syndic</p><p class="nom">Julie Martin</p><div class="ligne"></div></div>
</div>
</div>
<p class="titre-tableau">Annexes</p>
<ul><li>Devis comparatifs — remplacement des descentes d'eau pluviale</li></ul>
<p class="diffusion">Diffusion : membres du conseil de copropriété et commissaire aux comptes</p>
```

Prochaine réunion non fixée : phrase du § 6. Rien dans les notes sur la prochaine réunion :
retirer le titre et la phrase, garder la clôture. Annexes et diffusion seulement si les notes
les donnent.

## 9. Contrôle avant livraison

- Chaque note est reprise ; aucun fait ajouté ; aucun « le conseil décide » sans délégation
  citée ; débiteurs désignés par leur lot.
- Bloc marque, en-têtes et pied copiés **sans modification** depuis la fiche de la marque
  (logos, couleurs, mentions) ; seuls `[RAPPEL]`, le bloc titre et, le cas échéant, la ligne de contact du
  pied ont été remplacés.
- Langue de la marque (Syncura : tout en néerlandais), libellés du § 7, organe correct
  (Agigest : conseil syndical, pas d'ACP ni de BCE).
- Numérotation continue des points ; chaque action présente dans le récapitulatif avec le
  même libellé ; dates, heures et montants au bon format.
- HTML valide : balises fermées, `&` échappé, aucun marqueur `⟦…⟧` restant, aucun script.

## 10. Réponse dans le chat

Après le fichier, 3 à 5 lignes, sans recopier le PV : marque et langue ; nombre de points et
d'actions ; informations à compléter (liste des `[À COMPLÉTER]`) ; questions restées
ouvertes ; rappel en une ligne : « Ouvrir le fichier dans Edge, Ctrl+P, Enregistrer au format
PDF. »
