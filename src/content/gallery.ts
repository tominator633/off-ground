import type { StaticImageData } from "next/image";
import photo01 from "@/assets/images/gallery/01.jpg";
import photo02 from "@/assets/images/gallery/02.jpg";
import photo03 from "@/assets/images/gallery/03.jpg";
import photo04 from "@/assets/images/gallery/04.jpg";
import photo05 from "@/assets/images/gallery/05.jpg";
import photo06 from "@/assets/images/gallery/06.jpg";
import photo07 from "@/assets/images/gallery/07.jpg";
import photo08 from "@/assets/images/gallery/08.jpg";
import photo09 from "@/assets/images/gallery/09.jpg";
import photo10 from "@/assets/images/gallery/10.jpg";
import photo11 from "@/assets/images/gallery/11.jpg";
import photo12 from "@/assets/images/gallery/12.jpg";
import photo13 from "@/assets/images/gallery/13.jpg";
import photo14 from "@/assets/images/gallery/14.jpg";
import photo15 from "@/assets/images/gallery/15.jpg";
import photo16 from "@/assets/images/gallery/16.jpg";
import photo17 from "@/assets/images/gallery/17.jpg";
import photo18 from "@/assets/images/gallery/18.jpg";
import photo19 from "@/assets/images/gallery/19.jpg";
import photo20 from "@/assets/images/gallery/20.jpg";

// Photos from the first Off Ground (10/10/2026), picked from "Nálož 01" and "Nálož 02"
// and resized to max. 2000 px. Order mixes night/day and landscape/portrait for the masonry grid.

export interface GalleryPhoto {
  src: StaticImageData;
}

const photos: StaticImageData[] = [
  photo01,
  photo02,
  photo03,
  photo04,
  photo05,
  photo06,
  photo07,
  photo08,
  photo09,
  photo10,
  photo11,
  photo12,
  photo13,
  photo14,
  photo15,
  photo16,
  photo17,
  photo18,
  photo19,
  photo20,
];

export function getGalleryPhotos(): GalleryPhoto[] {
  return photos.map((src) => ({ src }));
}

/** Three landscape shots for the "Moments" teaser on the home page. */
export function getHighlightPhotos(): GalleryPhoto[] {
  return [photo01, photo02, photo10].map((src) => ({ src }));
}
