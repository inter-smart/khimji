import { NextResponse } from "next/server";

const SUPPORTED_LOCALES = ["en", "ar"];
const DEFAULT_LOCALE = "en";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Ignore next internals & static files
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  // Case 1: "/" → "/en"
  if (segments.length === 0) {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url));
  }

  // Case 2: already has valid locale → allow
  if (SUPPORTED_LOCALES.includes(firstSegment)) {
    return NextResponse.next();
  }

  // Case 3: missing locale → prepend default locale
  return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url));
}
