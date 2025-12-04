const PaymentHistoryClientSkeleton = () => {
  return (
    <div className='space-y-6 animate-pulse'>
      {/* Stats Cards Skeleton */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        {[...Array(4)].map((_, i) => (
          <div key={i} className='bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-2xl p-6'>
            <div className='flex items-center justify-between'>
              <div className='space-y-2 flex-1'>
                <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-24'></div>
                <div className='h-7 bg-gray-200 dark:bg-gray-700 rounded w-20'></div>
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
          {[...Array(5)].map((_, i) => (
            <div key={i} className='h-12 w-24 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-xl'></div>
          ))}
        </div>
      </div>

      {/* Table Skeleton */}
      <div className='overflow-x-auto rounded-2xl border border-gray-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl shadow-xl'>
        <table className='w-full'>
          <thead className='bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 border-b border-gray-200 dark:border-slate-600'>
            <tr>
              {[...Array(5)].map((_, i) => (
                <th key={i} className='px-6 py-4 text-left'>
                  <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-24'></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 dark:divide-slate-700'>
            {[...Array(5)].map((_, i) => (
              <tr key={i} className='hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors'>
                <td className='px-6 py-4'>
                  <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-32'></div>
                </td>
                <td className='px-6 py-4'>
                  <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-20'></div>
                </td>
                <td className='px-6 py-4'>
                  <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-16'></div>
                </td>
                <td className='px-6 py-4'>
                  <div className='h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20'></div>
                </td>
                <td className='px-6 py-4'>
                  <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-24'></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistoryClientSkeleton;