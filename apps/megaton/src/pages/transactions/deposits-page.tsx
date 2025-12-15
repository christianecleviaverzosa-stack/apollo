import {
  Form,
  FormField,
  FormItem,
  FormControl,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Calendar,
  ReactSelectBase,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Badge,
  Pagination,
  PaginationItem,
  PaginationContent,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from '@apollo/ui';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, Eye } from 'lucide-react';
import { format } from 'date-fns';
import z from 'zod';
import { countries, RoutePath } from '@apollo/constants';

const paymentMethods = [
  { value: 'all', label: 'All Payment Methods' },
  { value: 'visa', label: 'Visa / Mastercard' },
  { value: 'bank', label: 'Bank Transfer' },
  { value: 'crypto', label: 'Crypto USDT' },
];

const depositStatuses = [
  { value: 'all', label: 'All Statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

const currencies = [
  { value: 'all', label: 'All Currencies' },
  { value: 'usd', label: 'USD' },
  { value: 'eur', label: 'EUR' },
  { value: 'gbp', label: 'GBP' },
  { value: 'php', label: 'PHP' },
];

const transactionTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'deposit', label: 'Deposit' },
  { value: 'bonus', label: 'Bonus' },
];

const pspProviders = [
  { value: 'all', label: 'All Providers' },
  { value: 'stripe', label: 'Stripe' },
  { value: 'coinspaid', label: 'CoinsPaid' },
  { value: 'manual', label: 'Manual' },
];

const verificationFilter = [
  { value: 'all', label: 'Verified & Unverified' },
  { value: 'verified', label: 'Verified Only' },
  { value: 'unverified', label: 'Unverified Only' },
];



const depositsFilterSchema = z.object({
  keyword: z.string().optional(),
  paymentMethod: z.string(),
  status: z.string(),
  currency: z.string(),

  country: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),

  minAmount: z.string().optional(),
  maxAmount: z.string().optional(),

  dateRange: z
    .object({
      from: z.date(),
      to: z.date().optional(),
    })
    .optional(),
  transactionType: z.string(),
  psp: z.string(),
  verification: z.string(),
});

type DepositsFilterFormValues = z.infer<typeof depositsFilterSchema>;

const defaultValues: DepositsFilterFormValues = {
  keyword: '',
  paymentMethod: 'all',
  status: 'all',
  currency: 'all',

  country: [],
  minAmount: '',
  maxAmount: '',
  dateRange: undefined,

  transactionType: 'all',
  psp: 'all',
  verification: 'all',
};

