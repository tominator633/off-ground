import type { Locale } from "@/i18n/config";

const intlLocale: Record<Locale, string> = { en: "en-GB", cs: "cs-CZ" };

/** "2026-12-19" → "Saturday, 19 December 2026" / "sobota 19. prosince 2026". */
export function formatEventDate(locale: Locale, isoDate: string): string {
  // Noon UTC keeps the calendar day stable in the Prague time zone.
  const date = new Date(`${isoDate}T12:00:00Z`);
  return new Intl.DateTimeFormat(intlLocale[locale], {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Prague",
  }).format(date);
}

/** "14:00", "19:00" → "14:00–19:00"; null when the time isn't announced. */
export function formatTimeRange(start: string | null, end: string | null): string | null {
  if (!start) return null;
  return end ? `${start}–${end}` : start;
}

/** "2026-10-10" → "10/10/2026" – the date style of the Off Ground posters. */
export function formatPosterDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}
