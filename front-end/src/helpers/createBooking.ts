'use server';
import { cookies } from 'next/headers';

export const createBooking = async (id) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/booking/create-booking`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({ propertyId: id }),
      cache: 'no-store',
    }
  );
  const data = await res.json();
  return data;
};
