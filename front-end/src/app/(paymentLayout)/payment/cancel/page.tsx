import CancelContent from '@/components/CancelContent';
import PaymentLoding from '@/components/PaymentLoding';
import { Suspense } from 'react';

export const metadata = {
  title: 'Cancel Payment - Luxury Real Estate',
  description: 'Cancel your payment to access your account',
}

export default function CancelPage() {
  return (
    <Suspense fallback={<PaymentLoding/>}>
      <CancelContent />
    </Suspense>
  );
}
