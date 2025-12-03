'use client';

import { Property } from '@/types/property';
import Image from 'next/image';
import Link from 'next/link';

interface PropertyCardProps {
  property: Property;
}

const getStatus = (status: string) => {
  switch (status) {
    case 'available':
      return 'bg-green-500/20 text-green-500 border border-green-500';
    case 'booked':
      return 'bg-red-500/20 text-red-500 border border-red-500';
    case 'sold':
      return 'bg-amber-500/20 text-amber-500 border border-amber-500';
    case 'unavailable':
      return 'bg-gray-500/20 text-gray-500 border border-gray-500';
    default:
      return 'bg-gray-500/20';
  }
};

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.slug}`}>
      <div className='group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2'>
        {/* Image Placeholder */}
        <div className='relative h-64 bg-linear-to-br from-blue-100 to-indigo-200 dark:from-amber-900/20 dark:to-amber-800/20'>
          <div className='absolute inset-0 flex items-center justify-center text-blue-600 dark:text-amber-400'>
            <Image
              src={property.images[0] || '/placeholder-image.png'}
              alt={property.name}
              fill
              className='object-cover'
            />
          </div>
          <div>
            <span
              className={`absolute top-4 right-4 px-2 py-1 text-xs font-semibold rounded-full ${getStatus(
                property.status
              )} `}
            >
              {property.status.charAt(0).toUpperCase() +
                property.status.slice(1)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className='p-6'>
          <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-amber-400 transition-colors'>
            {property.name}
          </h3>
          <p className='text-gray-700 dark:text-gray-400 text-sm mb-4 flex items-center gap-2'>
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
            {property.location}
          </p>

          <div className='flex items-center gap-4 mb-4 text-sm text-gray-700 dark:text-gray-400'>
            <span className='flex items-center gap-1'>
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                />
              </svg>
              {property.bedrooms} Beds
            </span>
            <span className='flex items-center gap-1'>
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z'
                />
              </svg>
              {property.bathrooms} Baths
            </span>
          </div>

          <div className='flex items-center justify-between'>
            <div>
              <p className='text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 dark:from-amber-500 dark:to-amber-600'>
                ${property.price.toLocaleString()}
              </p>
            </div>
            <div className='text-blue-600 dark:text-amber-400 group-hover:translate-x-2 transition-transform'>
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
