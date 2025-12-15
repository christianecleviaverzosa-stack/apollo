import { lazy, Suspense } from 'react';
import { Backdrop, selectCurrentDialog } from '@apollo/ui';

/** Worker */
const SuspendWorker = lazy(
  () => import('../../worker/components/suspend-worker-dialog')
);

/** Role */
const DeleteRole = lazy(
  () => import('../../role/components/delete-role-dialog')
);

/** Lead */
const DeleteLead = lazy(
  () => import('../../lead/components/delete-lead-dialog')
);

const DeleteFtd = lazy(
  () => import('../../ftd/components/delete-ftd-dialog')
);

const Component = () => {
  const type = selectCurrentDialog();

  switch (type) {
    case 'suspend-worker':
      return <SuspendWorker />;
    case 'delete-lead':
      return <DeleteLead />;
    case 'delete-ftd':
      return <DeleteFtd />;
    case 'delete-role': 
      return <DeleteRole />
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
