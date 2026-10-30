import type { Metadata } from "next";
import type { ComponentType, ReactNode } from "react";
import contactPhoto from "@/assets/images/sections/contact.jpg";
import { BrandStar } from "@/components/brand-logo/brand-star";
import { ContactForm } from "@/components/contact-form/contact-form";
import { ContactIcon } from "@/components/icons/contact-icon";
import { EmailIcon } from "@/components/icons/email-icon";
import { LocationIcon } from "@/components/icons/location-icon";
import { InstagramButton } from "@/components/instagram-button/instagram-button";
import { PageTitle } from "@/components/page-title/page-title";
import { PhotoBackdrop } from "@/components/photo-backdrop/photo-backdrop";
import { contactDetails, social } from "@/content/site";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const [lang, dict] = await Promise.all([getLocale(), getDictionary()]);
  return pageMetadata(lang, "/contact", dict.contact.title, dict.contact.lead);
}

export default async function ContactPage() {
  const [lang, dict] = await Promise.all([getLocale(), getDictionary()]);
  const { details } = dict.contact;
  const { phone, email, address, placeholder } = contactDetails;
  // Unknown details show a "coming soon" note; made-up ones are plain text, not links
  const soon = <span className={styles.soon}>{details.soon}</span>;
  const linked = (value: string, href: string) => (placeholder ? value : <a href={href}>{value}</a>);

  // Each detail is an icon; the label is only for screen readers. Instagram is the same
  // outlined button as in the footer (it brings its own icon).
  const items: { label: string; Icon?: ComponentType<{ className?: string }>; value: ReactNode }[] = [
    {
      label: details.phone,
      Icon: ContactIcon,
      value: phone ? linked(phone, `tel:${phone.replace(/\s/g, "")}`) : soon,
    },
    { label: details.email, Icon: EmailIcon, value: email ? linked(email, `mailto:${email}`) : soon },
    {
      label: details.instagram,
      value: (
        <InstagramButton href={social.instagram.url} size="sm">
          {social.instagram.handle}
        </InstagramButton>
      ),
    },
    { label: details.address, Icon: LocationIcon, value: address ?? soon },
  ];

  return (
    <>
      {/* "kontakt" is in the header; the page is one full-screen photo with the content on it */}
      <PageTitle title={dict.contact.title} />
      <section className={styles.stage}>
        <PhotoBackdrop src={contactPhoto} position="center 40%" />
        <div className={`container ${styles.layout}`}>
          {/* Left: how to reach us (desktop) – below the form on phones */}
          <div className={styles.info}>
            <p className={styles.lead}>{dict.contact.lead}</p>
            <p className={styles.infoText}>{details.text}</p>
            <ul className={styles.details}>
              {items.map(({ label, Icon, value }) => (
                <li key={label} className={styles.detail}>
                  {Icon ? <Icon className={styles.detailIcon} /> : null}
                  <span className="visually-hidden">{label}: </span>
                  {Icon ? <span className={styles.detailText}>{value}</span> : value}
                </li>
              ))}
            </ul>
            {/* PLACEHOLDER for a Google Maps embed (needs the address and the CSP frame-src for google.com) */}
            <div className={styles.map}>
              <BrandStar className={styles.mapStar} />
              <span>{details.mapSoon}</span>
            </div>
          </div>

          <div className={styles.formColumn}>
            <ContactForm lang={lang} labels={dict.contact.form} />
          </div>
        </div>
      </section>
    </>
  );
}
