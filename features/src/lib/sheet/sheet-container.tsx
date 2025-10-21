import { Suspense } from 'react';

const Component = () => {
  // const type = selectCurrentSheet();
  // switch (type) {
  //   default:
  //     return null;
  // }
  return null;
};

// Global sheets
export const SheetContainer = () => {
  return (
    <Suspense fallback={<>[sheet_container_loader]</>}>
      <Component />
    </Suspense>
  );
};
