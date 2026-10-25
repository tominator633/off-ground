import type { Metadata } from "next";
import eventsPhoto from "@/assets/images/sections/events.jpg";
import { EventCard } from "@/components/event-card/event-card";
import { EventsIcon } from "@/components/icons/events-icon";
import { PageHeader } from "@/components/page-header/page-header";
import { getEvents } from "@/content/events";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import styles from "@/styles/subpage.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const [lang, dict] = await Promise.all([getLocale(), getDictionary()]);
  return pageMetadata(lang, "/events", dict.events.title, dict.events.lead);
}

export default async function EventsPage() {
  const [lang, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <>
      <PageHeader icon={EventsIcon} title={dict.events.title} lead={dict.events.lead} image={eventsPhoto} imagePosition="center 55%" />
      <section className={`container ${styles.section}`}>
        <div className={styles.cardGrid}>
          {getEvents().map((event) => (
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
    </>
  );
}
