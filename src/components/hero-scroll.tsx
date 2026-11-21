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

export function HeroScroll({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const track = root.current!;
    const stage = track.firstElementChild as HTMLElement;
    const scene = stage.querySelector<HTMLElement>(`.${styles.composition}`)!;
    const copy = scene.querySelector<HTMLElement>(`.${styles.copy}`)!;
    const panel = stage.querySelector<HTMLElement>(`.${styles.invoice}`)!;
    const windowFrame = panel.querySelector<HTMLElement>(`.${styles.windowFrame}`)!;
    const cards = Array.from(scene.querySelectorAll<HTMLElement>("[data-preview]"));
    const connect = cards.find(card => card.dataset.preview === "connect")!;
    const docks = Array.from(panel.querySelectorAll<HTMLElement>("[data-dock]"));
    const docking = docks.map(dock => ({
      dock,
      card: cards.find(card => card.dataset.preview === dock.dataset.dock)!,
    }));
    const pause = stage.querySelector("input")!;
    const motion = matchMedia("(prefers-reduced-motion: reduce), (max-width: 900px), (pointer: coarse)");
    let frame = 0;
    let enabled = false;
    let stageOffset = 0;
    let distance = 1;

    function paint() {
      frame = 0;
      if (!enabled) return;
      const progress = Math.min(1, Math.max(0, (-stageOffset - track.getBoundingClientRect().top) / distance));
      stage.toggleAttribute("data-folding", progress > .01);
      const values = {
        "--copy-out": phase(progress, .015, .31),
        "--window-grow": phase(progress, .045, .55),
        "--frame-in": phase(progress, .04, .17),
        "--header-in": phase(progress, .24, .49),
        "--connect-out": phase(progress, .06, .34),
        "--dock": phase(progress, .16, .59),
        "--cards-out": phase(progress, .625, .74),
        "--document-in": phase(progress, .605, .73),
        "--details-in": phase(progress, .735, .82),
      };
      for (const [name, value] of Object.entries(values)) {
        stage.style.setProperty(name, String(value));
      }

      copy.inert = progress > .28;
      scene.inert = progress > .72;
      panel.inert = progress < .64;
      panel.dataset.invoiceState = progress >= .88 ? "approved" : progress >= .75 ? "extracted" : "received";
    }

    function queue() {
      if (enabled && !frame) frame = requestAnimationFrame(paint);
    }

    function measure() {
      enabled = !motion.matches && !pause.checked;
      track.toggleAttribute("data-scroll", enabled);
      if (!enabled) {
        stage.removeAttribute("data-folding");
        copy.inert = scene.inert = panel.inert = false;
        panel.dataset.invoiceState = "approved";
        return;
      }

      stageOffset = Math.max(0, stage.offsetHeight - window.innerHeight);
      stage.style.setProperty("--stage-offset", stageOffset + "px");
      distance = Math.max(1, track.offsetHeight - stage.offsetHeight);
      stage.setAttribute("data-measuring", "");
      const connectBox = connect.getBoundingClientRect();
      const windowBox = windowFrame.getBoundingClientRect();
      setGeometry(connect, connectBox, windowBox);
      setGeometry(windowFrame.parentElement!, windowBox, connectBox);
      for (const { card, dock } of docking) {
        const from = card.getBoundingClientRect();
        const slot = dock.getBoundingClientRect();
        const scale = Math.min(slot.width / from.width, slot.height / from.height);
        const height = from.height * scale;
        setGeometry(card, from, new DOMRect(
          slot.left, slot.top + (slot.height - height) / 2, from.width * scale, height,
        ));
      }
      stage.removeAttribute("data-measuring");
      paint();
    }

    const observer = new ResizeObserver(measure);
    observer.observe(scene);
    for (const card of cards) observer.observe(card);
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", measure);
    motion.addEventListener("change", measure);
    pause.addEventListener("change", measure);
    measure();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", measure);
      motion.removeEventListener("change", measure);
      pause.removeEventListener("change", measure);
    };
  }, []);
  return <div className={styles.track} ref={root}><div className={styles.stage}>{children}</div></div>;
}