export const DepositsFilterForm = () => {
  const form = useForm<DepositsFilterFormValues>({
    defaultValues,
    resolver: zodResolver(depositsFilterSchema),
  });

  return (
    <Form {...form}>
      <form className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
        {/* Keyword Search */}
        <Input
          placeholder="Search name, email, client ID, transaction"
          {...form.register('keyword')}
        />

        {/* Payment Method */}
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Payment Method" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((pm) => (
                      <SelectItem key={pm.value} value={pm.value}>
                        {pm.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Status */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    {depositStatuses.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Currency */}
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Country */}
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <Controller
                control={form.control}
                name="country"
                render={({ field }) => (
                  <ReactSelectBase
                    {...field}
                    isMulti
                    placeholder="Country"
                    options={countries}
                    onChange={(val) => field.onChange(val)}
                  />
                )}
              />
            </FormItem>
          )}
        />

        {/* Amount Range */}
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min Amount"
            {...form.register('minAmount')}
          />
          <Input
            type="number"
            placeholder="Max Amount"
            {...form.register('maxAmount')}
          />
        </div>

        {/* Date Range */}
        <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className="justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value?.from
                        ? field.value.to
                          ? `${format(
                              field.value.from,
                              'LLL dd, y'
                            )} - ${format(field.value.to, 'LLL dd, y')}`
                          : format(field.value.from, 'LLL dd, y')
                        : 'Deposit Date Range'}
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent align="end" className="w-auto p-0">
                  <Calendar
                    mode="range"
                    selected={field.value}
                    onSelect={field.onChange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />

        {/* Transaction Type */}
        <FormField
          control={form.control}
          name="transactionType"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Transaction Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {transactionTypes.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        {/* PSP Provider */}
        <FormField
          control={form.control}
          name="psp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Payment Provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {pspProviders.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Verification */}
        <FormField
          control={form.control}
          name="verification"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Verification Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {verificationFilter.map((v) => (
                      <SelectItem key={v.value} value={v.value}>
                        {v.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Reset */}
        <Button type="button" onClick={() => form.reset()}>
          Reset Filters
        </Button>

        {/* Export */}
        <Button type="button">Export</Button>
      </form>
    </Form>
  );
};

const depositsData = [
  {
    id: 'DP-0001',
    clientName: 'John Smith',
    country: 'United States',
    amount: 250,
    currency: 'USD',
    method: 'Credit Card',
    provider: 'Stripe',
    status: 'Completed',
    agent: 'Sales 1',
    createdAt: '2025-10-24 14:20',
  },
  {
    id: 'DP-0002',
    clientName: 'Maria Garcia',
    country: 'Spain',
    amount: 500,
    currency: 'EUR',
    method: 'Bank Transfer',
    provider: 'TrustPay',
    status: 'Pending',
    agent: 'Sales 2',
    createdAt: '2025-10-22 09:10',
  },
  {
    id: 'DP-0003',
    clientName: 'James Lee',
    country: 'Philippines',
    amount: 150,
    currency: 'USD',
    method: 'Crypto',
    provider: 'CoinPayments',
    status: 'Failed',
    agent: 'Sales 3',
    createdAt: '2025-10-20 18:40',
  },
];

const statusVariant = {
  Completed: 'default',
  Pending: 'secondary',
  Failed: 'destructive',
  Cancelled: 'destructive',
};

const DepositsTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60px] text-center">#</TableHead>

          <TableHead className="min-w-40">Transaction ID</TableHead>
          <TableHead className="min-w-48">Client Name</TableHead>
          <TableHead className="min-w-40 hidden md:table-cell">
            Country
          </TableHead>

          <TableHead className="min-w-32">Amount</TableHead>
          <TableHead className="min-w-24 hidden md:table-cell">
            Currency
          </TableHead>

          <TableHead className="min-w-48 hidden lg:table-cell">
            Payment Method
          </TableHead>
          <TableHead className="min-w-40 hidden lg:table-cell">
            Provider
          </TableHead>

          <TableHead className="min-w-32">Status</TableHead>

          <TableHead className="min-w-40 hidden md:table-cell">Agent</TableHead>

          <TableHead className="min-w-40 hidden md:table-cell">
            Created At
          </TableHead>

          <TableHead className="w-[80px] text-right"></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {depositsData.map((deposit, i) => (
          <TableRow
            key={deposit.id}
            className="hover:bg-muted/50 transition-colors"
          >
            <TableCell className="text-center font-medium">{i + 1}</TableCell>

            <TableCell className="font-medium">{deposit.id}</TableCell>

            <TableCell>{deposit.clientName}</TableCell>

            <TableCell className="hidden md:table-cell">
              {deposit.country}
            </TableCell>

            <TableCell className="font-medium">
              ${deposit.amount.toLocaleString()}
            </TableCell>

            <TableCell className="hidden md:table-cell">
              {deposit.currency}
            </TableCell>

            <TableCell className="hidden lg:table-cell">
              {deposit.method}
            </TableCell>

            <TableCell className="hidden lg:table-cell">
              {deposit.provider}
            </TableCell>

            <TableCell>
              <Badge
                variant={statusVariant[deposit.status] || 'secondary'}
                className="capitalize"
              >
                {deposit.status}
              </Badge>
            </TableCell>

            <TableCell className="hidden md:table-cell">
              {deposit.agent}
            </TableCell>

            <TableCell className="hidden md:table-cell text-muted-foreground">
              {deposit.createdAt}
            </TableCell>

            <TableCell className="text-right">
              <a href={`${RoutePath.Deposits}/${deposit.id}`}>
                <Button size="icon" variant="ghost">
                  <Eye className="h-4 w-4" />
                </Button>
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const TablePagination = () => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default function DepositsPage() {
  return (
    <section data-testid="deposits-page" className="p-4 space-y-6">
      <h2 className="text-2xl font-semibold">Deposits</h2>
      <DepositsFilterForm />
      <div className="relative w-full">
        <div className="absolute space-y-4 left-0 top-0 w-full pb-4">
          <div className="rounded-md border">
            <DepositsTable />
          </div>
          <TablePagination />
        </div>
      </div>
    </section>
  );
}
