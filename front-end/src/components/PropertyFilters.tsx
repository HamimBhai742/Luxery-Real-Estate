'use client';

import React, { useState } from 'react';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';

const PropertyFilters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const statuses = [
    { value: 'all', label: 'All Properties' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'sold', label: 'Sold' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1 relative group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-white/40 w-5 h-5 group-focus-within:text-purple-600 dark:group-focus-within:text-purple-400 transition-colors" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search properties by name, location..."
            className="w-full pl-12 pr-12 py-4 bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/30 focus:bg-white dark:focus:bg-white/10 focus:border-purple-500 dark:focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 shadow-lg dark:shadow-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-6 py-4 backdrop-blur-xl border rounded-xl font-medium transition-all duration-300 flex items-center gap-2 justify-center lg:justify-start shadow-lg dark:shadow-none ${
            showFilters
              ? 'bg-purple-500 border-purple-500 text-white'
              : 'bg-white/80 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 hover:border-purple-500 dark:hover:border-purple-500/50'
          }`}
        >
          <FiFilter className="w-5 h-5" />
          <span>Filters</span>
        </button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="backdrop-blur-xl bg-white/80 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 p-6 shadow-lg dark:shadow-none animate-slideDown">
          <div className="space-y-4">
            <h3 className="text-gray-900 dark:text-white font-semibold text-lg">Filter by Status</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {statuses.map((status) => (
                <button
                  key={status.value}
                  onClick={() => setSelectedStatus(status.value)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    selectedStatus === status.value
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;
