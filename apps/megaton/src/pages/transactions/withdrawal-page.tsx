import {
  Label,
  Badge,
  Button,
  Separator,
  Textarea,
  Form,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@apollo/ui';

import { useForm, Controller } from 'react-hook-form';

const withdrawal = {
  withdrawalId: 'WD-0001',
  status: 'pending',
  createdAt: '2025-03-01 09:15',
  processedAt: '2025-03-01 10:05',
  transactionId: 'TXN-482390123',
  merchantReference: 'WREF-20250301-8891',
  provider: 'Manual Processing',
  paymentChannel: 'Bank Transfer',

  clientId: 'CL-12093',
  fullName: 'John Smith',
  email: 'john.smith@example.com',
  country: 'United States',
  agent: 'Sales Agent 1',

  withdrawalAmount: '$300.00',
  currency: 'USD',
  fee: '$5.00',
  netAmount: '$295.00',
  previousBalance: '$1,700.00',
  newBalance: '$1,400.00',

  bankName: 'Chase Bank',
  accountName: 'John Smith',
  iban: 'US00 1234 5678 9012 3456 78',
  swift: 'CHASUS33',

  cryptoNetwork: null,
  walletAddress: null,
  txHash: null,
};

export default function WithdrawalPage() {
  const form = useForm({
    defaultValues: {
      status: withdrawal.status,
      notes: '',
    },
  });

  const { control, register, handleSubmit } = form;
  const onSubmit = (data) => {
    console.log('Saving withdrawal changes...', data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        data-testid="withdrawal-page"
        className="relative space-y-6"
      >
        {/* Sticky Header */}
        <div className="sticky top-0 flex flex-col bg-background z-10 shadow-sm">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-2xl font-semibold">
              Withdrawal {withdrawal.withdrawalId}
            </h2>

            <Button type="submit">Save Changes</Button>
          </div>
          <Separator />
        </div>

        {/* Content */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Withdrawal Overview */}
          <div className="flex flex-col gap-4">
            <Label className="text-muted-foreground">Withdrawal Overview</Label>

            <div className="grid grid-cols-2 gap-4">
              {/* Withdrawal ID */}
              <div className="flex flex-col gap-1">
                <Label className="text-sm text-muted-foreground">
                  Withdrawal ID
                </Label>
                <p className="font-medium">{withdrawal.withdrawalId}</p>
              </div>

              {/* Status (editable) */}
              <div className="flex flex-col gap-1">
                <Label className="text-sm text-muted-foreground">Status</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Created At */}
              <div className="flex flex-col gap-1">
                <Label className="text-sm text-muted-foreground">
                  Created At
                </Label>
                <p className="font-medium">{withdrawal.createdAt}</p>
              </div>

              {/* Processed At */}
              <div className="flex flex-col gap-1">
                <Label className="text-sm text-muted-foreground">
                  Processed At
                </Label>
                <p className="font-medium">{withdrawal.processedAt || '—'}</p>
              </div>

              {/* Transaction ID */}
              <div className="flex flex-col gap-1">
                <Label className="text-sm text-muted-foreground">
                  Transaction ID
                </Label>
                <p className="font-medium">{withdrawal.transactionId}</p>
              </div>

              {/* Merchant Reference */}
              <div className="flex flex-col gap-1">
                <Label className="text-sm text-muted-foreground">
                  Merchant Reference
                </Label>
                <p className="font-medium">{withdrawal.merchantReference}</p>
              </div>

              {/* Payment Provider */}
              <div className="flex flex-col gap-1">
                <Label className="text-sm text-muted-foreground">
                  Payment Provider
                </Label>
                <p className="font-medium">{withdrawal.provider}</p>
              </div>

              {/* Payment Channel */}
              <div className="flex flex-col gap-1">
                <Label className="text-sm text-muted-foreground">
                  Payment Channel
                </Label>
                <p className="font-medium">{withdrawal.paymentChannel}</p>
              </div>
            </div>
          </div>

          {/* Client Information */}
          <div className="flex flex-col gap-4">
            <Label className="text-muted-foreground">Client Information</Label>

            <div className="grid grid-cols-2 gap-4">
              {[
                ['Client ID', withdrawal.clientId],
                ['Full Name', withdrawal.fullName],
                ['Email', withdrawal.email],
                ['Country', withdrawal.country],
                ['Assigned Agent', withdrawal.agent],
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
            <Label className="text-muted-foreground">Financial Breakdown</Label>

            <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg border shadow-sm">
              {[
                ['Withdrawal Amount', withdrawal.withdrawalAmount],
                ['Currency', withdrawal.currency],
                ['Fee', withdrawal.fee],
                ['Net Amount Debited', withdrawal.netAmount],
                ['Previous Balance', withdrawal.previousBalance],
                ['New Balance', withdrawal.newBalance],
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

          {/* Payout Details (Bank / Crypto) */}
          <div className="flex flex-col gap-4">
            <Label className="text-muted-foreground">Payout Details</Label>

            <div className="grid grid-cols-2 gap-4">
              {/* Bank Transfer */}
              {withdrawal.bankName && (
                <>
                  <div className="flex flex-col gap-1">
                    <Label className="text-sm text-muted-foreground">
                      Bank Name
                    </Label>
                    <p className="font-medium">{withdrawal.bankName}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="text-sm text-muted-foreground">
                      Account Name
                    </Label>
                    <p className="font-medium">{withdrawal.accountName}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="text-sm text-muted-foreground">
                      IBAN
                    </Label>
                    <p className="font-medium">{withdrawal.iban}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="text-sm text-muted-foreground">
                      SWIFT/BIC
                    </Label>
                    <p className="font-medium">{withdrawal.swift}</p>
                  </div>
                </>
              )}

              {/* Crypto (if present) */}
              {withdrawal.cryptoNetwork && (
                <>
                  <div className="flex flex-col gap-1">
                    <Label className="text-sm text-muted-foreground">
                      Crypto Network
                    </Label>
                    <p className="font-medium">{withdrawal.cryptoNetwork}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="text-sm text-muted-foreground">
                      Wallet Address
                    </Label>
                    <p className="font-medium">{withdrawal.walletAddress}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="text-sm text-muted-foreground">
                      Transaction Hash
                    </Label>
                    <p className="font-medium">{withdrawal.txHash}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Follow-up & Notes (RHF bound) */}
          <div className="flex flex-col gap-4">
            <Label className="text-muted-foreground">Follow-up & Notes</Label>

            <div className="bg-muted/30 border rounded-lg p-4 flex flex-col gap-4">
              <Textarea
                placeholder="Write your comment..."
                className="min-h-[100px] resize-none"
                {...register('notes')}
              />

              <div className="flex justify-end">
                <Button type="submit">
                  Save Comment
                </Button>
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
                          2025-03-01 10:10
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-foreground mt-1">
                      Withdrawal verified and sent to bank for processing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
