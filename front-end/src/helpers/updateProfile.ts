'use server';
import { cookies } from 'next/headers';

export const updateProfile = async (
  paylod: { name: string; address: string },
  photoFile: File
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  const formDataToSend = new FormData();
  formDataToSend.append('data', JSON.stringify(paylod));
  if (photoFile) formDataToSend.append('file', photoFile);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/update-profile`,
    {
      method: 'PATCH',
      body: formDataToSend,
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  const data = await res.json();
  return data;
};
