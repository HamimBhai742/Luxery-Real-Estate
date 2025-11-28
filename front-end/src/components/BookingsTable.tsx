'use client';

import { Booking } from '@/types/booking';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { ImSpinner9 } from 'react-icons/im';

export default function BookingsTable({ bookings }: { bookings: Booking[] }) {
  const [loading, setLoading] = useState(false);
  const [processingBookingId, setProcessingBookingId] = useState<string | null>(
    null
  );

  if (bookings?.length === 0) {
    return (
      <div className='text-center py-12 text-gray-500 dark:text-slate-400'>No bookings found</div>
    );
  }

  const handelPayment = async (bookingId: string) => {
    console.log(bookingId);
    setProcessingBookingId(bookingId);
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/initiate-payment`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ bookingId }),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.success) {
        window.location.href = data.data.paymentUrl; // Assuming the API returns a payment URL
      } else {
        toast.error(
          data.message || 'Failed to initiate payment. Please try again.'
        );
      }
    } catch (error) {
      toast.error('Failed to initiate payment. Please try again.');
      console.error('Error creating payment intent:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='overflow-x-auto rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800'>
      <table className='w-full bg-white dark:bg-slate-900'>
        <thead className='bg-gray-100 dark:bg-slate-800'>
          <tr>
            <th className='px-6 py-4 text-left text-gray-800 dark:text-white font-semibold'>Property</th>
            <th className='px-6 py-4 text-left text-gray-800 dark:text-white font-semibold'>Location</th>
            <th className='px-6 py-4 text-left text-gray-800 dark:text-white font-semibold'>Amount</th>
            <th className='px-6 py-4 text-left text-gray-800 dark:text-white font-semibold'>Status</th>
            <th className='px-6 py-4 text-left text-gray-800 dark:text-white font-semibold'>Date</th>
            <th className='px-6 py-4 text-left text-gray-800 dark:text-white font-semibold'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings?.map((booking) => (
            <tr
              key={booking.id}
              className='border-t border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors'
            >
              <td className='px-6 py-4 text-gray-900 dark:text-white font-medium'>{booking?.property.name}</td>
              <td className='px-6 py-4 text-gray-700 dark:text-slate-300'>
                {booking?.property.location}
              </td>
              <td className='px-6 py-4 text-gray-900 dark:text-white font-semibold'>
                ${booking?.totalAmount.toLocaleString()}
              </td>
              <td className='px-6 py-4'>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    booking.status === 'pending'
                      ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400'
                      : booking.status === 'paid'
                      ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400'
                      : 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'
                  }`}
                >
                  {booking.status}
                </span>
              </td>
              <td className='px-6 py-4 text-gray-700 dark:text-slate-300'>
                {new Date(booking.createdAt).toLocaleDateString()}
              </td>
              <td className='px-6 py-4'>
                <div className='flex gap-2'>
                  {booking.status === 'pending' && (
                    <button
                      disabled={loading || processingBookingId === booking.id}
                      onClick={() => handelPayment(booking.id)}
                      className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      {loading && processingBookingId === booking.id ? (
                        <span className='flex items-center justify-center'>
                          <ImSpinner9 className='animate-spin inline-block mr-2' />
                          Processing...
                        </span>
                      ) : (
                        'Pay Now'
                      )}
                    </button>
                  )}
                  <Link
                    href={`/properties/${booking.property.slug}`}
                    className='px-4 py-2 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-800 dark:text-white rounded-lg font-medium transition-colors'
                  >
                    View
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
