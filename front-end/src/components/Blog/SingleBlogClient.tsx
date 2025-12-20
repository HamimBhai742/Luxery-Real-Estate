'use client';
import React from 'react';
import {
  FiCalendar,
  FiClock,
  FiTag,
  FiArrowLeft,
  FiTwitter,
  FiFacebook,
  FiLinkedin,
} from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'timeago.js';

interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface SingleBlogClientProps {
  blog: Blog;
}

const SingleBlogClient: React.FC<SingleBlogClientProps> = ({ blog }) => {
  const blogUrl = `${window.location.origin}/blog/${blog.slug}`;
  const openSharePopup = (url:string) => {
    window.open(url, '_blank', 'width=600,height=500,scrollbars=yes');
  };

  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    blogUrl
  )}&text=${encodeURIComponent(blog.title)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    blogUrl
  )}&text=${encodeURIComponent(blog.title)}`;

  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    blogUrl
  )}&text=${encodeURIComponent(blog.title)}`;
  return (
    <div className='min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      <div className='container mx-auto px-4 py-20 max-w-4xl'>
        {/* Back Button */}
        <Link
          href='/blog'
          className='inline-flex items-center gap-2 mb-4 text-blue-600 dark:text-amber-600 hover:text-blue-800 dark:hover:text-amber-500 transition-colors group'
        >
          <FiArrowLeft className='group-hover:-translate-x-1 transition-transform' />
          Back to Blog
        </Link>

        {/* Hero Section */}
        <div className='bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/30 overflow-hidden mb-8'>
          {/* Featured Image */}
          <div className='relative h-64 md:h-80 lg:h-96 overflow-hidden'>
            <Image
              src={blog.image || '/placeholder-blog.jpg'}
              alt={blog.title}
              fill
              className='object-cover'
              priority
            />
            <div className='absolute inset-0 bg-linear-to-t from-black/50 to-transparent' />

            {/* Category Badge */}
            <div className='absolute top-6 left-6'>
              <span className='px-4 py-2 bg-blue-600/90 dark:bg-amber-600/90 text-white text-sm font-semibold rounded-full backdrop-blur-sm'>
                {blog.category}
              </span>
            </div>
          </div>

          {/* Content Header */}
          <div className='p-6 md:p-8'>
            <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight'>
              {blog.title}
            </h1>

            <p className='text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed'>
              {blog.excerpt}
            </p>

            {/* Meta Information */}
            <div className='flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6'>
              <div className='flex items-center gap-2'>
                <FiCalendar className='text-blue-500' />
                <span>{format(blog.createdAt)}</span>
              </div>
              <div className='flex items-center gap-2'>
                <FiClock className='text-green-500' />
                <span>
                  {Math.ceil(blog.content.split(' ').length / 200)} min read
                </span>
              </div>
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className='flex flex-wrap items-center gap-2'>
                <FiTag className='text-purple-500' />
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className='px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Article Content */}
        <article className='bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/30 p-6 md:p-8'>
          <div
            className='prose prose-lg dark:prose-invert max-w-none
              prose-headings:text-gray-900 dark:prose-headings:text-white
              prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
              prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 dark:prose-strong:text-white
              prose-code:text-purple-600 dark:prose-code:text-purple-400 prose-code:bg-purple-50 dark:prose-code:bg-purple-900/30 prose-code:px-2 prose-code:py-1 prose-code:rounded
              prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20 prose-blockquote:p-4 prose-blockquote:rounded-r-lg
              prose-ul:text-gray-700 dark:prose-ul:text-gray-300
              prose-ol:text-gray-700 dark:prose-ol:text-gray-300'
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>

        {/* Share Section */}
        <div className='mt-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/30 p-6'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
            Share this article
          </h3>
          <div className='flex flex-wrap gap-3'>
            <button className='px-4 py-2 bg-linear-to-r from-blue-500 to-blue-600 dark:from-amber-500 dark:to-amber-600 dark:hover:opacity-85 text-white rounded-lg transition-colors flex items-center gap-2'  onClick={() => openSharePopup(twitterShareUrl)}>
              <FiTwitter className='w-5 h-5' />
              <span>Share on Twitter</span>{' '}
            </button>
            <button
              className='px-4 py-2 bg-linear-to-r from-blue-500 to-blue-600 dark:from-amber-500 dark:to-amber-600 dark:hover:opacity-85 text-white rounded-lg transition-colors flex items-center gap-2'
              onClick={() => openSharePopup(fbShareUrl)}
            >
              <FiFacebook className='w-5 h-5' />
              <span>Share on Facebook</span>
            </button>
            <button className='px-4 py-2 bg-linear-to-r from-blue-500 to-blue-600 dark:from-amber-500 dark:to-amber-600 dark:hover:opacity-85 text-white rounded-lg transition-colors flex items-center gap-2'  onClick={() => openSharePopup(linkedinShareUrl)}>
              <FiLinkedin className='w-5 h-5' />
              <span>Share on LinkedIn</span>{' '}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogClient;
