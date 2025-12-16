'use server';
export const getAllBlogs = async (
  searchTerm: string,
  selectedCategory: string,
  currentPage: number,
  limit: number
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog?search=${searchTerm}&${
      selectedCategory === 'all' ? '' : `category=${selectedCategory}`
    }&page=${currentPage}&limit=${limit}`,
    {
      cache: 'no-store',
    }
  );
  const data = await res.json();
  return data;
};
