'use server';
import { cookies } from 'next/headers';

export async function getBookings(
  search: string,
  status: 'all' | 'pending' | 'paid' | 'canceled',
  limit: number,
  page: number
) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/booking/my-bookings?${
        search === '' ? '' : `search=${search}`
      }&${
        status === 'all' ? '' : `status=${status}`
      }&page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `${token}`,
        },
        cache: 'no-store',
      }
    );

    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}
