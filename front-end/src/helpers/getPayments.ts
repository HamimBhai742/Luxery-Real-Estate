'use server';

import { cookies } from 'next/headers';

enum Status {
  all = 'all',
  pending = 'pending',
  successed = 'succeeded',
  canceled = 'canceled',
  failed = 'failed',
}

export async function getPayments(
  search: string,
  status: Status,
  limit: number,
  page: number
) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/my-payments?${
        search === '' ? '' : `search=${search}`
      }&${
        status === 'all' ? '' : `status=${status}`
      }&page=${page}&limit=${limit}`,
      {
        cache: 'no-store',
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}
