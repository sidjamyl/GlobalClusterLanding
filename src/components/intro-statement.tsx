"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import styles from "./intro-statement.module.css";

const words = "Global Cluster vous aide à gérer la paie, à préparer vos états financiers et à suivre vos stocks depuis un même espace.".split(" ");

export function IntroStatement() {
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const title = heading.current;
    if (!title || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        title.removeAttribute("data-revealed");
      } else if (entry.intersectionRatio >= 0.35) {
        title.setAttribute("data-revealed", "");
      }
    }, { threshold: [0, 0.35] });
    observer.observe(title);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} aria-labelledby="intro-statement">
      <h2 id="intro-statement" ref={heading} className={styles.heading}>
        {words.map((word, index) => (
          <span key={index} style={{ "--word-index": index } as CSSProperties}>{word}{" "}</span>
        ))}
      </h2>
    </section>
  );
}
