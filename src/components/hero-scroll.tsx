"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./home-hero.module.css";

function phase(progress: number, start: number, end: number) {
  const t = Math.min(1, Math.max(0, (progress - start) / (end - start)));
  return t * t * (3 - 2 * t);
}

function setGeometry(element: HTMLElement, from: DOMRect, to: DOMRect) {
  element.style.setProperty("--dx", to.left - from.left + "px");
  element.style.setProperty("--dy", to.top - from.top + "px");
  element.style.setProperty("--sx", String(to.width / from.width));
  element.style.setProperty("--sy", String(to.height / from.height));
}

const duration = 2600;
const formatDinars = new Intl.NumberFormat("fr-DZ");

export function HeroScroll({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const track = root.current!;
    const stage = track.firstElementChild as HTMLElement;
    const scene = stage.querySelector<HTMLElement>(`.${styles.composition}`)!;
    const copy = scene.querySelector<HTMLElement>(`.${styles.copy}`)!;
    const panel = stage.querySelector<HTMLElement>(`.${styles.dashboard}`)!;
    const workspace = panel.querySelector<HTMLElement>(`.${styles.workspace}`)!;
    const windowFrame = panel.querySelector<HTMLElement>(`.${styles.windowFrame}`)!;
    const cards = Array.from(scene.querySelectorAll<HTMLElement>("[data-preview]"));
    const suite = cards.find(card => card.dataset.preview === "suite")!;
    const docks = Array.from(panel.querySelectorAll<HTMLElement>("[data-dock]"), dock => ({
      dock,
      card: cards.find(card => card.dataset.preview === dock.dataset.dock)!,
    }));
    const counts = Array.from(panel.querySelectorAll<HTMLElement>("[data-count]"), (element) => ({
      element,
      amount: Number(element.dataset.count),
    }));
    const pause = stage.querySelector("input")!;
    const motion = matchMedia("(prefers-reduced-motion: reduce), (max-width: 900px), (pointer: coarse)");
    let frame = 0;
    let start: number | null = null;
    let enabled = false;

    function setCounts(progress: number) {
      for (const [index, { element, amount }] of counts.entries()) {
        const fraction = phase(progress, .43 + index * .035, .88 + index * .035);
        const value = Math.round(amount * fraction / 100) * 100;
        const text = formatDinars.format(value) + " DA";
        if (element.textContent !== text) element.textContent = text;
      }
    }

    function paint(progress: number) {
      stage.toggleAttribute("data-folding", progress > 0 && enabled);
      const values = {
        "--copy-out": phase(progress, .015, .30),
        "--window-grow": phase(progress, .035, .43),
        "--frame-in": phase(progress, .05, .17),
        "--header-in": phase(progress, .25, .43),
        "--suite-out": phase(progress, .09, .36),
        "--dock": phase(progress, .09, .46),
        "--cards-out": phase(progress, .39, .54),
        "--dashboard-in": phase(progress, .40, .56),
        "--feature-bars": phase(progress, .46, .94),
        "--feature-line": phase(progress, .51, .96),
      };
      for (const [name, value] of Object.entries(values)) {
        stage.style.setProperty(name, String(value));
      }
      copy.inert = enabled && progress > .24;
      scene.inert = enabled && progress > .52;
      panel.inert = enabled && progress < .49;
      setCounts(progress);
    }

    function tick(now: number) {
      if (start === null) return;
      const progress = Math.min(1, (now - start) / duration);
      paint(progress);
      frame = progress < 1 ? requestAnimationFrame(tick) : 0;
    }

    function reset() {
      cancelAnimationFrame(frame);
      frame = 0;
      start = null;
      paint(enabled ? 0 : 1);
    }

    function checkTrigger() {
      if (!enabled) return;
      const bounds = track.getBoundingClientRect();
      if (start !== null && bounds.top >= 0) reset();
      if (start === null && bounds.top < -28 && bounds.bottom > 0) {
        start = performance.now();
        frame = requestAnimationFrame(tick);
      }
    }

    function measure() {
      const active = !motion.matches && !pause.checked;
      if (active !== enabled) {
        enabled = active;
        track.toggleAttribute("data-scroll", enabled);
        reset();
      }
      if (!enabled) return;
      const stageOffset = Math.max(0, stage.offsetHeight - innerHeight);
      stage.style.setProperty("--stage-offset", stageOffset + "px");
      stage.setAttribute("data-measuring", "");
      const suiteBox = suite.getBoundingClientRect();
      const windowBox = windowFrame.getBoundingClientRect();
      setGeometry(suite, suiteBox, windowBox);
      setGeometry(workspace, windowBox, suiteBox);
      for (const { card, dock } of docks) {
        const from = card.getBoundingClientRect();
        const slot = dock.getBoundingClientRect();
        const scale = Math.min(slot.width / from.width, slot.height / from.height);
        const width = from.width * scale;
        const height = from.height * scale;
        setGeometry(card, from, new DOMRect(
          slot.left + (slot.width - width) / 2, slot.top + (slot.height - height) / 2, width, height,
        ));
      }
      stage.removeAttribute("data-measuring");
      checkTrigger();
    }

    const observer = new ResizeObserver(measure);
    observer.observe(scene);
    for (const card of cards) observer.observe(card);
    window.addEventListener("scroll", checkTrigger, { passive: true });
    window.addEventListener("resize", measure);
    motion.addEventListener("change", measure);
    pause.addEventListener("change", measure);
    measure();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", checkTrigger);
      window.removeEventListener("resize", measure);
      motion.removeEventListener("change", measure);
      pause.removeEventListener("change", measure);
    };
  }, []);
  return <div className={styles.track} ref={root}><div className={styles.stage}>{children}</div></div>;
}
