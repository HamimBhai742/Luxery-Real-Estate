export interface Property {
  id: string;
  name: string;
  images: string[];
  slug: string;
  description: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  views: number;
  amenities: string[];
  status: 'available' | 'unavailable' | 'booked' | 'sold';
  isBooked: boolean;
  createdAt: string;
  updatedAt: string;
}
