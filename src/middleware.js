import { NextRequest, NextResponse } from 'next/server';

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/api') || pathname.startsWith('/favicon.png') || pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  if (!pathname.startsWith('/sendEmail')) {
    return NextResponse.redirect(new URL('/sendEmail', request.url));
  }

  return NextResponse.next();
}

