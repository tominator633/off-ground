import type { Metadata } from "next";
import Image from "next/image";
import heroPhoto from "@/assets/images/hero.jpg";
import { ButtonLink } from "@/components/button-link/button-link";
import { HeroLogo } from "@/components/hero-logo/hero-logo";
import { InstagramButton } from "@/components/instagram-button/instagram-button";
import { LineUp } from "@/components/line-up/line-up";
import { PhotoBackdrop } from "@/components/photo-backdrop/photo-backdrop";
import { PillarList } from "@/components/pillar-list/pillar-list";
import { SectionHeading } from "@/components/section-heading/section-heading";
import { TieDye } from "@/components/tie-dye/tie-dye";
import { getEvents, getNextEdition } from "@/content/events";
import { getHighlightPhotos } from "@/content/gallery";
import { social } from "@/content/site";
import { localizedPath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { formatEventDate } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const [lang, dict] = await Promise.all([getLocale(), getDictionary()]);
  return {
    ...pageMetadata(lang, "/", dict.meta.siteName, dict.meta.description),
    title: { absolute: `${dict.meta.siteName} – ${dict.home.hero.eyebrow}` },
  };
}

export default async function HomePage() {
  const [lang, dict] = await Promise.all([getLocale(), getDictionary()]);
  const { home } = dict;
  // Newest event first in the data; the home page shows its line-up.
  const featured = getEvents()[0];
  const next = getNextEdition();

  return (
    <>
      <section className={styles.hero} aria-labelledby="hero-title">
        {/* Photo from the first Off Ground (10/10/2026) */}
        <PhotoBackdrop src={heroPhoto} position="center 60%" />
        {/* Giant number of the next edition – decorative, the card below says it in words */}
        <span className={styles.edition} aria-hidden="true">
          {next.number}
        </span>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroBrand}>
            <p className={styles.eyebrow}>{home.hero.eyebrow}</p>
            {/* The main logo; on scroll it flies into the header as its mini version */}
            <HeroLogo className={styles.heroLogo} headingId="hero-title" />
          </div>

          {/* Quick look at the next event, on top of the giant number */}
          <section className={styles.nextCard} aria-labelledby="next-title">
            <p className={styles.nextLabel}>{home.next.label}</p>
            <h2 id="next-title" className={styles.nextTitle}>
              {home.next.title}
              {next.number}
            </h2>
            <dl className={styles.nextFacts}>
              <div>
                <dt>{home.next.when}</dt>
                <dd>{next.date ? formatEventDate(lang, next.date) : home.next.dateTba}</dd>
              </div>
              <div>
                <dt>{home.next.where}</dt>
                <dd>{next.location ? next.location[lang] : home.next.placeTba}</dd>
              </div>
            </dl>
            <p className={styles.nextText}>{home.next.text}</p>
            <div className={styles.nextActions}>
              {/* Battle sign-ups go through the contact form until there is a registration system */}
              <ButtonLink href={localizedPath(lang, "/contact")}>{home.next.register}</ButtonLink>
              <InstagramButton href={social.instagram.url}>{home.next.follow}</InstagramButton>
            </div>
          </section>
        </div>
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="intro-title">
        <SectionHeading id="intro-title" title={home.intro.title} />
        <div className={styles.prose}>
          {home.intro.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="format-title">
        <SectionHeading id="format-title" title={home.format.title} intro={home.format.intro} />
        <PillarList items={home.format.items} />
      </section>

      {featured ? (
        <section className={styles.lineupSection} aria-labelledby="lineup-title">
          <TieDye className={styles.lineupPoster}>
            <div className="container">
              <h2 id="lineup-title" className={styles.lineupTitle}>
                {home.lineup.title}
              </h2>
              <p className={styles.lineupIntro}>{home.lineup.intro}</p>
              <LineUp items={featured.lineup} />
              <div className={styles.centered}>
                <ButtonLink href={localizedPath(lang, `/events/${featured.slug}`)} variant="dark">
                  {home.lineup.detail}
                </ButtonLink>
              </div>
            </div>
          </TieDye>
        </section>
      ) : null}

      <section className={`container ${styles.section}`} aria-labelledby="moments-title">
        <SectionHeading id="moments-title" title={home.gallery.title} />
        <ul className={styles.photoStrip}>
          {getHighlightPhotos().map((photo, index) => (
            <li key={photo.src.src} className={`${styles.photoItem} reveal`}>
              <Image
                src={photo.src}
                alt={`${dict.common.photoAlt} (${index + 1})`}
                fill
                sizes="(min-width: 48rem) 33vw, 100vw"
                placeholder="blur"
                className={styles.photo}
              />
            </li>
          ))}
        </ul>
        <div className={styles.centered}>
          <ButtonLink href={localizedPath(lang, "/gallery")} variant="outline">
            {home.gallery.cta}
          </ButtonLink>
        </div>
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="partner-title">
        <div className={`${styles.partner} reveal`}>
          <p className={styles.partnerLabel} id="partner-title">
            {home.partner.title}
          </p>
          <p className={styles.partnerName}>rest.art</p>
          <p className={styles.partnerText}>{home.partner.text}</p>
          <ButtonLink href={localizedPath(lang, "/partners")} variant="outline">
            {home.partner.cta}
          </ButtonLink>
        </div>
      </section>

      <section className="container" aria-labelledby="cta-title">
        <div className={`${styles.cta} reveal`}>
          <h2 id="cta-title" className={styles.ctaTitle}>
            {home.cta.title}
          </h2>
          <p className={styles.ctaText}>{home.cta.text}</p>
          <div className={styles.heroActions}>
            <ButtonLink href={localizedPath(lang, "/contact")}>{home.cta.button}</ButtonLink>
            <InstagramButton href={social.instagram.url}>{social.instagram.handle}</InstagramButton>
          </div>
        </div>
      </section>
    </>
  );
}
