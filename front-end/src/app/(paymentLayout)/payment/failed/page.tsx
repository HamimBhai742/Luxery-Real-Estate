import FailedContent from '@/components/FailedContent';
import { Suspense } from 'react';

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FailedContent />
    </Suspense>
  );
}
