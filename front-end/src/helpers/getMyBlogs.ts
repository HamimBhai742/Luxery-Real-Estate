'use server';

import { cookies } from 'next/headers';

export const getMyBlogs = async (
  searchTerm: string,
  selectedCategory: string,
  status: 'published' | 'draft' | 'all',
  currentPage: number,
  limit: number
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/my-blogs?search=${searchTerm}&${
      selectedCategory === 'all' ? '' : `category=${selectedCategory}`
    }${
      status === 'all' ? '' : `&status=${status}`
    }&page=${currentPage}&limit=${limit}`,
    {
      headers: {
        Authorization: `${token}`,
      },
      cache: 'no-cache',
    }
  );
  const data = await res.json();
  return data;
};
