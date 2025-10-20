import { selectCurrentSheet } from '@apollo/ui/src/lib/store/selectors';
import { Suspense, lazy } from 'react';

const Sidebar = lazy(
  () => import('../layout/components/sidebar/sidebar-sheet')
);

const Component = () => {
  const type = selectCurrentSheet();
  switch (type) {
    case 'sidebar':
      return <Sidebar />;
    default:
      return null;
  }
};

// Global sheets
export const SheetContainer = () => {
  return (
    <Suspense fallback={<>[sheet_container_loader]</>}>
      <Component />
    </Suspense>
  );
};
