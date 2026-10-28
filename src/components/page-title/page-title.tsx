"use client";

import { useEffect, useRef } from "react";
import styles from "./page-title.module.css";

interface PageTitleProps {
  title: string;
  className?: string;
}

interface Flight {
  /** Title position in the page (without the flight transform) */
  top: number;
  centerX: number;
  /** Middle of the header bar, fixed in the viewport */
  dockTop: number;
  dockCenterX: number;
  scale: number;
  /** Scroll distance over which the title flies up */
  distance: number;
  height: number;
}

/** Last part of the flight in which the big title fades out and the small one in the header fades in */
const CROSSFADE_FROM = 0.65;

/** The place in the middle of the header bar (hidden copies of other pages are skipped). */
function findDock() {
  return [...document.querySelectorAll<HTMLElement>("[data-title-dock]")].find((element) =>
    element.checkVisibility(),
  );
}

/**
 * The h1 of a subpage. When the visitor scrolls, it shrinks and flies up into the middle of the
 * header, where a small copy stays – so even far down the page it's clear which section this is.
 * The small copy is plain DOM added to the header's dock (decorative, aria-hidden there).
 */
export function PageTitle({ title, className }: PageTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const element = ref.current;
    const dock = findDock();
    if (!element || !dock) return;

    const label = document.createElement("span");
    label.className = styles.dockLabel;
    label.textContent = title;
    label.style.opacity = "0";
    dock.append(label);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let flight: Flight | null = null;
    let frame = 0;

    const measure = (): Flight => {
      element.style.transform = "";
      const from = element.getBoundingClientRect();
      const to = dock.getBoundingClientRect();
      const top = from.top + window.scrollY;
      const scale = parseFloat(getComputedStyle(label).fontSize) / parseFloat(getComputedStyle(element).fontSize);
      return {
        top,
        centerX: from.left + from.width / 2,
        // the shrunk title is centred on the dock vertically
        dockTop: to.top + to.height / 2 - (from.height * scale) / 2,
        dockCenterX: to.left + to.width / 2,
        scale,
        distance: Math.max(top - to.top, 0) + 120,
        height: from.height,
      };
    };

    const update = () => {
      frame = 0;
      if (!flight) return;
      const scroll = window.scrollY;

      // Without motion: no flight, the small title just appears once the big one is gone
      if (reducedMotion.matches) {
        element.style.transform = "";
        element.style.opacity = "";
        label.style.opacity = scroll > flight.top + flight.height ? "1" : "0";
        return;
      }

      const progress = Math.min(Math.max(scroll / flight.distance, 0), 1);
      const x = (flight.dockCenterX - flight.centerX) * progress;
      // visual top goes from its place to the dock; the page itself moves it up by `scroll`
      const y = (flight.dockTop - flight.top) * progress + scroll;
      const scale = 1 + (flight.scale - 1) * progress;
      const fade = Math.min(Math.max((progress - CROSSFADE_FROM) / (1 - CROSSFADE_FROM), 0), 1);
      element.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      element.style.opacity = String(1 - fade);
      label.style.opacity = String(fade);
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
      label.remove();
    };
  }, [title]);

  return (
    <h1 ref={ref} className={className ? `${styles.title} ${className}` : styles.title}>
      {title}
    </h1>
  );
}
