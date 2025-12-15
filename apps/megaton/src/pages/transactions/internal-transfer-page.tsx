import {
  Label,
  Badge,
  Button,
  Separator,
  Textarea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Form,
} from '@apollo/ui';

import { useForm, Controller } from 'react-hook-form';

export default function SingleInternalTransferPage() {
  const form = useForm({
    defaultValues: {
      status: 'pending',
      notes: '',
    },
  });

  const { control, register } = form;

  // Dummy internal transfer data
  const transfer = {
    transferId: 'IT-0001',
    createdAt: '2025-02-14 14:10',
    approvedAt: '',
    clientId: 'CL-12093',
    fullName: 'John Smith',
    email: 'john.smith@example.com',
    country: 'United States',
    agent: 'Sales Agent 1',

    // Transfer details
    fromWallet: 'Trading MT5',
    toWallet: 'Rewards Wallet',
    reference: 'TRF-1092381223',
    amount: '$300.00',
    currency: 'USD',

    previousBalance: '$1,700.00',
    newBalance: '$1,400.00',
  };

  return (
    <section
      data-testid="internal-transfer-page"
      className="relative space-y-6"
    >
      {/* Sticky Header */}
      <div className="sticky top-0 flex flex-col bg-background z-10 shadow-sm">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-2xl font-semibold">
            Internal Transfer {transfer.transferId}
          </h2>

          <div className="flex gap-2">
            <Button variant="ghost">Refund</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
        <Separator />
      </div>

      {/* Page Layout */}
      <Form {...form}>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Transfer Overview */}
          <div className="flex flex-col gap-4">
            <Label className="text-muted-foreground">Transfer Overview</Label>

            <div className="grid grid-cols-2 gap-4">
              {/* Transfer ID */}
              <div className="flex flex-col gap-1">
                <Label className="text-sm text-muted-foreground">
                  Transfer ID
                </Label>
                <p className="font-medium">{transfer.transferId}</p>
              </div>

              {/* Transfer Status (editable) */}
              <div className="flex flex-col gap-1">
                <Label className="text-sm text-muted-foreground">Status</Label>

                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label className="text-sm text-muted-foreground">
                  Created At
                </Label>
                <p className="font-medium">{transfer.createdAt}</p>
              </div>

              {transfer.approvedAt && (
                <div className="flex flex-col gap-1">
                  <Label className="text-sm text-muted-foreground">
                    Approved At
                  </Label>
                  <p className="font-medium">{transfer.approvedAt}</p>
                </div>
              )}

              <div className="flex flex-col gap-1">
                <Label className="text-sm text-muted-foreground">
                  Reference ID
                </Label>
                <p className="font-medium">{transfer.reference}</p>
              </div>
            </div>
          </div>

          {/* Client Information */}
          <div className="flex flex-col gap-4">
            <Label className="text-muted-foreground">Client Information</Label>

            <div className="grid grid-cols-2 gap-4">
              {[
                ['Client ID', transfer.clientId],
                ['Full Name', transfer.fullName],
                ['Email', transfer.email],
                ['Country', transfer.country],
                ['Assigned Agent', transfer.agent],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col gap-1">
                  <Label className="text-sm text-muted-foreground">
                    {label}
                  </Label>
                  <p className="font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="flex flex-col gap-4">
            <Label className="text-muted-foreground">Financial Details</Label>

            <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg border shadow-sm">
              {[
                ['Amount', transfer.amount],
                ['Currency', transfer.currency],
                ['From Wallet', transfer.fromWallet],
                ['To Wallet', transfer.toWallet],
                ['Previous Balance', transfer.previousBalance],
                ['New Balance', transfer.newBalance],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col gap-1">
                  <Label className="text-sm text-muted-foreground">
                    {label}
                  </Label>
                  <p className="font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Follow-up & Notes */}
          <div className="flex flex-col gap-4">
            <Label className="text-muted-foreground">Follow-up & Notes</Label>

            <div className="bg-muted/30 border rounded-lg p-4 flex flex-col gap-4">
              <Textarea
                placeholder="Write your comment..."
                className="min-h-[100px] resize-none"
                {...register('notes')}
              />

              <div className="flex justify-end">
                <Button>Save Comment</Button>
              </div>

              <Separator />

              <div className="flex flex-col gap-3">
                <Label className="text-sm font-medium text-muted-foreground">
                  History
                </Label>

                <div className="max-h-60 overflow-y-auto flex flex-col gap-3 pr-1">
                  <div className="rounded-md bg-background border p-3 flex flex-col gap-1">
                    <div className="flex items-center justify-between text-xs">
                      <Badge variant="secondary">admin</Badge>
                      <span className="text-muted-foreground">
                        2025-02-14 11:00
                      </span>
                    </div>
                    <p className="text-sm mt-1">
                      Manual review triggered for balance validation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </section>
  );
}
