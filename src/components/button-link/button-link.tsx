import Link from "next/link";
import type { ComponentProps } from "react";
import styles from "./button-link.module.css";

interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: "primary" | "outline" | "dark";
}

export function ButtonLink({ variant = "primary", className, ...props }: ButtonLinkProps) {
  return <Link {...props} className={`${styles.button} ${styles[variant]} ${className ?? ""}`} />;
}

export { styles as buttonStyles };
