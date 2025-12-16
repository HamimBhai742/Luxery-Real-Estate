/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import { FiImage, FiSave, FiX, FiEye } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { createBlog } from '@/helpers/createBlog';

interface BlogFormData {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  image: File | null;
  status: 'draft' | 'published';
}

interface FormErrors {
  title?: string;
  content?: string;
  excerpt?: string;
  category?: string;
  image?: string;
}

const CreateBlogForm = () => {
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: [],
    image: null,
    status: 'draft',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const categories = [
    'Real Estate Tips',
    'Market Analysis',
    'Investment Guide',
    'Property News',
    'Luxury Homes',
    'Interior Design',
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 50) {
      newErrors.content = 'Content must be at least 50 characters';
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    } else if (formData.excerpt.length < 20) {
      newErrors.excerpt = 'Excerpt must be at least 20 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!formData.tags.includes(newTag)) {
        setFormData((prev) => ({ ...prev, tags: [...prev.tags, newTag] }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: 'Image size must be less than 5MB',
        }));
        return;
      }

      if (!file.type.startsWith('image/')) {
        setErrors((prev) => ({
          ...prev,
          image: 'Please select a valid image file',
        }));
        return;
      }

      setFormData((prev) => ({ ...prev, image: file }));
      setErrors((prev) => ({ ...prev, image: undefined }));

      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setImagePreview('');
  };

  const handleSubmit = async (
    e: React.FormEvent,
    status: 'draft' | 'published'
  ) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const submitData = { ...formData, status };
      console.log(submitData);
      const data = await createBlog(submitData);
      console.log(data);

      if (data.success) {
        toast.success(
          `Blog ${status === 'draft' ? 'saved' : 'published'}! successfully`
        );
      }
      if (!data.success) {
        toast.error(data.message);
      }
      // Reset form
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        category: '',
        tags: [],
        image: null,
        status: 'draft',
      });
      setImagePreview('');
      setTagInput('');
    } catch (error) {
      toast.error('Failed to save blog. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2'>
            Create New Blog Post
          </h1>
          <p className='text-gray-600 dark:text-gray-400'>
            Share your insights and expertise with our community
          </p>
        </div>

        {/* Form */}
        <form className='bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6 md:p-8'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/* Main Content - Left Side */}
            <div className='lg:col-span-2 space-y-6'>
              {/* Title */}
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  Blog Title *
                </label>
                <input
                  type='text'
                  name='title'
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder='Enter an engaging blog title...'
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.title
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                  } bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                />
                {errors.title && (
                  <p className='text-red-500 text-sm mt-1'>{errors.title}</p>
                )}
              </div>

              {/* Content */}
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  Content *
                </label>
                <textarea
                  name='content'
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={12}
                  placeholder='Write your blog content here...'
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.content
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                  } bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none`}
                />
                {errors.content && (
                  <p className='text-red-500 text-sm mt-1'>{errors.content}</p>
                )}
              </div>

              {/* Excerpt */}
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  Excerpt *
                </label>
                <textarea
                  name='excerpt'
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder='Brief description of your blog post...'
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.excerpt
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                  } bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none`}
                />
                {errors.excerpt && (
                  <p className='text-red-500 text-sm mt-1'>{errors.excerpt}</p>
                )}
              </div>
            </div>

            {/* Sidebar - Right Side */}
            <div className='space-y-6'>
              {/* Featured Image */}
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  Featured Image
                </label>

                {imagePreview ? (
                  <div className='relative'>
                    <Image
                      src={imagePreview}
                      alt='Preview'
                      width={200}
                      height={200}
                      className='w-full h-48 object-cover rounded-xl'
                    />
                    <button
                      type='button'
                      onClick={removeImage}
                      className='absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors'
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                ) : (
                  <label className='flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-blue-500 transition-colors bg-white/30 dark:bg-gray-700/30'>
                    <FiImage size={32} className='text-gray-400 mb-2' />
                    <span className='text-sm text-gray-500 dark:text-gray-400'>
                      Click to upload image
                    </span>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={handleImageChange}
                      className='hidden'
                    />
                  </label>
                )}

                {errors.image && (
                  <p className='text-red-500 text-sm mt-1'>{errors.image}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  Category *
                </label>
                <select
                  name='category'
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full select px-4 py-3 rounded-xl border ${
                    errors.category
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                  } bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-gray-900 dark:text-white`}
                >
                  <option value=''>Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className='text-red-500 text-sm mt-1'>{errors.category}</p>
                )}
              </div>

              {/* Tags */}
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  Tags
                </label>

                {/* Tag chips */}
                {formData.tags.length > 0 && (
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
                          <FiX size={14} />
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
                  className='w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
                />
                <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                  Press Enter to add tags
                </p>
              </div>

              {/* Action Buttons */}
              <div className='space-y-3 pt-4'>
                <button
                  type='button'
                  onClick={(e) => handleSubmit(e, 'published')}
                  disabled={isSubmitting}
                  className='w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                >
                  <FiEye size={18} />
                  {isSubmitting ? 'Publishing...' : 'Publish'}
                </button>

                <button
                  type='button'
                  onClick={(e) => handleSubmit(e, 'draft')}
                  disabled={isSubmitting}
                  className='w-full bg-gray-600 dark:bg-gray-700 text-white py-3 px-6 rounded-xl font-medium hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                >
                  <FiSave size={18} />
                  {isSubmitting ? 'Saving...' : 'Save Draft'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogForm;
