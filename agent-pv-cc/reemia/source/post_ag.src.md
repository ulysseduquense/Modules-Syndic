---
name: taches-post-ag
description: Lit le procès-verbal signé d'une assemblée générale de copropriété (Belgique : ACP / VME ; Luxembourg : syndicat des copropriétaires) et en tire la liste de suivi du gestionnaire — les actions concrètes à déclencher après l'AG, avec leur échéance et l'intervenant externe — livrée directement en document HTML A4 imprimable à la charte du syndic. Contient la méthode (FR et NL), les délais légaux belges et luxembourgeois, le catalogue décision → actions, le calcul des échéances, les libellés et le gabarit HTML. S'utilise avec le skill de charte de la marque (« Chartes syndic — … »). Pas pour rédiger un PV.
---

# Tâches post-AG — la liste de suivi du gestionnaire

Le gestionnaire sort de son AG ; le PV est signé. Il te le donne et attend **sa liste de suivi** :
ce qu'il doit déclencher maintenant, pour quand, et avec qui. Pas un audit du PV.

## 1. Ce que tu livres, en une seule réponse

Le fichier HTML `Plan d'actions AG - <copropriété> - <AAAA-MM-JJ>.html` (Syncura :
`Actieplan AV - <copropriété> - <AAAA-MM-JJ>.html`), date de l'AG, nom sans « ACP » ni « VME »,
puis une seule ligne : « Plan d'actions prêt : <N> tâches. Ouvrir dans Edge, Ctrl+P, Enregistrer
au format PDF. » Pas de liste dans le chat, pas de validation demandée, pas d'autre question que
la marque si elle est introuvable dans le PV.

**Se mettre à la place du gestionnaire, au lendemain de l'AG** :
- Le PV est signé : aucune tâche ni remarque sur les signatures.
- Les échéances se calculent à partir de la date de l'AG. Ne jamais les comparer à la date du
  jour, ni écrire « échu » ou « dépassé ».
- Une tâche = une action que le gestionnaire doit déclencher et suivre. **Pas de tâche** pour :
  ce qui est approuvé sans exécution (comptes, décharges, bureau, rapports, informations) ; ce
  qui est maintenu ou reconduit à l'identique (budget, provisions, fonds de réserve, contrats) ;
  la comptabilité et l'encodage courants (clôture, encodage, fiche, archivage) ; l'information
  de personnes présentes à l'AG (élus, demandeur présent) sauf s'il faut un écrit ; un point
  rejeté.
- Regrouper ce qui se fait d'un même geste (« Demander les devis et les soumettre au conseil »).
- Pas de commentaire sur la régularité du PV, les majorités ou les personnes.
- `[À PRÉCISER : …]` seulement pour une donnée sans laquelle l'action est impossible (montant
  d'un appel de fonds, par exemple). Sinon formuler la tâche sans la donnée (« dans le respect
  du préavis », « à la prise de cours du mandat »).

**Réflexion courte** : appliquer le catalogue, ne pas débattre des cas limites, ne pas rédiger
le document dans la réflexion. Textes courts : tâche ≤ 70 caractères, détail ≤ 80.

## 2. Lecture du PV

- **Marque** : le syndic qui a tenu l'AG (en-tête, « le syndic, X, représenté par … »). Lire sa
  fiche dans le skill « Chartes syndic ».
- **AG** : copropriété (nom, adresse, BCE / KBO, réf.), type, date et heure, lieu, syndic et
  son représentant.
- **Chaque point** : décision, et ce qui sert à l'action — entreprises, devis, montants, clés,
  dates, tranches, mandats et délégations (au conseil, au syndic, à un signataire), conditions,
  délais d'exécution, voix contre.

## 3. Formalités (une tâche, après toute AG)

- **Belgique** : « Consigner les décisions au registre et envoyer le PV aux copropriétaires » —
  J + 30 jours, Légal (art. 3.87 §12).
- **Luxembourg (Agigest)** : « Envoyer le PV : recommandé aux opposants et défaillants (fait
  courir leur recours de deux mois), simple aux autres » — J + 15 jours (proposée) ; au registre
  sans délai (RGD art. 10). Vocabulaire : syndicat des copropriétaires, conseil syndical,
  règlement de copropriété ; ni « ACP » ni « BCE ».

## 4. Catalogue : décision adoptée → actions

Échéance : « Légal » seulement quand c'est indiqué ici ; date fixée par l'AG → badge « AG » ;
sinon une date proposée sans badge (J + 15 pour un premier contact ou une commande, J + 30 pour
le reste) ou « — ».

- **Travaux, entreprise retenue** : « Commander <travaux> à <entreprise> » (devis, montant,
  financement dans le détail ; J + 15 ; intervenant : l'entreprise). Délai d'exécution fixé par
  l'AG : ajouter « Suivre les travaux jusqu'à la réception » à cette date (AG). Condition
  (permis, accord) : la tâche qui la lève d'abord.
- **Travaux, entreprise à choisir** : délégation au conseil → « Demander les devis et les
  soumettre au conseil » (date de l'AG si fixée, sinon J + 30 ; intervenant : conseil de
  copropriété), puis « Commander à l'entreprise choisie » (— ; intervenant : entreprise
  retenue). Sans délégation → devis à présenter à la prochaine AG.
- **Financement** : fonds de réserve → dans le détail de la commande, pas de tâche. Appel de
  fonds extraordinaire → une tâche par tranche, à la date d'exigibilité (AG).
- **Budget, provisions, fonds de réserve** : seulement si le montant ou la périodicité change
  → « Adapter les appels de provisions » ou « … du fonds de réserve » (J + 30).
- **Contrats** : résilier <contrat> dans le respect du préavis (—) ; conclure avec
  <fournisseur> (prise d'effet → AG) ; mise en concurrence → « Demander les offres et les
  soumettre à <conseil / prochaine AG> ». Reconduction : rien.
- **Syndic nommé ou reconduit** : « Faire signer le contrat de syndic par <signataire désigné> »
  (veille de la prise de cours si connue, sinon J + 30 ; intervenant : le signataire).
  **Belgique** : « Afficher l'extrait de nomination et mettre à jour la BCE » — prise de cours
  + 8 jours, Légal (art. 3.89 §2) ; prise de cours inconnue → échéance « 8 j après la prise de
  cours ». Changement de syndic : transmettre ou obtenir le dossier — fin du mandat + 30 jours,
  Légal (art. 3.89 §5).
- **Élections du conseil, commissaire** : rien.
- **ROI modifié** : « Mettre à jour le ROI et le communiquer » — Sans délai, Légal.
- **Statuts, acte de base, parties communes, vente** : « Mandater le notaire » (J + 30 ;
  intervenant : notaire).
- **Recouvrement, contentieux** : « Mandater <avocat> pour le lot <n> » (J + 15 ; intervenant :
  l'avocat). Le débiteur est désigné par son lot, jamais par son nom.
- **Autorisation à un copropriétaire** (enseigne, travaux privatifs) : « Confirmer par écrit
  l'accord de l'AG à <demandeur> » avec les conditions (J + 15) ; documents qu'il doit fournir →
  dans le détail (intervenant : le demandeur).
- **Sinistre, emprunt** : l'action, avec l'assureur ou la banque comme intervenant.
- **Demande de l'AG au syndic** (étude, offre, vérification, y compris en « divers ») : la tâche,
  échéance « Prochaine AG » (AG). **Point reporté** : « Réinscrire à la prochaine AG ».
- **Prochaine AG à date fixée** : « Convoquer l'AG » — date − 15 jours, Légal (art. 3.87 §3 ;
  Luxembourg : RGD art. 3). Seulement une période : rien.
- **AG de carence** : « Convoquer la deuxième AG » (au plus tôt J + 15 jours, art. 3.87 §5).

## 5. Échéances

- **+ N jours** : ajouter N au quantième ; tant que le résultat dépasse la longueur du mois,
  retrancher cette longueur et passer au mois suivant. **+ N mois** : même quantième, ou
  dernier jour du mois. **− 15 jours** : à rebours. Mois de 31 jours : janv., mars, mai, juil.,
  août, oct., déc. ; 30 : avr., juin, sept., nov. ; févr. 28 (29 en 2028).
- Exemples : AG 15/10/2026 → J + 15 = 30/10/2026, J + 30 = 14/11/2026. AG 06/10/2025 → J + 15 =
  21/10/2025, J + 30 = 05/11/2025. Prise de cours 01/01/2027 + 8 j = 09/01/2027.
- **Ordre du tableau** : « Sans délai », puis dates croissantes, puis échéances en texte, puis
  « — » ; une tâche qui en conditionne une autre passe avant.

## 6. À noter (3 lignes au plus, souvent aucune)

Seulement ce qui change la manière d'exécuter : décision adoptée avec des voix contre et suivie
de travaux (« Pt 5 adopté avec 2 voix contre : recours possible jusqu'au <J + 4 mois> »,
Belgique, art. 3.92 §3) ; plafond ou date limite d'une délégation au conseil (délégation valable
un an au plus, art. 3.90) ; condition posée par l'AG. Rien d'autre.

## 7. Libellés

| élément | français (Belgique, Luxembourg) | Syncura (néerlandais) |
|---|---|---|
| surtitre · titre | Plan d'actions · Suites de l'assemblée générale | Actieplan · Opvolging van de algemene vergadering |
| copropriété | ACP <nom> ; Agigest : <nom> (« Résidence … ») | VME <naam> |
| sous-ligne | adresse · BCE <n°> · Réf. <réf> ; Agigest : adresse · Réf. <réf> | adres · KBO <n°> · Ref. <ref> |
| grille | Assemblée · Syndic | Vergadering · Syndicus |
| synthèse | <N> tâches · PV à envoyer au plus tard le <date> | <N> taken · notulen te versturen uiterlijk op <datum> |
| colonnes | N° · Tâche · Pt · Échéance · Intervenant externe | Nr · Taak · Pt · Termijn · Externe partij |
| badges | Légal · AG | Wettelijk · AV |
| échéances en texte | Sans délai · Prochaine AG · 8 j après la prise de cours | Onverwijld · Volgende AV · 8 d na aanvang |
| encadré · fin | À noter · Sans suite : pts … | Opgelet · Geen opvolging: pt … |
| rappel des pages 2+ | Plan d'actions AG — <nom> — JJ/MM/AAAA | Actieplan AV — <naam> — DD/MM/JJJJ |

Syncura : tout en néerlandais, même si la conversation est en français. Tâches T01, T02… dans
l'ordre du tableau ; libellé à l'infinitif. Points et sous-points numérotés exactement comme
dans le PV (8.2, 11.1.1). Dates JJ/MM/AAAA ; grille : « lundi 6 octobre 2025,
14h00 » (NL : « maandag 6 oktober 2025, 14u00 »). Montants comme dans le PV.

## 8. Gabarit HTML

### 8.1 Squelette

Remplacer les quatre marqueurs de charte par les blocs de la fiche de la marque, copiés tels
quels (adresses `data:` des logos d'un seul tenant, sans rien couper ni reformater), et
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

`lang="nl"` pour Syncura. `⟦RAPPEL⟧` et `[RAPPEL]` (en-tête des pages suivantes) : le rappel du
§ 7. Bloc titre : la variante de la fiche, `[SURTITRE]`, `[TITRE]`, `[COPROPRIÉTÉ]`,
`[SOUS-LIGNE]` remplacés par le § 7. Ligne 2 du pied : contact du gestionnaire seulement si le
PV le donne.

### 8.2 CSS (à copier tel quel)

```css
{{CSS}}
```

### 8.3 Contenu — exemple à reproduire (abrégé)

```html
<p class="surtitre">Plan d'actions</p>
<h1 class="titre">Suites de l'assemblée générale</h1>
<p class="acp accent">ACP Résidence Les Coteaux</p>
<p class="acp-sous">Rue de l'Exemple 12, 1180 Uccle · BCE 0800.000.000</p>
<table class="infos">
<tr><th>Assemblée</th><td>AG ordinaire du jeudi 15 octobre 2026, 18h30 — Salle paroissiale, Uccle</td></tr>
<tr><th>Syndic</th><td>Office des Propriétaires SA, représentée par Julie Martin</td></tr>
</table>
<p class="synthese"><b>7 tâches</b> · PV à envoyer au plus tard le <b>14/11/2026</b></p>
<table class="t taches"><thead><tr><th>N°</th><th>Tâche</th><th>Pt</th><th>Échéance</th><th>Intervenant externe</th></tr></thead>
<tr><td>T01</td><td>Mettre à jour le ROI et le communiquer<i>Art. 14 : barbecues interdits sur terrasses et balcons.</i></td><td>12</td><td>Sans délai<b class="l">Légal</b></td><td></td></tr>
<tr><td>T02</td><td>Commander les descentes d'eau pluviale à Toitures Meuse SRL<i>Devis 2026-118, 8.740,00 € TVAC, financé par le fonds de réserve.</i></td><td>5</td><td>30/10/2026</td><td>Toitures Meuse SRL</td></tr>
<tr><td>T03</td><td>Consigner les décisions au registre et envoyer le PV aux copropriétaires</td><td>—</td><td>14/11/2026<b class="l">Légal</b></td><td></td></tr>
<tr><td>T04</td><td>Demander les devis de façade et les soumettre au conseil<i>Mandat de l'AG : 45.000,00 € TVAC au plus.</i></td><td>6</td><td>15/12/2026<b class="a">AG</b></td><td>Conseil de copropriété</td></tr>
<tr><td>T05</td><td>Afficher l'extrait de nomination du syndic et mettre à jour la BCE</td><td>9</td><td>09/01/2027<b class="l">Légal</b></td><td></td></tr>
<tr><td>T06</td><td>Présenter une étude sur les bornes de recharge</td><td>15</td><td>Prochaine AG<b class="a">AG</b></td><td></td></tr>
<tr><td>T07</td><td>Commander la façade à l'entreprise choisie par le conseil</td><td>6</td><td>—</td><td>Entreprise retenue</td></tr>
</table>
<div class="encadre"><p class="lbl">À noter</p><ul>
<li>Pt 5 adopté avec 2 voix contre : recours possible jusqu'au 15/02/2027.</li>
</ul></div>
<p class="synthese">Sans suite : pts 1 à 3, 10, 11 et 13 (rejeté).</p>
```

Détail facultatif : `<i>…</i>` après le libellé. Badges : `<b class="l">Légal</b>`,
`<b class="a">AG</b>` (Syncura : Wettelijk, AV) ; date proposée : sans badge. Encadré « À
noter » omis s'il est vide. Échapper `&` en `&amp;`.

## 9. Contrôle avant de livrer

Chaque point adopté qui appelle une action a sa tâche ; les autres sont dans « Sans suite » ;
pas de tâche pour un point rejeté ; T01… dans l'ordre, sans trou ; nombre de tâches exact ;
dates recomptées ; intervenants uniquement externes (jamais un collaborateur, « Syndic » ni
« Gestionnaire ») ; montants et noms identiques au PV ; blocs de charte intacts ; aucun
marqueur `⟦…⟧` ni `[RAPPEL]` restant ; balises fermées.

**Corrections** (« ajoute une tâche », « le point 7 est reporté ») : repartir du dernier
document, modifier seulement ce qui est demandé, relivrer le fichier complet et dire en une
ligne ce qui a changé.
