import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, hasLocale, resolveLocale } from "@/i18n/config";

/**
 * Every page lives under /cs or /en; anything else is redirected to the visitor's language:
 * explicit choice (cookie) → browser language → GeoIP country → Czech. See resolveLocale().
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1] ?? "";

  if (hasLocale(firstSegment)) return NextResponse.next();

  const locale = resolveLocale({
    cookie: request.cookies.get(LOCALE_COOKIE)?.value,
    acceptLanguage: request.headers.get("accept-language"),
    // Set by Vercel on every request; absent in local development
    country: request.headers.get("x-vercel-ip-country"),
  });
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  const response = NextResponse.redirect(url);
  response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

export const config = {
  // Skip Next internals, metadata routes and anything that looks like a file.
  matcher: ["/((?!_next|api|robots.txt|sitemap.xml|icon|apple-icon|.*\\..*).*)"],
};
