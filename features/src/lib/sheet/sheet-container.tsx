import { Backdrop } from '@apollo/ui';
import { Suspense } from 'react';

const Component = () => {
  return null;
};

// Global sheets
export const SheetContainer = () => {
  return (
    <Suspense fallback={<Backdrop />}>
      <Component />
    </Suspense>
  );
};
