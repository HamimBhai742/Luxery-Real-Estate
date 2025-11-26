import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ---- Allow /properties (only base page) ----
  if (pathname === "/properties") {
    return NextResponse.next();
  }

  // ---- Only protect /properties/[id] ----
  const isPropertyDetails = /^\/properties\/[^\/]+$/.test(pathname);

  if (!isPropertyDetails && pathname.startsWith("/properties")) {
    return NextResponse.next();
  }

  // Normal token check
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

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
      credentials: 'include',
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.log(err);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/properties/:path*','/my-bookings/:path*'],
};
