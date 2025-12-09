'use client';

import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiHome, FiMapPin } from 'react-icons/fi';
import EditPropertyModal from './EditPropertyModal';
import Swal from 'sweetalert2';
import Image from 'next/image';
import { Property } from '@/types/property';
import { deleteProperty } from '@/helpers/deleteProperty';

const PropertyTable = ({ properties }: { properties: Property[] }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = (property: Property) => {
    setSelectedProperty(property);
    setShowEditModal(true);
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this property!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8b5cf6',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete it!',
      background: document.documentElement.classList.contains('dark')
        ? '#1f2937'
        : '#ffffff',
      color: document.documentElement.classList.contains('dark')
        ? '#ffffff'
        : '#000000',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const data = await deleteProperty(id);
          if (data.success) {
            Swal.fire({
              title: 'Deleted!',
              text: data.message,
              icon: 'success',
              background: document.documentElement.classList.contains('dark')
                ? '#1f2937'
                : '#ffffff',
              color: document.documentElement.classList.contains('dark')
                ? '#ffffff'
                : '#000000',
            });
            window.location.reload();
          } else {
            Swal.fire({
              title: 'Error!',
              text: data.message,
              icon: 'error',
              background: document.documentElement.classList.contains('dark')
                ? '#1f2937'
                : '#ffffff',
              color: document.documentElement.classList.contains('dark')
                ? '#ffffff'
                : '#000000',
            });
          }
        } catch (error) {
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while deleting the property.',
            icon: 'error',
            background: document.documentElement.classList.contains('dark')
              ? '#1f2937'
              : '#ffffff',
            color: document.documentElement.classList.contains('dark')
              ? '#ffffff'
              : '#000000',
          });
          console.error('Error deleting property:', error);
        }
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/30';
      case 'unavailable':
        return 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/30';
      case 'sold':
        return 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/30';
      case 'booked':
        return 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/30';
      default:
        return 'bg-gray-100 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-500/30';
    }
  };

  if (!properties || properties.length === 0) {
    return (
      <div className='text-center py-12'>
        <FiHome className='w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4' />
        <p className='text-gray-600 dark:text-gray-400 text-lg'>
          No properties found
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table View */}
      <div className='hidden lg:block overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-gray-200 dark:border-white/10'>
              <th className='text-left py-4 px-4 text-gray-600 dark:text-gray-400 font-semibold text-sm'>
                Property
              </th>
              <th className='text-left py-4 px-4 text-gray-600 dark:text-gray-400 font-semibold text-sm'>
                Location
              </th>
              <th className='text-left py-4 px-4 text-gray-600 dark:text-gray-400 font-semibold text-sm'>
                Price
              </th>
              <th className='text-left py-4 px-4 text-gray-600 dark:text-gray-400 font-semibold text-sm'>
                Beds/Baths
              </th>
              <th className='text-left py-4 px-4 text-gray-600 dark:text-gray-400 font-semibold text-sm'>
                Status
              </th>
              <th className='text-right py-4 px-4 text-gray-600 dark:text-gray-400 font-semibold text-sm'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr
                key={property.id}
                className='border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300 group'
              >
                <td className='py-4 px-4'>
                  <div className='flex items-center gap-3'>
                    <div className='w-14 h-14 rounded-xl bg-linear-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center'>
                      <Image
                        src={property.images[0] || ''}
                        alt='property'
                        width={50}
                        height={50}
                        className='w-full h-full object-cover rounded-xl'
                      />
                    </div>
                    <div>
                      <p className='text-gray-900 dark:text-white font-semibold'>
                        {property.name}
                      </p>
                    </div>
                  </div>
                </td>
                <td className='py-4 px-4'>
                  <div className='flex items-center gap-2 text-gray-700 dark:text-gray-300'>
                    <FiMapPin className='w-4 h-4 text-purple-600 dark:text-purple-400' />
                    {property.location}
                  </div>
                </td>
                <td className='py-4 px-4 text-gray-900 dark:text-white font-semibold'>
                  ${property.price.toLocaleString()}
                </td>
                <td className='py-4 px-4 text-gray-700 dark:text-gray-300'>
                  {property.bedrooms} / {property.bathrooms}
                </td>
                <td className='py-4 px-4'>
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-semibold border capitalize ${getStatusColor(
                      property.status
                    )}`}
                  >
                    {property.status}
                  </span>
                </td>
                <td className='py-4 px-4'>
                  <div className='flex items-center justify-end gap-2'>
                    <button
                      onClick={() => handleEdit(property)}
                      disabled={property.status === 'sold'}
                      className='p-2 rounded-lg bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-500/20 transition-all duration-300 hover:scale-110'
                      title='Edit'
                    >
                      <FiEdit2 className='w-4 h-4' />
                    </button>
                    <button
                      onClick={() => handleDelete(property.id)}
                      className='p-2 rounded-lg bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-500/20 transition-all duration-300 hover:scale-110'
                      title='Delete'
                    >
                      <FiTrash2 className='w-4 h-4' />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className='lg:hidden space-y-4'>
        {properties.map((property) => (
          <div
            key={property.id}
            className='backdrop-blur-xl bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 p-5 hover:bg-white dark:hover:bg-white/10 transition-all duration-300 shadow dark:shadow-none'
          >
            <div className='space-y-4'>
              <div className='flex items-start justify-between'>
                <div className='flex items-center gap-3 flex-1'>
                  <div className='w-12 h-12 rounded-lg bg-linear-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0'>
                    <FiHome className='w-6 h-6 text-blue-600 dark:text-blue-400' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-gray-900 dark:text-white font-semibold truncate'>
                      {property.name}
                    </p>
                    <p className='text-gray-600 dark:text-gray-400 text-sm flex items-center gap-1'>
                      <FiMapPin className='w-3 h-3' />
                      {property.location}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border capitalize flex-shrink-0 ${getStatusColor(
                    property.status
                  )}`}
                >
                  {property.status}
                </span>
              </div>

              <div className='grid grid-cols-2 gap-4 pt-3 border-t border-gray-200 dark:border-white/10'>
                <div>
                  <p className='text-gray-600 dark:text-gray-400 text-xs mb-1'>
                    Price
                  </p>
                  <p className='text-gray-900 dark:text-white font-semibold'>
                    ${property.price.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className='text-gray-600 dark:text-gray-400 text-xs mb-1'>
                    Beds/Baths
                  </p>
                  <p className='text-gray-900 dark:text-white font-semibold'>
                    {property.bedrooms} / {property.bathrooms}
                  </p>
                </div>
              </div>

              <div className='flex gap-2 pt-3 border-t border-gray-200 dark:border-white/10'>
                <button
                  onClick={() => handleEdit(property)}
                  className='flex-1 py-2 px-4 rounded-lg bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-500/20 transition-all duration-300 font-medium text-sm flex items-center justify-center gap-2'
                >
                  <FiEdit2 className='w-4 h-4' />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(property.id)}
                  className='flex-1 py-2 px-4 rounded-lg bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-500/20 transition-all duration-300 font-medium text-sm flex items-center justify-center gap-2'
                >
                  <FiTrash2 className='w-4 h-4' />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedProperty && (
        <EditPropertyModal
          property={selectedProperty}
          onClose={() => {
            setShowEditModal(false);
            setSelectedProperty(null);
          }}
        />
      )}
    </>
  );
};

export default PropertyTable;
