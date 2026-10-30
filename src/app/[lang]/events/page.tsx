import type { Metadata } from "next";
import { EditionAd, editionHeroClass } from "@/components/edition-ad/edition-ad";
import { EventCard } from "@/components/event-card/event-card";
import { GlowBackdrop } from "@/components/glow-backdrop/glow-backdrop";
import { PageTitle } from "@/components/page-title/page-title";
import { PhotoBackdrop } from "@/components/photo-backdrop/photo-backdrop";
import { getEvents, getNextEdition } from "@/content/events";
import { social } from "@/content/site";
import { localizedPath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const [lang, dict] = await Promise.all([getLocale(), getDictionary()]);
  return pageMetadata(lang, "/events", dict.events.title, dict.events.lead);
}

export default async function EventsPage() {
  const [lang, dict] = await Promise.all([getLocale(), getDictionary()]);
  const next = getNextEdition();

  return (
    <>
      {/* No title block: "akce" is in the header, the next event opens the page */}
      <PageTitle title={dict.events.title} />
      <div className={styles.page}>
        <GlowBackdrop />

        {/* The next event first: a dominant banner across the whole width, in its own theme */}
        <section className={`${styles.banner} ${editionHeroClass(next.theme)}`}>
          <PhotoBackdrop src={next.heroImage} position={next.heroImagePosition} />
          <span className={styles.edition} aria-hidden="true">
            {next.number}
          </span>
          <div className={`container ${styles.bannerInner}`}>
            <EditionAd
              edition={next}
              lang={lang}
              labels={dict.home.next}
              // Until tickets are on sale, the button leads to Instagram, where they'll be announced
              ticketHref={next.ticketUrl ?? social.instagram.url}
              ticketExternal
              registerHref={localizedPath(lang, "/contact")}
              lineupHref={`${localizedPath(lang)}#lineup`}
              detailHref={localizedPath(lang, `/events/${next.slug}`)}
              placement="banner"
            />
          </div>
        </section>

        {/* All other editions (the next one is the banner above): upcoming first, then the past ones */}
        <section className={`container ${styles.list}`} aria-label={dict.events.title}>
          <div className={styles.grid}>
            {getEvents()
              .filter((event) => event.slug !== next.slug)
              .map((event) => (
                <EventCard
                  key={event.slug}
                  event={event}
                  lang={lang}
                  labels={dict.events}
                  learnMore={dict.common.learnMore}
                />
              ))}
          </div>
        </section>
      </div>
    </>
  );
}
