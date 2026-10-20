import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo/brand-logo";
import { InstagramButton } from "@/components/instagram-button/instagram-button";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { social } from "@/content/site";
import { navItems } from "@/lib/navigation";
import styles from "./site-footer.module.css";

const COPYRIGHT_YEAR = 2026;
const AUTHOR = "Tomáš Růžička";

interface SiteFooterProps {
  lang: Locale;
  dict: Dictionary;
}

export function SiteFooter({ lang, dict }: SiteFooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.about}>
          <Link href={localizedPath(lang)} className={styles.brand}>
            <BrandLogo />
          </Link>
          <p className={styles.tagline}>{dict.footer.tagline}</p>
          <p className={styles.location}>{dict.footer.location}</p>
          <div className={styles.social}>
            <InstagramButton href={social.instagram.url} size="sm">
              {social.instagram.handle}
            </InstagramButton>
          </div>
        </div>

        <nav aria-label={dict.footer.navigation}>
          <h2 className={styles.heading}>{dict.footer.navigation}</h2>
          <ul className={styles.links}>
            {navItems.map((item) => (
              <li key={item.key}>
                <Link href={localizedPath(lang, item.path)}>{dict.nav[item.key]}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          {/* Year is fixed: the footer is prerendered, and a live year would need request-time rendering */}
          <p>
            © {COPYRIGHT_YEAR} {dict.meta.siteName}. {dict.footer.rights}
          </p>
          <p>
            {dict.footer.madeBy} <span className={styles.author}>{AUTHOR}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
