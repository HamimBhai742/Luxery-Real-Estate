// app/api/proxy/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { accessToken } = await req.json();
  console.log(accessToken);
  if (!accessToken) {
    return NextResponse.json({ message: 'No token provided' }, { status: 400 });
  }

  const response = NextResponse.json({ message: 'Cookie set successfully!' });

  response.cookies.set({
    name: 'accessToken',
    value: accessToken,
    httpOnly: true,
    secure: true,
    sameSite: 'none', // cross-site হলে 'none', অন্যথায় 'lax'
    // path: '/',
  });

  return response;
}
