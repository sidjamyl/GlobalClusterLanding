"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./home-hero.module.css";

const apps = [
  { id: "suite", name: "GC Suite", view: "Ventes et créances", width: 1500, height: 630 },
  { id: "tax", name: "GC Tax Reporting", view: "Suivi des validations", width: 1034, height: 640 },
  { id: "assets", name: "GC Assets", view: "Suivi des immobilisations", width: 1048, height: 440 },
  { id: "connect", name: "GC Connect", view: "Traitement des documents", width: 1500, height: 946 },
  { id: "payroll", name: "GC Payroll", view: "Accès depuis le portail", width: 508, height: 460 },
];

export function AppPreviews() {
  const [selected, setSelected] = useState("suite");
  return (
    <figure className={styles.showcase} aria-label="Captures des applications Global Cluster">
      <label className={styles.picker}>
        Application
        <select value={selected} onChange={(event) => setSelected(event.target.value)}>
          {apps.map(app => <option key={app.id} value={app.id}>{app.name}</option>)}
        </select>
      </label>
      {apps.map(app => (
        <article key={app.id} className={`${styles.preview} ${styles[app.id]}`} data-selected={app.id === selected}>
          <h2>{app.name}</h2>
          <Image unoptimized src={`/assets/app-previews/${app.id}.webp`} alt={app.view} width={app.width} height={app.height} />
        </article>
      ))}
    </figure>
  );
}
