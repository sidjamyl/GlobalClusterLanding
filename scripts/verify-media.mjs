import { chromium } from "playwright";
import fs from "node:fs/promises";
import assert from "node:assert/strict";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const results = [];
try {
  const page = await browser.newPage();
  await page.goto("http://127.0.0.1:3000/documents");
  for (const item of await page.locator(".video-disclosure").all()) {
    await item.locator("summary").click();
    const video = item.locator("video");
    await video.evaluate(async (v) => {
      v.muted = true;
      await v.play();
    });
    await page.waitForFunction(
      () =>
        [...document.querySelectorAll("video")].some(
          (v) => !v.paused && v.currentTime > 0,
        ),
      null,
      { timeout: 15000 },
    );
    const state = await video.evaluate((v) => ({
      source: v.currentSrc,
      duration: v.duration,
      time: v.currentTime,
      readyState: v.readyState,
      error: v.error?.message ?? null,
    }));
    assert.ok(state.time > 0 && !state.error);
    results.push(state);
    await video.evaluate((v) => v.pause());
    await item.locator("summary").click();
  }
  await page.goto("http://127.0.0.1:3000");
  const track = page.locator("[data-scroll]");
  await track.waitFor();
  await track.evaluate((el) => {
    window.scrollTo({ top: scrollY + el.getBoundingClientRect().top + 40, behavior: "instant" });
  });
  const triggerY = await page.evaluate(() => scrollY);
  const dashboard = page.getByRole("region", { name: "Aperçu du tableau de bord GC Suite" });
  await dashboard.waitFor();
  await page.waitForFunction(() => {
    const value = document.querySelector('[data-count="4800000"]').textContent.replace(/\D/g, "");
    return Number(value) > 0 && Number(value) < 4800000;
  });
  await page.waitForFunction(() =>
    document.querySelector('[data-count="4800000"]').textContent.replace(/\D/g, "") === "4800000"
    && Number(document.querySelector("[data-folding]").style.getPropertyValue("--feature-line")) === 1);
  assert.equal(await page.evaluate(() => scrollY), triggerY);
  assert.ok(await dashboard.getByText("Ventes par mois").isVisible());
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.locator("[data-folding]").waitFor({ state: "detached" });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("http://127.0.0.1:3000");
  assert.equal(
    await page
      .locator('section[aria-labelledby="home-hero-title"] article').first()
      .evaluate((e) => getComputedStyle(e).animationName),
    "none",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const hero = page.locator('section[aria-labelledby="home-hero-title"]');
  assert.equal(await page.locator("[data-scroll]").count(), 0);
  assert.equal(await hero.evaluate(el => el.getAnimations({ subtree: true }).length), 0);
  assert.equal(await hero.getByRole("combobox").count(), 0);
  assert.ok(await hero.locator('[data-preview="suite"]').getByText("Ventes par mois").isVisible());
  assert.ok(await hero.locator('[data-preview="connect"]').getByText("Bienvenue sur GC Connect").isVisible());
  results.push({
    reducedMotion:
      "Product preview entrance disabled",
  });
} finally {
  await browser.close();
  await fs.writeFile(
    "docs/verification/media-playback.json",
    JSON.stringify(results, null, 2),
  );
}
console.log(results);
