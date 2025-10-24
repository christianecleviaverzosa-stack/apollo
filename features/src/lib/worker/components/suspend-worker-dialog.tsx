import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  Separator,
  selectIsDialogOpen,
  setCurrentDialog,
  useMediaQuery,
} from '@apollo/ui';

const SuspendWorkerDialog = () => {
  const isDesktop = useMediaQuery('md');
  const isOpen = selectIsDialogOpen('suspend-worker');

  const closePrompt = () => {
    setCurrentDialog({ open: false });
  };

  const onOpenChange = (state?: boolean) => {
    if (state) return;
    closePrompt();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        style={{ maxWidth: isDesktop ? '600px' : '90vw' }}
        data-testid="suspend-worker-dialog"
      >
        <DialogTitle>Suspend Worker</DialogTitle>
        <Separator />
        <p className="text-sm text-muted-foreground">
          Are you sure you want to&nbsp;
          <span className="font-medium text-destructive">suspend</span> this
          worker? This action will restrict their access until reinstated.
        </p>
        {/* Worker Summary */}
        <div className="flex flex-col">
          <p className="font-medium text-lg">John Doe</p>
          <p className="text-sm text-muted-foreground">Manager</p>
        </div>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <div className="text-muted-foreground">Email</div>
          <div>john.doe@company.com</div>
          <div className="text-muted-foreground">Country</div>
          <div>Philippines</div>
          <div className="text-muted-foreground">Timezone</div>
          <div>Asia/Manila</div>
          <div className="text-muted-foreground">Joined</div>
          <div>March 12, 2024</div>
          <div className="text-muted-foreground">Last Active</div>
          <div>October 18, 2025</div>
        </div>
        <Separator />
        <DialogFooter className="gap-2 md:gap-0">
          <Button onClick={closePrompt} variant="outline">
            Cancel
          </Button>
          <Button variant="destructive">Suspend Worker</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuspendWorkerDialog;
