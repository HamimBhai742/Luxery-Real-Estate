import StatsCounter from '../StatsCounter';

interface Stats {
  totalProperties: number;
  totalBookings: number;
  totalUsers: number;
  totalValue: number;
}
const StatsSection = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stats/home`);
  const data = await res.json();
  const stats: Stats = data.data;
  const statss = [
    {
      value: stats.totalProperties,
      suffix: '+',
      label: 'Premium Propertie',
      prefix: '',
    },
    {
      value: stats.totalBookings,
      suffix: '+',
      label: 'Bookings This Year',
      prefix: '',
    },
    {
      value: stats.totalUsers,
      suffix: '+',
      label: 'Happy Clients',
      prefix: '',
    },
    {
      value: stats.totalValue,
      suffix: '+',
      label: 'Property Value',
      prefix: '$',
    },
  ];
  return (
    <section className='relative py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <StatsCounter stats={statss} />
      </div>
    </section>
  );
};

export default StatsSection;
