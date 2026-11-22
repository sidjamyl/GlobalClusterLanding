"use client";

import { useEffect, useRef } from "react";

export function SolutionsHeading() {
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const title = heading.current;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    if (!title || reducedMotion.matches) return;

    let animation: Animation | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (!reducedMotion.matches) {
        animation = title.animate(
          [{ filter: "blur(8px)" }, { filter: "blur(0px)" }],
          { duration: 650, easing: "cubic-bezier(.23, 1, .32, 1)" },
        );
      }
    }, { threshold: 0.3 });
    observer.observe(title);

    const cancel = () => {
      if (reducedMotion.matches) animation?.cancel();
    };
    reducedMotion.addEventListener("change", cancel);
    return () => {
      observer.disconnect();
      animation?.cancel();
      reducedMotion.removeEventListener("change", cancel);
    };
  }, []);

  return <h2 ref={heading}>À chaque métier,<br />sa solution.</h2>;
}
