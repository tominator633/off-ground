import type { Metadata } from "next";
import partnersPhoto from "@/assets/images/sections/partners.jpg";
import { ButtonLink } from "@/components/button-link/button-link";
import { PartnersIcon } from "@/components/icons/partners-icon";
import { InstagramButton } from "@/components/instagram-button/instagram-button";
import { PageHeader } from "@/components/page-header/page-header";
import { partners } from "@/content/site";
import { localizedPath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import subpage from "@/styles/subpage.module.css";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const [lang, dict] = await Promise.all([getLocale(), getDictionary()]);
  return pageMetadata(lang, "/partners", dict.partners.title, dict.partners.lead);
}

export default async function PartnersPage() {
  const [lang, dict] = await Promise.all([getLocale(), getDictionary()]);
  const { partners: labels } = dict;

  return (
    <>
      <PageHeader icon={PartnersIcon} title={labels.title} lead={labels.lead} image={partnersPhoto} imagePosition="center 55%" />
      <section className={`container ${subpage.section}`}>
        <article className={`${styles.partner} reveal`}>
          <p className={styles.label}>{labels.official}</p>
          <h2 className={styles.name}>{labels.restArt.name}</h2>
          <p className={styles.text}>{labels.restArt.text}</p>
          <InstagramButton href={partners.restArt.instagram}>{labels.restArt.link}</InstagramButton>
        </article>
      </section>
      <section className={`container ${subpage.section}`}>
        <div className={subpage.panel}>
          <h2 className={subpage.panelTitle}>{labels.becomeTitle}</h2>
          <p className={subpage.panelText}>{labels.becomeText}</p>
          <div className={subpage.actions}>
            <ButtonLink href={localizedPath(lang, "/contact")}>{dict.common.getInTouch}</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
