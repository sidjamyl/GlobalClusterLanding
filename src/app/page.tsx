import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Action } from "@/components/site";
import { HomeHero } from "@/components/home-hero";
import { IntroStatement } from "@/components/intro-statement";
import { InvoiceJourney, ProductExplorer } from "@/components/home-product";
import { company } from "@/lib/content";
import styles from "@/components/home-product.module.css";

export const metadata: Metadata = {
  title: { absolute: "Global Cluster — Tout votre environnement métier, au même endroit" },
  description: "Retrouvez vos applications de gestion pour chaque société dans Global Cluster. Demandez une démo.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <HomeHero />
      <IntroStatement />
      <InvoiceJourney />
      <ProductExplorer />
      <section className={styles.closing} aria-labelledby="demo-title">
        <div className={styles.wrap}>
          <div className={styles.closingInner}>
            <h2 id="demo-title">Voyons comment vous travaillez.</h2>
            <p>Apportez un exemple de dossier. On vous montre comment le traiter dans Global Cluster.</p>
            <Action href={`mailto:${company.email}?subject=Demande%20de%20d%C3%A9mo%20Global%20Cluster`}>Demander une démo</Action>
            <Link className={styles.textLink} href="/documents">Consulter les guides et supports <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
