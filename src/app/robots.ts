import type { MetadataRoute } from "next";
import { isIndexingAllowed } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  return isIndexingAllowed()
    ? { rules: { userAgent: "*", allow: "/" } }
    : { rules: { userAgent: "*", disallow: "/" } };
}
