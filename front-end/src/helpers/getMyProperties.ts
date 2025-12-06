'use server';
import { cookies } from 'next/headers';

export const getMyProperties = async (
  searchTerm,
  selectedStatus,
  limit,
  currentPage
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/property/my-properties?search=${searchTerm}&${
      selectedStatus === 'all' ? '' : `status=${selectedStatus}`
    }&page=${currentPage}&limit=${limit}`,
    {
      headers: {
        Authorization: `${token}`,
      },
      cache: 'no-store',
    }
  );
  const data = await res.json();
  return data;
};
