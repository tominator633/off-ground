import Image from "next/image";
import Link from "next/link";
import type { GalleryAlbum } from "@/content/gallery";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { formatPosterDate } from "@/lib/format";
import styles from "./album-card.module.css";

interface AlbumCardProps {
  album: GalleryAlbum;
  lang: Locale;
  labels: Dictionary["gallery"];
  photoAlt: string;
}

/** Photos in the collage: 5 × 3 on desktop (phones show the first 3 × 3). */
const COLLAGE_SIZE = 15;

/**
 * A wide card for one album across the whole width: a collage of its first photos and a dark
 * bar with the date, title, place and description. The whole card opens the album.
 */
export function AlbumCard({ album, lang, labels, photoAlt }: AlbumCardProps) {
  const count = album.photos.length;
  // Czech has three forms: 1 fotka, 2–4 fotky, 5+ fotek
  const rule = new Intl.PluralRules(lang).select(count);
  const countLabel = rule === "one" || rule === "few" ? labels.photoCount[rule] : labels.photoCount.other;

  return (
    <article className={styles.card}>
      <Link href={localizedPath(lang, `/gallery/${album.slug}`)} className={styles.link}>
        <div className={styles.collage}>
          {album.photos.slice(0, COLLAGE_SIZE).map((photo, index) => (
            <div key={photo.src.src} className={styles.cell}>
              <Image
                src={photo.src}
                alt={index === 0 ? `${photoAlt} – ${album.title[lang]}` : ""}
                fill
                sizes="(min-width: 64rem) 20vw, 33vw"
                placeholder="blur"
                className={styles.photo}
              />
            </div>
          ))}
        </div>

        <div className={styles.info}>
          <div className={`container ${styles.infoInner}`}>
            {/* Full date of the event, set like on the posters (10/10/2026) */}
            <p className={styles.date}>{formatPosterDate(album.date)}</p>
            <h2 className={styles.title}>{album.title[lang]}</h2>
            <p className={styles.place}>{album.place[lang]}</p>
            <p className={styles.description}>{album.description[lang]}</p>
            <p className={styles.meta}>
              {count} {countLabel}
            </p>
            {/* On hover it flies up from the bottom row to the title (desktop) */}
            <span className={styles.more} aria-hidden="true">
              {labels.openAlbum} →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
