# Structure d'un PV de conseil de copropriété (droit belge)

## Cadre légal à garder en tête

Référence : article 3.90 du Code civil (ancien art. 577-8/1). À vérifier dans le texte
en vigueur avant toute citation dans un PV : l'agent ne cite pas d'article dans le PV
sauf si les notes le font.

- Le conseil de copropriété est **obligatoire** dans les immeubles d'au moins 20 lots
  (caves, garages et parkings non compris) et facultatif ailleurs. Ses membres sont des
  copropriétaires nommés par l'assemblée générale.
- Sa mission : **veiller à la bonne exécution par le syndic de ses missions**. Il peut
  prendre connaissance et copie des pièces relatives à la gestion de la copropriété.
- Il **n'a pas de pouvoir de décision propre** ; il peut recevoir de l'AG une délégation
  pour des actes déterminés. Sans délégation citée dans les notes, il émet des avis,
  des recommandations et des demandes au syndic.
- Il fait rapport à l'assemblée générale sur l'exercice de sa mission : les PV de ses
  réunions servent de base à ce rapport, d'où l'importance d'actions datées et suivies.
- Le syndic n'est pas membre du conseil. Il y assiste à l'invitation du conseil et en
  assure souvent le secrétariat (rédaction du PV).

## Plan type (celui que produit le générateur)

1. **Bloc titre** : « Procès-verbal — Réunion du conseil de copropriété », nom et adresse
   de l'ACP (BCE si connu).
2. **Informations** : date, horaire, lieu (ou visio), présidence de séance, secrétariat,
   syndic et son représentant.
3. **Présences** : tableau des membres (qualité, lot, présent / excusé / absent /
   représenté), décompte des présents, autres participants (commissaire aux comptes,
   expert, fournisseur…).
4. **Ouverture** : heure et présidence (générée automatiquement si non fournie).
5. **Points de l'ordre du jour**, numérotés. Ordre usuel :
   1. Approbation du PV de la réunion précédente
   2. Suivi des actions de la réunion précédente
   3. Situation financière, contrôle des comptes et des factures, arriérés
   4. Travaux et entretien (en cours, à prévoir, devis)
   5. Contrats et fournisseurs (ascenseur, chauffage, nettoyage, assurances…)
   6. Sinistres et assurances
   7. Contentieux et litiges
   8. Préparation de la prochaine assemblée générale
   9. Divers

   Ne garder que les points abordés ; respecter l'ordre réel de la réunion s'il est
   connu et différent.
6. **Récapitulatif des actions** : tableau automatique (point, action, responsable,
   échéance, statut).
7. **Prochaine réunion** : date, heure, lieu.
8. **Clôture** : « L'ordre du jour étant épuisé, la séance est levée à …h… ».
9. **Signatures** : par défaut président(e) du conseil + pour le syndic ; tous les
   membres présents si les notes ou l'usage de l'immeuble le demandent.
10. **Annexes et diffusion** (facultatif).

## Encadré « Position du conseil »

Une seule phrase ou deux, la conclusion du point : avis, recommandation, demande,
prise d'acte, report. Le libellé peut être changé (`label_decision`) : « Décision »
uniquement en cas de délégation de l'AG, « Conclusion » pour un point d'information.
Pas d'encadré sur un point purement informatif sans conclusion.

## Ce qui ne va pas dans un PV de conseil

- Votes en quotes-parts, majorités, quorum de l'AG : c'est un PV d'AG, autre format.
- Débats verbatim : on résume la position de chacun.
- Informations non abordées en réunion (ajouts du syndic après coup) : à mettre dans
  un courrier séparé ou dans « Divers » avec la mention « Information communiquée
  après la réunion ».
