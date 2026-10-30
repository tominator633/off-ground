import type { Metadata } from "next";
import Image from "next/image";
import restArtLogo from "@/assets/images/partners/rest-art.png";
import { BrandStar } from "@/components/brand-logo/brand-star";
import { ButtonLink } from "@/components/button-link/button-link";
import { EditionAd, editionHeroClass } from "@/components/edition-ad/edition-ad";
import { FaqList } from "@/components/faq-list/faq-list";
import { GlowBackdrop } from "@/components/glow-backdrop/glow-backdrop";
import { HeroLogo } from "@/components/hero-logo/hero-logo";
import { InstagramButton } from "@/components/instagram-button/instagram-button";
import { PhotoBackdrop } from "@/components/photo-backdrop/photo-backdrop";
import { PillarList } from "@/components/pillar-list/pillar-list";
import { getNextEdition } from "@/content/events";
import { getHighlightPhotos } from "@/content/gallery";
import { partners, social } from "@/content/site";
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
  const next = getNextEdition();

  return (
    <>
      {/* The edition theme colours the photo and sets the lettering of the giant number */}
      <section className={`${styles.hero} ${editionHeroClass(next.theme)}`} aria-labelledby="hero-title">
        {/* Background photo chosen for the next edition */}
        <PhotoBackdrop src={next.heroImage} position={next.heroImagePosition} grain />
        {/* Giant number of the next edition – decorative, the ad below says it in words */}
        <span className={styles.edition} aria-hidden="true">
          {next.number}
        </span>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroBrand}>
            {/* The main logo; on scroll it flies into the header as its mini version */}
            <HeroLogo className={styles.heroLogo} headingId="hero-title" />
          </div>

          {/* Ad for the next event in its own theme, over the giant number */}
          <EditionAd
            edition={next}
            lang={lang}
            labels={home.next}
            // Until tickets are on sale, the button leads to Instagram, where they'll be announced
            ticketHref={next.ticketUrl ?? social.instagram.url}
            ticketExternal
            // Only two buttons in the hero: the event detail and the ticket
            detailHref={localizedPath(lang, `/events/${next.slug}`)}
          />
        </div>
      </section>

      {/* Everything under the hero shares one black background with glows and glitter stars */}
      <div className={styles.blackPart}>
        <GlowBackdrop fade="both" layout="long" />

        {/* What Off Ground is: centred – poster title on top, the first paragraph as a big gradient statement */}
        <section className={`container ${styles.intro}`} aria-labelledby="intro-title">
          <h2 id="intro-title" className={`${styles.posterTitle} reveal`}>
            {home.intro.title}
          </h2>
          <div className={`${styles.introText} reveal`}>
            {home.intro.paragraphs.map((paragraph, index) => (
              <p key={paragraph} className={index === 0 ? styles.statement : styles.introMore}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* How it works: poster title, then the four parts as a numbered poster index */}
        <section className={`container ${styles.format}`} aria-labelledby="format-title">
          <div className={`${styles.formatHead} reveal`}>
            <h2 id="format-title" className={styles.posterTitle}>
              {home.format.title}
            </h2>
            <p className={styles.formatIntro}>{home.format.intro}</p>
          </div>
          <PillarList items={home.format.items} />
        </section>

        {/*
          Moments: poster title with the gallery button, then three photos as prints stuck on a
          wall – each tilted its own way, with a coloured offset shadow.
        */}
        <section className={styles.moments} aria-labelledby="moments-title">
          <div className="container">
            <div className={`${styles.momentsHead} reveal`}>
              <h2 id="moments-title" className={styles.posterTitle}>
                {home.gallery.title}
              </h2>
              <ButtonLink href={localizedPath(lang, "/gallery")} variant="outline">
                {home.gallery.cta} →
              </ButtonLink>
            </div>
            <ul className={styles.prints}>
              {getHighlightPhotos().map((photo, index) => (
                <li key={photo.src.src} className={`${styles.print} reveal`}>
                  {/* Not a link – the only way on is the gallery button above */}
                <div className={styles.printFrame}>
                    <Image
                      src={photo.src}
                      alt={`${dict.common.photoAlt} (${index + 1})`}
                      fill
                      sizes="(min-width: 64rem) 30vw, 85vw"
                      placeholder="blur"
                      className={styles.printImage}
                    />
                  </div>
                  {/* A glitter star stuck on the middle print */}
                  {index === 1 ? <BrandStar className={styles.printSticker} /> : null}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Partner (was its own page; /partners redirects here) */}
        <section id="partner" className={`container ${styles.section}`} aria-labelledby="partner-title">
          <div className={`${styles.partner} reveal`}>
            <p className={styles.partnerLabel} id="partner-title">
              {home.partner.title}
            </p>
            <a
              href={partners.restArt.website}
              className={styles.partnerLogoLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={restArtLogo} alt={home.partner.logoAlt} className={styles.partnerLogo} sizes="18rem" />
            </a>
            <p className={styles.partnerText}>{home.partner.text}</p>
            <div className={styles.heroActions}>
              <ButtonLink href={partners.restArt.website} target="_blank" rel="noopener noreferrer">
                {home.partner.website} ↗
              </ButtonLink>
              <InstagramButton href={partners.restArt.instagram}>{home.partner.instagram}</InstagramButton>
            </div>
            {/* Invitation for new partners (from the former Partners page) */}
            <div className={styles.partnerBecome}>
              <h3 className={styles.partnerBecomeTitle}>{home.partner.becomeTitle}</h3>
              <p className={styles.partnerText}>{home.partner.becomeText}</p>
              <ButtonLink href={localizedPath(lang, "/contact")} variant="outline">
                {dict.common.getInTouch}
              </ButtonLink>
            </div>
          </div>
        </section>

        {/* FAQ (was its own page; /faq redirects here) */}
        {/* Poster title on the left (stays in view on desktop), the questions as an index on the right */}
        <section id="faq" className={styles.faq} aria-labelledby="faq-title">
          <div className={`container ${styles.faqInner}`}>
            <div className={`${styles.faqIntro} reveal`}>
              <h2 id="faq-title" className={styles.posterTitle}>
                {dict.faq.title}
              </h2>
              {/* "Write to us" – the contact call to action right below has the button */}
              <p className={styles.faqLead}>{dict.faq.lead}</p>
            </div>
            <FaqList items={dict.faq.items} />
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
      </div>
    </>
  );
}
