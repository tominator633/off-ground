import type { Metadata } from "next";
import galleryPhoto from "@/assets/images/sections/gallery.jpg";
import { GalleryIcon } from "@/components/icons/gallery-icon";
import { PageHeader } from "@/components/page-header/page-header";
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
      <PageHeader icon={GalleryIcon} title={dict.gallery.title} lead={dict.gallery.lead} image={galleryPhoto} imagePosition="center 40%" />
      <section className={`container ${subpage.section}`}>
        <PhotoGallery photos={getGalleryPhotos()} alt={dict.common.photoAlt} labels={dict.gallery} />
      </section>
    </>
  );
}
