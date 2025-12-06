'use client';
import { PaymentStatus } from '@/types/admin.dashboard';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export const ChartPieLabelList = ({
  paymentData,
}: {
  paymentData: PaymentStatus[];
}) => {
  console.log(paymentData)
  return (
    <div className='bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 backdrop-blur-xl bg-opacity-80 dark:bg-opacity-60 h-[480px] flex flex-col'>
      <h2 className='text-2xl font-bold mb-6 tracking-wide'>Payment Status</h2>
      <div className='w-full flex-1'>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={paymentData}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={130}
              label
            >
              {paymentData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip cursor={{ fill: '#00000005' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
