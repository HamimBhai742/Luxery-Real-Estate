const UserDashboardSkeleton = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto space-y-8 animate-pulse'>
        {/* Welcome Section Skeleton */}
        <div className='relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 shadow-2xl'>
          <div className='absolute inset-0 bg-black/10'></div>
          <div className='relative z-10 space-y-3'>
            <div className='h-10 bg-white/20 rounded-lg w-64 sm:w-96'></div>
            <div className='h-6 bg-white/20 rounded-lg w-48 sm:w-80'></div>
          </div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {[...Array(4)].map((_, i) => (
            <div key={i} className='bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-2xl p-6'>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl'></div>
                <div className='w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded'></div>
              </div>
              <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2'></div>
              <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded w-16'></div>
            </div>
          ))}
        </div>

        {/* Quick Actions Skeleton */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {[...Array(3)].map((_, i) => (
            <div key={i} className='bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-2xl p-6'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                  <div className='w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl'></div>
                  <div className='space-y-2'>
                    <div className='h-5 bg-gray-200 dark:bg-gray-700 rounded w-32'></div>
                    <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-24'></div>
                  </div>
                </div>
                <div className='w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded'></div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity Sections Skeleton */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {[...Array(2)].map((_, i) => (
            <div key={i} className='bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-2xl p-6'>
              <div className='flex items-center justify-between mb-6'>
                <div className='h-6 bg-gray-200 dark:bg-gray-700 rounded w-40'></div>
                <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-16'></div>
              </div>
              <div className='space-y-4'>
                {[...Array(3)].map((_, idx) => (
                  <div key={idx} className='flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-700/30 rounded-xl'>
                    <div className='w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl'></div>
                    <div className='flex-1 space-y-2'>
                      <div className='h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4'></div>
                      <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2'></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardSkeleton;