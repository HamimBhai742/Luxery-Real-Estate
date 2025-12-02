'use client';

import { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { ImSpinner9 } from 'react-icons/im';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Validation functions
  const validateName = (name: string): string | undefined => {
    if (!name.trim()) return 'Name is required';
    if (name.trim().length < 2) return 'Name must be at least 2 characters';
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return undefined;
  };

  const validatePhone = (phone: string): string | undefined => {
    if (!phone.trim()) return 'Phone number is required';
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, '');
    // BD phone validation: must be 11 digits and start with 01
    if (digitsOnly.length < 11) return 'Phone number must be at least 11 digits';
    if (!digitsOnly.startsWith('01')) return 'BD phone number must start with 01';
    if (digitsOnly.length > 11) return 'Phone number must be exactly 11 digits';
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Password must contain at least one special character';
    return undefined;
  };

  const getPasswordStrength = (password: string): { strength: string; color: string; width: string } => {
    if (!password) return { strength: '', color: '', width: '0%' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

    if (score <= 2) return { strength: 'Weak', color: 'bg-red-500', width: '33%' };
    if (score <= 4) return { strength: 'Medium', color: 'bg-yellow-500', width: '66%' };
    return { strength: 'Strong', color: 'bg-green-500', width: '100%' };
  };

  const handleFieldBlur = (field: keyof FormErrors) => {
    let error: string | undefined;
    switch (field) {
      case 'name':
        error = validateName(formData.name);
        break;
      case 'email':
        error = validateEmail(formData.email);
        break;
      case 'phone':
        error = validatePhone(formData.phone);
        break;
      case 'password':
        error = validatePassword(formData.password);
        break;
    }
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      password: validatePassword(formData.password),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== undefined);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix all errors before submitting');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      
      if (data.success) {
        toast.success('Registration successful! Please log in.');
        window.location.href = '/login';
      } else {
        toast.error('Registration failed: ' + data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className='w-full max-w-md'>
      {/* Header */}
      <div className='text-center mb-8 animate-fade-in'>
        <div className='inline-block mb-4'>
          <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-amber-400 dark:to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/50 dark:shadow-amber-500/50 animate-float'>
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
                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
              />
            </svg>
          </div>
        </div>
        <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-2'>
          Create Account
        </h1>
        <p className='text-gray-700 dark:text-gray-400'>
          Join our exclusive luxury real estate community
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className='space-y-5'>
        {/* Name Field */}
        <div className='group'>
          <label className='block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2'>
            Name <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: undefined });
            }}
            onBlur={() => handleFieldBlur('name')}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.name 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500 dark:focus:ring-amber-500'
            } bg-white dark:bg-gray-800/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:border-transparent transition-all duration-300`}
            placeholder='John Doe'
          />
          {errors.name && (
            <p className='mt-1 text-sm text-red-500 flex items-center gap-1'>
              <FiAlertCircle className='w-4 h-4' />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className='group'>
          <label className='block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2'>
            Email Address <span className='text-red-500'>*</span>
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
              <svg
                className='w-5 h-5 text-gray-400'
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
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              onBlur={() => handleFieldBlur('email')}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                errors.email 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500 dark:focus:ring-amber-500'
              } bg-white dark:bg-gray-800/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:border-transparent transition-all duration-300`}
              placeholder='john@example.com'
            />
          </div>
          {errors.email && (
            <p className='mt-1 text-sm text-red-500 flex items-center gap-1'>
              <FiAlertCircle className='w-4 h-4' />
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div className='group'>
          <label className='block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2'>
            Phone Number (BD) <span className='text-red-500'>*</span>
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
              <svg
                className='w-5 h-5 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                />
              </svg>
            </div>
            <input
              type='tel'
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                if (errors.phone) setErrors({ ...errors, phone: undefined });
              }}
              onBlur={() => handleFieldBlur('phone')}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                errors.phone 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500 dark:focus:ring-amber-500'
              } bg-white dark:bg-gray-800/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:border-transparent transition-all duration-300`}
              placeholder='01712345678'
            />
          </div>
          {errors.phone && (
            <p className='mt-1 text-sm text-red-500 flex items-center gap-1'>
              <FiAlertCircle className='w-4 h-4' />
              {errors.phone}
            </p>
          )}
          {!errors.phone && formData.phone && (
            <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
              Format: 01XXXXXXXXX (11 digits)
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className='group'>
          <label className='block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2'>
            Password <span className='text-red-500'>*</span>
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
              <svg
                className='w-5 h-5 text-gray-400'
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
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
              onBlur={() => handleFieldBlur('password')}
              className={`w-full pl-12 pr-12 py-3 rounded-xl border ${
                errors.password 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500 dark:focus:ring-amber-500'
              } bg-white dark:bg-gray-800/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:border-transparent transition-all duration-300`}
              placeholder='••••••••'
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-500 dark:hover:text-amber-500 transition-colors'
            >
              {showPassword ? (
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21' />
                </svg>
              ) : (
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                </svg>
              )}
            </button>
          </div>
          
          {/* Password Strength Indicator */}
          {formData.password && (
            <div className='mt-2'>
              <div className='flex items-center justify-between mb-1'>
                <span className='text-xs text-gray-600 dark:text-gray-400'>Password Strength:</span>
                <span className={`text-xs font-medium ${
                  passwordStrength.strength === 'Weak' ? 'text-red-500' :
                  passwordStrength.strength === 'Medium' ? 'text-yellow-500' :
                  'text-green-500'
                }`}>
                  {passwordStrength.strength}
                </span>
              </div>
              <div className='h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
                <div 
                  className={`h-full ${passwordStrength.color} transition-all duration-300`}
                  style={{ width: passwordStrength.width }}
                />
              </div>
            </div>
          )}

          {errors.password && (
            <p className='mt-2 text-sm text-red-500 flex items-center gap-1'>
              <FiAlertCircle className='w-4 h-4' />
              {errors.password}
            </p>
          )}
          
          {!errors.password && formData.password && (
            <div className='mt-2 space-y-1'>
              <p className={`text-xs flex items-center gap-1 ${formData.password.length >= 8 ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                <FiCheckCircle className='w-3 h-3' />
                At least 8 characters
              </p>
              <p className={`text-xs flex items-center gap-1 ${/[A-Z]/.test(formData.password) ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                <FiCheckCircle className='w-3 h-3' />
                One uppercase letter
              </p>
              <p className={`text-xs flex items-center gap-1 ${/[a-z]/.test(formData.password) ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                <FiCheckCircle className='w-3 h-3' />
                One lowercase letter
              </p>
              <p className={`text-xs flex items-center gap-1 ${/[0-9]/.test(formData.password) ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                <FiCheckCircle className='w-3 h-3' />
                One number
              </p>
              <p className={`text-xs flex items-center gap-1 ${/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                <FiCheckCircle className='w-3 h-3' />
                One special character
              </p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          disabled={isLoading}
          className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-amber-500 dark:to-amber-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 dark:hover:from-amber-600 dark:hover:to-amber-700 transition-all duration-300 shadow-lg shadow-blue-500/50 dark:shadow-amber-500/50 hover:shadow-xl hover:shadow-blue-500/60 dark:hover:shadow-amber-500/60 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0'
        >
          {isLoading ? (
            <span className='flex items-center justify-center gap-2'>
              <ImSpinner9 className='animate-spin' />
              Creating Account...
            </span>
          ) : (
            'Create Account'
          )}
        </button>

        {/* Divider */}
        <div className='relative my-6'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300 dark:border-gray-700'></div>
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-4 bg-transparent text-gray-600 dark:text-gray-400'>
              Or continue with
            </span>
          </div>
        </div>

        {/* Social Login */}
        <div className='grid grid-cols-2 gap-4'>
          <button
            type='button'
            className='flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 backdrop-blur-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 hover:-translate-y-0.5'
          >
            <svg className='w-5 h-5' viewBox='0 0 24 24'>
              <path fill='#4285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z' />
              <path fill='#34A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z' />
              <path fill='#FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z' />
              <path fill='#EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z' />
            </svg>
            <span className='text-sm font-medium text-gray-800 dark:text-gray-300'>Google</span>
          </button>
          <button
            type='button'
            className='flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 backdrop-blur-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 hover:-translate-y-0.5'
          >
            <svg className='w-5 h-5 text-gray-800 dark:text-white' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z' />
            </svg>
            <span className='text-sm font-medium text-gray-800 dark:text-gray-300'>GitHub</span>
          </button>
        </div>
      </form>

      {/* Login Link */}
      <p className='text-center text-sm text-gray-700 dark:text-gray-400 mt-6'>
        Already have an account?{' '}
        <Link
          href='/login'
          className='text-blue-600 hover:text-blue-700 dark:text-amber-600 dark:hover:text-amber-700 font-semibold transition-colors'
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
