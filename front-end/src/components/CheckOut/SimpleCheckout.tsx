/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { useEffect, useState } from 'react';
import { FiShield, FiPercent, FiCreditCard } from 'react-icons/fi';
import { usePromo } from '@/helpers/usePromo';
import { Booking } from '@/types/booking';
import { getSingleBooking } from '@/helpers/getSingleBooking';
import toast from 'react-hot-toast';
import Image from 'next/image';
import CheckoutSkeleton from './CheckoutSkeleton';
import { getPayment } from '@/helpers/getPayment';
import { ImSpinner9 } from 'react-icons/im';
import { createUsagePromo } from '@/helpers/createUsagePromo';
import { TbPaywall } from 'react-icons/tb';

export default function CheckoutClient({ bookingId }: { bookingId: string }) {
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [showPromo, setShowPromo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<Booking>();
  const [finalAmount, setFinalAmount] = useState(0);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [promoLoading, setPromoLoading] = useState(false);

  useEffect(() => {
    try {
      const fetchBooking = async () => {
        const data = await getSingleBooking(bookingId);
        if (data) {
          console.log(data, booking);
          setBooking(data.data);
          setFinalAmount(data.data.totalAmount);
          setLoading(false);
        }
        if (!data) {
          setLoading(false);
        }
      };
      fetchBooking();
    } catch (error) {
      console.error('Error fetching booking:', error);
    }
  }, [bookingId]);

  if (loading) {
    return <CheckoutSkeleton />;
  }
  const applyPromo = async () => {
    setPromoLoading(true);
    const data = await usePromo(promoCode, bookingId);
    console.log(data);
    if (data.success) {
      setPromoLoading(false);
      setDiscountAmount(data.data.discountAmount);
      setFinalAmount(data.data.totalAmount);
      setDiscount(data.data.discount);
      toast.success(data.message!);
    }
    if (!data.success) {
      setPromoLoading(false);
      toast.error(data.message);
    }
  };

  const handlePayment = async () => {
    try {
      setPaymentLoading(true);
      const data = await getPayment(bookingId);
      if (data.success) {
        if (discount > 0) {
          await createUsagePromo(promoCode);
        }
        window.location.href = data.data.paymentUrl;
        setPaymentLoading(false);
      } else {
        setPaymentLoading(false);
        toast.error(
          data.message || 'Failed to initiate payment. Please try again.'
        );
      }
    } catch (error) {
      setPaymentLoading(false);
      toast.error('Failed to initiate payment. Please try again.');
      console.log(error);
    }
  };
  return (
    <div className='min-h-screen bg-linear-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4'>
      <div className='max-w-4xl mx-auto'>
        <div>
          {/* Order Summary */}
          <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl animate-slide-in-left max-w-3xl mx-auto'>
            <h3 className='text-2xl font-bold mb-6'>Order Summary</h3>

            {/* Property */}
            <div className='mb-6'>
              <div>
                <Image
                  src={booking!.property.images[0]}
                  alt='property'
                  width={100}
                  height={100}
                  className='w-full h-80 object-cover rounded-lg mb-4'
                />
              </div>
              <h4 className='font-semibold text-xl text-gray-800 dark:text-white'>
                {booking!.property.name}
              </h4>
              <p className='text-sm font-medium text-gray-600 dark:text-gray-300'>
                {booking!.property.location}
              </p>
              <div className='flex items-center mt-2 text-sm text-gray-600 dark:text-gray-300 font-medium'>
                <span>{booking!.property.bedrooms} beds</span>
                <span className='mx-2'>•</span>
                <span>{booking!.property.bathrooms} baths</span>
              </div>
            </div>

            {/* Promo Code */}
            {discountAmount > 0 ? (
              <div>
                <div className='flex items-center text-green-700 font-semibold mb-2'>
                  <FiPercent className='mr-2' />
                  Promo Code Applied
                </div>
                <div className='flex items-center text-green-700 font-semibold mb-2'>
                  <TbPaywall className='mr-2' />
                  You saved ${discountAmount}
                </div>
              </div>
            ) : (
              <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl my-6'>
                <button
                  onClick={() => setShowPromo(!showPromo)}
                  className='flex items-center text-blue-600 hover:text-blue-700  transition-colors  font-semibold'
                >
                  <FiPercent className='mr-2' />
                  Have a promo code?
                </button>

                {showPromo && (
                  <div className='mt-4 animate-fade-in'>
                    <div className=''>
                      <input
                        type='text'
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && applyPromo()}
                        placeholder='Enter promo code'
                        className='flex-1 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-blue-500 transition-all duration-300 relative '
                      />
                      <button
                        disabled={promoLoading}
                        onClick={applyPromo}
                        className='absolute right-10 top-22 -translate-y-1/2  duration-300 font-semibold bg-linear-to-r   from-blue-500 to-purple-600 bg-clip-text text-transparent'
                      >
                        {promoLoading ? (
                          <ImSpinner9 className='animate-spin text-blue-600' />
                        ) : (
                          'Apply'
                        )}
                      </button>
                    </div>
                    <div className='mt-2 text-sm text-gray-500'>
                      Try: SAVE10 or WELCOME20
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Pricing */}
            <div className='border-t border-gray-200 dark:border-gray-600 pt-4 space-y-3'>
              <div className='flex justify-between'>
                <span>Subtotal</span>
                <span>${booking!.property.price}</span>
              </div>

              {discountAmount > 0 && (
                <div className='flex justify-between text-green-600 animate-bounce-in'>
                  <span>
                    Discount ({promoCode}) {discount > 0 && ` -${discount}`}%
                  </span>
                  <span>-${discountAmount}</span>
                </div>
              )}

              <div className='border-t border-gray-200 dark:border-gray-600 pt-3 flex justify-between text-lg font-semibold'>
                <span>Total</span>
                <span className='text-blue-600 '>${finalAmount}</span>
              </div>
            </div>

            {/* Security */}
            <div className='mt-6 p-4 bg-green-400/20 rounded-lg'>
              <div className='flex items-center  text-green-700 '>
                <FiShield className='mr-2' />
                <span className='font-semibold text-green-600'>
                  Secure Payment
                </span>
              </div>
              <p className='text-sm font-medium text-green-600  mt-1'>
                SSL encrypted and secure
              </p>
            </div>

            {/* Pay Button */}
            <button
              disabled={paymentLoading}
              onClick={handlePayment}
              className='w-full  mt-6 py-4 bg-linear-to-r  from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold text-lg'
            >
              {paymentLoading ? (
                <span className='flex items-center justify-center gap-2'>
                  <ImSpinner9 className='animate-spin text-xl' />
                  Processing
                </span>
              ) : (
                <span className='flex items-center justify-center gap-2'>
                  <TbPaywall className='text-2xl' />
                  Pay ${finalAmount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
