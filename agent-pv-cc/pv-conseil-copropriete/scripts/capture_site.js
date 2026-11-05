#!/usr/bin/env node
/*
 * Capture la charte graphique d'un site (Playwright + Chromium) pour une marque.
 *
 * Usage :
 *   node capture_site.js <url> <dossier_sortie> [url_contact] [url_mentions_legales]
 *
 * Produit dans <dossier_sortie> :
 *   accueil-haut.png, accueil-complet.png, pied.png, contact.png   captures d'écran
 *   logos/                    logos d'origine (svg/png/webp…) + rendu PNG transparent de chaque logo
 *   fonts/                    fichiers de polices chargés par le site (woff2/woff/ttf/otf)
 *   styles.json               styles calculés (header, nav, titres, boutons, liens, footer, body)
 *   couleurs.json             couleurs pondérées par surface et par usage
 *   mentions.txt              texte du pied de page, de la page contact et des mentions légales
 *   capture.json              synthèse : couleurs proposées, polices, logos, coordonnées repérées
 *
 * Le résultat sert à remplir brands/<id>/brand.json (voir references/marques.md).
 * Attention : pour un logo PNG/JPG, le « -rendu.png » de 2000 px n'est qu'un agrandissement ; garder le fichier
 * d'origine (logos/logo-N-zone.png) et chercher une version plus grande (srcset, URL sans paramètres de taille).
 */
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const [, , URL_HOME, OUT, URL_CONTACT, URL_LEGAL] = process.argv;
if (!URL_HOME || !OUT) {
  console.error("Usage : node capture_site.js <url> <dossier_sortie> [url_contact] [url_mentions]");
  process.exit(1);
}
fs.mkdirSync(path.join(OUT, "logos"), { recursive: true });
fs.mkdirSync(path.join(OUT, "fonts"), { recursive: true });

const COOKIE_TEXTS = /^(tout accepter|accepter( tout)?|j'accepte|accept( all)?|ok|alle accepteren|accepteren|akkoord|autoriser)$/i;

async function dismissCookies(page) {
  // Un seul aller-retour dans la page (rapide même si le site est lourd), budget de 5 s.
  const click = async (frame) => frame.evaluate((src) => {
    const re = new RegExp(src, "i");
    for (const b of document.querySelectorAll("button, a[role=button], [class*=accept], [id*=accept]")) {
      const r = b.getBoundingClientRect();
      if (r.width > 0 && r.height > 0 && re.test((b.innerText || "").trim())) { b.click(); return true; }
    }
    return false;
  }, COOKIE_TEXTS.source);
  const run = (async () => {
    for (const frame of page.frames()) {
      if (await click(frame).catch(() => false)) { await page.waitForTimeout(600); return true; }
    }
    return false;
  })();
  return Promise.race([run, new Promise((r) => setTimeout(() => r(false), 5000))]);
}

// Texte brut d'une page sans la rendre (repli quand le navigateur est bloqué par le site).
async function pageText(context, url) {
  const resp = await context.request.get(url, { timeout: 20000 });
  return (await resp.text()).replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ").replace(/<br\s*\/?>|<\/(p|div|li|h\d|tr)>/gi, "\n")
    .replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#039;|&rsquo;/g, "'")
    .replace(/[ \t]+/g, " ").replace(/\n\s*\n+/g, "\n");
}

const withTimeout = (p, ms, label) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error(`${label} : délai dépassé`)), ms))]);

async function open(page, url) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
  await dismissCookies(page);
  await page.waitForTimeout(800);
}

