/* eslint-disable @typescript-eslint/no-explicit-any */
import { FiHome, FiTrendingUp, FiDollarSign, FiEye } from 'react-icons/fi';
import PropertyTable from '@/components/PropertyTable';
import PropertyFilters from '@/components/PropertyFilters';

const ManagePropertyPage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/property/my-properties`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await res.json();
  const stats = [
    {
      icon: FiHome,
      label: 'Total Properties',
      value: data.data.length.toString(),
      change: '+12%',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FiTrendingUp,
      label: 'Active Listings',
      value: data.data.filter((property:any) => property.status === 'active').length.toString(),
      change: '+8%',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: FiDollarSign,
      label: 'Total Value',
      value: `$${data.data.reduce((sum: number, p: { price: number; }) => sum + p.price, 0)}`,
      change: '+15%',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: FiEye,
      label: 'Total Views',
      value: '3.2K',
      change: '+23%',
      color: 'from-orange-500 to-red-500',
    },
  ];
  return (
    <div className='min-h-screen p-6 lg:p-8 space-y-8'>
      {/* Header */}
      <div className='space-y-2'>
        <h1 className='text-4xl lg:text-5xl font-bold text-white'>
          Manage Properties
        </h1>
        <p className='text-white/60 text-lg'>
          View, edit, and manage all your property listings
        </p>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {stats.map((stat, index) => (
          <div
            key={index}
            className='group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20'
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* linear Orb */}
            <div
              className={`absolute -top-10 -right-10 w-32 h-32 bg-linear-to-br ${stat.color} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
            />

            <div className='relative z-10 space-y-4'>
              <div className='flex items-center justify-between'>
                <div
                  className={`p-3 rounded-2xl bg-linear-to-br ${stat.color} bg-opacity-20`}
                >
                  <stat.icon className='w-6 h-6 text-white' />
                </div>
                <span className='text-green-400 text-sm font-semibold'>
                  {stat.change}
                </span>
              </div>
              <div>
                <p className='text-white/60 text-sm'>{stat.label}</p>
                <p className='text-3xl font-bold text-white mt-1'>
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Section */}
      <PropertyFilters />

      {/* Properties Table */}
      <div className='relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 lg:p-8'>
        <PropertyTable properties={data.data} />
      </div>
    </div>
  );
};

export default ManagePropertyPage;
