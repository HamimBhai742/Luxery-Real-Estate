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

export interface PropertyFormData {
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

export interface PropertyPayload {
  bathrooms: number;
  bedrooms: number;
  price: number;
  status: string;
  name: string;
  description: string;
  location: string;
  amenities: string[];
  images: File[];
}
