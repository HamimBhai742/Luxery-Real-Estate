import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const url = new URL(req.url);
  const endpoint = url.searchParams.get('endpoint');

  if (!endpoint) {
    const { accessToken } = await req.json();
    if (!accessToken) {
      return NextResponse.json({ message: 'No token provided' }, { status: 400 });
    }
    const response = NextResponse.json({ message: 'Cookie set successfully!' });
    response.cookies.set({ name: 'accessToken', value: accessToken, httpOnly: true, secure: false });
    return response;
  }

  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  
  const body = req.headers.get('content-type')?.includes('application/json') ? await req.json() : null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `${token}` },
    body: body ? JSON.stringify(body) : undefined,
  });

  return NextResponse.json(await res.json());
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
