/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from 'next/headers';
import PaymentHistoryClient from '@/components/PaymentHistoryClient';
import { FiDollarSign, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';

async function getPayments() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/my-payments`, {
      cache: 'no-store',
      headers: {
        Authorization: `${token}`,
      },
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export default async function PaymentHistory() {
  const payments = await getPayments();

  const stats = {
    total: payments.length,
    totalAmount: payments.reduce((sum: number, p: any) => sum + Number(p.amount), 0),
    completed: payments.filter((p: any) => p.status === 'completed').length,
    pending: payments.filter((p: any) => p.status === 'pending').length,
    failed: payments.filter((p: any) => p.status === 'failed').length,
  };

  return (
    <div className='min-h-screen  py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto space-y-8'>
        {/* Header */}
        <div className='text-center space-y-4'>
          <h1 className='text-4xl sm:text-5xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>
            Payment History
          </h1>
          <p className='text-gray-600 dark:text-gray-400 text-lg'>
            Track all your transactions and payment status
          </p>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
          <div className='group relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300'>
            <div className='absolute inset-0 bg-linear-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity' />
            <div className='relative flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>Total Amount</p>
                <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                  ${stats.totalAmount.toLocaleString()}
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
                <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>Completed</p>
                <p className='text-2xl font-bold text-gray-900 dark:text-white'>{stats.completed}</p>
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
                <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>Pending</p>
                <p className='text-2xl font-bold text-gray-900 dark:text-white'>{stats.pending}</p>
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
                <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>Failed</p>
                <p className='text-2xl font-bold text-gray-900 dark:text-white'>{stats.failed}</p>
              </div>
              <div className='w-12 h-12 rounded-xl bg-linear-to-br from-red-500 to-rose-500 flex items-center justify-center'>
                <FiXCircle className='w-6 h-6 text-white' />
              </div>
            </div>
          </div>
        </div>

        {/* Payment History Table */}
        <PaymentHistoryClient payments={payments} />
      </div>
    </div>
  );
}
