// Links and facts shared across pages. Handles come from the Off Ground Instagram posts.

export const social = {
  instagram: { handle: "@offground_fest", url: "https://www.instagram.com/offground_fest/" },
};

/**
 * Contact details shown next to the contact form. null = not known yet – the page then shows
 * a "coming soon" note. See docs/k-diskusi-s-organizatorem.md.
 */
export const contactDetails: {
  phone: string | null;
  email: string | null;
  address: string | null;
  /**
   * true = the values are made up for the design (Tom, 28. 10. 2026). They are shown as plain
   * text, not as tel:/mailto: links, so nobody calls or writes to a stranger by mistake.
   * Set to false once the real details are in.
   */
  placeholder: boolean;
} = {
  phone: "+420 777 123 456",
  // offground.cz has no DNS records (28. 10. 2026) – mail to it goes nowhere
  email: "info@offground.cz",
  address: "Kostnice Holešovice, Praha 7",
  placeholder: true,
};

export const partners = {
  restArt: { instagram: "https://www.instagram.com/rest.art_bar/" },
};
