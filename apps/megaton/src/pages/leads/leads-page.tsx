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
  ReactSelectClearIndicator,
  ReactSelectDropdownIndicator,
  PopoverContent,
  Popover,
  PopoverTrigger,
  Calendar,
  TableBody,
  TableCell,
  Badge,
  ReactSelectControl,
} from '@apollo/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import ReactSelect from 'react-select';
import { CalendarIcon, Edit, Eye, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

const countries = [
  {
    label: 'North America',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'mx', label: 'Mexico' },
    ],
  },
  {
    label: 'Europe',
    options: [
      { value: 'uk', label: 'United Kingdom' },
      { value: 'de', label: 'Germany' },
      { value: 'fr', label: 'France' },
      { value: 'es', label: 'Spain' },
      { value: 'it', label: 'Italy' },
      { value: 'nl', label: 'Netherlands' },
    ],
  },
  {
    label: 'Asia',
    options: [
      { value: 'cn', label: 'China' },
      { value: 'jp', label: 'Japan' },
      { value: 'kr', label: 'South Korea' },
      { value: 'ph', label: 'Philippines' },
      { value: 'sg', label: 'Singapore' },
      { value: 'in', label: 'India' },
      { value: 'id', label: 'Indonesia' },
    ],
  },
  {
    label: 'Middle East & Africa',
    options: [
      { value: 'ae', label: 'United Arab Emirates' },
      { value: 'sa', label: 'Saudi Arabia' },
      { value: 'eg', label: 'Egypt' },
      { value: 'za', label: 'South Africa' },
      { value: 'ng', label: 'Nigeria' },
    ],
  },
  {
    label: 'Oceania',
    options: [
      { value: 'au', label: 'Australia' },
      { value: 'nz', label: 'New Zealand' },
      { value: 'fj', label: 'Fiji' },
    ],
  },
  {
    label: 'South America',
    options: [
      { value: 'br', label: 'Brazil' },
      { value: 'ar', label: 'Argentina' },
      { value: 'cl', label: 'Chile' },
      { value: 'pe', label: 'Peru' },
    ],
  },
];

