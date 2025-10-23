import {
  Container,
  Content,
  selectIsDialogOpen,
  setCurrentDialog,
} from '@apollo/ui';

const EditWorkerDialog = () => {
  const isOpen = selectIsDialogOpen('edit-worker');

  const onOpenChange = (state?: boolean) => {
    if (state) {
      return;
    }

    setCurrentDialog({ open: false });
  };

  return (
    <Container open={isOpen} onOpenChange={onOpenChange}>
      <Content data-testid="edit-worker-dialog">[edit_worker_dialog]</Content>
    </Container>
  );
};

export default EditWorkerDialog;
