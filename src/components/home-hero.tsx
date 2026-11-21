import type { ReactNode } from "react";
import localFont from "next/font/local";
import {
  Pause,
  Play,
  Boxes,
  ChartNoAxesColumnIncreasing,
  ClipboardList,
  FileCheck2,
  ReceiptText,
} from "lucide-react";
import { Action } from "@/components/site";
import { company } from "@/lib/content";
import { HeroScroll } from "./hero-scroll";
import styles from "./home-hero.module.css";

const newsreader = localFont({
  src: "../../public/fonts/newsreader-latin-wght-normal.woff2",
  display: "swap",
  weight: "200 800",
});

function Preview({ app, title, icon, className, children }: {
  app: string;
  title: string;
  icon: ReactNode;
  className: string;
  children: ReactNode;
}) {
  return (
    <article className={`${styles.preview} ${className}`}>
      <div className={styles.appName}>{icon} {app}</div>
      <h2>{title}</h2>
      {children}
    </article>
  );
}

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
          <h1 id="home-hero-title" className={newsreader.className}>
            <span>Tout votre</span>{" "}
            <span>environnement</span>{" "}
            <span>métier, au</span>{" "}
            <span><em>même endroit.</em></span>
          </h1>
          <p className={styles.intro}>D’une société à l’autre, retrouvez vos outils de gestion, de comptabilité et de paie.</p>
          <div className={styles.action}>
            <Action href={`mailto:${company.email}?subject=Demande%20de%20d%C3%A9mo%20%E2%80%94%20Global%20Cluster`}>
              Demander une démo
            </Action>
          </div>
        </div>

        <figure className={styles.showcase} tabIndex={0} aria-label="Aperçus des cinq applications, données fictives">
          <Preview app="GC Suite" title="Ventes mensuelles" icon={<ChartNoAxesColumnIncreasing aria-hidden="true" />} className={styles.suite}>
            <p className={styles.amount}>2,48 M <span>DA</span></p>
            <div className={styles.chart} aria-hidden="true">
              <svg viewBox="0 0 240 76" preserveAspectRatio="none">
                <defs><linearGradient id="sales-fill" x2="0" y2="1" gradientUnits="objectBoundingBox"><stop stopColor="#ff9d69" stopOpacity=".6" /><stop offset="1" stopColor="#ff9d69" stopOpacity=".02" /></linearGradient></defs>
                <path d="M0 62 C18 62 22 46 39 50 S64 65 84 40 S110 47 130 31 S157 43 180 22 S209 34 237 7 V76 H0Z" fill="url(#sales-fill)" />
                <path className={styles.trace} pathLength="1" d="M0 62 C18 62 22 46 39 50 S64 65 84 40 S110 47 130 31 S157 43 180 22 S209 34 237 7" fill="none" stroke="#ffae83" strokeWidth="2.5" />
                <circle cx="236" cy="8" r="3.3" fill="#ffe4c9" />
              </svg>
            </div>
            <div className={styles.chartLabels}><span>Mai</span><span>Octobre</span></div>
          </Preview>
          <Preview app="GC Tax Reporting" title="Validation de la liasse" icon={<ClipboardList aria-hidden="true" />} className={styles.tax}>
            <p className={styles.amount}>12 <span>/ 19 approuvés</span></p>
            <div className={styles.progress} aria-hidden="true"><span /></div>
            <p className={styles.secondary}>7 tableaux à valider</p>
          </Preview>
          <Preview app="GC Assets" title="Parc d’immobilisations" icon={<Boxes aria-hidden="true" />} className={styles.assets}>
            <dl className={styles.rows}>
              <div><dt>Matériel</dt><dd>24</dd></div>
              <div><dt>Véhicules</dt><dd>8</dd></div>
              <div><dt>Mobilier</dt><dd>16</dd></div>
            </dl>
          </Preview>
          <Preview app="GC Connect" title="Facture fournisseur" icon={<FileCheck2 aria-hidden="true" />} className={styles.connect}>
            <div className={styles.document}>
              <div className={styles.paper} aria-hidden="true"><ReceiptText /><i /><i /><i /></div>
              <div><strong>FA–024</strong><span>À vérifier</span></div>
            </div>
          </Preview>
          <Preview app="GC Payroll" title="Bulletin de paie" icon={<ReceiptText aria-hidden="true" />} className={styles.payroll}>
            <div className={styles.period}>
              <span>Net à payer · Octobre</span><strong>84 500 DA</strong>
            </div>
          </Preview>

        </figure>
        <p className={styles.caption}>Aperçus des applications · Données fictives</p>
      </div>
    </section>
    <section className={styles.invoice} aria-label="Aperçu de la vérification d’une facture dans GC Connect">
      <div className={styles.workspace}>
        <header><strong>GC Connect</strong><span>Documents reçus</span></header>
        <div className={styles.inspector}>
          <div className={styles.sheet}>
            <small>Société Atlas</small><h2>Facture</h2><p>FA–024 · 15 octobre</p>
            <dl><div><dt>Prestation</dt><dd>Maintenance</dd></div><div><dt>Total TTC</dt><dd>119 000 DA</dd></div></dl>
          </div>
          <div className={styles.fields}>
            <small>À vérifier</small><h3>Données extraites</h3>
            <dl><div><dt>Fournisseur</dt><dd>Société Atlas</dd></div><div><dt>Référence</dt><dd>FA–024</dd></div><div><dt>Montant TTC</dt><dd>119 000 DA</dd></div></dl>
          </div>
        </div>
      </div>
      <p>Aperçu illustratif · Facture fictive</p>
    </section></HeroScroll>
  );
}
