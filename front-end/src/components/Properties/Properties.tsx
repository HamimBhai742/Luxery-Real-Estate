'use client';
import { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';
import { Property } from '@/types/property';
import PropertyCardSkeleton from './PropertyCardSkeleton';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { PropertiesData } from '@/helpers/propertiesData';
export interface IData {
  metaData: {
    total: number;
    totalPages: number;
    page: number;
    limit: number;
  };
  properties: Property[];
}
const Properties = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IData>({
    properties: [],
    metaData: {
      total: 0,
      totalPages: 0,
      page: 0,
      limit: 0,
    },
  });
  const [priceRange, setPriceRange] = useState('all');
  const [bedrooms, setBedrooms] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(9);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await PropertiesData(
          search,
          currentPage,
          limit,
          priceRange,
          statusFilter,
          bedrooms
        );
        if (data) {
          setLoading(false);
          setData(data);
        }
        console.log(data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [search, currentPage, limit, priceRange, statusFilter, bedrooms]);
  return (
    <div className='min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-gray-900 dark:to-black py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-5xl font-bold text-gray-900 dark:text-white mb-4'>
            Luxury Properties
          </h1>
          <p className='text-xl text-gray-700 dark:text-gray-400'>
            Discover your dream home from our exclusive collection
          </p>
        </div>

        {/* Filters */}
        <div className='bg-white dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 mb-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {/* Search */}
            <div>
              <label className='block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2'>
                Search
              </label>
              <input
                type='text'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Location or name...'
                className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-amber-500 focus:border-transparent'
              />
            </div>

            {/* Price Range */}
            <div>
              <label className='block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2'>
                Price Range
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className='select w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-amber-500 focus:border-transparent'
              >
                <option value='all'>All Prices</option>
                <option value='under2k'>Under $2k</option>
                <option value='2kto5k'>$2k - $5k</option>
                <option value='5kto10k'>$5k - $10k</option>
                <option value='over10k'>Over $10k</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label className='block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2'>
                Bedrooms
              </label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className='select w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-amber-500 focus:border-transparent'
              >
                <option value='all'>Any</option>
                <option value='3'>3+</option>
                <option value='4'>4+</option>
                <option value='5'>5+</option>
                <option value='6'>6+</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className='block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2'>
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className='select w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-amber-500 focus:border-transparent'
              >
                <option value='all'>All</option>
                <option value='available'>Available</option>
                <option value='unavailable'>Unavailable</option>
                <option value='booked'>Booked</option>
                <option value='sold'>Sold</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className='mt-4 text-sm text-gray-600 dark:text-gray-400'>
            Showing {data.properties.length} of {data.metaData.total} properties
          </div>
        </div>

        {/* Properties Grid */}
        {loading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {[...Array(9)].map((_, index) => (
              <PropertyCardSkeleton key={index} />
            ))}
          </div>
        ) : data?.properties.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {data?.properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className='text-center py-20'>
            <svg
              className='w-20 h-20 mx-auto text-gray-400 mb-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
              No properties found
            </h3>
            <p className='text-gray-600 dark:text-gray-400'>
              Try adjusting your filters to see more results
            </p>
          </div>
        )}

        <div className='mt-8'>
          {data?.metaData && data?.metaData?.totalPages > 1 && (
            <div className='backdrop-blur-xl bg-white/80 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-4 shadow-lg dark:shadow-none'>
              <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Page {currentPage} of {data?.metaData.totalPages}
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
                      { length: data?.metaData.totalPages },
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
                          Math.min(data?.metaData.totalPages, p + 1)
                        )
                      }
                      disabled={currentPage === data?.metaData.totalPages}
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
      </div>
    </div>
  );
};

export default Properties;
