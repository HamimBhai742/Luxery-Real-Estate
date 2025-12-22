'use server';
import { cookies } from 'next/headers';
import { PromoFormData } from './createPromo';

export const updatePromo = async (id: string, formData: PromoFormData) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/promo/update/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify(formData),
    }
  );

  const data = await res.json();
  return data;
};
