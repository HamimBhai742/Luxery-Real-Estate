'use server'
import { cookies } from 'next/headers';

export const createUsagePromo = async (code: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/promo/usage-promo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    body: JSON.stringify({ code }),
  });
  const data = await res.json();
  return data;
};
