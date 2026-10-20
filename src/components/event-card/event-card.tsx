import Link from "next/link";
import { BrandStar } from "@/components/brand-logo/brand-star";
import { PhotoBackdrop } from "@/components/photo-backdrop/photo-backdrop";
import { TieDye } from "@/components/tie-dye/tie-dye";
import type { OffGroundEvent } from "@/content/events";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { formatEventDate, formatPosterDate, formatTimeRange } from "@/lib/format";
import styles from "./event-card.module.css";

interface EventCardProps {
  event: OffGroundEvent;
  lang: Locale;
  labels: Dictionary["events"];
  learnMore: string;
}

/** One card for both recurring and one-off events. */
export function EventCard({ event, lang, labels, learnMore }: EventCardProps) {
  const href = localizedPath(lang, `/events/${event.slug}`);
  const when = event.kind === "recurring" ? event.schedule[lang] : formatEventDate(lang, event.date);
  const time = formatTimeRange(event.startTime, event.endTime) ?? labels.timeToBeAnnounced;

  return (
    <article className={styles.card} data-status={event.status}>
      {event.image ? (
        <div className={`${styles.media} ${styles.photo}`}>
          <PhotoBackdrop
            src={event.image}
            position={event.imagePosition}
            sizes="(min-width: 64rem) 34rem, (min-width: 48rem) 50vw, 100vw"
            priority={false}
          />
          {event.kind === "one-off" ? <span className={styles.posterDate}>{formatPosterDate(event.date)}</span> : null}
          <span className={styles.badge}>{labels.status[event.status]}</span>
        </div>
      ) : (
        <TieDye className={styles.media}>
          <BrandStar className={styles.star} />
          {event.kind === "one-off" ? <span className={styles.posterDate}>{formatPosterDate(event.date)}</span> : null}
          <span className={styles.badge}>{labels.status[event.status]}</span>
        </TieDye>
      )}
      <div className={styles.body}>
        <h3 className={styles.title}>
          <Link href={href} className={styles.link}>
            {event.title[lang]}
          </Link>
        </h3>
        <dl className={styles.meta}>
          <div>
            <dt>{labels.when}</dt>
            <dd>{when}</dd>
          </div>
          <div>
            <dt>{labels.time}</dt>
            <dd>{time}</dd>
          </div>
          <div>
            <dt>{labels.where}</dt>
            <dd>{event.location[lang]}</dd>
          </div>
        </dl>
        <p className={styles.summary}>{event.summary[lang]}</p>
        <span className={styles.more} aria-hidden="true">
          {learnMore} →
        </span>
      </div>
    </article>
  );
}
