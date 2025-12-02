// TODO: This must be a dumb component, currently placeholder contents
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
  setCurrentDialog,
} from '@apollo/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { CalendarIcon, Eye, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { countries, RoutePath } from '@apollo/constants';

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


const leadsFilterFormSchema = z.object({
  keyword: z.string(),
  leadType: z.string(),
  countries: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
  agents: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
  dateRange: z
    .object({
      from: z.date(),
      to: z.date().optional(),
    })
    .optional(),
  verified: z.string(),
});

type LeadsFilterFormValues = z.infer<typeof leadsFilterFormSchema>;

export const LeadsFilterForm = () => {
  const form = useForm<LeadsFilterFormValues>({
    defaultValues: {
      keyword: '',
      leadType: 'all',
      agents: [],
      countries: [],
      verified: 'all',
    },
    resolver: zodResolver(leadsFilterFormSchema),
  });

  return (
    <Form {...form}>
      <form className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
        <Input
          placeholder="Search name, email, or ID"
          {...form.register('keyword')}
        />
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
                    placeholder="Select angents"
                    options={agents}
                    onChange={(val) => field.onChange(val)}
                  />
                )}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="leadType"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="min-w-48">
                    <SelectValue placeholder="All Lead Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Lead Types</SelectItem>
                    <SelectItem value="demo">Demo</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="verified"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="min-w-48">
                    <SelectValue placeholder="Verified & Unverified" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Verified & Unverified</SelectItem>
                    <SelectItem value="verified">
                      KYC / Email Verified
                    </SelectItem>
                    <SelectItem value="unverified">Unverified</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
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
                      {field.value?.from ? (
                        field.value.to ? (
                          field.value.from.getTime() ===
                          field.value.to.getTime() ? (
                            format(field.value.from, 'LLL dd, y')
                          ) : (
                            <>
                              {format(field.value.from, 'LLL dd, y')} -{' '}
                              {format(field.value.to, 'LLL dd, y')}
                            </>
                          )
                        ) : (
                          format(field.value.from, 'LLL dd, y')
                        )
                      ) : (
                        <span>Created at (date range)</span>
                      )}
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
        <Button onClick={() => form.reset()} type="button">
          Reset Filters
        </Button>
        <Button type="button">Export Data</Button>
      </form>
    </Form>
  );
};

