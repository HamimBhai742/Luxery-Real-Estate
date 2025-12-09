'use server';
import { cookies } from 'next/headers';

export const updateUserStatus = async (
  status: 'active' | 'inactive',
  userId: string
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/update-status/${userId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({ status }),
    }
  );
  const data = await response.json();
  return data;
};
