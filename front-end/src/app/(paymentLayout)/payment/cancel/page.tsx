import CancelContent from '@/components/CancelContent';
import { Suspense } from 'react';

export default function CancelPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CancelContent />
    </Suspense>
  );
}
