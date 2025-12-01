import React from 'react';

const HeroSection = () => {
  return (
    <section className='relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20'>
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 dark:bg-amber-500/10 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 dark:bg-amber-600/10 rounded-full blur-3xl animate-pulse delay-1000' />
      </div>

      <div className='relative max-w-7xl mx-auto text-center'>
        <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6'>
          <span className='block text-gray-900 dark:text-white'>
            Discover Your
          </span>
          <span className='block bg-linear-to-r from-blue-600 to-indigo-600 dark:from-amber-500 dark:to-amber-600 bg-clip-text text-transparent'>
            Dream Property
          </span>
        </h1>
        <p className='max-w-2xl mx-auto text-lg sm:text-xl text-gray-700 dark:text-gray-400 mb-12'>
          Experience luxury living with our curated collection of premium
          properties in the most exclusive locations worldwide.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <button className='px-8 py-4 bg-linear-to-r from-blue-600 to-indigo-600 dark:from-amber-500 dark:to-amber-600 text-white font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300'>
            Explore Properties
          </button>
          <button className='px-8 py-4 bg-white dark:bg-black/80 backdrop-blur-xl border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300'>
            Schedule Tour
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
