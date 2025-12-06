'use server';
import { PropertyFormData, PropertyPayload } from '@/types/property';
import { cookies } from 'next/headers';

export const createProperty = async (
  formData: PropertyFormData,
  payload: PropertyPayload
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  const formDatas = new FormData();
  formData.images.forEach((img) => formDatas.append('files', img));
  formDatas.append('data', JSON.stringify(payload));
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/property/create-property`,
    {
      method: 'POST',
      headers: {
        Authorization: `${token}`,
      },
      body: formDatas,
    }
  );
  const data = await res.json();
  return data;
};
