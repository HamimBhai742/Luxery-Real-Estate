const BookingsTableSkeleton = () => {
  return (
    <div className='space-y-6 animate-pulse'>
      {/* Stats Cards Skeleton */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        {[...Array(4)].map((_, i) => (
          <div key={i} className='bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-2xl p-6'>
            <div className='flex items-center justify-between'>
              <div className='space-y-2 flex-1'>
                <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-16'></div>
                <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded w-12'></div>
              </div>
              <div className='w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl'></div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Skeleton */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='flex-1 h-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-xl'></div>
        <div className='flex gap-2 flex-wrap'>
          {[...Array(4)].map((_, i) => (
            <div key={i} className='h-12 w-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-xl'></div>
          ))}
        </div>
      </div>

      {/* Bookings Cards Skeleton */}
      <div className='grid grid-cols-1 md:grid-cols-2  gap-6'>
        {[...Array(6)].map((_, i) => (
          <div key={i} className='bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-2xl p-6 space-y-4'>
            <div className='flex items-start justify-between'>
              <div className='space-y-2 flex-1'>
                <div className='h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4'></div>
                <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2'></div>
              </div>
              <div className='w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded-full'></div>
            </div>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <div className='w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded'></div>
                <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-32'></div>
              </div>
              <div className='flex items-center gap-4'>
                <div className='flex items-center gap-1'>
                  <div className='w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded'></div>
                  <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-12'></div>
                </div>
                <div className='flex items-center gap-1'>
                  <div className='w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded'></div>
                  <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-12'></div>
                </div>
              </div>
            </div>
            <div className='pt-4 border-t border-gray-200 dark:border-slate-700'>
              <div className='flex items-center justify-between'>
                <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded w-24'></div>
                <div className='h-10 bg-gray-200 dark:bg-gray-700 rounded w-28'></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className='flex items-center justify-between'>
        <div className='h-10 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-lg w-32'></div>
        <div className='flex gap-2'>
          {[...Array(5)].map((_, i) => (
            <div key={i} className='w-10 h-10 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-lg'></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingsTableSkeleton;