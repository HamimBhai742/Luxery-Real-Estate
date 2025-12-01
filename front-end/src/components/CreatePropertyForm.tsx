'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaBed, FaBath, FaCheckCircle } from 'react-icons/fa';
import { FaBuildingColumns } from 'react-icons/fa6';
import { FiHome, FiMapPin, FiDollarSign, FiX } from 'react-icons/fi';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/80 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-6 mb-6 shadow-lg dark:shadow-none">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
              <FaBuildingColumns className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Create New Property
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Add a luxury property to your portfolio</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="backdrop-blur-xl bg-white/80 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-8 space-y-6 shadow-lg dark:shadow-none">
          {/* Property Name */}
          <div className="group">
            <label className="block text-gray-900 dark:text-white font-medium mb-3 flex items-center gap-2">
              <FiHome className="text-blue-600 dark:text-blue-400" />
              Property Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-4 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-white/10 focus:border-purple-500 dark:focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              placeholder="e.g., Luxury Penthouse Suite"
              required
            />
          </div>

          {/* Description */}
          <div className="group">
            <label className="block text-gray-900 dark:text-white font-medium mb-3">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-4 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-white/10 focus:border-purple-500 dark:focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
              placeholder="Describe the property features, location highlights, and unique selling points..."
              required
            />
          </div>

          {/* Location & Price Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="block text-gray-900 dark:text-white font-medium mb-3 flex items-center gap-2">
                <FiMapPin className="text-green-600 dark:text-green-400" />
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-4 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-white/10 focus:border-purple-500 dark:focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                placeholder="e.g., Beverly Hills, CA"
                required
              />
            </div>

            <div className="group">
              <label className="block text-gray-900 dark:text-white font-medium mb-3 flex items-center gap-2">
                <FiDollarSign className="text-yellow-600 dark:text-yellow-400" />
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-4 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-white/10 focus:border-purple-500 dark:focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                placeholder="0"
                required
              />
            </div>
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="block text-gray-900 dark:text-white font-medium mb-3 flex items-center gap-2">
                <FaBed className="text-purple-600 dark:text-purple-400" />
                Bedrooms
              </label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="w-full px-4 py-4 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-white/10 focus:border-purple-500 dark:focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                placeholder="0"
                required
              />
            </div>

            <div className="group">
              <label className="block text-gray-900 dark:text-white font-medium mb-3 flex items-center gap-2">
                <FaBath className="text-cyan-600 dark:text-cyan-400" />
                Bathrooms
              </label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className="w-full px-4 py-4 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-white/10 focus:border-purple-500 dark:focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                placeholder="0"
                required
              />
            </div>
          </div>

          {/* Amenities */}
          <div className="group">
            <label className="block text-gray-900 dark:text-white font-medium mb-3 flex items-center gap-2">
              <FaCheckCircle className="text-green-600 dark:text-green-400" />
              Amenities
            </label>
            <div className="p-4 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl focus-within:bg-white dark:focus-within:bg-white/10 focus-within:border-purple-500 dark:focus-within:border-purple-500/50 focus-within:ring-2 focus-within:ring-purple-500/20 transition-all duration-300">
              {formData.amenities.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-500/20 dark:to-blue-500/20 border border-purple-300 dark:border-purple-500/30 rounded-lg text-gray-900 dark:text-white text-sm font-medium hover:from-purple-200 hover:to-blue-200 dark:hover:from-purple-500/30 dark:hover:to-blue-500/30 transition-all duration-300"
                    >
                      {amenity}
                      <button
                        type="button"
                        onClick={() => handleRemoveAmenity(index)}
                        className="hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <input
                type="text"
                value={amenityInput}
                onChange={(e) => setAmenityInput(e.target.value)}
                onKeyDown={handleAddAmenity}
                className="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none"
                placeholder="Type amenity and press Enter (e.g., Pool, Gym, Parking)"
              />
            </div>
            <p className="text-gray-600 dark:text-gray-500 text-sm mt-2">Press Enter to add each amenity</p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full py-4 px-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl text-white font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <ImSpinner9 className="w-5 h-5 animate-spin" />
                    Creating Property...
                  </>
                ) : (
                  <>
                    <FaBuildingColumns className="w-5 h-5" />
                    Create Property
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePropertyForm;
