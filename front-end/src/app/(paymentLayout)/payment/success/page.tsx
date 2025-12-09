import PaymentLoding from '@/components/PaymentLoding';
import SuccessContent from '@/components/SuccessContent';
import { Suspense } from 'react';

export default function SuccessPage() {
  return (
    <Suspense fallback={<PaymentLoding/>}>
      <SuccessContent />
    </Suspense>
  );
}
