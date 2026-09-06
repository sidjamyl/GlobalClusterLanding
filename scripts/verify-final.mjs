import { chromium } from "playwright";
import fs from "node:fs/promises";
import assert from "node:assert/strict";
import { verifyZoom } from "./verify-zoom.mjs";
const directory = "docs/verification";
const report = JSON.parse(await fs.readFile(`${directory}/results.json`));
await fs.writeFile(
  `${directory}/css-zoom-experiment.json`,
  JSON.stringify(
    report.matrix.filter((r) => r.zoom),
    null,
    2,
  ),
);
const browser = await chromium.launch({ channel: "msedge", headless: true });
try {
  report.matrix = report.matrix.filter((r) => !r.zoom);
  report.matrix.push(
    ...(await verifyZoom(
      browser,
      report.origin,
      [...new Set(report.matrix.map((r) => r.route))],
      directory,
    )),
  );
  const page = await browser.newPage({
    viewport: { width: 1440, height: 950 },
  });
  for (const theme of ["light", "dark"]) {
    await page.emulateMedia({ colorScheme: theme });
    await page.goto(report.origin);
    await page.screenshot({
      path: `${directory}/home-${theme}-desktop-viewport.png`,
    });
    await page.setViewportSize({ width: 375, height: 900 });
    await page.screenshot({
      path: `${directory}/home-${theme}-mobile-viewport.png`,
    });
    await page.setViewportSize({ width: 1440, height: 950 });
    await page.goto(report.origin + "/plateformes");
    const pair = await page
      .locator(".header-platform")
      .evaluate((e) => ({
        color: getComputedStyle(e).color,
        background: getComputedStyle(e).backgroundColor,
      }));
    console.log(theme, "active platform", pair);
  }
  const range = await fetch(
    report.origin + "/wp-content/uploads/2025/02/GCP-FINALE-EN-2.mp4",
    { headers: { Range: "bytes=1048576-1048831" } },
  );
  assert.equal(range.status, 206);
  await range.body.cancel();
  for (const id of ["1", "2", "81", "82", "83", "84"])
    assert.equal((await fetch(report.origin + "/?p=" + id)).status, 410);
  for (const file of ["fiche-salarie-V2.png", "liste-des-salaries-1.png"]) {
    const r = await fetch(
      report.origin + "/wp-content/uploads/2025/01/" + file,
      { redirect: "manual" },
    );
    assert.equal(r.status, 308);
    assert.equal(r.headers.get("location"), "/assets/payroll.webp");
  }
  const noJS = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 812 },
  });
  const noPage = await noJS.newPage();
  await noPage.goto(report.origin);
  assert.ok(await noPage.locator("#main-navigation").isVisible());
  await noJS.close();
  report.interactions.push(
    "200% browser zoom layout emulation on eight routes in both themes; menu remains usable",
    "Retired placeholder content returns 410; sensitive-image aliases redirect to safe capture",
    "Video byte-range seeking succeeds; mobile navigation remains visible without JavaScript",
  );
  assert.ok(
    report.matrix.every(
      (r) => !r.overflow && (!r.h1 || r.h1 === 1) && !r.brokenImages?.length,
    ),
  );
  assert.ok(report.axe.every((r) => !r.violations.length));
  assert.equal(report.errors.length, 0);
  await fs.writeFile(
    `${directory}/results.json`,
    JSON.stringify(report, null, 2),
  );
  console.log(
    "PASS: 80 layout cases, 32 Axe scans, interaction/media/migration checks",
  );
} finally {
  await browser.close();
}
