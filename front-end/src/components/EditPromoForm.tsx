'use client';
import React, { useState } from 'react';
import { FiSave, FiX } from 'react-icons/fi';
import {  PromoFormData } from '@/helpers/createPromo';
import { Promo } from '@/types/promo';
import toast from 'react-hot-toast';
import { updatePromo } from '@/helpers/updatePromo';

interface EditPromoFormProps {
  promo: Promo;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditPromoForm: React.FC<EditPromoFormProps> = ({ promo, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<PromoFormData>({
    code: promo.code,
    discount: promo.discount,
    validFrom: promo.validFrom.split('T')[0],
    validTo: promo.validTo.split('T')[0],
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await updatePromo(promo.id, formData);
      if (result.success) {
        toast.success('Promo updated successfully!');
        onSuccess();
      } else {
        toast.error(result.message || 'Failed to update promo');
      }
    } catch (error) {
      toast.error('An error occurred while updating promo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <div className='bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl p-8'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-3xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-amber-500 bg-clip-text text-transparent'>
                Edit Promo Code
              </h2>
              <button
                onClick={onCancel}
                className='p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors'
              >
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  Promo Code
                </label>
                <input
                  type='text'
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  Discount Percentage
                </label>
                <input
                  type='number'
                  min='1'
                  max='100'
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: parseInt(e.target.value) })}
                  className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                  required
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                    Valid From
                  </label>
                  <input
                    type='date'
                    value={formData.validFrom}
                    onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                    className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white'

                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                    Valid To
                  </label>
                  <input
                    type='date'
                    value={formData.validTo}
                    onChange={(e) => setFormData({ ...formData, validTo: e.target.value })}
                    className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white'

                  />
                </div>
              </div>

              <div className='flex gap-4 pt-4'>
                <button
                  type='submit'
                  disabled={loading}
                  className='flex-1 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2'
                >
                  <FiSave />
                  {loading ? 'Updating...' : 'Update Promo'}
                </button>
                <button
                  type='button'
                  onClick={onCancel}
                  className='flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-xl transition-all duration-300'
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPromoForm;
