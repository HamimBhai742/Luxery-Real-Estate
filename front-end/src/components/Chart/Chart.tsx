'use client';

import { DailyRevenue, PaymentStatus } from '@/types/admin.dashboard';
import { ChartAreaInteractive } from './AreaChart';
import { ChartPieLabelList } from './PiChart';

export default function DashboardCharts({
  paymentData,
  chartData,
}: {
  paymentData: PaymentStatus[];
  chartData: DailyRevenue[];
}) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      <ChartAreaInteractive  chartData={chartData}/>
      <ChartPieLabelList paymentData={paymentData} />
    </div>
  );
}
