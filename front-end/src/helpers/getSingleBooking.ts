'use server';
import { cookies } from 'next/headers';

export const getSingleBooking = async (bookingId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/booking/${bookingId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  const data = await res.json();
  return data;
};
