'use client';
import { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ImSpinner9 } from 'react-icons/im';
import { setCookies } from '@/helpers/setCookies';

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string) => {
    if (!email) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return 'Invalid email format';
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setErrors({ email: emailError, password: passwordError });

    if (emailError || passwordError) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const user = await res.json();
      console.log(user)
      await setCookies(user?.data?.accessToken);
      if (!user?.success) {
        setIsLoading(false);
        toast.error(user?.message);
      }
      if (user?.success) {
        toast.success(user?.message);
        setIsLoading(false);
        // router.push(user?.data?.user?.role === 'ADMIN' ? '/dashboard' : '/');
        window.location.replace(user?.data?.user?.role === 'ADMIN' ? '/dashboard' : '/')
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className='w-full max-w-xl'>
      {/* Header */}
      <div className='text-center mb-8 animate-fade-in'>
        <div className='inline-block mb-4'>
          <div className='w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 dark:from-amber-400 dark:to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/50 dark:shadow-amber-500/50 animate-float'>
            <svg
              className='w-8 h-8 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
              />
            </svg>
          </div>
        </div>
        <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-2'>
          Welcome Back
        </h1>
        <p className='text-gray-700 dark:text-gray-300'>
          Sign in to access your luxury property portfolio
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className='space-y-5'>
        {/* Email */}
        <div className='group'>
          <label className='block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2'>
            Email Address
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
              <svg
                className='w-5 h-5 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-amber-400 transition-colors'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                />
              </svg>
            </div>
            <input
              type='email'
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setErrors({ ...errors, email: '' });
              }}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-amber-500'
              } bg-white dark:bg-gray-800/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:border-transparent transition-all duration-300 group-hover:border-blue-400 dark:group-hover:border-amber-400 group-hover:shadow-lg`}
              placeholder='john@example.com'
            />
          </div>
          {errors.email && (
            <p className='mt-1 text-sm text-red-500'>{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className='group'>
          <label className='block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2'>
            Password
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
              <svg
                className='w-5 h-5 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-amber-400 transition-colors'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                />
              </svg>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                setErrors({ ...errors, password: '' });
              }}
              className={`w-full pl-12 pr-12 py-3 rounded-xl border ${
                errors.password
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-amber-500'
              } bg-white dark:bg-gray-800/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:border-transparent transition-all duration-300 group-hover:border-blue-400 dark:group-hover:border-amber-400 group-hover:shadow-lg`}
              placeholder='••••••••'
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-500 dark:hover:text-amber-400 transition-colors'
            >
              {showPassword ? (
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
                    d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
                  />
                </svg>
              ) : (
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
                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                  />
                </svg>
              )}
            </button>
          </div>
          {errors.password && (
            <p className='mt-1 text-sm text-red-500'>{errors.password}</p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className='flex items-center'>
          <Link
            href='/forgot-password'
            className='text-sm text-blue-600 hover:text-blue-700 dark:text-amber-400 dark:hover:text-amber-300 font-medium transition-colors'
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full bg-linear-to-r from-blue-600 to-indigo-600 dark:from-amber-500 dark:to-amber-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 dark:hover:from-amber-600 dark:hover:to-amber-700 transition-all duration-300 shadow-lg shadow-blue-500/50 dark:shadow-amber-500/50 hover:shadow-xl hover:shadow-blue-500/60 dark:hover:shadow-amber-500/60 hover:-translate-y-0.5 active:translate-y-0'
        >
          {isLoading ? (
            <span className='flex items-center justify-center'>
              <ImSpinner9 className='animate-spin inline-block mr-2' />
              Signing In...
            </span>
          ) : (
            'Sign In'
          )}
        </button>

        {/* Divider */}
        <div className='relative my-6'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300 dark:border-gray-600'></div>
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-4 bg-transparent text-gray-600 dark:text-gray-400'>
              Or continue with
            </span>
          </div>
        </div>
      </form>

      {/* Register Link */}
      <p className='text-center text-sm text-gray-700 dark:text-gray-300 mt-6'>
        Don&apos;t have an account?{' '}
        <Link
          href='/register'
          className='text-blue-600 hover:text-blue-700 dark:text-amber-400 dark:hover:text-amber-300 font-semibold transition-colors'
        >
          Create account
        </Link>
      </p>
    </div>
  );
}
