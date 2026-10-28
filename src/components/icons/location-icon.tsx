import styles from "./icon.module.css";

interface IconProps {
  className?: string;
}

/** Map pin, used for the address. Decorative – a visually hidden label names it. */
export function LocationIcon({ className }: IconProps) {
  return (
    <svg
      className={`${styles.icon} ${className ?? ""}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11" />
        <circle cx="12" cy="10" r="2.5" />
      </g>
    </svg>
  );
}
