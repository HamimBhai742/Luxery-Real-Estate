'use client';

import React, { useState } from 'react';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';

const PropertyFilters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const statuses = ['all', 'available', 'sold', 'pending'];

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1 relative group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5 group-focus-within:text-blue-400 transition-colors" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search properties by name, location..."
            className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-white/30 focus:bg-white/10 focus:border-blue-500/50 focus:outline-none transition-all duration-300"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 flex items-center gap-2 justify-center lg:justify-start"
        >
          <FiFilter className="w-5 h-5" />
          <span>Filters</span>
        </button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 animate-slideDown">
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Status</h3>
            <div className="flex flex-wrap gap-3">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-6 py-2 rounded-xl font-medium capitalize transition-all duration-300 ${
                    selectedStatus === status
                      ? 'bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {status}
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
