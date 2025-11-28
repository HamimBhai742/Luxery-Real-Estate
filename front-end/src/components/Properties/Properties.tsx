'use client';
import { Property } from '@/types/property';
import { useState } from 'react';
import PropertyCard from './PropertyCard';

const Properties = ({ properties }: { properties: Property[] }) => {
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [bedrooms, setBedrooms] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-black py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-5xl font-bold text-gray-900 dark:text-white mb-4'>
            Luxury Properties
          </h1>
          <p className='text-xl text-gray-700 dark:text-gray-400'>
            Discover your dream home from our exclusive collection
          </p>
        </div>

        {/* Filters */}
        <div className='bg-white dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 mb-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {/* Search */}
            <div>
              <label className='block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2'>
                Search
              </label>
              <input
                type='text'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Location or name...'
                className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-amber-500 focus:border-transparent'
              />
            </div>

            {/* Price Range */}
            <div>
              <label className='block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2'>
                Price Range
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-amber-500 focus:border-transparent'
              >
                <option value='all'>All Prices</option>
                <option value='under5m'>Under $5M</option>
                <option value='5m-10m'>$5M - $10M</option>
                <option value='over10m'>Over $10M</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label className='block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2'>
                Bedrooms
              </label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-amber-500 focus:border-transparent'
              >
                <option value='all'>Any</option>
                <option value='3'>3+</option>
                <option value='4'>4+</option>
                <option value='5'>5+</option>
                <option value='6'>6+</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className='block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2'>
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-amber-500 focus:border-transparent'
              >
                <option value='all'>All</option>
                <option value='available'>Available</option>
                <option value='booked'>Booked</option>
                <option value='sold'>Sold</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          {/* <div className='mt-4 text-sm text-gray-600 dark:text-gray-400'>
            Showing {filteredProperties.length} of {mockProperties.length}{' '}
            properties
          </div> */}
        </div>

        {/* Properties Grid */}
        {properties.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className='text-center py-20'>
            <svg
              className='w-20 h-20 mx-auto text-gray-400 mb-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
              No properties found
            </h3>
            <p className='text-gray-600 dark:text-gray-400'>
              Try adjusting your filters to see more results
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
