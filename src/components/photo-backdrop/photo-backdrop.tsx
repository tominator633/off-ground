import Image, { type StaticImageData } from "next/image";
import styles from "./photo-backdrop.module.css";

interface PhotoBackdropProps {
  src: StaticImageData;
  /** CSS object-position, e.g. "center 60%" – where to keep the subject when cropping. */
  position?: string;
  /** next/image sizes; full width by default. */
  sizes?: string;
  /** Load eagerly – true for heroes above the fold. */
  priority?: boolean;
  /** Flickering film grain – only the home page hero has it. */
  grain?: boolean;
}

/**
 * Full-bleed background photo toned in the pink/blue tie-dye colours of the posters, darkened
 * for legible text and fading into the black page. The parent must be `position: relative`
 * with `isolation: isolate`; its content sits above these layers.
 */
export function PhotoBackdrop({
  src,
  position = "center",
  sizes = "100vw",
  priority = true,
  grain = false,
}: PhotoBackdropProps) {
  return (
    <div className={styles.backdrop} aria-hidden="true">
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes={sizes}
        placeholder="blur"
        className={styles.image}
        // Per-photo crop is data, not styling – the one inline style in the project
        style={{ objectPosition: position }}
      />
      <div className={styles.tint} />
      <div className={styles.shade} />
      {grain ? <div className={styles.grain} /> : null}
    </div>
  );
}
