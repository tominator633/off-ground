"use client";

import { useEffect } from "react";
import styles from "./page-title.module.css";

interface PageTitleProps {
  title: string;
}

/** The place in the middle of the header bar (hidden copies of other pages are skipped). */
function findDock() {
  return [...document.querySelectorAll<HTMLElement>("[data-title-dock]")].find((element) =>
    element.checkVisibility(),
  );
}

/**
 * Title of a subpage. It is shown only in the middle of the header (from the top of the page
 * down to the bottom), so it's always clear which section this is. The page keeps a visually
 * hidden h1 for screen readers; the copy in the header is decorative (aria-hidden there).
 */
export function PageTitle({ title }: PageTitleProps) {
  useEffect(() => {
    const dock = findDock();
    if (!dock) return;
    const label = document.createElement("span");
    label.className = styles.dockLabel;
    label.textContent = title;
    dock.append(label);
    return () => label.remove();
  }, [title]);

  return <h1 className="visually-hidden">{title}</h1>;
}
