"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { StarLoader } from "@/components/star-loader/star-loader";
import type { GalleryPhoto } from "@/content/gallery";
import type { Dictionary } from "@/i18n/dictionaries/en";
import styles from "./photo-gallery.module.css";

interface PhotoGalleryProps {
  photos: GalleryPhoto[];
  alt: string;
  labels: Dictionary["gallery"];
}

/** Masonry grid of event photos; a click opens the photo full screen in a native <dialog>. */
export function PhotoGallery({ photos, alt, labels }: PhotoGalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState<number | null>(null);
  // Thumbnails that finished loading – they fade in over their blur placeholder
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set());

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (current !== null && !dialog.open) dialog.showModal();
    if (current === null && dialog.open) dialog.close();
  }, [current]);

  const step = (delta: number) =>
    setCurrent((index) => (index === null ? null : (index + delta + photos.length) % photos.length));

  const photo = current !== null ? photos[current] : null;
  // Neighbours of the open photo load in the background, so prev/next is instant
  const neighbours =
    current !== null
      ? [photos[(current + 1) % photos.length], photos[(current - 1 + photos.length) % photos.length]]
      : [];

  return (
    <>
      <ul className={styles.grid}>
        {photos.map((item, index) => (
          <li key={item.src.src} className={`${styles.item} reveal`}>
            <button type="button" className={styles.thumb} onClick={() => setCurrent(index)}>
              <Image
                src={item.src}
                alt={`${alt} (${index + 1}/${photos.length})`}
                sizes="(min-width: 90rem) 22rem, (min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw"
                placeholder="blur"
                className={styles.image}
                data-loaded={loaded.has(index)}
                onLoad={() => setLoaded((prev) => new Set(prev).add(index))}
              />
              {/* The logo star while the photo is still loading (the blurred preview shows under it) */}
              {loaded.has(index) ? null : <StarLoader className={styles.thumbLoader} />}
              <span className="visually-hidden">{labels.open}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label={labels.viewer}
        onClose={() => setCurrent(null)}
        onClick={(event) => {
          // A click on the dark backdrop (the dialog itself, not its content) closes it
          if (event.target === event.currentTarget) setCurrent(null);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
      >
        {photo && current !== null ? (
          <>
            <div className={styles.stage}>
              <Image
                key={photo.src.src}
                src={photo.src}
                alt={`${alt} (${current + 1}/${photos.length})`}
                fill
                sizes="100vw"
                placeholder="blur"
                className={styles.full}
              />
            </div>
            {neighbours.map((item) => (
              <div key={`preload-${item.src.src}`} className={styles.preload} aria-hidden="true">
                <Image src={item.src} alt="" fill sizes="100vw" loading="eager" />
              </div>
            ))}
            <p className={styles.counter} aria-live="polite">
              {current + 1} / {photos.length}
            </p>
            <button type="button" className={`${styles.control} ${styles.close}`} onClick={() => setCurrent(null)}>
              <span aria-hidden="true">✕</span>
              <span className="visually-hidden">{labels.close}</span>
            </button>
            <button type="button" className={`${styles.control} ${styles.prev}`} onClick={() => step(-1)}>
              <span aria-hidden="true">←</span>
              <span className="visually-hidden">{labels.previous}</span>
            </button>
            <button type="button" className={`${styles.control} ${styles.next}`} onClick={() => step(1)}>
              <span aria-hidden="true">→</span>
              <span className="visually-hidden">{labels.next}</span>
            </button>
          </>
        ) : null}
      </dialog>
    </>
  );
}
