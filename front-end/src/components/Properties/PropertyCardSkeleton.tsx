
const PropertyCardSkeleton = () => {
  return (
    <div className='bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 animate-pulse'>
      {/* Image Skeleton */}
      <div className='relative h-64 bg-gray-200 dark:bg-gray-800'>
        <div className='absolute top-4 right-4 w-20 h-6 bg-gray-300 dark:bg-gray-700 rounded-full'></div>
      </div>

      {/* Content Skeleton */}
      <div className='p-6 space-y-4'>
        {/* Title */}
        <div className='h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4'></div>

        {/* Location */}
        <div className='flex items-center gap-2'>
          <div className='w-4 h-4 bg-gray-200 dark:bg-gray-800 rounded'></div>
          <div className='h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2'></div>
        </div>

        {/* Beds & Baths */}
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-1'>
            <div className='w-4 h-4 bg-gray-200 dark:bg-gray-800 rounded'></div>
            <div className='h-4 bg-gray-200 dark:bg-gray-800 rounded w-16'></div>
          </div>
          <div className='flex items-center gap-1'>
            <div className='w-4 h-4 bg-gray-200 dark:bg-gray-800 rounded'></div>
            <div className='h-4 bg-gray-200 dark:bg-gray-800 rounded w-16'></div>
          </div>
        </div>

        {/* Price & Arrow */}
        <div className='flex items-center justify-between pt-2'>
          <div className='h-8 bg-gray-200 dark:bg-gray-800 rounded w-32'></div>
          <div className='w-6 h-6 bg-gray-200 dark:bg-gray-800 rounded'></div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCardSkeleton;