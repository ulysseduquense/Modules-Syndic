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
.logo-1{background-image:url("data:image/webp;base64,UklGRsQSAABXRUJQVlA4TLcSAAAv34EhEH+gKJIUZ6pwhymc8kICXA42FLWN5Hhfi3P5IyhXFDSSGi3BBvaxgRw8vK2iSFKj5c8XPShAB/awgBN0XEkA4NMH+MACCt6HihiDqDPPjK/Nj0qeXXXvBUgLbguAFDmW49bFkexlRjPTB5DMzKA1W7Mw98ySXuZes2WY2TX7yc8ys617z12Z+W1Pm19vW/qA9Y4+wNgVGRmVvXNkdqpVpytKla2KySqVoqZV6oj+Q5Rtq2qzSWg1oudeeVyI7Qd80P+SSi9461tuDo5QPqs5Yo9omNsnn3rXo6tHJLvCzf2vG6fHjki+fS2MfztCCVV4w/QoJXt4q50eqcj4faTyCaGd0njhkXUQb0ynH6jZ039wNnAs0vnYfXb26klw7c6USN3UqWluNk1MwWYFNH22NVQMTfPxJJFfvMLMfP2tlY0v+VxLehY34PfB3blpl2hVSmDr66g8+u6zcyd9LF3PJyQ3omk+n7nes4sa2EW+inm9aRph/tA5zsOcIr0V3LKGOQinS5WVtQ0qO9enj78kLU/en82EWvfDyVgV6I5uz4R3Iip29h03CFEHL2HYkS2Euwqja6ypqgz+YCzVVJq86tBQk721bn8dlbD9dVlIxwPQ/rKa2hcZcZPhimC+6gCMi6lEoq/Vjak1XUVT6x1EqdSDMT86pSSKjfVqS+bVXz+26lq60RM6QYT0adyymHNLgulTiOAiB99NFvmhYWrnzRl0V3UH91XNLIUB+c5gtYeMtNNpl6XLDDvKVIEEdu+rFMiW1fROTgyRFxTOASsXNqvOudwg8wjjlC2ZD90EKtL82A2G5ZTNGFq7tR3T6Uki69TUVq1zd+xcTMmEbWDxjgWa5FuBMlSQbH5ijUqgiXy8TMszd6w3JjhDKjqv+nooQ1K8CqMSE5A7UwpZsJBWZBdSYLRxAmsFnYGlLZDATZmHFEeahok1OggB8e13zGb3TZe8zAJZpKlhl85jEdUzb5pZa/ChKYoJ2sC/ic5VNL0odFrEEBtrhTmiQWctW+N20BC7SCijRlkQRvFYAIDUqztGPQwzIwHXd6aIhc1XdMK2WXHpHwekkduyzhCUCe/e/LWqGXDYSEEWzKGAs+byrQ1zeIOdx3CrzjF3HfMv7Z01wkt739Ui7Y2Z2bZNpy+mKX5gPrjdgqHYttxYGO/1j4ZCfiGGDTqlKTK8zFy9C5WVl+cfjqQXYbc4Y+ihhu/A1t6YCWCK2GOUb0yBtFhkQWR9O9FUWcYOXPEFFrtmklVjBhTqxmhjocJEhg1rJoRbbPHHdb7zcpvhdG9JRed8E1PySwMaa0UCqBYPLGfeMvrXiBsYWmKxAEU+EVDTagntrZCSbWNChbzYEXU3pRO2LYEv/R5dbRNaWl/QWl8ZbjAJKeA+sYXWWwtOx+5XgnEGc8eviyN2tlLQF+i8gYlZm4gEyq9wHm5pw2cdmUYPOzyrT7LIKRkAp1gCElcbRQqkRUJirtJEsRLskWwI1M71/GU28G2xV9xQOoEngGwQwT+5JVm6kjvSTm2j0O42NbZlJpEVdJEpWZsYg5YI+sl3SIjkJatvBB4qN6yRrBSwZTlCKiDy2oRYcc96mNKJBeyveYduzcOgpNmEK1t3MpXoiFcBkXnpnAqwiM7ptlIgLYwT38rMqY68umYfknZhCBLYDevB2HYOAy5K9xtfSycL8Px7aVZg4ZESYMFoDUHOHbGzDeMo95xDvc84Z62g8B03xPjklvDLOLUHpKphwR2bC66iI+oCinRPANwOpWuuUUoeI3fgOyQIp2IblGSGBRGiUcUdcQJ4uUwgC3B+FJxnhJJz/vW9hEV7zCGmXEwugC2GY29bh1YZOKKEInkCu68bIcnHuz6EsPQhe0ancIM3B8zp10TfvGL2WfKwARwXa3YA4pAsTAKpjGrxMgcQJ6GEKTZ6/nRRbMncbVkXU2H7clUMrsylAjeKNJ885twlYcuOiLv3hwazNp3DAwf4cHHLFUYfe+40O7EuPt3gvUly66fZVTJrE2wuuLOugm1k+zBkgWCFQga5MvlwTKSNmCYCP+Y9d3Tb9u3okNojAYrgkeyubd5yhVtvA4sRaJ2MkKvCcc1smyYf8x+42034RkMcclIgpkQjkkUd8x5EX4OkPSawY8RIFJFS06t+MNciNrDX3BW1HTlxSAkWGQZQPmFi+YhZc/El7d+pqNmVGFi+iKpIGIOIXdExi6sTeTsVxmZjSfbuF+3ckUgWFUELHG8FOqRJcRdSw7FEX3FCuHyIIcCSYHzaQbqKtK6bZgS2cUqc2ymgff3zy2Ey3MbbyfIpS1p8KKWLzQxLIlxqcICkpsXZdTB0xYAJlXIyGXnFhTZXLBIt68xYwR2c8gMUq/cktJhbJr67RCEFI1KhlqzAgpGyW4qU7FiQis53zJAkbFkvrrAhzQmEYhH9ficlJy3qoGAUpJzowZ20meVELyroPIb61hJcYq9b2aTH/UCov8SS+Ni3gjFH9DUwfX0qZnaRFYD6PV1kpv76sugijsWxr47YqUmLDJZYfR4wL84/1F6DyVhMMluxJ2SSIrwUNl6Pn7jICM4MCJ4ApeRbkZANm07u2lbC6jcBYT/ztUTWjZtiE/lFhUu4Nk/WBRdxO2Fe1gzoC+KPr1C+smIkYc2kJq781Z5IRhQ5cALlIZvbPzuReffVq5Dv+u0IoeRtrLeuMG88AEsHTkBuSnY2YWpj8JHoIG4n0DGwKLtWTFNOYZ4hPl4l2IAiLsCG+nrCcAiGZxyc6LylLBN+flW/dY3QwKYiFMuIXYsYdSw9+E0pHUNe7rw6sePma6sLYF1LYZBuQEF7qljAXtoRJ/CmxIlAcMO8doF13dsYY5eU9+11wtcoZG11AU/liAqKXJk0O1upcOEvap1J+3Um1lMF42tJF6AiJ00WnBG2HUEQLS35+VdsCX6vcgTsoJp7h60UpIj4sOFL0dRisUEFNZRu4E1j0JkwH+oODm6wWoqsdBMMmK9jjWweHICKzO6VjGXDGUKZ3zSWhK121wXcLN3woABVNEy6GIRd8OrC2ZGMUwJHPE3pSfC+4PG99OAiX+WcmysoZ8ZyI2FjQgdShjXZoIwUBRYMvRWOivWaE2oosgvReYZbnX2ts7iOs+DsE0uvV9lcj36BjH65Ov3ds7RY/kblKrhmJsHeG0h0AUubCvKDfevBGrlZZ9DBmCihrjjbphO2DZGbCDEdppqOr1sry7PshKeLSUQ5Ydtqu31G+fktVLuGPXqaImO4Oe04CBzUGnbBNhAa4W2/VqSYd09s5H9PtIgtSA/+VDDatYSLnXA4bo4b5ienKYiYyM3j5mafiEzJmrHM8R3Mzd4ffMnvc4Bd24DC5DbF0mbEuO8WVtEnq7MwtT06/q5pGgIisjFEplwnZDT8NexoDd84Ihbut9nyJB/xcZETxBh9CvxpQCpYUJFu/o7giRp7CG/RNPcNnYEpTGzzwcuoUaNFDVzChqyHljZvC0R2wpQoks6tQPT+gsTENhfYWW2L1bZYA7Ut/hitek7o72Jod2A3EMTsDZwRftBBkBPYFsUS/vyLsOSX8QaFl69SOaeJvBikgku70uMPZWfsbDqeozDyoCaxfppqQiD47piZCj9NFJkKwo9bvEJkMgd3qF7LYxPEgtFUZ/VddoOFggORu4HawmTLolMiO2Q9pP55jfYExSZhkdVW3epy9z7KdwjysENNoS6DVWSOWGmrcqb/Mg4t+g6kqjCv6QvlhdufzFuqKgMC4b7qd9So77gxnTdfMH881hCfVJ1bRxWbyKuXoebMrMn46xoOy9aohFVYobhmLlWKaSvlJOn/RqRmF6lhDs1sNmuEeTP1E0d1j4q8joukCw7Cu4bQnciOU/yBdAtmFAv3/uCtJ6Q5Xn921tgEfnFlTDZfZtHTPnvWEGRv5obIX7CJzN5iTUgD/KU1QxjTXPOmNM6/qjbo3BaZ8L96+pKmaeYDh//zq2merZyalQhN+QDiBHZdrPPRlMotKk+E6qj6N0XxDvHNcnT9GyouaauDcz660iY/aec7+JyPsvTrvGytsWTgoy2dcUB/mQs3fNSlKByW9989nWbzhXD98XwEpl9aQSUcmf/WtP9cyZub5/y/ydMQ40/vFT74P9jZP6ES9B4x9N7O5PAfBanf/6B6L/DQcx9ymcILHjZmYTGFeLPlieET7xUK8lAIPJMoolI8XYoy+3Lp2QPRfxH/2d6ViB/zqdAk8dA6zzWiTdEeR6wXYPaoW0yNl8xSsBqWA4vRt7IQ7vSpmpYpreNRZsVUQd1kKSC9DxN98DxTunHj5ZIF96TFPEldB2s1hXqrorsprile2Q+YvXroIO+9ClQObwh+g4A29iqGKqDSKEeQAmoJrCjikXJqcYyKZzVMuhRvWKei0CNwhzfuHdD8XuMCHpHmobmmPsMMw35oK/buRr3uP1+10y4o/81Mn4sxBpZe+CLGv0pIlPw1axdj/EuBOoIaqroYe4XKVqEUxaTMWQo5iDHGaXJcIUm55ymzlnGO2F0IENnL4VialkBbOVP1sVc5LIS5Y2Ytg/qgrB67ABAtBxGaqwL6p1kOzWAfYwyXh4kdAaEspt18kbP03OXCi6X6f/nXrpAxw6662/sxi6Ld70W7tm0bZjkctb4Q7aoyDrlr225sWNXe7aGUT1vFpSQUbdv6tuzbRmLbtqCNx7YXBt7r2xi4LNq2udwvpl2Ytr5q9e+Xw1lsu3xspKrB83Q/Z9YILzCMIRHdzfzYsLtRGedfEg+N9fteDhOz9dKkUxaNhcxy7npIYBmpJAqZfUh4HnMXtDM6lTJnGQ0P+0SVdsrScxmYOzWlrGJSEpZAbsyZpTcqkxQMrchGymXO5fOY+TLCZlPOgKnljA/7MTlKIXKYUCR3O6x2gQ+gYT5YssDM6qEzckv808mQWUe+DNp1YTWhGep+GPY8yzMBDljkPrGy8/43FFTosTA9yOXBYrk6FqOdPge0znKRxZK7oSBSEnLQiKeF99KLV03oJTJDAV6KMd7X0osqiy/nXhdL7VRXox72hWCMVvkgITIfxMBRRHpg2HPPQwFmSOJAvz+mTj6xZFqGTrUrc5jpsByTuIxFE5bKiyUb2Vi/8nB8RxhURq8JQXlfFznLbKnd8DeAFGYDmBVyamY87PZz0BXGQuXBEGYyYvbAoQzMVNakWnSqCF3QsptpBy4QpBeWHmR2jEy9PfOFMstBUQh3w14gisCM4r2H+qHzmRPYaDQy0sUSgEsxsgcmxhis5UiVAeAa5dx71a5SRtARQ8oco1xyBy4w464E8CgxbBoVBZrB+wG099zjGeiLM4n5CzgpXKYjxqgJCnjeYIx5COj1DXApRrHcAHT/oArF18gQwHff/y9A5PP0IsaKQiwYYZpLb1ygwAAW2osF9WAcOzRHM7NK343zB+ASnT6XGxl1o21bEzGAJ9Ky73o1MvNEfdbrXxjFGpO2bU6ZL8u8/M1ZDvGjHhQLlzy9G4PakU4Rhv1Bbl4Ao2jbqGotprqfOEMOe2ArmmYF9F0iNOUGM1M2QFBSBh4hoFL+DBQj7NZOY28gDA5hBgeV+amJuZvLJYJ2fgYvUM4gMpIF2E0rJpEF7kYzn/VioJ0HJ3qvh6jEAJES9n/wEJapJmIWuRr9bKNjqUDK0iIF7q4R6t/wYMQT7brnKYuMD/FjfsvXyqz+MBcEzwyyWGCUI+wCYTjG93Lwm7+RDEc4F3U9zhLLxVrMswjCsByBDGqeAZthBm8cMzRYtEtOZAyOcGgs82wshVEpp2XO9mJiZjobeQUdqj9MMoVBNga4SyMgpBshHPSMXCBop8NDWHHHkIppmWs0DzIt5vflJpmMZkk27XfGSFSJqiDoOBypiRwUfIio6lQhuBRGpJBPtD/nC2CSdnP2hmOkBzEPZKZlzheFAMf3Zhyrw/llOTMuEHQsv8wTpIMbbN2IhXUj86MuBjW4VL+E3SmsbDEWwmx08WbcfipdjPMHhioTHUZlICUBkXJoxO06SIohcXuiZT8XZrlIRCmM27vYRVUzSzr0sDpGIpYpuECnCm4kkCaLRLSudgrNWiBxeziVCLTFgOySu++fC+uFMpfKfBH0Isv+hZkrFskyVWY+zLJKlcssy+anQEelpqpS4UxT9SJYpSTWyFxiNk7KMgdGZllgZi6zRqpTQwHzNEuMlSxrThPbmWNgnWZzAXL5X5mhS5Q9XwQtlT20NWuEIzSmVGhWbAwzoC8Fmo3Pp5Xt6dTQhM6JaUtxQpIykaU8JfpAiB5hZk4rLbVU8cLMf8bMcN6NTGPR1RLvVZm9R3QoVKzMHjHYE6VAOzxwCCrd+1NRNqfqhjYRc+LMAlWCpQRsPi3GvNqQB+Qj6z3eMEsMUw3LT8G6yv9KSgwA")}
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
.logo-1{background-image:url("data:image/webp;base64,UklGRtgQAABXRUJQVlA4TMwQAAAvo8EeEH+gqI0UqFwv8G8RS2TCEEP/wi5FbaRAQ4ICPNwq8O+IF2oiSZH4DeCCQgjuiQjBwQm4LAB4ZPk6vuybPBhYOOigjBQfEc3/2XAGtmnbHLuN8071FIHzpWc2fsT+hVYdkiYYwFERYHBQAgbghhYVGJyOBEWQlo+MjSTXhnxcTJiljnPO9uac8+4nVp9QQlc16lCbdzCMzmDVTPfbPTMo+Zsd0X+Ktu3WbaODyBp1HK8LgKLAh/MBYLd7kF04PR/H8YurbwFFwNFCCiw5vbS0+h8AE6CZCmD7h5dOLq3mwp3VMgrZ+VO5SyfO7qawH1wtBXXhzKml3K4qzUe4cOrE30GASlMpQLY9Obe0dHZ10i9cL2UB/NGvCsnjWEh5YtUPibO635+XhfHfI7qPikRndCknrgSKOh5e9OF5qfvEP3EEMkc24c9zx3VrkBzvD6UUcm+GsU5hKs+Iro2fWA1go9xxRsjYMCE/SIA4QdR3JNe1ye//WJMWsHdLjqjNHA92tFBr6OVXgTmRwUelNP2eKc739zWdDeTUhOzT8xKNzokjELiTqm/LGDX5+QbzXLxV78LUCTmZAVDW55iUNnEJUkg6CzafXoXUAQUfFZgDMwqAvazr6DIk2RcXJMc9EHwPUFcyKA6LyO83Mhdvvy1t0pSKBhyX8nnq4Fmgxdr6E9ihf5i7ZCEYxhrc9wz9ZwSPrSYnlXM/81HzQPPs290lr0ibtBUafJXbpLxqP2XRwMX/PcqzJomtxVYiYbgyTjWiPNku9n1C3SAdJ5Gia21JLOrbpf2yg2DZINb2NCwOB3XKeh5yK6rDDX6gZ6Q43KKjnFBR31HkLluei3ZgtdbAQe2KzTPyfscAfN7S8LSw2Vk2pewoPAmfl7GjiQZ1gRohcoiTj4vMmHRxg7tIGQ8s/7bm6v9eZTvHdrJFk31MV+ZsTifVcQ87/gwCOucY77KnwDlJsSTUci5FV6Mfx6VOLveOu7tYnsMHerGFUp5Z21MF9x3JE1/6gpQg3mc/ZR1eIij7GJa/RV4VMSqWXuNxFVlSkcwp8ZYZKHkRt6571k+5Fpcwjv3vYBhXBt/wkBCtxZVkiWlJKv1Bx8x8l+gxLIkpIfIgMeU9IOxU4Rl7qlR7ar2VYklyIjD7b0L1W7yCy2q8jVcUnr/qL+mgXMDHjICH9ws31HGj+so0cREmuCi2peQIbVtVFVi81YppS/cSIPdEhbSUW8+g1fOW7j4z5C1zB0IAFfW0SIwTS3yEPHE2aTYvnJ/H1BKKnxnHH2svrian5yXKzLpBvzRO4U/nUIoAnD8lcC8J1fDmXJpNoYh+QUohzQKZzhryV5tGAt7NkdsLR6HX4oUjkNvUGbT1tZlR76HyZGwMeCxSuDUQAAEafX5lBLldXOAYO4nDY11yzdlAu2Xh/fPxVZ+gt5vgVwKA0eYovZUCWzP5geUac0N8kECWplMA7xdononGMkZrtXnhKLccrclbF9AY7dAuGXrNdwGM0jQAdpTbL9d72HF5spmbD7ogiKaBIY1Y5v79J8AmNcfsc1g1g7IusGZA2IYx5P4oxxKoC59DkP8BALZCvtUoXO1b+zH1OKZ+L6Sa/k3CXsPC+1a92aEjBr0hmCOCFCD1sAJEfjyAlDo9wFeUY90jG4oiA/OhtVwLhmhQptJN2pHo+VCYSwkwF1rU2uxWkGG7QhWLhvV50PbVKE1TLHqhhz/ePkLQCQ28ImuFoJkt52JfhoV9hEZlXe//bWVzGKB9bhuoFqOhrdOjPSxkU1hAsPpF3LEVQWKnAtzepBlWggAjgDOBOLo9TdMJe7HNCXWsMYVeJfWsj9Gsw+39cLbM8aQzxh3LcsWETc8xE+lbImWIyJCGskEtw+N0v9kMBKqXWiJkuQvwB3AYxZYe2pp5apQzFnHKFljU12sx3krprOt4JITpwm4H9oH+ZppujjRPHjOZTJJP/6KRJ3ws4Nr3zoAlz28xQYS1UntpIrYV4maRDiMD5ywRYvHQswT824bqt1pKq01DwAMPNpsDvGpoaT5t/JHpVDtKLTb1GEcyhjvfVqDjPRrbezgya3IXD7V4+yi1mN/H2hCubwy/Vky6FMDhfoDoQnLu9NLJefs4lwNARuExkxagZrmr2hnOikmIhtpB60yIt5QZsFoPaUOA06C2FoSKw6aNz8wLKS1FIhY5BVFyFGkvZ8/ZrIc/AtSyPWyW0brp6GMcfbQrTLnVpdMcr4TpoDoUjc4ILIJW2gBB592oLGkzVBGhOFkZ2CKG5YFt9wl7yNoIShISbU64xDwHZGyNVzW6r4tOJV6tVAthC+VcuaNNa1TEeF0sV0KbVYmKBuU8EWPFtEZVjAX1kC1WQotWwl3zOcbjchAyjCtjG9SC1gdXYb5XHVlHlr1xsgdEddytCXiyGgJaHXRQugWTZV4dr9fFsWoglVFBd9AewVx1xDNhLWC1TOmbrhIqmdST4yEM4zdQqpjUk3tDD/pvpJSa1BN6FXIVAoDelgfmttA/O0zqCazmOXly6ezqf4ACgCrnyHZCTTy1tQgG+H+dePHcuSRJJpvT09RY69Z4Y30OKjQOfLWJDzynNqZGUDVjpB5YRbUKgYrACyv+Y4AbaW6bzXTCy39GAF6BkJWZaNRfT5ZwkbezirA4cQjuUVTfjQA290NOlR+08lbYujW/OPSmSrhj+c02UFxdWuwWab21OLHpyswHqH1cdsTdpdsAVYGN8cXB+3BxFC6+W3J9GolCZcbqAlgPmWgoYRPVMcsdB9g0+y0h0ZkRvKe6VSaytREg8zKjANytOuZMuI9rY++WcexISkFtNSxzS3Qr0WYAluVlR4rc3SJ0i4EvR3XVFmDWbbEgvCFiN9YpZBd+VexVWwxcmGjQ+nnMcfljmbsRQnThlJDFxpYtB0MXJ2pHLTrypCPeny9opWZ+8tD7OaX1A2kPW0DaQKulcKpycL9bI1TxMHZCMSEd9nHdAABWN7a1ri624KQ9sWqg43TnqEhYcPBerPhKExTegz8/9UlC60c9zZGfPXBPa3mMqs+c3AXVwxjCr5iOh/Q4dwIfbIhuAGluFL4opOyqurGWtYdBFT6B+raUctdE9W/JBFZUKy3HacDWYscLdLAhP6it0Ufnhb6UXy/2nQr8r7RH8vajUnuYeZUTIC6If/BhM930IBpwRywToJKfTZLzC9J4etXPhGUfxQurSXJaSGMHUZXEd0LbVoK/PFCku9gT4AiQgX2YzZGnV+1kHe7s04qqlJkQAJ5Gm3C8dO70vOCxM+w4d19kULUDtF9mDr9aNBVu+4Dc1/DKLIbUzn0lsrSiKn+5v1d2eG/d7VLiVDsqKpMlUjXBsEpUh5c51Q2QayVuJVYpuk8VAnRYZqa9RsrfSjGhFaPuFyWpbA/zD7zaAep+4n7VALlWJSVWGb9PaP0otlZiC3PVqA6vhLLuil9SUD8QfIw7J6lSzHxXCATvd/6+Rp2U/r7GngyqR3VklSj4ttN3asgEbAWAsde4w/Eq0BqA4GOyQiBjQ7fvPW0NIOiscetxiQZQB8yhmckyAIm+LW3HEUW3Cor+4xq3HT6DajGdSKOBtBSoHyw3yxVEnxEc0/jCT8DmlstWnWWXDnXRmk4zp3+8IDGf+BU/c3wMC4JnOENfsOD8mpBIbFp/FwgkB45fR/2jBSmlvjH9SgCBRdWNntTthxSdRtBtHJMiTSnEci9BdEZo9X4u6YVJyDzLDsvjhtj2CHB7oOfgRBhAMbtkfKP0FkSGtBUFbvYOiJJf1b+H+yAoa7C9jy1pdpVgUj5qSAEXKaF1gpvAfv17uB9KfLhhzWH0kib2k5NWV7/o4kRIgf3Z+dPGt3DvkY8uncvtUw0PHC2lAA9sb057ACMKFVhYjRSz1UwBhNPNA9cBVAr1WoqkcoNW4W840rxU6VucPGhqNqpIyj2ndYiUasKmPKcw62qplXVXJzbTzXsbhv70VloYKZfw9dSDLWthsRT4v5D9v//833iEaTqV6iuFHkwBgJowllIVBdDW8lBxxfvWiSEAMuxPI6lc34iAodT4JKp/0oQuY0JTNzUFplIAw82UguGm5rLp1jqFEdRmStstwAKg5cTZ118VwHVglgXhasyrJAigBUL5oGqAdV5aWvprnwJ4Hz1VbHKnH73KIPpkg8DyVaY+uZSbf18h7u98qliuh356PFCaMNr5jZNXfGObRa7sbAOAfqpYfydMX2+P9E/K2Evan6b2ns8/aRfovKL9qWrv+aus89kGAXjv76rOS76Xe0RZLoAC+cdTJ//Or+P3F2VuexWoTiHgMMBcm+UaXgc621VKFGL8dUOcYrJBg35XF6DYa7mabqrvX9c2OGwA6Wt/hFrfYtHNpCYn0nxqZ94xmduhCY1H26xgrq0i8QMKwbCbyyM0EvuYKgSwzlrh7Hod8CRZ4D6lA756vtdO2SL3byzyfYwO7yjVu5wkCVHLuriUiQLR2CgETByTl5Oj/K26/FaS/JpoBKRfKPWjJOldSnZHSdLPPynr8NUk+UiYhy3JfdNvkKcMVhQddDMg/R+oDic0i6WfFgLokF9JFlZYHbQAOmJ8syN3AjwvGxsd2aBzce5ff4yo3rjelnVxJvtUAe1fosB+SSHymRinpL8NdDMEDHdof7aCgB42gN/hhFqZbbPCk1RDiJ23ciYicQmgswdqebme0t7YxmPcv3eP9WZUJMbI8MUWLYKlemMAqkATZxC3rudMMTmWbgQACBFKutH/QZpCmg5mNlMdVpDmKWtYYYucpMvcX9eJV7KcNNe3sUGhHm4X0LmVDIqbiAX9Ga+/S5IO9z3V+4Vm80DB9psYH5JjU6KR+z4KABCmp5+ThJD+Tn13R6CHlA5mQsiZbDb9gtGo6UDGxHiQ+610TsvGH+Q81tL/Dn59F2S2uw6Q/56iw24kGr3xxbYC1dP2jVkvtvVXmIYPEO0PkP1jUrsNtR3rdnjxRXn9YtnhAmjvdTrcoQwOy24ugDxd6IoehJrecpQTipD/Yv7+wbbZrsGOHN68kIsz+MHT8oiBKloQsiPu+w1airGiQ21eWGinYGfYzXpj1GD8mrxowPJ01kLRvSs6u6JAc4kt8ufacG3f8E7BoQemNyFHSt5VyoCJS/oFwWgdOLC9dyd/OTg9PeVyceSB68VFLKW8q+yEx1sd2QhMOvIyJ295rFUj8YlPEKqe4v7+EfReL9L9zq56cqU/RnPGPGAFJ+cFoQbbgmGsvWU8vfWHCHqKtbco6kCDam/J9bcADNI0JRqqI59rvQNM/EEck3RZNjZHL9fE9HbQnDkE8H45HoSRiGfy2IkGBeyDrk+JMQTVKVSlvaJbRwAAEwAL+Ac98IeyQQwAeYnEfFchpIs8JxI7AGp6aQVaLmm/lSS91nUA0hdj+xmPfS/nSpL8jb++3ApIHiYToIPiOXhNXkl+DaHZvCBmlPZk/xvi2Uly84qwvak3o3RaucAGLYBgIGYAYeKBXkyoN+SrydFWPS+BLuAVrTIKi48QjYD1iqzo1VdjY5n7afGwMsle1qqvNa3iMr7FpymkpC+0Haf2t0gpOaU5ZNZ4y6OF0G2BBrkmxikCJdcKAR2tgKuD5ZZZhH46jv8OPADveC6FDLoFvZMnT34jpxWoqPdDncEY5CIaFMifz8efaJhNLI5P7lK5Xk1pALk8jeHBglau5rcDeryrVCe/1F9ygWPBkytKk00KWoRGvXG9swXy0dwt4jkD")}
.logo-2{background-image:url("data:image/webp;base64,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")}
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
