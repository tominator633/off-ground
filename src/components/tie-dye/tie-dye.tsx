import type { ReactNode } from "react";
import styles from "./tie-dye.module.css";

interface TieDyeProps {
  className?: string;
  children?: ReactNode;
}

/** Soft pink/blue/coral colour clouds with film grain – the background of the Off Ground posters. */
export function TieDye({ className, children }: TieDyeProps) {
  return <div className={`${styles.tieDye} ${className ?? ""}`}>{children}</div>;
}
