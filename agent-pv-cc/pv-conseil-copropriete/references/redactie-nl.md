# Rédaction en néerlandais (marques néerlandophones : Syncura)

Le PV est rédigé **entièrement en néerlandais de Belgique**, registre administratif,
même si les notes sont tapées en français. Les règles de fond de `redaction.md`
s'appliquent à l'identique (ne rien inventer, position du conseil, données
personnelles…) ; ce fichier donne la langue. Les messages dans le chat restent dans la
langue de l'utilisateur.

Le générateur traduit déjà tous les libellés fixes (titre « Vergadering van de raad van
mede-eigendom », Datum, Aanwezigheden, Standpunt van de raad, Opvolging, Overzicht van de
acties, Volgende vergadering, Handtekeningen, dates « donderdag 5 november 2026 », heures
« 18u00 »). L'agent écrit en néerlandais : les titres des points, le `contenu`, les
`decision`, les `actions`, `qualite`, `president_seance`, `secretaire`, `fonction`,
`annexes`, `diffusion`. Modèle : `assets/voorbeeld-verslag-nl.json`.

## Ton et temps

- Présent, troisième personne, phrases courtes : « De syndicus deelt mee dat… »,
  « De raad neemt kennis van… », « Mevr. Peeters meldt dat… ».
- Civilités : **Dhr.** (M.), **Mevr.** (Mme).
- Neutre et factuel : « Dhr. X is het hier niet mee eens » plutôt que tout jugement.

## Formulations

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
| « CC ok pour … » | De raad geeft een gunstig advies over… |
| ouverture d'un point d'info | Ter informatie: … |

Comme en français : jamais « de raad beslist » sans délégation de l'AG citée dans les notes.

## Terminologie (Code civil, livre 3 — Burgerlijk Wetboek, boek 3)

| français | néerlandais |
|---|---|
| ACP, association des copropriétaires | VME, vereniging van mede-eigenaars |
| conseil de copropriété | raad van mede-eigendom |
| syndic | syndicus |
| assemblée générale (AG) | algemene vergadering (AV) |
| commissaire aux comptes | commissaris van de rekeningen |
| fonds de roulement / fonds de réserve | werkkapitaal / reservekapitaal |
| décompte de charges | afrekening van de lasten |
| appel de fonds | opvraging van provisies |
| arriérés de charges | achterstallige lasten |
| rappel / mise en demeure | herinnering / ingebrekestelling |
| devis / bon de commande | offerte / bestelbon |
| entrepreneur, fournisseur | aannemer, leverancier |
| sinistre / franchise | schadegeval / vrijstelling |
| parties communes / privatives | gemeenschappelijke delen / privatieve delen |
| règlement d'ordre intérieur (ROI) | huishoudelijk reglement |
| règlement de copropriété / acte de base | reglement van mede-eigendom / basisakte |
| lot / quote-part | kavel / aandeel |
| ordre du jour / divers | agenda / varia |
| ascenseur, chauffage, nettoyage | lift, verwarming, schoonmaak |
| TVAC / HTVA | incl. btw / excl. btw |
| BCE / IPI | KBO / BIV |
| présent, excusé, absent, représenté | aanwezig, verontschuldigd, afwezig, vertegenwoordigd |

Valeurs de `presence` acceptées : françaises ou néerlandaises (`aanwezig`,
`verontschuldigd`, `afwezig`, `vertegenwoordigd`) — affichées en néerlandais.

## Forme

- Dates dans le texte : « 5 november 2026 » ; dans les tableaux : `05/11/2026`.
- Montants : `8.740,00 €`, avec « incl. btw » / « excl. btw » si connu.
- Information manquante : `[AAN TE VULLEN: …]` (surligné en jaune comme en français).
- Noms de personnes et de sociétés : tels quels, jamais traduits.
