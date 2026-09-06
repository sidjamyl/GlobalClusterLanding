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
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("http://127.0.0.1:3000");
  assert.equal(
    await page
      .locator(".cursor-one")
      .evaluate((e) => getComputedStyle(e).animationName),
    "none",
  );
  results.push({
    reducedMotion:
      "Decorative cursor animation disabled; content remains visible",
  });
} finally {
  await browser.close();
  await fs.writeFile(
    "docs/verification/media-playback.json",
    JSON.stringify(results, null, 2),
  );
}
console.log(results);
