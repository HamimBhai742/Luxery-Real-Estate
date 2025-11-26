/* eslint-disable react-hooks/purity */
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaCheckCircle, FaHome, FaReceipt } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';

export default function SuccessContent() {
  const [showConfetti, setShowConfetti] = useState(true);
  const searchParams = useSearchParams();
  const transactionId = searchParams.get('transactionId');
  const amount = searchParams.get('amount');

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden flex items-center justify-center p-4'>
      {/* Animated Background */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-20 left-10 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse-slow' />
        <div className='absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse-slow delay-1000' />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl animate-float' />
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className='absolute inset-0 pointer-events-none'>
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className='absolute w-2 h-2 bg-linear-to-r from-green-400 to-emerald-400 rounded-full animate-confetti'
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className='relative z-10 w-full max-w-2xl animate-scale-in'>
        {/* Success Icon */}
        <div className='flex justify-center mb-8'>
          <div className='relative'>
            <div className='absolute inset-0 bg-green-500/30 rounded-full blur-2xl animate-pulse-slow' />
            <FaCheckCircle className='relative text-green-400 text-8xl md:text-9xl animate-bounce-slow' />
          </div>
        </div>

        {/* Glassmorphic Card */}
        <div className='backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl'>
          <div className='text-center mb-8'>
            <h1 className='text-4xl md:text-5xl font-bold bg-linear-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4'>
              Payment Successful!
            </h1>
            <p className='text-slate-300 text-lg'>
              Your booking has been confirmed successfully
            </p>
          </div>

          {/* Transaction Details */}
          {(transactionId || amount) && (
            <div className='bg-slate-800/50 rounded-2xl p-6 mb-8 border border-slate-700/50'>
              <h3 className='text-white font-semibold mb-4 flex items-center gap-2'>
                <FaReceipt className='text-green-400' />
                Transaction Details
              </h3>
              <div className='space-y-3'>
                {transactionId && (
                  <div className='flex justify-between items-center'>
                    <span className='text-slate-400'>Transaction ID</span>
                    <span className='text-white font-mono text-sm'>{transactionId}</span>
                  </div>
                )}
                {amount && (
                  <div className='flex justify-between items-center'>
                    <span className='text-slate-400'>Amount Paid</span>
                    <span className='text-green-400 font-bold text-xl'>${amount}</span>
                  </div>
                )}
                <div className='flex justify-between items-center'>
                  <span className='text-slate-400'>Status</span>
                  <span className='px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm'>
                    Confirmed
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4'>
            <Link
              href='/my-bookings'
              className='flex-1 flex items-center justify-center gap-2 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/50'
            >
              <FaReceipt />
              View My Bookings
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
              A confirmation email has been sent to your registered email address
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
