import fs from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { createWriteStream } from "node:fs";
const extra = [
  "/wp-content/uploads/2025/01/Global-Cluster-presentation-VF.pdf",
  "/wp-content/uploads/2025/02/GCP-FINALE-EN-2.mp4",
  "/wp-content/uploads/2025/04/Application-Mobile-Video.mp4",
  "/wp-content/uploads/2025/04/Tester-ici-la-version-gratuite-sur-un-mois-1.pdf",
  "/wp-content/uploads/2025/04/Creation-des-bulletins-V1.0.mp4",
];
const urls = new Set(extra.map((p) => "https://globalcluster.net" + p));
for (const file of await fs.readdir("docs/sources")) {
  if (!file.startsWith("read-")) continue;
  for (const url of JSON.parse(await fs.readFile("docs/sources/" + file))
    .links ?? [])
    if (url.includes("/wp-content/uploads/"))
      urls.add(url.replace("http:", "https:"));
}
const results = [];
await Promise.all(
  [...urls].map(async (url) => {
    try {
      const target = "public" + new URL(url).pathname;
      await fs.mkdir(path.dirname(target), { recursive: true });
      const r = await fetch(url, { signal: AbortSignal.timeout(240000) });
      if (!r.ok) throw Error("HTTP " + r.status);
      await pipeline(r.body, createWriteStream(target));
      const size = (await fs.stat(target)).size;
      results.push({ url, path: target, size, status: 200 });
      console.log(path.basename(target), size);
    } catch (e) {
      results.push({ url, error: e.message });
      console.log("FAILED", url, e.message);
    }
  }),
);
await fs.writeFile(
  "docs/sources/assets.json",
  JSON.stringify(results, null, 2),
);
