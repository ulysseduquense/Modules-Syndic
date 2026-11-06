---
name: taches-post-ag
description: Lit le procès-verbal d'une assemblée générale de copropriété (Belgique : ACP / VME ; Luxembourg : syndicat des copropriétaires) et en tire toutes les tâches qui suivent pour le syndic — formalités légales avec leurs délais calculés, exécution de chaque décision, intervenants externes. Livre d'abord la liste dans le chat, puis le plan d'actions HTML A4 imprimable à la charte du syndic. Contient la méthode de lecture (FR et NL), les délais légaux belges et luxembourgeois, le catalogue décision → tâches, le calcul des échéances, les libellés et le gabarit HTML compact. S'utilise avec le skill de charte de la marque (« Chartes syndic — … »). Pas pour rédiger un PV.
---

# Tâches post-AG — lecture du PV et plan d'actions

Le gestionnaire te donne le **procès-verbal d'une assemblée générale** (fichier joint ou texte
collé). Tu en tires les tâches qui suivent pour le syndic, puis tu les mets en page à la charte
du syndic.

## 1. Deux temps, deux réponses

Le document HTML est long à écrire : pour qu'il passe d'un seul jet, le travail se fait en deux
réponses.

1. **Liste** (première réponse) : la liste des tâches dans le chat, en tableau markdown
   compact (§ 9), avec les éléments à préciser. Elle termine par : « Réponds « génère » pour le
   plan d'actions à la charte, ou corrige la liste. »
2. **Document** (après « génère », « ok », « vas-y » ou des corrections) : le fichier HTML
   `Plan d'actions AG - <copropriété> - <AAAA-MM-JJ>.html` (Syncura :
   `Actieplan AV - <copropriété> - <AAAA-MM-JJ>.html`), date de l'AG, nom sans « ACP » ni
   « VME ». Ouvert dans Edge : Ctrl+P → « Enregistrer au format PDF ». Puis une ligne de
   réponse (§ 10).

Si le premier message demande expressément le document (« génère directement », « fais le
document »), faire les deux dans la même réponse : la liste en une ligne par tâche, puis le
fichier.

**Économie** (indispensable pour que la réponse aille au bout) :
- Réflexion courte : appliquer le catalogue sans débattre des cas limites ; un doute devient
  `[À PRÉCISER : …]`. Ne jamais rédiger le document ni la liste dans la réflexion.
- Au moment du document, reprendre la liste validée telle quelle, sans réanalyser le PV.
- Textes courts : tâche ≤ 60 caractères, détail ≤ 70, objet dans le suivi ≤ 30, points
  d'attention 4 au plus d'une ligne chacun. Ne pas répéter une information d'une partie à
  l'autre.

## 2. Lecture du PV

1. Lire tout le PV. Pages manquantes, scan illisible, annexes citées absentes : le dire dans la
   liste (première réponse), pas dans le document, et travailler sur le reste. Sans PV : le
   demander.
2. **Marque** : le syndic qui a tenu l'AG (en-tête, pied de page, « le syndic, X, représenté
   par … »). Introuvable : la demander en une ligne. Lire sa fiche dans le skill « Chartes
   syndic ».
3. **Données de l'AG** : copropriété (nom, adresse, BCE / KBO, réf.), type (ordinaire,
   extraordinaire, deuxième séance, carence), date et heure, lieu, président(e), syndic et
   représentant, nombre de pages et de points.
4. **Chaque point** : numéro, objet, résultat (§ 7), et ce qui sert à l'exécution : montants,
   clés, entreprises et devis, dates, tranches, durées de mandat, élus, conditions, délais
   d'exécution, délégations, mandats au syndic ; voix contre : nombre de copropriétaires (avec
   leurs lots si le PV les donne, jamais les noms), sinon les quotes-parts.
5. **Question** : une seule, et seulement si la marque ou la date de l'AG est introuvable.

## 3. Règles non négociables

- **Le PV est la seule source** : aucun montant, nom, entreprise, date ou condition qui n'y
  figure pas ; sinon `[À PRÉCISER : …]` (Syncura : `[TE VERDUIDELIJKEN: …]`).
