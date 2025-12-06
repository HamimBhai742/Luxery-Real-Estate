'use server';
import { cookies } from 'next/headers';

export const getPayment = async (bookingId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/payment/initiate-payment`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },

      body: JSON.stringify({ bookingId }),
    }
  );
  const data = await res.json();
  return data;
};
