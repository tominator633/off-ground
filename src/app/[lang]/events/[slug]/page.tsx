import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/button-link/button-link";
import { LineUp } from "@/components/line-up/line-up";
import { PageHeader } from "@/components/page-header/page-header";
import { TieDye } from "@/components/tie-dye/tie-dye";
import { getEvent, getEvents } from "@/content/events";
import { localizedPath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { formatEventDate, formatTimeRange } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export async function generateStaticParams() {
  return getEvents().map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/events/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return {};
  const lang = await getLocale();
  return pageMetadata(lang, `/events/${slug}`, event.title[lang], event.summary[lang]);
}

// Reading the slug is URL data; behind <Suspense> client navigations stay instant.
export default function EventDetailPage({ params }: PageProps<"/[lang]/events/[slug]">) {
  return (
    <Suspense fallback={<div className={styles.fallback} />}>
      <EventDetail params={params} />
    </Suspense>
  );
}

async function EventDetail({ params }: { params: PageProps<"/[lang]/events/[slug]">["params"] }) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  const [lang, dict] = await Promise.all([getLocale(), getDictionary()]);
  const labels = dict.events;
  const when = event.kind === "recurring" ? event.schedule[lang] : formatEventDate(lang, event.date);
  const time = formatTimeRange(event.startTime, event.endTime) ?? labels.timeToBeAnnounced;

  return (
    <>
      <PageHeader
        title={event.title[lang]}
        lead={event.summary[lang]}
        image={event.image}
        imagePosition={event.imagePosition}
      >
        <p className={styles.status} data-status={event.status}>
          {labels.status[event.status]}
        </p>
      </PageHeader>

      <div className={`container ${styles.layout}`}>
        <article className={styles.content}>
          {event.lineup.length > 0 ? (
            <TieDye className={styles.poster}>
              <h2 className={styles.posterTitle}>{labels.lineup}</h2>
              <LineUp items={event.lineup} />
            </TieDye>
          ) : null}

          <h2 className={styles.heading}>{labels.about}</h2>
          <div className={styles.prose}>
            {event.description[lang].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>

        <aside className={styles.sidebar}>
          <dl className={styles.facts}>
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
          <div className={styles.join}>
            <h2 className={styles.joinTitle}>{labels.nextTitle}</h2>
            <p>{labels.nextText}</p>
            <ButtonLink href={localizedPath(lang, "/contact")}>{dict.common.getInTouch}</ButtonLink>
          </div>
          <Link href={localizedPath(lang, "/events")} className={styles.back}>
            ← {dict.common.backToEvents}
          </Link>
        </aside>
      </div>
    </>
  );
}
