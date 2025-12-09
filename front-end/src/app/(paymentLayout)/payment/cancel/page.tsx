import CancelContent from '@/components/CancelContent';
import PaymentLoding from '@/components/PaymentLoding';
import { Suspense } from 'react';

export default function CancelPage() {
  return (
    <Suspense fallback={<PaymentLoding/>}>
      <CancelContent />
    </Suspense>
  );
}
