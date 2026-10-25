"use client";

import { useEffect, useRef } from "react";
import { BrandLockup } from "@/components/brand-logo/brand-lockup";
import styles from "./hero-logo.module.css";

interface HeroLogoProps {
  className?: string;
  headingId: string;
}

interface Flight {
  /** Logo position in the page (without the flight transform) */
  top: number;
  height: number;
  /** Mini logo in the header, fixed in the viewport */
  dockTop: number;
  dx: number;
  scale: number;
  /** Scroll distance over which the logo flies into the corner */
  distance: number;
}

/** The header's mini logo that the big logo flies into (hidden copies of other pages are skipped). */
function findDock() {
  return [...document.querySelectorAll<HTMLElement>("[data-logo-dock]")].find((element) =>
    element.checkVisibility(),
  );
}

/**
 * The big logo in the home page hero. While it is in view, the header has no logo; once the
 * visitor starts scrolling, it shrinks and flies into the top left corner, where the header's
 * mini logo takes over. The state is shared with the header through html[data-hero-logo].
 */
export function HeroLogo({ className, headingId }: HeroLogoProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const dock = findDock();
    if (!element || !dock) return;

    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let flight: Flight | null = null;
    let frame = 0;

    const measure = (): Flight => {
      element.style.transform = "";
      const from = element.getBoundingClientRect();
      const to = dock.getBoundingClientRect();
      const top = from.top + window.scrollY;
      return {
        top,
        height: from.height,
        dockTop: to.top,
        dx: to.left - from.left,
        scale: to.height / from.height,
        distance: Math.max(top - to.top, 1),
      };
    };

    const update = () => {
      frame = 0;
      if (!flight) return;
      const scroll = window.scrollY;

      // Without motion, the logo just scrolls away and the mini one appears once it is gone.
      if (reducedMotion.matches) {
        element.style.transform = "";
        element.style.opacity = "";
        root.dataset.heroLogo = scroll > flight.top + flight.height ? "docked" : "hero";
        return;
      }

      const progress = Math.min(Math.max(scroll / flight.distance, 0), 1);
      const docked = progress === 1;
      // Visual top goes from the hero to the dock; the page itself moves the logo up by `scroll`.
      const x = flight.dx * progress;
      const y = (flight.dockTop - flight.top) * progress + scroll;
      const scale = 1 + (flight.scale - 1) * progress;
      element.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      element.style.opacity = docked ? "0" : "";
      root.dataset.heroLogo = docked ? "docked" : "hero";
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const remeasure = () => {
      flight = measure();
      update();
    };

    remeasure();
    // Sizes change with the viewport and when the font finishes loading
    const resizeObserver = new ResizeObserver(remeasure);
    resizeObserver.observe(element);
    resizeObserver.observe(dock);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", remeasure);
    reducedMotion.addEventListener("change", remeasure);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", remeasure);
      reducedMotion.removeEventListener("change", remeasure);
      element.style.transform = "";
      element.style.opacity = "";
      delete root.dataset.heroLogo;
    };
  }, []);

  return (
    <div ref={ref} className={styles.flight}>
      <BrandLockup className={className} headingId={headingId} />
    </div>
  );
}
