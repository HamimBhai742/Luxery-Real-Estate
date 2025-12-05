'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaBed, FaBath, FaCheckCircle } from 'react-icons/fa';
import { FaBuildingColumns } from 'react-icons/fa6';
import {
  FiHome,
  FiMapPin,
  FiDollarSign,
  FiX,
  FiImage,
  FiUpload,
} from 'react-icons/fi';
import { ImSpinner9 } from 'react-icons/im';
import Image from 'next/image';

interface PropertyFormData {
  name: string;
  description: string;
  location: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  amenities: string[];
  images: File[];
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
    images: [],
    status: 'active',
  });
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
  });
  const [amenityInput, setAmenityInput] = useState('');
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        return !value
          ? 'Property name is required'
          : value.length < 3
          ? 'Name must be at least 3 characters'
          : '';
      case 'description':
        return !value
          ? 'Description is required'
          : value.length < 10
          ? 'Description must be at least 10 characters'
          : '';
      case 'location':
        return !value ? 'Location is required' : '';
      case 'price':
        return !value
          ? 'Price is required'
          : Number(value) <= 0
          ? 'Price must be greater than 0'
          : '';
      case 'bedrooms':
        return !value
          ? 'Bedrooms is required'
          : Number(value) < 0
          ? 'Bedrooms cannot be negative'
          : '';
      case 'bathrooms':
        return !value
          ? 'Bathrooms is required'
          : Number(value) < 0
          ? 'Bathrooms cannot be negative'
          : '';
      default:
        return '';
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.images.length > 10) {
      toast.error('Maximum 10 images allowed');
      return;
    }

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 5MB)`);
        return false;
      }
      return true;
    });

    setFormData({ ...formData, images: [...formData.images, ...validFiles] });

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: validateField('name', formData.name),
      description: validateField('description', formData.description),
      location: validateField('location', formData.location),
      price: validateField('price', formData.price),
      bedrooms: validateField('bedrooms', formData.bedrooms),
      bathrooms: validateField('bathrooms', formData.bathrooms),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== '')) {
      toast.error('Please fix all errors before submitting');
      return;
    }

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
      const formDatas = new FormData();
      formData.images.forEach((img) => formDatas.append('files', img));
      formDatas.append('data', JSON.stringify(payload));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/property/create-property`,
        {
          method: 'POST',
          credentials: 'include',
          body: formDatas,
        }
      );
      const data = await res.json();
      if (data.success) {
        setFormData({
          name: '',
          description: '',
          location: '',
          price: '',
          bedrooms: '',
          bathrooms: '',
          amenities: [],
          images: [],
          status: 'active',
        });
        setImagePreviews([]);
        setErrors({
          name: '',
          description: '',
          location: '',
          price: '',
          bedrooms: '',
          bathrooms: '',
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
    <div className='min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black p-6'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='backdrop-blur-xl bg-white/80 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-6 mb-6 shadow-lg dark:shadow-none'>
          <div className='flex items-center gap-4'>
            <div className='p-4 rounded-xl bg-linear-to-br from-blue-500 to-purple-500'>
              <FaBuildingColumns className='text-white text-2xl' />
            </div>
            <div>
              <h1 className='text-3xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent'>
                Create New Property
              </h1>
              <p className='text-gray-600 dark:text-gray-400 mt-1'>
                Add a luxury property to your portfolio
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className='backdrop-blur-xl bg-white/80 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-8 space-y-6 shadow-lg dark:shadow-none'
        >
          {/* Property Name */}
          <div className='group'>
            <label className=' text-gray-900 dark:text-white font-medium mb-3 flex items-center gap-2'>
              <FiHome className='text-blue-600 dark:text-blue-400' />
              Property Name
            </label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-4 bg-gray-50 dark:bg-white/5 border ${
                errors.name
                  ? 'border-red-500'
                  : 'border-gray-300 dark:border-white/10'
              } rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-white/10 focus:border-purple-500 dark:focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300`}
              placeholder='e.g., Luxury Penthouse Suite'
            />
            {errors.name && (
              <p className='mt-1 text-sm text-red-500'>{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div className='group'>
            <label className=' text-gray-900 dark:text-white font-medium mb-3'>
              Description
            </label>
            <textarea
              name='description'
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className={`w-full px-4 py-4 bg-gray-50 dark:bg-white/5 border ${
                errors.description
                  ? 'border-red-500'
                  : 'border-gray-300 dark:border-white/10'
              } rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-white/10 focus:border-purple-500 dark:focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none`}
              placeholder='Describe the property features, location highlights, and unique selling points...'
            />
            {errors.description && (
              <p className='mt-1 text-sm text-red-500'>{errors.description}</p>
            )}
          </div>

          {/* Location & Price Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='group'>
              <label className=' text-gray-900 dark:text-white font-medium mb-3 flex items-center gap-2'>
                <FiMapPin className='text-green-600 dark:text-green-400' />
                Location
              </label>
              <input
                type='text'
                name='location'
                value={formData.location}
                onChange={handleChange}
                className={`w-full px-4 py-4 bg-gray-50 dark:bg-white/5 border ${
                  errors.location
                    ? 'border-red-500'
                    : 'border-gray-300 dark:border-white/10'
                } rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-white/10 focus:border-purple-500 dark:focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300`}
                placeholder='e.g., Beverly Hills, CA'
              />
              {errors.location && (
                <p className='mt-1 text-sm text-red-500'>{errors.location}</p>
              )}
            </div>

            <div className='group'>
              <label className=' text-gray-900 dark:text-white font-medium mb-3 flex items-center gap-2'>
                <FiDollarSign className='text-yellow-600 dark:text-yellow-400' />
                Price
              </label>
              <input
                type='number'
                name='price'
                value={formData.price}
                onChange={handleChange}
                className={`w-full px-4 py-4 bg-gray-50 dark:bg-white/5 border ${
                  errors.price
                    ? 'border-red-500'
                    : 'border-gray-300 dark:border-white/10'
                } rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-white/10 focus:border-purple-500 dark:focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300`}
                placeholder='0'
              />
              {errors.price && (
                <p className='mt-1 text-sm text-red-500'>{errors.price}</p>
              )}
            </div>
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='group'>
              <label className=' text-gray-900 dark:text-white font-medium mb-3 flex items-center gap-2'>
                <FaBed className='text-purple-600 dark:text-purple-400' />
                Bedrooms
              </label>
              <input
                type='number'
                name='bedrooms'
                value={formData.bedrooms}
                onChange={handleChange}
                className={`w-full px-4 py-4 bg-gray-50 dark:bg-white/5 border ${
                  errors.bedrooms
                    ? 'border-red-500'
                    : 'border-gray-300 dark:border-white/10'
                } rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-white/10 focus:border-purple-500 dark:focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300`}
                placeholder='0'
              />
              {errors.bedrooms && (
                <p className='mt-1 text-sm text-red-500'>{errors.bedrooms}</p>
              )}
            </div>

            <div className='group'>
              <label className=' text-gray-900 dark:text-white font-medium mb-3 flex items-center gap-2'>
                <FaBath className='text-cyan-600 dark:text-cyan-400' />
                Bathrooms
              </label>
              <input
                type='number'
                name='bathrooms'
                value={formData.bathrooms}
                onChange={handleChange}
                className={`w-full px-4 py-4 bg-gray-50 dark:bg-white/5 border ${
                  errors.bathrooms
                    ? 'border-red-500'
                    : 'border-gray-300 dark:border-white/10'
                } rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-white/10 focus:border-purple-500 dark:focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300`}
                placeholder='0'
              />
              {errors.bathrooms && (
                <p className='mt-1 text-sm text-red-500'>{errors.bathrooms}</p>
              )}
            </div>
          </div>

          {/* Amenities */}
          <div className='group'>
            <label className=' text-gray-900 dark:text-white font-medium mb-3 flex items-center gap-2'>
              <FaCheckCircle className='text-green-600 dark:text-green-400' />
              Amenities
            </label>
            <div className='p-4 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl focus-within:bg-white dark:focus-within:bg-white/10 focus-within:border-purple-500 dark:focus-within:border-purple-500/50 focus-within:ring-2 focus-within:ring-purple-500/20 transition-all duration-300'>
              {formData.amenities.length > 0 && (
                <div className='flex flex-wrap gap-2 mb-3'>
                  {formData.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className='inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-purple-100 to-blue-100 dark:from-purple-500/20 dark:to-blue-500/20 border border-purple-300 dark:border-purple-500/30 rounded-lg text-gray-900 dark:text-white text-sm font-medium hover:from-purple-200 hover:to-blue-200 dark:hover:from-purple-500/30 dark:hover:to-blue-500/30 transition-all duration-300'
                    >
                      {amenity}
                      <button
                        type='button'
                        onClick={() => handleRemoveAmenity(index)}
                        className='hover:text-red-600 dark:hover:text-red-400 transition-colors'
                      >
                        <FiX className='w-4 h-4' />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <input
                type='text'
                value={amenityInput}
                onChange={(e) => setAmenityInput(e.target.value)}
                onKeyDown={handleAddAmenity}
                className='w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none'
                placeholder='Type amenity and press Enter (e.g., Pool, Gym, Parking)'
              />
            </div>
            <p className='text-gray-600 dark:text-gray-500 text-sm mt-2'>
              Press Enter to add each amenity
            </p>
          </div>

          {/* Property Images */}
          <div className='group'>
            <label className=' text-gray-900 dark:text-white font-medium mb-3 flex items-center gap-2'>
              <FiImage className='text-pink-600 dark:text-pink-400' />
              Property Images
            </label>

            {/* Upload Area */}
            <div className='relative'>
              <input
                type='file'
                multiple
                accept='image/*'
                onChange={handleImageChange}
                className='hidden'
                id='image-upload'
              />
              <label
                htmlFor='image-upload'
                className='flex flex-col items-center justify-center w-full p-8 bg-gray-50 dark:bg-white/5 border-2 border-dashed border-gray-300 dark:border-white/10 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 hover:border-purple-500 dark:hover:border-purple-500/50 transition-all duration-300'
              >
                <FiUpload className='text-4xl text-gray-400 dark:text-gray-500 mb-3' />
                <p className='text-gray-700 dark:text-gray-300 font-medium mb-1'>
                  Click to upload images
                </p>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  PNG, JPG up to 5MB (Max 10 images)
                </p>
              </label>
            </div>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className='mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                {imagePreviews.map((preview, index) => (
                  <div
                    key={index}
                    className='relative group/image rounded-xl overflow-hidden border-2 border-gray-200 dark:border-white/10 hover:border-purple-500 dark:hover:border-purple-500/50 transition-all'
                  >
                    <div className='aspect-square relative'>
                      <Image
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        fill
                        className='object-cover'
                      />
                    </div>
                    <button
                      type='button'
                      onClick={() => handleRemoveImage(index)}
                      className='absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover/image:opacity-100 transition-all duration-300 shadow-lg'
                    >
                      <FiX className='w-4 h-4' />
                    </button>
                    <div className='absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-2 opacity-0 group-hover/image:opacity-100 transition-opacity'>
                      <p className='text-white text-xs font-medium truncate'>
                        {formData.images[index]?.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p className='text-gray-600 dark:text-gray-500 text-sm mt-2'>
              {formData.images.length} / 10 images uploaded
            </p>
          </div>

          {/* Submit Button */}
          <div className='pt-4'>
            <button
              type='submit'
              disabled={loading}
              className='group relative w-full py-4 px-6 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl text-white font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
            >
              <span className='relative z-10 flex items-center justify-center gap-3'>
                {loading ? (
                  <>
                    <ImSpinner9 className='w-5 h-5 animate-spin' />
                    Creating Property...
                  </>
                ) : (
                  <>
                    <FaBuildingColumns className='w-5 h-5' />
                    Create Property
                  </>
                )}
              </span>
              <div className='absolute inset-0 bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePropertyForm;
