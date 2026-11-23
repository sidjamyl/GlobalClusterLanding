"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowDownToLine, ArrowRight, Building2, ChartNoAxesCombined, FileText, Landmark, Layers3, ScanLine, ShieldCheck, UsersRound } from "lucide-react";
import { AppDemo } from "./app-demo";
import styles from "./home-product.module.css";

const steps = [
  { title: "Réception", description: "La facture fournisseur rejoint les pièces à traiter dans GC Connect.", status: "Reçue", icon: ArrowDownToLine },
  { title: "Extraction", description: "Le fournisseur, la référence et les montants sont prêts à être contrôlés.", status: "À contrôler", icon: ScanLine },
  { title: "Approbation", description: "Après vérification, la pièce est approuvée et prête pour la comptabilisation.", status: "Approuvée", icon: ShieldCheck },
];

export function InvoiceJourney() {
  const [index, setIndex] = useState(0);
  const step = steps[index];

  return (
    <section className={styles.journey} aria-labelledby="invoice-title">
      <div className={styles.wrap}>
        <header className={styles.journeyHeading}>
          <p className={styles.eyebrow}>GC Connect</p>
          <h2 id="invoice-title">De la facture reçue<br />à la pièce approuvée.</h2>
        </header>
        <div className={styles.journeyLayout}>
          <div className={styles.steps} role="group" aria-label="Étapes de la facture">
            {steps.map(({ title, description, icon: Icon }, position) => (
              <button key={title} type="button" aria-pressed={position === index} onClick={() => setIndex(position)}>
                <Icon size={20} aria-hidden="true" />
                <span><strong>{title}</strong><span>{description}</span></span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className={styles.stage}>
            <div className={styles.stageHeader}><span><FileText size={15} aria-hidden="true" /> Pièces fournisseurs</span><span>Démo interactive</span></div>
            <div className={styles.artwork} data-step={index}>
              <div className={styles.paper} aria-hidden="true">
                <div className={styles.paperTop}><Building2 size={21} /><span>ATELIER ATLAS</span></div>
                <div className={styles.paperTitle}>Facture <small>FAC-2026-024</small></div>
                <div className={styles.paperLine}><span>Maintenance atelier</span><strong>100 000 DA</strong></div>
                <div className={styles.paperLine}><span>TVA 19 %</span><strong>19 000 DA</strong></div>
                <div className={styles.paperTotal}><span>Total TTC</span><strong>119 000 DA</strong></div>
              </div>
              <div className={styles.record}>
                <div className={styles.recordTop}>
                  <FileText size={20} aria-hidden="true" />
                  <div><strong>FAC-2026-024.pdf</strong><small>Facture fournisseur fictive</small></div>
                </div>
                <p className={styles.status} aria-live="polite"><span key={step.status}>{step.status}</span></p>
                {index > 0 && (
                  <dl className={styles.fields}>
                    <div><dt>Fournisseur</dt><dd>Atelier Atlas</dd></div>
                    <div><dt>Total TTC</dt><dd>119 000 DA</dd></div>
                  </dl>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const apps = [
  { id: "suite", name: "GC Suite", title: "Suivre l’activité", description: "Consultez vos ventes, vos créances clients et votre trésorerie dans la même vue.", icon: ChartNoAxesCombined },
  { id: "connect", name: "GC Connect", title: "Traiter les pièces comptables", description: "Suivez la réception, le traitement et l’approbation de vos justificatifs.", icon: FileText },
  { id: "assets", name: "GC Assets", title: "Suivre les immobilisations", description: "Visualisez la répartition de vos actifs et l’état de leur amortissement.", icon: Layers3 },
  { id: "tax", name: "GC Tax Reporting", title: "Préparer les états financiers", description: "Vérifiez les comptes et les totaux de votre balance avant de préparer vos états.", icon: Landmark, href: "/solutions/etats-financiers" },
  { id: "payroll", name: "GC Payroll", title: "Préparer la paie", description: "Retrouvez les dossiers salariés, les variables de paie et l’historique des bulletins.", icon: UsersRound, href: "/solutions/paie-rh" },
] as const;

export function ProductExplorer() {
  const [index, setIndex] = useState(0);
  const app = apps[index];
  const href = "href" in app ? app.href : "/plateformes";

  return (
    <section id="solutions" className={styles.explorer} aria-labelledby="product-title">
      <div className={styles.wrap}>
        <header className={styles.explorerHeading}>
          <p className={styles.eyebrow}>Les applications</p>
          <h2 id="product-title">Explorez vos outils de gestion.</h2>
        </header>
        <div className={styles.appGrid}>
          <div className={styles.appControls} role="group" aria-label="Choisir une application">
            {apps.map(({ name, icon: Icon }, position) => (
              <button key={name} type="button" aria-pressed={position === index} onClick={() => setIndex(position)}>
                <Icon size={19} aria-hidden="true" />{name}
              </button>
            ))}
          </div>
          <div key={app.id} className={styles.appPanel} aria-label={app.name}>
            <div className={styles.appCopy}>
              <h3>{app.title}</h3>
              <p>{app.description}</p>
              <Link className={styles.textLink} href={href}>
                {"href" in app ? "Découvrir la solution" : "Voir les plateformes"} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className={styles.appWindow}>
              <div className={styles.appHeader}><span aria-hidden="true"><i /><i /><i /></span><strong>{app.name}</strong></div>
              {app.id === "payroll" ? (
                <Image src="/assets/payroll.webp" alt="Interface GC Payroll pour la création d’une fiche salarié" width={1520} height={771} sizes="(max-width: 700px) 90vw, 750px" />
              ) : <AppDemo app={app.id} />}
            </div>
          </div>
        </div>
        <Link className={styles.textLink} href="/solutions/gestion-pr">Découvrir la gestion des pièces de rechange <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
