import React from 'react';

const ManagePropertiesSkeleton = () => {
  return (
    <div className="min-h-screen p-6 lg:p-8 space-y-8">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-10 w-1/3 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-5 w-1/2 bg-gray-600 rounded animate-pulse"></div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-3xl bg-gray-800 p-6 animate-pulse"
          >
            <div className="h-6 w-6 bg-gray-600 rounded mb-4"></div>
            <div className="h-4 w-2/3 bg-gray-600 rounded mb-2"></div>
            <div className="h-6 w-1/2 bg-gray-600 rounded"></div>
          </div>
        ))}
      </div>

      {/* Filters Skeleton */}
      <div className="h-12 w-full bg-gray-700 rounded animate-pulse"></div>

      {/* Table Skeleton */}
      <div className="overflow-x-auto">
        <div className="min-w-full divide-y divide-gray-700 rounded-lg bg-gray-800">
          <div className="grid grid-cols-6 gap-4 p-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-5 bg-gray-600 rounded animate-pulse"></div>
            ))}
          </div>
          {[...Array(5)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-6 gap-4 p-4 border-t border-gray-700"
            >
              {[...Array(6)].map((_, colIndex) => (
                <div
                  key={colIndex}
                  className="h-5 bg-gray-700 rounded animate-pulse"
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagePropertiesSkeleton;
