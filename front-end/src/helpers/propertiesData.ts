import { IData } from "@/components/Properties/Properties";

export const PropertiesData = async (
  search: string,
  currentPage: number,
  limit: number,
  prices: string,
  status: string,
  bedrooms: string
): Promise<IData> => {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/property?page=${currentPage}&limit=${limit}&${
      search === '' ? '' : `search=${search}`
    }&${prices === 'all' ? '' : `prices=${prices}`}&${
      status === 'all' ? '' : `status=${status}`
    }&${bedrooms === 'all' ? '' : `bedrooms=${bedrooms}`}`,
    {
      cache: 'no-store',
    }
  );
  const data = await res.json();
  return data?.data;
};