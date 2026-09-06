import { chromium } from "playwright";
import lighthouse from "lighthouse";
import fs from "node:fs/promises";
const browser = await chromium.launch({
  channel: "msedge",
  headless: true,
  args: ["--remote-debugging-port=9222"],
});
const results = [];
try {
  for (const [name, path] of [
    ["home", "/"],
    ["payroll", "/solutions/paie-rh"],
    ["contact", "/contact"],
  ]) {
    const result = await lighthouse("http://127.0.0.1:3000" + path, {
      port: 9222,
      output: ["json", "html"],
      logLevel: "error",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      formFactor: "mobile",
      screenEmulation: {
        mobile: true,
        width: 375,
        height: 812,
        deviceScaleFactor: 1,
        disabled: false,
      },
      throttlingMethod: "simulate",
    });
    const lhr = result.lhr;
    await fs.writeFile(
      `docs/verification/lighthouse-${name}.json`,
      result.report[0],
    );
    await fs.writeFile(
      `docs/verification/lighthouse-${name}.html`,
      result.report[1],
    );
    const summary = {
      route: path,
      environment: lhr.environment,
      config: lhr.configSettings,
      scores: Object.fromEntries(
        Object.entries(lhr.categories).map(([key, v]) => [
          key,
          Math.round(v.score * 100),
        ]),
      ),
      metrics: Object.fromEntries(
        [
          "first-contentful-paint",
          "largest-contentful-paint",
          "total-blocking-time",
          "cumulative-layout-shift",
          "speed-index",
        ].map((k) => [k, lhr.audits[k].displayValue]),
      ),
      opportunities: Object.values(lhr.audits)
        .filter(
          (a) =>
            a.score !== null &&
            a.score < 0.9 &&
            a.details?.type === "opportunity",
        )
        .map((a) => ({ title: a.title, display: a.displayValue })),
    };
    results.push(summary);
    console.log(
      JSON.stringify(
        { route: path, scores: summary.scores, metrics: summary.metrics },
        null,
        2,
      ),
    );
  }
} finally {
  await browser.close();
  await fs.writeFile(
    "docs/verification/performance.json",
    JSON.stringify(results, null, 2),
  );
}
