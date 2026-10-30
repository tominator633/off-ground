import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageTitle } from "@/components/page-title/page-title";
import { PhotoGallery } from "@/components/photo-gallery/photo-gallery";
import { getAlbum, getAlbums } from "@/content/gallery";
import { localizedPath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export async function generateStaticParams() {
  return getAlbums().map((album) => ({ album: album.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/gallery/[album]">): Promise<Metadata> {
  const { album: slug } = await params;
  const album = getAlbum(slug);
  if (!album) return {};
  const lang = await getLocale();
  return pageMetadata(lang, `/gallery/${slug}`, album.title[lang], album.description[lang]);
}

// Reading the slug is URL data; behind <Suspense> client navigations stay instant.
export default function AlbumPage({ params }: PageProps<"/[lang]/gallery/[album]">) {
  return (
    <Suspense fallback={<div className={styles.fallback} />}>
      <Album params={params} />
    </Suspense>
  );
}

/** All photos of one album in the masonry grid; a click opens them full screen. */
async function Album({ params }: { params: PageProps<"/[lang]/gallery/[album]">["params"] }) {
  const { album: slug } = await params;
  const album = getAlbum(slug);
  if (!album) notFound();

  const [lang, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <>
      <PageTitle title={album.title[lang]} />
      <section className={`container ${styles.album}`}>
        <Link href={localizedPath(lang, "/gallery")} className={styles.back}>
          ← {dict.gallery.backToGallery}
        </Link>
        <PhotoGallery photos={album.photos} alt={dict.common.photoAlt} labels={dict.gallery} />
      </section>
    </>
  );
}
