import fs from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import path from "node:path";
const inventory = JSON.parse(await fs.readFile("docs/sources/assets.json"));
for (const item of inventory.filter((i) => i.error)) {
  for (let attempt = 0; attempt < 3; attempt++)
    try {
      const r = await fetch(item.url, { signal: AbortSignal.timeout(180000) });
      if (!r.ok) throw Error("HTTP " + r.status);
      item.path = "public" + new URL(item.url).pathname;
      await fs.mkdir(path.dirname(item.path), { recursive: true });
      await pipeline(r.body, createWriteStream(item.path));
      item.size = (await fs.stat(item.path)).size;
      item.status = r.status;
      delete item.error;
      console.log(path.basename(item.path), item.size);
      break;
    } catch (e) {
      console.log("Retry", attempt, item.url, e.message);
    }
}
await fs.writeFile(
  "docs/sources/assets.json",
  JSON.stringify(inventory, null, 2),
);
