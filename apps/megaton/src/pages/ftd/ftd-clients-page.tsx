// TODO: FTD Clients Page – mirrors LeadsPage structure exactly (updated: depositMethod + 18 items)
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
  Table,
  TableHead,
  TableHeader,
  TableRow,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PopoverContent,
  Popover,
  PopoverTrigger,
  Calendar,
  TableBody,
  TableCell,
  Badge,
  ReactSelectBase,
} from '@apollo/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { CalendarIcon, Eye, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { countries, RoutePath } from '@apollo/constants';

// ---------------------------------------------
// DUMMY SELECT OPTIONS (same as leads + buyers + deposit methods)
// ---------------------------------------------
const agents = [
  {
    label: 'Agents',
    options: [
      { value: 'manager-1', label: 'Manager 1' },
      { value: 'manager-2', label: 'Manager 2' },
      { value: 'sales-1', label: 'Sales 1' },
      { value: 'sales-2', label: 'Sales 2' },
      { value: 'sales-3', label: 'Sales 3' },
    ],
  },
];

const buyers = [
  {
    label: 'Buyers / Clients',
    options: [
      { value: 'broker-a', label: 'Broker A' },
      { value: 'broker-b', label: 'Broker B' },
      { value: 'broker-c', label: 'Broker C' },
      { value: 'client-x', label: 'Client X' },
      { value: 'client-y', label: 'Client Y' },
    ],
  },
];

const depositMethods = [
  { value: 'credit-card', label: 'Credit Card' },
  { value: 'visa', label: 'Visa' },
  { value: 'mastercard', label: 'Mastercard' },
  { value: 'bank-transfer', label: 'Bank Transfer' },
  { value: 'wire-transfer', label: 'Wire Transfer' },
  { value: 'crypto-btc', label: 'Crypto (BTC)' },
  { value: 'crypto-eth', label: 'Crypto (ETH)' },
  { value: 'crypto-usdt', label: 'Crypto (USDT)' },
  { value: 'skrill', label: 'Skrill' },
  { value: 'neteller', label: 'Neteller' },
  { value: 'paypal', label: 'PayPal' },
];

// ---------------------------------------------
// FILTER FORM SCHEMA (Advanced Option B + depositMethod)
// ---------------------------------------------
const ftdFilterFormSchema = z.object({
  keyword: z.string(),
  agents: z.array(z.object({ value: z.string(), label: z.string() })),
  countries: z.array(z.object({ value: z.string(), label: z.string() })),
  buyers: z.array(z.object({ value: z.string(), label: z.string() })),
  dateRange: z
    .object({
      from: z.date(),
      to: z.date().optional(),
    })
    .optional(),
  status: z.string(),
  conversionType: z.string(),
  minAmount: z.string().optional(),
  maxAmount: z.string().optional(),
  depositMethod: z.string(),
});

type FtdFilterFormValues = z.infer<typeof ftdFilterFormSchema>;

