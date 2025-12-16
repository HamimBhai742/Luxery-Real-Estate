'use server';
import { SubmitBlogData } from '@/types/blog';
import { cookies } from 'next/headers';

export const createBlog = async (data: SubmitBlogData) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  if (data.image) formData.append('file', data.image);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/create-blog`,
    {
      method: 'POST',
      headers: {
        Authorization: `${token}`,
      },
      body: formData,
    }
  );
  const blog = await res.json();
  return blog;
};
