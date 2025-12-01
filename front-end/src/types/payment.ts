export interface Payment {
  id: string;
  userId: number;
  bookingId: string;
  transactionId: string;
  amount: string;
  status: 'pending' | 'completed' | 'failed';
  provider: string;
  rawResponse: any;
  createdAt: string;
  updatedAt: string;
}
