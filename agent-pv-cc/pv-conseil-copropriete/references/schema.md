# Format du JSON lu par `generate_pv.py`

Tous les champs sont facultatifs sauf `points` (en pratique). Un champ absent n'est
simplement pas affiché ; les champs indispensables manquants sont remplacés par
`[À COMPLÉTER : …]`. Modèle complet : `assets/exemple-pv.json`.

```jsonc
{
  "marque": "dr-syndic",              // id ou alias d'une marque de brands/ (défaut : emeria)
  "entite": "op-wallonie",             // facultatif : société de la marque (brand.json > entites) pour le pied de page
  "langue": "nl",                      // facultatif : fr | nl (défaut : langue de la marque, sinon fr)

  "acp": {
    "nom": "Résidence Les Coteaux",   // « ACP » est ajouté devant s'il n'y est pas
    "adresse": "Rue …, 4000 Liège",
    "bce": "0800.000.000",
    "reference": "ACP-123"            // référence interne du syndic (facultatif)
  },

  "reunion": {
    "date": "2026-11-05",             // ISO → « jeudi 5 novembre 2026 » ; texte libre accepté
    "heure_debut": "18:00",           // → « 18h00 »
    "heure_fin": "19:50",
    "lieu": "Salle commune",
    "mode": "présentiel",             // ou « visioconférence », « mixte » (affiché après le lieu)
    "intitule": "Réunion du conseil de copropriété"   // titre du document, à changer si besoin
  },

  "syndic": {                          // la personne qui représente le syndic à la réunion
    "representant": "Julie Martin",
    "fonction": "Gestionnaire de copropriété",
    "email": "…",                     // remplacent ceux de la marque dans le pied de page
    "telephone": "…"
  },

  "president_seance": "Mme Anne Lambert, présidente du conseil",
  "secretaire": "Julie Martin, pour le syndic",

  "participants": [                    // membres du conseil uniquement
    {"nom": "Mme Anne Lambert", "qualite": "Présidente", "lot": "App. 4B", "presence": "présente"},
    {"nom": "M. Karim Haddad", "qualite": "Membre", "lot": "App. 6C", "presence": "excusé"},
    {"nom": "M. Luc Simon", "qualite": "Membre", "lot": "12", "presence": "représenté", "represente_par": "Mme Lambert"}
  ],                                   // presence : présent(e) | excusé(e) | absent(e) | représenté(e) | visio
  "afficher_quorum": true,             // « 3 membres sur 4 présents ou représentés » — false si la liste des membres est incomplète

  "invites": [                         // autres participants (commissaire, expert, fournisseur…)
    {"nom": "M. Paul Renard", "qualite": "commissaire aux comptes", "presence": "présent"}
  ],

  "ouverture": "…",                    // facultatif : sinon généré (« La séance est ouverte à 18h00 sous la présidence de … »)
  "introduction": ["…"],               // facultatif : blocs de contenu avant les points

  "label_decision": "Position du conseil",   // libellé par défaut des encadrés

  "points": [
    {
      "titre": "Toiture : remplacement des descentes d'eau pluviale",
      "contenu": [                     // liste de blocs, dans l'ordre :
        "Paragraphe simple. **gras**, *italique*, [À COMPLÉTER : …] surligné.",
        {"liste": ["puce 1", "puce 2"], "intro": "phrase avant la liste (facultatif)"},
        {"tableau": {"titre": "facultatif", "colonnes": ["Entreprise", "Montant TVAC"],
                     "lignes": [["Toitures Meuse SRL", "8.740,00 €"]], "largeurs_cm": [11, 6]}},
        {"sous_titre": "Sous-partie"}
      ],
      "decision": "Le conseil recommande …",       // encadré ; texte ou liste de textes
      "label_decision": "Décision",                 // facultatif, pour ce point seulement
      "actions": [
        {"action": "Demander un devis complet", "responsable": "Syndic",
         "echeance": "2026-11-20", "statut": "À faire"}   // statut : À faire (défaut) | En cours | Fait
      ]
    }
  ],
  "recapitulatif_actions": true,       // false pour masquer le tableau récapitulatif

  "prochaine_reunion": {"date": "2027-01-14", "heure": "18:00", "lieu": "salle commune"},
                                       // ou texte libre : "À fixer après réception des devis."
  "cloture": "19:50",                  // heure de clôture (sinon reunion.heure_fin)
  "cloture_texte": "…",                // facultatif : remplace la phrase de clôture

  "signataires": [                     // défaut : président(e) du conseil + pour le syndic ; false = aucun
    {"role": "Présidente du conseil de copropriété", "nom": "Mme Anne Lambert"},
    {"role": "Pour le syndic", "nom": "Julie Martin"}
  ],
  "annexes": ["Devis comparatifs"],
  "diffusion": "membres du conseil de copropriété"
}
```

Les tableaux de 12 lignes ou moins ne sont pas coupés entre deux pages ; l'en-tête des
tableaux plus longs est répété. Largeur utile de la page : 17 cm (`largeurs_cm` doit
totaliser 17).
