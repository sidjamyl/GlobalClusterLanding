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
  const scrollHeroTo = (progress) => track.evaluate((el, progress) => {
    const stage = el.firstElementChild;
    const start = Math.min(0, innerHeight - stage.offsetHeight);
    window.scrollTo({
      top: scrollY + el.getBoundingClientRect().top - start
        + (el.offsetHeight - stage.offsetHeight) * progress,
      behavior: "instant",
    });
  }, progress);
  await scrollHeroTo(.60);
  await page.waitForFunction(() => [...document.querySelectorAll("[data-dock]")].every((dock) => {
    const slot = dock.getBoundingClientRect();
    const preview = document.querySelector(`[data-preview="${dock.dataset.dock}"]`);
    const card = preview.getBoundingClientRect();
    return Math.abs(slot.left - card.left) < 2 && Math.abs(slot.top + slot.height / 2 - card.top - card.height / 2) < 2
      && card.width <= slot.width + 2 && card.height <= slot.height + 2
      && Math.abs(card.width / card.height - preview.offsetWidth / preview.offsetHeight) < .02;
  }));
  await scrollHeroTo(.93);
  const invoice = page.getByRole("region", { name: /Aperçu de GC Connect/ });
  await invoice.getByText("Approuvée", { exact: true }).waitFor();
  assert.ok(await invoice.getByText("37", { exact: true }).isVisible());
  await scrollHeroTo(.81);
  await invoice.getByText("À approuver", { exact: true }).waitFor();
  assert.ok(await invoice.getByText("Atelier Atlas", { exact: true }).isVisible());
  assert.ok(await invoice.getByText("36", { exact: true }).isVisible());
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
  await hero.getByRole("combobox").selectOption("assets");
  const assets = hero.locator('article[data-selected="true"] [data-app-demo="assets"]');
  assert.ok(await assets.getByText("Complétude des immobilisations").isVisible());
  assert.ok(await assets.getByText("88%", { exact: true }).isVisible());
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
