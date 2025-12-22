'use server';

import { cookies } from 'next/headers';

export interface PromoFormData {
  code: string;
  discount: number;
  validFrom: string;
  validTo: string;
}

export const createPromo = async (formData: PromoFormData) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/promo/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  return data;
};
