import {
  Label,
  Input,
  Textarea,
  Badge,
  Button,
  Separator,
  Form,
} from '@apollo/ui';
import { useForm } from 'react-hook-form';

type SlTpFormValues = {
  stopLoss: number | null;
  takeProfit: number | null;
  notes: string | null;
};

export default function OrderDetailsPage() {
  const form = useForm<SlTpFormValues>({
    defaultValues: {
      stopLoss: 1.12,
      takeProfit: 1.14,
      notes: '',
    },
  });

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div data-testid="order-details-page" className="space-y-6">
      {/* HEADER */}
      <div className="sticky top-0 bg-background z-10">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-2xl font-semibold">Order Details</h2>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="capitalize">
              open
            </Badge>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => navigator.clipboard?.writeText('ORD-1007')}
            >
              Copy ID
            </Button>
          </div>
        </div>

        <Separator />
      </div>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
        {/* LEFT SECTION */}
        <div className="flex flex-col gap-6">
          {/* ORDER OVERVIEW */}
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Order Overview</Label>

            <div className="grid grid-cols-2 gap-3 bg-muted/30 p-4 rounded-lg border">
              {[
                ['Order ID', 'ORD-1007'],
                ['Ticket', 'MT5-457892'],
                ['Client', 'Ethan Brown  —  #85781'],
                ['Symbol', 'EURUSD'],
                [
                  'Type',
                  <Badge
                    key="type"
                    variant="secondary"
                    className="capitalize w-fit"
                  >
                    buy
                  </Badge>,
                ],
                ['Volume', '1.00 lots'],
                ['Opened At', '2025-10-23 15:29'],
                ['Status', 'Open'],
              ].map(([label, value], idx) => (
                <div key={idx}>
                  <Label className="text-sm text-muted-foreground">
                    {label}
                  </Label>
                  <div className="font-medium">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* PRICING & EXECUTION */}
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Pricing & Execution</Label>

            <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg border">
              {[
                ['Open Price', '1.12845'],
                ['Current Price', '1.13012'],
                ['Close Price', '—'],
                [
                  'Profit / P&L',
                  <span key="pnl" className="text-green-600 font-medium">
                    +$167.34
                  </span>,
                ],
                ['Commission', '$2.50'],
                ['Swap', '-0.10'],
                ['Required Margin', '$289.78'],
                ['Leverage', '1:100'],
              ].map(([label, value], idx) => (
                <div key={idx}>
                  <Label className="text-sm text-muted-foreground">
                    {label}
                  </Label>
                  <div className="font-medium">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* STOP LOSS / TAKE PROFIT */}
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">
              Stop Loss & Take Profit (Admin)
            </Label>

            <Form {...form}>
              <form className="grid grid-cols-1 gap-3">
                <div className="grid grid-cols-2 gap-3 items-end">
                  {/* SL */}
                  <div className="flex flex-col gap-2">
                    <Label className="text-sm text-muted-foreground">
                      Stop Loss
                    </Label>
                    <Input
                      type="number"
                      step="0.00001"
                      {...register('stopLoss', { valueAsNumber: true })}
                    />
                    {errors.stopLoss && (
                      <p className="text-destructive text-sm">
                        Invalid Stop Loss
                      </p>
                    )}
                  </div>

                  {/* TP */}
                  <div className="flex flex-col gap-2">
                    <Label className="text-sm text-muted-foreground">
                      Take Profit
                    </Label>
                    <Input
                      type="number"
                      step="0.00001"
                      {...register('takeProfit', { valueAsNumber: true })}
                    />
                    {errors.takeProfit && (
                      <p className="text-destructive text-sm">
                        Invalid Take Profit
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button size="sm" disabled={false}>
                    Save SL/TP
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-col gap-6">
          {/* CLIENT SUMMARY */}
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Client Summary</Label>

            <div className="bg-muted/30 p-4 rounded-lg border grid grid-cols-2 gap-3">
              {[
                ['Name', 'Ethan Brown'],
                ['Account ID', '85781'],
                ['Account Type', 'Real'],
                ['Balance', '$10,082.00'],
                ['Margin Level', '1736.57%'],
                ['Assigned Agent', 'No Agent'],
              ].map(([label, value], idx) => (
                <div key={idx}>
                  <Label className="text-sm text-muted-foreground">
                    {label}
                  </Label>
                  <div className="font-medium">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ORDER LOGS */}
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Order Logs</Label>

            <div className="bg-muted/30 p-3 rounded-lg border">
              <div className="grid grid-cols-3 gap-2 text-sm font-medium text-muted-foreground border-b pb-2 mb-2">
                <div>Time</div>
                <div>Action</div>
                <div className="text-right">Value</div>
              </div>

              {[
                [
                  '2025-10-23 15:29',
                  'Order Placed',
                  'Buy 1.00 EURUSD @ 1.12845',
                ],
                ['2025-10-23 15:35', 'SL Modified', 'SL 1.11900 → 1.12000'],
                ['2025-10-23 16:05', 'Server Exec', 'Executed on Server A'],
              ].map(([t, a, v], idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-3 gap-2 items-start text-sm"
                >
                  <div className="text-xs text-muted-foreground">{t}</div>
                  <div>{a}</div>
                  <div className="text-right text-muted-foreground">{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* FOLLOW UP & NOTES */}
          <div className="flex flex-col gap-2">
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
                    <div className="text-xs flex gap-2 items-center">
                      <Badge variant="secondary" className="text-xs">
                        admin
                      </Badge>
                      <span className="text-muted-foreground">
                        2025-10-29 15:30
                      </span>
                    </div>

                    <p className="text-sm mt-1">Test comment content here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
