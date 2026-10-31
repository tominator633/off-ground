import styles from "./icon.module.css";

interface IconProps {
  className?: string;
}

/** Tick, shown for a moment after something was copied. Decorative – a live region says it. */
export function CheckIcon({ className }: IconProps) {
  return (
    <svg
      className={`${styles.icon} ${className ?? ""}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m5 12.5 4.5 4.5L19 7.5"
      />
    </svg>
  );
}
