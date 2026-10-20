import styles from "./pillar-list.module.css";

interface PillarListProps {
  items: { title: string; text: string; points?: string[] }[];
}

/** Numbered feature cards with alternating pink and blue accents. */
export function PillarList({ items }: PillarListProps) {
  return (
    <ul className={styles.list}>
      {items.map((item, index) => (
        <li key={item.title} className={`${styles.card} reveal`}>
          <span className={styles.number} aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.text}>{item.text}</p>
          {item.points ? (
            <ul className={styles.points}>
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
