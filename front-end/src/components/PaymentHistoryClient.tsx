'use client';

import { Payment } from '@/types/payment';
import { useState, useMemo } from 'react';
import { FiSearch, FiCreditCard, FiFilter } from 'react-icons/fi';
import Link from 'next/link';
import TimeAgo from 'react-timeago';

export default function PaymentHistoryClient({ payments }: { payments: Payment[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed' | 'failed'>('all');

  const filteredPayments = useMemo(() => {
    return payments?.filter((payment) => {
      const matchesSearch = payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.amount.includes(searchTerm);
      const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [payments, searchTerm, statusFilter]);

  if (!payments || payments.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-20'>
        <div className='w-24 h-24 mb-6 rounded-full bg-linear-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center'>
          <FiCreditCard className='w-12 h-12 text-blue-500' />
        </div>
        <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>No Payments Yet</h3>
        <p className='text-gray-600 dark:text-gray-400 mb-6'>Your payment history will appear here</p>
        <Link href='/properties' className='px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300'>
          Browse Properties
        </Link>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
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
          {(['all', 'completed', 'pending', 'failed'] as const).map((status) => (
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
          ))}
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
            {filteredPayments?.map((payment) => (
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

      {filteredPayments?.length === 0 && (
        <div className='text-center py-12'>
          <FiFilter className='w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500' />
          <p className='text-gray-600 dark:text-gray-400'>No payments match your filters</p>
        </div>
      )}
    </div>
  );
}
