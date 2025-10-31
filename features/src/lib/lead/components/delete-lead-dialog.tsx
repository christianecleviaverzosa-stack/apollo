import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  Separator,
  selectIsDialogOpen,
  setCurrentDialog,
  useIsMobile,
} from '@apollo/ui';

const DeleteLeadDialog = () => {
  const isMobile = useIsMobile();
  const isOpen = selectIsDialogOpen('delete-lead');

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
        style={{ maxWidth: isMobile ? '90vw' : '600px' }}
        data-testid="delete-lead-dialog"
      >
        <DialogTitle>Delete Lead</DialogTitle>
        <Separator />
        <p className="text-sm text-muted-foreground">
          Are you sure you want to&nbsp;
          <span className="font-medium text-destructive">delete</span> this
          lead? This action is&nbsp;
          <span className="font-medium">permanent</span> and cannot be undone.
        </p>

        {/* Lead Summary */}
        <div className="flex flex-col mt-3">
          <p className="font-medium text-lg">John Smith</p>
          <p className="text-sm text-muted-foreground">Lead ID: LD-001</p>
        </div>

        <div className="grid grid-cols-2 gap-y-2 text-sm mt-2">
          <div className="text-muted-foreground">Email</div>
          <div>john.smith@example.com</div>
          <div className="text-muted-foreground">Manager</div>
          <div>Manager 1</div>
          <div className="text-muted-foreground">Country</div>
          <div>United States</div>
          <div className="text-muted-foreground">Status</div>
          <div>New</div>
          <div className="text-muted-foreground">Campaign</div>
          <div>Demo Campaign</div>
          <div className="text-muted-foreground">Last Updated</div>
          <div>October 21, 2025</div>
        </div>

        <Separator className="my-3" />

        <DialogFooter className="gap-2 md:gap-0">
          <Button onClick={closePrompt} variant="outline">
            Cancel
          </Button>
          <Button variant="destructive">Delete Lead</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteLeadDialog;
