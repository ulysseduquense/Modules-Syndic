# Marques et chartes

Chaque marque est un dossier `brands/<id>/` :

```
brands/<id>/
  brand.json      charte + mentions du pied de page
  logo.png        logo pour l'en-tête de la page 1 (PNG transparent, haute définition)
  logo-entete.png (facultatif) version compacte pour l'en-tête des pages suivantes
```

État : `python3 scripts/generate_pv.py --list-brands`.

| id | marque | charte | ce qui manque |
|---|---|---|---|
| `emeria` | Emeria | complète | — (charte Emeria 2026 : navy `#06187D`, bleu `#2440FF`, Arial, titres en majuscules) |
| `noblue` | Noblué (Noblué Immobilier SRL, Liège) | à compléter | site, logo, couleurs, polices, adresse, IPI, contact |
| `dr-syndic` | DR Syndic (DR Syndic SRL, Huy) | à compléter | site, logo, couleurs, polices, IPI, téléphone |
| `op` | OP | partielle | logo, entités et coordonnées ; couleurs rouge `#CA403B` / bordeaux `#9C0C24` connues |

Tant qu'une marque n'a pas de couleurs, le PV sort en **rendu neutre gris** ; sans
logo, le nom de la marque est écrit en texte à la place. Le générateur l'annonce
(`ATTENTION : …`) et l'agent doit le dire à l'utilisateur.

## Compléter une marque depuis son site

Le site doit être joignable depuis l'environnement d'exécution.

```bash
python3 scripts/extract_brand.py https://www.site-du-syndic.be noblue          # proposition seule
python3 scripts/extract_brand.py https://www.site-du-syndic.be noblue --apply  # écrit brand.json
```

Le script télécharge la page et ses feuilles de style, classe les couleurs (variables
CSS « primary / accent », `theme-color`, fréquence), relève les polices et enregistre
les logos candidats dans `brands/<id>/candidats/`. Avec `--apply`, il renseigne
`site`, `couleurs`, polices et `logo`, et passe la marque en « partielle ».

Ensuite, à la main :
1. ouvrir `candidats/` et choisir le bon logo (un SVG doit être converti en PNG
   d'au moins 1200 px de large ; Word n'affiche pas les SVG de façon fiable) ;
2. vérifier les couleurs proposées sur le site ;
3. si la police du site n'est pas installée sur les postes (police web), mettre
   `"police_texte": "Arial"` et garder la police du site pour `police_titres` seulement
   si elle est installée — sinon Word la remplace ;
4. compléter `raison_sociale`, `adresse`, `bce`, `ipi`, `telephone`, `email` ;
5. passer `"statut_charte": "complete"` et vider `a_verifier` ;
6. générer `assets/exemple-pv.json` avec `--marque <id> --render qa/` et regarder le résultat.

## Champs de `brand.json`

| champ | rôle |
|---|---|
| `id`, `alias` | identifiant et noms acceptés (`--marque`, champ `marque` du JSON) |
| `nom_affiche` | nom court (mot-symbole de secours, pied de page) |
| `statut_charte` | `complete` · `partielle` · `a_completer` |
| `raison_sociale`, `adresse`, `bce`, `ipi`, `telephone`, `email`, `site` | pied de page |
| `couleurs.primaire` | titres, en-têtes de tableau, libellés |
| `couleurs.secondaire` | surtitre, filet des encadrés, sous-titres |
| `couleurs.texte`, `texte_secondaire` | texte courant, pied de page (défaut : quasi-noir, gris) |
| `couleurs.fond_clair`, `filet` | fond des encadrés et lignes paires, filets (défaut : dérivés de la primaire) |
| `couleurs.entete_tableau`, `texte_entete_tableau` | en-tête des tableaux (défaut : primaire / blanc) |
| `police_titres`, `police_texte` | polices (défaut Arial) |
| `titres_majuscules` | titres en capitales (charte Emeria) |
| `logo`, `logo_largeur_cm`, `logo_entete`, `logo_entete_largeur_cm` | logos et largeurs |
| `mentions_pied` | lignes supplémentaires du pied de page (ex. « Syndic agréé IPI n° … ») |
| `sources`, `a_verifier` | traçabilité ; `a_verifier` est affiché à chaque génération |

## Ajouter une autre marque du groupe

Copier `brands/noblue/` vers `brands/<nouvel-id>/`, adapter `id`, `alias`,
`nom_affiche` et les mentions, puis suivre « Compléter une marque ». Aucune
modification du script n'est nécessaire.
