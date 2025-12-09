import FailedContent from '@/components/FailedContent';
import PaymentLoding from '@/components/PaymentLoding';
import { Suspense } from 'react';

export const metadata = {
  title: 'Payment Failed - Luxury Real Estate',
  description: 'Payment failed to access your account', 
}

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={<PaymentLoding/>}>
      <FailedContent />
    </Suspense>
  );
}
