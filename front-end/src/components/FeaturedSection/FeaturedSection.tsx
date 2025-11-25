import React from 'react';

const FeaturedSection = () => {
  return (
    <section className='relative py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            Featured Properties
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-400'>
            Handpicked luxury estates for discerning buyers
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className='group relative rounded-2xl overflow-hidden bg-white/60 dark:bg-black/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-all duration-300'
            >
              <div className='aspect-4/3 bg-linear-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900' />
              <div className='p-6'>
                <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
                  Luxury Villa {item}
                </h3>
                <p className='text-gray-600 dark:text-gray-400 text-sm mb-4'>
                  Beverly Hills, California
                </p>
                <div className='flex items-center justify-between'>
                  <span className='text-2xl font-bold bg-linear-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent'>
                    ${item * 2}.5M
                  </span>
                  <button className='px-4 py-2 bg-linear-to-r from-amber-500 to-amber-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all'>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
