import type { Metadata } from "next";
import aboutPhoto from "@/assets/images/sections/about.jpg";
import { BrandStar } from "@/components/brand-logo/brand-star";
import { ButtonLink } from "@/components/button-link/button-link";
import { PageHeader } from "@/components/page-header/page-header";
import { SectionHeading } from "@/components/section-heading/section-heading";
import { TieDye } from "@/components/tie-dye/tie-dye";
import { localizedPath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import styles from "@/styles/subpage.module.css";

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

      <section className={`container ${styles.section}`}>
        <div className={styles.twoColumns}>
          <div className={styles.prose}>
            {about.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <TieDye className={styles.visual}>
            <BrandStar className={styles.visualStar} />
          </TieDye>
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
