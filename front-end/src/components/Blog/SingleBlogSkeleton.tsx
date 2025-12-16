'use client';
import React from 'react';

const SingleBlogSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button Skeleton */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
          <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
        </div>

        {/* Hero Section Skeleton */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/30 overflow-hidden mb-8">
          {/* Featured Image Skeleton */}
          <div className="relative h-64 md:h-80 lg:h-96 bg-gray-300 dark:bg-gray-600 animate-pulse">
            {/* Category Badge Skeleton */}
            <div className="absolute top-6 left-6">
              <div className="w-20 h-8 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Content Header Skeleton */}
          <div className="p-6 md:p-8">
            {/* Title Skeleton */}
            <div className="space-y-3 mb-4">
              <div className="w-full h-8 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
              <div className="w-3/4 h-8 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
            </div>
            
            {/* Excerpt Skeleton */}
            <div className="space-y-2 mb-6">
              <div className="w-full h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="w-5/6 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="w-4/5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>

            {/* Meta Information Skeleton */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
                <div className="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
                <div className="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
              </div>
            </div>

            {/* Tags Skeleton */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
              <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
              <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
              <div className="w-14 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Article Content Skeleton */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/30 p-6 md:p-8">
          <div className="space-y-6">
            {/* Paragraph Skeletons */}
            <div className="space-y-3">
              <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="w-4/5 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
            
            <div className="space-y-3">
              <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="w-5/6 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>

            {/* Heading Skeleton */}
            <div className="w-2/3 h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mt-8" />
            
            <div className="space-y-3">
              <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="w-2/3 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>

            <div className="space-y-3">
              <div className="w-4/5 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="w-5/6 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Share Section Skeleton */}
        <div className="mt-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/30 p-6">
          <div className="w-32 h-5 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-4" />
          <div className="flex flex-wrap gap-3">
            <div className="w-32 h-10 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
            <div className="w-36 h-10 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
            <div className="w-34 h-10 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogSkeleton;
