---
name: charte-syndic-op-easy-gestea
description: Charte graphique des documents HTML A4 imprimables des syndics OP, Easy Syndic, Gestea (OP, O.P., Office des Propriétaires, OP Bruxelles, Opbrussels, OP Wallonie, OPBW, OP BW ; Easy Syndic, EasySyndic, easy-syndic ; Gestea). Pour chaque marque, le bloc de style (couleurs, polices, logos officiels intégrés), l'en-tête de la page 1, l'en-tête des pages suivantes, le pied de page avec les mentions légales exactes et le bloc titre. Commun à tous les agents qui produisent un document à la charte d'un syndic Emeria (PV de conseil de copropriété, plan d'actions post-AG…) ; s'utilise avec le skill du document, qui donne le squelette HTML, le CSS commun et les libellés.
---

# Chartes syndic — OP, Easy Syndic, Gestea

Ces fiches complètent le skill du document en cours (PV de conseil de copropriété, plan
d'actions post-AG…), qui donne le squelette HTML, le CSS commun, les composants et les
libellés. Pour la marque du document, copier ses blocs **tels quels** aux marqueurs du squelette.

- Ne jamais modifier un logo (les adresses `data:` sont les fichiers officiels relevés sur le site
  de la marque), une couleur ou une mention légale, ni mélanger les blocs de deux marques.
- Seuls changements permis : `[RAPPEL]` dans l'en-tête des pages suivantes ; `[SURTITRE]`,
  `[TITRE]`, `[COPROPRIÉTÉ]` et `[SOUS-LIGNE]` dans le bloc titre ; la ligne 2 du pied (contact
  du gestionnaire ou de son bureau) ; pour une entité ou un bureau listé dans la fiche, les
  lignes indiquées.
- Les polices viennent de Google Fonts : sans connexion, le navigateur bascule sur Arial ; le PDF
  reste propre.

## OP — Office des Propriétaires

- **Reconnaître** : OP, O.P., Office des Propriétaires, OP Bruxelles, Opbrussels, OP Wallonie, OPBW, OP BW.
- **Langue** : français · **organe** : conseil de copropriété · **copropriété** : « ACP <nom> ».
- **Charte** (site op.be, relevé du 05/11/2026) : emblème rouge sur en-tête blanc, Inter, nom de l'ACP en serif italique rouge, encadrés à barre rouge sur fond beige, pied de page blanc à filet.

**1. Bloc marque** — dans `<head>`, à la place de `⟦BLOC MARQUE⟧`, tel quel :

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Source+Serif+4:ital,wght@1,400&display=swap">
<style>
:root{--primaire:#1C242B;--secondaire:#D44036;--accent:#D44036;--texte:#1C242B;--texte-2:#333333;
--fond-clair:#F6F3EF;--filet:#E2DAD0;--entete-tableau:#1C242B;--texte-entete-tableau:#FFFFFF;--texte-pied:#333333;
--entete-fond:#1C242B;--pied-fond:#FFFFFF;
--police-titres:'Inter', Arial, sans-serif;--police-texte:'Inter', Arial, sans-serif;--police-accent:'Source Serif 4', Georgia, serif;--police-surtitre:'Inter', Arial, sans-serif;
--graisse-titre:400;--graisse-h2:700;--echelle-titres:1;--interligne:1.32;
--haut-h:17mm;--esp-haut:24mm;--pied-h:17mm;--esp-bas:calc(17mm + 6mm);--p1-h:17mm;--pastille-h:15.5mm;
--filet-accent-l:0;
--logo-p1-l:15.5mm;--logo-p1-h:19.6mm;--logo-suite-l:6.2mm;--logo-suite-h:7.8mm;--logo-pied-l:0;--logo-pied-h:0}
@page{size:A4;margin:0 0 7mm 0;@bottom-left-corner{background:#FFFFFF;content:""}@bottom-left{background:#FFFFFF;content:""}@bottom-center{background:#FFFFFF;content:""}@bottom-right-corner{background:#FFFFFF;content:""}@bottom-right{background:#FFFFFF;content:"Page " counter(page) " / " counter(pages);color:#333333;font:7.5pt "Inter", Arial, sans-serif;text-align:right;vertical-align:top;padding-right:20mm}}
.logo-1{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='62' height='79' fill='none'%3E%3Cg fill='%23A40C21' clip-path='url(%23a)'%3E%3Cpath d='M2.5 65.3V13.2l12-10.7h32.9l12 10.7v52.1L46.7 76.5h-31zM13.6 0 0 12.1v54.4L14.6 79h32.9L62 66.5V12L48.4 0z'/%3E%3Cpath d='M39.4 13c.4-1.6 0-3.3-1.8-4s-3.8.3-3.8.3l-1.2-.9.1-.8q-.2-1.8-2-2c-1.8-.2-2.1.8-2.1 2s0 .6.2.8l-1.3.9s-2-1-3.8-.3-2.3 2.3-1.8 4c.5 1.6 2.1 3 2.3 3.2q-.7.1-.7 1 .1.6.9.6h12.3q.7 0 .9-.7c.2-.7-.5-.9-.5-.9.2-.2 1.8-1.6 2.3-3.2m-8.8-5.8s.4.2.4.4q0 .2-.4.3t-.4-.3q.1-.4.4-.4m-2.5 9.2h-.9q-.6-.1-2.5-2c-2-2-1.6-2.9-.6-3.6s2.7 0 2.7 0c-.1 0-.3 1.4.2 2.7l1.3 2.8zm2.5 0h-1s-2-2-2-4.4 2.9-2.3 2.9-2.3 3 0 3 2.3-2 4.4-2 4.4h-1.1zm6.1-1.9a11 11 0 0 1-2.6 2h-1s.9-1.4 1.4-2.7.3-2.7.2-2.8 1.6-.8 2.7 0c1 .9.6 2.4-.6 3.7'/%3E%3Cpath d='M27 22.3c-2.5-1.5-5.6-1.5-6.6-1.5-3.7 0-5.9 1-7 1.7-4 2.3-4 5.7-4 9.3v19.5c0 2.2 0 3 .4 4 1.1 3.1 4 4.5 5.5 4.8 1.7.5 3.7.5 4.3.5 1.5 0 8.1 0 10.3-4.6q1-2.3.8-4.6V32.7c0-4.3 0-6.4-1.5-8.4q-.4-.8-2.3-2m-6.8 34c-2.2 0-2.5-2-2.5-4v-21c0-3 0-4.6 1-5.4q.8-.6 1.6-.6 1.3 0 2 1.1.6 1.4.5 5V51c0 2.3.2 5.3-2.6 5.3'/%3E%3Cpath d='M53 24.4q-.4-.8-2.2-2c-2.6-1.6-5.6-1.6-6.7-1.6h-9.5v38.5H42v-12h1.5c1.5 0 8 0 10.2-4.4q1-2.2 1-4.5v-5.7c0-4.3 0-6.3-1.5-8.2m-9 18h-2.4V25.2h2.4q1.8.2 2.2 1.1.6 1.3.5 4.8v6.4c0 2.3.2 5.2-3 5.2'/%3E%3Cpath d='m19.8 64.9-3 1.5h.3q.6 0 .8.7v7h1.9z'/%3E%3Cpath d='M27 68.7q1.6-.5 1.7-2c0-.9-1.3-2-2.8-2-1.6 0-2.9.9-2.9 2.4s.7 1.8 1.3 2.4c-.8.2-1.9 1-1.9 2.1 0 1.8 1.6 2.4 3.3 2.4s3.5-1 3.5-2.7-1.2-2-2.3-2.6m-.5-.3q-1.7-1-1.7-2 0-1.5 1.2-1.4 1 .1 1.2 1.6a3 3 0 0 1-.6 1.8m.9 3.7q-.1 1.3-1.6 1.5-1.5-.1-1.6-2c0-1.3.3-1.4.6-1.8l.7.4c1.3.7 2 1 2 2'/%3E%3Cpath d='m36.1 68.9-1.8 5.3h-1.7l2.9-7.5h-3.2q-1.1.1-1 .3h-.1l.4-2h6.1l-1.5 3.8z'/%3E%3Cpath d='m44.4 66.6.4-2h-.2s0 .4-.8.4h-3.4l-.8 4.2c1.6-.5 3.1-.2 3.1 1.6 0 2.6-2 2.6-3.6 2 .8 1.9 6 2 6-2.1s-1.4-3.3-4.2-2.5l.2-1.6z'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='a'%3E%3Crect width='62' height='79' fill='%23fff'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E")}
</style>
```

**2. En-tête page 1** — à la place de `⟦EN-TÊTE PAGE 1⟧` :

```html
<header class="entete-p1 p1-blanc"><div class="logo logo-1" role="img" aria-label="Office des Propriétaires (OP)"></div></header>
```

**3. En-tête des pages suivantes** — à la place de `⟦EN-TÊTE DES PAGES SUIVANTES⟧` ; remplacer `[RAPPEL]` par le rappel défini dans le skill du document :

```html
<div class="haut-suite suite-blanc"><div class="logo logo-1"></div><div class="rappel">[RAPPEL]</div></div>
```

**4. Pied de page** — à la place de `⟦PIED DE PAGE⟧`. La ligne 2 donne le contact : la remplacer par le téléphone et l'e-mail du gestionnaire ou de son bureau s'ils sont connus. Ne rien changer d'autre :

```html
<div class="pied pied-filet"><div class="mentions">
<p>Office des Propriétaires SA · Rue Vilain XIIII 53-55, 1000 Bruxelles · TVA BE 0841.885.269 · IPI n° 508 167</p>
<p>Tél. +32 2 626 08 26 · reception@op.be · op.be</p>
<p>Autorité de contrôle : Institut Professionnel de l'Immobilier (IPI), rue du Luxembourg 16B, 1000 Bruxelles · RC professionnelle : Axa, police n° 730.390.160</p>
</div></div>
```

**5. Bloc titre** — début de `⟦CONTENU⟧` ; remplacer `[SURTITRE]`, `[TITRE]`, `[COPROPRIÉTÉ]` et `[SOUS-LIGNE]` par les libellés du skill du document, sans changer les balises :

```html
<p class="surtitre">[SURTITRE]</p>
<h1 class="titre">[TITRE]</h1>
<p class="acp accent">[COPROPRIÉTÉ]</p>
<p class="acp-sous">[SOUS-LIGNE]</p>
```

**6. Entités et bureaux** — **OP Wallonie** (immeubles gérés par la société OP Wallonie) : dans le pied de page, remplacer la
ligne 1 par `Office des Propriétaires Wallonie SRL · Rue Vilain XIIII 53-55, 1000 Bruxelles · BCE 0432.691.858 · IPI n° 508 167`,
et, dans la ligne « Syndic » de la grille d'informations, écrire « Office des Propriétaires Wallonie SRL, représentée par … ».

**Bureaux** (ligne 2 du pied de page, si le gestionnaire en dépend) :

| bureau | adresse | téléphone | e-mail |
|---|---|---|---|
| OP Bruxelles Sud | Rue Vilain XIIII 53-55, 1000 Bruxelles | +32 2 626 08 26 | reception@op.be |
| OP Bruxelles Est | Boulevard Brand Whitlock 87, 1200 Woluwe-Saint-Lambert | +32 2 268 17 77 | reception@op.be |
| OP Brabant Wallon | Avenue de France 26, 1400 Nivelles | +32 67 84 23 00 | syndic.brabantwallon@op.be |
| OP Louvain-la-Neuve | Place de l'Equerre 33, 1348 Ottignies-Louvain-la-Neuve | +32 10 45 39 90 | syndic.brabantwallon@op.be |
| OP Namur (Jambes) | Chaussée de Liège 652, 5100 Namur | +32 81 84 14 84 | syndic.brabantwallon@op.be |

**7. Attention** — Logo publié uniquement en rouge : en-tête toujours blanc. Rattachement des bureaux wallons à OP Wallonie SRL à confirmer par l'utilisateur en cas de doute.

## Easy Syndic

- **Reconnaître** : Easy Syndic, EasySyndic, easy-syndic.
- **Langue** : français · **organe** : conseil de copropriété · **copropriété** : « ACP <nom> ».
- **Charte** (site easysyndic.be, relevé du 05/11/2026) : logo bleu-vert sur en-tête blanc, Hanken Grotesk très gras, filet orange sous le titre, encadrés beige à barre orange, pied bleu nuit avec logo blanc.

**1. Bloc marque** — dans `<head>`, à la place de `⟦BLOC MARQUE⟧`, tel quel :

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;700;900&display=swap">
<style>
:root{--primaire:#211746;--secondaire:#18A2AC;--accent:#FF832E;--texte:#211746;--texte-2:#5F587A;
--fond-clair:#F5EBE4;--filet:#CECCD6;--entete-tableau:#211746;--texte-entete-tableau:#FFFFFF;--texte-pied:#FFFFFF;
--entete-fond:#211746;--pied-fond:#211746;
--police-titres:'Hanken Grotesk', Arial, sans-serif;--police-texte:'Hanken Grotesk', Arial, sans-serif;--police-accent:'Hanken Grotesk', Arial, sans-serif;--police-surtitre:'Hanken Grotesk', Arial, sans-serif;
--graisse-titre:900;--graisse-h2:900;--echelle-titres:1;--interligne:1.3;
--haut-h:17mm;--esp-haut:24mm;--pied-h:18mm;--esp-bas:calc(18mm + 6mm);--p1-h:17mm;--pastille-h:15.5mm;
--filet-accent-l:32mm;
--logo-p1-l:46mm;--logo-p1-h:11.2mm;--logo-suite-l:28mm;--logo-suite-h:6.8mm;--logo-pied-l:30mm;--logo-pied-h:7.2mm}
@page{size:A4;margin:0 0 7mm 0;@bottom-left-corner{background:#211746;content:""}@bottom-left{background:#211746;content:""}@bottom-center{background:#211746;content:""}@bottom-right-corner{background:#211746;content:""}@bottom-right{background:#211746;content:"Page " counter(page) " / " counter(pages);color:#FFFFFF;font:7.5pt "Hanken Grotesk", Arial, sans-serif;text-align:right;vertical-align:top;padding-right:20mm}}
.logo-1{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 241 59'%3E%3Cpath fill='url(%23a)' d='M28.47 57.14a28.4 28.4 0 0 1-15.82-4.82A28.6 28.6 0 0 1 2.17 39.5 28.7 28.7 0 0 1 .55 23 28.6 28.6 0 0 1 8.34 8.36 28.4 28.4 0 0 1 22.92.55a28.4 28.4 0 0 1 16.45 1.63A28.5 28.5 0 0 1 52.15 12.7a28.6 28.6 0 0 1 4.8 15.87 28.7 28.7 0 0 1-8.36 20.19 28.5 28.5 0 0 1-20.12 8.38m0-39.14c-2.08 0-4.12.62-5.85 1.78a10.6 10.6 0 0 0-3.88 4.74 10.6 10.6 0 0 0 2.28 11.52 10.5 10.5 0 0 0 11.48 2.3c1.93-.8 3.57-2.16 4.73-3.9a10.6 10.6 0 0 0-1.3-13.35 10.5 10.5 0 0 0-7.46-3.1'/%3E%3Cg style='mix-blend-mode:multiply'%3E%3Cmask id='b' width='39' height='50' x='19' y='8' maskUnits='userSpaceOnUse' style='mask-type:luminance'%3E%3Cpath fill='%23fff' d='M48.96 8.74a9.04 9.04 0 0 1-.66 12.41 9 9 0 0 1-6.2 2.46 9 9 0 0 1-6.2-2.5 10.6 10.6 0 0 1 3 5.4 10.6 10.6 0 0 1-4.4 10.95 10.5 10.5 0 0 1-5.89 1.82 9 9 0 0 0-6.71 2.43 9 9 0 0 0-2.83 6.57 9 9 0 0 0 2.83 6.56 9 9 0 0 0 6.71 2.43 28.4 28.4 0 0 0 15.75-4.68A28.5 28.5 0 0 0 54.9 39.96a28.7 28.7 0 0 0 1.84-16.38 28.6 28.6 0 0 0-7.48-14.67z'/%3E%3C/mask%3E%3Cg mask='url(%23b)'%3E%3Cpath fill='url(%23c)' d='M70 5.94H16.34V59H70z'/%3E%3C/g%3E%3C/g%3E%3Cpath fill='%23211746' d='M65.41 33.85V9.88h15.33v4.73h-9.95V19h9.36v4.73h-9.37v5.39h10.57v4.73zm29.2 0-.34-2.07a5 5 0 0 1-2.04 1.9 5 5 0 0 1-2.72.59 5 5 0 0 1-3.93-1.33 5 5 0 0 1-1.57-3.85c0-3.87 3.06-5.01 6.2-5.01q2.14.03 4.23.52v-1.21c0-1.38-1.07-2-2.8-2a9 9 0 0 0-4.88 1.58l-2-2.59a10.8 10.8 0 0 1 7.37-2.49c3.75 0 7.16 1.45 7.16 5.5v10.36zm-.34-6.21a11 11 0 0 0-3.07-.56c-1.38 0-2.44.49-2.44 1.9s.75 2.1 2.34 2.1a3.4 3.4 0 0 0 3.16-1.65zm12.25-.28c-2.13-.83-4.1-2.1-4.1-4.73s2.42-4.74 6.44-4.74a7.8 7.8 0 0 1 6.2 2.25L113.2 23a5 5 0 0 0-4.1-1.77c-1.61 0-1.92.6-1.92 1.1 0 .53.3.87 2.48 1.7l1.37.49a5.4 5.4 0 0 1 2.88 1.75 5.4 5.4 0 0 1 1.29 3.12c0 2.86-2.34 4.87-6.54 4.87a7.8 7.8 0 0 1-6.89-2.84l2.3-2.69a5 5 0 0 0 4.2 2.04c1.04 0 2.14-.28 2.14-1.1 0-.84-1-1.22-2.51-1.77zm16.46 6.77-6.61-15.82h5.5l3.45 10.36 3.65-10.36h5.3l-6.88 16.4c-2.07 5.08-3.45 6.19-6.34 6.19a7 7 0 0 1-4-1.14l1.18-3.45a5 5 0 0 0 2.4.75 1.9 1.9 0 0 0 1.97-1.48zm22.2-6.5a6.6 6.6 0 0 0 5.51 2.21c2.04 0 3.03-.58 3.03-2.24 0-.73 0-1.9-3.44-3.45l-1.65-.76a8 8 0 0 1-3.89-2.76 8 8 0 0 1-1.59-4.5c0-4.87 3.86-6.7 7.82-6.7a12 12 0 0 1 7.88 2.83L156.37 16a8.5 8.5 0 0 0-5.47-2.17c-1.9 0-2.55.86-2.55 2.03s.35 1.84 2.69 2.94l1.65.8c3.17 1.45 6.47 3.14 6.47 7.73s-3.99 7.22-8.53 7.22a11.5 11.5 0 0 1-8.37-3.1zm21.18 6.5-6.61-15.82h5.5l3.45 10.36 3.65-10.36h5.16l-6.64 16.4c-2.07 5.08-3.44 6.19-6.34 6.19a7 7 0 0 1-4.23-1.14l1.17-3.45a5 5 0 0 0 2.41.75 1.9 1.9 0 0 0 1.96-1.48zm22.72-.28v-9.12c0-1.34-.24-2.73-2.06-2.73s-2.62 1.39-2.62 3.46v8.4h-4.89V18.3h4.55l.34 2.07a5 5 0 0 1 1.9-1.86 5 5 0 0 1 2.57-.63 5 5 0 0 1 3.82 1.52 5 5 0 0 1 1.32 3.9v10.54zm19.8 0-.35-2.04a5.4 5.4 0 0 1-4.75 2.46c-3.92 0-6.71-3.18-6.71-8.05a7.5 7.5 0 0 1 1.74-5.7 7.5 7.5 0 0 1 5.35-2.63 5 5 0 0 1 2.49.51 5 5 0 0 1 1.88 1.7V9.74h4.93v24.11zm-.28-7.74c0-3.24-1.62-4.25-3.23-4.25s-3.45.8-3.45 4.22 1.66 4.21 3.45 4.21 3.23-.62 3.23-4.18m8.47-12.67a2.83 2.83 0 0 1 3.39-2.78 2.8 2.8 0 0 1 2.2 2.24 2.8 2.8 0 0 1-1.22 2.9 2.8 2.8 0 0 1-3.55-.37 2.8 2.8 0 0 1-.82-2m.35 20.42V18.31h4.92v15.54zm23.58-3a8 8 0 0 1-3.1 2.66 8 8 0 0 1-4 .8 7.8 7.8 0 0 1-6.04-2.19 7.8 7.8 0 0 1-2.35-6 8.7 8.7 0 0 1 1.73-4.96 8.6 8.6 0 0 1 4.26-3.04 8.6 8.6 0 0 1 5.24 0 8.6 8.6 0 0 1 4.26 3.06l-2.38 2.66a5.6 5.6 0 0 0-4.5-1.97c-2.59 0-3.76 1.62-3.76 4.21 0 2.6 1.14 4.22 3.44 4.22a5.5 5.5 0 0 0 4.17-1.94z'/%3E%3Cpath fill='%2319A2AB' d='m66.69 48.84-2.17-5.14h1.1l1.55 4.04 1.69-4.04h1.06l-2.65 6.35c-.34.87-.72 1.21-1.37 1.21a2 2 0 0 1-.97-.24l.28-.8q.29.16.62.18c.27 0 .41 0 .58-.59zm3.65-2.55A2.7 2.7 0 0 1 72 43.86a2.6 2.6 0 0 1 2.88.6 2.7 2.7 0 0 1 .56 2.89 2.7 2.7 0 0 1-2.45 1.63 2.5 2.5 0 0 1-1.92-.76 2.6 2.6 0 0 1-.73-1.93m4.27 0a1.7 1.7 0 0 0-.95-1.74 2 2 0 0 0-.67-.16 1.7 1.7 0 0 0-1.56 1.2 2 2 0 0 0-.06.7 1.7 1.7 0 0 0 .94 1.71q.32.15.68.15a1.65 1.65 0 0 0 1.56-1.17q.1-.34.06-.7m5.75 2.56v-.72a1.8 1.8 0 0 1-1.59.86c-1.03 0-1.72-.62-1.72-1.9v-3.45h.97v3c0 1.14.48 1.39 1 1.39a1.4 1.4 0 0 0 1.29-.99q.08-.28.05-.57v-2.83h1v5.15zm5.37 0V40.7h1v8.15zm2.44-6.9a.73.73 0 0 1 .73-.73.7.7 0 0 1 .72.73.73.73 0 0 1-.72.72.7.7 0 0 1-.73-.72m.2 6.9V43.7h1.14v5.14zm4.14 0-2.17-5.14h1.07l1.55 4.04 1.58-4.04h1.07l-2.14 5.14zm8.37-.93a2.5 2.5 0 0 1-2.14 1.07 2.4 2.4 0 0 1-1.86-.75 2.4 2.4 0 0 1-.65-1.9 2.5 2.5 0 0 1 .66-1.96 2.5 2.5 0 0 1 1.89-.81c1.3 0 2.34.9 2.34 2.94h-3.9c0 1.03.52 1.65 1.52 1.65a1.8 1.8 0 0 0 1.52-.72zm-.8-2.2a1.4 1.4 0 0 0-.4-.99 1.4 1.4 0 0 0-.97-.4 1.4 1.4 0 0 0-1.33.84q-.1.26-.12.54zm2.17 4.27-.38-.44.66-.7a.6.6 0 0 1-.31-.58.72.72 0 1 1 1.44 0c0 .45-.27.69-.79 1.17zm9.78-1.14-1.17-3.93-1.14 3.97h-1.06L107 43.73h1.1l1.14 4.04 1.1-4.04h1.07l1.1 4.04 1.1-4.07h1.07l-1.65 5.14zm8.02-.93a2.6 2.6 0 0 1-2.17 1.07 2.4 2.4 0 0 1-2.4-1.63 2.4 2.4 0 0 1-.11-1.03 2.5 2.5 0 0 1 .66-1.95 2.5 2.5 0 0 1 1.89-.81c1.34 0 2.34.9 2.34 2.94h-3.9a1.45 1.45 0 0 0 .92 1.56q.3.12.64.1a1.7 1.7 0 0 0 1.48-.73zm-.79-2.2a1.4 1.4 0 0 0-.41-1 1.4 1.4 0 0 0-1-.4 1.45 1.45 0 0 0-1.45 1.4zm9.78 2.2a2.7 2.7 0 0 1-2.3 1.07 2.73 2.73 0 0 1 0-5.42 2.5 2.5 0 0 1 2.16 1.1l-.58.63a1.8 1.8 0 0 0-1.62-.87 1.6 1.6 0 0 0-1.63 1.1 2 2 0 0 0-.06.7 1.7 1.7 0 0 0 .43 1.35 1.7 1.7 0 0 0 1.3.55 1.8 1.8 0 0 0 1.61-.83zm4.44.93v-.58a2.3 2.3 0 0 1-1.65.72 1.75 1.75 0 0 1-1.74-1.03 2 2 0 0 1-.16-.7c0-1.03.86-1.62 2.1-1.62q.72-.07 1.45 0v-.34a1 1 0 0 0-.28-.76 1.5 1.5 0 0 0-.96-.31 2 2 0 0 0-1.55.69l-.62-.6a3 3 0 0 1 2.27-.92 2.3 2.3 0 0 1 1.59.51 1.8 1.8 0 0 1 .51 1.49v3.45zm0-2.24a6 6 0 0 0-1.38-.17c-.72 0-1.17.2-1.17.83a.9.9 0 0 0 .67.9 1 1 0 0 0 .4.03 2 2 0 0 0 1.48-.66zm2.48 2.24V43.7h.9v.86a1.3 1.3 0 0 1 1.2-.93 1 1 0 0 1 .96.48l-.48.83a1 1 0 0 0-.72-.34c-.52 0-.97.34-.97 1.59v2.66zm8.37-.93a2.6 2.6 0 0 1-2.17 1.07 2.4 2.4 0 0 1-2.4-1.63 2.4 2.4 0 0 1-.12-1.03 2.5 2.5 0 0 1 .66-1.95 2.5 2.5 0 0 1 1.89-.81c1.34 0 2.34.9 2.34 2.94h-3.89a1.5 1.5 0 0 0 .37 1.19 1.5 1.5 0 0 0 1.15.46 1.8 1.8 0 0 0 1.51-.72zm-.83-2.2a1.4 1.4 0 0 0-1.38-1.4 1.4 1.4 0 0 0-1.32.85q-.12.26-.12.54z'/%3E%3Cdefs%3E%3ClinearGradient id='a' x1='48.82' x2='10.09' y1='56.41' y2='3.75' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.13' stop-color='%2335596A'/%3E%3Cstop offset='.71' stop-color='%2319A2AB'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' x1='43.66' x2='42.16' y1='19.83' y2='59.14' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%231B72B8'/%3E%3Cstop offset='.13' stop-color='%233683C0'/%3E%3Cstop offset='.19' stop-color='%2372A8D3'/%3E%3Cstop offset='.25' stop-color='%23A5C7E3'/%3E%3Cstop offset='.31' stop-color='%23CCDFEF'/%3E%3Cstop offset='.36' stop-color='%23E8F1F8'/%3E%3Cstop offset='.41' stop-color='%23F9FBFD'/%3E%3Cstop offset='.44' stop-color='%23fff'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E")}
.logo-2{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 241 58'%3E%3Cpath fill='url(%23a)' d='M28.47 57.14a28.4 28.4 0 0 1-15.82-4.82A28.6 28.6 0 0 1 2.17 39.5 28.7 28.7 0 0 1 .55 23 28.6 28.6 0 0 1 8.34 8.36 28.4 28.4 0 0 1 22.92.55a28.4 28.4 0 0 1 16.45 1.63A28.5 28.5 0 0 1 52.15 12.7a28.6 28.6 0 0 1 4.8 15.87 28.7 28.7 0 0 1-8.36 20.19 28.5 28.5 0 0 1-20.12 8.38m0-39.14c-2.08 0-4.12.62-5.85 1.78a10.6 10.6 0 0 0-3.88 4.74 10.6 10.6 0 0 0 2.28 11.52 10.5 10.5 0 0 0 11.48 2.3c1.93-.8 3.57-2.16 4.73-3.9a10.6 10.6 0 0 0-1.3-13.35 10.5 10.5 0 0 0-7.46-3.1'/%3E%3Cg style='mix-blend-mode:multiply'%3E%3Cmask id='b' width='39' height='50' x='19' y='8' maskUnits='userSpaceOnUse' style='mask-type:luminance'%3E%3Cpath fill='%23fff' d='M48.96 8.74a9.04 9.04 0 0 1-.66 12.41 9 9 0 0 1-6.2 2.46 9 9 0 0 1-6.2-2.5 10.6 10.6 0 0 1 2.46 11.55 10.6 10.6 0 0 1-3.87 4.8 10.5 10.5 0 0 1-5.88 1.82 9 9 0 0 0-6.71 2.42 9 9 0 0 0-2.83 6.57 9 9 0 0 0 2.83 6.57 9 9 0 0 0 6.71 2.43 28.4 28.4 0 0 0 15.75-4.68A28.5 28.5 0 0 0 54.9 39.96a28.7 28.7 0 0 0 1.84-16.38 28.6 28.6 0 0 0-7.48-14.67z'/%3E%3C/mask%3E%3Cg mask='url(%23b)'%3E%3Cpath fill='url(%23c)' d='M70 5.94H16.34V59H70z'/%3E%3C/g%3E%3C/g%3E%3Cpath fill='%23fff' d='M65.41 33.85V9.88h15.33v4.73h-9.95V19h9.36v4.73h-9.37v5.39h10.57v4.73zm29.2 0-.34-2.07a5 5 0 0 1-2.04 1.9 5 5 0 0 1-2.72.59 5 5 0 0 1-3.93-1.33 5 5 0 0 1-1.57-3.85c0-3.87 3.06-5.01 6.2-5.01q2.14.03 4.23.52v-1.21c0-1.38-1.07-2-2.8-2a9 9 0 0 0-4.88 1.58l-2-2.59a10.8 10.8 0 0 1 7.37-2.49c3.75 0 7.16 1.45 7.16 5.5v10.36zm-.34-6.21a11 11 0 0 0-3.07-.56c-1.38 0-2.44.49-2.44 1.9s.75 2.1 2.34 2.1a3.4 3.4 0 0 0 3.16-1.65zm12.25-.28c-2.13-.83-4.1-2.1-4.1-4.73s2.42-4.74 6.44-4.74a7.8 7.8 0 0 1 6.2 2.25L113.2 23a5 5 0 0 0-4.1-1.77c-1.61 0-1.92.6-1.92 1.1 0 .53.3.87 2.48 1.7l1.37.49a5.4 5.4 0 0 1 2.88 1.75 5.4 5.4 0 0 1 1.29 3.12c0 2.86-2.34 4.87-6.54 4.87a7.8 7.8 0 0 1-6.89-2.84l2.3-2.69a5 5 0 0 0 4.2 2.04c1.04 0 2.14-.28 2.14-1.1 0-.84-1-1.22-2.51-1.77zm16.46 6.77-6.61-15.82h5.5l3.45 10.36 3.65-10.36h5.3l-6.88 16.4c-2.07 5.08-3.45 6.19-6.34 6.19a7 7 0 0 1-4-1.14l1.18-3.45a5 5 0 0 0 2.4.75 1.9 1.9 0 0 0 1.97-1.48zm22.2-6.5a6.6 6.6 0 0 0 5.51 2.21c2.04 0 3.03-.58 3.03-2.24 0-.73 0-1.9-3.44-3.45l-1.65-.76a8 8 0 0 1-3.89-2.76 8 8 0 0 1-1.59-4.5c0-4.87 3.86-6.7 7.82-6.7a12 12 0 0 1 7.88 2.83L156.38 16a8.5 8.5 0 0 0-5.48-2.17c-1.9 0-2.55.86-2.55 2.03s.35 1.84 2.69 2.94l1.65.8c3.17 1.45 6.47 3.14 6.47 7.73s-3.99 7.22-8.53 7.22a11.5 11.5 0 0 1-8.37-3.1zm21.18 6.5-6.61-15.82h5.5l3.45 10.36 3.65-10.36h5.16l-6.64 16.4c-2.07 5.08-3.44 6.19-6.34 6.19a7 7 0 0 1-4.23-1.14l1.17-3.46a5 5 0 0 0 2.41.76 1.9 1.9 0 0 0 1.96-1.48zm22.72-.28v-9.12c0-1.34-.24-2.73-2.06-2.73s-2.62 1.39-2.62 3.46v8.4h-4.89V18.3h4.55l.34 2.07a5 5 0 0 1 1.9-1.86 5 5 0 0 1 2.57-.63 5 5 0 0 1 3.82 1.52 5 5 0 0 1 1.32 3.9v10.54zm19.8 0-.35-2.04a5.4 5.4 0 0 1-4.75 2.46c-3.92 0-6.71-3.18-6.71-8.05a7.5 7.5 0 0 1 1.74-5.7 7.5 7.5 0 0 1 5.35-2.63 5 5 0 0 1 2.49.51 5 5 0 0 1 1.88 1.7V9.74h4.93v24.11zm-.28-7.74c0-3.24-1.62-4.25-3.23-4.25s-3.45.8-3.45 4.22 1.66 4.21 3.45 4.21 3.23-.62 3.23-4.18m8.47-12.67a2.8 2.8 0 0 1 1.75-2.62 2.8 2.8 0 0 1 3.08.63 2.84 2.84 0 0 1-.46 4.36 2.8 2.8 0 0 1-3.55-.38 2.8 2.8 0 0 1-.82-2m.35 20.42V18.31h4.92v15.54zm23.58-3a8 8 0 0 1-3.1 2.66 8 8 0 0 1-4 .8 7.8 7.8 0 0 1-6.04-2.19 7.8 7.8 0 0 1-2.35-6 8.7 8.7 0 0 1 1.73-4.96 8.6 8.6 0 0 1 4.26-3.04 8.6 8.6 0 0 1 5.24 0 8.6 8.6 0 0 1 4.26 3.06l-2.38 2.66a5.6 5.6 0 0 0-4.5-1.97c-2.59 0-3.76 1.62-3.76 4.21s1.14 4.21 3.44 4.21a5.5 5.5 0 0 0 4.17-1.93z'/%3E%3Cpath fill='%2319A2AB' d='m66.69 48.84-2.17-5.14h1.1l1.55 4.04 1.69-4.04h1.06l-2.65 6.35c-.34.87-.72 1.21-1.37 1.21a2 2 0 0 1-.97-.24l.28-.8q.29.16.62.18c.27 0 .41 0 .58-.59zm3.65-2.55A2.7 2.7 0 0 1 72 43.86a2.6 2.6 0 0 1 2.88.6 2.66 2.66 0 0 1-1.9 4.52 2.5 2.5 0 0 1-1.91-.76 2.6 2.6 0 0 1-.73-1.93m4.27 0a1.7 1.7 0 0 0-.95-1.74 2 2 0 0 0-.67-.16 1.7 1.7 0 0 0-1.56 1.2 2 2 0 0 0-.06.7 1.7 1.7 0 0 0 .94 1.71q.32.15.68.15a1.65 1.65 0 0 0 1.56-1.17q.1-.34.06-.7m5.75 2.57v-.73a1.8 1.8 0 0 1-1.59.86c-1.03 0-1.72-.62-1.72-1.9v-3.45h.97v3c0 1.14.48 1.39 1 1.39a1.4 1.4 0 0 0 1.29-.98q.08-.3.05-.58v-2.83h1v5.15zm5.37 0v-8.16h1v8.15zm2.44-6.91a.73.73 0 0 1 .73-.73.7.7 0 0 1 .72.73.73.73 0 0 1-.72.72.7.7 0 0 1-.73-.72m.2 6.9V43.7h1.14v5.14zm4.14 0-2.17-5.14h1.07l1.55 4.04 1.58-4.04h1.07l-2.14 5.14zm8.37-.93a2.5 2.5 0 0 1-2.14 1.07 2.4 2.4 0 0 1-1.86-.75 2.4 2.4 0 0 1-.65-1.9 2.5 2.5 0 0 1 1.51-2.57q.5-.2 1.04-.2c1.3 0 2.34.9 2.34 2.94h-3.9c0 1.03.52 1.65 1.52 1.65a1.8 1.8 0 0 0 1.52-.72zm-.8-2.2a1.4 1.4 0 0 0-1.37-1.4 1.4 1.4 0 0 0-1.33.85 1.4 1.4 0 0 0-.12.54zm2.17 4.27-.38-.44.66-.7a.6.6 0 0 1-.31-.58.72.72 0 1 1 1.44 0c0 .45-.27.69-.79 1.17zm9.78-1.14-1.17-3.93-1.14 3.97h-1.06L107 43.73h1.1l1.14 4.04 1.1-4.04h1.07l1.1 4.04 1.1-4.07h1.07l-1.65 5.14zm8.02-.93a2.6 2.6 0 0 1-2.17 1.07 2.4 2.4 0 0 1-2.4-1.63 2.4 2.4 0 0 1-.11-1.03 2.5 2.5 0 0 1 .66-1.95 2.5 2.5 0 0 1 1.89-.81c1.34 0 2.34.9 2.34 2.94h-3.9a1.45 1.45 0 0 0 .92 1.56q.3.12.64.1a1.7 1.7 0 0 0 1.48-.73zm-.79-2.2a1.4 1.4 0 0 0-.41-1 1.4 1.4 0 0 0-1-.4 1.45 1.45 0 0 0-1.45 1.4zm9.78 2.2a2.7 2.7 0 0 1-2.3 1.07 2.73 2.73 0 0 1 0-5.42 2.5 2.5 0 0 1 2.16 1.1l-.58.63a1.8 1.8 0 0 0-1.62-.87 1.6 1.6 0 0 0-1.63 1.1 2 2 0 0 0-.06.7 1.7 1.7 0 0 0 .43 1.34 1.7 1.7 0 0 0 1.3.56 1.8 1.8 0 0 0 1.61-.83zm4.44.93v-.58a2.3 2.3 0 0 1-1.65.72 1.8 1.8 0 0 1-1.32-.45 1.8 1.8 0 0 1-.58-1.27c0-1.04.86-1.63 2.1-1.63q.73-.07 1.45 0v-.34a1 1 0 0 0-.28-.76 1.5 1.5 0 0 0-.96-.31 2 2 0 0 0-1.55.69l-.62-.6a3 3 0 0 1 2.27-.92 2.3 2.3 0 0 1 1.59.51 1.8 1.8 0 0 1 .51 1.49v3.45zm0-2.24a6 6 0 0 0-1.38-.17c-.72 0-1.17.2-1.17.83a.93.93 0 0 0 1.07.93 2 2 0 0 0 1.48-.66zm2.48 2.24V43.7h.9v.86a1.3 1.3 0 0 1 1.2-.93 1 1 0 0 1 .96.48l-.48.83a1 1 0 0 0-.72-.34c-.52 0-.97.34-.97 1.59v2.66zm8.37-.93a2.6 2.6 0 0 1-2.17 1.07 2.4 2.4 0 0 1-2.4-1.63 2.4 2.4 0 0 1-.12-1.03 2.5 2.5 0 0 1 .66-1.95 2.5 2.5 0 0 1 1.89-.81c1.34 0 2.34.9 2.34 2.94h-3.89a1.5 1.5 0 0 0 .37 1.19 1.4 1.4 0 0 0 1.15.46 1.8 1.8 0 0 0 1.51-.72zm-.83-2.2a1.4 1.4 0 0 0-1.38-1.4 1.4 1.4 0 0 0-1.44 1.4z'/%3E%3Cdefs%3E%3ClinearGradient id='a' x1='48.82' x2='10.09' y1='56.41' y2='3.75' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.13' stop-color='%2335596A'/%3E%3Cstop offset='.71' stop-color='%2319A2AB'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' x1='43.66' x2='42.16' y1='19.83' y2='59.14' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%231B72B8'/%3E%3Cstop offset='.13' stop-color='%233683C0'/%3E%3Cstop offset='.19' stop-color='%2372A8D3'/%3E%3Cstop offset='.25' stop-color='%23A5C7E3'/%3E%3Cstop offset='.31' stop-color='%23CCDFEF'/%3E%3Cstop offset='.36' stop-color='%23E8F1F8'/%3E%3Cstop offset='.41' stop-color='%23F9FBFD'/%3E%3Cstop offset='.44' stop-color='%23fff'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E")}
</style>
```

**2. En-tête page 1** — à la place de `⟦EN-TÊTE PAGE 1⟧` :

```html
<header class="entete-p1 p1-blanc"><div class="logo logo-1" role="img" aria-label="Easy Syndic"></div></header>
```

**3. En-tête des pages suivantes** — à la place de `⟦EN-TÊTE DES PAGES SUIVANTES⟧` ; remplacer `[RAPPEL]` par le rappel défini dans le skill du document :

```html
<div class="haut-suite suite-blanc"><div class="logo logo-1"></div><div class="rappel">[RAPPEL]</div></div>
```

**4. Pied de page** — à la place de `⟦PIED DE PAGE⟧`. La ligne 2 donne le contact : la remplacer par le téléphone et l'e-mail du gestionnaire ou de son bureau s'ils sont connus. Ne rien changer d'autre :

```html
<div class="pied pied-bandeau"><div class="mentions">
<p>Easy Syndic SRL · Rue Vilain XIIII 53-55, 1000 Bruxelles · BE 0506.828.166</p>
<p>Tél. +32 2 219 04 51 · info@easysyndic.be · easysyndic.be</p>
<p>IPI : Guillaume Pinte 508167 · Luc Vander Meeren 200957 · Léandre Harmegnies 512354</p>
</div><div class="logo logo-2"></div></div>
```

**5. Bloc titre** — début de `⟦CONTENU⟧` ; remplacer `[SURTITRE]`, `[TITRE]`, `[COPROPRIÉTÉ]` et `[SOUS-LIGNE]` par les libellés du skill du document, sans changer les balises :

```html
<p class="surtitre">[SURTITRE]</p>
<h1 class="titre">[TITRE]</h1>
<div class="filet-accent"></div>
<p class="acp">[COPROPRIÉTÉ]</p>
<p class="acp-sous">[SOUS-LIGNE]</p>
```

**6. Entités et bureaux** — **Bureaux** (Bruxelles, Liège, Namur, Gand, Anvers, Hasselt, Mons, Marche-en-Famenne, Arlon, Luxembourg) : le site ne publie pas leurs coordonnées ; mettre en ligne 2 du pied de page le téléphone et l'e-mail du gestionnaire s'ils sont donnés, sinon garder ceux du siège.

**7. Attention** — Pas de numéro IPI de société : le pied reprend les trois agents IPI publiés sur le site.

## Gestea

- **Reconnaître** : Gestea.
- **Langue** : français · **organe** : conseil de copropriété · **copropriété** : « ACP <nom> ».
- **Charte** (site gestea.be, relevé du 05/11/2026) : logo rouge sur en-tête blanc, Arial, titre terminé par un point rouge, encadrés à barre rouge, pied noir avec logo blanc.

**1. Bloc marque** — dans `<head>`, à la place de `⟦BLOC MARQUE⟧`, tel quel :

```html
<style>
:root{--primaire:#111827;--secondaire:#C04332;--accent:#C04332;--texte:#111827;--texte-2:#545963;
--fond-clair:#EEEFF0;--filet:#CBCCCF;--entete-tableau:#1E1F1F;--texte-entete-tableau:#FFFFFF;--texte-pied:#FFFFFF;
--entete-fond:#111827;--pied-fond:#1E1F1F;
--police-titres:Arial, Helvetica, sans-serif;--police-texte:Arial, Helvetica, sans-serif;--police-accent:Arial, sans-serif;--police-surtitre:Arial, Helvetica, sans-serif;
--graisse-titre:700;--graisse-h2:700;--echelle-titres:1;--interligne:1.3;
--haut-h:17mm;--esp-haut:24mm;--pied-h:18mm;--esp-bas:calc(18mm + 6mm);--p1-h:17mm;--pastille-h:15.5mm;
--filet-accent-l:0;
--logo-p1-l:46mm;--logo-p1-h:12mm;--logo-suite-l:28mm;--logo-suite-h:7.3mm;--logo-pied-l:28mm;--logo-pied-h:7.3mm}
@page{size:A4;margin:0 0 7mm 0;@bottom-left-corner{background:#1E1F1F;content:""}@bottom-left{background:#1E1F1F;content:""}@bottom-center{background:#1E1F1F;content:""}@bottom-right-corner{background:#1E1F1F;content:""}@bottom-right{background:#1E1F1F;content:"Page " counter(page) " / " counter(pages);color:#FFFFFF;font:7.5pt Arial, Helvetica, sans-serif;text-align:right;vertical-align:top;padding-right:20mm}}
.logo-1{background-image:url("data:image/webp;base64,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")}
.logo-2{background-image:url("data:image/webp;base64,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")}
</style>
```

**2. En-tête page 1** — à la place de `⟦EN-TÊTE PAGE 1⟧` :

```html
<header class="entete-p1 p1-blanc"><div class="logo logo-1" role="img" aria-label="Gestea"></div></header>
```

**3. En-tête des pages suivantes** — à la place de `⟦EN-TÊTE DES PAGES SUIVANTES⟧` ; remplacer `[RAPPEL]` par le rappel défini dans le skill du document :

```html
<div class="haut-suite suite-blanc"><div class="logo logo-1"></div><div class="rappel">[RAPPEL]</div></div>
```

**4. Pied de page** — à la place de `⟦PIED DE PAGE⟧`. La ligne 2 donne le contact : la remplacer par le téléphone et l'e-mail du gestionnaire ou de son bureau s'ils sont connus. Ne rien changer d'autre :

```html
<div class="pied pied-bandeau"><div class="mentions">
<p>Gestea SRL · Rue Vilain XIIII 53-55, 1000 Bruxelles · BCE 0846.809.505 · IPI 508.167</p>
<p>Tél. 02 779 09 90 · syndic@gestea.be · gestea.be</p>
<p>Agent immobilier agréé IPI (Belgique) · Autorité de surveillance : IPI, rue du Luxembourg 16 B, 1000 Bruxelles</p>
</div><div class="logo logo-2"></div></div>
```

**5. Bloc titre** — début de `⟦CONTENU⟧` ; remplacer `[SURTITRE]`, `[TITRE]`, `[COPROPRIÉTÉ]` et `[SOUS-LIGNE]` par les libellés du skill du document, sans changer les balises :

```html
<p class="surtitre">[SURTITRE]</p>
<h1 class="titre">[TITRE]<span class="point">.</span></h1>
<p class="acp">[COPROPRIÉTÉ]</p>
<p class="acp-sous">[SOUS-LIGNE]</p>
```

**6. Entités et bureaux** — Un seul siège (Rue Vilain XIIII 53-55, 1000 Bruxelles).

**7. Attention** — Le site ne publie le logo qu'en 300 px : net à l'écran et en impression A4 à cette taille, ne pas l'agrandir.
