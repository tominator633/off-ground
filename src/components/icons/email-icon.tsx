import styles from "./icon.module.css";

interface IconProps {
  className?: string;
}

/** Envelope, used for the e-mail contact. Decorative – a visually hidden label names it. */
export function EmailIcon({ className }: IconProps) {
  return (
    <svg
      className={`${styles.icon} ${className ?? ""}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
      </g>
    </svg>
  );
}
