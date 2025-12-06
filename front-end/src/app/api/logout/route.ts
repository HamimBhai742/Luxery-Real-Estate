// app/api/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({
    message: 'Logout successfully!',
    success: true,
  });

  // Proper way to remove cookie
  response.cookies.set('accessToken', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'none'

  });

  return response;
}
