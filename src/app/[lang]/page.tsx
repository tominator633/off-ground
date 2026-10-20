import type { Metadata } from "next";
import Image from "next/image";
import heroPhoto from "@/assets/images/hero.jpg";
import { BrandStar } from "@/components/brand-logo/brand-star";
import { ButtonLink } from "@/components/button-link/button-link";
import { InstagramButton } from "@/components/instagram-button/instagram-button";
import { LineUp } from "@/components/line-up/line-up";
import { PhotoBackdrop } from "@/components/photo-backdrop/photo-backdrop";
import { PillarList } from "@/components/pillar-list/pillar-list";
import { SectionHeading } from "@/components/section-heading/section-heading";
import { TieDye } from "@/components/tie-dye/tie-dye";
import { getEvents } from "@/content/events";
import { getHighlightPhotos } from "@/content/gallery";
import { social } from "@/content/site";
import { localizedPath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
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

  return (
    <>
      <section className={styles.hero} aria-labelledby="hero-title">
        {/* Photo from the first Off Ground (10/10/2026) */}
        <PhotoBackdrop src={heroPhoto} position="center 60%" />
        <div className={`container ${styles.heroContent}`}>
          <p className={styles.eyebrow}>{home.hero.eyebrow}</p>
          <div className={styles.heroLogo}>
            <BrandStar className={styles.heroStar} />
            <h1 id="hero-title" className={styles.heroTitle}>
              Off
              <br />
              ground
            </h1>
          </div>
          <p className={styles.heroSubtitle}>{home.hero.subtitle}</p>
          <div className={styles.heroActions}>
            {featured ? (
              <ButtonLink href={localizedPath(lang, `/events/${featured.slug}`)}>
                {home.hero.primaryCta}
              </ButtonLink>
            ) : null}
            <ButtonLink href={localizedPath(lang, "/about")} variant="outline">
              {home.hero.secondaryCta}
            </ButtonLink>
          </div>
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
            <li key={photo.src.src} className={styles.photoItem}>
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
        <div className={styles.partner}>
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
        <div className={styles.cta}>
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
