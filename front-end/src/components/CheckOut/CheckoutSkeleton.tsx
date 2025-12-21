export default function CheckoutSkeleton() {
  return (
    <div className='min-h-screen bg-linear-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4'>
      <div className='max-w-4xl mx-auto'>
        <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl max-w-3xl mx-auto'>
          {/* Title Skeleton */}
          <div className='h-8 bg-gray-300 dark:bg-gray-700 rounded-lg w-48 mb-6 animate-pulse' />

          {/* Property Image Skeleton */}
          <div className='mb-6'>
            <div className='w-full h-80 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4 animate-pulse' />
            
            {/* Property Title */}
            <div className='h-6 bg-gray-300 dark:bg-gray-700 rounded-lg w-3/4 mb-2 animate-pulse' />
            
            {/* Property Location */}
            <div className='h-4 bg-gray-300 dark:bg-gray-700 rounded-lg w-1/2 mb-2 animate-pulse' />
            
            {/* Property Details */}
            <div className='flex items-center mt-2 gap-2'>
              <div className='h-4 bg-gray-300 dark:bg-gray-700 rounded-lg w-16 animate-pulse' />
              <div className='h-4 bg-gray-300 dark:bg-gray-700 rounded-full w-1 animate-pulse' />
              <div className='h-4 bg-gray-300 dark:bg-gray-700 rounded-lg w-16 animate-pulse' />
            </div>
          </div>

          {/* Promo Code Section Skeleton */}
          <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl my-6'>
            <div className='h-6 bg-gray-300 dark:bg-gray-700 rounded-lg w-40 animate-pulse' />
          </div>

          {/* Pricing Skeleton */}
          <div className='border-t border-gray-200 dark:border-gray-600 pt-4 space-y-3'>
            <div className='flex justify-between'>
              <div className='h-5 bg-gray-300 dark:bg-gray-700 rounded-lg w-20 animate-pulse' />
              <div className='h-5 bg-gray-300 dark:bg-gray-700 rounded-lg w-16 animate-pulse' />
            </div>
            
            <div className='border-t border-gray-200 dark:border-gray-600 pt-3 flex justify-between'>
              <div className='h-6 bg-gray-300 dark:bg-gray-700 rounded-lg w-16 animate-pulse' />
              <div className='h-6 bg-gray-300 dark:bg-gray-700 rounded-lg w-20 animate-pulse' />
            </div>
          </div>

          {/* Security Badge Skeleton */}
          <div className='mt-6 p-4 bg-gray-200 dark:bg-gray-700 rounded-lg'>
            <div className='h-5 bg-gray-300 dark:bg-gray-600 rounded-lg w-32 mb-2 animate-pulse' />
            <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded-lg w-40 animate-pulse' />
          </div>

          {/* Pay Button Skeleton */}
          <div className='w-full mt-6 h-14 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse' />
        </div>
      </div>
    </div>
  );
}
