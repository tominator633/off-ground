import type { Metadata } from "next";
import { locales, localizedPath, type Locale } from "@/i18n/config";

/** Absolute site URL for canonical links. Vercel provides the production URL automatically. */
export function siteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return new URL(explicit);
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return new URL(`https://${vercel}`);
  return new URL("http://localhost:3000");
}

/**
 * The site is private for now (link shared only with the organizers),
 * so search engines are kept out until SITE_INDEXING=true is set.
 */
export function isIndexingAllowed(): boolean {
  return process.env.SITE_INDEXING === "true";
}

/** Title, description and language alternates for one page. */
export function pageMetadata(lang: Locale, path: string, title: string, description?: string): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: localizedPath(lang, path),
      languages: Object.fromEntries(locales.map((locale) => [locale, localizedPath(locale, path)])),
    },
    openGraph: { title, description, locale: lang === "cs" ? "cs_CZ" : "en_GB", type: "website" },
  };
}
