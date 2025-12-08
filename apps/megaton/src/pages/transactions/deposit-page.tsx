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
} from '@apollo/ui';

import { useForm, Controller } from 'react-hook-form';

export default function SingleDepositPage() {
  const deposit = {
    depositId: 'DP-0001',
    status: 'Approved',
    createdAt: '2025-02-14 10:32',
    approvedAt: '2025-02-14 10:33',
    transactionId: 'TXN-934890234',
    merchantReference: 'MREF-20250214-1123',
    provider: 'Flutterwave',
    paymentChannel: 'Card Payment',

    clientId: 'CL-12093',
    fullName: 'John Smith',
    email: 'john.smith@example.com',
    country: 'United States',
    agent: 'Sales Agent 1',

    depositAmount: '$500.00',
    currency: 'USD',
    convertedAmount: '$500.00',
    fee: '$0.00',
    netAmount: '$500.00',
    previousBalance: '$1,200.00',
    newBalance: '$1,700.00',

    cardType: 'Visa',
    cardLast4: '4242',
    cryptoNetwork: null,
    walletAddress: null,
    txHash: null,
    bankName: null,
    accountName: null,
  };

  const form = useForm({
    defaultValues: {
      status: deposit.status,
      notes: '',
    },
  });

  const { control, register, handleSubmit } = form;

  const onSubmit = (data) => {
    console.log('Saving deposit updates...', data);
  };

  return (
    <section data-testid="deposit-page" className="relative space-y-6">
      {/* Sticky Header */}
      <div className="sticky top-0 flex flex-col bg-background z-10 shadow-sm">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-2xl font-semibold">
            Deposit {deposit.depositId}
          </h2>

          <div className="flex items-center gap-2">
            <Button variant="ghost">Refund</Button>
            <Button onClick={handleSubmit(onSubmit)}>Save Changes</Button>
          </div>
        </div>
        <Separator />
      </div>

      {/* Content */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Deposit Overview */}
        <div className="flex flex-col gap-4">
          <Label className="text-muted-foreground">Deposit Overview</Label>

          <div className="grid grid-cols-2 gap-4">
            {/* Deposit ID */}
            <div className="flex flex-col gap-1">
              <Label className="text-sm text-muted-foreground">
                Deposit ID
              </Label>
              <p className="font-medium">{deposit.depositId}</p>
            </div>

            {/* Editable Status */}
            <div className="flex flex-col gap-1">
              <Label className="text-sm text-muted-foreground">Status</Label>

              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* The rest remain static */}
            {[
              ['Created At', deposit.createdAt],
              ['Approved At', deposit.approvedAt],
              ['Transaction ID', deposit.transactionId],
              ['Merchant Reference', deposit.merchantReference],
              ['Payment Provider', deposit.provider],
              ['Payment Channel', deposit.paymentChannel],
            ].map(([label, value], index) => (
              <div key={index} className="flex flex-col gap-1">
                <Label className="text-sm text-muted-foreground">{label}</Label>
                <p className="font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Client Information */}
        <div className="flex flex-col gap-4">
          <Label className="text-muted-foreground">Client Information</Label>

          <div className="grid grid-cols-2 gap-4">
            {[
              ['Client ID', deposit.clientId],
              ['Full Name', deposit.fullName],
              ['Email', deposit.email],
              ['Country', deposit.country],
              ['Assigned Agent', deposit.agent],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1">
                <Label className="text-sm text-muted-foreground">{label}</Label>
                <p className="font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Breakdown */}
        <div className="flex flex-col gap-4">
          <Label className="text-muted-foreground">Financial Breakdown</Label>

          <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg border shadow-sm">
            {[
              ['Deposit Amount', deposit.depositAmount],
              ['Currency', deposit.currency],
              ['Converted Amount', deposit.convertedAmount],
              ['Fee', deposit.fee],
              ['Net Amount Credited', deposit.netAmount],
              ['Previous Balance', deposit.previousBalance],
              ['New Balance', deposit.newBalance],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1">
                <Label className="text-sm text-muted-foreground">{label}</Label>
                <p className="font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method Details */}
        <div className="flex flex-col gap-4">
          <Label className="text-muted-foreground">
            Payment Method Details
          </Label>

          <div className="grid grid-cols-2 gap-4">
            {deposit.cardType && (
              <>
                <div className="flex flex-col gap-1">
                  <Label className="text-sm text-muted-foreground">
                    Card Type
                  </Label>
                  <p className="font-medium">{deposit.cardType}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <Label className="text-sm text-muted-foreground">
                    Card Last 4
                  </Label>
                  <p className="font-medium">{deposit.cardLast4}</p>
                </div>
              </>
            )}
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
              <Button size="sm">Save Comment</Button>
            </div>

            <Separator />

            <div className="flex flex-col gap-3">
              <Label className="text-sm font-medium text-muted-foreground">
                History
              </Label>

              <div className="max-h-60 overflow-y-auto flex flex-col gap-3 pr-1">
                <div className="rounded-md bg-background border p-3 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        admin
                      </Badge>
                      <span className="text-muted-foreground">
                        2025-02-14 10:45
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground mt-1">
                    Deposit verified and automatically approved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