function extOf(url, contentType) {
  const m = (url.split("?")[0].match(/\.(svg|png|jpe?g|webp|gif|ico|avif)$/i) || [])[1];
  if (m) return m.toLowerCase().replace("jpeg", "jpg");
  if (/svg/.test(contentType || "")) return "svg";
  if (/png/.test(contentType || "")) return "png";
  if (/webp/.test(contentType || "")) return "webp";
  if (/jpe?g/.test(contentType || "")) return "jpg";
  return "bin";
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: "fr-BE" });
  const page = await context.newPage();
  const fontUrls = new Set();
  page.on("response", (r) => {
    const u = r.url();
    if (/\.(woff2?|ttf|otf)(\?|$)/i.test(u) || /font/i.test(r.headers()["content-type"] || "")) fontUrls.add(u);
  });

  await open(page, URL_HOME);
  const result = { url: page.url(), titre: await page.title() };

  // --- captures d'écran
  // Certains sites bloquent la capture Playwright (polices qui ne finissent jamais de charger) :
  // délai court, puis capture par le protocole DevTools, qui n'attend pas les polices.
  const cdp = await context.newCDPSession(page);
  const shot = async (file, opts = {}) => {
    try { await page.screenshot({ path: path.join(OUT, file), timeout: 20000, ...opts }); return; } catch (e) { /* repli */ }
    const clip = opts.clip || (opts.fullPage ? { x: 0, y: 0, width: 1440, height: await page.evaluate(() => Math.min(document.documentElement.scrollHeight, 9000)) } : null);
    const r = await cdp.send("Page.captureScreenshot", clip ? { format: "png", clip: { ...clip, scale: 1 }, captureBeyondViewport: true } : { format: "png" });
    fs.writeFileSync(path.join(OUT, file), Buffer.from(r.data, "base64"));
  };
  await shot("accueil-haut.png");
  // Défilement complet pour déclencher les images chargées à la demande, puis page entière.
  const fullH = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < fullH; y += 700) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(120); }
  await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(600);
  await shot("accueil-complet.png", { fullPage: true });
  const footer = await page.$("footer, [class*=footer], #footer");
  if (footer) await footer.screenshot({ path: path.join(OUT, "pied.png"), timeout: 15000 }).catch(() => {});

  console.error("· styles");
  // --- styles calculés des éléments clés
  result.styles = await page.evaluate(() => {
    const props = ["color", "backgroundColor", "backgroundImage", "fontFamily", "fontSize", "fontWeight",
      "textTransform", "letterSpacing", "borderRadius", "borderColor", "borderBottomColor"];
    const pick = (sel, n = 3) => [...document.querySelectorAll(sel)].filter((e) => {
      const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0;
    }).slice(0, n).map((e) => {
      const cs = getComputedStyle(e); const o = { selecteur: sel, texte: (e.innerText || "").trim().slice(0, 60) };
      props.forEach((p) => { o[p] = cs[p]; }); return o;
    });
    return {
      body: pick("body", 1), header: pick("header, [class*=header], #header", 2), nav: pick("nav, [class*=menu] a, nav a", 4),
      h1: pick("h1"), h2: pick("h2"), h3: pick("h3"), p: pick("main p, p", 2), a: pick("main a, a", 3),
      boutons: pick("a.btn, .btn, button, .button, [class*=btn], [class*=button], input[type=submit]", 6),
      footer: pick("footer, [class*=footer], #footer", 2),
    };
  });

  // --- variables CSS et polices déclarées
  result.variables_css = await page.evaluate(() => {
    const out = {};
    for (const sheet of [...document.styleSheets]) {
      let rules; try { rules = sheet.cssRules; } catch (e) { continue; }
      for (const r of [...rules]) {
        if (r.style && /(:root|html|body)/.test(r.selectorText || "")) {
          for (const name of [...r.style]) if (name.startsWith("--")) out[name] = r.style.getPropertyValue(name).trim();
        }
      }
    }
    return out;
  });
  result.polices_declarees = await page.evaluate(() => {
    const fams = new Set();
    document.fonts.forEach((f) => { if (f.status === "loaded") fams.add(`${f.family.replace(/["']/g, "")} ${f.weight}`); });
    return [...fams];
  });
  result.theme_color = await page.$eval("meta[name=theme-color]", (m) => m.content).catch(() => null);

  // --- couleurs : pondérées par surface (fonds) et par usage (texte, bordures)
  result.couleurs = await page.evaluate(() => {
    const toHex = (c) => {
      const m = c && c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/);
      if (!m || (m[4] !== undefined && parseFloat(m[4]) < 0.5)) return null;
      return "#" + [m[1], m[2], m[3]].map((x) => (+x).toString(16).padStart(2, "0")).join("").toUpperCase();
    };
    const fond = {}, texte = {}, bord = {};
    const zoneOf = (e) => e.closest("footer,[class*=footer]") ? "footer" : e.closest("header,nav,[class*=header]") ? "header" :
      e.closest("a.btn,.btn,button,.button,[class*=btn]") ? "bouton" : /^H[1-6]$/.test(e.tagName) ? "titre" : "page";
    const els = [...document.querySelectorAll("body *")].slice(0, 4000);
    for (const e of els) {
      const r = e.getBoundingClientRect(); if (r.width === 0 || r.height === 0) continue;
      const cs = getComputedStyle(e); const z = zoneOf(e);
      const bg = toHex(cs.backgroundColor);
      if (bg) { fond[bg] = fond[bg] || { surface: 0, zones: {} }; fond[bg].surface += Math.round(r.width * r.height); fond[bg].zones[z] = (fond[bg].zones[z] || 0) + 1; }
      if ((e.innerText || "").trim() && e.children.length === 0) {
        const c = toHex(cs.color); if (c) { texte[c] = texte[c] || { n: 0, zones: {} }; texte[c].n++; texte[c].zones[z] = (texte[c].zones[z] || 0) + 1; }
      }
      const bc = toHex(cs.borderBottomColor); if (bc && parseFloat(cs.borderBottomWidth) > 0) bord[bc] = (bord[bc] || 0) + 1;
      const grad = cs.backgroundImage && cs.backgroundImage.includes("gradient") ? cs.backgroundImage : null;
      if (grad) (fond["dégradés"] = fond["dégradés"] || []).push(grad);
    }
    return { fonds: fond, textes: texte, bordures: bord };
  });

  console.error("· logos");
  // --- logos
  const candidates = await page.evaluate(() => {
    const hasLogo = (e) => {
      for (let n = e, i = 0; n && i < 4; n = n.parentElement, i++) {
        const s = [n.id, n.className && n.className.baseVal !== undefined ? n.className.baseVal : n.className,
          n.getAttribute && n.getAttribute("alt"), n.getAttribute && n.getAttribute("aria-label"),
          n.getAttribute && n.getAttribute("src"), n.getAttribute && n.getAttribute("href") === "/" ? "home-link" : ""].join(" ").toLowerCase();
        if (s.includes("logo") || s.includes("brand") || s.includes("home-link")) return true;
      }
      return false;
    };
    const out = []; let i = 0;
    for (const e of document.querySelectorAll("img, svg, [style*=background-image]")) {
      if (e.tagName.toLowerCase() === "svg" && e.parentElement.closest("svg")) continue;
      const r = e.getBoundingClientRect();
      if (r.width < 24 || r.height < 10 || !hasLogo(e)) continue;
      const zone = e.closest("footer,[class*=footer]") ? "footer" : e.closest("header,nav,[class*=header]") ? "header" : "page";
      e.setAttribute("data-capture-logo", String(++i));
      out.push({ n: i, tag: e.tagName.toLowerCase(), zone, w: Math.round(r.width), h: Math.round(r.height),
        src: e.currentSrc || e.src || (getComputedStyle(e).backgroundImage.match(/url\("?([^")]+)/) || [])[1] || null,
        alt: e.getAttribute("alt") || "", svg: e.tagName.toLowerCase() === "svg" ? e.outerHTML : null });
    }
    return out.slice(0, 8);
  });
  result.logos = [];
  for (const c of candidates) {
    const base = `logo-${c.n}-${c.zone}`;
    const entry = { ...c, fichiers: [] }; delete entry.svg;
    if (c.svg) {
      let svg = c.svg.includes("xmlns=") ? c.svg : c.svg.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
      fs.writeFileSync(path.join(OUT, "logos", `${base}.svg`), svg); entry.fichiers.push(`logos/${base}.svg`);
    } else if (c.src && !c.src.startsWith("data:")) {
      try {
        const resp = await context.request.get(c.src, { timeout: 15000 });
        const ext = extOf(c.src, resp.headers()["content-type"]);
        fs.writeFileSync(path.join(OUT, "logos", `${base}.${ext}`), await resp.body()); entry.fichiers.push(`logos/${base}.${ext}`);
      } catch (e) { entry.erreur = String(e.message || e); }
    }
    // Rendu PNG transparent haute définition du logo tel qu'il s'affiche.
    try {
      const src = c.svg ? c.svg : c.src;
      const hd = await browser.newPage({ deviceScaleFactor: 1 });
      const width = 2000, height = Math.max(1, Math.round(2000 * c.h / c.w));
      const inner = c.svg
        ? c.svg.replace(/<svg([^>]*)>/, (m, a) => `<svg${a.replace(/\s(width|height)="[^"]*"/g, "")} width="${width}" height="${height}">`)
        : `<img src="${src}" style="width:${width}px;height:${height}px;object-fit:contain">`;
      await hd.setViewportSize({ width, height });
      await hd.setContent(`<html><body style="margin:0;background:transparent">${inner}</body></html>`, { waitUntil: "load", timeout: 20000 });
      await hd.screenshot({ path: path.join(OUT, "logos", `${base}-rendu.png`), omitBackground: true, clip: { x: 0, y: 0, width, height }, timeout: 20000 });
      entry.fichiers.push(`logos/${base}-rendu.png`); await hd.close();
    } catch (e) { entry.erreur_rendu = String(e.message || e); }
    // Capture du logo dans son contexte (montre la version claire/foncée utilisée).
    const el = await page.$(`[data-capture-logo="${c.n}"]`);
    if (el) { await el.screenshot({ path: path.join(OUT, "logos", `${base}-contexte.png`), timeout: 15000 }).catch(() => {}); }
    result.logos.push(entry);
  }
  console.error("· icônes");
  // Favicon / apple-touch-icon / og:image
  const icons = await page.evaluate(() => [...document.querySelectorAll("link[rel*=icon], meta[property='og:image']")]
    .map((e) => e.href || e.content).filter(Boolean).slice(0, 4));
  result.icones = [];
  for (const [k, u] of icons.entries()) {
    try {
      const resp = await context.request.get(u, { timeout: 15000 });
      const f = `logos/icone-${k + 1}.${extOf(u, resp.headers()["content-type"])}`;
      fs.writeFileSync(path.join(OUT, f), await resp.body()); result.icones.push({ source: u, fichier: f });
    } catch (e) { /* ignore */ }
  }

  console.error("· polices");
  // --- polices : fichiers chargés
  result.polices_fichiers = [];
  for (const u of fontUrls) {
    try {
      const resp = await context.request.get(u, { timeout: 15000 });
      const name = decodeURIComponent(u.split("?")[0].split("/").pop()).replace(/[^\w.-]/g, "_");
      fs.writeFileSync(path.join(OUT, "fonts", name), await resp.body()); result.polices_fichiers.push({ source: u, fichier: `fonts/${name}` });
    } catch (e) { /* ignore */ }
  }

  console.error("· mentions");
  // --- textes : pied de page, contact, mentions légales
  let mentions = `# Pied de page — ${result.url}\n` + (await page.evaluate(() => {
    const f = document.querySelector("footer, [class*=footer], #footer"); return f ? f.innerText : "";
  })) + "\n";
  for (const [label, u] of [["Contact", URL_CONTACT], ["Mentions légales", URL_LEGAL]]) {
    if (!u) continue;
    try {
      const txt = await withTimeout((async () => {
        await open(page, u);
        if (label === "Contact") await shot("contact.png");
        return page.evaluate(() => (document.querySelector("main") || document.body).innerText);
      })(), 60000, label);
      mentions += `\n# ${label} — ${page.url()}\n` + txt + "\n";
    } catch (e) {
      // Page bloquée dans le navigateur : texte relu directement (HTML sans rendu).
      try { mentions += `\n# ${label} — ${u} (texte brut)\n` + (await pageText(context, u)) + "\n"; }
      catch (e2) { mentions += `\n# ${label} — échec : ${e.message}\n`; }
    }
  }
  fs.writeFileSync(path.join(OUT, "mentions.txt"), mentions);
  const flat = mentions.replace(/\s+/g, " ");
  result.reperes = {
    bce: [...new Set((flat.match(/\b(?:BE\s?)?0?[0-9]{3}[.\s]?[0-9]{3}[.\s]?[0-9]{3}\b/g) || []))].slice(0, 5),
    ipi: [...new Set((flat.match(/IPI[^0-9]{0,20}([0-9][0-9.\s]{4,10}[0-9])/gi) || []))].slice(0, 5),
    emails: [...new Set(flat.match(/[\w.+-]+@[\w-]+\.[\w.]+/g) || [])].slice(0, 6),
    telephones: [...new Set(flat.match(/(?:\+32\s?|0)\d{1,3}[\s./]?\d{2,3}[\s./]?\d{2}[\s./]?\d{2,3}/g) || [])].slice(0, 6),
  };

  console.error("· synthèse");
  // --- synthèse couleurs proposées
  const isBrand = (h) => {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2;
    const s = mx === mn ? 0 : l > 0.5 ? (mx - mn) / (2 - mx - mn) : (mx - mn) / (mx + mn);
    return l > 0.06 && l < 0.94 && s > 0.15;
  };
  const scores = {};
  for (const [h, v] of Object.entries(result.couleurs.fonds)) if (h.startsWith("#") && isBrand(h)) scores[h] = (scores[h] || 0) + Math.sqrt(v.surface) + 40 * ((v.zones.bouton || 0) + (v.zones.header || 0));
  for (const [h, v] of Object.entries(result.couleurs.textes)) if (isBrand(h)) scores[h] = (scores[h] || 0) + 15 * v.n + 60 * ((v.zones.titre || 0) + (v.zones.bouton || 0));
  for (const [k, v] of Object.entries(result.variables_css)) {
    const m = v.match(/#[0-9a-f]{6}\b/i); if (m && isBrand(m[0].toUpperCase()) && /primary|brand|main|principal|accent|secondary/i.test(k)) scores[m[0].toUpperCase()] = (scores[m[0].toUpperCase()] || 0) + 500;
  }
  result.couleurs_classees = Object.entries(scores).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([hex, score]) => ({ hex, score: Math.round(score) }));

  fs.writeFileSync(path.join(OUT, "styles.json"), JSON.stringify(result.styles, null, 2));
  fs.writeFileSync(path.join(OUT, "couleurs.json"), JSON.stringify({ classees: result.couleurs_classees, ...result.couleurs }, null, 2));
  const synth = { ...result }; delete synth.styles; delete synth.couleurs;
  fs.writeFileSync(path.join(OUT, "capture.json"), JSON.stringify(synth, null, 2));
  console.log(JSON.stringify({ url: result.url, couleurs: result.couleurs_classees.slice(0, 5), polices: result.polices_declarees.slice(0, 6),
    logos: result.logos.map((l) => `${l.zone} ${l.w}x${l.h} ${l.fichiers.join(", ")}`), reperes: result.reperes }, null, 2));
  await browser.close();
})().catch((e) => { console.error("Échec de la capture :", e.message); process.exit(2); });
