'use client';

import { useState } from 'react';
import PropertyCard from '@/components/PropertyCard';
import { Property } from '@/types/property';

// Mock data - replace with API call
const mockProperty: Property = {
  id: '1',
  name: 'Modern Villa with Ocean View',
  slug: 'modern-villa-ocean-view',
  description: 'Experience unparalleled luxury in this stunning modern villa featuring panoramic ocean views, contemporary architecture, and world-class amenities. This exceptional property offers the perfect blend of sophistication and comfort, with expansive living spaces, floor-to-ceiling windows, and premium finishes throughout.',
  location: 'Malibu, CA',
  price: 4500000,
  bedrooms: 5,
  bathrooms: 4,
  amenities: ['Infinity Pool', 'Home Gym', 'Ocean View', 'Smart Home', 'Wine Cellar', 'Home Theater', 'Spa', 'Garage'],
  status: 'active',
  isBooked: false,
  createdAt: '2025-01-15',
  updatedAt: '2025-01-15',
};

const relatedProperties: Property[] = [
  {
    id: '2',
    name: 'Luxury Penthouse Downtown',
    slug: 'luxury-penthouse-downtown',
    description: 'Exclusive penthouse in the heart of the city',
    location: 'New York, NY',
    price: 8900000,
    bedrooms: 4,
    bathrooms: 3,
    amenities: ['Rooftop', 'Concierge', 'Smart Home'],
    status: 'active',
    isBooked: true,
    createdAt: '2025-01-10',
    updatedAt: '2025-01-20',
  },
  {
    id: '3',
    name: 'Beachfront Estate',
    slug: 'beachfront-estate',
    description: 'Private beachfront property with direct access',
    location: 'Miami, FL',
    price: 6200000,
    bedrooms: 6,
    bathrooms: 5,
    amenities: ['Beach Access', 'Pool', 'Tennis Court'],
    status: 'active',
    isBooked: false,
    createdAt: '2025-01-05',
    updatedAt: '2025-01-18',
  },
];

export default function PropertyDetailsPage() {
  // const params = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const images = [0, 1, 2, 3]; // Mock image indices

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking request:', formData);
    alert('Booking request submitted!');
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Image Gallery */}
        <div className="mb-12">
          <div className="relative h-[500px] bg-linear-to-br from-amber-100 to-amber-200 dark:from-amber-900/20 dark:to-amber-800/20 rounded-2xl overflow-hidden mb-4">
            <div className="absolute inset-0 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <svg className="w-32 h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
              {activeImage + 1} / {images.length}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`h-24 bg-linear-to-br from-amber-100 to-amber-200 dark:from-amber-900/20 dark:to-amber-800/20 rounded-lg ${
                  activeImage === idx ? 'ring-4 ring-amber-500' : ''
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-lg p-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {mockProperty.name}
              </h1>

              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {mockProperty.location}
              </div>

              <div className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-amber-600 mb-8">
                ${mockProperty.price.toLocaleString()}
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{mockProperty.bedrooms}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Bedrooms</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{mockProperty.bathrooms}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Bathrooms</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{mockProperty.status}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Status</div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Description</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {mockProperty.description}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Amenities</h2>
                <div className="grid grid-cols-2 gap-3">
                  {mockProperty.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Request a Viewing</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-linear-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Related Properties */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Similar Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
