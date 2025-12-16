'use client';
import React from 'react';

const BlogContentSkeleton: React.FC = () => {
  return (
    <div className='flex flex-col md:flex-row gap-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f172a] p-4 md:p-6 animate-pulse'>
      {/* Image Skeleton */}
      <div className='w-full md:w-[45%] h-56 md:h-64 rounded-xl bg-gray-200 dark:bg-gray-800' />

      {/* Content Skeleton */}
      <div className='flex-1 space-y-4'>
        {/* Date */}
        <div className='h-4 w-40 bg-gray-200 dark:bg-gray-800 rounded' />

        {/* Category */}
        <div className='h-4 w-28 bg-gray-200 dark:bg-gray-800 rounded' />

        {/* Title */}
        <div className='space-y-2'>
          <div className='h-7 w-full bg-gray-200 dark:bg-gray-800 rounded' />
          <div className='h-7 w-3/4 bg-gray-200 dark:bg-gray-800 rounded' />
        </div>

        {/* Excerpt */}
        <div className='space-y-2'>
          <div className='h-4 w-full bg-gray-200 dark:bg-gray-800 rounded' />
          <div className='h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded' />
          <div className='h-4 w-4/6 bg-gray-200 dark:bg-gray-800 rounded' />
        </div>

        {/* Tags */}
        <div className='flex flex-wrap gap-2 pt-2'>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className='h-7 w-20 rounded-full bg-gray-200 dark:bg-gray-800'
            />
          ))}
        </div>

        {/* Read more */}
        <div className='h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded mt-4' />
      </div>
    </div>
  );
};

export default BlogContentSkeleton;
