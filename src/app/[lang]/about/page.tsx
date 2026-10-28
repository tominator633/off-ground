import type { Metadata } from "next";
import Image from "next/image";
import { Fragment } from "react";
import aboutPhoto from "@/assets/images/sections/about.jpg";
import storyPhoto from "@/assets/images/sections/about-story.jpg";
import { BrandStar } from "@/components/brand-logo/brand-star";
import { ButtonLink } from "@/components/button-link/button-link";
import { PageHeader } from "@/components/page-header/page-header";
import { SectionHeading } from "@/components/section-heading/section-heading";
import { localizedPath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import styles from "@/styles/subpage.module.css";
import story from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const [lang, dict] = await Promise.all([getLocale(), getDictionary()]);
  return pageMetadata(lang, "/about", dict.about.title, dict.about.lead);
}

export default async function AboutPage() {
  const [lang, dict] = await Promise.all([getLocale(), getDictionary()]);
  const { about } = dict;

  return (
    <>
      <PageHeader title={about.title} lead={about.lead} image={aboutPhoto} imagePosition="center 35%" />

      <section className={story.story} aria-labelledby="story-title">
        <div className={`container ${story.storyInner}`}>
          {/* PLACEHOLDER photo from the first event – replace with a photo of the two organizers */}
          <figure className={story.photoFrame}>
            <div className={story.photo}>
              <Image
                src={storyPhoto}
                alt={about.story.photoAlt}
                fill
                sizes="(min-width: 64rem) 40vw, 100vw"
                placeholder="blur"
                className={story.photoImage}
              />
            </div>
            <BrandStar className={story.sticker} />
            <figcaption className={story.caption}>{about.story.photoCaption}</figcaption>
          </figure>

          <div className={story.storyText}>
            <h2 id="story-title" className={story.storyTitle}>
              {about.story.title}
            </h2>
            {about.story.paragraphs.map((paragraph, index) => (
              <Fragment key={paragraph}>
                <p className={index === 0 ? story.opening : undefined}>{paragraph}</p>
                {/* the quote breaks up the long text after the second paragraph */}
                {index === 1 ? <blockquote className={story.quote}>{about.story.quote}</blockquote> : null}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="values-title">
        <SectionHeading id="values-title" title={about.valuesTitle} />
        <ul className={`${styles.cardGrid} ${styles.plainList}`} data-columns="3">
          {about.values.map((value) => (
            <li key={value.title} className={`${styles.valueCard} reveal`}>
              <h3 className={styles.valueTitle}>{value.title}</h3>
              <p>{value.text}</p>
            </li>
          ))}
        </ul>
        <div className={styles.actions}>
          <ButtonLink href={localizedPath(lang, "/contact")}>{dict.common.getInTouch}</ButtonLink>
        </div>
      </section>
    </>
  );
}
