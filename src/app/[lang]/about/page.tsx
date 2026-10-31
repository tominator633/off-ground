import type { Metadata } from "next";
import Image from "next/image";
import { Fragment } from "react";
import storyPhoto from "@/assets/images/sections/about-story.jpg";
import { BrandStar } from "@/components/brand-logo/brand-star";
import { ButtonLink } from "@/components/button-link/button-link";
import { GlowBackdrop } from "@/components/glow-backdrop/glow-backdrop";
import { PageTitle } from "@/components/page-title/page-title";
import { localizedPath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
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
      {/* No title block: "o nás" is shown in the header from the start, the story opens the page */}
      <PageTitle title={about.title} />

      <section className={story.story} aria-labelledby="story-title">
        {/* Pink and blue glows with watermark stars from the logo */}
        <GlowBackdrop />
        <div className={`container ${story.storyInner}`}>
          {/* The two founders (photo from Tom, 30. 10. 2026) */}
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

      {/*
        Values as a numbered poster index (like the FAQ on the home page): a small coloured
        number, the value in poster lettering, its text beside it, thin lines between.
      */}
      <section className={`container ${story.values}`} aria-labelledby="values-title">
        <h2 id="values-title" className={`${story.valuesTitle} reveal`}>
          {about.valuesTitle}
        </h2>
        <ul className={story.manifesto}>
          {about.values.map((value, index) => (
            <li key={value.title} className={`${story.manifestoRow} reveal`}>
              <span className={story.manifestoNumber} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className={story.manifestoWord}>{value.title}</h3>
              <p className={story.manifestoText}>{value.text}</p>
            </li>
          ))}
        </ul>
        <ButtonLink href={localizedPath(lang, "/contact")} variant="outline" className={story.manifestoCta}>
          {dict.common.getInTouch} →
        </ButtonLink>
      </section>
    </>
  );
}
