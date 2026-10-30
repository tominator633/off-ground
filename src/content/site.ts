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
   * true = the values are made up for a design draft. They are then shown as plain text, not as
   * tel:/mailto: links, so nobody calls or writes to a stranger by mistake.
   */
  placeholder: boolean;
} = {
  // Organizer contact from the first event's Boom Events page (30. 10. 2026)
  phone: "+420 792 645 345",
  email: "offgroundevent@gmail.com",
  // No street address known – only the city (the first event was at Burza #4, Holešovická tržnice)
  address: "Praha",
  placeholder: false,
};

export const partners = {
  restArt: {
    website: "https://www.restartbar.net/",
    instagram: "https://www.instagram.com/rest.art_bar/",
  },
};
