import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
const assets = [];
async function walk(dir) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else if (!p.endsWith(".json")) {
      const data = await fs.readFile(p);
      assets.push({
        path: p.replaceAll("\\", "/"),
        bytes: data.length,
        sha256: createHash("sha256").update(data).digest("hex"),
        source: p.includes("wp-content")
          ? "https://globalcluster.net/" +
            path.relative("public", p).replaceAll("\\", "/")
          : p.includes("fonts")
            ? "@fontsource-variable/manrope 5.3.0 (OFL)"
            : p.includes("payroll")
              ? "Creation-salarie-1.png, WebP derivative"
              : "Indicateurs-EF-1.png, WebP derivative",
      });
    }
  }
}
await walk("public");
await fs.writeFile(
  "docs/asset-manifest.json",
  JSON.stringify(
    {
      generated: new Date().toISOString(),
      assets,
      privacyReplacements: [
        "/wp-content/uploads/2025/01/fiche-salarie-V2.png",
        "/wp-content/uploads/2025/01/liste-des-salaries-1.png",
      ].map((source) => ({
        source,
        destination: "/assets/payroll.webp",
        status: 308,
        originals: "docs/sources/originals/ (not served)",
      })),
    },
    null,
    2,
  ),
);
console.log(assets.length, "public assets inventoried");
