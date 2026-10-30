import type { Dictionary } from "@/i18n/dictionaries/en";

export type NavKey = keyof Pick<
  Dictionary["nav"],
  "home" | "events" | "about" | "gallery" | "contact"
>;

/** Site sections in menu order; paths are relative to the locale prefix. */
export const navItems: { key: NavKey; path: string }[] = [
  { key: "events", path: "/events" },
  { key: "about", path: "/about" },
  { key: "gallery", path: "/gallery" },
  { key: "contact", path: "/contact" },
];
