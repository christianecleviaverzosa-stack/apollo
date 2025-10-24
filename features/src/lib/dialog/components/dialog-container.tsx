import { lazy, Suspense } from 'react';
import { Backdrop, selectCurrentDialog } from '@apollo/ui';

/** Worker */
const EditWorker = lazy(
  () => import('../../worker/components/edit-worker-dialog')
);
const SuspendWorker = lazy(
  () => import('../../worker/components/suspend-worker-dialog')
);

const Component = () => {
  const type = selectCurrentDialog();

  switch (type) {
    case 'edit-worker':
      return <EditWorker />;
    case 'suspend-worker':
      return <SuspendWorker />;
    default:
      return null;
  }
};

export const PromptContainer = () => {
  return (
    <Suspense fallback={<Backdrop />}>
      <Component />
    </Suspense>
  );
};
