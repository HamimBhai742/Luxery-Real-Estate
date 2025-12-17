'use server'
import { Blog } from "@/types/blog";
import { cookies } from "next/headers";

export const updateBlog = async (id: string, payload: Blog) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  console.log(payload)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/update-blog/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    }
  );
  const data = await res.json();
  return data;
};
