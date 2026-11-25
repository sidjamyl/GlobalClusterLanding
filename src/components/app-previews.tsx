import Image from "next/image";
import { AppDemo } from "./app-demo";
import styles from "./home-hero.module.css";

const apps = [
  { id: "suite", name: "GC Suite" },
  { id: "tax", name: "GC Tax Reporting" },
  { id: "assets", name: "GC Assets" },
  { id: "connect", name: "GC Connect" },
  { id: "payroll", name: "GC Payroll" },
] as const;

export function AppPreviews() {
  return (
    <figure className={styles.showcase} aria-label="Aperçus des applications Global Cluster">
      {apps.map(app => (
        <article key={app.id} className={`${styles.preview} ${styles[app.id]}`} data-preview={app.id}>
          <h2>{app.name}</h2>
          {app.id === "payroll" ? (
            <Image unoptimized src="/assets/app-previews/payroll.webp" alt="Accès à GC Payroll depuis le portail" width={508} height={460} />
          ) : <AppDemo app={app.id} />}
        </article>
      ))}
    </figure>
  );
}
