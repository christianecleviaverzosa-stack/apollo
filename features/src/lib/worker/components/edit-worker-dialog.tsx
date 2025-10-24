import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  selectIsDialogOpen,
  Separator,
  setCurrentDialog,
} from '@apollo/ui';
import { EditWorkerForm } from './edit-worker-form';

const EditWorkerDialog = () => {
  const isOpen = selectIsDialogOpen('edit-worker');

  const closePrompt = () => {
    setCurrentDialog({ open: false });
  };

  const onOpenChange = (state?: boolean) => {
    if (state) {
      return;
    }

    closePrompt();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent data-testid="edit-worker-dialog">
        <DialogTitle>Edit Worker</DialogTitle>
        <Separator />
        <EditWorkerForm />
        <Separator />
        <DialogFooter>
          <Button>Save Changes</Button>
          <Button onClick={closePrompt} variant="outline">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditWorkerDialog;
