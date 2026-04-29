import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  // Redirect www → non-www with explicit 301
  if (
    host === "www.worthulator.com" ||
    host.startsWith("www.worthulator.com:")
  ) {
    const url = request.nextUrl.clone();
    url.hostname = "worthulator.com";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Run on all paths except Next.js internals and static assets
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
