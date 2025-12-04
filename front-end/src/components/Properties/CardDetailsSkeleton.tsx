import React from 'react';

const CardDetailsSkeleton = () => {
  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-black py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse'>
        {/* Image Gallery Skeleton */}
        <div className='mb-12'>
          <div className='relative h-[500px] bg-gray-200 dark:bg-gray-800 rounded-2xl mb-4'>
            <div className='absolute top-4 right-4 w-16 h-8 bg-gray-300 dark:bg-gray-700 rounded-full'></div>
          </div>
          <div className='grid grid-cols-4 gap-4'>
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className='h-24 bg-gray-200 dark:bg-gray-800 rounded-lg'></div>
            ))}
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content Skeleton */}
          <div className='lg:col-span-2'>
            <div className='bg-white dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8 space-y-6'>
              {/* Title */}
              <div className='h-10 bg-gray-200 dark:bg-gray-800 rounded w-3/4'></div>

              {/* Location */}
              <div className='flex items-center gap-2'>
                <div className='w-5 h-5 bg-gray-200 dark:bg-gray-800 rounded'></div>
                <div className='h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/2'></div>
              </div>

              {/* Price */}
              <div className='h-12 bg-gray-200 dark:bg-gray-800 rounded w-48'></div>

              {/* Stats Grid */}
              <div className='grid grid-cols-3 gap-4'>
                {[...Array(3)].map((_, idx) => (
                  <div key={idx} className='p-4 bg-slate-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700'>
                    <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2'></div>
                    <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mx-auto'></div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <div className='h-7 bg-gray-200 dark:bg-gray-800 rounded w-40 mb-4'></div>
                <div className='space-y-2'>
                  <div className='h-4 bg-gray-200 dark:bg-gray-800 rounded'></div>
                  <div className='h-4 bg-gray-200 dark:bg-gray-800 rounded'></div>
                  <div className='h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6'></div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <div className='h-7 bg-gray-200 dark:bg-gray-800 rounded w-32 mb-4'></div>
                <div className='grid grid-cols-2 gap-3'>
                  {[...Array(6)].map((_, idx) => (
                    <div key={idx} className='flex items-center gap-2'>
                      <div className='w-5 h-5 bg-gray-200 dark:bg-gray-800 rounded-full'></div>
                      <div className='h-4 bg-gray-200 dark:bg-gray-800 rounded w-24'></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form Skeleton */}
          <div className='lg:col-span-1'>
            <div className='bg-white dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 sticky top-24'>
              <div className='h-7 bg-gray-200 dark:bg-gray-800 rounded w-48 mb-6'></div>
              <div className='h-12 bg-gray-200 dark:bg-gray-800 rounded'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetailsSkeleton;