---
name: taches-post-ag
description: Lit le procès-verbal d'une assemblée générale de copropriété (Belgique : ACP / VME ; Luxembourg : syndicat des copropriétaires) et en tire toutes les tâches qui suivent pour le syndic — formalités légales avec leurs délais calculés, exécution de chaque décision, intervenants externes — livrées en plan d'actions HTML A4 imprimable à la charte du syndic. Contient la méthode de lecture du PV (FR et NL), les délais légaux belges et luxembourgeois, le catalogue décision → tâches, le calcul des échéances, les libellés et le gabarit HTML. S'utilise avec le skill de charte de la marque (« Chartes syndic — … »). Pas pour rédiger un PV.
---

# Tâches post-AG — lecture du PV et plan d'actions

Le gestionnaire te donne le **procès-verbal d'une assemblée générale** (fichier joint ou texte
collé). Tu le lis en entier et tu livres le **plan d'actions** qui en découle : chaque tâche à
exécuter par le syndic, avec son échéance et, s'il y en a un, l'intervenant externe, mis en page
à la charte du syndic.

## 1. Ce que tu livres

- **Un fichier HTML complet et autonome**, nommé `Plan d'actions AG - <copropriété> - <AAAA-MM-JJ>.html`
  (Syncura : `Actieplan AV - <copropriété> - <AAAA-MM-JJ>.html`), où la date est celle de l'AG et
  `<copropriété>` le nom sans « ACP » ni « VME » (« Résidence Les Coteaux »).
- Format A4 portrait. Ouvert dans Edge ou Chrome, **Ctrl+P → « Enregistrer au format PDF »**
  donne le PDF à la charte (bandeaux, logo, en-tête répété, pied de page, numéros de page).
  Rien à régler dans la boîte d'impression.
- **Une réponse courte** (section 10).

## 2. Déroulé

1. **Lire tout le PV**, annexes comprises. S'il manque des pages, si un scan est illisible ou
   si des annexes citées sont absentes, le dire dans la réponse et travailler sur le reste ; si
   aucun PV n'est fourni, le demander.
2. **Identifier la marque** : le syndic qui gère l'immeuble, d'après le PV (papier à en-tête,
   pied de page, « le syndic, X, représenté par … »). Si l'AG change de syndic, la marque est
   celle du syndic qui a tenu l'AG. Introuvable : la demander en une ligne. Ouvrir ensuite le
   skill « Chartes syndic » qui contient cette marque et y lire sa fiche.
3. **Relever les données de l'AG** : copropriété (nom, adresse, BCE / KBO, référence) · type
   (ordinaire, extraordinaire, deuxième séance, AG de carence) · date et heure · lieu ·
   président(e) de l'AG · syndic et son représentant · nombre de points.
4. **Relever chaque point** de l'ordre du jour : numéro, objet, résultat (§ 7), et tout ce qui
   sert à l'exécution : montants, clés de répartition, entreprises et devis, dates, échéances
   d'appels de fonds, durées de mandat, noms des mandataires élus, conditions (« sous réserve
   de… », « dans la limite de… »), délais d'exécution, délégations au conseil, mandats donnés
   au syndic, voix contre : nombre de copropriétaires (avec leurs lots si le PV les donne,
   jamais les noms), sinon les quotes-parts.
5. **Dresser les tâches** : les formalités communes (§ 4), puis pour chaque point les tâches du
   catalogue (§ 5) que la décision appelle.
6. **Calculer les échéances** (§ 6) et les points d'attention.
7. **Question** : une seule question groupée, et seulement si la marque ou la date de l'AG est
   introuvable. Pour tout autre manque, ne pas questionner :
   `[À PRÉCISER : …]` à l'endroit exact (Syncura : `[TE VERDUIDELIJKEN: …]`), cité dans la
   réponse.
8. **Assembler le HTML** (§ 8), **contrôler** (§ 9), **livrer** (§ 10).
9. **Corrections** ensuite (« ajoute une tâche », « la façade est reportée ») : repartir du
   dernier document, modifier seulement ce qui est demandé (renuméroter si besoin), relivrer le
   fichier complet et dire en une ligne ce qui a changé.

## 3. Règles non négociables

- **Le PV est la seule source.** Aucun montant, nom, entreprise, date, durée ou condition qui
  n'y figure pas. Les tâches du catalogue sont des suites types ; leurs détails viennent du PV,
  sinon `[À PRÉCISER : …]`.
- **Décision rejetée = aucune tâche d'exécution.** Point reporté ou retiré : seulement sa
  réinscription à l'ordre du jour si le PV le prévoit. Ne jamais exécuter ce que l'AG n'a pas
  voté, ni ajouter une décision.
- **Traçabilité complète** : chaque point de l'ordre du jour figure dans le suivi (§ 8.3), avec
  ses tâches ou « Aucune suite ».
- **Pas de responsable interne** : jamais le nom du gestionnaire, d'un collaborateur, ni
  « Syndic » ou « Gestionnaire » comme intervenant. La colonne **Intervenant externe** ne
  nomme que la personne extérieure au syndic qui doit agir : entrepreneur, fournisseur,
  architecte, expert, notaire, avocat, huissier, assureur ou courtier, banque, commissaire aux
  comptes, conseil de copropriété (conseil syndical), président(e) de l'AG ou du conseil (pour
  une signature), copropriétaire d'un lot, ancien ou nouveau syndic. Sinon : cellule vide —
  notamment quand la personne est seulement informée (« Informer le commissaire de sa
  désignation » : vide ; « Faire signer le contrat » : le signataire).
- **Données personnelles** : un copropriétaire débiteur, en litige, demandeur d'une
  autorisation ou opposant est désigné par son **lot**, jamais par son nom. Les mandataires
  élus (conseil, commissaire, président de l'AG) peuvent être nommés.
- **Délais** : seuls ceux des § 4 et § 5 sont « Légale », avec leur base. Un délai d'usage est
  « Proposée », jamais présenté comme une obligation. Ne jamais juger de la validité d'une
  décision ni des majorités.
- **Langue et organe de la marque** : Syncura → plan entièrement en néerlandais (VME, AV,
  syndicus, raad van mede-eigendom), même si la conversation est en français. Agigest → droit
  luxembourgeois (§ 4.2), « conseil syndical », ni « ACP » ni « BCE ».
- **Charte** : uniquement les blocs de la fiche de la marque, copiés tels quels (logos, couleurs,
  mentions). Seuls changent `[RAPPEL]`, le bloc titre (§ 7) et, si le PV donne le bureau ou le
  contact du gestionnaire, la ligne 2 du pied.

## 4. Formalités communes (après toute AG)

`J` = date de l'AG. Ces tâches vont dans le domaine 1 (Formalités légales) et dans les
échéances clés.

### 4.1 Belgique (Code civil, livre 3)

| tâche | échéance | type · base |
|---|---|---|
| Consigner les décisions dans le registre des décisions de l'AG | J + 30 jours | Légale · art. 3.87 §12 |
| Transmettre le PV à tous les copropriétaires (titulaires d'un droit réel disposant du droit de vote) et, s'il y en a, aux autres syndics (associations partielles) | J + 30 jours | Légale · art. 3.87 §12 |
| Faire compléter les signatures du PV (président de l'AG, secrétaire, copropriétaires encore présents ou leurs mandataires) — **seulement** si le document ne porte pas de signatures et ne dit pas qu'il est signé en séance | sans délai | Légale · art. 3.87 §10 |
| Archiver le PV signé, la liste des présences et les procurations | J + 30 jours | Proposée |
| Informer les occupants des décisions qui les concernent directement (travaux, accès, règlement d'ordre intérieur) — seulement s'il y en a | J + 30 jours | Proposée |

**Point d'attention, toujours** : « Recours : tout copropriétaire peut demander au juge
l'annulation ou la réformation d'une décision jusqu'au <J + 4 mois> (art. 3.92 §3). » Ajouter
les points où il y a eu des voix contre (« 2 voix contre au point 5 »). La fin du délai de
recours figure aussi dans les échéances clés.

### 4.2 Luxembourg — Agigest (loi modifiée du 16 mai 1975, règlement grand-ducal du 13 juin 1975)

| tâche | échéance | type · base |
|---|---|---|
| Inscrire le PV, signé par le président, le secrétaire et les membres du bureau, au registre des procès-verbaux | sans délai | Légale · RGD art. 10 |
| Notifier les décisions aux copropriétaires opposants et défaillants, par recommandé avec accusé de réception (preuve de la date) — cette notification fait courir leur délai de recours | J + 15 jours | Proposée · loi art. 34 |
| Transmettre le PV aux autres copropriétaires | J + 30 jours | Proposée |
| Archiver le PV signé, la liste des présences et les pouvoirs | J + 30 jours | Proposée |

**Point d'attention, toujours** : « Recours : les copropriétaires opposants ou défaillants
disposent de deux mois à compter de la notification des décisions (loi du 16 mai 1975,
art. 34). » Pas de date : elle dépend de la notification. Vocabulaire : syndicat des
copropriétaires, conseil syndical, règlement de copropriété ; « FR » n'existe pas (avance de
trésorerie, fonds de travaux ou provision).

## 5. Catalogue : décision → tâches

Pour chaque point **adopté**, prendre les tâches du type correspondant, dans le domaine indiqué
(D1 à D8, § 7). Échéance : « Légale » seulement quand elle est indiquée ici ; date fixée par la
décision → « AG » ; sinon « Proposée » quand une date est indiquée ici, ou « — ». Un point peut
relever de plusieurs types (travaux + appel de fonds + délégation).

**Sans suite** (« Aucune suite ») : constitution du bureau, quorum, approbation du PV
précédent, rapports présentés, points d'information sans demande, décharges données.

**Comptes annuels** (D2) — adoptés : clôturer l'exercice <période> dans la comptabilité
(J + 30, Proposée). Non approuvés ou reportés : corriger ou compléter les comptes selon les
remarques de l'AG, puis les représenter (échéance « Prochaine AG »). Décharge refusée : point
d'attention.

**Budget, provisions, fonds de roulement** (D2) : encoder le budget <exercice, montant> et
adapter les provisions (périodicité, montant) (J + 30, Proposée) ; appeler le fonds de roulement
voté (date de l'AG si fixée).

**Fonds de réserve** (D2) : appeler la contribution votée (montant, périodicité, première
échéance) ; prélèvement voté pour financer une dépense → l'imputer au fonds de réserve.

**Appel de fonds extraordinaire** (D2) : une tâche par tranche — émettre l'appel (montant, clé ou
quotités, date d'exigibilité). Échéance = date d'exigibilité fixée par l'AG (« AG »), à défaut
`[À PRÉCISER : date d'exigibilité]`.

**Travaux avec entreprise retenue** (D3) : commander les travaux à <entreprise> (devis, montant)
(J + 15, Proposée ; intervenant : l'entreprise) ; planifier le chantier avec l'entreprise et
annoncer les dates aux occupants (intervenant : l'entreprise ; —) ; suivre l'exécution et
organiser la réception (date limite d'exécution fixée par l'AG → échéance « AG », sinon —).
Décision sous condition (« après obtention du permis », « après accord du conseil ») : d'abord
la tâche qui lève la condition (J + 15, Proposée), puis la commande sans échéance, la condition
dans son détail. Permis, architecte, coordination sécurité-santé : seulement si le PV en parle
(intervenant : architecte, coordinateur).

**Travaux sans entreprise retenue** (D3) : demander des devis comparatifs (nombre fixé par l'AG)
(intervenant : entreprises consultées) ; puis, selon la décision : soumettre le choix au conseil
de copropriété (délégation : voir ce type), ou présenter les offres à la prochaine AG
(« Prochaine AG ») ; commander les travaux une fois l'entreprise choisie.

**Étude, expertise, audit** (D3 ou D7) : mandater <architecte, expert, bureau d'études>
(intervenant) ; présenter les résultats à l'AG ou au conseil selon la décision.

**Délégation au conseil de copropriété** (D5, Belgique) : tâche « Soumettre au conseil <l'objet
délégué> » (intervenant : conseil de copropriété ; échéance « AG » si le PV en fixe une).
Point d'attention : objet, plafond, date limite éventuelle, et « délégation valable un an au
plus (art. 3.90) » ; échéances clés : une ligne pour la date limite fixée par l'AG (s'il y en a
une) et une ligne distincte « Fin de la délégation au conseil » à J + 1 an (Légale ·
art. 3.90). Luxembourg : délégation au conseil syndical pour un acte précisément déterminé,
avec compte rendu à l'AG (pas de durée légale).

**Mandat donné au syndic** (domaine de l'objet) : une tâche par acte autorisé, avec ses limites
(montant, condition, avis du conseil).

**Contrats** (D4 — entretien, nettoyage, ascenseur, chauffage, énergie, assurance) :
- résiliation : envoyer la résiliation de <contrat, fournisseur> par recommandé dans le respect
  du préavis — échéance `[À PRÉCISER : date limite selon le contrat]` si le PV ne la donne pas ;
- nouveau contrat ou changement de fournisseur : conclure le contrat avec <fournisseur>
  (conditions) — échéance = prise d'effet fixée par l'AG (« AG »), sinon — ;
- mise en concurrence : demander des offres comparatives (intervenant : fournisseurs
  consultés), puis les présenter à qui l'AG a désigné (conseil, prochaine AG) ;
- assurance : transmettre la décision au courtier ou à l'assureur (intervenant).

**Syndic : nomination ou renouvellement** (D5) :
- établir le contrat de syndic écrit (durée, date de prise de cours ; trois ans au plus) et le
  faire signer — intervenant : le signataire désigné par l'AG (« Présidente du conseil
  (signature) »), sinon `[À PRÉCISER : signataire pour la copropriété]` ; échéance : veille
  de la prise de cours (Proposée). Base : art. 3.89 §1 (Belgique), RGD art. 18 (Luxembourg) ;
- **Belgique** : afficher à l'entrée de l'immeuble l'extrait de l'acte de nomination (date de
  nomination, identité et numéro d'entreprise du syndic, contact, lieu de consultation du
  règlement d'ordre intérieur et du registre des décisions) — **prise de cours + 8 jours**,
  Légale · art. 3.89 §2 ; mettre à jour l'inscription du syndic à la BCE (début et fin du
  mandat) — même date, Proposée ;
- mettre à jour la fiche de la copropriété (début et fin du contrat de syndic) (J + 30,
  Proposée) ;
- point d'attention : « Mandat jusqu'au <fin> : renouvellement à inscrire à l'ordre du jour de
  l'AG qui précède cette date. »

**Syndic : changement** (D5) — l'AG nomme un autre syndic : transmettre l'ensemble du dossier de
gestion (comptabilité, actifs, sinistres, archives) au nouveau syndic — **fin du mandat + 30
jours**, Légale · art. 3.89 §5 (Belgique ; Luxembourg : Proposée) ; intervenant : nouveau
syndic. Si c'est la marque qui est nommée à la place d'un autre : obtenir le dossier de l'ancien
syndic (même échéance ; intervenant : ancien syndic), puis les tâches de nomination.

**Conseil de copropriété / conseil syndical : élection, composition** (D5) : mettre à jour la
composition (noms et qualités du PV) dans la fiche de la copropriété (J + 30, Proposée) ;
informer les membres de leur élection (J + 15, Proposée).

**Commissaire aux comptes** (D5) : informer <nom> de sa désignation et lui donner accès aux
comptes et pièces (J + 30, Proposée) ; mettre à jour la fiche de la copropriété.

**Règlement d'ordre intérieur** (D6) — modifié : mettre à jour le ROI et le tenir à disposition
au siège de l'association (« Sans délai », Légale · Code civil, livre 3) ; le diffuser aux
copropriétaires et occupants concernés (J + 30, Proposée).

**Statuts, acte de base, quotités, parties communes, servitude, vente ou achat** (D6) :
mandater le notaire (intervenant : notaire, nommé si le PV le nomme) et lui transmettre le PV
et les pièces (J + 30, Proposée) ; après l'acte, mettre à jour les quotités ou les données de la
copropriété (—). Luxembourg : règlement de copropriété.

**Contentieux, recouvrement** (D6) : mandater <avocat, huissier> pour <objet> contre le
copropriétaire du lot <n> et lui transmettre le dossier (intervenant ; J + 15, Proposée) ;
avocat non nommé par le PV → `[À PRÉCISER : avocat]`. Mise en demeure ou déclaration à la
protection juridique seulement si le PV en parle.

**Autorisation à un copropriétaire** (D7 — travaux privatifs touchant les parties communes,
usage d'une partie commune) : notifier l'autorisation et ses conditions au copropriétaire du lot
<n> (J + 15, Proposée), toutes les conditions dans le détail ; une tâche par document ou action
que le copropriétaire doit fournir ou faire (attestation, fiche technique, plans, remise en
état) — intervenant : copropriétaire du lot <n> ; échéance « avant les travaux » si le PV le dit,
sinon —.

**Sinistre** (D4) : déclarer ou suivre le sinistre auprès de l'assureur ou du courtier
(intervenant).

**Emprunt** (D2) : négocier et conclure l'emprunt <montant, durée> (intervenant : banque) ;
signature selon le mandat du PV.

**Demande de l'AG au syndic** (D7 — étude, information, devis pour la prochaine AG, y compris
dans les « divers ») : une tâche, échéance « Prochaine AG » (type AG), à reprendre aussi dans la
tâche de convocation de la prochaine AG.

**Point reporté** (D8) : réinscrire le point à l'ordre du jour de la prochaine AG avec les
éléments demandés (« Prochaine AG »).

**Prochaine AG** (D8) :
- date fixée : convoquer l'AG au plus tard **15 jours avant** (date − 15 jours), Légale ·
  art. 3.87 §3 (Luxembourg : RGD art. 3, sauf urgence) ; inscrire à l'ordre du jour les points
  demandés et les mandats qui arrivent à échéance ;
- seulement une période (« seconde quinzaine d'octobre ») : la même tâche, échéance « 15 jours
  avant l'AG » (Légale), période dans le détail.

**AG de carence (quorum non atteint)** (D8) : convoquer la deuxième AG (« Sans délai »,
Proposée) ; détail : « à tenir au plus tôt le <J + 15 jours> (art. 3.87 §5), convocation au
moins 15 jours avant ». Luxembourg : selon la loi et le règlement de copropriété. Aucune autre
tâche que les formalités.

**Autre décision** (D7) : la tâche qui l'exécute, formulée simplement.

## 6. Échéances

**Types** (badge sous la date) :
- **Légale** — délai fixé par la loi (§ 4, § 5) ; la base figure dans les échéances clés.
- **AG** — date ou moment fixé par la décision (« appel exigible au 01/01/2027 », « choix du
  conseil avant le 15/12/2026 », « avant les travaux ») ; aussi pour « Prochaine AG ». Compte
  dans le nombre « à date fixée par l'AG » de la synthèse.
- **Proposée** — délai d'usage proposé ici, à valider par le gestionnaire.
- Sans échéance : « — », sans badge.

**Calcul** (J = date de l'AG ; autre point de départ quand le § 5 le dit : prise de cours du
mandat, fin du mandat, date de la prochaine AG) :
- **+ N jours** : jours calendrier. Ajouter N au jour du mois ; tant que le résultat dépasse la
  longueur du mois, retrancher cette longueur et passer au mois suivant.
- **+ N mois** ou **+ 1 an** : même quantième N mois plus tard ; s'il n'existe pas, dernier jour
  de ce mois.
- **− 15 jours** : même méthode, à rebours.
- Longueur des mois : janvier 31, février 28 (29 en 2028), mars 31, avril 30, mai 31, juin 30,
  juillet 31, août 31, septembre 30, octobre 31, novembre 30, décembre 31.
- Pas de report au jour ouvrable suivant : la date affichée est la limite stricte.
- Exemples : AG du 15/10/2026 → J + 8 = 23/10/2026 ; J + 15 = 30/10/2026 ; J + 30 =
  14/11/2026 ; J + 4 mois = 15/02/2027 ; J + 1 an = 15/10/2027. AG du 31/10/2026 → J + 30 =
  30/11/2026 ; J + 4 mois = 28/02/2027. Prise de cours le 01/01/2027 → + 8 jours = 09/01/2027.
  AG suivante le 20/10/2027 → − 15 jours = 05/10/2027.
- Recompter chaque date une seconde fois avant de l'écrire.

**Ordre des tâches** dans un domaine : « Sans délai », puis dates croissantes, puis « Prochaine
AG », puis « — » et les échéances `[À PRÉCISER]` ; une tâche qui en conditionne une autre
(permis avant commande, devis avant choix, planification avant suivi) la précède toujours, même
si l'ordre des dates en souffre.

**Échéances clés** : toutes les dates de type Légale et AG, la fin du délai de recours
(Belgique), la fin d'une délégation au conseil ; une ligne par date (regrouper ce qui tombe le
même jour), dans l'ordre chronologique ; une échéance textuelle (« 15 jours avant l'AG »,
« Prochaine AG ») en dernière ligne, son texte dans la colonne Date.

**Échéance déjà passée** (PV reçu tard) : la garder telle quelle et la signaler dans les points
d'attention (« Registre et envoi du PV : délai légal expiré le 24/10/2026 »).

## 7. Libellés fixes

| élément | Belgique, français | Agigest (Luxembourg) | Syncura, néerlandais |
|---|---|---|---|
| surtitre | Plan d'actions | Plan d'actions | Actieplan |
| titre | Suites de l'assemblée générale | idem | Opvolging van de algemene vergadering |
| nom de la copropriété | ACP <nom> (sauf s'il commence par « ACP » ou « Association ») | <nom> (« Résidence … ») ou « Copropriété <nom> » | VME <nom> |
| sous-ligne (éléments absents omis) | adresse · BCE <n°> · Réf. <réf> | adresse · Réf. <réf> | adres · KBO <n°> · Ref. <ref> |
| grille | Assemblée · Lieu · Présidence de l'AG · Syndic · Document analysé | idem | Vergadering · Plaats · Voorzitter van de AV · Syndicus · Geanalyseerd document |
| assemblée | Assemblée générale ordinaire (extraordinaire) du <jour date>, <heure> | idem | Gewone (Buitengewone) algemene vergadering van <dag datum>, <uur> |
| document analysé | Procès-verbal de l'AG du JJ/MM/AAAA (<n> pages, <n> points) | idem | Notulen van de AV van DD/MM/JJJJ (<n> pagina's, <n> punten) |
| synthèse (L, A = nombre de badges Légale et AG ; sans date légale, s'arrêter après « par l'AG ») | <N> tâches, dont <L> à délai légal et <A> à date fixée par l'AG · prochaine échéance légale : <date>. | idem | <N> taken, waarvan <L> met wettelijke termijn en <A> met een door de AV vastgelegde datum · eerstvolgende wettelijke termijn: <datum>. |
| titres de section (`h2`) | Échéances clés · Tâches · Suivi des points de l'ordre du jour | idem | Belangrijke termijnen · Taken · Opvolging van de agendapunten |
| encadré (sans `h2`) | Points d'attention | idem | Aandachtspunten |
| échéances clés | Date · Échéance · Tâches · base | idem | Datum · Termijn · Taken · grondslag |
| domaines | 1. Formalités légales · 2. Finances et comptabilité · 3. Travaux et entretien · 4. Contrats, fournisseurs et assurances · 5. Syndic, conseil et commissaire · 6. Statuts, ROI et contentieux · 7. Autres décisions · 8. Prochaine assemblée | 5. Syndic et conseil syndical · 6. Règlement de copropriété et contentieux | 1. Wettelijke formaliteiten · 2. Financiën en boekhouding · 3. Werken en onderhoud · 4. Contracten, leveranciers en verzekeringen · 5. Syndicus, raad en commissaris · 6. Statuten, HR en geschillen · 7. Andere beslissingen · 8. Volgende algemene vergadering |
| tâches | N° · Tâche · Pt AG · Échéance · Intervenant externe · Fait | idem | Nr · Taak · Pt AV · Termijn · Externe partij · Klaar |
| badges | Légale · AG · Proposée | idem | Wettelijk · AV · Voorstel |
| échéances textuelles | Sans délai · Prochaine AG · 15 jours avant l'AG | idem | Onverwijld · Volgende AV · 15 dagen vóór de AV |
| suivi | Pt · Objet · Résultat · Tâches | idem | Pt · Onderwerp · Resultaat · Taken |
| résultats | Adopté · Rejeté · Pris acte · Reporté · Retiré · Sans vote | idem | Goedgekeurd · Verworpen · Kennisname · Uitgesteld · Ingetrokken · Zonder stemming |
| aucune suite | Aucune suite | idem | Geen opvolging |
| diffusion | Document de travail interne établi à partir du PV de l'AG du JJ/MM/AAAA — à vérifier avant exécution. | idem | Interne werknota op basis van de notulen van de AV van DD/MM/JJJJ — na te kijken vóór uitvoering. |
| rappel des pages 2+ | Plan d'actions AG — <nom> — JJ/MM/AAAA | idem | Actieplan AV — <naam> — DD/MM/JJJJ |

- Les domaines gardent leur numéro ; un domaine sans tâche est omis (pas de renumérotation).
- Tâches numérotées T01, T02… sans interruption, dans l'ordre du document.
- Libellé d'une tâche : verbe à l'infinitif (NL : infinitief vooraan : « Notulen bezorgen aan
  alle mede-eigenaars »), 90 caractères au plus ; précisions (montant, devis, condition, clé)
  dans le détail.
- Dates : JJ/MM/AAAA dans les tableaux, « jeudi 15 octobre 2026 » dans la grille (NL :
  « donderdag 15 oktober 2026 », heures « 18u30 »). Montants comme dans le PV (`48.500,00 €`).
- Termes néerlandais : jaarrekening, begroting, voorschotten, werkkapitaal, reservekapitaal,
  buitengewone opvraging, kwijting, commissaris van de rekeningen, huishoudelijk reglement (HR),
  statuten, basisakte, register van de beslissingen van de AV, aannemer, offerte.

## 8. Gabarit HTML

### 8.1 Squelette

Copier ce squelette, remplacer les quatre marqueurs `⟦…⟧` de la charte par les blocs de la
fiche de la marque, et `⟦CONTENU⟧` par le plan construit avec les composants du § 8.3.

```html
<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>Plan d'actions AG — Résidence … — 15/10/2026</title>
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

- `lang="nl"` pour Syncura. `<title>` = le rappel des pages 2+ (§ 7), qui remplace aussi
  `[RAPPEL]` dans l'en-tête des pages suivantes.
- Le bloc marque contient son propre `<style>` ; le CSS commun va dans le second `<style>`.
  Les deux sont nécessaires.
- **Copie des blocs** : copier-coller exact, d'un seul tenant. Les adresses `data:` des logos
  sont très longues : ne pas les couper, les raccourcir ni reformater leurs nombres (`1.91`
  reste `1.91`).
- Le tableau `cadre` réserve sur chaque page la place de l'en-tête et du pied : ne pas le
  retirer et ne rien mettre en dehors, sauf l'en-tête des pages suivantes et le pied de page.

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
.synthese{font-size:9pt;color:var(--texte-2);margin:0 0 4pt}
.synthese strong{color:var(--primaire)}
table.taches{table-layout:fixed}
table.taches .n{width:10mm;font-weight:700;color:var(--primaire);white-space:nowrap}
table.taches .pt{width:12mm;white-space:nowrap}
table.taches .ech{width:27mm}
table.taches .ext{width:31mm}
table.taches .fait{width:10mm;text-align:center}
table.taches td.ext{font-size:8.5pt}
.t-titre{display:block;font-weight:700}
.t-detail{display:block;font-size:8.5pt;color:var(--texte-2);margin-top:1pt}
.case{display:inline-block;width:3.4mm;height:3.4mm;border:1px solid var(--texte-2);border-radius:.6mm;vertical-align:middle}
.badge{display:inline-block;font-size:6.5pt;font-weight:700;letter-spacing:.05em;text-transform:uppercase;line-height:1.25;padding:.4pt 3pt;border-radius:2pt;margin-top:1.5pt;white-space:nowrap}
.badge.legale{background:var(--entete-tableau);color:var(--texte-entete-tableau)}
.badge.ag{border:1px solid var(--entete-tableau);color:var(--entete-tableau);padding:0 2.6pt}
.badge.proposee{border:1px dashed var(--texte-2);color:var(--texte-2);padding:0 2.6pt}
table.echeances td:first-child{white-space:nowrap;font-weight:700;color:var(--primaire);width:24mm}
table.echeances td:last-child{font-size:8.5pt;color:var(--texte-2);width:40mm}
table.suivi{table-layout:fixed}
table.suivi .pt{width:10mm}
table.suivi .res{width:27mm}
table.suivi .refs{width:34mm}
.res-rejete,.res-sans{color:var(--texte-2)}
h3.domaine{font-family:var(--police-titres);font-size:calc(10.5pt * var(--echelle-titres));font-weight:700;color:var(--primaire);margin:10pt 0 3pt;padding-bottom:2pt;border-bottom:1.5pt solid var(--accent);break-after:avoid;page-break-after:avoid}
h3.domaine+table.taches{margin-top:2pt}
.encadre.attention{break-inside:auto;page-break-inside:auto}
```

### 8.3 Composants du contenu

Échapper `&` en `&amp;` et `<` en `&lt;` dans le texte. Ordre du contenu : bloc titre ·
grille · synthèse · échéances clés · points d'attention · tâches par domaine · suivi des points
· diffusion. Exemples en français ; Syncura : libellés du § 7.

**Bloc titre** — prendre la variante de la fiche de la marque et y remplacer `[SURTITRE]`,
`[TITRE]`, `[COPROPRIÉTÉ]` et `[SOUS-LIGNE]` par les libellés du § 7.

**Grille et synthèse**

```html
<table class="infos">
<tr><th>Assemblée</th><td>Assemblée générale ordinaire du jeudi 15 octobre 2026, 18h30</td></tr>
<tr><th>Lieu</th><td>Salle paroissiale, Rue du Doyenné 3, 1180 Uccle</td></tr>
<tr><th>Présidence de l'AG</th><td>Mme Anne Lambert</td></tr>
<tr><th>Syndic</th><td>Office des Propriétaires SA, représentée par Julie Martin, gestionnaire de copropriété</td></tr>
<tr><th>Document analysé</th><td>Procès-verbal de l'AG du 15/10/2026 (6 pages, 16 points)</td></tr>
</table>
<p class="synthese"><strong>27 tâches</strong>, dont 5 à délai légal et 6 à date fixée par l'AG · prochaine échéance légale : <strong>14/11/2026</strong>.</p>
```

Ligne absente si l'information manque au PV (sauf Assemblée et Document analysé). Ligne Syndic :
raison sociale = texte de la ligne 1 du pied de page jusqu'au premier « · ».

**Échéances clés**

```html
<h2 class="section">Échéances clés</h2>
<table class="donnees echeances"><thead><tr><th>Date</th><th>Échéance</th><th>Tâches · base</th></tr></thead>
<tbody>
<tr><td>14/11/2026</td><td>Registre des décisions et envoi du PV aux copropriétaires</td><td>T01, T02 · art. 3.87 §12</td></tr>
<tr><td>01/01/2027</td><td>Appel de fonds façade (tranche 1)</td><td>T08 · AG, pt 6</td></tr>
<tr><td>15/02/2027</td><td>Fin du délai de recours contre les décisions de l'AG</td><td>art. 3.92 §3</td></tr>
</tbody></table>
```

**Points d'attention** (recours, voix contre, délégations, conditions, fin de mandat,
informations à préciser) :

```html
<div class="encadre attention">
<p class="lbl">Points d'attention</p>
<ul>
<li>Recours : tout copropriétaire peut demander l'annulation d'une décision jusqu'au 15/02/2027. Voix contre : 2 au point 5 (toiture).</li>
<li>À préciser : délai de préavis du contrat Ascenseurs Delta (T15).</li>
</ul>
</div>
```

**Tâches** — un titre `h2` « Tâches », puis par domaine un `h3 class="domaine"` suivi de son
tableau (en-tête répété dans chaque tableau) :

```html
<h2 class="section">Tâches</h2>
<h3 class="domaine">1. Formalités légales</h3>
<table class="donnees taches"><thead><tr><th class="n">N°</th><th>Tâche</th><th class="pt">Pt AG</th><th class="ech">Échéance</th><th class="ext">Intervenant externe</th><th class="fait">Fait</th></tr></thead>
<tbody>
<tr><td class="n">T01</td><td><span class="t-titre">Consigner les décisions dans le registre des décisions de l'AG</span></td><td class="pt">—</td><td class="ech">14/11/2026<br><span class="badge legale">Légale</span></td><td class="ext"></td><td class="fait"><span class="case"></span></td></tr>
<tr><td class="n">T04</td><td><span class="t-titre">Informer les occupants des décisions qui les concernent</span><span class="t-detail">Affichage aux valves : travaux de toiture (pt 5), interdiction des barbecues (pt 12).</span></td><td class="pt">5, 12</td><td class="ech">14/11/2026<br><span class="badge proposee">Proposée</span></td><td class="ext"></td><td class="fait"><span class="case"></span></td></tr>
</tbody></table>
<h3 class="domaine">3. Travaux et entretien</h3>
<table class="donnees taches"><thead>…même en-tête…</thead>
<tbody>
<tr><td class="n">T10</td><td><span class="t-titre">Commander le remplacement des descentes d'eau pluviale</span><span class="t-detail">Devis de Toitures Meuse SRL, 8.740,00 € TVAC, financé par le fonds de réserve.</span></td><td class="pt">5</td><td class="ech">30/10/2026<br><span class="badge proposee">Proposée</span></td><td class="ext">Toitures Meuse SRL (entrepreneur)</td><td class="fait"><span class="case"></span></td></tr>
</tbody></table>
```

- Badges : `<span class="badge legale">Légale</span>`, `<span class="badge ag">AG</span>`,
  `<span class="badge proposee">Proposée</span>` (Syncura : Wettelijk, AV, Voorstel).
- Échéance textuelle : « Sans délai », « Prochaine AG », « 15 jours avant l'AG » + badge ;
  sans échéance : `<td class="ech">—</td>`.
- Pas de détail : omettre le `span class="t-detail"`. Tâche liée à aucun point : « — ».
- Information manquante : `<mark class="a-completer">[À PRÉCISER : …]</mark>`.

**Suivi des points de l'ordre du jour** (tous les points, dans l'ordre du PV) :

```html
<h2 class="section">Suivi des points de l'ordre du jour</h2>
<table class="donnees suivi"><thead><tr><th class="pt">Pt</th><th>Objet</th><th class="res">Résultat</th><th class="refs">Tâches</th></tr></thead>
<tbody>
<tr><td class="pt">1</td><td>Constitution du bureau</td><td class="res res-sans">Sans vote</td><td class="refs">Aucune suite</td></tr>
<tr><td class="pt">5</td><td>Remplacement des descentes d'eau pluviale</td><td class="res">Adopté</td><td class="refs">T04, T10, T11</td></tr>
<tr><td class="pt">13</td><td>Fermeture de la terrasse du lot 12</td><td class="res res-rejete">Rejeté</td><td class="refs">Aucune suite</td></tr>
</tbody></table>
<p class="diffusion">Document de travail interne établi à partir du PV de l'AG du 15/10/2026 — à vérifier avant exécution.</p>
```

Classes de résultat : `res-rejete` pour Rejeté, Retiré ; `res-sans` pour Pris acte, Sans vote,
Reporté ; rien pour Adopté.

## 9. Contrôle avant livraison

- Chaque point du PV est dans le suivi ; chaque point adopté a au moins une tâche ou « Aucune
  suite » justifiée par le § 5 ; aucun point rejeté n'a de tâche d'exécution.
- Toutes les références du suivi existent ; T01, T02… sans trou ni doublon ; le nombre de tâches
  et les comptes de la synthèse sont exacts.
- Chaque date recalculée (§ 6) ; types et bases conformes aux § 4 et § 5 ; échéances clés
  complètes et chronologiques ; fin du délai de recours présente (Belgique).
- Montants, entreprises, noms et dates identiques au PV ; débiteurs, opposants et demandeurs
  désignés par leur lot ; intervenants uniquement externes.
- Bloc marque, en-têtes et pied copiés **sans modification** ; seuls `[RAPPEL]`, le bloc titre
  et, le cas échéant, la ligne de contact du pied ont été remplacés.
- Langue de la marque (Syncura : tout en néerlandais) ; Agigest : droit luxembourgeois, pas
  d'ACP ni de BCE.
- HTML valide : balises fermées, `&` échappé, aucun marqueur `⟦…⟧` restant, aucun script.

## 10. Réponse dans le chat

Après le fichier, 3 à 5 lignes, sans recopier le plan : marque et langue ; nombre de tâches,
dont légales ; les deux ou trois prochaines échéances légales avec leur date ; éléments à
préciser (liste des `[À PRÉCISER]`) ; rappel : « Ouvrir le fichier dans Edge, Ctrl+P,
Enregistrer au format PDF. »
