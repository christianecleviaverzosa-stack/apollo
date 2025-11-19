// SingleFTDPage.tsx
import {
  Label,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Textarea,
  Badge,
  Button,
  Separator,
} from '@apollo/ui';
import { useForm, Controller } from 'react-hook-form';

// Dummy related transactions data
const relatedTransactions = {
  deposits: [
    { id: 'D-101', amount: 120, method: 'Credit Card', date: '2025-10-10' },
    { id: 'D-102', amount: 200, method: 'Paypal', date: '2025-10-12' },
  ],
  withdrawals: [
    { id: 'W-88', amount: 50, method: 'Bank Transfer', date: '2025-10-15' },
  ],
  transfers: [
    { id: 'T-11', amount: 75, from: 'Main', to: 'Trading', date: '2025-10-18' },
  ],
};

export const SingleFtdClientForm = () => {
  const form = useForm({
    defaultValues: {
      // FTD core data (READ-ONLY FIELDS)
      ftdId: 'FTD-004',
      leadId: 'LD-004',
      name: 'Sofia Martinez',
      email: 'sofia.martinez@example.com',
      country: 'mx',
      buyer: 'Broker A',
      ftdAmount: 80,
      ftdDate: '2025-10-17',
      conversionType: 'cpa',
      depositMethod: 'bank-transfer',
      status: 'rejected',
      createdAt: '2025-10-17',

      // Editable fields (operational)
      agent: 'manager-1',
      notes: '',
    },
  });

  const { register, control, handleSubmit } = form;

  const onSubmit = (data) => {
    console.log('Saving changes...', data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4"
    >
      {/* ------------------------------------------------- */}
      {/* 1. FTD Overview */}
      {/* ------------------------------------------------- */}
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">FTD Overview</Label>
        <div className="grid grid-cols-2 gap-4">
          {/* FTD ID */}
          <div className="flex flex-col gap-2">
            <Label>FTD ID</Label>
            <Input readOnly {...register('ftdId')} />
          </div>

          {/* Lead ID */}
          <div className="flex flex-col gap-2">
            <Label>Lead ID</Label>
            <Input readOnly {...register('leadId')} />
          </div>

          {/* Client Name */}
          <div className="flex flex-col gap-2">
            <Label>Name</Label>
            <Input readOnly {...register('name')} />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input readOnly {...register('email')} />
          </div>

          {/* Country */}
          <div className="flex flex-col gap-2">
            <Label>Country</Label>
            <Input readOnly value="Mexico" />
          </div>

          {/* Buyer */}
          <div className="flex flex-col gap-2">
            <Label>Buyer / Client</Label>
            <Input readOnly {...register('buyer')} />
          </div>

          {/* Assigned Agent (editable) */}
          <div className="flex flex-col gap-2">
            <Label>Assigned Agent</Label>
            <Controller
              name="agent"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select agent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager-1">Manager 1</SelectItem>
                    <SelectItem value="manager-2">Manager 2</SelectItem>
                    <SelectItem value="sales-1">Sales 1</SelectItem>
                    <SelectItem value="sales-2">Sales 2</SelectItem>
                    <SelectItem value="sales-3">Sales 3</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
      </div>

      {/* ------------------------------------------------- */}
      {/* 2. FTD Financial Details (READ ONLY) */}
      {/* ------------------------------------------------- */}
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">
          Financial & Conversion Details
        </Label>

        <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg border shadow-sm">
          <div className="flex flex-col gap-1">
            <Label className="text-sm text-muted-foreground">FTD Amount</Label>
            <p className="font-medium">${form.watch('ftdAmount')}</p>
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-sm text-muted-foreground">FTD Date</Label>
            <p className="font-medium">{form.watch('ftdDate')}</p>
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-sm text-muted-foreground">
              Conversion Type
            </Label>
            <Badge variant="secondary" className="w-fit capitalize">
              {form.watch('conversionType')}
            </Badge>
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-sm text-muted-foreground">
              Deposit Method
            </Label>
            <Badge variant="outline" className="w-fit capitalize">
              {form.watch('depositMethod')}
            </Badge>
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-sm text-muted-foreground">Status</Label>
            <Badge variant="outline" className="w-fit capitalize">
              {form.watch('status')}
            </Badge>
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-sm text-muted-foreground">Created At</Label>
            <p className="font-medium">{form.watch('createdAt')}</p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------- */}
      {/* 3. Related Transactions */}
      {/* ------------------------------------------------- */}
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">Related Transactions</Label>

        <div className="bg-muted/30 p-4 rounded-lg border flex flex-col gap-4">
          {/* Deposits */}
          <div>
            <Label className="text-sm font-medium text-muted-foreground">
              Previous Deposits
            </Label>
            <div className="mt-2 flex flex-col gap-2">
              {relatedTransactions.deposits.map((t) => (
                <div
                  key={t.id}
                  className="flex justify-between border rounded-md bg-background p-3"
                >
                  <span className="text-sm">#{t.id}</span>
                  <span className="text-sm">
                    ${t.amount} — {t.method}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {t.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Withdrawals */}
          <div>
            <Label className="text-sm font-medium text-muted-foreground">
              Withdrawals
            </Label>
            <div className="mt-2 flex flex-col gap-2">
              {relatedTransactions.withdrawals.map((t) => (
                <div
                  key={t.id}
                  className="flex justify-between border rounded-md bg-background p-3"
                >
                  <span className="text-sm">#{t.id}</span>
                  <span className="text-sm">${t.amount}</span>
                  <span className="text-xs text-muted-foreground">
                    {t.method} — {t.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Internal Transfers */}
          <div>
            <Label className="text-sm font-medium text-muted-foreground">
              Internal Transfers
            </Label>
            <div className="mt-2 flex flex-col gap-2">
              {relatedTransactions.transfers.map((t) => (
                <div
                  key={t.id}
                  className="flex justify-between border rounded-md bg-background p-3"
                >
                  <span className="text-sm">#{t.id}</span>
                  <span className="text-sm">${t.amount}</span>
                  <span className="text-xs text-muted-foreground">
                    {t.from} → {t.to} ({t.date})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------- */}
      {/* 4. Notes & Follow-Up */}
      {/* ------------------------------------------------- */}
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">Notes & Follow-up</Label>

        <div className="bg-muted/30 border rounded-lg p-4 flex flex-col gap-4">
          <Textarea
            placeholder="Add note..."
            className="min-h-[100px] resize-none"
            {...register('notes')}
          />
          <div className="flex justify-end">
            <Button size="sm">Save Note</Button>
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
                      2025-10-29 15:30
                    </span>
                  </div>
                </div>
                <p className="text-sm text-foreground mt-1">
                  Initial contact made with the client.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------- */}
      {/* 5. Status & Actions */}
      {/* ------------------------------------------------- */}
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">Status & Actions</Label>

        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="flex flex-col gap-2">
            <Label>FTD Status</Label>
            <Badge variant="outline" className="w-fit capitalize">
              {form.watch('status')}
            </Badge>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Conversion Type</Label>
            <Badge variant="secondary" className="w-fit capitalize">
              {form.watch('conversionType')}
            </Badge>
          </div>
        </div>

        <Button size="sm" variant="outline" className="text-destructive">
          Delete FTD Record
        </Button>
      </div>
    </form>
  );
};

export default function SingleFTDPage() {
  return (
    <div data-testid="single-ftd-page" className="relative space-y-6">
      <div className="sticky top-0 flex flex-col bg-background z-10 shadow-sm">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-2xl font-semibold">FTD Details</h2>
          <Button>Save Changes</Button>
        </div>
        <Separator />
      </div>

      <SingleFtdClientForm />
    </div>
  );
}
