'use server';
import { cookies } from 'next/headers';

export const getAuth = async () => {
  const cookieStore = await cookies();
const token = cookieStore.get('accessToken')?.value;
console.log(token,'dd')
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
    method: 'POST',
    headers: {
      Authorization: `${token}`,
    },
  });
  const user = await res.json();
  return user;
};
