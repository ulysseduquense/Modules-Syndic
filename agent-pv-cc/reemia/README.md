# Agent « PV de CC » pour Reemia

Reemia n'exécute pas de code et un skill y est **un seul texte de 65 000 caractères au plus**.
Cette version produit donc un **HTML A4 imprimable** (Edge : Ctrl+P → Enregistrer au format PDF)
à la charte de la marque, rempli par l'agent lui-même. La version complète (.docx + PDF par
script) reste `../pv-conseil-copropriete/`.

```
livrables/
  Instructions agent Reemia - PV de CC.md        à coller dans « Instructions » de l'agent
  Skill 1 - PV de CC - redaction et gabarit.md    méthode FR/NL, cadre légal BE/LU, gabarit HTML
  Skill 2 - PV de CC - chartes OP, Easy Syndic, Gestea.md
  Skill 3 - PV de CC - chartes Syncura, Noblué, DR Syndic.md
  Skill 4 - PV de CC - chartes Agigest, Emeria.md
source/
  core.src.md      texte du skill 1 ({{CSS}} = commun.css)
  commun.css       CSS commun du gabarit (A4, bandeaux, en-tête répété, pied, numéros de page)
  marques.py       chartes des 8 marques (couleurs, polices, logos, mentions), reprises de brand.json
  logos/           logos officiels compactés (SVG minifiés, PNG ou WebP à la taille d'impression)
  build_skills.py  régénère les 4 skills et contrôle la limite de 65 000 caractères
  assemble.py      PV d'exemple assemblé comme le ferait l'agent (test)
  pdfall.js        impression Chromium des HTML d'un dossier (test)
```

Après un changement de charte (logo, couleur, mention) : mettre à jour `source/marques.py` (et
`source/logos/`), lancer `python3 source/build_skills.py`, puis recoller le skill concerné dans
Reemia.

Test : `python3 source/assemble.py /tmp/pv-html && node source/pdfall.js /tmp/pv-html`.
