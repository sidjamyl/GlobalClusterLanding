import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { Footer } from "@/components/site";
import "./globals.css";
import "./amber.css";
const manrope = localFont({
  src: "../../public/fonts/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://globalcluster.net"),
  title: {
    default: "GlobalCluster — Solutions de gestion pour entrepreneurs et ETI",
    template: "%s | GlobalCluster",
  },
  description:
    "Découvrez les solutions GlobalCluster : Paie et RH, états financiers et gestion des pièces de rechange. Accédez à vos plateformes et ressources.",
  robots:
    process.env.SITE_INDEXABLE === "true"
      ? { index: true, follow: true }
      : { index: false, follow: false },
  icons: { icon: "/wp-content/uploads/2022/12/logo_globalcluster-150x150.png" },
};
const themeScript = `try{var t=localStorage.getItem('gc-theme');document.documentElement.dataset.theme=t==='light'||t==='dark'?t:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch(e){document.documentElement.dataset.theme=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}`;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-scroll-behavior="smooth" lang="fr" suppressHydrationWarning className={manrope.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript>
          <style>
            {
              ".navigation{display:flex!important;flex-wrap:wrap}.menu-toggle,.theme-control{display:none!important}@media(max-width:850px){.navigation{flex-direction:column}}"
            }
          </style>
        </noscript>
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Aller au contenu
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
