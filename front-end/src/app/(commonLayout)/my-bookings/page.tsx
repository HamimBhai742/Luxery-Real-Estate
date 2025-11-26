import { cookies } from 'next/headers';
import BookingsTable from '@/components/BookingsTable';

async function getBookings() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/booking/my-bookings`,
      {
        headers: {
          Authorization: `${token}`,
        },
        cache: 'no-store',
      }
    );

    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function MyBookingsPage() {
  const data = await getBookings();
  return (
    <div className='min-h-screen bg-slate-950 py-16'>
      <div className='container mx-auto px-4'>
        <h1 className='text-4xl font-bold text-white mb-8'>My Bookings</h1>
        <BookingsTable bookings={data.data} />
      </div>
    </div>
  );
}
