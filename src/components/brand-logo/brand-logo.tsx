import { BrandStar } from "./brand-star";
import styles from "./brand-logo.module.css";

/**
 * Horizontal logo: glitter star (SVG) + "Off ground" as live text, styled like the posters
 * (bold, very tight tracking, offset shadow).
 * Size is tuned by the parent via --logo-height (star) and --logo-scale (lettering).
 */
export function BrandLogo() {
  return (
    <span className={styles.logo}>
      <BrandStar className={styles.star} />
      <span className={styles.wordmark}>Off ground</span>
    </span>
  );
}
