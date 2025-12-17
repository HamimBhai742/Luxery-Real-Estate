'use client';
import React, { useState, useEffect } from 'react';
import {
  FiEdit3,
  FiTrash2,
  FiSearch,
  FiFilter,
  FiPlus,
  FiCalendar,
  FiUser,
  FiTag,
  FiClock,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { getMyBlogs } from '@/helpers/getMyBlogs';
import Image from 'next/image';
import { format } from 'timeago.js';

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  image: string;
  status: 'draft' | 'published';
  author: string;
  createdAt: string;
  updatedAt: string;
  views: number;
}

interface EditModalProps {
  blog: Blog | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (blog: Blog) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  blog,
  isOpen,
  onClose,
  onUpdate,
}) => {
  const [formData, setFormData] = useState<Partial<Blog>>({});
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (blog) {
      setFormData(blog);
    }
  }, [blog]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.content && formData.excerpt) {
      onUpdate(formData as Blog);
      onClose();
    }
  };

  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!formData.tags?.includes(newTag)) {
        setFormData((prev) => ({
          ...prev,
          tags: [...(prev.tags || []), newTag],
        }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((tag) => tag !== tagToRemove) || [],
    }));
  };

  if (!isOpen || !blog) return null;

  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
      <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
        <div className='p-6 border-b border-gray-200 dark:border-gray-700'>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
            Edit Blog Post
          </h2>
        </div>

        <form onSubmit={handleSubmit} className='p-6 space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Title
            </label>
            <input
              type='text'
              value={formData.title || ''}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className='w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Excerpt
            </label>
            <textarea
              value={formData.excerpt || ''}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
              }
              rows={3}
              className='w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Content
            </label>
            <textarea
              value={formData.content || ''}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              rows={8}
              className='w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
              required
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Category
              </label>
              <select
                value={formData.category || ''}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                className='w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                <option value='Real Estate Tips'>Real Estate Tips</option>
                <option value='Market Analysis'>Market Analysis</option>
                <option value='Investment Guide'>Investment Guide</option>
                <option value='Property News'>Property News</option>
                <option value='Luxury Homes'>Luxury Homes</option>
                <option value='Interior Design'>Interior Design</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Status
              </label>
              <select
                value={formData.status || 'draft'}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: e.target.value as 'draft' | 'published',
                  }))
                }
                className='w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                <option value='draft'>Draft</option>
                <option value='published'>Published</option>
              </select>
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Tags
            </label>
            {formData.tags && formData.tags.length > 0 && (
              <div className='flex flex-wrap gap-2 mb-3'>
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className='inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full'
                  >
                    {tag}
                    <button
                      type='button'
                      onClick={() => removeTag(tag)}
                      className='hover:text-blue-600 dark:hover:text-blue-400'
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            <input
              type='text'
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleTagKeyPress}
              placeholder='Type tag and press Enter'
              className='w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>

          <div className='flex gap-3 pt-4'>
            <button
              type='submit'
              className='flex-1 bg-linear-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300'
            >
              Update Blog
            </button>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 bg-gray-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-gray-700 transition-all duration-300'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ManageBlog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'draft' | 'published'
  >('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Filter blogs
  useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await getMyBlogs(
          searchTerm,
          categoryFilter,
          statusFilter,
          1,
          100
        );
        console.log(data);

        if (data.success) {
          setBlogs(data?.data);
          setLoading(false);
        }
      };
      fetchData();
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  }, [searchTerm, statusFilter, categoryFilter]);

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setIsEditModalOpen(true);
  };

  const handleUpdate = (updatedBlog: Blog) => {
    setBlogs((prev) =>
      prev.map((blog) =>
        blog.id === updatedBlog.id
          ? {
              ...updatedBlog,
              updatedAt: new Date().toISOString().split('T')[0],
            }
          : blog
      )
    );
    toast.success('Blog updated successfully!');
  };

  const handleDelete = async (blog: Blog) => {
    const result = await Swal.fire({
      title: 'Delete Blog Post?',
      text: `Are you sure you want to delete "${blog.title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      setBlogs((prev) => prev.filter((b) => b.id !== blog.id));
      toast.success('Blog deleted successfully!');
    }
  };

  const categories = [
    'Real Estate Tips',
    'Market Analysis',
    'Investment Guide',
    'Property News',
    'Luxury Homes',
    'Interior Design',
  ];

  if (loading) {
    return (
      <div className='min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4'>
        <div className='max-w-7xl mx-auto'>
          <div className='animate-pulse space-y-6'>
            <div className='h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4'></div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className='bg-gray-300 dark:bg-gray-700 rounded-2xl h-80'
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className='min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2'>
            Manage Blog Posts
          </h1>
          <p className='text-gray-600 dark:text-gray-400'>
            Create, edit, and manage your blog content
          </p>
        </div>

        {/* Filters */}
        <div className='bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6 mb-8'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <div className='relative'>
              <FiSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
              <input
                type='text'
                placeholder='Search blogs...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white'
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as 'all' | 'draft' | 'published')
              }
              className='px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white'
            >
              <option value='all'>All Status</option>
              <option value='draft'>Draft</option>
              <option value='published'>Published</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className='px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white'
            >
              <option value='all'>All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <button className='bg-linear-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2'>
              <FiPlus size={18} />
              New Blog
            </button>
          </div>
        </div>

        {/* Blog Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className='bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 overflow-hidden hover:shadow-2xl transition-all duration-300 group'
            >
              <div className='relative'>
                <Image
                  src={blog.image}
                  alt={blog.title}
                  height={200}
                  width={400}
                  className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
                />
                <div className='absolute top-4 left-4'>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      blog.status === 'published'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                    }`}
                  >
                    {blog.status}
                  </span>
                </div>
              </div>

              <div className='p-6'>
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

                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2'>
                  {blog.title}
                </h3>

                <p className='text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3'>
                  {blog.excerpt}
                </p>

                <div className='flex items-center gap-2 mb-4'>
                  <FiTag size={14} className='text-gray-400' />
                  <span className='text-sm text-blue-600 dark:text-blue-400'>
                    {blog.category}
                  </span>
                </div>

                <div className='flex flex-wrap gap-1 mb-4'>
                  {blog.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className='px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md'
                    >
                      {tag}
                    </span>
                  ))}
                  {blog.tags.length > 3 && (
                    <span className='px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md'>
                      +{blog.tags.length - 3}
                    </span>
                  )}
                </div>

                <div className='flex gap-2'>
                  <button
                    onClick={() => handleEdit(blog)}
                    className='flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2'
                  >
                    <FiEdit3 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog)}
                    className='flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2'
                  >
                    <FiTrash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {blogs.length === 0 && (
          <div className='text-center py-12'>
            <div className='text-gray-400 dark:text-gray-600 text-6xl mb-4'>
              📝
            </div>
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
              No blogs found
            </h3>
            <p className='text-gray-600 dark:text-gray-400'>
              Try adjusting your search or filters
            </p>
          </div>
        )}

        {/* Edit Modal */}
        <EditModal
          blog={editingBlog}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingBlog(null);
          }}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
};

export default ManageBlog;
