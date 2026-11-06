---
name: charte-syndic-agigest-emeria
description: Charte graphique des documents HTML A4 imprimables des syndics Agigest, Emeria (groupe) (Agigest, Agigest SA, AGIGEST S.A. ; Emeria, Emeria Group, groupe Emeria). Pour chaque marque, le bloc de style (couleurs, polices, logos officiels intégrés), l'en-tête de la page 1, l'en-tête des pages suivantes, le pied de page avec les mentions légales exactes et le bloc titre. Commun à tous les agents qui produisent un document à la charte d'un syndic Emeria (PV de conseil de copropriété, plan d'actions post-AG…) ; s'utilise avec le skill du document, qui donne le squelette HTML, le CSS commun et les libellés.
---

# Chartes syndic — Agigest, Emeria

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

## Agigest — Luxembourg

- **Reconnaître** : Agigest, Agigest SA, AGIGEST S.A..
- **Langue** : français (Luxembourg) · **organe** : **conseil syndical** · **copropriété** : le nom de la résidence (« Résidence … ») ou « Copropriété <nom> » ; jamais « ACP » ni « BCE ».
- **Charte** (site agigest.lu, relevé du 05/11/2026) : logo bleu sur en-tête blanc, titres Cormorant Garamond, filet menthe sous le titre, en-têtes de tableau bleus, pied gris clair sans logo.

**1. Bloc marque** — dans `<head>`, à la place de `⟦BLOC MARQUE⟧`, tel quel :

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&display=swap">
<style>
:root{--primaire:#243853;--secondaire:#0059A6;--accent:#77E8CA;--texte:#243853;--texte-2:#3B4C66;
--fond-clair:#E6E9EB;--filet:#D0D0D0;--entete-tableau:#0059A6;--texte-entete-tableau:#FFFFFF;--texte-pied:#243853;
--entete-fond:#243853;--pied-fond:#D0D0D0;
--police-titres:'Cormorant Garamond', Georgia, serif;--police-texte:Arial, Helvetica, sans-serif;--police-accent:Arial, sans-serif;--police-surtitre:Arial, Helvetica, sans-serif;
--graisse-titre:600;--graisse-h2:600;--echelle-titres:1.25;--interligne:1.3;
--haut-h:17mm;--esp-haut:24mm;--pied-h:18mm;--esp-bas:calc(18mm + 6mm);--p1-h:17mm;--pastille-h:15.5mm;
--filet-accent-l:36mm;
--logo-p1-l:46mm;--logo-p1-h:12.9mm;--logo-suite-l:28mm;--logo-suite-h:7.9mm;--logo-pied-l:0;--logo-pied-h:0}
@page{size:A4;margin:0 0 7mm 0;@bottom-left-corner{background:#D0D0D0;content:""}@bottom-left{background:#D0D0D0;content:""}@bottom-center{background:#D0D0D0;content:""}@bottom-right-corner{background:#D0D0D0;content:""}@bottom-right{background:#D0D0D0;content:"Page " counter(page) " / " counter(pages);color:#243853;font:7.5pt Arial, Helvetica, sans-serif;text-align:right;vertical-align:top;padding-right:20mm}}
.logo-1{background-image:url("data:image/webp;base64,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")}
</style>
```

**2. En-tête page 1** — à la place de `⟦EN-TÊTE PAGE 1⟧` :

```html
<header class="entete-p1 p1-blanc"><div class="logo logo-1" role="img" aria-label="Agigest (Luxembourg)"></div></header>
```

**3. En-tête des pages suivantes** — à la place de `⟦EN-TÊTE DES PAGES SUIVANTES⟧` ; remplacer `[RAPPEL]` par le rappel défini dans le skill du document :

```html
<div class="haut-suite suite-blanc"><div class="logo logo-1"></div><div class="rappel">[RAPPEL]</div></div>
```

**4. Pied de page** — à la place de `⟦PIED DE PAGE⟧`. La ligne 2 donne le contact : la remplacer par le téléphone et l'e-mail du gestionnaire ou de son bureau s'ils sont connus. Ne rien changer d'autre :

```html
<div class="pied pied-bandeau"><div class="mentions">
<p>AGIGEST S.A. · 55, rue de Luxembourg, L-8077 Bertrange</p>
<p>Tél. (+352) 203 047 00 · info@agigest.lu · agigest.lu</p>
<p>TVA LU 19153507 · RCS Luxembourg B87094</p>
</div></div>
```

**5. Bloc titre** — début de `⟦CONTENU⟧` ; remplacer `[SURTITRE]`, `[TITRE]`, `[COPROPRIÉTÉ]` et `[SOUS-LIGNE]` par les libellés du skill du document, sans changer les balises :

```html
<p class="surtitre">[SURTITRE]</p>
<h1 class="titre">[TITRE]</h1>
<div class="filet-accent"></div>
<p class="acp">[COPROPRIÉTÉ]</p>
<p class="acp-sous">[SOUS-LIGNE]</p>
```

**6. Entités et bureaux** — **Bureaux** : dans le pied de page, remplacer les lignes 1 et 2 si l'immeuble dépend d'un autre bureau :
- Sud : `AGIGEST S.A. Sud · 6, Boulevard des Lumières, L-4369 Belvaux` / `Tél. (+352) 203 048 00 · info-sud@agigest.lu · agigest.lu`
- Est : `AGIGEST S.A. Est · 10, rue du Pont, L-6471 Echternach` / `Tél. (+352) 203 049 00 · info-est@agigest.lu · agigest.lu`

La ligne « Syndic » de la grille d'informations reste « AGIGEST S.A., représentée par … » quel que soit le bureau (Sud et Est sont des bureaux, pas des sociétés).

**7. Attention** — Droit luxembourgeois (voir le skill du document) : syndicat des copropriétaires, conseil syndical, règlement de copropriété ; « FR » n'existe pas (avance de trésorerie, fonds de travaux ou provision). Signataire éventuel : « Présidente (Président) du conseil syndical ».

## Emeria (groupe) — par défaut

- **Reconnaître** : Emeria, Emeria Group, groupe Emeria.
- **Langue** : français · **organe** : conseil de copropriété · **copropriété** : « ACP <nom> ».
- **Charte** (site emeriagroup.com, relevé du 05/11/2026) : logo Emeria bleu marine sur en-tête blanc, titres en capitales, encadrés à barre bleue, pied bleu marine à coin supérieur droit arrondi.

**1. Bloc marque** — dans `<head>`, à la place de `⟦BLOC MARQUE⟧`, tel quel :

```html
<style>
:root{--primaire:#06187D;--secondaire:#2440FF;--accent:#2440FF;--texte:#06187D;--texte-2:#262D98;
--fond-clair:#F1F5FF;--filet:#D1DFFF;--entete-tableau:#262D98;--texte-entete-tableau:#FFFFFF;--texte-pied:#FFFFFF;
--entete-fond:#06187D;--pied-fond:#06187D;
--police-titres:Arial, Helvetica, sans-serif;--police-texte:Arial, Helvetica, sans-serif;--police-accent:Arial, sans-serif;--police-surtitre:Arial, Helvetica, sans-serif;
--graisse-titre:700;--graisse-h2:700;--echelle-titres:1;--interligne:1.3;
--haut-h:17mm;--esp-haut:24mm;--pied-h:15mm;--esp-bas:calc(15mm + 6mm);--p1-h:17mm;--pastille-h:15.5mm;
--filet-accent-l:0;
--logo-p1-l:42mm;--logo-p1-h:12.5mm;--logo-suite-l:20mm;--logo-suite-h:3.5mm;--logo-pied-l:24mm;--logo-pied-h:4.2mm}
@page{size:A4;margin:0 0 7mm 0;@bottom-left-corner{background:#06187D;content:""}@bottom-left{background:#06187D;content:""}@bottom-center{background:#06187D;content:""}@bottom-right-corner{background:#06187D;content:""}@bottom-right{background:#06187D;content:"Page " counter(page) " / " counter(pages);color:#FFFFFF;font:7.5pt Arial, Helvetica, sans-serif;text-align:right;vertical-align:top;padding-right:20mm}}
.logo-1{background-image:url("data:image/webp;base64,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")}
.logo-2{background-image:url("data:image/webp;base64,UklGRoYJAABXRUJQVlA4THkJAAAv38EUEEcw//M//4ratoGD7TYc954N4AGhUUg8BgKdAYAdJdobMLQzYirBiyWescRw91nmUGalPLzAtoCw+7vlvUm799lG9B+ibVtRm0MT49T1BkB4IB8QVIlCaB089fv95++NNykgxMkg4sXF9w8QkFJhkAJ+O7+42FwwSh1Jun7+903By0hEk34IkSpRqkEsStj/+/wxgEaXQGsbh4eHmx+Is5pR+9ZDkaarRkAwfZoPeSRftgWBGJvs/zVKzci3/ifVL/uxoLQJr0qSdjEW5X4qxCeUDAEB9x/zVJnLBuN+k0qnecGmH4Bg+OxxInYbAWLB8Tcn9TagQUF84PXLPhl8gtBkVSkif9BxLEQdpNx3Jhit+K8WwAjgr0JK1zW1/hhOBUMtRvJBcywoClrHYiqf3ScaVaJdGKe5jD+6n/5i3Y/GiuAtUyhE1f4hnEjyZXWcCi6abyeA9jOJFHTwSayKDHY4q3OFOraZwhqmY+Htt+5P5+12rpCPMIxkqT/rhE4/Lj7B8FoooGHKSgKF9UQVjTUsF90pRb0G0MiIY4V8R0HKa0nRJpXQse00PtEoCLeFTLwv7CJTh+msob+ooxb1i0Z/6KnkW2rmKi8p9ER4USs4gwqXNHMNiFy2iYG9wpCWUb3FSeGnPzaVeXak1dPPn0VXkYNhVCjgtc4AYm8o4EXTboeFSX8HGW1Ca4qgIQeL/uwUOtqcGDE9m+Iryg22jaI6bE0ZmeSawJLqIG6VdPjHooPbM9Jt4NUmak0QFQa+dBGEbW5iF0Xfe3zF7rClOVJtO0ZRv6LQ2M19KWZBU8MaqigQiquWpszQyBGqt26VDR4XzuyisDXLKPvTfpvisE5W7XnbaRJKs3diCy5FJjGeFv3p8tzHtt1omv/iWfiRCnfmOJlhYuYrysbwaNch5S673jXBLPD7/rtS9eRWi6fG8Gi3w6s9Y4vcuNoKhv5kBJ4yz4GibKv6ZVKGoQGv5fPF4fljrql9vWsCzlYTDW6VAVLu5VBL7QdSv1uR1a8+xpVE6zd/AsR9sZLYXCD69kfedW/kCHpqi+DVB6LWwUTrUBgZqgCEX0KnD1uMIlMvTFMIv/jHuG1/O1F0P5cqMKWtsr6Ofl/MK7r97GOiyb24q8y//Wl6rjNxs6fLKG7Gy5h9goAUfxGx/ZBrNN39OSDFrlnPhcKva9RtU5RjxXz5AVBwUhdVNV+2mCgI4U7lUGxKqqT/L9EguS4VYxgHs5D4FpWmr6JSfycQMJExVeGHV8EnAQK+ysGMgBCEQASApuZbZGKLFF40DsWO0JBOfcLYioj4dkv+FvIKBOreRQ30jZxrNpwj6b9Ciux9FIgCQTMXe54Eb3u3QsWsqPm+BFIHi+qgKNxLaI7pwvomyFFQGGtvxBt9Hzsqe2IbCnkhKa61emJkQdGPnwO55usKYTJqs8yDXF6v0fQrLV8K2WjI643Kh/GuJC2cyPkb2xr1salrNfLWX8U4S+rDDwgj+QQMLT0rpCSxRtVkPOyxtiCuzoGxouOrbHfWQLxzlXS9nBpoiudXFN3RJTB0HLoxr5Z2GSgEUPrhhLNQ4L4QTS1c6olPfrxRNZdIyPPcw0kqg3hs6jrAq9y5HBusgbixcThNH5X3Ml75ybnu6W+/ONK4dA5MEbJVFEsHgaop/5UYH40448si1xQKHvP+k7y0KleAL0xpBPFXUrCptbZxcC43QBOZbjkWSE6se3cjBvzTnGlXKWJOKhFhyNqdFEn2ds5WnPpe1RHKA1etg8cnppUlksg2YM8ERWJbR6KxjojL2IpOp1TkMpRKRjcoUlvKwIgcsyJNwdX8iOhBMqBnYCrbmD18KKcH/kaJXeTIrR3WLEzJ2QFAhYLs4d0ItltlQhi+nFi7h7YBAW2faIqy9W8HICD66XftTjoiao+VTJ/rzt1JdzoSbcdIaikAjh16uNMBAV9myqbjmoH9QXz16A37R/zmyubYkZo/CL9csslbznZmvmx+ehZYf+DYJ5pFQ29WsVyg51lg3UGcePAVKf/HGFQY6jkp475ffP13mPUGyWV7hKH3rzGsMMdeddHwvcDh8ZbGUMfvArqBJf0knPx/G2Rx2s8+RUG64p24xKRQv/90eXG4+QEChYh34h/BWMxFl98PNzfW1oiA66KWw8q/086p+yI2X7ItVkomnpjwHrRjFQMgDc66TFQJIeX/qp8CznQEFzEzmtnLAGPjuLNQej+0qnEGvBGqcknGqdWbD904LLl36JwWMVQnznBtVLAOrkjls6Y4ivt5FKwtJUHZIPugMw/K+AK9whAhn87e5+Qh9xTKRYgTLhr1A28GhT5CjnivG3hmY4vGC8pnLM1MslzgSBajjhgjvBYmkACrjBQyx6rSEKDjwkI0cgdQYeRxnIpSE4BXDt2vs3wHK4w8TlchQk8NUqGHQmhFL9HUobooxmHLBAXwp56OHgyth1w3zo5UIYzj7IGgTG44FnmopwdO1PMoIFB1sM6jCEgl0lGPI8NIhRxnuwaStKfKYJwnM/UolIQ8f0GoXvS09fOgJtl2gCohBGKX2HlQp3m2iOWBhW6CF0LPwLFunhvEY5bLWCECTEzz3OpQDuK0tZWkPEazswx0lPMYT/OkBq8SQymalch3n7wzURowFvqhSZsbxwWPfZ5qa/8P815LRVDOU/24wM5TrUNpDHnnNWLh1seFFmPgONlUCMqNL6OUgmbC8o8Pa2sHj3JP3nWe+RxVB3MsuAYloRxetUK5UUioBGkNZdyUBeWuuPh7lqpDgLF140+I20/+YNsqZYWgW2uguSSw54vhzRJe0YrgkOczgpJo+uJUoKuDOdo/VxIBXj3w3exWCUTbZr4s6MYF19PLVAWc3sNtlAVS7k+AF4uUAFUCw9hWXksgKZ123N+jrxKB2qZX0EsDcWLGe52EaoFwZ/FnaQQ48cNB/yOAUC0CBsM6GKXA6GLFeZ2TqhEIx+p1TkokUHNipKx1bMqchywIr1/HplQCtBW6ZLl5XAHwXrdOkQfAMaP9sq9TtAMYSgYVf93GK9dw8VqHahsU47j8y0S6VlKNo2npJ7x51LwOFYwNgyAw4fQRnPcgzqdgRF8G0zpjbz8sK4VhM1ctjkG3bI5VWX+ZSlhnjG4NmYJeOH1EXR7zWJOrTQhIo9QdBMbF4R5N68jB+mGcGrxPw0EijRAraCbCbAZwW0dOr4q4e8DoI+tC3zY2NtYoHnVsbsQpruoDAA==")}
h1.titre,h2.section{text-transform:uppercase}
.pied{border-top-right-radius:6.5mm}
</style>
```

**2. En-tête page 1** — à la place de `⟦EN-TÊTE PAGE 1⟧` :

```html
<header class="entete-p1 p1-blanc"><div class="logo logo-1" role="img" aria-label="Emeria"></div></header>
```

**3. En-tête des pages suivantes** — à la place de `⟦EN-TÊTE DES PAGES SUIVANTES⟧` ; remplacer `[RAPPEL]` par le rappel défini dans le skill du document :

```html
<div class="haut-suite suite-bandeau"><div class="logo logo-2"></div><div class="rappel">[RAPPEL]</div></div>
```

**4. Pied de page** — à la place de `⟦PIED DE PAGE⟧`. La ligne 2 donne le contact : la remplacer par le téléphone et l'e-mail du gestionnaire ou de son bureau s'ils sont connus. Ne rien changer d'autre :

```html
<div class="pied pied-bandeau"><div class="mentions">
<p>Emeria</p>
<p>Tél. [téléphone du gestionnaire] · [e-mail du gestionnaire] · emeriagroup.com</p>
</div><div class="logo logo-2"></div></div>
```

**5. Bloc titre** — début de `⟦CONTENU⟧` ; remplacer `[SURTITRE]`, `[TITRE]`, `[COPROPRIÉTÉ]` et `[SOUS-LIGNE]` par les libellés du skill du document, sans changer les balises :

```html
<p class="surtitre">[SURTITRE]</p>
<h1 class="titre">[TITRE]</h1>
<p class="acp">[COPROPRIÉTÉ]</p>
<p class="acp-sous">[SOUS-LIGNE]</p>
```

**6. Entités et bureaux** — Pas de société ni de mentions légales propres : utiliser Emeria seulement si l'utilisateur le confirme (l'immeuble est normalement géré par une des marques syndic). Remplacer les crochets de la ligne 2 du pied par le téléphone et l'e-mail du gestionnaire.

**7. Attention** — Ligne « Syndic » de la grille d'informations : « Emeria, représentée par … ».
