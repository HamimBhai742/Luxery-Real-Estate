import { Booking } from './booking';

export interface ICreateReview {
  rating: number;
  comment: string;
  bookingId: string;
  propertyId: string;
}

export interface Review {
  id: string;
  bookingId: string;
  propertyId: string;
  userId: number;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;

  booking: Booking;
  user: User;
}

interface User {
  name: string;
  email: string;
  profile: string;
}
