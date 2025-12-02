// TODO: Retention Clients Page – full updated (descriptive labels for depositFrequency, riskLevel, retentionTier)
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

// -----------------------------
// Select Options (agents, countries, buyers)
// -----------------------------
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

// -----------------------------
// Friendly label mappings
// -----------------------------
const depositFrequencyLabels: Record<string, string> = {
  low: 'Low (1–2 deposits / month)',
  medium: 'Medium (3–5 deposits / month)',
  high: 'High (6+ deposits / month)',
};

const riskLevelLabels: Record<string, string> = {
  low: 'Low Risk (Stable)',
  medium: 'Medium Risk (Monitor)',
  high: 'High Risk (Churn Warning)',
};

const retentionTierLabels: Record<string, string> = {
  'tier-1': 'Tier 1 – Low Value',
  'tier-2': 'Tier 2 – Mid Value',
  'tier-3': 'Tier 3 – High Value',
  vip: 'VIP – Premium Client',
};

// -----------------------------
// Retention Filter Schema
// -----------------------------
const retentionFilterFormSchema = z.object({
  keyword: z.string(),
  agents: z.array(z.object({ value: z.string(), label: z.string() })),
  countries: z.array(z.object({ value: z.string(), label: z.string() })),
  buyers: z.array(z.object({ value: z.string(), label: z.string() })),
  status: z.string(),
  dateRange: z
    .object({
      from: z.date(),
      to: z.date().optional(),
    })
    .optional(),
  minTotalDeposit: z.string().optional(),
  maxTotalDeposit: z.string().optional(),
  depositFrequency: z.string(),
  riskLevel: z.string(),
});

type RetentionFilterFormValues = z.infer<typeof retentionFilterFormSchema>;

// -----------------------------
// Retention Filter Form
// -----------------------------
export const RetentionFilterForm = () => {
  const form = useForm<RetentionFilterFormValues>({
    defaultValues: {
      keyword: '',
      agents: [],
      countries: [],
      buyers: [],
      status: 'all',
      minTotalDeposit: '',
      maxTotalDeposit: '',
      depositFrequency: 'all',
      riskLevel: 'all',
    },
    resolver: zodResolver(retentionFilterFormSchema),
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

        {/* Buyers */}
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
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="churn-risk">Churn Risk</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Deposit Frequency (descriptive) */}
        <FormField
          control={form.control}
          name="depositFrequency"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Deposit Frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Frequency</SelectItem>
                    <SelectItem value="low">
                      {depositFrequencyLabels['low']}
                    </SelectItem>
                    <SelectItem value="medium">
                      {depositFrequencyLabels['medium']}
                    </SelectItem>
                    <SelectItem value="high">
                      {depositFrequencyLabels['high']}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Risk Level (descriptive) */}
        <FormField
          control={form.control}
          name="riskLevel"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Risk Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risk Level</SelectItem>
                    <SelectItem value="low">
                      {riskLevelLabels['low']}
                    </SelectItem>
                    <SelectItem value="medium">
                      {riskLevelLabels['medium']}
                    </SelectItem>
                    <SelectItem value="high">
                      {riskLevelLabels['high']}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Date Range (latest deposit) */}
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
                        : 'Latest Deposit (range)'}
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

        {/* Min Total Deposit */}
        <Input
          type="number"
          placeholder="Min Total Deposit"
          {...form.register('minTotalDeposit')}
        />

        {/* Max Total Deposit */}
        <Input
          type="number"
          placeholder="Max Total Deposit"
          {...form.register('maxTotalDeposit')}
        />

        {/* Reset & Export */}
        <Button onClick={() => form.reset()} type="button">
          Reset Filters
        </Button>
        <Button type="button">Export Data</Button>
      </form>
    </Form>
  );
};

