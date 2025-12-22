'use server';
import { cookies } from 'next/headers';

export const deletePromo = async (id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/promo/delete/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    }
  );

  const data = await res.json();
  return data;
};
