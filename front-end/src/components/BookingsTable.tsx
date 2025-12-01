/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Booking } from '@/types/booking';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { FiSearch, FiCalendar, FiMapPin, FiCreditCard, FiEye, FiFilter } from 'react-icons/fi';
import { ImSpinner9 } from 'react-icons/im';
import { MdBedroomParent, MdBathtub } from 'react-icons/md';

export default function BookingsTable({ bookings }: { bookings: Booking[] }) {
  const [loading, setLoading] = useState(false);
  const [processingBookingId, setProcessingBookingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'paid' | 'canceled'>('all');

  const filteredBookings = useMemo(() => {
    return bookings?.filter((booking) => {
      const matchesSearch = booking.property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.property.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [bookings, searchTerm, statusFilter]);

  const handelPayment = async (bookingId: string) => {
    setProcessingBookingId(bookingId);
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/initiate-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ bookingId }),
      });
      const data = await res.json();
      if (data.success) {
        window.location.href = data.data.paymentUrl;
      } else {
        toast.error(data.message || 'Failed to initiate payment. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to initiate payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!bookings || bookings.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-20'>
        <div className='w-24 h-24 mb-6 rounded-full bg-linear-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center'>
          <FiCalendar className='w-12 h-12 text-blue-500' />
        </div>
        <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>No Bookings Yet</h3>
        <p className='text-gray-600 dark:text-gray-400 mb-6'>Start exploring luxury properties</p>
        <Link href='/properties' className='px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300'>
          Browse Properties
        </Link>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Filters */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='flex-1 relative'>
          <FiSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' />
          <input
            type='text'
            placeholder='Search by property or location...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
          />
        </div>
        <div className='flex gap-2'>
          {(['all', 'pending', 'paid', 'canceled'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                statusFilter === status
                  ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:border-blue-500'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {filteredBookings?.map((booking) => (
          <div
            key={booking.id}
            className='group relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-500'
          >
            <div className='absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

            <div className='relative p-6 space-y-4'>
              {/* Header */}
              <div className='flex items-start justify-between'>
                <div className='flex-1'>
                  <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-1 line-clamp-1'>
                    {booking.property.name}
                  </h3>
                  <div className='flex items-center gap-2 text-gray-600 dark:text-gray-400'>
                    <FiMapPin className='w-4 h-4' />
                    <span className='text-sm'>{booking.property.location}</span>
                  </div>
                </div>
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                    booking.status === 'pending'
                      ? 'bg-linear-to-r from-yellow-400 to-orange-500 text-white shadow-lg shadow-yellow-500/50'
                      : booking.status === 'paid'
                      ? 'bg-linear-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/50'
                      : 'bg-linear-to-r from-red-400 to-rose-500 text-white shadow-lg shadow-red-500/50'
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              {/* Property Details */}
              <div className='flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400'>
                <div className='flex items-center gap-2'>
                  <MdBedroomParent className='w-5 h-5' />
                  <span>{booking.property.bedrooms} Beds</span>
                </div>
                <div className='flex items-center gap-2'>
                  <MdBathtub className='w-5 h-5' />
                  <span>{booking.property.bathrooms} Baths</span>
                </div>
              </div>

              {/* Amount & Date */}
              <div className='flex items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-700'>
                <div>
                  <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>Total Amount</p>
                  <p className='text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                    ${Number(booking.totalAmount).toLocaleString()}
                  </p>
                </div>
                <div className='text-right'>
                  <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>Booked On</p>
                  <div className='flex items-center gap-2 text-gray-900 dark:text-white font-medium'>
                    <FiCalendar className='w-4 h-4' />
                    <span>{new Date(booking.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className='flex gap-3 pt-2'>
                {booking.status === 'pending' && (
                  <button
                    disabled={loading && processingBookingId === booking.id}
                    onClick={() => handelPayment(booking.id)}
                    className='flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
                  >
                    {loading && processingBookingId === booking.id ? (
                      <>
                        <ImSpinner9 className='animate-spin' />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <FiCreditCard />
                        <span>Pay Now</span>
                      </>
                    )}
                  </button>
                )}
                <Link
                  href={`/properties/${booking.property.slug}`}
                  className='flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white rounded-xl font-semibold hover:border-blue-500 hover:shadow-lg hover:scale-105 transition-all duration-300'
                >
                  <FiEye />
                  <span>View</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBookings?.length === 0 && (
        <div className='text-center py-12'>
          <FiFilter className='w-16 h-16 mx-auto mb-4 text-gray-400' />
          <p className='text-gray-600 dark:text-gray-400'>No bookings match your filters</p>
        </div>
      )}
    </div>
  );
}
