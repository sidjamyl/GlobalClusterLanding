"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const demoLogoPairs = [
  [["IBM", "ibm", 512, 205], ["Oracle", "oracle", 512, 67]],
  [["GitHub", "github", 512, 139], ["Dropbox", "dropbox", 256, 218]],
  [["Slack", "slack", 512, 130], ["Figma", "figma", 256, 384]],
  [["Notion", "notion", 512, 178], ["Adobe", "adobe", 512, 134]],
  [["Stripe", "stripe", 512, 214], ["Atlassian", "atlassian", 256, 256]],
] as const;

const allowMotion = "(prefers-reduced-motion: no-preference)";

export function DemoLogoStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const setPaused = useRef<((paused: boolean) => void) | null>(null);
  const pausedByUser = useRef(false);
  const [paused, setPausedState] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const media = gsap.matchMedia();
    media.add(allowMotion, () => {
      let inView = false;
      const timeline = gsap.timeline({ paused: true, repeat: -1 });
      const slots = section.querySelectorAll("li");

      slots.forEach((slot, index) => {
        const [primary, alternate] = slot.querySelectorAll("img");
        const axis = index % 2 === 0 ? "xPercent" : "yPercent";
        const offset = index % 4 < 2 ? 115 : -115;
        const start = 2.1 + index * .105;
        const swap = (leaving: HTMLImageElement, entering: HTMLImageElement, time: number, distance: number) => {
          timeline.to(leaving, { [axis]: distance, autoAlpha: 0, duration: .35, ease: "power2.in" }, time);
          timeline.fromTo(entering,
            { [axis]: -distance, autoAlpha: 0 },
            { [axis]: 0, autoAlpha: 1, duration: .48, ease: "power3.out", immediateRender: false },
            time + .15,
          );
        };

        swap(primary, alternate, start, offset);
        swap(alternate, primary, start + 2.8, -offset);
      });

      const update = () => { timeline.paused(pausedByUser.current || !inView); };
      setPaused.current = (value) => {
        pausedByUser.current = value;
        update();
      };
      const observer = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        update();
      });
      observer.observe(section);
      section.dataset.motionReady = "true";

      return () => {
        observer.disconnect();
        setPaused.current = null;
        delete section.dataset.motionReady;
      };
    }, section);

    return () => media.revert();
  }, []);

  return (
    <section ref={sectionRef} className="sheet demo-logo-strip" aria-labelledby="demo-logos-title">
      <div className="demo-logo-heading">
        <p id="demo-logos-title">Logos de démonstration</p>
        <button
          type="button"
          className="demo-logo-toggle"
          aria-pressed={paused}
          aria-label="Pause du défilement des logos"
          onClick={() => {
            setPaused.current?.(!paused);
            setPausedState(!paused);
          }}
        >
          {paused ? "Reprendre" : "Pause"}
        </button>
      </div>
      <ul>
        {demoLogoPairs.map((pair) => (
          <li key={pair[0][1]}>
            {pair.map(([name, slug, width, height], index) => (
              <Image
                key={slug}
                src={`/assets/demo-logos/${slug}.svg`}
                alt={name}
                width={width}
                height={height}
                unoptimized
                data-logo-alternate={index === 1 ? "" : undefined}
              />
            ))}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function AccountingScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const copy = copyRef.current;
    if (!section || !copy) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add(allowMotion, () => {
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "center center",
          end: () => `+=${gsap.utils.clamp(340, 800, window.innerWidth * .53)}`,
          pin: true,
          scrub: .35,
          invalidateOnRefresh: true,
        },
      }).to(copy, { x: () => window.innerWidth, duration: 1, ease: "none" }, .18);
    }, section);

    return () => media.revert();
  }, []);

  return (
    <section ref={sectionRef} className="accounting-scroll-story" id="cloture" aria-labelledby="cloture-title">
      <div ref={copyRef} className="sheet accounting-scroll-copy">
        <h2 id="cloture-title">
          <span>Préparez votre clôture.</span>
          <span>Vérifiez chaque étape.</span>
        </h2>
        <p>Comparez les soldes, contrôlez les écritures et préparez vos états financiers avec GC Tax Reporting.</p>
      </div>
    </section>
  );
}
