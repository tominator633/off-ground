"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand-logo/brand-logo";
import { localeLabels, locales, localizedPath, switchLocaleInPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { navItems } from "@/lib/navigation";
import styles from "./site-header.module.css";

interface SiteHeaderProps {
  lang: Locale;
  labels: Dictionary["nav"];
}

export function SiteHeader({ lang, labels }: SiteHeaderProps) {
  const pathname = usePathname();
  const homePath = localizedPath(lang);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // On every page the header starts transparent and turns solid once the page is scrolled.
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

  // Glass on the logo (and language button) only after scrolling and while the menu is closed
  const solid = scrolled && !menuOpen;
  const otherLocales = locales.filter((locale) => locale !== lang);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <a href="#main" className={styles.skipLink}>
        {labels.skipToContent}
      </a>
      {/* Floating bar: logo on the left, language + menu button on the right */}
      <div className={`${styles.bar} ${solid ? styles.solid : ""}`}>
        <Link href={homePath} className={styles.brand} data-vt="site-logo" onClick={() => setMenuOpen(false)}>
          <BrandLogo />
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
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={localizedPath(lang, item.path)}
                  className={styles.navLink}
                  aria-current={isActive(item.path) ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {labels[item.key]}
                </Link>
              </li>
            ))}
          </ul>

          {/* Phones only: language choice lives in the menu so the bar stays uncluttered */}
          <div className={styles.menuLanguages} role="group" aria-label={labels.switchLanguage}>
            {locales.map((locale) => (
              <Link
                key={locale}
                href={switchLocaleInPath(pathname, locale)}
                hrefLang={locale}
                lang={locale}
                className={styles.menuLanguageLink}
                aria-current={locale === lang ? "true" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {localeLabels[locale].name}
              </Link>
            ))}
          </div>
        </nav>

        <div className={styles.actions}>
          {/* Tablet and up: round language button next to the menu button */}
          <div className={styles.languages} aria-label={labels.switchLanguage} role="group">
            {otherLocales.map((locale) => (
              <Link
                key={locale}
                href={switchLocaleInPath(pathname, locale)}
                hrefLang={locale}
                lang={locale}
                className={styles.languageLink}
                data-vt="site-lang"
                onClick={() => setMenuOpen(false)}
              >
                <span aria-hidden="true">{localeLabels[locale].short}</span>
                <span className="visually-hidden">{localeLabels[locale].name}</span>
              </Link>
            ))}
          </div>

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
