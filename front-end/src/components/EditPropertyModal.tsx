'use client';

import { updateProperty } from '@/helpers/updateProperty';
import { Property } from '@/types/property';
import { SaveIcon } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FiX } from 'react-icons/fi';
import { ImSpinner9 } from 'react-icons/im';

interface EditPropertyModalProps {
  property: Property;
  onClose: () => void;
}

const EditPropertyModal: React.FC<EditPropertyModalProps> = ({
  property,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: property.name,
    location: property.location,
    price: Number(property.price),
    bedrooms: Number(property.bedrooms),
    bathrooms: Number(property.bathrooms),
    status: property.status,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await updateProperty(property.id, formData);
      if (data.success) {
        toast.success(data.message);
        window.location.reload();
      }
      if (!data.success) {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error updating property:', error);
      toast.error('An error occurred while updating the property.');
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn'>
      <div className='relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl animate-scaleIn'>
        {/* Header */}
        <div className='sticky top-0 flex items-center justify-between p-6 border-b border-white/10 bg-white/5 backdrop-blur-xl'>
          <h2 className='text-2xl font-bold text-white'>Edit Property</h2>
          <button
            onClick={onClose}
            className='p-2 rounded-xl bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all'
          >
            <FiX className='w-6 h-6' />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='p-6 space-y-6'>
          <div>
            <label className='block text-white/80 text-sm font-semibold mb-2'>
              Property Name
            </label>
            <input
              type='text'
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 transition-all'
              required
            />
          </div>

          <div>
            <label className='block text-white/80 text-sm font-semibold mb-2'>
              Location
            </label>
            <input
              type='text'
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 transition-all'
              required
            />
          </div>

          <div>
            <label className='block text-white/80 text-sm font-semibold mb-2'>
              Price
            </label>
            <input
              type='text'
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: Number(e.target.value) })
              }
              className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 transition-all'
              required
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-white/80 text-sm font-semibold mb-2'>
                Bedrooms
              </label>
              <input
                type='number'
                value={formData.bedrooms}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bedrooms: parseInt(e.target.value),
                  })
                }
                className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 transition-all'
                required
              />
            </div>
            <div>
              <label className='block text-white/80 text-sm font-semibold mb-2'>
                Bathrooms
              </label>
              <input
                type='number'
                value={formData.bathrooms}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bathrooms: parseInt(e.target.value),
                  })
                }
                className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 transition-all'
                required
              />
            </div>
          </div>

          <div>
            <label className='block text-white/80 text-sm font-semibold mb-2'>
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as
                    | 'available'
                    | 'unavailable'
                    | 'booked'
                    | 'sold',
                })
              }
              className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 transition-all'
            >
              <option value='available' className='bg-gray-900'>
                Available
              </option>
              <option value='unavailable' className='bg-gray-900'>
                Unavailable
              </option>
              <option value='booked' className='bg-gray-900'>
                Booked
              </option>
              <option value='sold' className='bg-gray-900'>
                Sold
              </option>
            </select>
          </div>

          {/* Actions */}
          <div className='flex gap-4 pt-4'>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 py-3 px-6 rounded-xl bg-white/5 text-white/80 hover:bg-white/10 transition-all duration-300 font-semibold'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={loading}
              className='flex-1 py-3 px-6 rounded-xl bg-linear-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 font-semibold'
            >
              {loading ? (
                <span className='flex items-center gap-2'>
                  <ImSpinner9 className='animate-spin' />
                  <span> Changing....</span>
                </span>
              ) : (
                <span className='flex items-center gap-2'>
                  <SaveIcon />
                  <span> Save Changes</span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPropertyModal;
