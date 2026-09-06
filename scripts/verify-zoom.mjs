import assert from "node:assert/strict";
// Browser zoom halves the CSS layout viewport and doubles DPR. CSS `zoom`
// alone does not update media queries and is not browser zoom emulation.
export async function verifyZoom(browser, origin, routes, directory) {
  const rows = [];
  for (const theme of ["light", "dark"]) {
    const context = await browser.newContext({
      viewport: { width: 720, height: 500 },
      deviceScaleFactor: 2,
      colorScheme: theme,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    for (const route of routes) {
      await page.goto(origin + route, { waitUntil: "networkidle" });
      const state = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        layoutWidth: innerWidth,
        dpr: devicePixelRatio,
      }));
      rows.push({
        route,
        theme,
        width: 1440,
        zoom: "200% browser-zoom layout emulation (720 CSS px, DPR 2)",
        ...state,
      });
      if (route === "/" || route === "/contact")
        await page.screenshot({
          path: `${directory}/${route === "/" ? "home" : "contact"}-${theme}-zoom200.png`,
          fullPage: true,
        });
      await page.getByRole("button", { name: "Ouvrir le menu" }).click();
      assert.equal(
        await page
          .getByRole("button", { name: "Fermer le menu" })
          .getAttribute("aria-expanded"),
        "true",
      );
      await page.keyboard.press("Escape");
    }
    await context.close();
  }
  assert.ok(rows.every((r) => !r.overflow));
  return rows;
}
