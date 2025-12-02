/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import {
  FiHome,
  FiTrendingUp,
  FiDollarSign,
  FiEye,
  FiPlus,
} from 'react-icons/fi';
import PropertyTable from '@/components/PropertyTable';
import PropertyFilters from '@/components/PropertyFilters';
import { useEffect, useState } from 'react';
import ManagePropertiesSkeleton from '@/components/ManagePropertiesSkeleton';
import Link from 'next/link';
import { Property } from '@/types/property';

interface IData {
  metaData: {
    total: number;
    totalPages: number;
    page: number;
    limit: number;
  };
  properties: Property[];
}

const ManageProperty = () => {
  const [data, setData] = useState<IData>({
    metaData: {
      total: 0,
      totalPages: 0,
      page: 0,
      limit: 0,
    },
    properties: [],
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  console.log(selectedStatus, searchTerm);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL
          }/property/my-properties?search=${searchTerm}&${
            selectedStatus === 'all' ? '' : `status=${selectedStatus}`
          }`
        );
        const json = await res.json();
        setData(json.data);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchTerm, selectedStatus]);

  if (loading) return <ManagePropertiesSkeleton />;
  console.log(data);

  const stats = [
    {
      icon: FiHome,
      label: 'Total Properties',
      value: data.metaData.total.toString(),
      change: '+12%',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FiTrendingUp,
      label: 'Active Listings',
      value: data.properties
        .filter((property: any) => property.status === 'available')
        .length.toString(),
      change: '+8%',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: FiDollarSign,
      label: 'Total Value',
      value: `$${data.properties.reduce(
        (sum: number, p: { price: number }) => sum + p.price,
        0
      )}`,
      change: '+15%',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: FiEye,
      label: 'Total Views',
      value: data.properties
        .reduce((sum: number, p: { views: number }) => sum + p.views, 0)
        .toString(),
      change: '+23%',
      color: 'from-orange-500 to-red-500',
    },
  ];
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black p-6 lg:p-8'>
      <div className='max-w-7xl mx-auto space-y-6'>
        {/* Header */}
        <div className='backdrop-blur-xl bg-white/80 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-6 shadow-lg dark:shadow-none'>
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
            <div>
              <h1 className='text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent'>
                Manage Properties
              </h1>
              <p className='text-gray-600 dark:text-gray-400 mt-2'>
                View, edit, and manage all your property listings
              </p>
            </div>
            <Link
              href='/dashboard/create-property'
              className='group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300'
            >
              <FiPlus className='w-5 h-5' />
              Add Property
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {stats.map((stat, index) => (
            <div
              key={index}
              className='group backdrop-blur-xl bg-white/80 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-6 hover:bg-white dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl dark:shadow-none dark:hover:shadow-2xl dark:hover:shadow-purple-500/20'
            >
              <div className='flex items-start justify-between mb-4'>
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className='w-6 h-6 text-white' />
                </div>
                <span className='text-green-600 dark:text-green-400 text-sm font-semibold'>
                  {stat.change}
                </span>
              </div>
              <div>
                <p className='text-gray-600 dark:text-gray-400 text-sm mb-1'>
                  {stat.label}
                </p>
                <p className='text-3xl font-bold text-gray-900 dark:text-white'>
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters Section */}
        <PropertyFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />

        {/* Properties Table */}
        <div className='backdrop-blur-xl bg-white/80 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-6 lg:p-8 shadow-lg dark:shadow-none'>
          <div className='mb-6'>
            <h2 className='text-xl font-bold text-gray-900 dark:text-white'>
              Property Listings
            </h2>
            <p className='text-gray-600 dark:text-gray-400 text-sm mt-1'>
              {data.length} {data.length === 1 ? 'property' : 'properties'}{' '}
              found
            </p>
          </div>
          <PropertyTable properties={data.properties} />
        </div>
      </div>
    </div>
  );
};

export default ManageProperty;
