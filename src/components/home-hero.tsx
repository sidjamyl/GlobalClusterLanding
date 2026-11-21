import { Check, FileText, Pause, Play, ScanText } from "lucide-react";
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
    <section className={styles.invoice} aria-label="Aperçu de GC Connect" data-invoice-state="approved">
      <div className={styles.workspace}>
        <div className={styles.windowFrame} aria-hidden="true" />
        <header className={styles.windowHeader}>
          <strong>GC Connect</strong><span>Données fictives</span>
        </header>
        <div className={styles.docks} aria-hidden="true">
          <div data-dock="suite" />
          <div data-dock="assets" />
          <div data-dock="tax" />
          <div data-dock="payroll" />
        </div>
        <div className={styles.invoiceBody}>
          <aside className={styles.invoiceNav} aria-label="Rubrique affichée">
            <span>Espace comptabilité</span>
            <strong><FileText aria-hidden="true" /> Documents reçus</strong>
          </aside>
          <div className={styles.invoiceContent}>
            <div className={styles.invoiceHeading}>
              <h2>Documents reçus</h2>
              <span className={styles.total}>
                <strong><span data-before-approval>36</span><span data-after-approval>37</span></strong> approuvées
              </span>
            </div>
            <ol className={styles.steps} aria-label="Étapes de la facture">
              <li data-step="received">Réception</li>
              <li data-step="extracted">Extraction</li>
              <li data-step="approved">Approbation</li>
            </ol>
            <div className={styles.document}>
              <div className={styles.documentRow}>
                <FileText aria-hidden="true" />
                <div><strong>Facture fournisseur</strong><span>FAC-024.pdf</span></div>
                <span className={styles.invoiceStatus} data-status="received">Reçue</span>
                <span className={styles.invoiceStatus} data-status="extracted">À approuver</span>
                <span className={styles.invoiceStatus} data-status="approved"><Check aria-hidden="true" /> Approuvée</span>
              </div>
              <div className={styles.extraction}>
                <div>
                  <strong><ScanText aria-hidden="true" /> Données extraites</strong>
                  <dl>
                    <div><dt>Fournisseur</dt><dd>Atelier Atlas</dd></div>
                    <div><dt>Montant TTC</dt><dd>84 500 DA</dd></div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </section></HeroScroll>
  );
}
