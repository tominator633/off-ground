import { Encode_Sans_Expanded, Inter_Tight } from "next/font/google";

/**
 * Poster lettering: logo, headings and the menu. Off Ground posters are set in Helvetica Neue
 * (bold, very tight tracking); Inter Tight is the closest free match. Variable font – any
 * weight 100–900. latin-ext is required for Czech diacritics (ě, š, č, ř, ž, ů …).
 */
export const interTight = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter-tight",
});

/**
 * Running text (paragraphs, buttons, forms). Not a variable font, so only the weights the
 * site uses are loaded.
 */
export const encodeSansExpanded = Encode_Sans_Expanded({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-encode-sans-expanded",
});
