'use server';
import { cookies } from 'next/headers';
export const changePassword = async (oldPass: string, newPass: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({ oldPass, newPass }),
    }
  );

  return await res.json();
};
