import { Creepster } from "next/font/google";
import Link from "next/link";
import type { EditionAdProps } from "@/components/edition-ad/edition-ad";
import { formatPosterDate, formatTimeRange } from "@/lib/format";
import styles from "./zombiehood-ad.module.css";

/*
 * Dripping horror lettering for the theme only (loaded just on the page that shows this ad).
 * The font has no latin-ext glyphs, so it is used only for texts without ě š č ř ž ů ť ď ň.
 */
const creepster = Creepster({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-creepster",
});

/** For the whole hero: theme colours over the photo and the lettering of the giant number. */
export const zombiehoodHeroClass = `${creepster.variable} ${styles.hero}`;

const BAT_PATH =
  "M32 8 L30 4 L29 9 Q22 4 2 9 Q8 12 7 17 Q12 14 16 19 Q20 16 24 21 Q27 18 30 22 L32 26 L34 22 Q37 18 40 21 Q44 16 48 19 Q52 14 57 17 Q56 12 62 9 Q42 4 35 9 L34 4 Z";

function Bat({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 64 28" aria-hidden="true" focusable="false">
      <path d={BAT_PATH} fill="currentColor" />
    </svg>
  );
}

function Pumpkin({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 100 90" aria-hidden="true" focusable="false">
      <path d="M46 14 Q47 4 56 1 L58 5 Q52 8 53 15 Z" fill="var(--zh-stem)" />
      <ellipse cx="30" cy="52" rx="26" ry="33" fill="var(--zh-orange-deep)" />
      <ellipse cx="70" cy="52" rx="26" ry="33" fill="var(--zh-orange-deep)" />
      <ellipse cx="50" cy="52" rx="25" ry="37" fill="var(--zh-orange)" />
      <g fill="var(--zh-flame)">
        <path d="M27 44 L41 44 L34 32 Z" />
        <path d="M59 44 L73 44 L66 32 Z" />
        <path d="M46 54 L54 54 L50 47 Z" />
        <path d="M24 60 Q50 82 76 60 L70 63 L66 58 L61 65 L55 60 L50 67 L45 60 L39 65 L34 58 L30 63 Z" />
      </g>
    </svg>
  );
}

/**
 * Ad for Off Ground #2 "Zombiehood" in the home page hero: a Halloween night in teal glow with
 * bats, jack-o'-lanterns and red eyes in the dark, plus the ticket button at the bottom centre.
 */
export function ZombiehoodAd({
  edition,
  lang,
  labels,
  ticketHref,
  ticketExternal,
  registerHref,
  lineupHref,
}: EditionAdProps) {
  const time = formatTimeRange(edition.startTime, null);
  const when = edition.date ? [formatPosterDate(edition.date), time].filter(Boolean).join(" · ") : labels.dateTba;

  return (
    <>
      <section className={styles.ad} aria-labelledby="next-title">
        <div className={styles.glow} aria-hidden="true" />
        <Bat className={`${styles.bat} ${styles.batOne}`} />
        <Bat className={`${styles.bat} ${styles.batTwo}`} />
        <Bat className={`${styles.bat} ${styles.batThree}`} />
        <span className={`${styles.eyes} ${styles.eyesLeft}`} aria-hidden="true" />
        <span className={`${styles.eyes} ${styles.eyesRight}`} aria-hidden="true" />

        <p className={styles.label}>
          {labels.label} · {labels.edition}
          {edition.number}
        </p>
        <h2 id="next-title" className={`${creepster.className} ${styles.title}`}>
          {edition.name}
        </h2>
        <p className={styles.tagline}>{edition.tagline[lang]}</p>

        <div className={styles.facts}>
          <Pumpkin className={styles.pumpkin} />
          <p>
            <strong className={styles.when}>{when}</strong>
            <span className={styles.where}>{edition.location ? edition.location[lang] : labels.placeTba}</span>
          </p>
          <Pumpkin className={`${styles.pumpkin} ${styles.pumpkinMirrored}`} />
        </div>

        <p className={styles.text}>{edition.text[lang]}</p>
        <div className={styles.actions}>
          {/* Battle sign-ups go through the contact form until there is a registration system */}
          <Link href={registerHref} className={styles.action}>
            {labels.register}
          </Link>
          <Link href={lineupHref} className={styles.action}>
            {labels.lineup}
          </Link>
        </div>
      </section>

      {ticketExternal ? (
        <a
          href={ticketHref}
          className={`${creepster.className} ${styles.ticket}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {labels.ticket}
        </a>
      ) : (
        <Link href={ticketHref} className={`${creepster.className} ${styles.ticket}`}>
          {labels.ticket}
        </Link>
      )}
    </>
  );
}
