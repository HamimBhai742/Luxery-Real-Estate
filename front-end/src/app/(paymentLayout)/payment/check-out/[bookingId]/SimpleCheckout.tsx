'use client';
import { useState } from 'react';
import { FiCreditCard, FiShield, FiPercent, FiX } from 'react-icons/fi';
import { BsPaypal } from 'react-icons/bs';

interface CheckoutClientProps {
  bookingId: string;
}

export default function CheckoutClient({ bookingId }: CheckoutClientProps) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showPromo, setShowPromo] = useState(false);

  // Mock data
  const booking = {
    property: {
      name: 'Luxury Villa with Ocean View',
      location: 'Malibu, California',
      bedrooms: 4,
      bathrooms: 3,
    },
    totalAmount: 2500,
  };

  const applyPromo = () => {
    if (promoCode === 'SAVE10') {
      setDiscount(250);
    } else if (promoCode === 'WELCOME20') {
      setDiscount(500);
    } else {
      setDiscount(0);
    }
  };

  const finalAmount = booking.totalAmount - discount;

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-8 animate-fade-in'>
          <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2'>
            Checkout
          </h1>
          <p className='text-gray-600 dark:text-gray-300'>
            Complete your booking
          </p>
        </div>

        <div>
          {/* Order Summary */}
          <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl animate-slide-in-left max-w-3xl mx-auto'>
            <h3 className='text-xl font-semibold mb-6'>Order Summary</h3>

            {/* Property */}
            <div className='mb-6'>
              <div className='aspect-video rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold mb-4'>
                Property Image
              </div>
              <h4 className='font-semibold text-gray-800 dark:text-white'>
                {booking.property.name}
              </h4>
              <p className='text-sm text-gray-600 dark:text-gray-300'>
                {booking.property.location}
              </p>
              <div className='flex items-center mt-2 text-sm text-gray-600 dark:text-gray-300'>
                <span>{booking.property.bedrooms} beds</span>
                <span className='mx-2'>•</span>
                <span>{booking.property.bathrooms} baths</span>
              </div>
            </div>

            {/* Promo Code */}
            <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl my-6'>
              <button
                onClick={() => setShowPromo(!showPromo)}
                className='flex items-center text-blue-600 hover:text-blue-700  transition-colors dark:text-amber-400 dark:hover:text-amber-500 font-semibold'
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
                      placeholder='Enter promo code'
                      className='flex-1 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-blue-500 transition-all duration-300 relative dark:focus:ring-amber-500'
                    />
                    <button
                      onClick={applyPromo}
                      className='absolute right-10 top-22 -translate-y-1/2  duration-300 font-semibold bg-linear-to-r  dark:from-amber-500 dark:to-amber-600 from-blue-500 to-purple-600 bg-clip-text text-transparent'
                    >
                      Apply
                    </button>
                  </div>
                  <div className='mt-2 text-sm text-gray-500'>
                    Try: SAVE10 or WELCOME20
                  </div>
                </div>
              )}
            </div>

            {/* Pricing */}
            <div className='border-t border-gray-200 dark:border-gray-600 pt-4 space-y-3'>
              <div className='flex justify-between'>
                <span>Subtotal</span>
                <span>${booking.totalAmount}</span>
              </div>

              {discount > 0 && (
                <div className='flex justify-between text-green-600 animate-bounce-in'>
                  <span>Discount ({promoCode})</span>
                  <span>-${discount}</span>
                </div>
              )}

              <div className='border-t border-gray-200 dark:border-gray-600 pt-3 flex justify-between text-lg font-semibold'>
                <span>Total</span>
                <span className='text-blue-600 dark:text-amber-600'>${finalAmount}</span>
              </div>
            </div>

            {/* Security */}
            <div className='mt-6 p-4 bg-green-50 dark:bg-amber-600/20 rounded-lg'>
              <div className='flex items-center dark:text-amber-500 text-green-700 '>
                <FiShield className='mr-2' />
                <span className='font-medium'>Secure Payment</span>
              </div>
              <p className='text-sm text-green-600 dark:text-amber-400 mt-1'>
                SSL encrypted and secure
              </p>
            </div>

            {/* Pay Button */}
            <button
              onClick={() =>
                console.log('Payment:', {
                  bookingId,
                  paymentMethod,
                  finalAmount,
                })
              }
              className='w-full mt-6 py-4 bg-gradient-to-r dark:from-amber-500 dark:to-amber-600 dark:hover:from-amber-600 dark:hover:to-amber-500 from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold text-lg'
            >
              Pay ${finalAmount}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
