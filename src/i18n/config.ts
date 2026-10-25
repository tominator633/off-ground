// Shared by the proxy, server and client code – keep it free of server-only imports.

export const locales = ["cs", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "cs";

export const localeLabels: Record<Locale, { short: string; name: string }> = {
  en: { short: "EN", name: "English" },
  cs: { short: "CS", name: "Čeština" },
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Cookie with the visitor's explicit language choice (set by the language toggle in the menu). */
export const LOCALE_COOKIE = "NEXT_LOCALE";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** GeoIP fallback: visitors from these countries get Czech, everyone else English. */
const czechSpeakingCountries = new Set(["CZ", "SK"]);

/** Best supported locale from an Accept-Language header, or null when none of ours is listed. */
export function matchAcceptLanguage(acceptLanguage: string | null): Locale | null {
  const ranked = (acceptLanguage ?? "")
    .split(",")
    .map((part) => {
      const [tag = "", ...params] = part.trim().split(";");
      const qParam = params.find((p) => p.trim().startsWith("q="));
      const q = qParam ? Number(qParam.trim().slice(2)) : 1;
      return { lang: tag.toLowerCase().split("-")[0], q: Number.isFinite(q) ? q : 0 };
    })
    .filter((entry) => entry.lang && entry.q > 0)
    .sort((a, b) => b.q - a.q);

  for (const { lang } of ranked) {
    if (hasLocale(lang)) return lang;
  }
  return null;
}

/** Picks the best supported locale from an Accept-Language header; Czech when nothing matches. */
export function negotiateLocale(acceptLanguage: string | null): Locale {
  return matchAcceptLanguage(acceptLanguage) ?? defaultLocale;
}

/**
 * Which language a visitor without a language in the URL should see:
 * 1. their earlier explicit choice (cookie),
 * 2. the browser / device language (Accept-Language),
 * 3. the country from GeoIP (Vercel's x-vercel-ip-country): CZ/SK → Czech, elsewhere English,
 * 4. Czech.
 */
export function resolveLocale(input: {
  cookie?: string | null;
  acceptLanguage?: string | null;
  country?: string | null;
}): Locale {
  if (input.cookie && hasLocale(input.cookie)) return input.cookie;
  const fromBrowser = matchAcceptLanguage(input.acceptLanguage ?? null);
  if (fromBrowser) return fromBrowser;
  if (input.country) return czechSpeakingCountries.has(input.country.toUpperCase()) ? "cs" : "en";
  return defaultLocale;
}

/** Builds a locale-prefixed path: localizedPath("cs", "/events") → "/cs/events". */
export function localizedPath(locale: Locale, path = "/"): string {
  const normalized = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized}`;
}

/** Swaps the locale segment of an existing pathname, keeping the rest of the path. */
export function switchLocaleInPath(pathname: string, target: Locale): string {
  const segments = pathname.split("/");
  if (segments[1] && hasLocale(segments[1])) {
    segments[1] = target;
    return segments.join("/") || `/${target}`;
  }
  return localizedPath(target, pathname);
}
