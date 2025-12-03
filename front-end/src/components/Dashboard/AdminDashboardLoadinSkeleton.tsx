import React from 'react';

const AdminDashboardLoadinSkeleton = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8'>
      <div className='max-w-7xl mx-auto space-y-6 lg:space-y-8'>
        {/* Header Skeleton */}
        <div className='animate-pulse'>
          <div className='h-8 sm:h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-48 sm:w-64'></div>
          <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-32 sm:w-48 mt-2'></div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6'>
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg animate-pulse'
            >
              <div className='flex items-center justify-between mb-4'>
                <div className='w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl'></div>
                <div className='h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded'></div>
              </div>
              <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-2'></div>
              <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-32'></div>
            </div>
          ))}
        </div>

        {/* Charts Section Skeleton */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6'>
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg animate-pulse'
            >
              <div className='h-6 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-6'></div>
              <div className='h-64 sm:h-80 bg-gray-200 dark:bg-gray-700 rounded-xl'></div>
            </div>
          ))}
        </div>

        {/* Quick Actions Skeleton */}
        <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg animate-pulse'>
          <div className='h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-6'></div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className='flex items-center gap-4 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-xl'
              >
                <div className='w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-lg'></div>
                <div className='flex-1'>
                  <div className='h-4 bg-gray-200 dark:bg-gray-600 rounded w-24 mb-2'></div>
                  <div className='h-3 bg-gray-200 dark:bg-gray-600 rounded w-32'></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Skeleton */}
        <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg animate-pulse'>
          <div className='h-6 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-6'></div>
          <div className='space-y-4'>
            {[...Array(5)].map((_, i) => (
              <div key={i} className='flex items-center gap-4 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-xl'>
                <div className='w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full'></div>
                <div className='flex-1'>
                  <div className='h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-2'></div>
                  <div className='h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2'></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLoadinSkeleton;