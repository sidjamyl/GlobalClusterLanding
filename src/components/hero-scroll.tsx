"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./home-hero.module.css";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function HeroScroll({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const track = root.current!;
    const stage = track.firstElementChild as HTMLElement;
    const scene = stage.querySelector<HTMLElement>(`.${styles.composition}`)!;
    const rail = scene.querySelector("figure")!;
    const panel = stage.querySelector<HTMLElement>(`.${styles.invoice}`)!;
    const pause = stage.querySelector("input")!;
    const motion = matchMedia("(prefers-reduced-motion: reduce), (max-width: 900px), (pointer: coarse)");
    let frame = 0;
    let enabled = false;
    function paint() {
      frame = 0;
      if (!enabled) return;
      const distance = track.offsetHeight - stage.offsetHeight;
      const start = Math.min(0, innerHeight - stage.offsetHeight);
      const p = clamp((start - track.getBoundingClientRect().top) / Math.max(1, distance));
      const gather = clamp(p / .65);
      stage.toggleAttribute("data-folding", p > .02);
      stage.style.setProperty("--gather", String(gather * gather * (3 - 2 * gather)));
      stage.style.setProperty("--copy-alpha", String(1 - clamp(p / .28)));
      stage.style.setProperty("--card-alpha", String(1 - clamp((p - .41) / .26)));
      stage.style.setProperty("--invoice-alpha", String(clamp((p - .47) / .28)));
      scene.inert = p > .48;
      panel.inert = p < .55;
    }
    function queue() { if (enabled && !frame) frame = requestAnimationFrame(paint); }
    function measure() {
      enabled = !motion.matches && !pause.checked;
      track.toggleAttribute("data-scroll", enabled);
      if (!enabled) {
        scene.inert = panel.inert = false;
        return;
      }
      stage.style.top = Math.min(0, innerHeight - stage.offsetHeight) + "px";
      stage.style.setProperty("--gather", "0");
      const target = stage.getBoundingClientRect();
      for (const card of rail.querySelectorAll("article")) {
        const box = card.getBoundingClientRect();
        card.style.setProperty("--dx", target.left + target.width / 2 - box.left - box.width / 2 + "px");
        card.style.setProperty("--dy", target.top + target.height / 2 - box.top - box.height / 2 + "px");
      }
      paint();
    }
    const observer = new ResizeObserver(measure);
    observer.observe(scene);
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", measure);
    rail.addEventListener("scroll", measure, { passive: true });
    motion.addEventListener("change", measure);
    pause.addEventListener("change", measure);
    measure();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", measure);
      rail.removeEventListener("scroll", measure);
      motion.removeEventListener("change", measure);
      pause.removeEventListener("change", measure);
    };
  }, []);
  return <div className={styles.track} ref={root}><div className={styles.stage}>{children}</div></div>;
}