// -----------------------------
// Dummy retention data (18 items)
// -----------------------------
const retentionData = [
  {
    id: 'RET-001',
    leadId: 'LD-001',
    name: 'John Smith',
    email: 'john.smith@example.com',
    country: 'United States',
    buyer: 'Broker A',
    totalDeposits: 5,
    lifetimeValue: 2400,
    latestDepositAmount: 600,
    latestDepositDate: '2025-11-05',
    depositFrequency: 'high',
    retentionTier: 'tier-2',
    riskLevel: 'low',
    status: 'active',
    agent: 'Sales 1',
    createdAt: '2025-10-21',
  },
  {
    id: 'RET-002',
    leadId: 'LD-002',
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    country: 'Spain',
    buyer: 'Broker B',
    totalDeposits: 2,
    lifetimeValue: 420,
    latestDepositAmount: 220,
    latestDepositDate: '2025-10-19',
    depositFrequency: 'medium',
    retentionTier: 'tier-1',
    riskLevel: 'medium',
    status: 'active',
    agent: 'Sales 1',
    createdAt: '2025-10-19',
  },
  {
    id: 'RET-003',
    leadId: 'LD-003',
    name: 'James Lee',
    email: 'james.lee@example.com',
    country: 'Philippines',
    buyer: 'Client X',
    totalDeposits: 8,
    lifetimeValue: 1850,
    latestDepositAmount: 400,
    latestDepositDate: '2025-10-28',
    depositFrequency: 'high',
    retentionTier: 'vip',
    riskLevel: 'low',
    status: 'active',
    agent: 'Sales 1',
    createdAt: '2025-10-18',
  },
  {
    id: 'RET-004',
    leadId: 'LD-004',
    name: 'Sofia Martinez',
    email: 'sofia.martinez@example.com',
    country: 'Mexico',
    buyer: 'Broker A',
    totalDeposits: 1,
    lifetimeValue: 80,
    latestDepositAmount: 80,
    latestDepositDate: '2025-10-17',
    depositFrequency: 'low',
    retentionTier: 'tier-1',
    riskLevel: 'high',
    status: 'inactive',
    agent: 'Sales 2',
    createdAt: '2025-10-17',
  },
  {
    id: 'RET-005',
    leadId: 'LD-005',
    name: 'David Kim',
    email: 'david.kim@example.com',
    country: 'South Korea',
    buyer: 'Broker C',
    totalDeposits: 6,
    lifetimeValue: 2200,
    latestDepositAmount: 450,
    latestDepositDate: '2025-11-01',
    depositFrequency: 'high',
    retentionTier: 'tier-2',
    riskLevel: 'low',
    status: 'active',
    agent: 'Sales 1',
    createdAt: '2025-10-16',
  },
  {
    id: 'RET-006',
    leadId: 'LD-006',
    name: 'Emma Johnson',
    email: 'emma.johnson@example.com',
    country: 'United Kingdom',
    buyer: 'Client Y',
    totalDeposits: 3,
    lifetimeValue: 610,
    latestDepositAmount: 300,
    latestDepositDate: '2025-10-14',
    depositFrequency: 'medium',
    retentionTier: 'tier-1',
    riskLevel: 'medium',
    status: 'active',
    agent: 'Sales 3',
    createdAt: '2025-10-14',
  },
  {
    id: 'RET-007',
    leadId: 'LD-007',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@example.com',
    country: 'United Arab Emirates',
    buyer: 'Broker B',
    totalDeposits: 4,
    lifetimeValue: 980,
    latestDepositAmount: 200,
    latestDepositDate: '2025-10-13',
    depositFrequency: 'medium',
    retentionTier: 'tier-2',
    riskLevel: 'low',
    status: 'active',
    agent: 'Sales 2',
    createdAt: '2025-10-13',
  },
  {
    id: 'RET-008',
    leadId: 'LD-008',
    name: 'Luca Bianchi',
    email: 'luca.bianchi@example.com',
    country: 'Italy',
    buyer: 'Broker A',
    totalDeposits: 2,
    lifetimeValue: 280,
    latestDepositAmount: 150,
    latestDepositDate: '2025-10-12',
    depositFrequency: 'low',
    retentionTier: 'tier-1',
    riskLevel: 'medium',
    status: 'active',
    agent: 'Sales 1',
    createdAt: '2025-10-12',
  },
  {
    id: 'RET-009',
    leadId: 'LD-009',
    name: 'Hiroshi Tanaka',
    email: 'hiroshi.tanaka@example.com',
    country: 'Japan',
    buyer: 'Client X',
    totalDeposits: 3,
    lifetimeValue: 310,
    latestDepositAmount: 75,
    latestDepositDate: '2025-10-11',
    depositFrequency: 'low',
    retentionTier: 'tier-1',
    riskLevel: 'medium',
    status: 'pending',
    agent: 'Sales 3',
    createdAt: '2025-10-11',
  },
  {
    id: 'RET-010',
    leadId: 'LD-010',
    name: 'Olivia Brown',
    email: 'olivia.brown@example.com',
    country: 'Australia',
    buyer: 'Client X',
    totalDeposits: 7,
    lifetimeValue: 1650,
    latestDepositAmount: 300,
    latestDepositDate: '2025-10-25',
    depositFrequency: 'high',
    retentionTier: 'tier-2',
    riskLevel: 'low',
    status: 'active',
    agent: 'Sales 1',
    createdAt: '2025-10-10',
  },
  {
    id: 'RET-011',
    leadId: 'LD-011',
    name: 'Noah Davis',
    email: 'noah.davis@example.com',
    country: 'Canada',
    buyer: 'Broker C',
    totalDeposits: 1,
    lifetimeValue: 190,
    latestDepositAmount: 190,
    latestDepositDate: '2025-10-08',
    depositFrequency: 'low',
    retentionTier: 'tier-1',
    riskLevel: 'high',
    status: 'inactive',
    agent: 'Sales 2',
    createdAt: '2025-10-08',
  },
  {
    id: 'RET-012',
    leadId: 'LD-012',
    name: 'Fatima Ali',
    email: 'fatima.ali@example.com',
    country: 'Pakistan',
    buyer: 'Broker B',
    totalDeposits: 4,
    lifetimeValue: 510,
    latestDepositAmount: 200,
    latestDepositDate: '2025-10-06',
    depositFrequency: 'medium',
    retentionTier: 'tier-2',
    riskLevel: 'medium',
    status: 'active',
    agent: 'Sales 3',
    createdAt: '2025-10-06',
  },
  {
    id: 'RET-013',
    leadId: 'LD-013',
    name: 'Carlos Hernandez',
    email: 'carlos.hernandez@example.com',
    country: 'Colombia',
    buyer: 'Broker A',
    totalDeposits: 5,
    lifetimeValue: 1550,
    latestDepositAmount: 400,
    latestDepositDate: '2025-10-05',
    depositFrequency: 'high',
    retentionTier: 'tier-2',
    riskLevel: 'low',
    status: 'active',
    agent: 'Sales 1',
    createdAt: '2025-10-05',
  },
  {
    id: 'RET-014',
    leadId: 'LD-014',
    name: 'Anika Patel',
    email: 'anika.patel@example.com',
    country: 'India',
    buyer: 'Client Y',
    totalDeposits: 2,
    lifetimeValue: 120,
    latestDepositAmount: 55,
    latestDepositDate: '2025-10-03',
    depositFrequency: 'low',
    retentionTier: 'tier-1',
    riskLevel: 'medium',
    status: 'rejected',
    agent: 'Sales 2',
    createdAt: '2025-10-03',
  },
  {
    id: 'RET-015',
    leadId: 'LD-015',
    name: 'Mark Evans',
    email: 'mark.evans@example.com',
    country: 'New Zealand',
    buyer: 'Broker C',
    totalDeposits: 3,
    lifetimeValue: 410,
    latestDepositAmount: 200,
    latestDepositDate: '2025-10-02',
    depositFrequency: 'medium',
    retentionTier: 'tier-1',
    riskLevel: 'low',
    status: 'active',
    agent: 'Sales 1',
    createdAt: '2025-10-02',
  },
  {
    id: 'RET-016',
    leadId: 'LD-016',
    name: 'Chen Wei',
    email: 'chen.wei@example.com',
    country: 'China',
    buyer: 'Broker B',
    totalDeposits: 9,
    lifetimeValue: 4200,
    latestDepositAmount: 700,
    latestDepositDate: '2025-11-02',
    depositFrequency: 'high',
    retentionTier: 'vip',
    riskLevel: 'low',
    status: 'active',
    agent: 'Sales 3',
    createdAt: '2025-09-30',
  },
  {
    id: 'RET-017',
    leadId: 'LD-017',
    name: 'Julia Novak',
    email: 'julia.novak@example.com',
    country: 'Czech Republic',
    buyer: 'Broker A',
    totalDeposits: 2,
    lifetimeValue: 130,
    latestDepositAmount: 65,
    latestDepositDate: '2025-09-29',
    depositFrequency: 'low',
    retentionTier: 'tier-1',
    riskLevel: 'medium',
    status: 'pending',
    agent: 'Sales 2',
    createdAt: '2025-09-29',
  },
  {
    id: 'RET-018',
    leadId: 'LD-018',
    name: 'Ali Khan',
    email: 'ali.khan@example.com',
    country: 'UAE',
    buyer: 'Client X',
    totalDeposits: 6,
    lifetimeValue: 2100,
    latestDepositAmount: 500,
    latestDepositDate: '2025-09-27',
    depositFrequency: 'high',
    retentionTier: 'tier-2',
    riskLevel: 'low',
    status: 'active',
    agent: 'Sales 1',
    createdAt: '2025-09-27',
  },
];

