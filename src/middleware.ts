// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith("/success/") &&
    request.method === "POST"
  ) {
    // Редиректим на тот же урл, но как GET
    return NextResponse.redirect(request.nextUrl, 302);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/success/:slug*"],
};
