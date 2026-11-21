import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { AppPreviews } from "./app-previews";
import { Action } from "@/components/site";
import { company } from "@/lib/content";
import { HeroScroll } from "./hero-scroll";
import styles from "./home-hero.module.css";

export function HomeHero() {
  return (
    <HeroScroll><section className={styles.hero} aria-labelledby="home-hero-title">
      <div className={styles.halos} aria-hidden="true">
        <span /><span /><span />
      </div>
      <label className={styles.motion}>
        <input type="checkbox" aria-label="Suspendre les animations" />
        <Pause aria-hidden="true" /><Play aria-hidden="true" />
      </label>
      <div className={styles.composition}>
        <div className={styles.copy}>
          <h1 id="home-hero-title">
            <span>Tout votre</span>{" "}
            <span>environnement</span>{" "}
            <span>métier, au</span>{" "}
            <span>même endroit.</span>
          </h1>
          <p className={styles.intro}>D’une société à l’autre, retrouvez vos outils de gestion, de comptabilité et de paie.</p>
          <div className={styles.action}>
            <Action href={`mailto:${company.email}?subject=Demande%20de%20d%C3%A9mo%20%E2%80%94%20Global%20Cluster`}>
              Demander une démo
            </Action>
          </div>
        </div>

        <AppPreviews />
      </div>
    </section>
    <section className={styles.invoice} aria-label="Aperçu de GC Connect">
      <div className={styles.workspace}>
        <header><strong>GC Connect</strong><span>Réception et traitement des pièces</span></header>
        <Image unoptimized src="/assets/app-previews/connect.webp" alt="Écran GC Connect avec la réception, le traitement, l’approbation et la comptabilisation des pièces." width={1500} height={946} />
      </div>
    </section></HeroScroll>
  );
}
