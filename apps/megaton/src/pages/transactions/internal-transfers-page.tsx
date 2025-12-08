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
import { CalendarIcon, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { countries, RoutePath } from '@apollo/constants';

/* ================================
   FILTER DATA
=================================== */

const walletTypes = [
  { value: 'all', label: 'All Wallets' },
  { value: 'main', label: 'Main Wallet' },
  { value: 'bonus', label: 'Bonus Wallet' },
  { value: 'trading', label: 'Trading Wallet' },
];

const transferStatuses = [
  { value: 'all', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

/* Dummy Data */
const transfersData = [
  {
    id: 'TRF-0001',
    clientName: 'John Smith',
    country: 'United States',
    fromWallet: 'Main',
    toWallet: 'Trading',
    amount: 250,
    currency: 'USD',
    status: 'Approved',
    agent: 'Sales 1',
    createdAt: '2025-10-24 14:20',
  },
  {
    id: 'TRF-0002',
    clientName: 'Maria Garcia',
    country: 'Spain',
    fromWallet: 'Bonus',
    toWallet: 'Trading',
    amount: 500,
    currency: 'EUR',
    status: 'Pending',
    agent: 'Sales 2',
    createdAt: '2025-10-22 09:10',
  },
  {
    id: 'TRF-0003',
    clientName: 'James Lee',
    country: 'Philippines',
    fromWallet: 'Main',
    toWallet: 'Bonus',
    amount: 100,
    currency: 'USD',
    status: 'Rejected',
    agent: 'Sales 3',
    createdAt: '2025-10-20 18:40',
  },
];

const statusVariant = {
  Approved: 'default',
  Pending: 'secondary',
  Rejected: 'destructive',
};

/* ================================
   FILTER FORM
=================================== */
const InternalTransfersFilterForm = () => {
  const form = useForm({
    defaultValues: {
      keyword: '',
      fromWallet: 'all',
      toWallet: 'all',
      status: 'all',
      country: [],
      dateRange: undefined,
      minAmount: '',
      maxAmount: '',
    },
  });

  return (
    <Form {...form}>
      <form className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
        {/* Keyword Search */}
        <Input
          placeholder="Search name, email, client ID, transaction"
          {...form.register('keyword')}
        />

        {/* From Wallet */}
        <FormField
          control={form.control}
          name="fromWallet"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="From Wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    {walletTypes.map((w) => (
                      <SelectItem key={w.value} value={w.value}>
                        {w.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        {/* To Wallet */}
        <FormField
          control={form.control}
          name="toWallet"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="To Wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    {walletTypes.map((w) => (
                      <SelectItem key={w.value} value={w.value}>
                        {w.label}
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
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {transferStatuses.map((s) => (
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
                  />
                )}
              />
            </FormItem>
          )}
        />

        {/* Amount Range */}
        <div className="flex items-center gap-2">
          <Input placeholder="Min Amount" {...form.register('minAmount')} />
          <Input placeholder="Max Amount" {...form.register('maxAmount')} />
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
                      className="justify-start text-left"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value?.from
                        ? field.value.to
                          ? `${format(
                              field.value.from,
                              'LLL dd, y'
                            )} - ${format(field.value.to, 'LLL dd, y')}`
                          : format(field.value.from, 'LLL dd, y')
                        : 'Transfer Date Range'}
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

/* ================================
   TABLE
=================================== */
const InternalTransfersTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center w-[60px]">#</TableHead>
          <TableHead className="min-w-40">Transfer ID</TableHead>
          <TableHead className="min-w-48">Client Name</TableHead>
          <TableHead className="min-w-40 hidden md:table-cell">
            Country
          </TableHead>
          <TableHead className="min-w-40">From</TableHead>
          <TableHead className="min-w-40">To</TableHead>
          <TableHead className="min-w-32">Amount</TableHead>
          <TableHead className="hidden md:table-cell">Currency</TableHead>
          <TableHead className="min-w-32">Status</TableHead>
          <TableHead className="hidden md:table-cell">Agent</TableHead>
          <TableHead className="min-w-40">Created At</TableHead>
          <TableHead className="text-right min-w-[80px]"></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {transfersData.map((t, i) => (
          <TableRow key={t.id} className="hover:bg-muted/50 transition">
            <TableCell className="text-center font-medium">{i + 1}</TableCell>

            <TableCell className="font-medium">{t.id}</TableCell>
            <TableCell>{t.clientName}</TableCell>

            <TableCell className="hidden md:table-cell">{t.country}</TableCell>

            <TableCell>{t.fromWallet}</TableCell>
            <TableCell>{t.toWallet}</TableCell>

            <TableCell>${t.amount.toLocaleString()}</TableCell>
            <TableCell className="hidden md:table-cell">{t.currency}</TableCell>

            <TableCell>
              <Badge
                variant={statusVariant[t.status] || 'secondary'}
                className="capitalize"
              >
                {t.status}
              </Badge>
            </TableCell>

            <TableCell className="hidden md:table-cell">{t.agent}</TableCell>
            <TableCell>{t.createdAt}</TableCell>

            <TableCell className="text-right">
              <a href={RoutePath.InternalTransfer('123456789')}>
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

/* ================================
   PAGE
=================================== */
export default function InternalTransfersPage() {
  return (
    <section className="p-4 space-y-6">
      <h2 className="text-2xl font-semibold">Internal Transfers</h2>

      <InternalTransfersFilterForm />

      <div className="relative w-full">
        <div className="absolute left-0 top-0 w-full space-y-4 pb-4">
          <div className="rounded-md border">
            <InternalTransfersTable />
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  );
}
