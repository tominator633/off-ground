"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import { BrandLockup } from "@/components/brand-logo/brand-lockup";
import { BrandStar } from "@/components/brand-logo/brand-star";
import { AboutIcon } from "@/components/icons/about-icon";
import { ContactIcon } from "@/components/icons/contact-icon";
import { EventsIcon } from "@/components/icons/events-icon";
import { FaqIcon } from "@/components/icons/faq-icon";
import { GalleryIcon } from "@/components/icons/gallery-icon";
import { PartnersIcon } from "@/components/icons/partners-icon";
import {
  localeLabels,
  locales,
  localizedPath,
  switchLocaleInPath,
  type Locale,
} from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { rememberLocale } from "@/lib/locale-cookie";
import { navItems, type NavKey } from "@/lib/navigation";
import styles from "./site-header.module.css";

/** Icons in front of the menu links; a section without one keeps an empty slot so the text lines up. */
const navIcons: Partial<Record<NavKey, ComponentType<{ className?: string }>>> = {
  // the glitter star from the logo keeps its own colours
  home: BrandStar,
  events: EventsIcon,
  about: AboutIcon,
  gallery: GalleryIcon,
  partners: PartnersIcon,
  faq: FaqIcon,
  contact: ContactIcon,
};

function NavIcon({ navKey }: { navKey: NavKey }) {
  const Icon = navIcons[navKey];
  return <span className={styles.navIcon}>{Icon ? <Icon className={styles.navIconSvg} /> : null}</span>;
}

interface SiteHeaderProps {
  lang: Locale;
  labels: Dictionary["nav"];
}

export function SiteHeader({ lang, labels }: SiteHeaderProps) {
  const pathname = usePathname();
  const homePath = localizedPath(lang);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // After scrolling, the frosted strip above the bar fades in (header::before/::after).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the full-screen menu is open, the page underneath must not scroll.
  useEffect(() => {
    if (!menuOpen) return;
    document.documentElement.dataset.menuOpen = "true";
    return () => {
      delete document.documentElement.dataset.menuOpen;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const isActive = (path: string) => {
    const full = localizedPath(lang, path);
    return pathname === full || pathname.startsWith(`${full}/`);
  };


  // An explicit choice beats the automatic detection (browser language / GeoIP) on the next visit
  const chooseLocale = (locale: Locale) => {
    rememberLocale(locale);
    setMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`} data-menu-open={menuOpen}>
      <a href="#main" className={styles.skipLink}>
        {labels.skipToContent}
      </a>
      {/* Floating bar: logo on the left, language + menu button on the right */}
      <div className={styles.bar}>
        {/* On the home page the corner stays empty until the big hero logo flies in (HeroLogo) */}
        <Link
          href={homePath}
          className={styles.brand}
          data-vt="site-logo"
          data-await-hero={pathname === homePath ? "" : undefined}
          onClick={() => setMenuOpen(false)}
        >
          <BrandLockup className={styles.brandLockup} dock />
          <span className="visually-hidden">{labels.home}</span>
        </Link>

        <nav
          id="site-menu"
          aria-label={labels.mainNavigation}
          className={styles.nav}
          data-open={menuOpen}
          // A tap on the empty glass closes the menu
          onClick={(event) => {
            if (event.target === event.currentTarget) setMenuOpen(false);
          }}
        >
          <ul className={styles.navList}>
            {/* Home link: the corner logo is hidden while the menu is open */}
            <li>
              <Link
                href={homePath}
                className={styles.navLink}
                aria-current={pathname === homePath ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                <NavIcon navKey="home" />
                <span className={styles.navLabel}>{labels.home}</span>
              </Link>
            </li>
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={localizedPath(lang, item.path)}
                  className={styles.navLink}
                  aria-current={isActive(item.path) ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  <NavIcon navKey={item.key} />
                  <span className={styles.navLabel}>{labels[item.key]}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/*
            Language toggle – only here, in the menu. The language is detected automatically
            (browser language, then GeoIP), so this is just the fallback for a manual change.
          */}
          <div className={styles.langToggle} role="group" aria-label={labels.switchLanguage} data-active={lang}>
            {locales.map((locale) => (
              <Link
                key={locale}
                href={switchLocaleInPath(pathname, locale)}
                hrefLang={locale}
                lang={locale}
                className={styles.langOption}
                aria-current={locale === lang ? "true" : undefined}
                onClick={() => chooseLocale(locale)}
              >
                <span aria-hidden="true">{localeLabels[locale].short}</span>
                <span className="visually-hidden">{localeLabels[locale].name}</span>
              </Link>
            ))}
          </div>
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.menuToggle}
            data-vt="site-menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={styles.burger} data-open={menuOpen} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="visually-hidden">{menuOpen ? labels.closeMenu : labels.openMenu}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
