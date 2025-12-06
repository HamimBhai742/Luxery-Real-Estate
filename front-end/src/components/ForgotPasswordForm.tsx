'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FiMail, FiArrowLeft, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setSent(true);
        toast.success('Password reset link sent to your email!');
      } else {
        toast.error(data.message || 'Failed to send reset link');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full max-w-md'>
      {/* Back to Login */}
      <Link href='/login' className='inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-purple-400 transition-colors mb-6 group'>
        <FiArrowLeft className='w-5 h-5 group-hover:-translate-x-1 transition-transform' />
        <span className='font-medium'>Back to Login</span>
      </Link>

      {/* Card */}
      <div className='bg-white/90 dark:bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 p-8 lg:p-10 animate-fade-in-up'>
        {!sent ? (
          <>
            {/* Icon */}
            <div className='w-16 h-16 mx-auto mb-6 rounded-2xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg'>
              <FiMail className='w-8 h-8 text-white' />
            </div>

            {/* Header */}
            <div className='text-center mb-8'>
              <h1 className='text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3'>
                Forgot Password?
              </h1>
              <p className='text-gray-600 dark:text-gray-400'>
                No worries! Enter your email and we&apos;ll send you reset instructions.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
                  Email Address
                </label>
                <div className='relative'>
                  <FiMail className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5' />
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder='Enter your email'
                    className='w-full pl-12 pr-4 py-3.5 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-500'
                  />
                </div>
              </div>

              <button
                type='submit'
                disabled={loading}
                className='w-full py-3.5 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
              >
                {loading ? (
                  <>
                    <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend className='w-5 h-5' />
                    Send Reset Link
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <>
            {/* Success State */}
            <div className='text-center'>
              <div className='w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg animate-bounce-once'>
                <svg className='w-10 h-10 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                </svg>
              </div>
              <h2 className='text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3'>
                Check Your Email
              </h2>
              <p className='text-gray-600 dark:text-gray-400 mb-6'>
                We&apos;ve sent password reset instructions to <span className='font-semibold text-purple-600 dark:text-purple-400'>{email}</span>
              </p>
              <Link
                href='/login'
                className='inline-block px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300'
              >
                Back to Login
              </Link>
            </div>
          </>
        )}

        {/* Divider */}
        {!sent && (
          <div className='mt-8 pt-6 border-t border-gray-200 dark:border-white/10 text-center'>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Remember your password?{' '}
              <Link href='/login' className='font-semibold text-purple-600 dark:text-purple-400 hover:underline'>
                Sign in
              </Link>
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce-once {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        .animate-bounce-once {
          animation: bounce-once 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ForgotPasswordForm;
