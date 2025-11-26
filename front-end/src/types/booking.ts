export interface Booking {
  id: string;
  userId: number;
  propertyId: string;
  totalAmount: string;
  status: 'pending' | 'paid' | 'canceled';
  createdAt: string;
  updatedAt: string;
  property: {
    id: string;
    name: string;
    slug: string;
    description: string;
    location: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    amenities: string[];
    isBooked: boolean;
    createdAt: string;
    updatedAt: string;
  };
}
