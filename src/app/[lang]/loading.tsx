import { StarLoader } from "@/components/star-loader/star-loader";
import styles from "./loading.module.css";

/**
 * Shown while a section opened from the menu is still loading (when it wasn't prefetched yet).
 * The star appears only after a short delay, so fast navigations never flash it.
 */
export default function Loading() {
  return (
    <div className={styles.loading}>
      <StarLoader />
    </div>
  );
}
