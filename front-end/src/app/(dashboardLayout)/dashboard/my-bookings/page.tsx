/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from 'next/headers';
import BookingsTable from '@/components/BookingsTable';
import { FiCalendar, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';

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
  const bookings = data.data || [];

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b: any) => b.status === 'pending').length,
    paid: bookings.filter((b: any) => b.status === 'paid').length,
    canceled: bookings.filter((b: any) => b.status === 'canceled').length,
  };

  return (
    <div className='min-h-screen py-4 px-4 sm:px-6 '>
      <div className='max-w-7xl mx-auto space-y-8'>
        {/* Header */}
        <div className='text-center space-y-4'>
          <h1 className='text-4xl sm:text-5xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>
            My Bookings
          </h1>
          <p className='text-gray-300 dark:text-gray-400 text-lg'>
            Manage and track all your property reservations
          </p>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
          <div className='group relative bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300'>
            <div className='absolute inset-0 bg-linear-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity' />
            <div className='relative flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>Total</p>
                <p className='text-3xl font-bold text-gray-900 dark:text-white'>{stats.total}</p>
              </div>
              <div className='w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center'>
                <FiCalendar className='w-6 h-6 text-white' />
              </div>
            </div>
          </div>

          <div className='group relative bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300'>
            <div className='absolute inset-0 bg-linear-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity' />
            <div className='relative flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>Pending</p>
                <p className='text-3xl font-bold text-gray-900 dark:text-white'>{stats.pending}</p>
              </div>
              <div className='w-12 h-12 rounded-xl bg-linear-to-br from-yellow-500 to-orange-500 flex items-center justify-center'>
                <FiClock className='w-6 h-6 text-white' />
              </div>
            </div>
          </div>

          <div className='group relative bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300'>
            <div className='absolute inset-0 bg-linear-to-br from-green-500/10 to-emerald-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity' />
            <div className='relative flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>Paid</p>
                <p className='text-3xl font-bold text-gray-900 dark:text-white'>{stats.paid}</p>
              </div>
              <div className='w-12 h-12 rounded-xl bg-linear-to-br from-green-500 to-emerald-500 flex items-center justify-center'>
                <FiCheckCircle className='w-6 h-6 text-white' />
              </div>
            </div>
          </div>

          <div className='group relative bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300'>
            <div className='absolute inset-0 bg-linear-to-br from-red-500/10 to-rose-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity' />
            <div className='relative flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>Canceled</p>
                <p className='text-3xl font-bold text-gray-900 dark:text-white'>{stats.canceled}</p>
              </div>
              <div className='w-12 h-12 rounded-xl bg-linear-to-br from-red-500 to-rose-500 flex items-center justify-center'>
                <FiXCircle className='w-6 h-6 text-white' />
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <BookingsTable bookings={bookings} />
      </div>
    </div>
  );
}
