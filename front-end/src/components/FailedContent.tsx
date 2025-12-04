'use client';
import Link from 'next/link';
import { FaExclamationCircle, FaHome, FaRedo, FaHeadset } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';

export default function FailedContent() {
  const searchParams = useSearchParams();
  const txId = searchParams.get('transactionId');

  return (
    <div className='min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden flex items-center justify-center p-4'>
      {/* Animated Background */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-20 left-10 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse-slow' />
        <div className='absolute bottom-20 right-10 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl animate-pulse-slow delay-1000' />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-3xl animate-float' />
      </div>

      {/* Main Content */}
      <div className='relative z-10 w-full max-w-2xl animate-scale-in'>
        {/* Error Icon */}
        <div className='flex justify-center mb-8'>
          <div className='relative'>
            <div className='absolute inset-0 bg-red-500/30 rounded-full blur-2xl animate-pulse-slow' />
            <FaExclamationCircle className='relative text-red-400 text-8xl md:text-9xl animate-bounce-slow' />
          </div>
        </div>

        {/* Glassmorphic Card */}
        <div className='backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl'>
          <div className='text-center mb-8'>
            <h1 className='text-4xl md:text-5xl font-bold bg-linear-to-r from-red-400 via-rose-400 to-pink-400 bg-clip-text text-transparent mb-4'>
              Payment Failed
            </h1>
            <h3>
              Transaction ID:{' '}
              <span className='font-mono text-sm text-slate-300'>
                {txId || 'N/A'}
              </span>
            </h3>
            <p className='text-slate-300 text-lg'>
              We couldn&apos;t process your payment. Please try again.
            </p>
          </div>

          {/* Error Details */}
          <div className='bg-slate-800/50 rounded-2xl p-6 mb-8 border border-slate-700/50'>
            <h3 className='text-white font-semibold mb-3 flex items-center gap-2'>
              <FaExclamationCircle className='text-red-400' />
              Error Details
            </h3>
            <p className='text-slate-400 text-sm leading-relaxed mb-4'>
              {
                'The payment transaction could not be completed. This might be due to insufficient funds, incorrect card details, or a network issue.'
              }
            </p>
            <div className='bg-red-500/10 border border-red-500/30 rounded-lg p-4'>
              <p className='text-red-400 text-sm font-medium'>
                Common reasons:
              </p>
              <ul className='text-slate-400 text-sm mt-2 space-y-1 list-disc list-inside'>
                <li>Insufficient funds in account</li>
                <li>Incorrect card information</li>
                <li>Card expired or blocked</li>
                <li>Network connection issue</li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4'>
            <Link
              href='/dashboard/my-bookings'
              className='flex-1 flex items-center justify-center gap-2 bg-linear-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/50'
            >
              <FaRedo />
              Try Again
            </Link>
            <Link
              href='/contact'
              className='flex-1 flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 border border-slate-700'
            >
              <FaHeadset />
              Contact Support
            </Link>
          </div>

          <Link
            href='/'
            className='mt-4 flex items-center justify-center gap-2 text-slate-400 hover:text-white transition-colors'
          >
            <FaHome />
            Return to Home
          </Link>

          {/* Additional Info */}
          <div className='mt-8 pt-6 border-t border-slate-700/50'>
            <p className='text-slate-400 text-sm text-center'>
              No charges were made to your account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
