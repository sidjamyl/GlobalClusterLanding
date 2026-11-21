import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";
import assert from "node:assert/strict";
import { verifyZoom } from "./verify-zoom.mjs";
const origin = process.env.TEST_ORIGIN ?? "http://127.0.0.1:3000";
const routes = [
  "/",
  "/solutions/paie-rh",
  "/solutions/etats-financiers",
  "/solutions/gestion-pr",
  "/plateformes",
  "/documents",
  "/guides",
  "/contact",
];
const directory = "docs/verification";
await fs.mkdir(directory, { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const report = {
  date: new Date().toISOString(),
  browser: browser.version(),
  origin,
  matrix: [],
  interactions: [],
  errors: [],
  axe: [],
  redirects: [],
  media: [],
};
for (const theme of ["light", "dark"]) {
  const context = await browser.newContext({
    colorScheme: theme,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  page.on("pageerror", (e) => report.errors.push(e.message));
  page.on("console", (e) => {
    if (e.type() === "error") report.errors.push(e.text());
  });
  for (const width of [320, 375, 768, 1440])
    for (const route of routes) {
      await page.setViewportSize({ width, height: 900 });
      const response = await page.goto(origin + route, {
        waitUntil: "networkidle",
      });
      await page.evaluate(() => document.fonts.ready);
      // Trigger below-fold lazy images before a full-page capture.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 700) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 35));
        }
        window.scrollTo(0, 0);
      });
      await page.locator("img").evaluateAll(async (images) => {
        await Promise.all(images.map((i) => i.decode().catch(() => {})));
      });
      const state = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        h1: document.querySelectorAll("h1").length,
        brokenImages: [...document.images]
          .filter((i) => !i.complete || !i.naturalWidth)
          .map((i) => i.src),
        theme: document.documentElement.dataset.theme,
        title: document.title,
      }));
      const name = route === "/" ? "home" : route.split("/").at(-1);
      await page.screenshot({
        path: `${directory}/${name}-${theme}-${width}.png`,
        fullPage: true,
      });
      report.matrix.push({
        route,
        width,
        theme,
        status: response.status(),
        ...state,
      });
      if (width === 375 || width === 1440) {
        const axe = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze();
        report.axe.push({
          route,
          width,
          theme,
          violations: axe.violations.map((v) => ({
            id: v.id,
            impact: v.impact,
            nodes: v.nodes.map((n) => ({
              target: n.target,
              summary: n.failureSummary,
            })),
          })),
        });
      }
    }
  await fs.writeFile(
    `${directory}/results.json`,
    JSON.stringify(report, null, 2),
  );
  await context.close();
}
const context = await browser.newContext({
  viewport: { width: 375, height: 812 },
  colorScheme: "dark",
});
const page = await context.newPage();
await page.goto(origin);
assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
await page.getByLabel("Thème d’affichage").selectOption("light");
await page.reload();
assert.equal(await page.locator("html").getAttribute("data-theme"), "light");
await page.getByLabel("Thème d’affichage").selectOption("system");
assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
await page.emulateMedia({ colorScheme: "light" });
await page.waitForFunction(
  () => document.documentElement.dataset.theme === "light",
);
report.interactions.push(
  "System theme, persisted explicit theme after reload, and live system changes pass",
);
await page.getByRole("button", { name: "Ouvrir le menu" }).click();
await page
  .getByRole("navigation", { name: "Navigation principale" })
  .getByRole("link", { name: "Guides", exact: true })
  .click();
assert.equal(
  await page
    .getByRole("button", { name: "Ouvrir le menu" })
    .getAttribute("aria-expanded"),
  "false",
);
await page.getByRole("button", { name: "Ouvrir le menu" }).click();
await page.keyboard.press("Escape");
assert.equal(
  await page
    .getByRole("button", { name: "Ouvrir le menu" })
    .getAttribute("aria-expanded"),
  "false",
);
assert.equal(
  await page.evaluate(() =>
    document.activeElement?.getAttribute("aria-controls"),
  ),
  "main-navigation",
);
report.interactions.push(
  "Mobile menu opens, closes on navigation and Escape restores focus",
);
await page.goto(origin + "/solutions/paie-rh");
await page.locator(".feature-disclosure summary").first().focus();
await page.keyboard.press("Enter");
assert.equal(
  await page.locator(".feature-disclosure").first().getAttribute("open"),
  "",
);
report.interactions.push("Keyboard disclosure exposes payroll capabilities");
await page.goto(origin + "/documents");
assert.equal(
  await page.locator("video").first().getAttribute("preload"),
  "none",
);
const requests = [];
page.on("request", (r) => {
  if (r.url().endsWith(".mp4")) requests.push(r.url());
});
await page.waitForTimeout(300);
assert.equal(requests.length, 0);
await page.locator(".video-disclosure summary").first().click();
report.interactions.push("Video controls reveal on request; preload none");
await page.goto(origin + "/contact");
assert.equal(
  await page.locator(".contact-method").first().getAttribute("href"),
  "mailto:contact@globalcluster.net",
);
assert.equal(
  await page.locator(".contact-method").nth(1).getAttribute("href"),
  "tel:+213770291505",
);
report.interactions.push(
  "Email and normalized international telephone actions pass",
);
await page.goto(origin + "/plateformes");
for (const endpoint of [
  "https://globalcluster-dz.net/GlobalClusterPayroll",
  "https://globalcluster-dz.net/Etats_Financiers",
])
  assert.equal(
    await page.locator(`.platform-entry a[href="${endpoint}"]`).count(),
    1,
  );
