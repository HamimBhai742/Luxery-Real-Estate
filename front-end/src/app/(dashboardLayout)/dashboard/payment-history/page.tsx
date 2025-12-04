import PaymentHistoryClient from '@/components/PaymentHistoryClient';



export default async function PaymentHistory() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto space-y-8'>
        {/* Header */}
        <div className='text-center space-y-4'>
          <h1 className='text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>
            Payment History
          </h1>
          <p className='text-gray-600 dark:text-gray-400 text-lg'>
            Track all your transactions and payment status
          </p>
        </div>



        {/* Payment History Table */}
        <PaymentHistoryClient />
      </div>
    </div>
  );
}
