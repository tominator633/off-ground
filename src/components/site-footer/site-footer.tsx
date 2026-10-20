import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo/brand-logo";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { social } from "@/content/site";
import { navItems } from "@/lib/navigation";
import styles from "./site-footer.module.css";

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
          <a href={social.instagram.url} className={styles.instagram} target="_blank" rel="noopener noreferrer">
            Instagram {social.instagram.handle}
          </a>
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
        <div className="container">
          <p>© {dict.meta.siteName}</p>
        </div>
      </div>
    </footer>
  );
}
