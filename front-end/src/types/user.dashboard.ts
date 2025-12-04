import { Booking } from "./booking";
import { Payment } from "./payment";

interface User {
  name: string;
  email: string;
  role: 'USER' | 'ADMIN' | string; // adjust roles as needed
}

export interface DashboardData {
  recentBookings: Booking[];      // replace `any` with the appropriate type if you have it
  recentsPayments: Payment[];     // replace `any` with the appropriate type if you have it
  totalMyBookings: number;
  totalMyBookingsCompleted: number;
  totalMyBookingsPending: number;
  totalSpent: string;         // or number if you store it as a numeric value
  user: User;
}
