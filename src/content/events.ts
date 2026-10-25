import type { StaticImageData } from "next/image";
import battlePhoto from "@/assets/images/sections/event-battle.jpg";
import type { Locale } from "@/i18n/config";

// Event data lives in code for now. Keep this the only place pages read events from,
// so it can later be swapped for a CMS or database without touching the components.
// Facts come from the Off Ground Instagram posts – see docs/k-diskusi-s-organizatorem.md.

type Localized<T = string> = Record<Locale, T>;

export interface LineupItem {
  /** "HH:MM" */
  time: string;
  title: string;
  /** Optional match-up shown under the title, e.g. ["misfits", "underdogs"]. */
  versus?: [string, string];
}

interface EventBase {
  slug: string;
  title: Localized;
  summary: Localized;
  description: Localized<string[]>;
  location: Localized;
  /** Set by hand for now – a date-based switch needs request-time rendering. */
  status: "upcoming" | "past";
  /** "HH:MM" in Prague time; null = not announced yet. */
  startTime: string | null;
  endTime: string | null;
  lineup: LineupItem[];
  /** Photo from the event – used in the event card and as the hero of the detail page. */
  image?: StaticImageData;
  /** CSS object-position for the photo crop. */
  imagePosition?: string;
}

export interface RecurringEvent extends EventBase {
  kind: "recurring";
  schedule: Localized;
}

export interface OneOffEvent extends EventBase {
  kind: "one-off";
  /** ISO date "YYYY-MM-DD" in Prague time. */
  date: string;
}

export type OffGroundEvent = RecurringEvent | OneOffEvent;

export const events: OffGroundEvent[] = [
  {
    slug: "off-ground-10-10-2026",
    kind: "one-off",
    status: "past",
    date: "2026-10-10",
    startTime: "19:00",
    endTime: null,
    location: { cs: "Burza #4, Praha", en: "Burza #4, Prague" },
    image: battlePhoto,
    imagePosition: "center 45%",
    title: { cs: "Off Ground · Burza #4", en: "Off Ground · Burza #4" },
    summary: {
      cs: "První Off Ground: hip-hopový freestyle showcase, dance battle misfits vs underdogs a nabitý line-up do pozdní noci.",
      en: "The first Off Ground: a hip-hop freestyle showcase, the misfits vs underdogs dance battle and a packed line-up until late.",
    },
    description: {
      cs: [
        "Prvním Off Groundem jsme 10. 10. 2026 rozjeli celou sérii. Večer otevřel line-up, pak přišel hip-hopový freestyle showcase a hlavní bod večera – dance battle misfits vs underdogs.",
        "O vítězi rozhodovalo publikum. Fotky z akce brzy přidáme do galerie.",
      ],
      en: [
        "With the first Off Ground on 10 October 2026 we kicked off the whole series. The line-up opened the night, followed by a hip-hop freestyle showcase and the main event – the misfits vs underdogs dance battle.",
        "The crowd decided the winner. Photos from the night are coming to the gallery soon.",
      ],
    },
    lineup: [
      { time: "19:00", title: "doors" },
      { time: "19:30", title: "Amathyst" },
      { time: "20:30", title: "Hip-hop freestyle showcase" },
      {
        time: "21:00",
        title: "dance battle",
        versus: ["misfits", "underdogs"],
      },
      { time: "22:00", title: "Imellie" },
      { time: "23:00", title: "defcom" },
    ],
  },
];

/** The next Off Ground, teased in the home page hero. Facts stay null until they are announced. */
export interface NextEdition {
  /** Edition number shown as the giant numeral */
  number: number;
  /** ISO date "YYYY-MM-DD" in Prague time */
  date: string | null;
  location: Localized | null;
}

export const nextEdition: NextEdition = {
  number: 2,
  date: null,
  location: null,
};

export function getNextEdition(): NextEdition {
  return nextEdition;
}

export function getEvents(): OffGroundEvent[] {
  return events;
}

export function getEvent(slug: string): OffGroundEvent | undefined {
  return events.find((event) => event.slug === slug);
}
