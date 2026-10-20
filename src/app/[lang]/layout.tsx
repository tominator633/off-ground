import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { SiteHeader } from "@/components/site-header/site-header";
import { locales } from "@/i18n/config";
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

  return (
    <html lang={lang} className={interTight.variable} data-scroll-behavior="smooth">
      <body>
        <SiteHeader lang={lang} labels={dict.nav} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter lang={lang} dict={dict} />
      </body>
    </html>
  );
}
