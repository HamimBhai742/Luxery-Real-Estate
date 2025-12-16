'use client';
import React, { useState, useEffect } from 'react';
import { FiSearch, FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';
import { getAllBlogs } from '@/helpers/getAllBlogs';
import Image from 'next/image';
import { format } from 'timeago.js';
import toast from 'react-hot-toast';
import BlogContenSkeleton from './BlogContenSkeleton';

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

const BlogClient = () => {
  const [blogs, setBlogs] = useState<Blog[]>();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'Real Estate Tips',
    'Market Analysis',
    'Investment Guide',
    'Property News',
    'Luxury Homes',
    'Interior Design',
  ];
  useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await getAllBlogs(searchTerm, selectedCategory, 1, 10);
        console.log(data);
        if (data.success) {
          setLoading(false);
          setBlogs(data.data);
        }
        if (!data.success) {
          setLoading(false);
          toast.error(data.message);
        }
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [searchTerm, selectedCategory]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className='min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      {/* Hero Section */}
      <div className='relative pt-20 px-4'>
        <div className='container mx-auto text-center'>
          <h1 className='text-3xl md:text-6xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6'>
            Real Estate Insights
          </h1>
          <p className='text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8'>
            Stay informed with the latest trends, tips, and insights from the
            luxury real estate market
          </p>

          {/* Search and Filter */}
          <div className='max-w-4xl mx-auto bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='md:col-span-2 relative'>
                <FiSearch className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' />
                <input
                  type='text'
                  placeholder='Search articles, topics, or tags...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-full pl-12 pr-4 py-2 md:py-4 rounded-lg md:rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className='px-4 select h-10 md:h-14 rounded-lg md:rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white'
              >
                <option value='all'>All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className='container mx-auto px-4 md:py-16 py-10'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-8'>
          Latest Articles
        </h2>
        {loading ? (
          <BlogContenSkeleton />
        ) : blogs && blogs.length > 0 ? (
          <>
            <div className='grid grid-cols-1 gap-8'>
              {blogs.map((blog) => (
                <article key={blog.id}>
                  <div className='bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 overflow-hidden hover:shadow-3xl transition-all duration-500 group'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-0'>
                      <div className='relative h-64 lg:h-auto'>
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          fill
                          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                        />
                        {/* <div className='absolute top-6 left-6'>
                          <span className='px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full'>
                            Featured
                          </span>
                        </div> */}
                      </div>
                      <div className='p-8 lg:px-12 flex flex-col justify-center'>
                        <div className='flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4'>
                          <div className='flex items-center gap-2'>
                            <FiCalendar size={16} />
                            <span>{formatDate(blog.createdAt)}</span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <FiClock size={16} />
                            <span>{format(blog.updatedAt)}</span>
                          </div>
                        </div>

                        <span className='text-blue-600 dark:text-blue-400 text-sm font-medium mb-3'>
                          {blog.category}
                        </span>

                        <h3 className='text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight'>
                          {blog.title}
                        </h3>

                        <p className='text-gray-600 dark:text-gray-400 mb-6 leading-relaxed'>
                          {blog.excerpt}
                        </p>

                        <div className='flex flex-wrap gap-2 mb-6'>
                          {blog.tags.slice(0, 4).map((tag, index) => (
                            <span
                              key={index}
                              className='px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full'
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <Link
                          href={`/blog/${blog.slug}`}
                          className='inline-flex text-sm items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:gap-3 transition-all duration-300'
                        >
                          Read more
                          <FiArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className='text-center py-16'>
            <div className='text-gray-400 dark:text-gray-600 text-6xl mb-6'>
              📝
            </div>
            <h3 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
              No articles found
            </h3>
            <p className='text-gray-600 dark:text-gray-400 mb-8'>
              Try adjusting your search terms or browse all categories
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className='bg-linear-to-r from-blue-600 to-purple-600 text-white py-3 px-8 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300'
            >
              View All Articles
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogClient;
