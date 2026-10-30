import type { ComponentType, ReactNode } from "react";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import styles from "./instagram-button.module.css";

interface InstagramButtonProps {
  href: string;
  children: ReactNode;
  size?: "md" | "sm";
  /** Icon before the text; Instagram by default (the same button also opens Google Maps) */
  icon?: ComponentType<{ className?: string }>;
}

/** Outline pill button with the Instagram icon; opens the profile in a new tab. */
export function InstagramButton({ href, children, size = "md", icon: Icon = InstagramIcon }: InstagramButtonProps) {
  return (
    <a href={href} className={`${styles.button} ${styles[size]}`} target="_blank" rel="noopener noreferrer">
      <Icon className={styles.icon} />
      <span>{children}</span>
    </a>
  );
}
