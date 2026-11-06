---
name: charte-syndic-syncura-noblue-dr
description: Charte graphique des documents HTML A4 imprimables des syndics Syncura, Noblué, DR Syndic (Syncura, Syncura Services, VM Vastgoedbeheer ; Noblué, Noblue, Noblué Immobilier, Noblué Syndic ; DR Syndic, DR. Syndic, D.R. Syndic, drsyndic). Pour chaque marque, le bloc de style (couleurs, polices, logos officiels intégrés), l'en-tête de la page 1, l'en-tête des pages suivantes, le pied de page avec les mentions légales exactes et le bloc titre. Commun à tous les agents qui produisent un document à la charte d'un syndic Emeria (PV de conseil de copropriété, plan d'actions post-AG…) ; s'utilise avec le skill du document, qui donne le squelette HTML, le CSS commun et les libellés.
---

# Chartes syndic — Syncura, Noblué, DR Syndic

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

## Syncura — PV en néerlandais

- **Reconnaître** : Syncura, Syncura Services, VM Vastgoedbeheer.
- **Langue** : **néerlandais**, même si les notes sont en français (`lang="nl"`) · **organe** : raad van mede-eigendom · **copropriété** : « VME <naam> ».
- **Charte** (site syncura.be, relevé du 05/11/2026) : bandeau en dégradé bleu nuit → prune avec pastille blanche et logo couleur (comme le header du site), Hanken Grotesk, accents rose, pied bleu nuit.