- **Décision rejetée = aucune tâche.** Point reporté : sa réinscription à la prochaine AG.
- **Chaque point du PV** figure dans le suivi, avec ses tâches ou « Aucune suite ».
- **Intervenant externe** : seulement la personne extérieure au syndic qui doit agir
  (entrepreneur, fournisseur, architecte, expert, notaire, avocat, assureur, banque, conseil
  de copropriété, signataire, copropriétaire d'un lot, ancien ou nouveau syndic). Jamais un
  collaborateur, « Syndic » ni « Gestionnaire ». Une personne seulement informée : cellule
  vide. Pas encore choisie : « Entreprise retenue », « Fournisseur retenu ».
- **Données personnelles** : débiteur, demandeur, opposant → son lot, jamais son nom. Les élus
  (conseil, commissaire, président) peuvent être nommés.
- **Délais** : « Légale » uniquement pour ceux des § 4 et § 5 ; un délai d'usage est
  « Proposée ». Ne jamais juger la validité d'une décision ni les majorités.
- **Langue** : Syncura → tout en néerlandais (VME, AV, syndicus). Agigest → droit
  luxembourgeois (§ 4.2), « conseil syndical », ni « ACP » ni « BCE ».
- **Charte** : blocs de la fiche copiés tels quels (logos, couleurs, mentions) ; seuls changent
  `[RAPPEL]`, le bloc titre (§ 7) et, si le PV donne le contact du gestionnaire, la ligne 2 du
  pied.

## 4. Formalités communes (après toute AG)

`J` = date de l'AG. Domaine 1.

### 4.1 Belgique (Code civil, livre 3)

| tâche | échéance | type · base |
|---|---|---|
| Consigner les décisions dans le registre et archiver le PV (PV signé, présences, procurations) | J + 30 j | Légale · art. 3.87 §12 |
| Transmettre le PV à tous les copropriétaires (et aux autres syndics s'il y a des associations partielles) | J + 30 j | Légale · art. 3.87 §12 |
| Faire compléter les signatures du PV — **seulement** si le document n'en porte pas et ne dit pas qu'il est signé en séance | Sans délai | Légale · art. 3.87 §10 |
| Informer les occupants des décisions qui les concernent (travaux, accès, ROI) — s'il y en a | J + 30 j | Proposée |

Point d'attention, toujours : « Recours possible jusqu'au <J + 4 mois> (art. 3.92 §3) », avec
les voix contre ; la date figure aussi dans les échéances clés.

### 4.2 Luxembourg — Agigest (loi du 16 mai 1975, RGD du 13 juin 1975)

| tâche | échéance | type · base |
|---|---|---|
| Inscrire au registre le PV signé (président, secrétaire, bureau) et l'archiver | Sans délai | Légale · RGD art. 10 |
| Notifier les décisions aux opposants et défaillants par recommandé avec AR (fait courir leur délai de recours) | J + 15 j | Proposée · loi art. 34 |
| Transmettre le PV aux autres copropriétaires | J + 30 j | Proposée |

Point d'attention, toujours : « Recours : deux mois à compter de la notification pour les
opposants et défaillants (loi du 16 mai 1975, art. 34). » Vocabulaire : syndicat des
copropriétaires, conseil syndical, règlement de copropriété ; « FR » n'existe pas (avance de
trésorerie, fonds de travaux, provision).

## 5. Catalogue : décision adoptée → tâches

Domaines D1 à D8 (§ 7). Échéance : « Légale » seulement si indiquée ici ; date ou moment fixé
par la décision → « AG » ; sinon « Proposée » si une date est indiquée ici, ou « — ». Une
tâche qui en conditionne une autre la précède.

- **Sans suite** : bureau, quorum, PV précédent, rapports, informations, décharges données.
- **Comptes** (D2) : clôturer l'exercice <période> (J + 30, Proposée). Non approuvés :
  corriger et représenter (« Prochaine AG »). Décharge refusée : point d'attention.
- **Budget, provisions, fonds de roulement** (D2) : encoder le budget et adapter les provisions
  (J + 30, Proposée) ; appeler le fonds de roulement voté.
- **Fonds de réserve** (D2) : appeler la contribution votée ; prélèvement voté → l'imputer.
- **Appel de fonds extraordinaire** (D2) : une tâche par tranche (montant, clé) ; échéance =
  exigibilité fixée par l'AG, sinon `[À PRÉCISER : exigibilité]`.
- **Travaux, entreprise retenue** (D3) : commander à <entreprise> (devis, montant) (J + 15,
  Proposée ; intervenant : l'entreprise) ; planifier, suivre et réceptionner (délai
  d'exécution fixé par l'AG → « AG », sinon — ; intervenant : l'entreprise). Sous condition
  (permis, accord du conseil) : d'abord la tâche qui lève la condition (J + 15, Proposée),
  puis la commande sans échéance.
- **Travaux, entreprise à choisir** (D3) : demander les devis (intervenant : entreprises
  consultées) ; soumettre le choix au conseil (délégation) ou à la prochaine AG ; commander.
- **Étude, expertise** (D3 ou D7) : mandater <expert, architecte> (intervenant) ; présenter
  les résultats à qui l'AG a désigné.
- **Délégation au conseil** (D5, Belgique) : « Soumettre au conseil <objet> » (intervenant :
  conseil ; « AG » si une date est fixée). Point d'attention : objet, plafond. Échéances
  clés : « Fin de la délégation au conseil » à J + 1 an (Légale · art. 3.90). Luxembourg :
  acte précisément déterminé, compte rendu à l'AG, pas de durée légale.
- **Mandat donné au syndic** : une tâche par acte autorisé, avec ses limites.
- **Contrats** (D4) : résilier <contrat> par recommandé (échéance `[À PRÉCISER : préavis]` si
  le PV ne la donne pas) ; conclure avec <fournisseur> (prise d'effet fixée → « AG ») ; mise
  en concurrence : demander les offres (intervenant : fournisseurs consultés), puis les
  présenter à qui l'AG a désigné ; assurance : transmettre au courtier ou à l'assureur.
- **Syndic nommé ou renouvelé** (D5) :
  - établir le contrat écrit (durée, prise de cours ; trois ans au plus) et le faire signer —
    intervenant : le signataire désigné, sinon `[À PRÉCISER : signataire]` ; veille de la prise
    de cours (Proposée) ; base art. 3.89 §1 (Luxembourg : RGD art. 18) ;
  - **Belgique** : afficher à l'entrée l'extrait de l'acte de nomination — **prise de cours +
    8 j**, Légale · art. 3.89 §2 ; mettre à jour la BCE (début et fin du mandat), même date,
    Proposée ;
  - point d'attention : « Mandat jusqu'au <fin> : renouvellement à l'AG qui précède. »
- **Changement de syndic** (D5) : transmettre tout le dossier de gestion au nouveau syndic —
  **fin du mandat + 30 j**, Légale · art. 3.89 §5 (Luxembourg : Proposée) ; intervenant :
  nouveau syndic. Si la marque reprend un immeuble : obtenir le dossier de l'ancien syndic
  (même échéance), puis les tâches de nomination.
- **Élus : conseil, commissaire** (D5) : une seule tâche « Informer les élus » (noms, J + 15,
  Proposée).
- **Fiche de la copropriété** (D5) : une seule tâche pour toutes les mises à jour (conseil,
  commissaire, dates du contrat de syndic) (J + 30, Proposée).
- **ROI modifié** (D6) : mettre à jour et diffuser le ROI (« Sans délai », Légale · Code
  civil, livre 3).
- **Statuts, acte de base, quotités, parties communes, vente** (D6) : mandater le notaire et
  lui transmettre PV et pièces (J + 30, Proposée ; intervenant : notaire) ; mettre à jour les
  données après l'acte (—).
- **Recouvrement, contentieux** (D6) : mandater <avocat, huissier> contre le lot <n> et lui
  transmettre le dossier (J + 15, Proposée ; avocat non nommé → `[À PRÉCISER : avocat]`).
  Mise en demeure seulement si le PV en parle.
- **Autorisation à un lot** (D7) : notifier l'autorisation et ses conditions au copropriétaire
  du lot <n> (J + 15, Proposée) ; une tâche par document ou action qu'il doit fournir ou faire
  (intervenant : copropriétaire du lot <n> ; « avant les travaux » si le PV le dit).
- **Sinistre** (D4) : déclarer ou suivre auprès de l'assureur ou du courtier (intervenant).
- **Emprunt** (D2) : conclure l'emprunt <montant, durée> (intervenant : banque).
- **Demande de l'AG au syndic** (D7, y compris en « divers ») : la tâche, « Prochaine AG » (badge AG).
- **Point reporté** (D8) : le réinscrire à la prochaine AG (« Prochaine AG », badge AG).
- **Prochaine AG** (D8) : convoquer l'AG — date fixée : date − 15 j ; seulement une période :
  « 15 j avant l'AG » ; Légale · art. 3.87 §3 (Luxembourg : RGD art. 3) ; détail : points à
  inscrire (demandes, reports, mandats qui expirent).
- **AG de carence** (D8) : convoquer la deuxième AG (« Sans délai », Proposée ; détail : « au
  plus tôt le <J + 15 j>, art. 3.87 §5 »).
- **Autre décision** (D7) : la tâche qui l'exécute.

## 6. Échéances

- **+ N jours** : jours calendrier ; ajouter N au quantième, et tant que le résultat dépasse la
  longueur du mois, retrancher cette longueur et passer au mois suivant. **+ N mois, + 1 an** :
  même quantième, ou dernier jour du mois s'il n'existe pas. **− 15 jours** : à rebours.
- Mois : janv. 31, févr. 28 (29 en 2028), mars 31, avr. 30, mai 31, juin 30, juil. 31, août 31,
  sept. 30, oct. 31, nov. 30, déc. 31. Pas de report au jour ouvrable.
- Exemples : AG 15/10/2026 → J + 15 = 30/10/2026 ; J + 30 = 14/11/2026 ; J + 4 mois =
  15/02/2027 ; J + 1 an = 15/10/2027. AG 31/10/2026 → J + 30 = 30/11/2026 ; J + 4 mois =
  28/02/2027. Prise de cours 01/01/2027 + 8 j = 09/01/2027. AG 20/10/2027 − 15 j = 05/10/2027.
- **Échéance déjà passée** (PV ancien) : la garder et le dire en un point d'attention.
- **Ordre** dans un domaine : « Sans délai », dates croissantes, « Prochaine AG », « — » et
  `[À PRÉCISER]` ; une tâche qui en conditionne une autre passe avant.
- **Échéances clés** : dates de type Légale et AG, fin du délai de recours (Belgique), fin de
  délégation ; une ligne par date, chronologique ; échéance textuelle en dernier, son texte
  dans la colonne Date.

## 7. Libellés

| élément | Belgique, Luxembourg (français) | Syncura (néerlandais) |
|---|---|---|
| surtitre · titre | Plan d'actions · Suites de l'assemblée générale | Actieplan · Opvolging van de algemene vergadering |
| copropriété | ACP <nom> ; Agigest : <nom> (« Résidence … ») | VME <naam> |
| sous-ligne (absents omis) | adresse · BCE <n°> · Réf. <réf> ; Agigest : adresse · Réf. <réf> | adres · KBO <n°> · Ref. <ref> |
| grille | Assemblée · Présidence de l'AG · Syndic · Document analysé | Vergadering · Voorzitter van de AV · Syndicus · Geanalyseerd document |
| synthèse | <N> tâches, dont <L> à délai légal et <A> à date fixée par l'AG · prochaine échéance légale : <date>. (sans date légale : arrêter après « l'AG ») | <N> taken, waarvan <L> met wettelijke termijn en <A> met een door de AV vastgelegde datum · eerstvolgende wettelijke termijn: <datum>. |
| titres | Échéances clés · Tâches · Suivi des points de l'ordre du jour ; encadré : Points d'attention | Belangrijke termijnen · Taken · Opvolging van de agendapunten ; Aandachtspunten |
| colonnes | Date · Échéance · Tâches · base ‖ N° · Tâche · Pt · Échéance · Intervenant externe ‖ Pt · Objet · Résultat · Tâches | Datum · Termijn · Taken · grondslag ‖ Nr · Taak · Pt · Termijn · Externe partij ‖ Pt · Onderwerp · Resultaat · Taken |
| domaines | 1. Formalités légales · 2. Finances et comptabilité · 3. Travaux et entretien · 4. Contrats, fournisseurs et assurances · 5. Syndic, conseil et commissaire (Agigest : Syndic et conseil syndical) · 6. Statuts, ROI et contentieux (Agigest : Règlement de copropriété et contentieux) · 7. Autres décisions · 8. Prochaine assemblée | 1. Wettelijke formaliteiten · 2. Financiën en boekhouding · 3. Werken en onderhoud · 4. Contracten, leveranciers en verzekeringen · 5. Syndicus, raad en commissaris · 6. Statuten, HR en geschillen · 7. Andere beslissingen · 8. Volgende algemene vergadering |
| badges | Légale · AG · Proposée | Wettelijk · AV · Voorstel |
| échéances textuelles | Sans délai · Prochaine AG · 15 j avant l'AG | Onverwijld · Volgende AV · 15 d vóór de AV |
| résultats | Adopté · Rejeté · Pris acte · Reporté · Retiré · Sans vote ; Aucune suite | Goedgekeurd · Verworpen · Kennisname · Uitgesteld · Ingetrokken · Zonder stemming ; Geen opvolging |
| diffusion | Document de travail interne établi à partir du PV de l'AG du JJ/MM/AAAA — à vérifier avant exécution. | Interne werknota op basis van de notulen van de AV van DD/MM/JJJJ — na te kijken vóór uitvoering. |
| rappel des pages 2+ (nom sans ACP ni VME) | Plan d'actions AG — <nom> — JJ/MM/AAAA | Actieplan AV — <naam> — DD/MM/JJJJ |

Domaine sans tâche : omis, sans renuméroter. Tâches T01, T02… sans trou. Libellé : verbe à
l'infinitif (NL : « Notulen bezorgen aan alle mede-eigenaars »). Dates JJ/MM/AAAA ; dans la
grille : « jeudi 15 octobre 2026, 18h30 » (NL : « donderdag 15 oktober 2026, 18u30 »).
Montants comme dans le PV.

## 8. Gabarit HTML

### 8.1 Squelette

Remplacer les quatre marqueurs de charte par les blocs de la fiche de la marque, et
`⟦CONTENU⟧` par le plan (§ 8.3).

```html
<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>⟦RAPPEL⟧</title>
⟦BLOC MARQUE⟧
<style>
⟦CSS : copier tel quel le § 8.2⟧
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

`lang="nl"` pour Syncura. `⟦RAPPEL⟧` et `[RAPPEL]` de l'en-tête des pages suivantes : le rappel
du § 7. Les adresses `data:` des logos se copient d'un seul tenant, sans rien couper ni
reformater (`1.91` reste `1.91`). Rien en dehors du tableau `cadre`, sauf l'en-tête des pages
suivantes et le pied.

### 8.2 CSS (à copier tel quel)

```css
{{CSS}}
```

### 8.3 Contenu

Échapper `&` en `&amp;`. Exemple (OP, français) — reproduire exactement ce balisage :

```html
<p class="surtitre">Plan d'actions</p>
<h1 class="titre">Suites de l'assemblée générale</h1>
<p class="acp accent">ACP Résidence Les Coteaux</p>
<p class="acp-sous">Rue de l'Exemple 12, 1180 Uccle · BCE 0800.000.000</p>
<table class="infos">
<tr><th>Assemblée</th><td>AG ordinaire du jeudi 15 octobre 2026, 18h30 — Salle paroissiale, Uccle</td></tr>
<tr><th>Présidence de l'AG</th><td>Mme Anne Lambert</td></tr>
<tr><th>Syndic</th><td>Office des Propriétaires SA, représentée par Julie Martin</td></tr>
<tr><th>Document analysé</th><td>PV de l'AG du 15/10/2026 (3 pages, 16 points)</td></tr>
</table>
<p class="synthese"><b>24 tâches</b>, dont 4 à délai légal et 6 à date fixée par l'AG · prochaine échéance légale : <b>14/11/2026</b>.</p>
<h2 class="section">Échéances clés</h2>
<table class="t ech"><tr><th>Date</th><th>Échéance</th><th>Tâches · base</th></tr>
<tr><td>14/11/2026</td><td>Registre des décisions et envoi du PV</td><td>T01, T02 · art. 3.87 §12</td></tr>
<tr><td>15/02/2027</td><td>Fin du délai de recours</td><td>art. 3.92 §3</td></tr>
</table>
<div class="encadre"><p class="lbl">Points d'attention</p><ul>
<li>Recours possible jusqu'au 15/02/2027 ; voix contre : 2 copropriétaires au pt 5.</li>
</ul></div>
<h2 class="section">Tâches</h2>
<table class="t taches"><thead><tr><th>N°</th><th>Tâche</th><th>Pt</th><th>Échéance</th><th>Intervenant externe</th></tr></thead>
<tr class="d"><td colspan="5">1. Formalités légales</td></tr>
<tr><td>T01</td><td>Consigner les décisions dans le registre et archiver le PV</td><td>—</td><td>14/11/2026<b class="l">Légale</b></td><td></td></tr>
<tr><td>T03</td><td>Informer les occupants des décisions qui les concernent<i>Toiture (pt 5), barbecues (pt 12).</i></td><td>5, 12</td><td>14/11/2026<b class="p">Proposée</b></td><td></td></tr>
<tr class="d"><td colspan="5">3. Travaux et entretien</td></tr>
<tr><td>T10</td><td>Commander les descentes d'eau pluviale<i>Devis 2026-118, 8.740,00 € TVAC.</i></td><td>5</td><td>30/10/2026<b class="p">Proposée</b></td><td>Toitures Meuse SRL</td></tr>
<tr><td>T11</td><td>Planifier, suivre et réceptionner les travaux</td><td>5</td><td>31/03/2027<b class="a">AG</b></td><td>Toitures Meuse SRL</td></tr>
<tr><td>T14</td><td>Résilier le contrat d'ascenseur Ascenseurs Delta SA</td><td>8</td><td><mark>[À PRÉCISER : préavis]</mark></td><td></td></tr>
</table>
<h2 class="section">Suivi des points de l'ordre du jour</h2>
<table class="t suivi"><tr><th>Pt</th><th>Objet</th><th>Résultat</th><th>Tâches</th></tr>
<tr><td>1</td><td>Bureau de séance</td><td>Adopté</td><td>Aucune suite</td></tr>
<tr><td>5</td><td>Descentes d'eau pluviale</td><td>Adopté</td><td>T03, T09-T11</td></tr>
<tr><td>13</td><td>Véranda du lot 12</td><td>Rejeté</td><td>Aucune suite</td></tr>
</table>
<p class="diffusion">Document de travail interne établi à partir du PV de l'AG du 15/10/2026 — à vérifier avant exécution.</p>
```

- Bloc titre : la variante de la fiche, `[SURTITRE]`, `[TITRE]`, `[COPROPRIÉTÉ]`,
  `[SOUS-LIGNE]` remplacés par le § 7.
- Détail facultatif : `<i>…</i>` après le libellé. Badges : `<b class="l">`, `<b class="a">`,
  `<b class="p">` (Légale, AG, Proposée). Sans échéance : `—` sans badge. À préciser :
  `<mark>[À PRÉCISER : …]</mark>`.
- Ligne de domaine : `<tr class="d"><td colspan="5">…</td></tr>`.

## 9. Liste dans le chat (première réponse)

Une ligne de contexte (marque, langue, AG du …), puis un tableau markdown, une ligne par
tâche, groupé par domaine :

| N° | Tâche | Pt | Échéance | Intervenant externe |
|---|---|---|---|---|
| T01 | Consigner les décisions dans le registre et archiver le PV | — | 14/11/2026 (légale) | |

Puis les échéances clés en une ligne, les points d'attention (4 au plus), les points sans
suite (« Pts 1, 3, 13 : aucune suite »), les éléments à préciser, et la phrase du § 1.

## 10. Contrôle et réponse finale

Avant le document : chaque point du PV dans le suivi ; aucune tâche pour un point rejeté ;
références du suivi existantes ; T01… sans trou ; nombres de la synthèse exacts ; dates
recomptées ; intervenants uniquement externes ; lots et non noms ; blocs de charte intacts ;
aucun marqueur `⟦…⟧` ni `[RAPPEL]` restant ; balises fermées.

Après le fichier : une ligne — « Plan d'actions prêt : <N> tâches. Ouvrir dans Edge, Ctrl+P,
Enregistrer au format PDF. »
