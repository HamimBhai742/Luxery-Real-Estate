'use client';

import { useState, useMemo } from 'react';
import PropertyCard from '@/components/PropertyCard';
import { Property } from '@/types/property';

// Mock data - replace with API call
const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Modern Villa with Ocean View',
    slug: 'modern-villa-ocean-view',
    description: 'Stunning modern villa with panoramic ocean views',
    location: 'Malibu, CA',
    price: 4500000,
    bedrooms: 5,
    bathrooms: 4,
    amenities: ['Pool', 'Gym', 'Ocean View'],
    status: 'active',
    isBooked: false,
    createdAt: '2025-01-15',
    updatedAt: '2025-01-15',
  },
  {
    id: '2',
    name: 'Luxury Penthouse Downtown',
    slug: 'luxury-penthouse-downtown',
    description: 'Exclusive penthouse in the heart of the city',
    location: 'New York, NY',
    price: 8900000,
    bedrooms: 4,
    bathrooms: 3,
    amenities: ['Rooftop', 'Concierge', 'Smart Home'],
    status: 'active',
    isBooked: true,
    createdAt: '2025-01-10',
    updatedAt: '2025-01-20',
  },
  {
    id: '3',
    name: 'Beachfront Estate',
    slug: 'beachfront-estate',
    description: 'Private beachfront property with direct access',
    location: 'Miami, FL',
    price: 6200000,
    bedrooms: 6,
    bathrooms: 5,
    amenities: ['Beach Access', 'Pool', 'Tennis Court'],
    status: 'sold',
    isBooked: false,
    createdAt: '2025-01-05',
    updatedAt: '2025-01-18',
  },
];

export default function PropertiesPage() {
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [bedrooms, setBedrooms] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredProperties = useMemo(() => {
    return mockProperties.filter((property) => {
      const matchesSearch = property.name.toLowerCase().includes(search.toLowerCase()) ||
                           property.location.toLowerCase().includes(search.toLowerCase());

      const matchesPrice = priceRange === 'all' ||
        (priceRange === 'under5m' && property.price < 5000000) ||
        (priceRange === '5m-10m' && property.price >= 5000000 && property.price <= 10000000) ||
        (priceRange === 'over10m' && property.price > 10000000);

      const matchesBedrooms = bedrooms === 'all' || property.bedrooms === parseInt(bedrooms);

      const matchesStatus = statusFilter === 'all' ||
        (statusFilter === 'available' && property.status === 'active' && !property.isBooked) ||
        (statusFilter === 'booked' && property.isBooked) ||
        (statusFilter === 'sold' && property.status === 'sold');

      return matchesSearch && matchesPrice && matchesBedrooms && matchesStatus;
    });
  }, [search, priceRange, bedrooms, statusFilter]);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Luxury Properties
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Discover your dream home from our exclusive collection
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search
              </label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Location or name..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price Range
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="all">All Prices</option>
                <option value="under5m">Under $5M</option>
                <option value="5m-10m">$5M - $10M</option>
                <option value="over10m">Over $10M</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bedrooms
              </label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="all">Any</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
                <option value="6">6+</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="all">All</option>
                <option value="available">Available</option>
                <option value="booked">Booked</option>
                <option value="sold">Sold</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredProperties.length} of {mockProperties.length} properties
          </div>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <svg className="w-20 h-20 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No properties found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your filters to see more results
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
