import type { Metadata } from "next";
import { PageTitle } from "@/components/page-title/page-title";
import { PhotoGallery } from "@/components/photo-gallery/photo-gallery";
import { getGalleryPhotos } from "@/content/gallery";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import subpage from "@/styles/subpage.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const [lang, dict] = await Promise.all([getLocale(), getDictionary()]);
  return pageMetadata(lang, "/gallery", dict.gallery.title, dict.gallery.lead);
}

export default async function GalleryPage() {
  const dict = await getDictionary();

  return (
    <>
      {/* No title block: "galerie" is in the header and the photos start right at the top */}
      <PageTitle title={dict.gallery.title} />
      <section className={`container ${subpage.section} ${subpage.pageStart}`}>
        <PhotoGallery photos={getGalleryPhotos()} alt={dict.common.photoAlt} labels={dict.gallery} />
      </section>
    </>
  );
}
