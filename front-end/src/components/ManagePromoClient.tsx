'use client';
import React, { useState, useEffect } from 'react';
import {
  FiTag,
  FiPercent,
  FiCalendar,
  FiPlus,
  FiEdit,
  FiTrash2,
} from 'react-icons/fi';
import { getAllPromos } from '@/helpers/getAllPromos';
import { Promo } from '@/types/promo';
import CreatePromoForm from './CreatePromoForm';

const ManagePromoClient = () => {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchPromos();
  }, []);

  const fetchPromos = async () => {
    try {
      const result = await getAllPromos();
      if (result.success) {
        console.log(result.data);
        setPromos(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching promos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePromoCreated = () => {
    setShowCreateForm(false);
    fetchPromos();
  };

  if (showCreateForm) {
    return (
      <CreatePromoForm
        onSuccess={handlePromoCreated}
        onCancel={() => setShowCreateForm(false)}
      />
    );
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
        <div className='container mx-auto px-4 py-8'>
          <div className='animate-pulse space-y-6'>
            <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3'></div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className='bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl p-6'
                >
                  <div className='h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4'></div>
                  <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2'></div>
                  <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded'></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatDateTime = (isoDate: string) => {
    console.log(isoDate);
    return new Date(isoDate).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4'>
          <div>
            <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-amber-500 bg-clip-text text-transparent mb-2'>
              Manage Promo Codes
            </h1>
            <p className='text-gray-600 dark:text-gray-400'>
              Create and manage promotional discount codes
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-2'
          >
            <FiPlus />
            Create Promo
          </button>
        </div>

        {/* Promos Grid */}
        {promos.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {promos.map((promo) => (
              <div
                key={promo.id}
                className='bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300'
              >
                {/* Promo Code */}
                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center gap-2'>
                    <FiTag className='text-blue-600' />
                    <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
                      {promo.code}
                    </h3>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      promo.validTo > new Date().toISOString()
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}
                  >
                    {promo.validTo > new Date().toISOString()
                      ? 'Active'
                      : 'Expired'}
                  </span>
                </div>

                {/* Discount */}
                <div className='flex items-center gap-2 mb-4'>
                  <FiPercent className='text-green-600' />
                  <span className='text-2xl font-bold text-green-600'>
                    {promo.discount}%
                  </span>
                  <span className='text-gray-600 dark:text-gray-400'>
                    discount
                  </span>
                </div>

                {/* Validity Period */}
                <div className='space-y-2 mb-6'>
                  <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                    <FiCalendar className='text-purple-600' />
                    <span>Valid from: {formatDateTime(promo.validFrom)}</span>
                  </div>
                  <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                    <FiCalendar className='text-amber-600' />
                    <span>Valid until: {formatDateTime(promo.validTo)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className='flex gap-2'>
                  <button className='flex-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2'>
                    <FiEdit size={16} />
                    Edit
                  </button>
                  <button className='flex-1 bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-700 dark:text-red-300 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2'>
                    <FiTrash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center py-16'>
            <div className='text-6xl mb-6'>🏷️</div>
            <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
              No Promo Codes Yet
            </h3>
            <p className='text-gray-600 dark:text-gray-400 mb-8'>
              Create your first promotional code to offer discounts to customers
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-2 mx-auto'
            >
              <FiPlus />
              Create First Promo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePromoClient;
