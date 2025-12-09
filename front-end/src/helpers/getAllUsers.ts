'use server';
import { cookies } from 'next/headers';

export const getAllUsers = async (
  currentPage: number,
  limit: number,
  searchTerm: string,
  statusFilter: string
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/user?page=${currentPage}&limit=${limit}&${
      searchTerm === '' ? '' : `search=${searchTerm}`
    }&${statusFilter === 'ALL' ? '' : `status=${statusFilter}`}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      cache: 'no-cache',
    }
  );
  const data = await res.json();
  return data;
};
