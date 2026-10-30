import type { Dictionary } from "@/i18n/dictionaries/en";
import styles from "./faq-list.module.css";

interface FaqListProps {
  items: Dictionary["faq"]["items"];
}

/**
 * Questions as a numbered index (01, 02, …) that open on click – native <details>, no
 * JavaScript. The round toggle turns from + into × and fills pink when open.
 */
export function FaqList({ items }: FaqListProps) {
  return (
    <div className={styles.list}>
      {items.map((item, index) => (
        <details key={item.question} className={`${styles.item} reveal`}>
          <summary className={styles.question}>
            <span className={styles.number} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={styles.text}>{item.question}</span>
            <span className={styles.toggle} aria-hidden="true" />
          </summary>
          <p className={styles.answer}>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