// ---------------------------------------------
// FILTER FORM COMPONENT
// ---------------------------------------------
export const FtdFilterForm = () => {
  const form = useForm<FtdFilterFormValues>({
    defaultValues: {
      keyword: '',
      agents: [],
      countries: [],
      buyers: [],
      status: 'all',
      conversionType: 'all',
      minAmount: '',
      maxAmount: '',
      depositMethod: 'all',
    },
    resolver: zodResolver(ftdFilterFormSchema),
  });

  return (
    <Form {...form}>
      <form className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
        {/* Keyword */}
        <Input
          placeholder="Search name, email, or lead ID"
          {...form.register('keyword')}
        />

        {/* Agents */}
        <FormField
          control={form.control}
          name="agents"
          render={() => (
            <FormItem>
              <Controller
                control={form.control}
                name="agents"
                render={({ field }) => (
                  <ReactSelectBase
                    {...field}
                    isMulti
                    placeholder="Select agents"
                    options={agents}
                    onChange={(val) => field.onChange(val)}
                  />
                )}
              />
            </FormItem>
          )}
        />

        {/* Countries */}
        <FormField
          control={form.control}
          name="countries"
          render={() => (
            <FormItem>
              <Controller
                control={form.control}
                name="countries"
                render={({ field }) => (
                  <ReactSelectBase
                    {...field}
                    isMulti
                    placeholder="Select countries"
                    options={countries}
                    onChange={(val) => field.onChange(val)}
                  />
                )}
              />
            </FormItem>
          )}
        />

        {/* Buyer / Client */}
        <FormField
          control={form.control}
          name="buyers"
          render={() => (
            <FormItem>
              <Controller
                control={form.control}
                name="buyers"
                render={({ field }) => (
                  <ReactSelectBase
                    {...field}
                    isMulti
                    placeholder="Select buyers / clients"
                    options={buyers}
                    onChange={(val) => field.onChange(val)}
                  />
                )}
              />
            </FormItem>
          )}
        />

        {/* FTD Status Select */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="FTD Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="duplicate">Duplicate</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Conversion Type */}
        <FormField
          control={form.control}
          name="conversionType"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Conversion Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="cpa">CPA</SelectItem>
                    <SelectItem value="rs">Revenue Share</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Deposit Method (new) */}
        <FormField
          control={form.control}
          name="depositMethod"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Deposit Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    {depositMethods.map((m) => (
                      <SelectItem key={m.value} value={m.value}>
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

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
                          ? field.value.from.getTime() ===
                            field.value.to.getTime()
                            ? format(field.value.from, 'LLL dd, y')
                            : `${format(
                                field.value.from,
                                'LLL dd, y'
                              )} - ${format(field.value.to, 'LLL dd, y')}`
                          : format(field.value.from, 'LLL dd, y')
                        : 'FTD Date (range)'}
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="range"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />

        {/* Amount Min */}
        <Input
          type="number"
          placeholder="Min Amount"
          {...form.register('minAmount')}
        />

        {/* Amount Max */}
        <Input
          type="number"
          placeholder="Max Amount"
          {...form.register('maxAmount')}
        />

        {/* Reset */}
        <Button onClick={() => form.reset()} type="button">
          Reset Filters
        </Button>

        {/* Export */}
        <Button type="button">Export Data</Button>
      </form>
    </Form>
  );
};

// ---------------------------------------------
// DUMMY FTD DATA (18 items, includes depositMethod)
// ---------------------------------------------
const ftdData = [
  {
    id: 'FTD-001',
    leadId: 'LD-001',
    name: 'John Smith',
    email: 'john.smith@example.com',
    country: 'United States',
    buyer: 'Broker A',
    ftdAmount: 250,
    ftdDate: '2025-10-20',
    conversionType: 'cpa',
    status: 'confirmed',
    agent: 'Sales 1',
    depositMethod: 'visa',
    createdAt: '2025-10-21',
  },
  {
    id: 'FTD-002',
    leadId: 'LD-002',
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    country: 'Spain',
    buyer: 'Broker B',
    ftdAmount: 320,
    ftdDate: '2025-10-19',
    conversionType: 'rs',
    status: 'pending',
    agent: 'Sales 1',
    depositMethod: 'mastercard',
    createdAt: '2025-10-19',
  },
  {
    id: 'FTD-003',
    leadId: 'LD-003',
    name: 'James Lee',
    email: 'james.lee@example.com',
    country: 'Philippines',
    buyer: 'Client X',
    ftdAmount: 120,
    ftdDate: '2025-10-18',
    conversionType: 'hybrid',
    status: 'confirmed',
    agent: 'Sales 1',
    depositMethod: 'crypto-btc',
    createdAt: '2025-10-18',
  },
  {
    id: 'FTD-004',
    leadId: 'LD-004',
    name: 'Sofia Martinez',
    email: 'sofia.martinez@example.com',
    country: 'Mexico',
    buyer: 'Broker A',
    ftdAmount: 80,
    ftdDate: '2025-10-17',
    conversionType: 'cpa',
    status: 'rejected',
    agent: 'Sales 2',
    depositMethod: 'bank-transfer',
    createdAt: '2025-10-17',
  },
  {
    id: 'FTD-005',
    leadId: 'LD-005',
    name: 'David Kim',
    email: 'david.kim@example.com',
    country: 'South Korea',
    buyer: 'Broker C',
    ftdAmount: 400,
    ftdDate: '2025-10-15',
    conversionType: 'rs',
    status: 'confirmed',
    agent: 'Sales 1',
    depositMethod: 'paypal',
    createdAt: '2025-10-16',
  },
  {
    id: 'FTD-006',
    leadId: 'LD-006',
    name: 'Emma Johnson',
    email: 'emma.johnson@example.com',
    country: 'United Kingdom',
    buyer: 'Client Y',
    ftdAmount: 210,
    ftdDate: '2025-10-14',
    conversionType: 'cpa',
    status: 'confirmed',
    agent: 'Sales 3',
    depositMethod: 'skrill',
    createdAt: '2025-10-14',
  },
  {
    id: 'FTD-007',
    leadId: 'LD-007',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@example.com',
    country: 'United Arab Emirates',
    buyer: 'Broker B',
    ftdAmount: 500,
    ftdDate: '2025-10-13',
    conversionType: 'hybrid',
    status: 'pending',
    agent: 'Sales 2',
    depositMethod: 'wire-transfer',
    createdAt: '2025-10-13',
  },
  {
    id: 'FTD-008',
    leadId: 'LD-008',
    name: 'Luca Bianchi',
    email: 'luca.bianchi@example.com',
    country: 'Italy',
    buyer: 'Broker A',
    ftdAmount: 150,
    ftdDate: '2025-10-12',
    conversionType: 'cpa',
    status: 'confirmed',
    agent: 'Sales 1',
    depositMethod: 'credit-card',
    createdAt: '2025-10-12',
  },
  {
    id: 'FTD-009',
    leadId: 'LD-009',
    name: 'Hiroshi Tanaka',
    email: 'hiroshi.tanaka@example.com',
    country: 'Japan',
    buyer: 'Client X',
    ftdAmount: 75,
    ftdDate: '2025-10-11',
    conversionType: 'rs',
    status: 'duplicate',
    agent: 'Sales 3',
    depositMethod: 'crypto-eth',
    createdAt: '2025-10-11',
  },
  {
    id: 'FTD-010',
    leadId: 'LD-010',
    name: 'Olivia Brown',
    email: 'olivia.brown@example.com',
    country: 'Australia',
    buyer: 'Client X',
    ftdAmount: 220,
    ftdDate: '2025-10-09',
    conversionType: 'cpa',
    status: 'confirmed',
    agent: 'Sales 1',
    depositMethod: 'neteller',
    createdAt: '2025-10-10',
  },
  {
    id: 'FTD-011',
    leadId: 'LD-011',
    name: 'Noah Davis',
    email: 'noah.davis@example.com',
    country: 'Canada',
    buyer: 'Broker C',
    ftdAmount: 190,
    ftdDate: '2025-10-08',
    conversionType: 'hybrid',
    status: 'pending',
    agent: 'Sales 2',
    depositMethod: 'visa',
    createdAt: '2025-10-08',
  },
  {
    id: 'FTD-012',
    leadId: 'LD-012',
    name: 'Fatima Ali',
    email: 'fatima.ali@example.com',
    country: 'Pakistan',
    buyer: 'Broker B',
    ftdAmount: 95,
    ftdDate: '2025-10-06',
    conversionType: 'rs',
    status: 'confirmed',
    agent: 'Sales 3',
    depositMethod: 'crypto-usdt',
    createdAt: '2025-10-06',
  },
  {
    id: 'FTD-013',
    leadId: 'LD-013',
    name: 'Carlos Hernandez',
    email: 'carlos.hernandez@example.com',
    country: 'Colombia',
    buyer: 'Broker A',
    ftdAmount: 310,
    ftdDate: '2025-10-05',
    conversionType: 'cpa',
    status: 'confirmed',
    agent: 'Sales 1',
    depositMethod: 'bank-transfer',
    createdAt: '2025-10-05',
  },
  {
    id: 'FTD-014',
    leadId: 'LD-014',
    name: 'Anika Patel',
    email: 'anika.patel@example.com',
    country: 'India',
    buyer: 'Client Y',
    ftdAmount: 55,
    ftdDate: '2025-10-03',
    conversionType: 'rs',
    status: 'rejected',
    agent: 'Sales 2',
    depositMethod: 'paypal',
    createdAt: '2025-10-03',
  },
  {
    id: 'FTD-015',
    leadId: 'LD-015',
    name: 'Mark Evans',
    email: 'mark.evans@example.com',
    country: 'New Zealand',
    buyer: 'Broker C',
    ftdAmount: 135,
    ftdDate: '2025-10-02',
    conversionType: 'hybrid',
    status: 'confirmed',
    agent: 'Sales 1',
    depositMethod: 'credit-card',
    createdAt: '2025-10-02',
  },
  {
    id: 'FTD-016',
    leadId: 'LD-016',
    name: 'Chen Wei',
    email: 'chen.wei@example.com',
    country: 'China',
    buyer: 'Broker B',
    ftdAmount: 470,
    ftdDate: '2025-09-30',
    conversionType: 'cpa',
    status: 'confirmed',
    agent: 'Sales 3',
    depositMethod: 'crypto-btc',
    createdAt: '2025-09-30',
  },
  {
    id: 'FTD-017',
    leadId: 'LD-017',
    name: 'Julia Novak',
    email: 'julia.novak@example.com',
    country: 'Czech Republic',
    buyer: 'Broker A',
    ftdAmount: 65,
    ftdDate: '2025-09-29',
    conversionType: 'rs',
    status: 'pending',
    agent: 'Sales 2',
    depositMethod: 'skrill',
    createdAt: '2025-09-29',
  },
  {
    id: 'FTD-018',
    leadId: 'LD-018',
    name: 'Ali Khan',
    email: 'ali.khan@example.com',
    country: 'UAE',
    buyer: 'Client X',
    ftdAmount: 285,
    ftdDate: '2025-09-27',
    conversionType: 'hybrid',
    status: 'confirmed',
    agent: 'Sales 1',
    depositMethod: 'mastercard',
    createdAt: '2025-09-27',
  },
];

// ---------------------------------------------
// TABLE COMPONENT (includes Deposit Method column)
// ---------------------------------------------
const FtdTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60px] text-center">#</TableHead>
          <TableHead className="min-w-48">Name</TableHead>
          <TableHead className="min-w-56 hidden md:table-cell">Email</TableHead>
          <TableHead className="min-w-40">Country</TableHead>
          <TableHead className="min-w-40 hidden lg:table-cell">Buyer</TableHead>
          <TableHead className="min-w-32 hidden md:table-cell">
            FTD Amount
          </TableHead>
          <TableHead className="min-w-40 hidden md:table-cell">
            FTD Date
          </TableHead>
          <TableHead className="min-w-36 hidden md:table-cell">
            Deposit Method
          </TableHead>
          <TableHead className="min-w-40 hidden md:table-cell">Type</TableHead>
          <TableHead className="min-w-40 hidden md:table-cell">Agent</TableHead>
          <TableHead className="min-w-32 hidden md:table-cell">
            Status
          </TableHead>
          <TableHead className="min-w-40 hidden md:table-cell">
            Created At
          </TableHead>
          <TableHead className="w-[100px] text-right"></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {ftdData.map((item, i) => (
          <TableRow
            key={item.id}
            className="hover:bg-muted/50 transition-colors"
          >
            <TableCell className="text-center font-medium">{i + 1}</TableCell>

            <TableCell className="font-medium">
              {' '}
              <a href={`${RoutePath.FTDClients}/123456789`}>{item.name}</a>{' '}
            </TableCell>

            <TableCell className="hidden md:table-cell">{item.email}</TableCell>

            <TableCell>{item.country}</TableCell>

            <TableCell className="hidden lg:table-cell">{item.buyer}</TableCell>

            <TableCell className="hidden md:table-cell">
              ${item.ftdAmount}
            </TableCell>

            <TableCell className="hidden md:table-cell">
              {item.ftdDate}
            </TableCell>

            <TableCell className="hidden md:table-cell capitalize">
              {/* show friendly label if possible */}
              {item.depositMethod}
            </TableCell>

            <TableCell className="hidden md:table-cell">
              <Badge variant="secondary" className="capitalize">
                {item.conversionType}
              </Badge>
            </TableCell>

            <TableCell className="hidden md:table-cell">{item.agent}</TableCell>

            <TableCell className="hidden md:table-cell">
              <Badge variant="outline" className="capitalize">
                {item.status}
              </Badge>
            </TableCell>

            <TableCell className="hidden md:table-cell text-muted-foreground">
              {item.createdAt}
            </TableCell>

            <TableCell className="text-right">
              <div className="flex justify-end gap-1">
                <Button size="icon" variant="ghost">
                  <a href={`${RoutePath.FTDClients}/123456789`}>
                    <Eye className="h-4 w-4" />
                  </a>
                </Button>

                <Button size="icon" variant="ghost">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

// ---------------------------------------------
// PAGINATION (same exact component as Leads)
// ---------------------------------------------
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

// ---------------------------------------------
// MAIN PAGE COMPONENT
// ---------------------------------------------
export default function FtdClientsPage() {
  return (
    <section data-testid="ftd-clients-page" className="p-4 space-y-6">
      <h2 className="text-2xl font-semibold">FTD Clients</h2>

      <FtdFilterForm />

      <div className="relative w-full">
        <div className="absolute space-y-4 left-0 top-0 w-full pb-4">
          <div className="rounded-md border">
            <FtdTable />
          </div>

          <TablePagination />
        </div>
      </div>
    </section>
  );
}
