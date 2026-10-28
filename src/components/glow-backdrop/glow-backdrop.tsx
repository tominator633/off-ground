import { BrandStar } from "@/components/brand-logo/brand-star";
import styles from "./glow-backdrop.module.css";

/**
 * Background for black subpage sections: pink and blue glows (like the footer) and faint
 * glitter stars from the logo as a watermark. The parent must be `position: relative` with
 * `isolation: isolate` (and should clip overflow); its content sits above this layer.
 */
export function GlowBackdrop() {
  return (
    <div className={styles.backdrop} aria-hidden="true">
      {[styles.markOne, styles.markTwo, styles.markThree, styles.markFour].map((position) => (
        <BrandStar key={position} className={`${styles.mark} ${position}`} />
      ))}
    </div>
  );
}
