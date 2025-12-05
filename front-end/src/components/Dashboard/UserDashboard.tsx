'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FiCalendar,
  FiCreditCard,
  FiHome,
  FiTrendingUp,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
} from 'react-icons/fi';
import TimeAgo from 'react-timeago';
import UserDashboardSkeleton from './UserDashboardSkeleton';
import { DashboardData } from '@/types/user.dashboard';


const UserDashboard = () => {
  const [userStats, setUserStats] = useState<DashboardData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/stats/user`,
          {
            credentials: 'include',
          }
        );
        const data = await res.json();
        setUserStats(data?.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <UserDashboardSkeleton />;
  }
  return (
    <div className='min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto space-y-8'>
        {/* Welcome Section */}
        <div className='relative overflow-hidden bg-linear-to-r from-blue-600 to-purple-600 rounded-3xl p-8 shadow-2xl'>
          <div className='absolute inset-0 bg-black/10'></div>
          <div className='relative z-10'>
            <h1 className='text-3xl sm:text-4xl font-bold text-white mb-2'>
              Welcome back, {userStats?.user?.name || 'User'}! 👋
            </h1>
            <p className='text-blue-100 text-lg'>
              Here&lsquo;s what&lsquo;s happening with your properties today
            </p>
          </div>
          <div className='absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl'></div>
          <div className='absolute -left-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl'></div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          <div className='group relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300'>
            <div className='absolute inset-0 bg-linear-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity'></div>
            <div className='relative'>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center'>
                  <FiCalendar className='w-6 h-6 text-white' />
                </div>
                <FiTrendingUp className='w-5 h-5 text-green-500' />
              </div>
              <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
                Total Bookings
              </p>
              <p className='text-3xl font-bold text-gray-900 dark:text-white'>
                {userStats?.totalMyBookings}
              </p>
            </div>
          </div>

          <div className='group relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300'>
            <div className='absolute inset-0 bg-linear-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity'></div>
            <div className='relative'>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-12 h-12 rounded-xl bg-linear-to-br from-yellow-500 to-orange-500 flex items-center justify-center'>
                  <FiClock className='w-6 h-6 text-white' />
                </div>
              </div>
              <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
                Pending
              </p>
              <p className='text-3xl font-bold text-gray-900 dark:text-white'>
                {userStats?.totalMyBookingsPending}
              </p>
            </div>
          </div>

          <div className='group relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300'>
            <div className='absolute inset-0 bg-linear-to-br from-green-500/10 to-emerald-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity'></div>
            <div className='relative'>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-12 h-12 rounded-xl bg-linear-to-br from-green-500 to-emerald-500 flex items-center justify-center'>
                  <FiCheckCircle className='w-6 h-6 text-white' />
                </div>
              </div>
              <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
                Completed
              </p>
              <p className='text-3xl font-bold text-gray-900 dark:text-white'>
                {userStats?.totalMyBookingsCompleted}
              </p>
            </div>
          </div>

          <div className='group relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300'>
            <div className='absolute inset-0 bg-linear-to-br from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity'></div>
            <div className='relative'>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center'>
                  <FiDollarSign className='w-6 h-6 text-white' />
                </div>
              </div>
              <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
                Total Spent
              </p>
              <p className='text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
                ${userStats?.totalSpent.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <Link
            href='/properties'
            className='group relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300'
          >
            <div className='absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity'></div>
            <div className='relative flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center'>
                  <FiHome className='w-6 h-6 text-white' />
                </div>
                <div>
                  <p className='font-semibold text-gray-900 dark:text-white'>
                    Browse Properties
                  </p>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Find your dream home
                  </p>
                </div>
              </div>
              <FiArrowRight className='w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all' />
            </div>
          </Link>

          <Link
            href='/dashboard/my-bookings'
            className='group relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300'
          >
            <div className='absolute inset-0 bg-linear-to-br from-green-500/5 to-emerald-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity'></div>
            <div className='relative flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 rounded-xl bg-linear-to-br from-green-500 to-emerald-500 flex items-center justify-center'>
                  <FiCalendar className='w-6 h-6 text-white' />
                </div>
                <div>
                  <p className='font-semibold text-gray-900 dark:text-white'>
                    My Bookings
                  </p>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    View all bookings
                  </p>
                </div>
              </div>
              <FiArrowRight className='w-5 h-5 text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 group-hover:translate-x-1 transition-all' />
            </div>
          </Link>

          <Link
            href='/dashboard/payment-history'
            className='group relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300'
          >
            <div className='absolute inset-0 bg-linear-to-br from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity'></div>
            <div className='relative flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center'>
                  <FiCreditCard className='w-6 h-6 text-white' />
                </div>
                <div>
                  <p className='font-semibold text-gray-900 dark:text-white'>
                    Payment History
                  </p>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Track payments
                  </p>
                </div>
              </div>
              <FiArrowRight className='w-5 h-5 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:translate-x-1 transition-all' />
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Recent Bookings */}
          <div className='bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-2xl p-6 shadow-xl'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-xl font-bold text-gray-900 dark:text-white'>
                Recent Bookings
              </h2>
              <Link
                href='/dashboard/my-bookings'
                className='text-sm text-blue-600 dark:text-blue-400 hover:underline'
              >
                View All
              </Link>
            </div>
            <div className='space-y-4'>
              {userStats && userStats?.recentBookings.length > 0 ? (
                userStats?.recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className='flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors'
                  >
                    <div className='flex-1'>
                      <p className='font-semibold text-gray-900 dark:text-white'>
                        {booking?.property.name}
                      </p>
                      <p className='text-sm text-gray-600 dark:text-gray-400'>
                        {booking.property.location}
                      </p>
                    </div>
                    <div className='text-right'>
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-bold ${
                          booking.status === 'pending'
                            ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400'
                            : booking.status === 'paid'
                            ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400'
                            : 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'
                        }`}
                      >
                        {booking.status}
                      </span>
                      <p className='text-xs text-gray-500 dark:text-gray-500 mt-1'>
                        <TimeAgo date={booking.updatedAt} />
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className='text-center text-gray-500 dark:text-gray-400 py-8'>
                  No bookings yet
                </p>
              )}
            </div>
          </div>

          {/* Recent Payments */}
          <div className='bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-2xl p-6 shadow-xl'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-xl font-bold text-gray-900 dark:text-white'>
                Recent Payments
              </h2>
              <Link
                href='/dashboard/payment-history'
                className='text-sm text-blue-600 dark:text-blue-400 hover:underline'
              >
                View All
              </Link>
            </div>
            <div className='space-y-4'>
              {userStats && userStats?.recentsPayments.length > 0 ? (
                userStats?.recentsPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className='flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors'
                  >
                    <div className='flex-1'>
                      <p className='font-semibold text-gray-900 dark:text-white font-mono text-sm'>
                        {payment.transactionId}
                      </p>
                      <p className='text-sm text-gray-600 dark:text-gray-400'>
                        {payment.provider.toUpperCase()}
                      </p>
                    </div>
                    <div className='text-right'>
                      <p className='font-bold text-gray-900 dark:text-white'>
                        ${Number(payment.amount).toLocaleString()}
                      </p>
                      <p className='text-xs text-gray-500 dark:text-gray-500 mt-1'>
                        <TimeAgo date={payment.updatedAt} />
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className='text-center text-gray-500 dark:text-gray-400 py-8'>
                  No payments yet
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
