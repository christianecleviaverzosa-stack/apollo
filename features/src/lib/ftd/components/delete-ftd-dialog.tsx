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

const DeleteFtdDialog = () => {
  const isMobile = useIsMobile();
  const isOpen = selectIsDialogOpen('delete-ftd');

  const closePrompt = () => {
    setCurrentDialog({ open: false });
  };

  const onOpenChange = (state?: boolean) => {
    if (state) return;
    closePrompt();
  };

  // Dummy record data — replace with injected props or state later
  const ftd = {
    clientName: 'Ethan Brown',
    clientId: 'CL-00891',
    country: 'United States',
    amount: '$1,200.00',
    depositId: 'DP-00983',
    agent: 'Sales Agent 2',
    date: 'Nov 12, 2025',
    offer: 'Crypto Starter Pack',
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        style={{ maxWidth: isMobile ? '90vw' : '600px' }}
        data-testid="delete-ftd-dialog"
      >
        <DialogTitle>Delete FTD Record</DialogTitle>
        <Separator />

        <p className="text-sm text-muted-foreground">
          You are about to&nbsp;
          <span className="font-medium text-destructive">delete</span> this FTD
          entry. This action is&nbsp;
          <span className="font-medium">irreversible</span> and may impact
          client reporting and performance records.
        </p>

        {/* Summary */}
        <div className="flex flex-col mt-3">
          <p className="font-medium text-lg">{ftd.clientName}</p>
          <p className="text-sm text-muted-foreground">
            Client ID: {ftd.clientId}
          </p>
        </div>

        {/* Key Information */}
        <div className="grid grid-cols-2 gap-y-2 text-sm mt-2">
          <div className="text-muted-foreground">Country</div>
          <div>{ftd.country}</div>

          <div className="text-muted-foreground">FTD Amount</div>
          <div>{ftd.amount}</div>

          <div className="text-muted-foreground">Deposit ID</div>
          <div>{ftd.depositId}</div>

          <div className="text-muted-foreground">Assigned Agent</div>
          <div>{ftd.agent}</div>

          <div className="text-muted-foreground">Offer / Campaign</div>
          <div>{ftd.offer}</div>

          <div className="text-muted-foreground">Recorded On</div>
          <div>{ftd.date}</div>
        </div>

        <Separator className="my-3" />

        <DialogFooter className="gap-2 md:gap-0">
          <Button onClick={closePrompt} variant="outline">
            Cancel
          </Button>
          <Button variant="destructive">Delete FTD</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteFtdDialog;
