import { Property } from "./property";

// Single day's revenue
export interface DailyRevenue {
  date: string;
  revenue: number;
}

// Single payment status
export interface PaymentStatus {
  name: "Success" | "Failed" | "Canceled";
  value: number;
  color: string;
}


// Dashboard data
export interface DashboardData {
  chartData: DailyRevenue[];
  paymentData: PaymentStatus[];
  recentProperties: Property[];
  totalBookings: number;
  totalProperties: number;
  totalRevenue: string;
  totalUsers: number;
}
