import type { ComponentType } from "react";
import { ZombiehoodAd, zombiehoodHeroClass } from "@/components/zombiehood-ad/zombiehood-ad";
import type { EditionTheme, NextEdition } from "@/content/events";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";

export interface EditionAdProps {
  edition: NextEdition;
  lang: Locale;
  labels: Dictionary["home"]["next"];
  ticketHref: string;
  /** The ticket link leaves the site (shop or Instagram) */
  ticketExternal: boolean;
  registerHref: string;
  lineupHref: string;
}

interface EditionThemeDesign {
  /** The ad on the right side of the hero, with its ticket button */
  Ad: ComponentType<EditionAdProps>;
  /**
   * Class for the whole hero section; it may set --photo-tint (colours over the photo) and
   * --edition-font / --edition-weight / --edition-tracking (lettering of the giant number).
   */
  heroClass: string;
}

/** Every edition theme has its own look of the home page hero. */
const themes: Record<EditionTheme, EditionThemeDesign> = {
  zombiehood: { Ad: ZombiehoodAd, heroClass: zombiehoodHeroClass },
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
