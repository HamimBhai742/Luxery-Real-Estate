import React from 'react';
import PropertiesCard from '../Properties/Card';

const FeaturedSection = () => {
  return (
    <section className='relative py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            Featured Properties
          </h2>
          <p className='text-lg text-gray-700 dark:text-gray-400'>
            Handpicked luxury estates for discerning buyers
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {[1, 2, 3].map((item) => (
            <PropertiesCard key={item} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
