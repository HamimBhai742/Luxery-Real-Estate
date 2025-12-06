import BookingsTable from '@/components/BookingsTable';
export const metadata = {
  title: 'My Bookings',
  description: 'Manage and track all your property reservations',
};

export default async function MyBookingsPage() {
  return (
    <div className='min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-4 px-4 sm:px-6'>
      <div className='max-w-7xl mx-auto space-y-8'>
        {/* Header */}
        <div className='text-center space-y-4'>
          <h1 className='text-4xl sm:text-5xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>
            My Bookings
          </h1>
          <p className='text-gray-600 dark:text-gray-400 text-lg'>
            Manage and track all your property reservations
          </p>
        </div>



        {/* Bookings Table */}
        <BookingsTable/>
      </div>
    </div>
  );
}
