# Agents Reemia à la charte des syndics Emeria

Reemia n'exécute pas de code et un skill y est **un seul texte de 65 000 caractères au plus**.
Les agents produisent donc un **HTML A4 imprimable** (Edge : Ctrl+P → Enregistrer au format PDF)
à la charte de la marque, écrit par l'agent lui-même à partir d'un squelette et de blocs de
charte copiés tels quels. La version complète du PV de CC (.docx + PDF par script) reste
`../pv-conseil-copropriete/`.

```
livrables/
  commun/                                   chartes partagées par tous les agents « à la charte »
    Skill Chartes syndic - OP, Easy Syndic, Gestea.md
    Skill Chartes syndic - Syncura, Noblué, DR Syndic.md
    Skill Chartes syndic - Agigest, Emeria.md
  pv-cc/                                    agent « PV de CC »
    Instructions agent - PV de CC.md
    Skill PV de CC - redaction et gabarit.md
  taches-post-ag/                           agent « Tâches post-AG »
    Instructions agent - Taches post-AG.md
    Skill Taches post-AG - lecture du PV et plan d'actions.md
source/
  core.src.md, instructions-pv-cc.md         texte de l'agent PV de CC ({{CSS}} = commun.css)
  post_ag.src.md, instructions-post-ag.md    texte de l'agent tâches post-AG ({{CSS}} = plan-compact.css)
  commun.css       CSS commun (A4, bandeaux, en-tête répété, pied, numéros de page)
  plan-compact.css CSS complet et réduit du plan d'actions (cadre, charte, tableaux de tâches, badges)
  marques.py       chartes des 8 marques (couleurs, polices, logos, mentions), reprises de brand.json
  logos/           logos officiels compactés (SVG minifiés, PNG ou WebP à la taille d'impression)
  build_skills.py  régénère tous les textes de livrables/ et contrôle la limite de 65 000 caractères
  assemble.py      PV de CC d'exemple assemblé comme le ferait l'agent (test)
  pdfall.js        impression Chromium des HTML d'un dossier (test)
exemples/
  PV d'AG fictifs (OP, Syncura, Agigest), et pour OP le plan d'actions produit par un agent
  simulé sans code
```

## Mise en place dans Reemia

1. Créer les **3 skills de charte** (`livrables/commun/`), une seule fois : ils servent aux deux
   agents. Si Reemia ne permet pas de partager un skill entre agents, les ajouter à chacun.
2. Agent **PV de CC** : coller `Instructions agent - PV de CC.md` dans « Instructions » et
   remplacer l'ancien skill 1 par `Skill PV de CC - redaction et gabarit.md`. Les anciens skills
   « PV de CC — chartes … » sont remplacés par les « Chartes syndic — … » (même contenu ; le
   bloc titre y est neutre et rempli avec les libellés du skill du document).
3. Agent **Tâches post-AG** : coller `Instructions agent - Taches post-AG.md` dans
   « Instructions », ajouter `Skill Taches post-AG - lecture du PV et plan d'actions.md` et les
   3 skills de charte.

Le nom de chaque skill (champ `name`) et sa description sont dans l'en-tête du texte.

## Maintenance

Après un changement de charte (logo, couleur, mention) : mettre à jour `source/marques.py` (et
`source/logos/`), lancer `python3 source/build_skills.py`, puis recoller dans Reemia le skill de
charte concerné — les deux agents en profitent.

Après un changement de délai légal ou de méthode : modifier `source/post_ag.src.md` ou
`source/core.src.md`, relancer `build_skills.py`, recoller le skill de l'agent.

Test PV de CC : `python3 source/assemble.py /tmp/pv-html && node source/pdfall.js /tmp/pv-html`.

## Agent « Tâches post-AG » : une seule réponse

L'agent livre directement le plan d'actions HTML à partir du PV, sans liste préalable ni
validation. Le gabarit est compact (environ 20 000 caractères pour 25 tâches chez OP, comme un
PV de CC ; environ 31 000 pour Syncura et Easy Syndic, dont les logos sont plus lourds). Si
l'agent bloque en cours d'écriture, réduire en priorité la longueur des libellés et des
détails (section 1 du skill).
