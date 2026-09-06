import fs from "node:fs/promises";
const pages = [
  "",
  "?page_id=244",
  "?page_id=450",
  "?page_id=344",
  "?page_id=416",
  "?page_id=489",
  "wp-sitemap.xml",
  "robots.txt",
  "wp-json/wp/v2/pages?per_page=100",
];
await Promise.all(
  pages.map(async (path, i) => {
    try {
      const r = await fetch("https://globalcluster.net/" + path);
      const html = await r.text();
      await fs.writeFile(`docs/sources/source-${i}.txt`, html);
      const links = [...html.matchAll(/(?:href|src)=["']([^"']+)/g)].map(
        (m) => m[1],
      );
      const plain = html
        .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
        .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ");
      await fs.writeFile(
        `docs/sources/read-${i}.json`,
        JSON.stringify(
          {
            url: r.url,
            status: r.status,
            text: plain,
            links: [...new Set(links)],
          },
          null,
          2,
        ),
      );
      console.log(i, r.status, html.length);
    } catch (e) {
      console.log(i, e.message);
    }
  }),
);
