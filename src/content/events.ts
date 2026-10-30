import type { StaticImageData } from "next/image";
import heroPhoto from "@/assets/images/hero.jpg";
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

/**
 * Off Ground #2 – the next edition. A regular event (it has its own detail page) and the source
 * of the date, time and venue that `nextEdition` below advertises.
 */
// PLACEHOLDER – date, time, venue and texts are made up for the design (Tom, 25. 10. 2026);
// replace with the real ones from the organizer, see docs/k-diskusi-s-organizatorem.md.
const zombiehood: OneOffEvent = {
  slug: "off-ground-2-zombiehood",
  kind: "one-off",
  status: "upcoming",
  date: "2026-10-31",
  startTime: "20:00",
  endTime: null,
  location: { cs: "Kostnice Holešovice, Praha 7", en: "Kostnice Holešovice, Prague 7" },
  // Crowd around the circle at the first Off Ground (10/10/2026)
  image: heroPhoto,
  imagePosition: "center 60%",
  title: { cs: "Off Ground #2 · Zombiehood", en: "Off Ground #2 · Zombiehood" },
  summary: {
    cs: "Noc, kdy tančí i mrtví: dance battle, showcase a line-up až do rána. Přijď v masce – o vítězi rozhoduješ ty.",
    en: "The night even the dead dance: dance battle, showcase and a line-up until dawn. Come in costume – you decide who wins.",
  },
  description: {
    cs: [
      "Druhý Off Ground vychází na Halloween. Kruh se promění v noc živých mrtvých – battle, showcase a DJ sety až do rána.",
      "Přijď v masce nebo kostýmu. O vítězi battlu rozhoduje publikum, takže i ty.",
      "Line-up, přihlášky do battlu a lístky zveřejníme na Instagramu.",
    ],
    en: [
      "The second Off Ground falls on Halloween. The circle turns into a night of the living dead – battle, showcase and DJ sets until dawn.",
      "Come in a mask or costume. The crowd decides who wins the battle – and that means you.",
      "Line-up, battle sign-ups and tickets will be announced on Instagram.",
    ],
  },
  lineup: [],
};

/** Order: upcoming events from the soonest, then past events from the newest. */
export const events: OffGroundEvent[] = [
  zombiehood,
  // PLACEHOLDER – editions #3 and #4 are made up for the design (Tom, 28. 10. 2026):
  // names, dates and texts are invented; replace or remove once the real plans are known.
  {
    slug: "off-ground-3-winter-cypher",
    kind: "one-off",
    status: "upcoming",
    date: "2027-01-23",
    startTime: null,
    endTime: null,
    location: { cs: "Praha – místo upřesníme", en: "Prague – venue to be announced" },
    title: { cs: "Off Ground #3 · Winter Cypher", en: "Off Ground #3 · Winter Cypher" },
    summary: {
      cs: "Zimní kruh, který nevychladne: cypher, 2 vs 2 battly a DJ set do noci.",
      en: "A winter circle that never cools down: cypher, 2 vs 2 battles and a DJ set into the night.",
    },
    description: {
      cs: [
        "Třetí Off Ground přinese zimní cypher – otevřený kruh pro každého, kdo se nebojí vstoupit.",
        "Line-up, přihlášky do battlů a vstupné zveřejníme na Instagramu.",
      ],
      en: [
        "The third Off Ground brings a winter cypher – an open circle for anyone who dares to step in.",
        "Line-up, battle sign-ups and tickets will be announced on Instagram.",
      ],
    },
    lineup: [],
  },
  {
    slug: "off-ground-4-neon-spring",
    kind: "one-off",
    status: "upcoming",
    date: "2027-03-20",
    startTime: null,
    endTime: null,
    location: { cs: "Praha – místo upřesníme", en: "Prague – venue to be announced" },
    title: { cs: "Off Ground #4 · Neon Spring", en: "Off Ground #4 · Neon Spring" },
    summary: {
      cs: "Jarní edice v neonech: crew battle, showcase a publikum, které zase rozhoduje.",
      en: "A spring edition in neon: crew battle, showcase and a crowd that decides once again.",
    },
    description: {
      cs: [
        "Čtvrtý Off Ground otevře jaro v neonových barvách – crews proti sobě a o vítězi rozhoduješ ty.",
        "Podrobnosti zveřejníme na Instagramu.",
      ],
      en: [
        "The fourth Off Ground opens spring in neon colours – crews face off and you decide who wins.",
        "Details will be announced on Instagram.",
      ],
    },
    lineup: [],
  },
  {
    slug: "off-ground-10-10-2026",
    kind: "one-off",
    status: "past",
    date: "2026-10-10",
    startTime: "19:00",
    // until 1:00 the next day (Boom Events page of the event)
    endTime: "01:00",
    location: { cs: "Burza #4, Holešovická tržnice, Praha", en: "Burza #4, Holešovice Market, Prague" },
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

/**
 * Visual theme of an edition. Every theme has its own ad in the home page hero
 * (src/components/edition-ad/) – a new theme = a new entry here and a new ad component.
 */
export type EditionTheme = "zombiehood";

/** The next Off Ground, advertised in the home page hero. Unknown facts stay null. */
export interface NextEdition {
  /** Slug of the edition's event in `events` – its detail page */
  slug: string;
  /** Edition number shown as the giant numeral */
  number: number;
  /** Name of the edition, e.g. "Zombiehood" */
  name: string;
  theme: EditionTheme;
  tagline: Localized;
  text: Localized;
  /** ISO date "YYYY-MM-DD" in Prague time */
  date: string | null;
  /** "HH:MM" in Prague time */
  startTime: string | null;
  location: Localized | null;
  /** Ticket shop; null = not on sale yet (the button then points to Instagram for news) */
  ticketUrl: string | null;
  /** Background photo of the home page hero for this edition */
  heroImage: StaticImageData;
  /** CSS object-position for the photo crop */
  heroImagePosition: string;
}

export const nextEdition: NextEdition = {
  slug: zombiehood.slug,
  number: 2,
  name: "Zombiehood",
  theme: "zombiehood",
  tagline: { cs: "Noc, kdy tančí i mrtví.", en: "The night even the dead dance." },
  text: {
    cs: "Dance battle, showcase a line-up až do rána. Přijď v masce – o vítězi rozhoduješ ty.",
    en: "Dance battle, showcase and a line-up until dawn. Come in costume – you decide who wins.",
  },
  // Facts come from the event itself, so the ad and the detail page always agree
  date: zombiehood.date,
  startTime: zombiehood.startTime,
  location: zombiehood.location,
  ticketUrl: null,
  heroImage: heroPhoto,
  heroImagePosition: "center 60%",
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
