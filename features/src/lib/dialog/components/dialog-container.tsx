import { lazy, Suspense } from 'react';
import { Backdrop, selectCurrentDialog } from '@apollo/ui';

const EditWorker = lazy(
  () => import('../../worker/components/edit-worker-dialog')
);

const Component = () => {
  const type = selectCurrentDialog();

  switch (type) {
    case 'edit-worker':
      return <EditWorker />;
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