const leadsFilterFormSchema = z.object({
  keyword: z.string(),
  leadType: z.string(),
  countries: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .min(1, { message: 'Please select at least one country.' }),
  agent: z.string(),
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
      agent: 'all',
      countries: [],
      verified: 'all',
    },
    resolver: zodResolver(leadsFilterFormSchema),
  });

  return (
    <Form {...form}>
      <form className="flex flex-col md:flex-row flex-wrap gap-2">
        <Input
          placeholder="Search name, email, or ID"
          {...form.register('keyword')}
        />
        <FormField
          control={form.control}
          name="agent"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="min-w-48">
                    <SelectValue placeholder="All Agents" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Agents</SelectItem>
                    <SelectItem value="agent-1">Agent 1</SelectItem>
                    <SelectItem value="agent-2">Agent 2</SelectItem>
                    <SelectItem value="agent-3">Agent 3</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
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
                  <ReactSelect
                    options={countries}
                    isMulti
                    placeholder="Select countries"
                    value={field.value}
                    onChange={(val) => field.onChange(val)}
                    className="text-sm min-w-48"
                    components={{
                      ClearIndicator: ReactSelectClearIndicator,
                      DropdownIndicator: ReactSelectDropdownIndicator,
                      Control: ReactSelectControl,
                    }}
                    {...field}
                  />
                )}
              />
            </FormItem>
          )}
        />
        <Button
          className="flex-1"
          onClick={() => form.reset()}
          type="button"
          variant="outline"
        >
          Reset Filters
        </Button>
        <Button className="flex-1" type="button" variant="outline">
          Export Data
        </Button>
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
    agent: 'Jane Doe',
    status: 'New',
    quality: 'Warm',
    createdAt: '2025-10-25',
  },
  {
    id: 'LD-002',
    type: 'Active',
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    phone: '+34 601 555 214',
    country: 'Spain',
    agent: 'Michael Cruz',
    status: 'Follow-up',
    quality: 'Hot',
    createdAt: '2025-10-20',
  },
  {
    id: 'LD-003',
    type: 'Demo',
    name: 'James Lee',
    email: 'james.lee@example.com',
    phone: '+63 917 555 8877',
    country: 'Philippines',
    agent: 'Sarah Tan',
    status: 'Converted',
    quality: 'Qualified',
    createdAt: '2025-10-18',
  },
  {
    id: 'LD-004',
    type: 'Trial',
    name: 'Sofia Martinez',
    email: 'sofia.martinez@example.com',
    phone: '+52 998 233 6744',
    country: 'Mexico',
    agent: 'Robert Chan',
    status: 'Pending',
    quality: 'Cold',
    createdAt: '2025-10-17',
  },
  {
    id: 'LD-005',
    type: 'Active',
    name: 'David Kim',
    email: 'david.kim@example.com',
    phone: '+82 10 3456 7890',
    country: 'South Korea',
    agent: 'Emily Zhao',
    status: 'Follow-up',
    quality: 'Hot',
    createdAt: '2025-10-15',
  },
  {
    id: 'LD-006',
    type: 'Demo',
    name: 'Emma Johnson',
    email: 'emma.johnson@example.com',
    phone: '+44 7700 900125',
    country: 'United Kingdom',
    agent: 'Carlos Rivera',
    status: 'New',
    quality: 'Warm',
    createdAt: '2025-10-14',
  },
  {
    id: 'LD-007',
    type: 'Active',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@example.com',
    phone: '+971 50 123 4567',
    country: 'United Arab Emirates',
    agent: 'Lisa Wong',
    status: 'Converted',
    quality: 'Qualified',
    createdAt: '2025-10-12',
  },
  {
    id: 'LD-008',
    type: 'Demo',
    name: 'Luca Bianchi',
    email: 'luca.bianchi@example.com',
    phone: '+39 331 456 7890',
    country: 'Italy',
    agent: 'Michael Cruz',
    status: 'Follow-up',
    quality: 'Hot',
    createdAt: '2025-10-11',
  },
  {
    id: 'LD-009',
    type: 'Trial',
    name: 'Hiroshi Tanaka',
    email: 'hiroshi.tanaka@example.com',
    phone: '+81 80 5555 1234',
    country: 'Japan',
    agent: 'Sarah Tan',
    status: 'Pending',
    quality: 'Cold',
    createdAt: '2025-10-10',
  },
  {
    id: 'LD-010',
    type: 'Active',
    name: 'Olivia Brown',
    email: 'olivia.brown@example.com',
    phone: '+61 400 222 333',
    country: 'Australia',
    agent: 'Carlos Rivera',
    status: 'Converted',
    quality: 'Qualified',
    createdAt: '2025-10-09',
  },
  {
    id: 'LD-011',
    type: 'Demo',
    name: 'Noah Davis',
    email: 'noah.davis@example.com',
    phone: '+1 416 555 7721',
    country: 'Canada',
    agent: 'Jane Doe',
    status: 'New',
    quality: 'Warm',
    createdAt: '2025-10-08',
  },
  {
    id: 'LD-012',
    type: 'Trial',
    name: 'Fatima Ali',
    email: 'fatima.ali@example.com',
    phone: '+92 301 555 6677',
    country: 'Pakistan',
    agent: 'Emily Zhao',
    status: 'Follow-up',
    quality: 'Hot',
    createdAt: '2025-10-06',
  },
  {
    id: 'LD-013',
    type: 'Active',
    name: 'Carlos Hernandez',
    email: 'carlos.hernandez@example.com',
    phone: '+57 320 888 1122',
    country: 'Colombia',
    agent: 'Robert Chan',
    status: 'Converted',
    quality: 'Qualified',
    createdAt: '2025-10-05',
  },
  {
    id: 'LD-014',
    type: 'Demo',
    name: 'Anika Patel',
    email: 'anika.patel@example.com',
    phone: '+91 98765 43210',
    country: 'India',
    agent: 'Lisa Wong',
    status: 'New',
    quality: 'Cold',
    createdAt: '2025-10-03',
  },
  {
    id: 'LD-015',
    type: 'Trial',
    name: 'Mark Evans',
    email: 'mark.evans@example.com',
    phone: '+64 21 345 678',
    country: 'New Zealand',
    agent: 'Carlos Rivera',
    status: 'Follow-up',
    quality: 'Warm',
    createdAt: '2025-10-02',
  },
  {
    id: 'LD-016',
    type: 'Active',
    name: 'Chen Wei',
    email: 'chen.wei@example.com',
    phone: '+86 138 0013 4567',
    country: 'China',
    agent: 'Emily Zhao',
    status: 'Converted',
    quality: 'Qualified',
    createdAt: '2025-09-30',
  },
  {
    id: 'LD-017',
    type: 'Demo',
    name: 'Julia Novak',
    email: 'julia.novak@example.com',
    phone: '+420 777 555 444',
    country: 'Czech Republic',
    agent: 'Sarah Tan',
    status: 'Pending',
    quality: 'Cold',
    createdAt: '2025-09-29',
  },
  {
    id: 'LD-018',
    type: 'Active',
    name: 'Ali Khan',
    email: 'ali.khan@example.com',
    phone: '+971 56 777 8888',
    country: 'UAE',
    agent: 'Lisa Wong',
    status: 'Follow-up',
    quality: 'Hot',
    createdAt: '2025-09-27',
  },
  {
    id: 'LD-019',
    type: 'Demo',
    name: 'Natalie Fischer',
    email: 'natalie.fischer@example.com',
    phone: '+49 160 987 6543',
    country: 'Germany',
    agent: 'Robert Chan',
    status: 'New',
    quality: 'Warm',
    createdAt: '2025-09-26',
  },
  {
    id: 'LD-020',
    type: 'Trial',
    name: 'Pedro Alvarez',
    email: 'pedro.alvarez@example.com',
    phone: '+55 11 99999 5555',
    country: 'Brazil',
    agent: 'Michael Cruz',
    status: 'Converted',
    quality: 'Qualified',
    createdAt: '2025-09-25',
  },
  {
    id: 'LD-021',
    type: 'Active',
    name: 'Isabella Rossi',
    email: 'isabella.rossi@example.com',
    phone: '+39 347 987 1111',
    country: 'Italy',
    agent: 'Carlos Rivera',
    status: 'Follow-up',
    quality: 'Hot',
    createdAt: '2025-09-24',
  },
  {
    id: 'LD-022',
    type: 'Demo',
    name: 'George Adams',
    email: 'george.adams@example.com',
    phone: '+1 305 555 2233',
    country: 'United States',
    agent: 'Jane Doe',
    status: 'Pending',
    quality: 'Cold',
    createdAt: '2025-09-22',
  },
  {
    id: 'LD-023',
    type: 'Trial',
    name: 'Tariq Rahman',
    email: 'tariq.rahman@example.com',
    phone: '+880 171 222 3344',
    country: 'Bangladesh',
    agent: 'Emily Zhao',
    status: 'New',
    quality: 'Warm',
    createdAt: '2025-09-20',
  },
  {
    id: 'LD-024',
    type: 'Active',
    name: 'Ethan Clark',
    email: 'ethan.clark@example.com',
    phone: '+1 917 555 8888',
    country: 'United States',
    agent: 'Robert Chan',
    status: 'Converted',
    quality: 'Qualified',
    createdAt: '2025-09-19',
  },
  {
    id: 'LD-025',
    type: 'Demo',
    name: 'Leila Haddad',
    email: 'leila.haddad@example.com',
    phone: '+212 622 333 444',
    country: 'Morocco',
    agent: 'Sarah Tan',
    status: 'Follow-up',
    quality: 'Hot',
    createdAt: '2025-09-18',
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
          <TableHead className="min-w-32 hidden lg:table-cell">
            Quality
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
            <TableCell className="font-medium">{lead.name}</TableCell>
            <TableCell className="hidden md:table-cell">{lead.email}</TableCell>
            <TableCell className="hidden lg:table-cell">{lead.phone}</TableCell>
            <TableCell>{lead.country}</TableCell>
            <TableCell className="hidden md:table-cell">{lead.agent}</TableCell>
            <TableCell className="hidden md:table-cell">
              <Badge variant="outline">{lead.status}</Badge>
            </TableCell>
            <TableCell className="hidden lg:table-cell">
              <Badge variant="outline">{lead.quality}</Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell text-muted-foreground">
              {lead.createdAt}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-1">
                <Button size="icon" variant="ghost">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Edit className="h-4 w-4" />
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
    <section data-testid="workers-page" className="space-y-6">
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
