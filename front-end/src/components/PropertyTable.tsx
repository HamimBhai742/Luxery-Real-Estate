'use client';

import React, { useState } from 'react';
import {
  FiEdit2,
  FiTrash2,
  FiEye,
  FiMoreVertical,
  FiHome,
} from 'react-icons/fi';
import EditPropertyModal from './EditPropertyModal';
import Swal from 'sweetalert2';

interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  status: 'active' | 'inactive';
}

const PropertyTable = ({ properties }: { properties: Property[] }) => {
  console.log(properties);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleEdit = (property: Property) => {
    setSelectedProperty(property);
    setShowEditModal(true);
    setActiveMenu(null);
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/property/delete-property/${id}`,
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
            }
          );
          const data = await res.json();
          if (data.success) {
            Swal.fire('Deleted!', data.message, 'success');
            window.location.reload();
          }
          if (!data.success) {
            Swal.fire('Error!', data.message, 'error');
          }
        } catch (error) {
          Swal.fire(
            'Error!',
            'An error occurred while deleting the property.',
            'error'
          );
          console.error('Error deleting property:', error);
        }
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'inactive':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <>
      {/* Desktop Table View */}
      <div className='hidden lg:block '>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-white/10'>
              <th className='text-left py-4 px-4 text-white/60 font-semibold text-sm'>
                Property
              </th>
              <th className='text-left py-4 px-4 text-white/60 font-semibold text-sm'>
                Location
              </th>
              <th className='text-left py-4 px-4 text-white/60 font-semibold text-sm'>
                Price
              </th>
              <th className='text-left py-4 px-4 text-white/60 font-semibold text-sm'>
                Beds/Baths
              </th>
              <th className='text-left py-4 px-4 text-white/60 font-semibold text-sm'>
                Status
              </th>
              <th className='text-right py-4 px-4 text-white/60 font-semibold text-sm'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {properties?.map((property, index) => (
              <tr
                key={property.id}
                className='border-b border-white/5 hover:bg-white/5 transition-all duration-300 group'
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className='py-4 px-4'>
                  <div className='flex items-center gap-3'>
                    <div className='w-16 h-16 rounded-xl bg-linear-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center overflow-hidden'>
                      <FiHome className='w-8 h-8 text-white/60' />
                    </div>
                    <div>
                      <p className='text-white font-semibold'>
                        {property.name}
                      </p>
                    </div>
                  </div>
                </td>
                <td className='py-4 px-4 text-white/80'>{property.location}</td>
                <td className='py-4 px-4 text-white font-semibold'>
                  ${property.price}
                </td>
                <td className='py-4 px-4 text-white/80'>
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
                      className='p-2 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all duration-300 hover:scale-110'
                    >
                      <FiEdit2 className='w-4 h-4' />
                    </button>
                    <button
                      onClick={() => handleDelete(property.id)}
                      className='p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300 hover:scale-110'
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
        {properties.map((property, index) => (
          <div
            key={property.id}
            className='relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300'
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className='space-y-4'>
              <div className='flex items-start justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 rounded-xl bg-linear-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center'>
                    <FiHome className='w-6 h-6 text-white/60' />
                  </div>
                  <div>
                    <p className='text-white font-semibold'>{property.name}</p>
                    <p className='text-white/40 text-sm'>{property.location}</p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    setActiveMenu(
                      activeMenu === property.id ? null : property.id
                    )
                  }
                  className='p-2 rounded-xl bg-white/5 text-white/60 hover:bg-white/10 transition-all'
                >
                  <FiMoreVertical className='w-5 h-5' />
                </button>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-white/40 text-xs'>Price</p>
                  <p className='text-white font-semibold'>{property.price}</p>
                </div>
                <div>
                  <p className='text-white/40 text-xs'>Beds/Baths</p>
                  <p className='text-white font-semibold'>
                    {property.bedrooms} / {property.bathrooms}
                  </p>
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border capitalize ${getStatusColor(
                    property.status
                  )}`}
                >
                  {property.status}
                </span>
              </div>

              {/* Mobile Actions Menu */}
              {activeMenu === property.id && (
                <div className='flex gap-2 pt-2 border-t border-white/10 animate-slideDown'>
                  <button
                    onClick={() => handleEdit(property)}
                    className='flex-1 py-2 px-4 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all duration-300 flex items-center justify-center gap-2'
                  >
                    <FiEdit2 className='w-4 h-4' />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(property.id)}
                    className='flex-1 py-2 px-4 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300 flex items-center justify-center gap-2'
                  >
                    <FiTrash2 className='w-4 h-4' />
                    Delete
                  </button>
                </div>
              )}
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
