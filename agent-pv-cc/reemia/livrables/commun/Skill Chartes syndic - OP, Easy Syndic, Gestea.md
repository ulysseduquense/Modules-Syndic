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
.logo-1{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='62' height='79' fill='none'%3E%3Cg fill='%23A40C21' clip-path='url(%23a)'%3E%3Cpath d='M2.472 65.337v-52.17L14.568 2.48h32.826L59.49 13.167v52.17L46.557 76.52H15.52L2.587 65.337zM13.617 0 0 12.098v54.384L14.568 79H47.47L62 66.482V12.098L48.42 0z'/%3E%3Cpath d='M39.368 12.976c.456-1.603 0-3.244-1.788-4.007-1.787-.764-3.803.305-3.803.305-.38-.382-1.218-.84-1.218-.84.19-.305.19-.572.19-.84 0-1.144-.95-2.022-2.091-2.022s-2.092.84-2.092 2.023 0 .572.19.84c0 0-.951.572-1.255.839 0 0-2.016-1.069-3.804-.305-1.712.648-2.282 2.366-1.788 4.007.495 1.64 2.092 3.053 2.282 3.244-.456 0-.646.458-.646.954 0 .382.456.649.837.649h12.362c.38 0 .76-.306.836-.764.19-.648-.456-.84-.456-.84.19-.19 1.788-1.602 2.282-3.243M30.62 7.175s.38.19.38.382c0 .19-.19.381-.38.381s-.38-.19-.38-.381.19-.382.38-.382m-2.55 9.235h-.837c-.304 0-1.445-.764-2.548-2.023s-1.598-2.862-.57-3.626c1.026-.763 2.662 0 2.662 0-.114.115-.304 1.45.19 2.748.495 1.298 1.331 2.748 1.331 2.748h-.19v.114zm2.549 0h-1.065s-2.016-2.1-2.016-4.39 2.967-2.29 2.967-2.29 2.966 0 2.966 2.29-2.016 4.39-2.016 4.39H30.39zm6.086-1.909c-1.218 1.26-2.359 1.909-2.587 2.023h-.95s.836-1.45 1.33-2.748c.495-1.297.267-2.671.19-2.747 0 0 1.636-.84 2.663 0 1.065.84.685 2.366-.57 3.625'/%3E%3Cpath d='M27.006 22.326C24.458 20.8 21.415 20.8 20.35 20.8c-3.614 0-5.82 1.07-7.037 1.718-3.994 2.29-3.994 5.724-3.994 9.236v19.54c0 2.175 0 2.977.456 4.083 1.142 3.053 4.108 4.39 5.516 4.77 1.712.459 3.69.459 4.26.459 1.521 0 8.178 0 10.346-4.58.76-1.526.837-3.13.837-4.58v-18.7c0-4.389 0-6.488-1.522-8.396-.304-.458-1.065-1.336-2.282-2.1m-6.847 34.12c-2.206 0-2.472-2.023-2.472-4.084v-20.99c0-2.977 0-4.58 1.065-5.42.457-.381 1.065-.572 1.522-.572.836 0 1.597.381 2.015 1.145.457.954.457 2.48.457 4.885v19.769c0 2.29.19 5.343-2.549 5.343'/%3E%3Cpath d='M53.061 24.425c-.266-.458-1.065-1.336-2.282-2.099-2.586-1.527-5.591-1.527-6.656-1.527h-9.509v38.47h7.34V47.362h1.522c1.522 0 7.988 0 10.194-4.465.685-1.45 1.065-2.977 1.065-4.466v-5.724c0-4.275 0-6.297-1.521-8.206m-9.091 18.052H41.84v-17.48h2.358c1.331 0 1.902.65 2.168 1.146.57.954.57 2.366.57 4.77v6.374c0 2.29.19 5.267-2.966 5.267'/%3E%3Cpath d='m19.78 64.88-2.968 1.526h.305c.38 0 .646.267.76.687v6.946h1.902z'/%3E%3Cpath d='M27.006 68.696c.951-.267 1.712-.954 1.712-1.909 0-.954-1.331-2.175-2.853-2.175-1.598 0-2.853.954-2.853 2.48s.647 1.794 1.332 2.367c-.837.267-1.902.954-1.902 2.175 0 1.718 1.597 2.367 3.233 2.367 1.635 0 3.5-.955 3.5-2.672s-1.142-2.1-2.283-2.671m-.456-.268c-1.256-.687-1.712-1.22-1.712-2.022s.38-1.336 1.141-1.336c.76 0 1.141.687 1.255 1.526 0 .573-.19 1.336-.57 1.794m.837 3.778c0 .764-.647 1.45-1.598 1.45-1.065 0-1.598-.763-1.598-2.022 0-1.26.305-1.336.647-1.717.19.114.456.267.647.381 1.331.687 2.016 1.069 2.016 2.023'/%3E%3Cpath d='M36.135 68.887c-.456 1.144-1.445 4.007-1.788 5.266h-1.711l2.852-7.442h-3.233c-.76 0-.95.267-.95.267h-.115l.38-2.022h6.163l-1.522 3.816-.114.114z'/%3E%3Cpath d='m44.427 66.597.38-1.909h-.19s0 .268-.837.268h-3.423l-.76 4.274c1.635-.573 3.118-.19 3.118 1.526 0 2.672-2.092 2.596-3.613 2.023.837 1.908 6.086 2.1 6.086-2.099s-1.446-3.244-4.26-2.48l.19-1.642h3.347z'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='a'%3E%3Crect width='62' height='79' fill='%23fff'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E")}
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
.logo-1{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 241 59'%3E%3Cpath fill='url(%23a)' d='M28.472 57.135a28.4 28.4 0 0 1-15.818-4.815A28.55 28.55 0 0 1 2.167 39.5a28.66 28.66 0 0 1-1.62-16.506A28.6 28.6 0 0 1 8.34 8.367 28.44 28.44 0 0 1 22.918.55a28.4 28.4 0 0 1 16.45 1.626 28.5 28.5 0 0 1 12.778 10.521 28.64 28.64 0 0 1 4.799 15.871 28.65 28.65 0 0 1-8.35 20.19 28.46 28.46 0 0 1-20.123 8.378m0-39.138c-2.083 0-4.12.62-5.853 1.782a10.56 10.56 0 0 0-3.88 4.743c-.797 1.932-1.006 4.057-.6 6.108s1.41 3.933 2.884 5.412a10.5 10.5 0 0 0 11.481 2.291c1.925-.8 3.57-2.155 4.728-3.893a10.596 10.596 0 0 0-1.31-13.347 10.53 10.53 0 0 0-7.45-3.096'/%3E%3Cg style='mix-blend-mode:multiply'%3E%3Cmask id='b' width='39' height='50' x='19' y='8' maskUnits='userSpaceOnUse' style='mask-type:luminance'%3E%3Cpath fill='%23fff' d='M48.957 8.74a9.035 9.035 0 0 1-.661 12.41 8.97 8.97 0 0 1-6.202 2.461 8.97 8.97 0 0 1-6.185-2.505 10.6 10.6 0 0 1 2.982 5.4c.436 2.058.25 4.2-.533 6.15-.784 1.952-2.13 3.624-3.867 4.804s-3.784 1.811-5.88 1.816a8.96 8.96 0 0 0-6.711 2.429 9.02 9.02 0 0 0-2.832 6.57 9.04 9.04 0 0 0 2.832 6.569 8.98 8.98 0 0 0 6.71 2.429 28.4 28.4 0 0 0 15.748-4.683 28.54 28.54 0 0 0 10.55-12.631 28.66 28.66 0 0 0 1.84-16.376 28.6 28.6 0 0 0-7.48-14.67z'/%3E%3C/mask%3E%3Cg mask='url(%23b)'%3E%3Cpath fill='url(%23c)' d='M69.993 5.941h-53.64V59h53.64z'/%3E%3C/g%3E%3C/g%3E%3Cpath fill='%23211746' d='M65.414 33.853V9.878h15.321v4.733h-9.95v4.387h9.365v4.732h-9.365v5.389h10.57v4.733zm29.196 0-.345-2.073a5.24 5.24 0 0 1-2.034 1.9 5.2 5.2 0 0 1-2.717.587 4.98 4.98 0 0 1-3.934-1.327 5 5 0 0 1-1.574-3.854c0-3.87 3.064-5.01 6.197-5.01 1.426.02 2.846.194 4.235.519v-1.21c0-1.38-1.068-2.003-2.79-2.003a8.9 8.9 0 0 0-4.888 1.59l-1.997-2.591a10.75 10.75 0 0 1 7.368-2.488c3.753 0 7.161 1.451 7.161 5.493v10.363zm-.345-6.218a10.5 10.5 0 0 0-3.064-.553c-1.377 0-2.444.484-2.444 1.9s.757 2.107 2.341 2.107a3.43 3.43 0 0 0 3.167-1.658zm12.257-.277c-2.135-.829-4.097-2.107-4.097-4.732s2.41-4.733 6.438-4.733a7.83 7.83 0 0 1 6.197 2.246l-1.859 2.867a5.03 5.03 0 0 0-4.097-1.762c-1.618 0-1.928.587-1.928 1.105 0 .519.31.864 2.479 1.693l1.377.484a5.4 5.4 0 0 1 2.878 1.75 5.43 5.43 0 0 1 1.288 3.12c0 2.867-2.341 4.871-6.541 4.871a7.8 7.8 0 0 1-6.886-2.833l2.307-2.694a5.02 5.02 0 0 0 4.2 2.038c1.033 0 2.134-.276 2.134-1.105 0-.83-.998-1.21-2.513-1.762zm16.457 6.77-6.61-15.82h5.508l3.443 10.363 3.649-10.363h5.302l-6.885 16.408c-2.066 5.078-3.443 6.183-6.335 6.183a6.87 6.87 0 0 1-3.994-1.14l1.171-3.454a4.8 4.8 0 0 0 2.41.76 1.93 1.93 0 0 0 1.962-1.485zm22.206-6.493a6.6 6.6 0 0 0 5.509 2.21c2.031 0 3.03-.587 3.03-2.245 0-.725 0-1.9-3.443-3.454l-1.653-.76a7.86 7.86 0 0 1-3.887-2.754 7.9 7.9 0 0 1-1.587-4.5c0-4.87 3.856-6.702 7.815-6.702a11.96 11.96 0 0 1 7.884 2.833l-2.479 3.73a8.45 8.45 0 0 0-5.474-2.176c-1.893 0-2.547.864-2.547 2.038s.344 1.831 2.685 2.937l1.653.794c3.167 1.45 6.472 3.144 6.472 7.738s-3.993 7.22-8.538 7.22a11.53 11.53 0 0 1-8.366-3.11zm21.174 6.494-6.61-15.821h5.508l3.443 10.363 3.649-10.363h5.165l-6.645 16.408c-2.066 5.078-3.443 6.183-6.335 6.183a6.87 6.87 0 0 1-4.235-1.14l1.171-3.454a4.8 4.8 0 0 0 2.41.76 1.93 1.93 0 0 0 1.962-1.485zm22.723-.276v-9.12c0-1.347-.241-2.729-2.066-2.729s-2.617 1.382-2.617 3.454v8.395h-4.888V18.307h4.544l.344 2.073a5 5 0 0 1 1.897-1.863 5 5 0 0 1 2.579-.625 4.88 4.88 0 0 1 3.815 1.521 4.91 4.91 0 0 1 1.315 3.903v10.536zm19.796 0-.344-2.039a5.36 5.36 0 0 1-4.751 2.453c-3.925 0-6.714-3.178-6.714-8.049a7.53 7.53 0 0 1 1.745-5.706 7.47 7.47 0 0 1 5.347-2.619 4.8 4.8 0 0 1 2.487.507 4.83 4.83 0 0 1 1.886 1.704V9.741h4.923v24.112zm-.275-7.738c0-3.247-1.618-4.25-3.237-4.25s-3.442.795-3.442 4.215 1.652 4.214 3.442 4.214 3.237-.621 3.237-4.18m8.469-12.678a2.827 2.827 0 0 1 3.387-2.775 2.825 2.825 0 0 1 2.209 2.244 2.835 2.835 0 0 1-1.229 2.903 2.816 2.816 0 0 1-3.552-.38 2.84 2.84 0 0 1-.815-1.992m.344 20.415V18.309h4.924v15.545zM241 30.848a8.03 8.03 0 0 1-3.094 2.662 8 8 0 0 1-3.998.793 7.76 7.76 0 0 1-6.052-2.182 7.83 7.83 0 0 1-2.349-6.005 8.65 8.65 0 0 1 1.728-4.957 8.6 8.6 0 0 1 4.269-3.036 8.6 8.6 0 0 1 5.234.006A8.6 8.6 0 0 1 241 21.175l-2.376 2.66a5.57 5.57 0 0 0-4.51-1.97c-2.582 0-3.752 1.625-3.752 4.215 0 2.591 1.136 4.215 3.442 4.215a5.53 5.53 0 0 0 4.166-1.935z'/%3E%3Cpath fill='%2319A2AB' d='m66.688 48.844-2.169-5.147h1.102l1.55 4.042 1.686-4.042h1.067l-2.65 6.356c-.345.864-.724 1.21-1.378 1.21a2.1 2.1 0 0 1-.964-.242l.276-.795c.191.102.403.161.62.173.275 0 .413 0 .585-.587zm3.65-2.556a2.67 2.67 0 0 1 1.66-2.432 2.64 2.64 0 0 1 2.877.598 2.66 2.66 0 0 1 .56 2.894 2.645 2.645 0 0 1-2.446 1.634 2.54 2.54 0 0 1-1.92-.758 2.56 2.56 0 0 1-.731-1.936m4.269 0a1.7 1.7 0 0 0-.943-1.733 1.7 1.7 0 0 0-.675-.167 1.68 1.68 0 0 0-1.56 1.205 1.7 1.7 0 0 0-.059.695A1.66 1.66 0 0 0 72.315 48c.212.098.44.15.674.153a1.65 1.65 0 0 0 1.56-1.175c.067-.223.087-.458.058-.69m5.75 2.556v-.725a1.79 1.79 0 0 1-1.584.863c-1.033 0-1.722-.621-1.722-1.9v-3.454h.964v3.005c0 1.14.482 1.382.999 1.382a1.37 1.37 0 0 0 1.294-.98c.056-.186.072-.382.048-.574v-2.833h.999v5.147zm5.37 0v-8.152h.999v8.152zm2.445-6.908a.726.726 0 0 1 .723-.726.72.72 0 0 1 .723.726.726.726 0 0 1-.723.725.72.72 0 0 1-.723-.725m.206 6.908v-5.147h1.136v5.147zm4.132 0-2.17-5.147h1.068l1.55 4.042 1.583-4.042h1.067l-2.134 5.147zm8.366-.932a2.47 2.47 0 0 1-2.135 1.07 2.4 2.4 0 0 1-1.865-.751 2.42 2.42 0 0 1-.648-1.908 2.53 2.53 0 0 1 .657-1.955 2.5 2.5 0 0 1 1.89-.809c1.309 0 2.342.898 2.342 2.936h-3.89c0 1.037.516 1.658 1.514 1.658a1.79 1.79 0 0 0 1.515-.725zm-.792-2.211a1.38 1.38 0 0 0-.404-.977 1.38 1.38 0 0 0-.973-.405 1.41 1.41 0 0 0-1.326.842c-.075.17-.116.354-.12.54zm2.169 4.283-.379-.449.654-.69a.62.62 0 0 1-.31-.588.723.723 0 1 1 1.446 0c0 .45-.275.69-.791 1.174zm9.778-1.14-1.171-3.938-1.136 3.973h-1.067l-1.653-5.147h1.102l1.136 4.041 1.102-4.041h1.067l1.102 4.041 1.101-4.076h1.068l-1.653 5.147zm8.021-.932a2.58 2.58 0 0 1-2.169 1.07 2.404 2.404 0 0 1-2.396-1.634 2.4 2.4 0 0 1-.117-1.025 2.53 2.53 0 0 1 .657-1.955 2.5 2.5 0 0 1 1.891-.809c1.343 0 2.341.898 2.341 2.936h-3.89a1.454 1.454 0 0 0 .91 1.566c.204.079.422.11.639.092a1.68 1.68 0 0 0 1.48-.725zm-.791-2.211a1.4 1.4 0 0 0-.416-.99 1.37 1.37 0 0 0-.996-.392 1.446 1.446 0 0 0-1.446 1.382zm9.777 2.21a2.68 2.68 0 0 1-2.306 1.071 2.731 2.731 0 0 1 0-5.423 2.48 2.48 0 0 1 2.169 1.106l-.586.621a1.83 1.83 0 0 0-1.618-.863 1.58 1.58 0 0 0-1.625 1.098 1.6 1.6 0 0 0-.062.698 1.7 1.7 0 0 0 .426 1.347 1.7 1.7 0 0 0 1.296.553 1.75 1.75 0 0 0 1.618-.83zm4.442.933v-.587a2.3 2.3 0 0 1-1.653.725 1.75 1.75 0 0 1-1.738-1.03 1.8 1.8 0 0 1-.156-.697c0-1.036.861-1.623 2.101-1.623.48-.051.965-.051 1.446 0v-.346a1.02 1.02 0 0 0-.276-.76 1.48 1.48 0 0 0-.964-.31 1.92 1.92 0 0 0-1.549.69l-.62-.587a2.86 2.86 0 0 1 2.272-.933 2.34 2.34 0 0 1 1.584.519 1.77 1.77 0 0 1 .517 1.485v3.454zm0-2.245a6 6 0 0 0-1.378-.173c-.723 0-1.17.207-1.17.83a.93.93 0 0 0 .669.905.9.9 0 0 0 .398.027 2.13 2.13 0 0 0 1.481-.656zm2.478 2.245v-5.147h.896v.864a1.28 1.28 0 0 1 1.205-.933 1.03 1.03 0 0 1 .964.484l-.482.829a.94.94 0 0 0-.723-.346c-.517 0-.964.346-.964 1.59v2.66zm8.367-.932a2.59 2.59 0 0 1-2.169 1.07 2.406 2.406 0 0 1-2.397-1.634 2.4 2.4 0 0 1-.117-1.025 2.53 2.53 0 0 1 .657-1.955 2.5 2.5 0 0 1 1.891-.809c1.343 0 2.341.898 2.341 2.936h-3.89a1.46 1.46 0 0 0 .365 1.19 1.45 1.45 0 0 0 1.15.468 1.79 1.79 0 0 0 1.514-.725zm-.827-2.211a1.376 1.376 0 0 0-1.377-1.382 1.41 1.41 0 0 0-1.325.842c-.075.17-.116.354-.121.54z'/%3E%3Cdefs%3E%3ClinearGradient id='a' x1='48.82' x2='10.093' y1='56.409' y2='3.75' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.13' stop-color='%2335596A'/%3E%3Cstop offset='.71' stop-color='%2319A2AB'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' x1='43.656' x2='42.165' y1='19.828' y2='59.138' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%231B72B8'/%3E%3Cstop offset='.13' stop-color='%233683C0'/%3E%3Cstop offset='.19' stop-color='%2372A8D3'/%3E%3Cstop offset='.25' stop-color='%23A5C7E3'/%3E%3Cstop offset='.31' stop-color='%23CCDFEF'/%3E%3Cstop offset='.36' stop-color='%23E8F1F8'/%3E%3Cstop offset='.41' stop-color='%23F9FBFD'/%3E%3Cstop offset='.44' stop-color='%23fff'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E")}
.logo-2{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 241 58'%3E%3Cpath fill='url(%23a)' d='M28.472 57.135a28.4 28.4 0 0 1-15.818-4.815A28.55 28.55 0 0 1 2.167 39.5a28.66 28.66 0 0 1-1.62-16.506A28.6 28.6 0 0 1 8.34 8.367 28.44 28.44 0 0 1 22.918.55a28.4 28.4 0 0 1 16.45 1.626 28.5 28.5 0 0 1 12.778 10.521 28.64 28.64 0 0 1 4.799 15.871 28.65 28.65 0 0 1-8.35 20.19 28.46 28.46 0 0 1-20.123 8.378m0-39.138c-2.083 0-4.12.62-5.853 1.782a10.56 10.56 0 0 0-3.88 4.743c-.797 1.932-1.006 4.057-.6 6.108s1.41 3.933 2.884 5.412a10.5 10.5 0 0 0 11.481 2.291c1.925-.8 3.57-2.155 4.728-3.893a10.596 10.596 0 0 0-1.31-13.347 10.53 10.53 0 0 0-7.45-3.096'/%3E%3Cg style='mix-blend-mode:multiply'%3E%3Cmask id='b' width='39' height='50' x='19' y='8' maskUnits='userSpaceOnUse' style='mask-type:luminance'%3E%3Cpath fill='%23fff' d='M48.957 8.74a9.035 9.035 0 0 1-.661 12.41 8.97 8.97 0 0 1-6.202 2.461 8.97 8.97 0 0 1-6.185-2.505 10.6 10.6 0 0 1 2.449 11.55 10.56 10.56 0 0 1-3.867 4.803 10.5 10.5 0 0 1-5.88 1.817 8.96 8.96 0 0 0-6.711 2.429 9.02 9.02 0 0 0-2.832 6.57 9.04 9.04 0 0 0 2.832 6.568 8.98 8.98 0 0 0 6.71 2.43 28.4 28.4 0 0 0 15.748-4.683 28.54 28.54 0 0 0 10.55-12.631 28.66 28.66 0 0 0 1.84-16.376 28.6 28.6 0 0 0-7.48-14.671z'/%3E%3C/mask%3E%3Cg mask='url(%23b)'%3E%3Cpath fill='url(%23c)' d='M69.993 5.941h-53.64V59h53.64z'/%3E%3C/g%3E%3C/g%3E%3Cpath fill='%23fff' d='M65.414 33.853V9.878h15.321v4.733h-9.95v4.387h9.365v4.732h-9.365v5.389h10.57v4.733zm29.196 0-.345-2.073a5.24 5.24 0 0 1-2.034 1.9 5.2 5.2 0 0 1-2.717.587 4.97 4.97 0 0 1-3.934-1.327 5 5 0 0 1-1.574-3.854c0-3.87 3.064-5.01 6.197-5.01 1.426.02 2.846.194 4.235.519v-1.21c0-1.38-1.068-2.003-2.79-2.003a8.9 8.9 0 0 0-4.888 1.59l-1.997-2.591a10.75 10.75 0 0 1 7.368-2.487c3.753 0 7.161 1.45 7.161 5.492v10.363zm-.345-6.218a10.5 10.5 0 0 0-3.064-.553c-1.377 0-2.444.484-2.444 1.9s.757 2.107 2.341 2.107a3.43 3.43 0 0 0 3.167-1.658zm12.257-.277c-2.135-.829-4.097-2.107-4.097-4.732s2.41-4.733 6.438-4.733a7.83 7.83 0 0 1 6.197 2.246l-1.859 2.867a5.01 5.01 0 0 0-4.097-1.762c-1.618 0-1.928.587-1.928 1.105 0 .519.31.864 2.479 1.693l1.377.484a5.4 5.4 0 0 1 2.878 1.75 5.43 5.43 0 0 1 1.288 3.12c0 2.867-2.341 4.87-6.541 4.87a7.8 7.8 0 0 1-6.886-2.832l2.307-2.694a5.02 5.02 0 0 0 4.2 2.038c1.033 0 2.134-.276 2.134-1.105 0-.83-.998-1.21-2.513-1.762zm16.457 6.77-6.61-15.82h5.508l3.443 10.363 3.649-10.363h5.302l-6.885 16.408c-2.066 5.078-3.443 6.183-6.335 6.183a6.87 6.87 0 0 1-3.994-1.14l1.171-3.454a4.8 4.8 0 0 0 2.41.76 1.93 1.93 0 0 0 1.962-1.485zm22.206-6.493a6.6 6.6 0 0 0 5.509 2.21c2.031 0 3.03-.587 3.03-2.245 0-.725 0-1.9-3.443-3.454l-1.653-.76a7.86 7.86 0 0 1-3.887-2.754 7.9 7.9 0 0 1-1.587-4.5c0-4.871 3.856-6.702 7.815-6.702a11.96 11.96 0 0 1 7.884 2.833l-2.478 3.73a8.46 8.46 0 0 0-5.475-2.176c-1.893 0-2.547.864-2.547 2.038s.344 1.831 2.685 2.937l1.653.794c3.167 1.45 6.472 3.143 6.472 7.738 0 4.594-3.993 7.22-8.538 7.22a11.53 11.53 0 0 1-8.366-3.11zm21.174 6.494-6.61-15.82h5.508L168.7 28.67l3.649-10.363h5.165l-6.645 16.408c-2.066 5.078-3.443 6.183-6.335 6.183a6.87 6.87 0 0 1-4.235-1.14l1.171-3.454a4.8 4.8 0 0 0 2.41.76 1.924 1.924 0 0 0 1.962-1.485zm22.723-.276v-9.12c0-1.347-.241-2.729-2.066-2.729s-2.617 1.382-2.617 3.455v8.394h-4.888V18.308h4.544l.344 2.073a5 5 0 0 1 1.897-1.863 5 5 0 0 1 2.579-.624 4.88 4.88 0 0 1 3.815 1.52 4.91 4.91 0 0 1 1.315 3.903v10.536zm19.796 0-.344-2.039a5.36 5.36 0 0 1-4.751 2.453c-3.925 0-6.714-3.178-6.714-8.049a7.53 7.53 0 0 1 1.745-5.706 7.47 7.47 0 0 1 5.347-2.619 4.8 4.8 0 0 1 2.487.507 4.83 4.83 0 0 1 1.886 1.704V9.741h4.923v24.112zm-.275-7.738c0-3.247-1.618-4.25-3.237-4.25s-3.442.795-3.442 4.215 1.652 4.214 3.442 4.214 3.237-.621 3.237-4.18m8.469-12.678a2.83 2.83 0 0 1 1.751-2.62 2.815 2.815 0 0 1 3.081.63 2.838 2.838 0 0 1-.465 4.362 2.82 2.82 0 0 1-3.552-.38 2.84 2.84 0 0 1-.815-1.992m.344 20.415V18.308h4.924v15.544zM241 30.847a8 8 0 0 1-3.094 2.662 8 8 0 0 1-3.998.793 7.76 7.76 0 0 1-6.052-2.182 7.83 7.83 0 0 1-2.349-6.005 8.65 8.65 0 0 1 1.728-4.957 8.6 8.6 0 0 1 4.269-3.036 8.6 8.6 0 0 1 5.234.006A8.6 8.6 0 0 1 241 21.175l-2.376 2.66a5.57 5.57 0 0 0-4.51-1.97c-2.582 0-3.752 1.624-3.752 4.215s1.136 4.214 3.442 4.214a5.53 5.53 0 0 0 4.166-1.934z'/%3E%3Cpath fill='%2319A2AB' d='m66.688 48.844-2.169-5.147h1.102l1.55 4.042 1.686-4.042h1.067l-2.65 6.356c-.345.864-.724 1.21-1.378 1.21a2.1 2.1 0 0 1-.964-.243l.276-.794c.191.102.403.161.62.173.275 0 .413 0 .585-.588zm3.65-2.556a2.67 2.67 0 0 1 1.66-2.433 2.64 2.64 0 0 1 2.877.599 2.663 2.663 0 0 1-1.886 4.528 2.54 2.54 0 0 1-1.92-.758 2.56 2.56 0 0 1-.731-1.936m4.269 0a1.7 1.7 0 0 0-.943-1.734 1.7 1.7 0 0 0-.675-.166 1.68 1.68 0 0 0-1.56 1.205 1.7 1.7 0 0 0-.059.695A1.66 1.66 0 0 0 72.315 48c.211.098.44.15.674.153a1.65 1.65 0 0 0 1.56-1.175c.067-.223.087-.458.058-.69m5.75 2.557v-.726a1.79 1.79 0 0 1-1.584.864c-1.033 0-1.722-.622-1.722-1.9v-3.455h.964v3.006c0 1.14.482 1.381.999 1.381a1.37 1.37 0 0 0 1.294-.98c.056-.186.072-.382.048-.574v-2.833h.999v5.147zm5.37 0v-8.153h.999v8.152zm2.445-6.91a.727.727 0 0 1 .723-.725.72.72 0 0 1 .723.725.726.726 0 0 1-.723.726.72.72 0 0 1-.723-.726m.206 6.909v-5.147h1.136v5.147zm4.132 0-2.17-5.147h1.068l1.55 4.042 1.583-4.042h1.067l-2.134 5.147zm8.366-.933a2.47 2.47 0 0 1-2.135 1.07 2.4 2.4 0 0 1-1.864-.75 2.42 2.42 0 0 1-.65-1.909 2.53 2.53 0 0 1 1.517-2.561c.326-.14.677-.209 1.032-.202 1.308 0 2.341.898 2.341 2.936h-3.89c0 1.036.516 1.658 1.514 1.658a1.79 1.79 0 0 0 1.515-.725zm-.792-2.21a1.384 1.384 0 0 0-1.377-1.382 1.41 1.41 0 0 0-1.326.842 1.4 1.4 0 0 0-.12.54zm2.169 4.283-.379-.449.654-.69a.62.62 0 0 1-.31-.588.723.723 0 1 1 1.446 0c0 .45-.275.691-.791 1.175zm9.778-1.14-1.171-3.938-1.136 3.973h-1.067l-1.653-5.147h1.102l1.136 4.041 1.102-4.041h1.067l1.102 4.041 1.101-4.076h1.068l-1.653 5.147zm8.021-.932a2.58 2.58 0 0 1-2.169 1.07 2.404 2.404 0 0 1-2.396-1.634 2.4 2.4 0 0 1-.117-1.025 2.53 2.53 0 0 1 .657-1.955 2.5 2.5 0 0 1 1.891-.809c1.343 0 2.341.898 2.341 2.936h-3.89a1.45 1.45 0 0 0 .91 1.566c.204.079.422.11.639.092a1.68 1.68 0 0 0 1.48-.725zm-.791-2.211a1.4 1.4 0 0 0-.416-.99 1.37 1.37 0 0 0-.996-.392 1.446 1.446 0 0 0-1.446 1.382zm9.777 2.21a2.68 2.68 0 0 1-2.306 1.071 2.731 2.731 0 0 1 0-5.423 2.48 2.48 0 0 1 2.169 1.105l-.586.622a1.83 1.83 0 0 0-1.618-.863 1.58 1.58 0 0 0-1.625 1.098 1.6 1.6 0 0 0-.062.698 1.7 1.7 0 0 0 .426 1.346 1.7 1.7 0 0 0 1.296.554 1.75 1.75 0 0 0 1.618-.83zm4.442.933v-.587a2.3 2.3 0 0 1-1.653.725 1.75 1.75 0 0 1-1.319-.452 1.77 1.77 0 0 1-.575-1.275c0-1.036.861-1.623 2.101-1.623.48-.051.965-.051 1.446 0v-.346a1.02 1.02 0 0 0-.276-.76 1.48 1.48 0 0 0-.964-.31 1.92 1.92 0 0 0-1.549.69l-.62-.587a2.86 2.86 0 0 1 2.272-.933 2.34 2.34 0 0 1 1.584.518 1.77 1.77 0 0 1 .517 1.486v3.454zm0-2.245a6 6 0 0 0-1.378-.173c-.723 0-1.17.207-1.17.83a.928.928 0 0 0 1.067.932 2.13 2.13 0 0 0 1.481-.656zm2.478 2.245v-5.147h.896v.864a1.28 1.28 0 0 1 1.205-.933 1.03 1.03 0 0 1 .964.484l-.482.829a.94.94 0 0 0-.723-.345c-.517 0-.964.345-.964 1.589v2.66zm8.367-.932a2.59 2.59 0 0 1-2.169 1.07 2.406 2.406 0 0 1-2.397-1.634 2.4 2.4 0 0 1-.117-1.025 2.53 2.53 0 0 1 .657-1.955 2.52 2.52 0 0 1 1.891-.809c1.343 0 2.341.898 2.341 2.936h-3.89a1.46 1.46 0 0 0 .365 1.19 1.44 1.44 0 0 0 1.15.468 1.78 1.78 0 0 0 1.514-.725zm-.827-2.211a1.375 1.375 0 0 0-1.377-1.382 1.41 1.41 0 0 0-1.446 1.382z'/%3E%3Cdefs%3E%3ClinearGradient id='a' x1='48.82' x2='10.093' y1='56.409' y2='3.75' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.13' stop-color='%2335596A'/%3E%3Cstop offset='.71' stop-color='%2319A2AB'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' x1='43.655' x2='42.165' y1='19.828' y2='59.138' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%231B72B8'/%3E%3Cstop offset='.13' stop-color='%233683C0'/%3E%3Cstop offset='.19' stop-color='%2372A8D3'/%3E%3Cstop offset='.25' stop-color='%23A5C7E3'/%3E%3Cstop offset='.31' stop-color='%23CCDFEF'/%3E%3Cstop offset='.36' stop-color='%23E8F1F8'/%3E%3Cstop offset='.41' stop-color='%23F9FBFD'/%3E%3Cstop offset='.44' stop-color='%23fff'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E")}
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
