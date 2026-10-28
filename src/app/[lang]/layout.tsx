import type { Metadata, Viewport } from "next";
import { EditionMenuPromo } from "@/components/edition-ad/edition-ad";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { SiteHeader } from "@/components/site-header/site-header";
import { getNextEdition } from "@/content/events";
import { social } from "@/content/site";
import { locales, localizedPath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { interTight } from "@/lib/fonts";
import { isIndexingAllowed, siteUrl } from "@/lib/metadata";
import "@/styles/globals.css";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  const indexing = isIndexingAllowed();
  return {
    metadataBase: siteUrl(),
    title: { default: dict.meta.siteName, template: `%s | ${dict.meta.siteName}` },
    description: dict.meta.description,
    applicationName: dict.meta.siteName,
    robots: { index: indexing, follow: indexing },
    openGraph: { siteName: dict.meta.siteName },
  };
}

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const lang = await getLocale();
  const dict = await getDictionary();
  const next = getNextEdition();

  return (
    <html lang={lang} className={interTight.variable} data-scroll-behavior="smooth">
      <body>
        <SiteHeader
          lang={lang}
          labels={dict.nav}
          promo={
            <EditionMenuPromo
              edition={next}
              lang={lang}
              labels={dict.home.next}
              // Until tickets are on sale, the button leads to Instagram, where they'll be announced
              ticketHref={next.ticketUrl ?? social.instagram.url}
              ticketExternal
              registerHref={localizedPath(lang, "/contact")}
              lineupHref={`${localizedPath(lang)}#lineup`}
              homeHref={localizedPath(lang)}
            />
          }
        />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter lang={lang} dict={dict} />
      </body>
    </html>
  );
}
