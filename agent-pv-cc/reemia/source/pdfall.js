const { chromium } = require("playwright");
const fs = require("fs"); const path = require("path");
(async () => { const b = await chromium.launch(); const dir = process.argv[2];
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".html"))) {
    const p = await b.newPage();
    await p.goto("file://" + path.join(dir, f), { waitUntil: "networkidle", timeout: 60000 });
    await p.evaluate(() => document.fonts.ready);
    await p.pdf({ path: path.join(dir, f.replace(".html", ".pdf")), preferCSSPageSize: true, printBackground: true });
    await p.close(); }
  await b.close(); })();
