import type { Dictionary } from "@/i18n/dictionaries/en";
import styles from "./faq-list.module.css";

interface FaqListProps {
  items: Dictionary["faq"]["items"];
}

/** Questions that open on click (native <details>, no JavaScript). */
export function FaqList({ items }: FaqListProps) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <details key={item.question} className={`${styles.item} reveal`}>
          <summary className={styles.question}>{item.question}</summary>
          <p className={styles.answer}>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
