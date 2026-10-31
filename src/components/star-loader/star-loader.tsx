import { BrandStar } from "@/components/brand-logo/brand-star";
import styles from "./star-loader.module.css";

interface StarLoaderProps {
  className?: string;
}

/**
 * Loading sign: the glitter star of the logo, gently rocking and pulsing. It fades in only
 * after a short delay, so it never flashes when content loads fast. Decorative – the content
 * itself is announced once it's there.
 */
export function StarLoader({ className }: StarLoaderProps) {
  return (
    <span className={`${styles.loader} ${className ?? ""}`} aria-hidden="true">
      <BrandStar className={styles.star} />
    </span>
  );
}