// -----------------------------
// Retention Table Component
// -----------------------------
const RetentionTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60px] text-center">#</TableHead>
          <TableHead className="min-w-48">Name</TableHead>
          <TableHead className="min-w-56 hidden md:table-cell">Email</TableHead>
          <TableHead className="min-w-40">Country</TableHead>
          <TableHead className="min-w-40 hidden lg:table-cell">Buyer</TableHead>
          <TableHead className="min-w-36 hidden md:table-cell">
            Total Deposits
          </TableHead>
          <TableHead className="min-w-36 hidden md:table-cell">
            Latest Deposit
          </TableHead>
          <TableHead className="min-w-36 hidden md:table-cell">
            Frequency
          </TableHead>
          <TableHead className="min-w-36 hidden md:table-cell">Risk</TableHead>
          <TableHead className="min-w-36 hidden md:table-cell">
            Retention Tier
          </TableHead>
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
        {retentionData.map((item, i) => (
          <TableRow
            key={item.id}
            className="hover:bg-muted/50 transition-colors"
          >
            <TableCell className="text-center font-medium">{i + 1}</TableCell>

            <TableCell className="font-medium">
              <a href={`${RoutePath.RetentionClients}/123456789`}>
                {item.name}
              </a>
            </TableCell>

            <TableCell className="hidden md:table-cell">{item.email}</TableCell>

            <TableCell>{item.country}</TableCell>

            <TableCell className="hidden lg:table-cell">{item.buyer}</TableCell>

            <TableCell className="hidden md:table-cell">
              {item.totalDeposits}
            </TableCell>

            <TableCell className="hidden md:table-cell">
              ${item.latestDepositAmount} • {item.latestDepositDate}
            </TableCell>

            <TableCell className="hidden md:table-cell capitalize">
              {depositFrequencyLabels[item.depositFrequency] ??
                item.depositFrequency}
            </TableCell>

            <TableCell className="hidden md:table-cell capitalize">
              {riskLevelLabels[item.riskLevel] ?? item.riskLevel}
            </TableCell>

            <TableCell className="hidden md:table-cell capitalize">
              {retentionTierLabels[item.retentionTier] ?? item.retentionTier}
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
                  <a href={`${RoutePath.RetentionClients}/123456789`}>
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

// -----------------------------
// Pagination (same as others)
// -----------------------------
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

// -----------------------------
// Main Page Component
// -----------------------------
export default function RetentionClientsPage() {
  return (
    <section data-testid="retention-clients-page" className="p-4 space-y-6">
      <h2 className="text-2xl font-semibold">Retention Clients</h2>

      <RetentionFilterForm />

      <div className="relative w-full">
        <div className="absolute space-y-4 left-0 top-0 w-full pb-4">
          <div className="rounded-md border">
            <RetentionTable />
          </div>

          <TablePagination />
        </div>
      </div>
    </section>
  );
}
