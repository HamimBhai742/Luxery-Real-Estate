import { Property } from '@/types/property';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { ImSpinner9 } from 'react-icons/im';

const CardDetails = ({ property }: { property: Property }) => {
  console.log(property, 'llll');
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const images = [0, 1, 2, 3]; // Mock image indices

  const handleSubmit = async (id: string) => {
    console.log(id);
    try {
      setLoading(true);
      if (property.status === 'inactive') {
        toast.error('This property is not available for booking.');
        setLoading(false);
        return;
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/create-booking`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ propertyId: id }),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.success) {
        toast.success('Property booked successfully!');
      }
      if (!data.success) {
        toast.error(
          data.message || 'Failed to book the property. Please try again.'
        );
      }
    } catch (error) {
      toast.error('Failed to book the property. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Image Gallery */}
        <div className='mb-12'>
          <div className='relative h-[500px] bg-linear-to-br from-amber-100 to-amber-200 dark:from-amber-900/20 dark:to-amber-800/20 rounded-2xl overflow-hidden mb-4'>
            <div className='absolute inset-0 flex items-center justify-center text-amber-600 dark:text-amber-400'>
              <svg
                className='w-32 h-32'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                />
              </svg>
            </div>
            <div className='absolute top-4 right-4 bg-white/90 dark:bg-black/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold'>
              {activeImage + 1} / {images.length}
            </div>
          </div>
          <div className='grid grid-cols-4 gap-4'>
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`h-24 bg-linear-to-br from-amber-100 to-amber-200 dark:from-amber-900/20 dark:to-amber-800/20 rounded-lg ${
                  activeImage === idx ? 'ring-4 ring-amber-500' : ''
                }`}
              />
            ))}
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2'>
            <div className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-lg p-8'>
              <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
                {property?.name}
              </h1>

              <div className='flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-6'>
                <svg
                  className='w-5 h-5'
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
                {property?.location}
              </div>

              <div className='text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-amber-600 mb-8'>
                ${property?.price}
              </div>

              <div className='grid grid-cols-3 gap-4 mb-8'>
                <div className='text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
                  <div className='text-2xl font-bold text-gray-900 dark:text-white'>
                    {property?.bedrooms}
                  </div>
                  <div className='text-sm text-gray-600 dark:text-gray-400'>
                    Bedrooms
                  </div>
                </div>
                <div className='text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
                  <div className='text-2xl font-bold text-gray-900 dark:text-white'>
                    {property?.bathrooms}
                  </div>
                  <div className='text-sm text-gray-600 dark:text-gray-400'>
                    Bathrooms
                  </div>
                </div>
                <div className='text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
                  <div className='text-2xl font-bold text-gray-900 dark:text-white'>
                    {property?.status === 'active' ? 'Available' : 'Booked'}
                  </div>
                  <div className='text-sm text-gray-600 dark:text-gray-400'>
                    Status
                  </div>
                </div>
              </div>

              <div className='mb-8'>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                  Description
                </h2>
                <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                  {property?.description}
                </p>
              </div>

              <div>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                  Amenities
                </h2>
                <div className='grid grid-cols-2 gap-3'>
                  {property?.amenities?.map((amenity) => (
                    <div
                      key={amenity}
                      className='flex items-center gap-2 text-gray-700 dark:text-gray-300'
                    >
                      <svg
                        className='w-5 h-5 text-amber-500'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                          clipRule='evenodd'
                        />
                      </svg>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className='lg:col-span-1'>
            <div className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 sticky top-24'>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
                Book This Property
              </h2>
              <button
                disabled={loading || property?.isBooked}
                onClick={() => handleSubmit(property?.id)}
                className={`w-full bg-linear-to-r ${
                  property?.isBooked
                    ? 'bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                    : 'bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700'
                } text-white px-6 py-3 rounded-lg font-semibold  transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                {loading ? (
                  <span className='flex items-center justify-center gap-2'>
                    <ImSpinner9 className='animate-spin ' />
                    Booking...
                  </span>
                ) : property?.isBooked ? (
                  'Booked'
                ) : (
                  'Book Now'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
