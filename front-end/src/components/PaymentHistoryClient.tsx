/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Payment } from '@/types/payment';
import { useState, useEffect } from 'react';
import {
  FiSearch,
  FiCreditCard,
  FiXCircle,
  FiClock,
  FiCheckCircle,
  FiDollarSign,
  FiChevronRight,
  FiChevronLeft,
} from 'react-icons/fi';
import Link from 'next/link';
import TimeAgo from 'react-timeago';
import { getPayments } from '@/helpers/getPayments';
import PaymentHistoryClientSkeleton from './PaymentHistoryClientSkeleton';

interface PaymentStats {
  total: number;
  totalAmount: string; // or number if you prefer
  totalCanceled: number;
  totalFailed: number;
  totalPages: number;
  totalPending: number;
  totalSuccess: number;
}

export default function PaymentHistoryClient() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentStats, setPaymentStats] = useState<PaymentStats | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'pending' | 'succeeded' | 'failed' | 'canceled'
  >('all');

  useEffect(() => {
    try {
      const fetchPayments = async () => {
        const paymentsData = await getPayments(
          searchTerm,
          statusFilter as any,
          limit,
          currentPage
        );
        setPaymentStats(paymentsData.metaData);
        setPayments(paymentsData.payments);
        setIsLoading(false);
      };
      fetchPayments();
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  }, [searchTerm, statusFilter, limit, currentPage]);

  if (isLoading) {
    return <PaymentHistoryClientSkeleton />;
  }

  if (!payments || payments.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-20'>
        <div className='w-24 h-24 mb-6 rounded-full bg-linear-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center'>
          <FiCreditCard className='w-12 h-12 text-blue-500' />
        </div>
        <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
          No Payments Yet
        </h3>
        <p className='text-gray-600 dark:text-gray-400 mb-6'>
          Your payment history will appear here
        </p>
        <Link
          href='/properties'
          className='px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300'
        >
          Browse Properties
        </Link>
      </div>
    );
  }
  return (
    <div className='space-y-6'>
      {/* Stats Cards */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className='group relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300'>
          <div className='absolute inset-0 bg-linear-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity' />
          <div className='relative flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
                Total Amount
              </p>
              <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                ${paymentStats?.totalAmount.toLocaleString()}
              </p>
            </div>
            <div className='w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center'>
              <FiDollarSign className='w-6 h-6 text-white' />
            </div>
          </div>
        </div>

        <div className='group relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300'>
          <div className='absolute inset-0 bg-linear-to-br from-green-500/10 to-emerald-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity' />
          <div className='relative flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
                Completed
              </p>
              <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                {paymentStats?.totalSuccess}
              </p>
            </div>
            <div className='w-12 h-12 rounded-xl bg-linear-to-br from-green-500 to-emerald-500 flex items-center justify-center'>
              <FiCheckCircle className='w-6 h-6 text-white' />
            </div>
          </div>
        </div>

        <div className='group relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300'>
          <div className='absolute inset-0 bg-linear-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity' />
          <div className='relative flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
                Pending
              </p>
              <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                {paymentStats?.totalPending}
              </p>
            </div>
            <div className='w-12 h-12 rounded-xl bg-linear-to-br from-yellow-500 to-orange-500 flex items-center justify-center'>
              <FiClock className='w-6 h-6 text-white' />
            </div>
          </div>
        </div>

        <div className='group relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300'>
          <div className='absolute inset-0 bg-linear-to-br from-red-500/10 to-rose-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity' />
          <div className='relative flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
                Failed
              </p>
              <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                {paymentStats?.totalFailed}
              </p>
            </div>
            <div className='w-12 h-12 rounded-xl bg-linear-to-br from-red-500 to-rose-500 flex items-center justify-center'>
              <FiXCircle className='w-6 h-6 text-white' />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='flex-1 relative'>
          <FiSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500' />
          <input
            type='text'
            placeholder='Search by transaction ID or amount...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-500'
          />
        </div>
        <div className='flex gap-2 flex-wrap'>
          {(['all', 'succeeded', 'pending', 'failed', 'canceled'] as const).map(
            (status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  statusFilter === status
                    ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-500'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            )
          )}
        </div>
      </div>

      {/* Table */}
      <div className='overflow-x-auto rounded-2xl border border-gray-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl shadow-xl'>
        <table className='w-full'>
          <thead className='bg-linear-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 border-b border-gray-200 dark:border-slate-600'>
            <tr>
              <th className='px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider'>
                Transaction ID
              </th>
              <th className='px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider'>
                Provider
              </th>
              <th className='px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider'>
                Amount
              </th>
              <th className='px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider'>
                Status
              </th>
              <th className='px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider'>
                Time
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 dark:divide-slate-700'>
            {payments?.map((payment) => (
              <tr
                key={payment.id}
                className='hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors duration-200'
              >
                <td className='px-6 py-4'>
                  <div className='flex items-center gap-2'>
                    <FiCreditCard className='w-4 h-4 text-blue-600 dark:text-blue-400' />
                    <span className='font-mono text-sm text-gray-900 dark:text-white'>
                      {payment.transactionId}
                    </span>
                  </div>
                </td>
                <td className='px-6 py-4'>
                  <span className='text-sm font-medium text-gray-900 dark:text-white uppercase'>
                    {payment.provider}
                  </span>
                </td>
                <td className='px-6 py-4'>
                  <span className='text-lg font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                    ${Number(payment.amount).toLocaleString()}
                  </span>
                </td>
                <td className='px-6 py-4'>
                  <span
                    className={`inline-flex px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                      payment.status === 'pending'
                        ? 'bg-linear-to-r from-yellow-400 to-orange-500 text-white shadow-lg shadow-yellow-500/30'
                        : payment.status === 'completed'
                        ? 'bg-linear-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/30'
                        : 'bg-linear-to-r from-red-400 to-rose-500 text-white shadow-lg shadow-red-500/30'
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className='px-6 py-4'>
                  <span className='text-sm text-gray-600 dark:text-gray-400'>
                    <TimeAgo date={payment.createdAt} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {paymentStats && paymentStats?.totalPages > 1 && (
        <div className='backdrop-blur-xl bg-white/80 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-4 shadow-lg dark:shadow-none'>
          <div className='flex items-center justify-between'>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Page {currentPage} of {paymentStats?.totalPages}
            </p>

            <div className='flex items-center gap-2'>
              <div className='flex gap-2'>
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className='p-2 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
                >
                  <FiChevronLeft />
                </button>
                {Array.from(
                  { length: paymentStats?.totalPages },
                  (_, i) => i + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      currentPage === page
                        ? 'bg-linear-to-r from-amber-500 to-amber-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((p) =>
                      Math.min(paymentStats?.totalPages, p + 1)
                    )
                  }
                  disabled={currentPage === paymentStats?.totalPages}
                  className='p-2 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
                >
                  <FiChevronRight />
                </button>
              </div>
              <select
                onChange={(e) => setLimit(Number(e.target.value))}
                name=''
                id=''
                className='select'
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
