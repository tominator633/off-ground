import { ButtonLink } from "@/components/button-link/button-link";
import { PageHeader } from "@/components/page-header/page-header";
import { localizedPath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import subpage from "@/styles/subpage.module.css";

export default async function NotFound() {
  const [lang, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <>
      <PageHeader title={dict.notFound.title} lead={dict.notFound.text} />
      <section className={`container ${subpage.section}`}>
        <ButtonLink href={localizedPath(lang)}>{dict.notFound.back}</ButtonLink>
      </section>
    </>
  );
}
