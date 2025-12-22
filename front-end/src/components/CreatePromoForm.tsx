'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FiTag, FiPercent, FiCalendar, FiSave, FiArrowLeft } from 'react-icons/fi';
import { ImSpinner9 } from 'react-icons/im';
import { createPromo, PromoFormData } from '@/helpers/createPromo';

interface CreatePromoFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CreatePromoForm = ({ onSuccess, onCancel }: CreatePromoFormProps) => {
  const [formData, setFormData] = useState<PromoFormData>({
    code: '',
    discount: 0,
    fromValid: '',
    toValid: '',
  });
  
  const [errors, setErrors] = useState({
    code: '',
    discount: '',
    fromValid: '',
    toValid: '',
  });
  
  const [loading, setLoading] = useState(false);

  const validateField = (name: string, value: string | number) => {
    switch (name) {
      case 'code':
        return !value
          ? 'Promo code is required'
          : typeof value === 'string' && value.length < 3
          ? 'Code must be at least 3 characters'
          : '';
      case 'discount':
        return !value
          ? 'Discount is required'
          : Number(value) <= 0
          ? 'Discount must be greater than 0'
          : Number(value) > 100
          ? 'Discount cannot exceed 100%'
          : '';
      case 'fromValid':
        return !value ? 'Start date is required' : '';
      case 'toValid':
        return !value
          ? 'End date is required'
          : formData.fromValid && new Date(value) <= new Date(formData.fromValid)
          ? 'End date must be after start date'
          : '';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const processedValue = name === 'discount' ? Number(value) : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue,
    }));

    const error = validateField(name, processedValue);
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      code: validateField('code', formData.code),
      discount: validateField('discount', formData.discount),
      fromValid: validateField('fromValid', formData.fromValid),
      toValid: validateField('toValid', formData.toValid),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix all errors before submitting');
      return;
    }

    setLoading(true);
    try {
      const result = await createPromo(formData);
      
      if (result.success) {
        toast.success('Promo code created successfully!');
        onSuccess?.();
      } else {
        toast.error(result.message || 'Failed to create promo code');
      }
    } catch (error) {
      console.error('Error creating promo:', error);
      toast.error('An error occurred while creating the promo code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            {onCancel && (
              <button
                onClick={onCancel}
                className="p-2 rounded-lg bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300"
              >
                <FiArrowLeft className="text-gray-600 dark:text-gray-400" />
              </button>
            )}
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-amber-500 bg-clip-text text-transparent mb-2">
                Create Promo Code
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Create promotional codes to offer discounts to your customers
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Promo Code */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <FiTag className="text-blue-600" />
                  Promo Code
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  placeholder="Enter promo code (e.g., SAVE20)"
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.code
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                  } bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300`}
                />
                {errors.code && (
                  <p className="text-red-500 text-sm mt-1">{errors.code}</p>
                )}
              </div>

              {/* Discount */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <FiPercent className="text-green-600" />
                  Discount Percentage
                </label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount || ''}
                  onChange={handleInputChange}
                  placeholder="Enter discount percentage (1-100)"
                  min="1"
                  max="100"
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.discount
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                  } bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300`}
                />
                {errors.discount && (
                  <p className="text-red-500 text-sm mt-1">{errors.discount}</p>
                )}
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* From Valid */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FiCalendar className="text-purple-600" />
                    Valid From
                  </label>
                  <input
                    type="datetime-local"
                    name="fromValid"
                    value={formData.fromValid}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.fromValid
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                    } bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300`}
                  />
                  {errors.fromValid && (
                    <p className="text-red-500 text-sm mt-1">{errors.fromValid}</p>
                  )}
                </div>

                {/* To Valid */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FiCalendar className="text-amber-600" />
                    Valid Until
                  </label>
                  <input
                    type="datetime-local"
                    name="toValid"
                    value={formData.toValid}
                    onChange={handleInputChange}
                    min={formData.fromValid}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.toValid
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                    } bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300`}
                  />
                  {errors.toValid && (
                    <p className="text-red-500 text-sm mt-1">{errors.toValid}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <ImSpinner9 className="animate-spin" />
                      Creating Promo...
                    </>
                  ) : (
                    <>
                      <FiSave />
                      Create Promo Code
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePromoForm;
