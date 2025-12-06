"use client"
import Link from 'next/link';
import { FaTimesCircle, FaHome, FaRedo } from 'react-icons/fa';

export default function CancelContent() {
  return (
    <div className='min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden flex items-center justify-center p-4'>
      {/* Animated Background */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-20 left-10 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse-slow' />
        <div className='absolute bottom-20 right-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse-slow delay-1000' />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl animate-float' />
      </div>

      {/* Main Content */}
      <div className='relative z-10 w-full max-w-2xl animate-scale-in'>
        {/* Cancel Icon */}
        <div className='flex justify-center mb-8'>
          <div className='relative'>
            <div className='absolute inset-0 bg-yellow-500/30 rounded-full blur-2xl animate-pulse-slow' />
            <FaTimesCircle className='relative text-yellow-400 text-8xl md:text-9xl animate-bounce-slow' />
          </div>
        </div>

        {/* Glassmorphic Card */}
        <div className='backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl'>
          <div className='text-center mb-8'>
            <h1 className='text-4xl md:text-5xl font-bold bg-linear-to-r from-yellow-400 via-orange-400 to-amber-400 bg-clip-text text-transparent mb-4'>
              Payment Cancelled
            </h1>
            <p className='text-slate-300 text-lg'>
              Your payment was cancelled. No charges were made.
            </p>
          </div>

          {/* Info Box */}
          <div className='bg-slate-800/50 rounded-2xl p-6 mb-8 border border-slate-700/50'>
            <h3 className='text-white font-semibold mb-3'>What happened?</h3>
            <p className='text-slate-400 text-sm leading-relaxed'>
              You cancelled the payment process. Your booking was not confirmed and no payment was processed. You can try again or return to browse more properties.
            </p>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4'>
            <Link
              href='/dashboard/my-bookings'
              className='flex-1 flex items-center justify-center gap-2 bg-linear-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/50'
            >
              <FaRedo />
              Try Again
            </Link>
            <Link
              href='/'
              className='flex-1 flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 border border-slate-700'
            >
              <FaHome />
              Go to Home
            </Link>
          </div>

          {/* Additional Info */}
          <div className='mt-8 pt-6 border-t border-slate-700/50'>
            <p className='text-slate-400 text-sm text-center'>
              Need help? Contact our support team for assistance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
