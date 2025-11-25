'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaBuildingColumns } from 'react-icons/fa6';

import {
  FiHome,
  FiMapPin,
  FiDollarSign,
  FiDroplet,
  FiCheck,
  FiX,
} from 'react-icons/fi';
import { ImSpinner9 } from 'react-icons/im';

interface PropertyFormData {
  name: string;
  description: string;
  location: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  amenities: string[];
  status: string;
}

const CreatePropertyForm = () => {
  const [formData, setFormData] = useState<PropertyFormData>({
    name: '',
    description: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    amenities: [],
    status: 'active',
  });
  const [amenityInput, setAmenityInput] = useState('');
  const [loading, setLoading] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddAmenity = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && amenityInput.trim()) {
      e.preventDefault();
      setFormData({
        ...formData,
        amenities: [...formData.amenities, amenityInput.trim()],
      });
      setAmenityInput('');
    }
  };

  const handleRemoveAmenity = (index: number) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { bathrooms, price, bedrooms, ...rest } = formData;
    const payload = {
      ...rest,
      bathrooms: Number(bathrooms),
      bedrooms: Number(bedrooms),
      price: Number(price),
      status: 'active',
    };
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/property/create-property`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.success) {
        setFormData({
          name: '',
          description: '',
          location: '',
          price: '',
          bedrooms: '',
          bathrooms: '',
          amenities: [],
          status: 'active',
        });
        setLoading(false);
        toast.success('Property created successfully');
      }

      if (!data.success) {
        toast.error(data.message || 'Failed to create property');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to create property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {/* Property Name */}
      <div className='group'>
        <label className='block text-white/80 text-sm font-medium mb-2'>
          Property Name
        </label>
        <div className='relative'>
          <FiHome className='absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5' />
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/30 focus:bg-white/10 focus:border-blue-500/50 focus:outline-none transition-all duration-300'
            placeholder='Enter property name'
            required
          />
        </div>
      </div>

      {/* Description */}
      <div className='group'>
        <label className='block text-white/80 text-sm font-medium mb-2'>
          Description
        </label>
        <textarea
          name='description'
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className='w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/30 focus:bg-white/10 focus:border-blue-500/50 focus:outline-none transition-all duration-300 resize-none'
          placeholder='Describe the property...'
          required
        />
      </div>

      {/* Location */}
      <div className='group'>
        <label className='block text-white/80 text-sm font-medium mb-2'>
          Location
        </label>
        <div className='relative'>
          <FiMapPin className='absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5' />
          <input
            type='text'
            name='location'
            value={formData.location}
            onChange={handleChange}
            className='w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/30 focus:bg-white/10 focus:border-blue-500/50 focus:outline-none transition-all duration-300'
            placeholder='Enter location'
            required
          />
        </div>
      </div>

      {/* Price */}
      <div className='group'>
        <label className='block text-white/80 text-sm font-medium mb-2'>
          Price
        </label>
        <div className='relative'>
          <FiDollarSign className='absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5' />
          <input
            type='number'
            name='price'
            value={formData.price}
            onChange={handleChange}
            className='w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/30 focus:bg-white/10 focus:border-blue-500/50 focus:outline-none transition-all duration-300'
            placeholder='Enter price'
            required
          />
        </div>
      </div>

      {/* Bedrooms & Bathrooms */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='group'>
          <label className='block text-white/80 text-sm font-medium mb-2'>
            Bedrooms
          </label>
          <div className='relative'>
            <svg
              className='absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
              />
            </svg>

            <input
              type='number'
              name='bedrooms'
              value={formData.bedrooms}
              onChange={handleChange}
              className='w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/30 focus:bg-white/10 focus:border-blue-500/50 focus:outline-none transition-all duration-300'
              placeholder='0'
              required
            />
          </div>
        </div>

        <div className='group'>
          <label className='block text-white/80 text-sm font-medium mb-2'>
            Bathrooms
          </label>
          <div className='relative'>
            <FiDroplet className='absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5' />
            <input
              type='number'
              name='bathrooms'
              value={formData.bathrooms}
              onChange={handleChange}
              className='w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/30 focus:bg-white/10 focus:border-blue-500/50 focus:outline-none transition-all duration-300'
              placeholder='0'
              required
            />
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className='group'>
        <label className='block text-white/80 text-sm font-medium mb-2'>
          Amenities
        </label>
        <div className='w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus-within:bg-white/10 focus-within:border-blue-500/50 transition-all duration-300'>
          <div className='flex flex-wrap gap-2 mb-2'>
            {formData.amenities.map((amenity, index) => (
              <span
                key={index}
                className='inline-flex items-center gap-1 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-white text-sm'
              >
                {amenity}
                <button
                  type='button'
                  onClick={() => handleRemoveAmenity(index)}
                  className='hover:text-red-400 transition-colors'
                >
                  <FiX className='w-4 h-4' />
                </button>
              </span>
            ))}
          </div>
          <input
            type='text'
            value={amenityInput}
            onChange={(e) => setAmenityInput(e.target.value)}
            onKeyDown={handleAddAmenity}
            className='w-full bg-transparent text-white placeholder-white/30 focus:outline-none'
            placeholder='Type amenity and press Enter'
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type='submit'
        className='group relative w-full py-4 px-6 bg-linear-to-r from-blue-500 to-purple-600 rounded-2xl text-white font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-[1.02]'
      >
        <div>
          {loading ? (
            <span className='relative z-10 flex items-center justify-center gap-2'>
              <ImSpinner9 className='w-5 h-5 animate-spin' />
              Creating Property...
            </span>
          ) : (
            <span className='relative z-10 flex items-center justify-center gap-2'>
              <FaBuildingColumns className='w-5 h-5' />
              Create Property
            </span>
          )}
        </div>
        <div className='absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
      </button>
    </form>
  );
};

export default CreatePropertyForm;
