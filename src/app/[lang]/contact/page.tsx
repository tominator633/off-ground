import type { Metadata } from "next";
import contactPhoto from "@/assets/images/sections/contact.jpg";
import { ContactForm } from "@/components/contact-form/contact-form";
import { ContactIcon } from "@/components/icons/contact-icon";
import { PageHeader } from "@/components/page-header/page-header";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import subpage from "@/styles/subpage.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const [lang, dict] = await Promise.all([getLocale(), getDictionary()]);
  return pageMetadata(lang, "/contact", dict.contact.title, dict.contact.lead);
}

export default async function ContactPage() {
  const [lang, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <>
      <PageHeader icon={ContactIcon} title={dict.contact.title} lead={dict.contact.lead} image={contactPhoto} imagePosition="center 40%" />
      <section className={`container ${subpage.section}`}>
        <div className={subpage.narrow}>
          <ContactForm lang={lang} labels={dict.contact.form} />
        </div>
      </section>
    </>
  );
}
