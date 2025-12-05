import {
  Label,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Textarea,
  Button,
  Separator,
  Form,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Calendar,
} from '@apollo/ui';

import { Controller, useForm } from 'react-hook-form';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

const instruments = ['EURUSD', 'GBPUSD', 'XAUUSD', 'BTCUSD'];
const orderTypes = ['buy', 'sell'];
const executionModes = ['Market', 'Pending'];
const agents = ['Manager 1', 'Manager 2', 'Sales 1'];

type CreateOrderFormValues = {
  clientAccount: string;
  symbol: string;
  type: string;
  volume: number;
  executionType: string;
  openPrice: number | null;
  stopLoss: number | null;
  takeProfit: number | null;
  assignedAgent?: string;
  notes: string;
  executionDate?: Date;
};

export default function CreateOrderPage() {
  const form = useForm<CreateOrderFormValues>({
    defaultValues: {
      clientAccount: '',
      symbol: '',
      type: '',
      volume: 0.01,
      executionType: 'Market',
      openPrice: null,
      stopLoss: null,
      takeProfit: null,
      assignedAgent: undefined,
      notes: '',
      executionDate: new Date(),
    },
  });

  const { register, handleSubmit, control } = form;

  const onSubmit = (data: CreateOrderFormValues) => {
    console.log('Creating order…', data);
  };

  return (
    <div data-testid="create-order-page" className="relative space-y-6">
      {/* Sticky Header */}
      <div className="sticky top-0 flex flex-col bg-background z-10 shadow-sm">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-2xl font-semibold">Create Order</h2>

          <Button onClick={handleSubmit(onSubmit)}>Submit Order</Button>
        </div>
        <Separator />
      </div>

      {/* Form */}
      <Form {...form}>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
          {/* --- ORDER SETUP --- */}
          <div className="flex flex-col gap-4">
            <Label className="text-muted-foreground">Order Information</Label>

            <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 border rounded-lg">
              {/* Account */}
              <div className="flex flex-col gap-2">
                <Label>Client Account</Label>
                <Input
                  placeholder="Enter Account ID"
                  {...register('clientAccount')}
                />
              </div>

              {/* Symbol */}
              <div className="flex flex-col gap-2">
                <Label>Symbol</Label>
                <Select {...register('symbol')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select instrument" />
                  </SelectTrigger>
                  <SelectContent>
                    {instruments.map((i) => (
                      <SelectItem key={i} value={i}>
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Order Type */}
              <div className="flex flex-col gap-2">
                <Label>Order Type</Label>
                <Select {...register('type')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {orderTypes.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Volume */}
              <div className="flex flex-col gap-2">
                <Label>Volume (lots)</Label>
                <Input type="number" step="0.01" {...register('volume')} />
              </div>

              {/* Execution Type */}
              <div className="flex flex-col gap-2">
                <Label>Execution Mode</Label>
                <Select {...register('executionType')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Market or Pending" />
                  </SelectTrigger>
                  <SelectContent>
                    {executionModes.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Execution Date */}
              <div className="flex flex-col gap-2">
                <Label>Execution Date</Label>
                <Controller
                  name="executionDate"
                  control={control}
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="justify-start">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(field.value, 'LLL dd, y')
                            : 'Pick date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </div>
            </div>
          </div>

          {/* --- EXECUTION SETTINGS --- */}
          <div className="flex flex-col gap-4">
            <Label className="text-muted-foreground">
              Execution & Risk Settings
            </Label>

            <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 border rounded-lg">
              {/* Open Price */}
              <div className="flex flex-col gap-2">
                <Label>Open Price (optional)</Label>
                <Input
                  type="number"
                  step="0.00001"
                  {...register('openPrice', { valueAsNumber: true })}
                />
              </div>

              {/* Stop Loss */}
              <div className="flex flex-col gap-2">
                <Label>Stop Loss</Label>
                <Input
                  type="number"
                  step="0.00001"
                  {...register('stopLoss', { valueAsNumber: true })}
                />
              </div>

              {/* Take Profit */}
              <div className="flex flex-col gap-2">
                <Label>Take Profit</Label>
                <Input
                  type="number"
                  step="0.00001"
                  {...register('takeProfit', { valueAsNumber: true })}
                />
              </div>

              {/* Assign Agent */}
              <div className="flex flex-col gap-2">
                <Label>Assign to Agent</Label>
                <Select {...register('assignedAgent')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Optional" />
                  </SelectTrigger>
                  <SelectContent>
                    {agents.map((a) => (
                      <SelectItem key={a} value={a}>
                        {a}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* --- NOTES --- */}
          <div className="flex flex-col gap-4 md:col-span-2">
            <Label className="text-muted-foreground">Admin Notes</Label>

            <div className="bg-muted/30 border rounded-lg p-4 flex flex-col gap-4">
              <Textarea
                placeholder="Write a note for this order..."
                {...register('notes')}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
