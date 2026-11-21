"use client";

import Image from "next/image";
import { useState } from "react";
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
  const [selected, setSelected] = useState("suite");
  return (
    <figure className={styles.showcase} aria-label="Aperçus des applications Global Cluster">
      <label className={styles.picker}>
        Application
        <select value={selected} onChange={(event) => setSelected(event.target.value)}>
          {apps.map(app => <option key={app.id} value={app.id}>{app.name}</option>)}
        </select>
      </label>
      {apps.map(app => (
        <article key={app.id} className={`${styles.preview} ${styles[app.id]}`} data-preview={app.id} data-selected={app.id === selected}>
          <h2>{app.name}</h2>
          {app.id === "payroll" ? (
            <Image unoptimized src="/assets/app-previews/payroll.webp" alt="Accès à GC Payroll depuis le portail" width={508} height={460} />
          ) : <AppDemo app={app.id} />}
        </article>
      ))}
    </figure>
  );
}
