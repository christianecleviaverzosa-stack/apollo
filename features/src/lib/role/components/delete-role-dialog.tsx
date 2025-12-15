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
  Badge,
} from '@apollo/ui';

const DeleteRoleDialog = () => {
  const isMobile = useIsMobile();
  const isOpen = selectIsDialogOpen('delete-role');

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
        data-testid="delete-role-dialog"
      >
        <DialogTitle>Delete Role</DialogTitle>
        <Separator />

        <p className="text-sm text-muted-foreground">
          Are you sure you want to&nbsp;
          <span className="font-medium text-destructive">delete</span> this
          role? This action is&nbsp;
          <span className="font-medium">permanent</span> and may affect users
          currently assigned to it.
        </p>

        {/* Role Summary */}
        <div className="flex flex-col mt-3 gap-1">
          <p className="font-medium text-lg">Sales</p>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Role</Badge>
            <span className="text-sm text-muted-foreground">
              Role ID: ROLE-SALES
            </span>
          </div>
        </div>

        {/* Role Details */}
        <div className="grid grid-cols-2 gap-y-2 text-sm mt-3">
          <div className="text-muted-foreground">Users Assigned</div>
          <div>14 users</div>

          <div className="text-muted-foreground">Permissions</div>
          <div>Leads, Orders, Deposits</div>

          <div className="text-muted-foreground">Created By</div>
          <div>Admin</div>

          <div className="text-muted-foreground">Last Updated</div>
          <div>October 22, 2025</div>
        </div>

        <Separator className="my-3" />

        {/* Warning */}
        <p className="text-sm text-destructive">
          Deleting this role will remove it from all assigned users. Users may
          lose access until reassigned to another role.
        </p>

        <DialogFooter className="gap-2 md:gap-0 mt-4">
          <Button onClick={closePrompt} variant="outline">
            Cancel
          </Button>
          <Button variant="destructive">
            Delete Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteRoleDialog;
