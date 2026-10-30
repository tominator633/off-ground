"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { ArrowLeftIcon } from "@/components/icons/arrow-left-icon";
import styles from "./page-title.module.css";

interface PageTitleProps {
  title: string;
  /** Round "back" button left of the title in the header (event detail, album) */
  back?: { href: string; label: string };
}

/** The place in the middle of the header bar (hidden copies of other pages are skipped). */
function findDock() {
  return (
    [...document.querySelectorAll<HTMLElement>("[data-title-dock]")].find((element) =>
      element.checkVisibility(),
    ) ?? null
  );
}

// The header is always there, so nothing to subscribe to; on the server there is no dock yet
const subscribe = () => () => {};
const noDock = () => null;

/**
 * Title of a subpage. It is shown only in the middle of the header (from the top of the page
 * down to the bottom), so it's always clear which section this is. The page keeps a visually
 * hidden h1 for screen readers; the copy in the header is decorative (aria-hidden). An optional
 * round back button sits left of it – a real link, named by a visually hidden label.
 */
export function PageTitle({ title, back }: PageTitleProps) {
  // The header is outside this page's tree, so the title is rendered into it (client only)
  const dock = useSyncExternalStore(subscribe, findDock, noDock);

  return (
    <>
      <h1 className="visually-hidden">{title}</h1>
      {dock
        ? createPortal(
            <>
              {back ? (
                <Link href={back.href} className={styles.back}>
                  <ArrowLeftIcon className={styles.backIcon} />
                  <span className="visually-hidden">{back.label}</span>
                </Link>
              ) : null}
              <span className={styles.dockLabel} aria-hidden="true">
                {title}
              </span>
            </>,
            dock,
          )
        : null}
    </>
  );
}
