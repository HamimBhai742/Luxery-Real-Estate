import FailedContent from '@/components/FailedContent';
import PaymentLoding from '@/components/PaymentLoding';
import { Suspense } from 'react';

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={<PaymentLoding/>}>
      <FailedContent />
    </Suspense>
  );
}
