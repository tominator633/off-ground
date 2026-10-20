import type { LineupItem } from "@/content/events";
import styles from "./line-up.module.css";

interface LineUpProps {
  items: LineupItem[];
}

/** Time + act, stacked and centred like the Off Ground line-up poster. */
export function LineUp({ items }: LineUpProps) {
  return (
    <ol className={styles.lineup}>
      {items.map((item) => (
        <li key={`${item.time}-${item.title}`} className={`${styles.item} reveal`}>
          <time className={styles.time}>{item.time}</time>
          <span className={styles.title}>{item.title}</span>
          {item.versus ? (
            <span className={styles.versus}>
              <span className={styles.left}>{item.versus[0]}</span> vs{" "}
              <span className={styles.right}>{item.versus[1]}</span>
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
