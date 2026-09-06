import { NextRequest, NextResponse } from "next/server";
const destinations: Record<string, string> = {
  "244": "/solutions/paie-rh",
  "450": "/solutions/etats-financiers",
  "344": "/plateformes",
  "416": "/documents",
  "489": "/guides",
  "165": "/contact",
};
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const id = url.searchParams.get("page_id") ?? url.searchParams.get("p");
  if (id && ["1", "2", "81", "82", "83", "84"].includes(id))
    return new NextResponse(
      "Ce contenu de démonstration a été retiré. Retrouvez GlobalCluster sur https://globalcluster.net/",
      { status: 410, headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
  if (id && destinations[id]) {
    url.pathname = destinations[id];
    url.searchParams.delete("page_id");
    url.searchParams.delete("p");
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}
export const config = { matcher: ["/", "/index.php"] };
