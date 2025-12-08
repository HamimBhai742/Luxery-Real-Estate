'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FiLock, FiEye, FiEyeOff, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success('Password reset successful!');
        setTimeout(() => router.push('/login'), 2000);
      } else {
        toast.error(data.message || 'Failed to reset password');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className='w-full max-w-md'>
        <div className='bg-white/90 dark:bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 p-8 lg:p-10 text-center'>
          <div className='w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center'>
            <span className='text-3xl'>⚠️</span>
          </div>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-3'>Invalid Reset Link</h2>
          <p className='text-gray-600 dark:text-gray-400 mb-6'>This password reset link is invalid or has expired.</p>
          <Link href='/forgot-password' className='inline-block px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all'>
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full max-w-md'>
      <div className='bg-white/90 dark:bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 p-8 lg:p-10 animate-fade-in-up'>
        {/* Icon */}
        <div className='w-16 h-16 mx-auto mb-6 rounded-2xl bg-linear-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg'>
          <FiLock className='w-8 h-8 text-white' />
        </div>

        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3'>
            Reset Password
          </h1>
          <p className='text-gray-600 dark:text-gray-400'>
            Enter your new password below
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* New Password */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
              New Password
            </label>
            <div className='relative'>
              <FiLock className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5' />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='Enter new password'
                className='w-full pl-12 pr-12 py-3.5 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-500'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              >
                {showPassword ? <FiEyeOff className='w-5 h-5' /> : <FiEye className='w-5 h-5' />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
              Confirm Password
            </label>
            <div className='relative'>
              <FiCheck className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5' />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder='Confirm new password'
                className='w-full pl-12 pr-12 py-3.5 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-500'
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              >
                {showConfirmPassword ? <FiEyeOff className='w-5 h-5' /> : <FiEye className='w-5 h-5' />}
              </button>
            </div>
          </div>

          {/* Password Match Indicator */}
          {password && confirmPassword && (
            <div className={`text-sm ${password === confirmPassword ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {password === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
            </div>
          )}

          <button
            type='submit'
            disabled={loading || password !== confirmPassword}
            className='w-full py-3.5 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
          >
            {loading ? (
              <>
                <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                Resetting...
              </>
            ) : (
              <>
                <FiCheck className='w-5 h-5' />
                Reset Password
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className='mt-8 pt-6 border-t border-gray-200 dark:border-white/10 text-center'>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Remember your password?{' '}
            <Link href='/login' className='font-semibold text-green-600 dark:text-green-400 hover:underline'>
              Sign in
            </Link>
          </p>
        </div>
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
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ResetPasswordForm;
