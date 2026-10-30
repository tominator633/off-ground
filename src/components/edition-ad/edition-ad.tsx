import type { ComponentType } from "react";
import {
  ZombiehoodAd,
  ZombiehoodMenuButton,
  zombiehoodHeroClass,
} from "@/components/zombiehood-ad/zombiehood-ad";
import type { EditionTheme, NextEdition } from "@/content/events";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import styles from "./edition-ad.module.css";

export interface EditionAdProps {
  edition: NextEdition;
  lang: Locale;
  labels: Dictionary["home"]["next"];
  ticketHref: string;
  /** The ticket link leaves the site (shop or Instagram) */
  ticketExternal: boolean;
  /** Battle sign-up and line-up buttons; each is left out when not given (home hero) */
  registerHref?: string;
  lineupHref?: string;
  /** The edition's detail page; when set, the whole ad links to it (events page banner) */
  detailHref?: string;
  /**
   * "hero" = right side of the home page hero (ticket button at the bottom of the hero);
   * "menu" = right side of the open menu (desktop); "banner" = the wide banner on the events page.
   */
  placement?: "hero" | "menu" | "banner";
}

interface EditionMenuButtonProps {
  edition: NextEdition;
  href: string;
  label: string;
}

interface EditionThemeDesign {
  /** The ad on the right side of the hero (and of the desktop menu), with its ticket button */
  Ad: ComponentType<EditionAdProps>;
  /** Small themed button for the menu on phones */
  MenuButton: ComponentType<EditionMenuButtonProps>;
  /**
   * Class for the whole hero section; it may set --photo-tint (colours over the photo) and
   * --edition-font / --edition-weight / --edition-tracking (lettering of the giant number).
   */
  heroClass: string;
}

/** Every edition theme has its own look of the home page hero and of the menu promo. */
const themes: Record<EditionTheme, EditionThemeDesign> = {
  zombiehood: { Ad: ZombiehoodAd, MenuButton: ZombiehoodMenuButton, heroClass: zombiehoodHeroClass },
};

export function editionHeroClass(theme: EditionTheme): string {
  return themes[theme].heroClass;
}

/**
 * The right side of the home page hero: an ad for the next edition in that edition's theme,
 * plus its ticket button (positioned by the theme at the bottom centre of the hero).
 */
export function EditionAd(props: EditionAdProps) {
  const { Ad } = themes[props.edition.theme];
  return <Ad {...props} />;
}

interface EditionMenuPromoProps extends Omit<EditionAdProps, "placement"> {
  /** Where the phone button leads (the home page, whose hero has the full ad) */
  homeHref: string;
}

/**
 * The next edition in the open menu: the full themed ad on desktop, one themed button on
 * phones and tablets.
 */
export function EditionMenuPromo({ homeHref, ...props }: EditionMenuPromoProps) {
  const { Ad, MenuButton } = themes[props.edition.theme];
  return (
    <>
      <div className={styles.menuAd}>
        <Ad {...props} placement="menu" />
      </div>
      <div className={styles.menuButton}>
        <MenuButton edition={props.edition} href={homeHref} label={props.labels.label} />
      </div>
    </>
  );
}
