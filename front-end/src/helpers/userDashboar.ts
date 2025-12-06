'use server';
import { cookies } from 'next/headers';

export const getUserDashboard = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stats/user`, {
    method: 'GET',
    headers: {
      Authorization: `${token}`,
    },
  });
  const data = await res.json();
  return data;
};