report.interactions.push(
  "Exact external platform destinations; no Gestion PR endpoint",
);
await page.goto(origin);
await page.keyboard.press("Tab");
await page.getByRole("link", { name: "Aller au contenu" }).focus();
assert.notEqual(
  await page
    .getByRole("link", { name: "Aller au contenu" })
    .evaluate((e) => getComputedStyle(e).transform),
  "matrix(1, 0, 0, 1, 0, -80)",
);
report.interactions.push("Keyboard skip link reachable");
report.matrix.push(...(await verifyZoom(browser, origin, routes, directory)));
for (const [id, target] of Object.entries({
  244: "/solutions/paie-rh",
  450: "/solutions/etats-financiers",
  344: "/plateformes",
  416: "/documents",
  489: "/guides",
  165: "/contact",
})) {
  const r = await fetch(origin + "/?page_id=" + id + "&utm_source=legacy", {
    redirect: "manual",
  });
  const location = r.headers.get("location");
  report.redirects.push({ id, status: r.status, location });
  assert.equal(r.status, 308);
  assert.equal(new URL(location, origin).pathname, target);
  assert.equal(new URL(location, origin).search, "?utm_source=legacy");
  const final = await fetch(new URL(location, origin));
  assert.equal(final.status, 200);
}
const home = await fetch(origin + "/?utm_source=test");
assert.equal(home.status, 200);
assert.equal((await fetch(origin + "/missing-page")).status, 404);
report.interactions.push(
  "Homepage query stays homepage; missing route returns 404",
);
for (const p of [
  "/wp-content/uploads/2025/01/Global-Cluster-presentation-VF.pdf",
  "/wp-content/uploads/2025/02/GCP-FINALE-EN-2.mp4",
  "/wp-content/uploads/2025/04/Application-Mobile-Video.mp4",
  "/wp-content/uploads/2025/04/Tester-ici-la-version-gratuite-sur-un-mois-1.pdf",
  "/wp-content/uploads/2025/04/Creation-des-bulletins-V1.0.mp4",
]) {
  const r = await fetch(origin + p, { headers: { Range: "bytes=0-255" } });
  report.media.push({
    path: p,
    status: r.status,
    type: r.headers.get("content-type"),
    range: r.headers.get("content-range"),
  });
  await r.body.cancel();
}
await context.close();
const noJS = await browser.newContext({
  javaScriptEnabled: false,
  colorScheme: "dark",
});
const noPage = await noJS.newPage();
await noPage.goto(origin);
assert.equal(
  (await noPage.locator("h1").innerText()).replace(/\s+/g, " ").trim(),
  "Tout votre environnement métier, au même endroit.",
);
report.interactions.push(
  "Core homepage content visible with JavaScript disabled",
);
await noJS.close();
await browser.close();
await fs.writeFile(
  `${directory}/results.json`,
  JSON.stringify(report, null, 2),
);
console.log(
  JSON.stringify(
    {
      matrix: report.matrix.length,
      failures: report.matrix.filter(
        (r) => r.overflow || (r.h1 && r.h1 !== 1) || r.brokenImages?.length,
      ),
      axe: report.axe.filter((a) => a.violations.length),
      errors: [...new Set(report.errors)],
      media: report.media,
      interactions: report.interactions,
    },
    null,
    2,
  ),
);
assert.equal(
  report.matrix.filter(
    (r) => r.overflow || (r.h1 && r.h1 !== 1) || r.brokenImages?.length,
  ).length,
  0,
);
assert.equal(report.axe.filter((a) => a.violations.length).length, 0);
assert.equal(report.errors.length, 0);
assert.ok(report.media.every((r) => r.status === 206 || r.status === 200));
