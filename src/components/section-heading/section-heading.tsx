import styles from "./section-heading.module.css";

interface SectionHeadingProps {
  title: string;
  intro?: string;
  id?: string;
  align?: "start" | "center";
}

export function SectionHeading({ title, intro, id, align = "start" }: SectionHeadingProps) {
  return (
    <div className={`${styles.heading} ${align === "center" ? styles.center : ""}`}>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {intro ? <p className={styles.intro}>{intro}</p> : null}
    </div>
  );
}
