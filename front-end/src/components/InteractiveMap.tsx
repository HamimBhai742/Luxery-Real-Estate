'use client';

import { useState } from 'react';

interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  position: { top: string; left: string };
}

const locations: Location[] = [
  {
    id: '1',
    name: 'Dhaka Office',
    address: '179/1, Gabtola, Mogbazar, Dhaka - 1212',
    phone: '(+880) 019263-13093',
    email: 'mdhamim5088@gmail.com',
    position: { top: '25%', left: '85%' },
  },
  {
    id: '2',
    name: 'Sylhet Office',
    address: 'Nagar Bhaban, Sylhet - 3100',
    phone: '(+880) 019263-13093',
    email: 'mdhamim5088@gmail.com',
    position: { top: '45%', left: '15%' },
  },
  {
    id: '3',
    name: 'Chattogram Office',
    address: 'Port Authority Building, Bandar, Chattogram - 4000',
    phone: '(+880) 019263-13093',
    email: 'mdhamim5088@gmail.com',
    position: { top: '70%', left: '80%' },
  },
];

export default function InteractiveMap() {
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  return (
    <div className='relative w-full h-[500px] bg-linear-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl overflow-hidden border border-white/20 dark:border-gray-700/20 shadow-2xl'>
      {/* Map Background Pattern */}
      <div className='absolute inset-0 opacity-20'>
        <svg
          className='w-full h-full'
          viewBox='0 0 100 100'
          preserveAspectRatio='none'
        >
          <defs>
            <pattern
              id='grid'
              width='10'
              height='10'
              patternUnits='userSpaceOnUse'
            >
              <path
                d='M 10 0 L 0 0 0 10'
                fill='none'
                stroke='currentColor'
                strokeWidth='0.5'
                className='text-amber-400 dark:text-amber-600'
              />
            </pattern>
          </defs>
          <rect width='100' height='100' fill='url(#grid)' />
        </svg>
      </div>

      {/* Decorative Lines */}
      <svg className='absolute inset-0 w-full h-full pointer-events-none'>
        <line
          x1='15%'
          y1='45%'
          x2='25%'
          y2='25%'
          stroke='currentColor'
          strokeWidth='2'
          strokeDasharray='5,5'
          className='text-amber-400/50 dark:text-amber-600/50'
        />
        <line
          x1='85%'
          y1='35%'
          x2='80%'
          y2='70%'
          stroke='currentColor'
          strokeWidth='2'
          strokeDasharray='5,5'
          className='text-amber-400/50 dark:text-amber-600/50'
        />
      </svg>

      {/* Location Markers */}
      {locations.map((location) => (
        <div
          key={location.id}
          className='absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group'
          style={{ top: location.position.top, left: location.position.left }}
          onMouseEnter={() => setActiveLocation(location.id)}
          onMouseLeave={() => setActiveLocation(null)}
        >
          {/* Pulse Ring */}
          <div className='absolute inset-0 w-12 h-12 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2'>
            <div className='absolute inset-0 bg-amber-500 rounded-full animate-ping opacity-75'></div>
          </div>

          {/* Marker Pin */}
          <div className='relative z-10 w-12 h-12 bg-linear-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/50 group-hover:scale-125 transition-transform duration-300'>
            <svg
              className='w-6 h-6 text-white'
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
          </div>

          {/* Info Card */}
          <div
            className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl p-4 border border-white/20 dark:border-gray-800/20 shadow-xl transition-all duration-300 ${
              activeLocation === location.id
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            <h3 className='font-bold text-gray-900 dark:text-white mb-2'>
              {location.name}
            </h3>
            <div className='space-y-2 text-sm text-gray-600 dark:text-gray-400'>
              <p className='flex items-start gap-2'>
                <svg
                  className='w-4 h-4 mt-0.5 flex-shrink-0'
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
                </svg>
                {location.address}
              </p>
              <p className='flex items-center gap-2'>
                <svg
                  className='w-4 h-4 flex-shrink-0'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                  />
                </svg>
                {location.phone}
              </p>
              <p className='flex items-center gap-2'>
                <svg
                  className='w-4 h-4 flex-shrink-0'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                  />
                </svg>
                {location.email}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Legend */}
      <div className='absolute bottom-6 left-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-xl p-4 border border-white/20 dark:border-gray-800/20 shadow-lg'>
        <div className='flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300'>
          <div className='w-3 h-3 bg-amber-500 rounded-full animate-pulse'></div>
          <span>Our Office Locations</span>
        </div>
      </div>
    </div>
  );
}
