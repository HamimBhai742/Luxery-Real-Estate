import PaymentLoding from '@/components/PaymentLoding';
import SuccessContent from '@/components/SuccessContent';
import { Suspense } from 'react';

export const metadata = {
  title: 'Payment Success - Luxury Real Estate',
  description: 'Payment success to access your account',
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<PaymentLoding/>}>
      <SuccessContent />
    </Suspense>
  );
}
