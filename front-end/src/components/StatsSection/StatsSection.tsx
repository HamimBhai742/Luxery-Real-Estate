import React from 'react';

const StatsSection = () => {
  return (
    <section className='relative py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
          {[
            { value: '500+', label: 'Premium Properties' },
            { value: '50+', label: 'Cities Worldwide' },
            { value: '10K+', label: 'Happy Clients' },
            { value: '$2B+', label: 'Property Value' },
          ].map((stat, index) => (
            <div
              key={index}
              className='relative p-8 rounded-2xl bg-white dark:bg-black/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300'
            >
              <div className='text-4xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 dark:from-amber-500 dark:to-amber-600 bg-clip-text text-transparent mb-2'>
                {stat.value}
              </div>
              <div className='text-sm text-gray-700 dark:text-gray-400 font-medium'>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
