import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { PageTitle } from "@/components/page-title/page-title";
import { PhotoBackdrop } from "@/components/photo-backdrop/photo-backdrop";
import styles from "./page-header.module.css";

interface PageHeaderProps {
  title: string;
  lead?: string;
  /** Event photo behind the lead (toned like the home page hero). */
  image?: StaticImageData;
  /** CSS object-position for the photo crop. */
  imagePosition?: string;
  children?: ReactNode;
}

/**
 * Top of a subpage. The title itself is shown in the middle of the site header (PageTitle);
 * here is the lead and optional extras on an optional photo band.
 */
export function PageHeader({ title, lead, image, imagePosition, children }: PageHeaderProps) {
  return (
    <header className={`${styles.header} ${image ? styles.withPhoto : ""}`}>
      {image ? <PhotoBackdrop src={image} position={imagePosition} /> : null}
      <div className="container">
        <PageTitle title={title} />
        {lead ? <p className={styles.lead}>{lead}</p> : null}
        {children}
      </div>
    </header>
  );
}
