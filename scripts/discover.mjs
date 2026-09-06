import fs from "node:fs/promises";
const targets = [
  ["documents", "https://globalcluster.net/?page_id=416"],
  [
    "pages",
    "https://globalcluster.net/?sitemap=posts&sitemap-subtype=page&paged=1",
  ],
  [
    "posts",
    "https://globalcluster.net/?sitemap=posts&sitemap-subtype=post&paged=1",
  ],
  [
    "rest",
    "https://globalcluster.net/index.php?rest_route=/wp/v2/pages&per_page=100",
  ],
  ["payroll-platform", "https://globalcluster-dz.net/GlobalClusterPayroll"],
  ["finance-platform", "https://globalcluster-dz.net/Etats_Financiers"],
];
await Promise.all(
  targets.map(async ([name, url]) => {
    for (let i = 0; i < 3; i++)
      try {
        const r = await fetch(url, { signal: AbortSignal.timeout(30000) });
        const html = await r.text();
        await fs.writeFile("docs/sources/" + name + ".txt", html);
        console.log(name, r.status, r.url, html.length);
        if (name === "documents") {
          await fs.writeFile(
            "docs/sources/read-4.json",
            JSON.stringify(
              {
                url,
                status: r.status,
                text: html
                  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
                  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
                  .replace(/<[^>]+>/g, " ")
                  .replace(/\s+/g, " "),
                links: [
                  ...new Set(
                    [...html.matchAll(/(?:href|src)=["']([^"']+)/g)].map(
                      (m) => m[1],
                    ),
                  ),
                ],
              },
              null,
              2,
            ),
          );
        }
        break;
      } catch (e) {
        console.log(name, i, e.message);
      }
  }),
);