**1. Bloc marque** — dans `<head>`, à la place de `⟦BLOC MARQUE⟧`, tel quel :

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;700;800&display=swap">
<style>
:root{--primaire:#211747;--secondaire:#CF4861;--accent:#CF4861;--texte:#211747;--texte-2:#5F587B;
--fond-clair:#F6F5F7;--filet:#EBE6FF;--entete-tableau:#211747;--texte-entete-tableau:#FFFFFF;--texte-pied:#FFFFFF;
--entete-fond:linear-gradient(116.56deg, #211747 62.72%, #985192 117.11%);--pied-fond:#211747;
--police-titres:'Hanken Grotesk', Arial, sans-serif;--police-texte:'Hanken Grotesk', Arial, sans-serif;--police-accent:'Hanken Grotesk', Arial, sans-serif;--police-surtitre:'Hanken Grotesk', Arial, sans-serif;
--graisse-titre:800;--graisse-h2:800;--echelle-titres:1;--interligne:1.3;
--haut-h:17mm;--esp-haut:24mm;--pied-h:21mm;--esp-bas:calc(21mm + 6mm);--p1-h:30mm;--pastille-h:15.5mm;
--filet-accent-l:0;
--logo-p1-l:32mm;--logo-p1-h:9.6mm;--logo-suite-l:16mm;--logo-suite-h:4.8mm;--logo-pied-l:24mm;--logo-pied-h:7.4mm}
@page{size:A4;margin:0 0 7mm 0;@bottom-left-corner{background:#211747;content:""}@bottom-left{background:#211747;content:""}@bottom-center{background:#211747;content:""}@bottom-right-corner{background:#211747;content:""}@bottom-right{background:#211747;content:"Pagina " counter(page) " / " counter(pages);color:#FFFFFF;font:7.5pt "Hanken Grotesk", Arial, sans-serif;text-align:right;vertical-align:top;padding-right:20mm}}
.logo-1{background-image:url("data:image/webp;base64,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")}
.logo-2{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='184' height='57' fill='none'%3E%3Cg fill='%23fff' clip-path='url(%23a)'%3E%3Cpath d='M67.5 27.7S69 30 73 30q3 .2 3-2.2c0-.7 0-1.9-3.6-3.5l-1.6-.7c-2.4-1.1-5.5-2.9-5.5-7.3 0-4.8 3.8-6.6 7.8-6.6 5 0 8 2.8 8 2.8L78.5 16s-2.2-2-5.3-2q-2.7.2-2.5 2c0 .9.3 1.9 2.7 3l1.6.8c3.2 1.4 6.5 3.1 6.5 7.7 0 5-4 7-8.5 7-5.6 0-8.4-3-8.4-3z'/%3E%3Cpath d='M88.8 34.2 82 18.4h5.6L91 28.7l3.7-10.3h5.2l-6.7 16.4c-2 5-3.5 6.1-6.3 6.1s-4.3-1.1-4.3-1.1l1.2-3.6s1 .8 2.4.8q1.5 0 2-1.5z'/%3E%3Cpath d='M111.6 33.9v-9c0-1.5-.3-2.8-2.1-2.8q-2.7 0-2.6 3.6v8.2h-5V18.4h4.6l.4 2a5 5 0 0 1 4.5-2.4c3 0 5.1 2 5.1 5.4v10.5z'/%3E%3Cpath d='M135.1 30.9s-2 3.4-7.1 3.4-8.4-3.4-8.4-8.1 2.9-8.2 8.3-8.2c5.2 0 7 3.3 7 3.3l-2.3 2.6s-1.5-2-4.3-2c-2.6 0-3.8 1.7-3.8 4.2s1.2 4.3 3.6 4.3c2.8 0 4.2-2 4.2-2z'/%3E%3Cpath d='m147.5 33.9-.3-2.1a5 5 0 0 1-4.5 2.5c-3 0-5-2-5-5.5V18.4h5v9c0 1.3.1 2.6 2 2.6s2.5-1.3 2.5-3.6v-8h5v15.5z'/%3E%3Cpath d='M156 33.9V18.4h4.7l.3 2.2a4 4 0 0 1 4-2.6q2.2 0 3.2 1.8L166 23s-1-.8-2.3-.8q-2.4 0-2.6 3.7v8z'/%3E%3Cpath d='m179.5 33.9-.4-2s-1.1 2.4-4.9 2.4c-3 0-5.5-1.7-5.5-5.1 0-4 3-5 6.2-5 2.1 0 4.2.5 4.2.5v-1.3q0-2-2.8-2c-2.8 0-4.9 1.6-4.9 1.6l-2-2.6s2.5-2.4 7.4-2.4c3.8 0 7.2 1.4 7.2 5.4V34zm-.4-6.1s-1.5-.6-3-.6q-2.3-.1-2.5 2 0 1.6 2.3 1.8c1.9 0 2.8-1 3.2-1.6z'/%3E%3Cpath d='M72 48.4v-3q0-1.5-.9-1.4c-.5 0-1.2.4-1.2 1.6v2.8h-1v-3q-.1-1.5-1-1.4c-.5 0-1.2.4-1.2 1.6v2.8h-1v-5.2h.8l.2.7s.4-.8 1.5-.8a1.4 1.4 0 0 1 1.4 1s.5-1 1.8-1q1.5 0 1.6 2v3.3z'/%3E%3Cpath d='m78 48.4-.1-.6s-.6.7-1.7.7-1.9-.7-1.9-1.7q.2-1.5 2.1-1.6l1.5.2V45l-.3-.8q-.3-.3-1-.3c-1 0-1.5.7-1.5.7l-.6-.6s.6-.9 2.2-.9q.7-.1 1.6.5.6.5.5 1.5v3.3zm-.1-2.2-1.4-.2q-1.1 0-1.2.8.1 1.1 1 1 1.1-.1 1.6-.7z'/%3E%3Cpath d='M83.9 48.4v-3c0-1.2-.5-1.4-1-1.4s-1.4.4-1.4 1.6v2.8h-1v-5.2h.8l.2.8s.5-1 1.5-1q1.6 0 1.8 2v3.3z'/%3E%3Cpath d='m89.8 48.4-.1-.6s-.6.7-1.7.7c-1 0-1.9-.7-1.9-1.7q.2-1.5 2.1-1.6l1.5.2V45l-.3-.8q-.3-.3-1-.3c-1 0-1.5.7-1.5.7l-.6-.6s.6-.9 2.2-.9q.9-.1 1.6.5.6.5.6 1.5v3.3zm-.1-2.2-1.4-.2q-1.1 0-1.2.8.1 1.1 1.1 1t1.5-.7z'/%3E%3Cpath d='M96 47.7s-.5.7-1.6.7c-1.5 0-2.4-1.2-2.4-2.6s.9-2.7 2.4-2.7c1.2 0 1.6.7 1.6.7l.2-.6h.8v5.2q-.2 2.4-2.5 2.4c-1.3 0-2-.7-2-.7l.4-.8s.7.6 1.7.6c.6 0 1.4-.2 1.4-1.7zm0-2q0-1.6-1.4-1.8c-1.4-.2-1.6.8-1.6 1.9s.5 1.8 1.6 1.8 1.5-.8 1.5-1.8'/%3E%3Cpath d='M103.1 47.5s-.7 1-2.2 1q-2.3 0-2.5-2.6c0-1.8 1.2-2.8 2.6-2.8s2.3.9 2.3 3h-3.9q0 1.6 1.5 1.6c1.1 0 1.5-.7 1.5-.7zm-.8-2.2q-.2-1.4-1.4-1.4c-1.2 0-1.3.5-1.5 1.4z'/%3E%3Cpath d='M108.5 48.4v-.7s-.5.8-1.8.8c-1.5 0-2.4-1.3-2.4-2.7s1-2.7 2.5-2.7c1.2 0 1.6.8 1.6.8v-3.7h1v8.2zm0-2.6q0-1.7-1.6-1.9c-1.6-.2-1.6.9-1.6 2s.5 1.8 1.6 1.8 1.5-.9 1.5-1.9'/%3E%3Cpath d='m118.3 48.4-1.2-4-1.1 4h-1l-1.7-5.2h1l1.2 4 1.1-4h1l1.2 4 1.1-4h1.1l-1.6 5.2z'/%3E%3Cpath d='M121.8 41.5q0-.6.7-.7 1 0 .8.7t-.8.7a1 1 0 0 1-.7-.7m.2 6.9v-5.2h1v5.2z'/%3E%3Cpath d='M127.4 48.2s-.4.3-1.1.3q-.9 0-1-.4-.3-.5-.3-1.2v-2.8h-.8v-.9h.8v-1.6h1v1.6h1.3v.9H126v2.6q-.1 1.1.4 1l.7-.2z'/%3E%3Cpath d='M132 48.4v-3q-.2-1.5-1-1.4c-.7 0-1.5.4-1.5 1.6v2.8h-1v-8.2h1V44s.5-.9 1.6-.9q1.7 0 1.8 2v3.3z'/%3E%3Cpath d='M142 47.4s-.6 1.1-2.3 1.1c-1.8 0-2.6-1.3-2.6-2.7 0-1.9 1.3-2.7 2.7-2.7s2.2 1 2.2 1l-.6.7s-.4-.8-1.6-.8q-1.6 0-1.7 1.8 0 1.6 1.7 1.8c1.2 0 1.6-.8 1.6-.8z'/%3E%3Cpath d='m146.5 48.4-.1-.6s-.6.7-1.7.7-1.9-.7-1.9-1.7q.1-1.5 2.2-1.6l1.4.2V45q0-.5-.3-.8t-1-.3c-1 0-1.5.7-1.5.7l-.6-.6s.7-.9 2.2-.9q.9-.1 1.6.5.6.5.6 1.5v3.3zm-.1-2.2L145 46q-1.1 0-1.2.8.1 1.1 1.1 1t1.5-.7z'/%3E%3Cpath d='M149 48.4v-5.2h.9v.9s.3-1 1.3-1c.7 0 1 .6 1 .6l-.5.8s-.3-.4-.8-.4-1 .4-1 1.6v2.7z'/%3E%3Cpath d='M157.4 47.5s-.7 1-2.2 1q-2.3 0-2.5-2.6c0-1.8 1.2-2.8 2.5-2.8s2.4.9 2.4 3h-4q0 1.6 1.6 1.6c1 0 1.5-.7 1.5-.7zm-.8-2.2q-.2-1.4-1.4-1.4-1.3 0-1.5 1.4z'/%3E%3Cpath d='M57.1 27.2v-1.5l-.1-.3-.1-1V24l-.3-1.2v-.3l-.3-1v-.3l-.5-1.4-.3-1.1-.2-.3-.3-.8-.1-.4-.5-1-.2-.4-.4-.7-.1-.4a11 11 0 0 1-3.3 7.8 11 11 0 0 1-8 3.3 11 11 0 0 1-3.8-.6q.5 1.4.5 3.2a10.6 10.6 0 0 1-21 0 10.6 10.6 0 0 1 18-7.4 9 9 0 0 0 6.3 2.6 9 9 0 0 0 6.4-2.6A9 9 0 0 0 49 8.7a29 29 0 0 0-4-3.6l-1.2-.7-1.2-.8-1.2-.6h-.1L40 2.3h-.2l-1.1-.5h-.2l-1.1-.5h-.3l-1-.4h-.4l-1-.3-.4-.1-1-.2H33l-1-.2h-.5l-1-.1H30a29 29 0 0 0-10 1.2A29 29 0 0 0 3.4 14.9 29 29 0 0 0 0 28.5a28 28 0 0 0 4.9 16A29 29 0 0 0 20 55.6l2.7.7q1.4.3 2.9.4 1.4.2 2.9.2a29 29 0 0 0 9.8-1.7l2.6-1.1 2.4-1.3 3.4-2.4a28 28 0 0 0 10.4-22z'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='a'%3E%3Crect width='184' height='57' fill='%23fff'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E")}
</style>
```

**2. En-tête page 1** — à la place de `⟦EN-TÊTE PAGE 1⟧` :

```html
<header class="entete-p1 p1-bandeau"><div class="pastille"><div class="logo logo-1" role="img" aria-label="Syncura"></div></div></header>
```

**3. En-tête des pages suivantes** — à la place de `⟦EN-TÊTE DES PAGES SUIVANTES⟧` ; remplacer `[RAPPEL]` par le rappel défini dans le skill du document :

```html
<div class="haut-suite suite-bandeau"><div class="logo logo-2"></div><div class="rappel">[RAPPEL]</div></div>
```

**4. Pied de page** — à la place de `⟦PIED DE PAGE⟧`. La ligne 2 donne le contact : la remplacer par le téléphone et l'e-mail du gestionnaire ou de son bureau s'ils sont connus. Ne rien changer d'autre :

```html
<div class="pied pied-bandeau"><div class="mentions">
<p>Syncura (VM Vastgoedbeheer BV) · Poortakkerstraat 91/501, 9051 Gent · RPR Gent 0437.396.556</p>
<p>Tel. +32 9 280 80 34 · gent@syncura.be · syncura.be</p>
<p>Guillaume Pinte (BIV 508167) · BA en borgstelling: NV AXA Belgium, polisnr. 730.390.160</p>
<p>In geval van nood: +32 9 280 80 30</p>
</div><div class="logo logo-2"></div></div>
```

**5. Bloc titre** — début de `⟦CONTENU⟧` ; remplacer `[SURTITRE]`, `[TITRE]`, `[COPROPRIÉTÉ]` et `[SOUS-LIGNE]` par les libellés du skill du document, sans changer les balises :

```html
<p class="surtitre">[SURTITRE]</p>
<h1 class="titre">[TITRE]</h1>
<p class="acp">[COPROPRIÉTÉ]</p>
<p class="acp-sous">[SOUS-LIGNE]</p>
```

**6. Entités et bureaux** — **Kantoren** : 12 bureaux en Flandre et à Bruxelles (Antwerpen, Beveren, Brussel, Erpe-Mere, Gent, Hasselt, Knokke-Heist, Kortrijk, Leuven, Mechelen-Vilvoorde, Oostende, Oudenaarde). Tous publient le +32 9 280 80 34 et une adresse <ville>@syncura.be (ex. antwerpen@syncura.be) : en ligne 2 du pied, mettre l'e-mail du bureau du gestionnaire s'il est connu.

**7. Attention** — Document entièrement en néerlandais, avec les libellés néerlandais du skill du document ; dates « donderdag 5 november 2026 », heures « 18u00 ».

## Noblué

- **Reconnaître** : Noblué, Noblue, Noblué Immobilier, Noblué Syndic.
- **Langue** : français · **organe** : conseil de copropriété · **copropriété** : « ACP <nom> ».
- **Charte** (site syndic-noblue.be, relevé du 05/11/2026) : bandeau bleu nuit avec logo blanc et jaune, Hanken Grotesk, filet jaune sous le titre, encadrés à barre jaune, pied bleu nuit.

**1. Bloc marque** — dans `<head>`, à la place de `⟦BLOC MARQUE⟧`, tel quel :

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;700&display=swap">
<style>
:root{--primaire:#000085;--secondaire:#000085;--accent:#FFB81C;--texte:#515162;--texte-2:#8C8C8C;
--fond-clair:#F5F5F6;--filet:#C7C7E4;--entete-tableau:#000085;--texte-entete-tableau:#FFFFFF;--texte-pied:#FFFFFF;
--entete-fond:#000085;--pied-fond:#000085;
--police-titres:'Hanken Grotesk', Arial, sans-serif;--police-texte:'Hanken Grotesk', Arial, sans-serif;--police-accent:'Hanken Grotesk', Arial, sans-serif;--police-surtitre:'Hanken Grotesk', Arial, sans-serif;
--graisse-titre:700;--graisse-h2:700;--echelle-titres:1;--interligne:1.3;
--haut-h:17mm;--esp-haut:24mm;--pied-h:22mm;--esp-bas:calc(22mm + 6mm);--p1-h:27mm;--pastille-h:15.5mm;
--filet-accent-l:26mm;
--logo-p1-l:44mm;--logo-p1-h:16.3mm;--logo-suite-l:13mm;--logo-suite-h:4.8mm;--logo-pied-l:22mm;--logo-pied-h:8.2mm}
@page{size:A4;margin:0 0 7mm 0;@bottom-left-corner{background:#000085;content:""}@bottom-left{background:#000085;content:""}@bottom-center{background:#000085;content:""}@bottom-right-corner{background:#000085;content:""}@bottom-right{background:#000085;content:"Page " counter(page) " / " counter(pages);color:#FFFFFF;font:7.5pt "Hanken Grotesk", Arial, sans-serif;text-align:right;vertical-align:top;padding-right:20mm}}
.logo-1{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='254' height='94' fill='none'%3E%3Cpath fill='%23fff' d='M103.7 79.4h-.6l-.1-2.6h.5q0 .6.2 1A2 2 0 0 0 105 79l.9.2.7-.1.6-.3.3-.5.2-.7-.2-.8-.5-.5-.8-.5-.9-.4-.8-.4-.7-.5-.6-.7-.2-1v-.4q0-.3.2-.5l.3-.5.4-.4.7-.3h1.9l.6.2.5.3v-.5h.6v2.7h-.4l-.1-.8-.5-.8-.6-.5-1-.2-.6.1q-.3 0-.5.3l-.3.5-.1.5q0 .5.2.8l.5.5.7.5 1 .4.8.4.7.5.6.7.2 1-.2 1-.6.7-.9.5-1.8.1-1.1-.3-.5-.2z'/%3E%3Cpath fill='%23fff' d='M112.5 82h.4l.4-.4.3-.9q.3-.4.5-1.3l-2.4-5.2V74l-.1-.3h-.6v-.5h2.5v.4h-.4l-.2.4v.4l1.7 3.7 1.4-4 .1-.3.2-.2h-.9V73h2v.4l-.7.6-.3.4q0 .3-1.8 5l-.5 1.3-.5 1-.5.6-.7.2h-.7l-.3-.7v-.2l.1-.2.2-.1h.5l.1.1.1.2v.2z'/%3E%3Cpath fill='%23fff' d='M120.4 74.7v-.8h-.9v-.6h1.1l.2-.1.2-.2h.3v.8l.5-.3.5-.3.5-.2h.6a2 2 0 0 1 1.5.6q.6 1 .5 2.1V79h.8v.5h-2.5V79h.4l.2-.4.1-.5v-2.3a3 3 0 0 0-.3-1.6 1 1 0 0 0-1.1-.6l-.5.1-.4.2-.4.2-.3.4v4.4h.8v.5h-2.5V79h.4l.2-.4v-1.1z'/%3E%3Cpath fill='%23fff' fill-rule='evenodd' d='M134.5 78.4V70h-.3l-.2.1-.3.1-.4.1h-.7v.5h1v2.5l-.4-.1-.3-.1-.4-.1h-.4l-1.3.3-1 .7-.7 1-.2 1.5.2 1.2q.2.6.6 1l.8.7a3 3 0 0 0 2.2 0l.9-.6v.6h1.8V79h-1zm-2 .5h-.5l-.7-.1-.6-.6-.4-.9-.1-1 .1-1.2q0-.5.4-.8l.6-.6.9-.2h.7l.6.4v4.3l-.3.3-.3.2z' clip-rule='evenodd'/%3E%3Cpath fill='%23fff' fill-rule='evenodd' d='M139.8 71.3v-.5l-.1-.3-.2-.1-.3-.1h-.2l-.2.2-.2.3v.5l.2.3.2.1h.5l.2-.1zm-1.1 3V78l-.1.5-.2.3-.5.1v.4h2.6v-.5h-.8V73h-.4l-.2.2h-.2l-.5.1h-.6v.5h.8z' clip-rule='evenodd'/%3E%3Cpath fill='%23fff' d='m147.6 74-.3-.3-.3-.2h-1.5l-.6.6-.4.8-.2 1.1.2 1.2q0 .4.4.9l.7.6.8.2h.6l.5-.3.5-.4.4-.4.3.3-.6.6-.6.5-.7.2-.7.1-1.2-.2-1-.6-.7-1-.2-1.4.1-.8.3-.8.5-.7a3 3 0 0 1 1.4-1h1.9l.7.4.5.5.1.6-.1.4-.5.2h-.2l-.2-.2-.1-.1v-.5z'/%3E%3Cpath fill='%23FFB81C' d='M124 29.7h6.2v32.8h-3.8l-17.2-22.1v22H103V29.8h5L124 50z'/%3E%3Cpath fill='%23FFB81C' fill-rule='evenodd' d='M146.4 63c7.5 0 12-5.4 12-12a11.7 11.7 0 0 0-12-12c-7.4 0-12 5.3-12 12s4.6 12 12 12m0-5.2c-4.2 0-6.3-3.3-6.3-6.8s2.2-6.9 6.3-6.9c3.8 0 6.3 3.4 6.3 6.9s-2.1 6.8-6.3 6.8' clip-rule='evenodd'/%3E%3Cpath fill='%23FFB81C' fill-rule='evenodd' d='M168 42.6V29.8h-5.6v32.7h5.3l.4-3.2a8 8 0 0 0 7.4 3.7c6.8 0 12-4.4 12-12 0-8-5-12.1-11.8-12.1-2.5 0-6.3 1.3-7.6 3.7m3.6 14.3a7 7 0 0 1-3.2-6 6.6 6.6 0 0 1 6.7-6.7 6.4 6.4 0 0 1 6.5 6.7 6.6 6.6 0 0 1-10 6' clip-rule='evenodd'/%3E%3Cpath fill='%23FFB81C' d='M197.3 29.8v32.7h-5.7V29.8z'/%3E%3Cpath fill='%23FFB81C' d='M208.2 39.4v12c0 3.6 1.9 6.3 5.6 6.3s5.8-3 5.8-6.5V39.4h5.7v23.1h-5.1l-.4-3.1a10 10 0 0 1-7.8 3.4c-5.5 0-9.6-4.1-9.6-11.3V39.4z'/%3E%3Cpath fill='%23FFB81C' fill-rule='evenodd' d='M241.6 29h6.7v.2l-5.1 6.5h-5v-.3zm11.6 24h-18c.4 2.8 2.9 4.9 7 4.9 2 0 4.8-.8 6.1-2.2l3.7 3.6a14 14 0 0 1-10 3.8c-8 0-12.6-5-12.6-12.3 0-7 4.7-12.1 12.2-12.1 7.7 0 12.6 4.8 11.7 14.3m-18-4.8h12.5c-.4-3-2.7-4.4-6-4.4-3.1 0-5.6 1.4-6.5 4.4' clip-rule='evenodd'/%3E%3Cpath fill='%23fff' d='M42.2 30.5h6.2v32.8h-3.9L27.3 41.2v22h-6.2V30.6h5l16 20.3z'/%3E%3Cpath fill='%23fff' d='M5.5 70.5a6 6 0 0 0-4.2 1.9 6 6 0 0 0 .5 7.9 47 47 0 0 0 66.2-.2 5.6 5.6 0 0 0-.3-8.2 5 5 0 0 0-3.6-1.3 6 6 0 0 0-4.2 1.7 36 36 0 0 1-50.4-.1 6 6 0 0 0-4-1.7'/%3E%3Cpath fill='%23fff' d='M34.8 0A47 47 0 0 0 1.6 13.8a5.6 5.6 0 0 0 7.9 7.8 35.7 35.7 0 0 1 50.5 0 5.6 5.6 0 0 0 8-7.8A47 47 0 0 0 34.7 0'/%3E%3Cpath fill='%23FFB81C' d='M64 81.7a5.6 5.6 0 0 1-4-9.5 35.7 35.7 0 0 0 0-50.6 5.6 5.6 0 1 1 8-7.8A47 47 0 0 1 68 80a6 6 0 0 1-4 1.6'/%3E%3C/svg%3E")}
</style>
```

**2. En-tête page 1** — à la place de `⟦EN-TÊTE PAGE 1⟧` :

```html
<header class="entete-p1 p1-bandeau"><div class="logo logo-1" role="img" aria-label="Noblué"></div></header>
```

**3. En-tête des pages suivantes** — à la place de `⟦EN-TÊTE DES PAGES SUIVANTES⟧` ; remplacer `[RAPPEL]` par le rappel défini dans le skill du document :

```html
<div class="haut-suite suite-bandeau"><div class="logo logo-1"></div><div class="rappel">[RAPPEL]</div></div>
```

**4. Pied de page** — à la place de `⟦PIED DE PAGE⟧`. La ligne 2 donne le contact : la remplacer par le téléphone et l'e-mail du gestionnaire ou de son bureau s'ils sont connus. Ne rien changer d'autre :

```html
<div class="pied pied-bandeau"><div class="mentions">
<p>Noblué Immobilier SRL · Rue de Battice 46, 4800 Petit-Rechain · TVA BE 0466.867.532 · IPI 513.309</p>
<p>Tél. 087/44 64 09 · syndic@noblue.be · syndic-noblue.be</p>
<p>Agent immobilier intermédiaire, syndic et régisseur · Autorité de surveillance : IPI, rue du Luxembourg 16b, 1000 Bruxelles</p>
<p>RC professionnelle et cautionnement via AXA Belgium SA – police n° 730.390.160</p>
</div><div class="logo logo-1"></div></div>
```

**5. Bloc titre** — début de `⟦CONTENU⟧` ; remplacer `[SURTITRE]`, `[TITRE]`, `[COPROPRIÉTÉ]` et `[SOUS-LIGNE]` par les libellés du skill du document, sans changer les balises :

```html
<p class="surtitre">[SURTITRE]</p>
<h1 class="titre">[TITRE]</h1>
<div class="filet-accent"></div>
<p class="acp">[COPROPRIÉTÉ]</p>
<p class="acp-sous">[SOUS-LIGNE]</p>
```

**6. Entités et bureaux** — Un seul bureau syndic (Petit-Rechain).

**7. Attention** — Le logo Noblué Syndic n'existe qu'en version pour fond bleu nuit : en-tête toujours en bandeau. Ne jamais utiliser les logos « Noblué Immo » ou « Noblué Assurances ».

## DR Syndic

- **Reconnaître** : DR Syndic, DR. Syndic, D.R. Syndic, drsyndic.
- **Langue** : français · **organe** : conseil de copropriété · **copropriété** : « ACP <nom> ».
- **Charte** (site drsyndic.be, relevé du 05/11/2026) : bandeau bleu nuit avec logo blanc, titres Palatino, filet doré sous le titre, encadrés crème à barre dorée, pied bleu nuit.

**1. Bloc marque** — dans `<head>`, à la place de `⟦BLOC MARQUE⟧`, tel quel :

```html
<style>
:root{--primaire:#15223F;--secondaire:#B98F4E;--accent:#B98F4E;--texte:#1B2436;--texte-2:#5C6678;
--fond-clair:#F5F0E8;--filet:#E4DDD1;--entete-tableau:#15223F;--texte-entete-tableau:#FFFFFF;--texte-pied:#C7CFDD;
--entete-fond:#15223F;--pied-fond:#15223F;
--police-titres:'Palatino Linotype', Palatino, 'Book Antiqua', 'TeX Gyre Pagella', Georgia, serif;--police-texte:Arial, Helvetica, sans-serif;--police-accent:Arial, sans-serif;--police-surtitre:Arial, Helvetica, sans-serif;
--graisse-titre:700;--graisse-h2:700;--echelle-titres:1;--interligne:1.3;
--haut-h:17mm;--esp-haut:24mm;--pied-h:22mm;--esp-bas:calc(22mm + 6mm);--p1-h:28mm;--pastille-h:15.5mm;
--filet-accent-l:24mm;
--logo-p1-l:30mm;--logo-p1-h:14.8mm;--logo-suite-l:12mm;--logo-suite-h:5.9mm;--logo-pied-l:20mm;--logo-pied-h:9.9mm}
@page{size:A4;margin:0 0 7mm 0;@bottom-left-corner{background:#15223F;content:""}@bottom-left{background:#15223F;content:""}@bottom-center{background:#15223F;content:""}@bottom-right-corner{background:#15223F;content:""}@bottom-right{background:#15223F;content:"Page " counter(page) " / " counter(pages);color:#C7CFDD;font:7.5pt Arial, Helvetica, sans-serif;text-align:right;vertical-align:top;padding-right:20mm}}
.logo-1{background-image:url("data:image/webp;base64,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")}
</style>
```

**2. En-tête page 1** — à la place de `⟦EN-TÊTE PAGE 1⟧` :

```html
<header class="entete-p1 p1-bandeau"><div class="logo logo-1" role="img" aria-label="DR Syndic"></div></header>
```

**3. En-tête des pages suivantes** — à la place de `⟦EN-TÊTE DES PAGES SUIVANTES⟧` ; remplacer `[RAPPEL]` par le rappel défini dans le skill du document :

```html
<div class="haut-suite suite-bandeau"><div class="logo logo-1"></div><div class="rappel">[RAPPEL]</div></div>
```

**4. Pied de page** — à la place de `⟦PIED DE PAGE⟧`. La ligne 2 donne le contact : la remplacer par le téléphone et l'e-mail du gestionnaire ou de son bureau s'ils sont connus. Ne rien changer d'autre :

```html
<div class="pied pied-bandeau"><div class="mentions">
<p>DR Syndic SRL · Rue des Brasseurs 1, 4500 Huy · TVA BE 0740.869.271 · IPI 800.039</p>
<p>Tél. 085/25.47.28 – 0491/91.42.70 · info@drsyndic.be · drsyndic.be</p>
<p>Bureau de Liège : Rue Charles Magnette 24/40, 4000 Liège</p>
<p>Agréée IPI comme agent immobilier intermédiaire et syndic · RC professionnelle et cautionnement : AXA Belgium SA, police n° 730.390.160</p>
</div><div class="logo logo-1"></div></div>
```

**5. Bloc titre** — début de `⟦CONTENU⟧` ; remplacer `[SURTITRE]`, `[TITRE]`, `[COPROPRIÉTÉ]` et `[SOUS-LIGNE]` par les libellés du skill du document, sans changer les balises :

```html
<p class="surtitre">[SURTITRE]</p>
<h1 class="titre">[TITRE]</h1>
<div class="filet-accent"></div>
<p class="acp">[COPROPRIÉTÉ]</p>
<p class="acp-sous">[SOUS-LIGNE]</p>
```

**6. Entités et bureaux** — Bureaux de Huy (siège) et de Liège, tous deux déjà dans le pied de page.

**7. Attention** — Logo publié en 400 px, blanc uniquement : en-tête toujours en bandeau.
