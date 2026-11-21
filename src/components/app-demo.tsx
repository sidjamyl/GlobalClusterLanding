import type { CSSProperties } from "react";
import { ArrowRight, Bot, CircleCheck, FileText, ScanText } from "lucide-react";
import styles from "./app-demo.module.css";

const sales = [52, 65, 58, 76, 69, 88, 82, 72, 90, 85, 95, 100];
const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const suiteMetrics = [
  ["Ventes", "4,8 M DA", 4_800_000],
  ["Créances clients", "840 k DA", 840_000],
  ["Trésorerie", "1,6 M DA", 1_600_000],
] as const;
const families = [
  { name: "Matériel informatique", count: 42 },
  { name: "Mobilier", count: 36 },
  { name: "Outillage", count: 30 },
  { name: "Véhicules", count: 20 },
];
const accounts = [
  { code: "411", name: "Clients", debit: "1 260 000", credit: "540 000" },
  { code: "512", name: "Banques", debit: "980 000", credit: "428 000" },
  { code: "401", name: "Fournisseurs", debit: "420 000", credit: "1 272 000" },
  { code: "700", name: "Ventes", debit: "—", credit: "420 000" },
];
const workflow = [
  { label: "Réception", icon: FileText },
  { label: "Traitement", icon: ScanText },
  { label: "Approbation", icon: CircleCheck },
];

function Metrics({ items }: { items: readonly (readonly [string, string])[] }) {
  return (
    <dl className={styles.metrics}>
      {items.map(([label, value]) => (
        <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
      ))}
    </dl>
  );
}

function Suite({ featured }: { featured?: boolean }) {
  return (
    <>
      {featured ? (
        <dl className={styles.metrics}>
          {suiteMetrics.map(([label, value, amount]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>
                <span className="sr-only">{value}</span>
                <span aria-hidden="true" data-count={amount}>{value}</span>
              </dd>
            </div>
          ))}
        </dl>
      ) : <Metrics items={suiteMetrics.map(([label, value]) => [label, value])} />}
      <div className={styles.split}>
        <div className={styles.panel}>
          <strong>Ventes par mois</strong>
          <div className={styles.chart} role="img" aria-label="Ventes mensuelles en hausse sur l’exercice">
            {sales.map((value, index) => (
              <span key={index} style={{ "--level": value + "%", "--order": index } as CSSProperties} />
            ))}
          </div>
          <div className={styles.months} aria-hidden="true">{months.map((month, index) => <span key={index}>{month}</span>)}</div>
        </div>
        <div className={styles.panel}>
          <strong>Tendance des créances</strong>
          <svg className={styles.trend} viewBox="0 0 120 54" preserveAspectRatio="none" role="img" aria-label="Créances en baisse après un pic au milieu de l’exercice">
            <path d="M0 34 L12 30 L24 33 L36 23 L48 17 L60 20 L72 28 L84 24 L96 35 L108 39 L120 44 V54 H0Z" fill="#e0f3f0" />
            <path className={styles.line} d="M0 34 L12 30 L24 33 L36 23 L48 17 L60 20 L72 28 L84 24 L96 35 L108 39 L120 44" pathLength="1" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </>
  );
}

function Assets() {
  return (
    <>
      <div className={styles.split}>
        <div className={styles.panel}>
          <strong>Taux d’amortissement</strong>
          <div className={styles.ring} style={{ "--ring-target": "88%" } as CSSProperties}>
            <strong>88%</strong>
          </div>
          <p>112 actifs renseignés</p>
        </div>
        <div className={styles.panel}>
          <strong>Répartition par famille</strong>
          <dl className={styles.families}>
            {families.map(({ name, count }, index) => (
              <div key={name}>
                <dt>{name}</dt><dd>{count}</dd>
                <span aria-hidden="true">
                  <i style={{ "--level": count / 42 * 100 + "%", "--order": index } as CSSProperties} />
                </span>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <Metrics items={[["Total des actifs", "128"], ["Avec taux", "112"], ["Avec photo", "94"]]} />
    </>
  );
}

function Tax() {
  return (
    <>
      <Metrics items={[["Comptes", "4"], ["Total débit", "2,66 M DA"], ["Total crédit", "2,66 M DA"]]} />
      <div className={styles.panel}>
        <strong>Détail des comptes</strong>
        <table className={styles.balance} aria-label="Mouvements en dinars algériens">
          <thead><tr><th scope="col">Compte</th><th scope="col">Débit</th><th scope="col">Crédit</th></tr></thead>
          <tbody>
            {accounts.map(({ code, name, debit, credit }, index) => (
              <tr key={code} style={{ "--order": index } as CSSProperties}>
                <th scope="row"><span>{code}</span> {name}</th><td>{debit}</td><td>{credit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Connect() {
  return (
    <>
      <div className={styles.welcome}>
        <div><strong>Bienvenue sur GC Connect</strong><p>De la réception à la comptabilisation des pièces.</p></div>
        <Bot aria-hidden="true" />
      </div>
      <Metrics items={[["À traiter", "12"], ["En attente", "8"], ["Approuvés", "36"], ["Relevés", "4"]]} />
      <ol className={styles.workflow} aria-label="Parcours d’un document">
        {workflow.map(({ label, icon: Icon }, index) => (
          <li key={label} style={{ "--order": index } as CSSProperties}>
            <Icon aria-hidden="true" />
            <strong>{label}</strong>
            {index < workflow.length - 1 && <ArrowRight aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </>
  );
}

const screens = {
  suite: { title: "Tableau de bord activité", content: Suite },
  assets: { title: "Complétude des immobilisations", content: Assets },
  tax: { title: "Balance générale", content: Tax },
  connect: { title: "Accueil", content: Connect },
};

export function AppDemo({ app, featured }: { app: keyof typeof screens; featured?: boolean }) {
  const { title, content: Content } = screens[app];
  return (
    <div className={styles.demo} data-app-demo={app} data-featured={featured || undefined}>
      <div className={styles.screen}>
        <div className={styles.screenHeader}><strong>{title}</strong><span>Données fictives</span></div>
        <Content featured={featured} />
      </div>
    </div>
  );
}
