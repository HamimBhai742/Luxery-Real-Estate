import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const { accessToken } = await req.json();
  if (!accessToken) {
    return NextResponse.json({ message: 'No token provided' }, { status: 400 });
  }
  const response = NextResponse.json({ message: 'Cookie set successfully!' });
  response.cookies.set({
    name: 'accessToken',
    value: accessToken,
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
  });
  return response;
}

export async function PUT(req: Request) {
  const url = new URL(req.url);
  const endpoint = url.searchParams.get('endpoint');
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  const formData = await req.formData();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    method: 'PUT',
    headers: { Authorization: `${token}` },
    body: formData,
  });

  return NextResponse.json(await res.json());
}
