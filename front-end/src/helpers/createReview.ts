'use server';
import { ICreateReview } from '@/types/review';
import { cookies } from 'next/headers';

export const createReview = async (payload: ICreateReview) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/review/create`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify(payload),
    }
  );
  const data = await res.json();
  return data;
};
