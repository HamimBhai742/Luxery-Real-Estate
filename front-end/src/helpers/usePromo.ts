'use server';
import { cookies } from 'next/headers';

export const usePromo = async (code: string, bookingId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/promo/use`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    body: JSON.stringify({ code, bookingId }),
  });
  const data = await res.json();
  return data;
};
