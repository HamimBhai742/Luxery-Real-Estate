'use client';

import { ChartAreaInteractive } from './AreaChart';
import { ChartPieLabelList } from './PiChart';

export default function DashboardCharts() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      <ChartAreaInteractive />
      <ChartPieLabelList/>
    </div>
  );
}
