import { Inter_Tight } from "next/font/google";

/**
 * The one font of the site. Off Ground posters are set in Helvetica Neue (bold, very tight
 * tracking); Inter Tight is the closest free match. Variable font – any weight 100–900.
 * latin-ext is required for Czech diacritics (ě, š, č, ř, ž, ů …).
 */
export const interTight = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter-tight",
});