const leadsData = [
  {
    id: 'LD-001',
    type: 'Demo',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 202 555 0183',
    country: 'United States',
    agent: 'Sales 1',
    status: 'New',
    createdAt: '2025-10-25',
  },
  {
    id: 'LD-002',
    type: 'Active',
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    phone: '+34 601 555 214',
    country: 'Spain',
    agent: 'Sales 1',
    status: 'Follow-up',
    createdAt: '2025-10-20',
  },
  {
    id: 'LD-003',
    type: 'Demo',
    name: 'James Lee',
    email: 'james.lee@example.com',
    phone: '+63 917 555 8877',
    country: 'Philippines',
    agent: 'Sales 1',
    status: 'Converted',
    createdAt: '2025-10-18',
  },
  {
    id: 'LD-004',
    type: 'Trial',
    name: 'Sofia Martinez',
    email: 'sofia.martinez@example.com',
    phone: '+52 998 233 6744',
    country: 'Mexico',
    agent: 'Sales 1',
    status: 'Pending',
    createdAt: '2025-10-17',
  },
  {
    id: 'LD-005',
    type: 'Active',
    name: 'David Kim',
    email: 'david.kim@example.com',
    phone: '+82 10 3456 7890',
    country: 'South Korea',
    agent: 'Sales 1',
    status: 'Follow-up',
    createdAt: '2025-10-15',
  },
  {
    id: 'LD-006',
    type: 'Demo',
    name: 'Emma Johnson',
    email: 'emma.johnson@example.com',
    phone: '+44 7700 900125',
    country: 'United Kingdom',
    agent: 'Sales 1',
    status: 'New',
    createdAt: '2025-10-14',
  },
  {
    id: 'LD-007',
    type: 'Active',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@example.com',
    phone: '+971 50 123 4567',
    country: 'United Arab Emirates',
    agent: 'Sales 1',
    status: 'Converted',
    createdAt: '2025-10-12',
  },
  {
    id: 'LD-008',
    type: 'Demo',
    name: 'Luca Bianchi',
    email: 'luca.bianchi@example.com',
    phone: '+39 331 456 7890',
    country: 'Italy',
    agent: 'Sales 1',
    status: 'Follow-up',
    createdAt: '2025-10-11',
  },
  {
    id: 'LD-009',
    type: 'Trial',
    name: 'Hiroshi Tanaka',
    email: 'hiroshi.tanaka@example.com',
    phone: '+81 80 5555 1234',
    country: 'Japan',
    agent: 'Sales 1',
    status: 'Pending',
    createdAt: '2025-10-10',
  },
  {
    id: 'LD-010',
    type: 'Active',
    name: 'Olivia Brown',
    email: 'olivia.brown@example.com',
    phone: '+61 400 222 333',
    country: 'Australia',
    agent: 'Sales 1',
    status: 'Converted',
    createdAt: '2025-10-09',
  },
  {
    id: 'LD-011',
    type: 'Demo',
    name: 'Noah Davis',
    email: 'noah.davis@example.com',
    phone: '+1 416 555 7721',
    country: 'Canada',
    agent: 'Sales 1',
    status: 'New',
    createdAt: '2025-10-08',
  },
  {
    id: 'LD-012',
    type: 'Trial',
    name: 'Fatima Ali',
    email: 'fatima.ali@example.com',
    phone: '+92 301 555 6677',
    country: 'Pakistan',
    agent: 'Sales 1',
    status: 'Follow-up',
    createdAt: '2025-10-06',
  },
  {
    id: 'LD-013',
    type: 'Active',
    name: 'Carlos Hernandez',
    email: 'carlos.hernandez@example.com',
    phone: '+57 320 888 1122',
    country: 'Colombia',
    agent: 'Sales 1',
    status: 'Converted',
    createdAt: '2025-10-05',
  },
  {
    id: 'LD-014',
    type: 'Demo',
    name: 'Anika Patel',
    email: 'anika.patel@example.com',
    phone: '+91 98765 43210',
    country: 'India',
    agent: 'Sales 1',
    status: 'New',
    createdAt: '2025-10-03',
  },
  {
    id: 'LD-015',
    type: 'Trial',
    name: 'Mark Evans',
    email: 'mark.evans@example.com',
    phone: '+64 21 345 678',
    country: 'New Zealand',
    agent: 'Sales 1',
    status: 'Follow-up',
    createdAt: '2025-10-02',
  },
  {
    id: 'LD-016',
    type: 'Active',
    name: 'Chen Wei',
    email: 'chen.wei@example.com',
    phone: '+86 138 0013 4567',
    country: 'China',
    agent: 'Sales 1',
    status: 'Converted',
    createdAt: '2025-09-30',
  },
  {
    id: 'LD-017',
    type: 'Demo',
    name: 'Julia Novak',
    email: 'julia.novak@example.com',
    phone: '+420 777 555 444',
    country: 'Czech Republic',
    agent: 'Sales 1',
    status: 'Pending',
    createdAt: '2025-09-29',
  },
  {
    id: 'LD-018',
    type: 'Active',
    name: 'Ali Khan',
    email: 'ali.khan@example.com',
    phone: '+971 56 777 8888',
    country: 'UAE',
    agent: 'Sales 1',
    status: 'Follow-up',
    createdAt: '2025-09-27',
  },
];

const LeadsTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60px] text-center">#</TableHead>
          <TableHead className="min-w-32">Lead Type</TableHead>
          <TableHead className="min-w-48">Name</TableHead>
          <TableHead className="min-w-56 hidden md:table-cell">Email</TableHead>
          <TableHead className="min-w-40 hidden lg:table-cell">Phone</TableHead>
          <TableHead className="min-w-40">Country</TableHead>
          <TableHead className="min-w-40 hidden md:table-cell">
            Assigned Agent
          </TableHead>
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
        {leadsData.map((lead, i) => (
          <TableRow
            key={lead.id}
            className="hover:bg-muted/50 transition-colors"
          >
            <TableCell className="text-center font-medium">{i + 1}</TableCell>
            <TableCell>
              <Badge variant="secondary" className="capitalize">
                {lead.type}
              </Badge>
            </TableCell>
            <TableCell className="font-medium">
              <a href={RoutePath.Lead('12345')}>{lead.name}</a>
            </TableCell>
            <TableCell className="hidden md:table-cell">{lead.email}</TableCell>
            <TableCell className="hidden lg:table-cell">{lead.phone}</TableCell>
            <TableCell>{lead.country}</TableCell>
            <TableCell className="hidden md:table-cell">{lead.agent}</TableCell>
            <TableCell className="hidden md:table-cell">
              <Badge variant="outline">{lead.status}</Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell text-muted-foreground">
              {lead.createdAt}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-1">
                <a href={RoutePath.Lead('12345')}>
                  <Button size="icon" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                </a>

                <Button
                  onClick={() =>
                    setCurrentDialog({ content: 'delete-lead', open: true })
                  }
                  size="icon"
                  variant="ghost"
                >
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

export default function LeadsPage() {
  return (
    <section data-testid="workers-page" className="p-4 space-y-6">
      <h2 className="text-2xl font-semibold">All Leads</h2>
      <LeadsFilterForm />
      <div className="relative w-full">
        <div className="absolute space-y-4 left-0 top-0 w-full pb-4">
          <div className="rounded-md border">
            <LeadsTable />
          </div>
          <TablePagination />
        </div>
      </div>
    </section>
  );
}
