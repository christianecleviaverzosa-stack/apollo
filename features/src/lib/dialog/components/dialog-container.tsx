import { lazy, Suspense } from 'react';
import { Backdrop, selectCurrentDialog } from '@apollo/ui';

/** Worker */
const EditWorker = lazy(
  () => import('../../worker/components/edit-worker-dialog')
);
const SuspendWorker = lazy(
  () => import('../../worker/components/suspend-worker-dialog')
);

/** Lead */
const DeleteLead = lazy(
  () => import('../../lead/components/delete-lead-dialog')
);

const Component = () => {
  const type = selectCurrentDialog();

  switch (type) {
    case 'edit-worker':
      return <EditWorker />;
    case 'suspend-worker':
      return <SuspendWorker />;
    case 'delete-lead':
      return <DeleteLead />;
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
