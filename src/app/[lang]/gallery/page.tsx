import type { Metadata } from "next";
import { AlbumCard } from "@/components/album-card/album-card";
import { PageTitle } from "@/components/page-title/page-title";
import { getAlbums } from "@/content/gallery";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const [lang, dict] = await Promise.all([getLocale(), getDictionary()]);
  return pageMetadata(lang, "/gallery", dict.gallery.title, dict.gallery.lead);
}

export default async function GalleryPage() {
  const [lang, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <>
      {/* "galerie" is in the header; one wide card per edition, the newest first, from the very top */}
      <PageTitle title={dict.gallery.title} />
      <div className={styles.albums}>
        {getAlbums().map((album) => (
          <AlbumCard key={album.slug} album={album} lang={lang} labels={dict.gallery} photoAlt={dict.common.photoAlt} />
        ))}
      </div>
    </>
  );
}
