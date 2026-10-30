import { BrandStar } from "@/components/brand-logo/brand-star";
import styles from "./glow-backdrop.module.css";

/**
 * Background for black subpage sections: pink and blue glows (like the footer) and faint
 * glitter stars from the logo as a watermark. The parent must be `position: relative` with
 * `isolation: isolate` (and should clip overflow); its content sits above this layer.
 */
interface GlowBackdropProps {
  /** "bottom" for a page section that ends at the footer; "both" for a block in the middle of a page */
  fade?: "bottom" | "both";
  /**
   * "page" = a few glows and four stars for one screen or so (subpages); "long" = glows and ten
   * stars spread over the whole height of a long block (the black part of the home page).
   */
  layout?: "page" | "long";
}

const pageMarks = [styles.markOne, styles.markTwo, styles.markThree, styles.markFour];
const longMarks = Array.from({ length: 10 }, (_, index) => styles[`long${index + 1}`]);

export function GlowBackdrop({ fade = "bottom", layout = "page" }: GlowBackdropProps) {
  const marks = layout === "long" ? longMarks : pageMarks;
  return (
    <div
      className={`${styles.backdrop} ${layout === "long" ? styles.long : ""} ${fade === "both" ? styles.fadeBoth : ""}`}
      aria-hidden="true"
    >
      {marks.map((position) => (
        <BrandStar key={position} className={`${styles.mark} ${position}`} />
      ))}
    </div>
  );
}
