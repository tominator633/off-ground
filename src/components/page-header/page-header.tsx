import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { PhotoBackdrop } from "@/components/photo-backdrop/photo-backdrop";
import styles from "./page-header.module.css";

interface PageHeaderProps {
  title: string;
  lead?: string;
  /** Event photo behind the title (toned like the home page hero). */
  image?: StaticImageData;
  /** CSS object-position for the photo crop. */
  imagePosition?: string;
  children?: ReactNode;
}

/** Title block at the top of every subpage – with a photo it becomes a large hero like on the home page. */
export function PageHeader({ title, lead, image, imagePosition, children }: PageHeaderProps) {
  return (
    <header className={`${styles.header} ${image ? styles.withPhoto : ""}`}>
      {image ? <PhotoBackdrop src={image} position={imagePosition} /> : null}
      <div className="container">
        <h1 className={styles.title}>{title}</h1>
        {lead ? <p className={styles.lead}>{lead}</p> : null}
        {children}
      </div>
    </header>
  );
}
