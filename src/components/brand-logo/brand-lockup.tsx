import { BrandStar } from "./brand-star";
import styles from "./brand-lockup.module.css";

interface BrandLockupProps {
  className?: string;
  /** Renders the lettering as the page's h1 (the big logo in the home page hero). */
  headingId?: string;
  /** Marks the header's mini logo as the place the hero logo flies into. */
  dock?: boolean;
}

/**
 * The main logo: glitter star behind the stacked "Off / ground", as on the Instagram profile
 * picture. Everything is in em, so the size is set only by font-size and the big hero logo and
 * the mini one in the header are exact scaled copies (the flight on the home page relies on it).
 */
export function BrandLockup({ className, headingId, dock }: BrandLockupProps) {
  const classes = className ? `${styles.lockup} ${className}` : styles.lockup;
  const lettering = (
    <>
      Off
      <br />
      ground
    </>
  );

  if (headingId) {
    return (
      <div className={classes}>
        <BrandStar className={styles.star} />
        <h1 id={headingId} className={styles.title}>
          {lettering}
        </h1>
      </div>
    );
  }

  return (
    <span className={classes} data-logo-dock={dock ? "" : undefined}>
      <BrandStar className={styles.star} />
      <span className={styles.title}>{lettering}</span>
    </span>
  );
}
