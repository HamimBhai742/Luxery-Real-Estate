import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // Allow /properties but protect /properties/[id]
  if (pathname === '/properties') return NextResponse.next();
  const isPropertyDetails = /^\/properties\/[^\/]+$/.test(pathname);
  if (!isPropertyDetails && pathname.startsWith('/properties'))
    return NextResponse.next();

  // ---- FIXED COOKIE READ ----
  const cookieStore = await cookies();
  const token = await cookieStore.get('accessToken')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      cache: 'no-store',
    });
    if (!res.ok) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/my-bookings/:path*', '/profile'],
};
