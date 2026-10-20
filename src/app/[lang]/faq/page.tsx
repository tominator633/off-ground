import type { Metadata } from "next";
import faqPhoto from "@/assets/images/sections/faq.jpg";
import { ButtonLink } from "@/components/button-link/button-link";
import { PageHeader } from "@/components/page-header/page-header";
import { localizedPath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import subpage from "@/styles/subpage.module.css";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const [lang, dict] = await Promise.all([getLocale(), getDictionary()]);
  return pageMetadata(lang, "/faq", dict.faq.title, dict.faq.lead);
}

export default async function FaqPage() {
  const [lang, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <>
      <PageHeader title={dict.faq.title} lead={dict.faq.lead} image={faqPhoto} imagePosition="center 40%" />
      <section className={`container ${subpage.section}`}>
        <div className={styles.list}>
          {dict.faq.items.map((item) => (
            <details key={item.question} className={`${styles.item} reveal`}>
              <summary className={styles.question}>{item.question}</summary>
              <p className={styles.answer}>{item.answer}</p>
            </details>
          ))}
        </div>
        <div className={subpage.actions}>
          <ButtonLink href={localizedPath(lang, "/contact")}>{dict.common.getInTouch}</ButtonLink>
        </div>
      </section>
    </>
  );
}
