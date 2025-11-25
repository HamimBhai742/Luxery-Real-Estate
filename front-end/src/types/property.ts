export interface Property {
  id: string;
  name: string;
  slug: string;
  description: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  status: 'active' | 'inactive' ;
  isBooked: boolean;
  createdAt: string;
  updatedAt: string;
}
