import { LayoutDashboard, Pause, Play, UsersRound, Wallet } from "lucide-react";
import { AppDemo } from "./app-demo";
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
      <section className={styles.dashboard} aria-label="Aperçu du tableau de bord GC Suite">
        <div className={styles.workspace}>
          <div className={styles.windowFrame} aria-hidden="true" />
          <header className={styles.windowHeader}>
            <strong>GC Suite</strong><span>Exercice 2026</span>
          </header>
          <div className={styles.docks} aria-hidden="true">
            <div data-dock="tax" />
            <div data-dock="assets" />
            <div data-dock="connect" />
            <div data-dock="payroll" />
          </div>
          <div className={styles.dashboardBody}>
            <aside className={styles.dashboardNav} aria-label="Rubriques GC Suite">
              <strong><LayoutDashboard aria-hidden="true" /> Vue d’ensemble</strong>
              <span><UsersRound aria-hidden="true" /> Créances clients</span>
              <span><Wallet aria-hidden="true" /> Trésorerie</span>
            </aside>
            <AppDemo app="suite" featured />
          </div>
        </div>
      </section>
    </section></HeroScroll>
  );
}
