import type { StaticImageData } from "next/image";
import type { ComponentType, ReactNode } from "react";
import { PhotoBackdrop } from "@/components/photo-backdrop/photo-backdrop";
import styles from "./page-header.module.css";

interface PageHeaderProps {
  title: string;
  lead?: string;
  /** Icon of the section (the same one as in the menu), shown left of the title. */
  icon?: ComponentType<{ className?: string }>;
  /** Event photo behind the title (toned like the home page hero). */
  image?: StaticImageData;
  /** CSS object-position for the photo crop. */
  imagePosition?: string;
  children?: ReactNode;
}

/** Title block at the top of every subpage – centred, with an optional photo band behind it. */
export function PageHeader({ title, lead, icon: Icon, image, imagePosition, children }: PageHeaderProps) {
  return (
    <header className={`${styles.header} ${image ? styles.withPhoto : ""}`}>
      {image ? <PhotoBackdrop src={image} position={imagePosition} /> : null}
      <div className="container">
        <h1 className={styles.title}>
          {Icon ? <Icon className={styles.icon} /> : null}
          <span className={styles.titleText}>{title}</span>
        </h1>
        {lead ? <p className={styles.lead}>{lead}</p> : null}
        {children}
      </div>
    </header>
  );
}
