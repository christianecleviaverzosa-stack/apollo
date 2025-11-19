import { useMemo } from 'react';
import {
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
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form';
import z from 'zod';
import { CalendarIcon, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { RoutePath } from '@apollo/constants';

// -----------------------------
// Select Options (agents, countries, lead types, statuses)
// -----------------------------
const agents = [
  {
    label: 'Managers',
    options: [
      { value: 'manager-1', label: 'Manager 1' },
      { value: 'manager-2', label: 'Manager 2' },
    ],
  },
  {
    label: 'Sales',
    options: [
      { value: 'sales-1', label: 'Sales 1' },
      { value: 'sales-2', label: 'Sales 2' },
      { value: 'sales-3', label: 'Sales 3' },
    ],
  },
];

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
      { value: 'cz', label: 'Czech Republic' },
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
      { value: 'pk', label: 'Pakistan' },
      { value: 'ae', label: 'United Arab Emirates' },
    ],
  },
  {
    label: 'Oceania & LATAM',
    options: [
      { value: 'au', label: 'Australia' },
      { value: 'nz', label: 'New Zealand' },
      { value: 'co', label: 'Colombia' },
      { value: 'cl', label: 'Chile' },
      { value: 'br', label: 'Brazil' },
    ],
  },
];

const leadTypes = [
  { value: 'all', label: 'All Lead Types' },
  { value: 'demo', label: 'Demo' },
  { value: 'active', label: 'Active' },
  { value: 'trial', label: 'Trial' },
];

const statuses = [
  { value: 'all', label: 'All Status' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'follow-up', label: 'Follow-up' },
  { value: 'verified', label: 'Verified' },
  { value: 'unverified', label: 'Unverified' },
  { value: 'converted', label: 'Converted' },
  { value: 'closed', label: 'Closed' },
  { value: 'pending', label: 'Pending' },
];

// -----------------------------
// Dummy leads data (18 entries)
// Note: agent values match agent option values (manager-1, sales-1, etc.)
// -----------------------------
const leadsData = [
  {
    id: 'LD-001',
    type: 'Demo',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 202 555 0183',
    country: 'United States',
    agent: '',
    status: 'new',
    createdAt: '2025-10-25',
    source: 'Landing A',
  },
  {
    id: 'LD-002',
    type: 'Active',
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    phone: '+34 601 555 214',
    country: 'Spain',
    agent: 'sales-1',
    status: 'follow-up',
    createdAt: '2025-10-20',
    source: 'Campaign 1',
  },
  {
    id: 'LD-003',
    type: 'Demo',
    name: 'James Lee',
    email: 'james.lee@example.com',
    phone: '+63 917 555 8877',
    country: 'Philippines',
    agent: '',
    status: 'converted',
    createdAt: '2025-10-18',
    source: 'Landing B',
  },
  {
    id: 'LD-004',
    type: 'Trial',
    name: 'Sofia Martinez',
    email: 'sofia.martinez@example.com',
    phone: '+52 998 233 6744',
    country: 'Mexico',
    agent: 'sales-2',
    status: 'pending',
    createdAt: '2025-10-17',
    source: 'Campaign 2',
  },
  {
    id: 'LD-005',
    type: 'Active',
    name: 'David Kim',
    email: 'david.kim@example.com',
    phone: '+82 10 3456 7890',
    country: 'South Korea',
    agent: 'sales-1',
    status: 'follow-up',
    createdAt: '2025-10-15',
    source: 'Landing A',
  },
  {
    id: 'LD-006',
    type: 'Demo',
    name: 'Emma Johnson',
    email: 'emma.johnson@example.com',
    phone: '+44 7700 900125',
    country: 'United Kingdom',
    agent: '',
    status: 'new',
    createdAt: '2025-10-14',
    source: 'Campaign 3',
  },
  {
    id: 'LD-007',
    type: 'Active',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@example.com',
    phone: '+971 50 123 4567',
    country: 'United Arab Emirates',
    agent: 'sales-2',
    status: 'converted',
    createdAt: '2025-10-12',
    source: 'Landing C',
  },
  {
    id: 'LD-008',
    type: 'Demo',
    name: 'Luca Bianchi',
    email: 'luca.bianchi@example.com',
    phone: '+39 331 456 7890',
    country: 'Italy',
    agent: '',
    status: 'follow-up',
    createdAt: '2025-10-11',
    source: 'Campaign 1',
  },
  {
    id: 'LD-009',
    type: 'Trial',
    name: 'Hiroshi Tanaka',
    email: 'hiroshi.tanaka@example.com',
    phone: '+81 80 5555 1234',
    country: 'Japan',
    agent: 'sales-3',
    status: 'pending',
    createdAt: '2025-10-10',
    source: 'Landing A',
  },
  {
    id: 'LD-010',
    type: 'Active',
    name: 'Olivia Brown',
    email: 'olivia.brown@example.com',
    phone: '+61 400 222 333',
    country: 'Australia',
    agent: '',
    status: 'converted',
    createdAt: '2025-10-09',
    source: 'Campaign 2',
  },
  {
    id: 'LD-011',
    type: 'Demo',
    name: 'Noah Davis',
    email: 'noah.davis@example.com',
    phone: '+1 416 555 7721',
    country: 'Canada',
    agent: 'sales-1',
    status: 'new',
    createdAt: '2025-10-08',
    source: 'Landing B',
  },
  {
    id: 'LD-012',
    type: 'Trial',
    name: 'Fatima Ali',
    email: 'fatima.ali@example.com',
    phone: '+92 301 555 6677',
    country: 'Pakistan',
    agent: '',
    status: 'follow-up',
    createdAt: '2025-10-06',
    source: 'Campaign 3',
  },
  {
    id: 'LD-013',
    type: 'Active',
    name: 'Carlos Hernandez',
    email: 'carlos.hernandez@example.com',
    phone: '+57 320 888 1122',
    country: 'Colombia',
    agent: 'sales-2',
    status: 'converted',
    createdAt: '2025-10-05',
    source: 'Landing C',
  },
  {
    id: 'LD-014',
    type: 'Demo',
    name: 'Anika Patel',
    email: 'anika.patel@example.com',
    phone: '+91 98765 43210',
    country: 'India',
    agent: '',
    status: 'new',
    createdAt: '2025-10-03',
    source: 'Campaign 1',
  },
  {
    id: 'LD-015',
    type: 'Trial',
    name: 'Mark Evans',
    email: 'mark.evans@example.com',
    phone: '+64 21 345 678',
    country: 'New Zealand',
    agent: '',
    status: 'follow-up',
    createdAt: '2025-10-02',
    source: 'Landing B',
  },
  {
    id: 'LD-016',
    type: 'Active',
    name: 'Chen Wei',
    email: 'chen.wei@example.com',
    phone: '+86 138 0013 4567',
    country: 'China',
    agent: 'sales-3',
    status: 'converted',
    createdAt: '2025-09-30',
    source: 'Landing A',
  },
  {
    id: 'LD-017',
    type: 'Demo',
    name: 'Julia Novak',
    email: 'julia.novak@example.com',
    phone: '+420 777 555 444',
    country: 'Czech Republic',
    agent: '',
    status: 'pending',
    createdAt: '2025-09-29',
    source: 'Campaign 2',
  },
  {
    id: 'LD-018',
    type: 'Active',
    name: 'Ali Khan',
    email: 'ali.khan@example.com',
    phone: '+971 56 777 8888',
    country: 'United Arab Emirates',
    agent: 'sales-1',
    status: 'follow-up',
    createdAt: '2025-09-27',
    source: 'Landing C',
  },
];

// -----------------------------
// Zod schema for filters + selection
// -----------------------------
const assignmentFilterSchema = z.object({
  keyword: z.string().optional(),
  agents: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .optional(),
  countries: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .optional(),
  leadType: z.string().optional(),
  status: z.string().optional(),
  dateRange: z
    .object({
      from: z.date(),
      to: z.date().optional(),
    })
    .optional(),
  unassignedOnly: z.boolean().optional(),

  // selection and internal values
  selectedLeadIds: z.array(z.string()).optional(),
});
type AssignmentFormValues = z.infer<typeof assignmentFilterSchema>;

// -----------------------------
// Helper: normalize country matching (basic)
// -----------------------------
const countryCodeFromName = (name: string) => {
  const map: Record<string, string> = {
    'United States': 'us',
    Canada: 'ca',
    Mexico: 'mx',
    Spain: 'es',
    'United Kingdom': 'uk',
    Philippines: 'ph',
    'South Korea': 'kr',
    'United Arab Emirates': 'ae',
    Italy: 'it',
    Japan: 'jp',
    Australia: 'au',
    Pakistan: 'pk',
    Colombia: 'co',
    India: 'in',
    'New Zealand': 'nz',
    China: 'cn',
    'Czech Republic': 'cz',
    UAE: 'ae',
  };
  return map[name];
};

// -----------------------------
// AssignmentFilterForm - uses useFormContext
// -----------------------------
const AssignmentFilterForm = () => {
  const { control, register, reset } = useFormContext<AssignmentFormValues>();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2"
    >
      <Input placeholder="Search name, email, or ID" {...register('keyword')} />

      <FormField
        control={control}
        name="agents"
        render={() => (
          <FormItem>
            <Controller
              control={control}
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

      <FormField
        control={control}
        name="countries"
        render={() => (
          <FormItem>
            <Controller
              control={control}
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

      <FormField
        control={control}
        name="leadType"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="min-w-48">
                  <SelectValue placeholder="Lead Type" />
                </SelectTrigger>
                <SelectContent>
                  {leadTypes.map((t) => (
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

      <FormField
        control={control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="min-w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((s) => (
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

      <FormField
        control={control}
        name="dateRange"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className="justify-start text-left font-normal w-full"
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
                      : 'Created at (date range)'}
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

      <Button onClick={() => reset()} type="button">
        Reset Filters
      </Button>

      <Button type="button">Apply Filters</Button>
    </form>
  );
};

// -----------------------------
// LeadAssignmentTable - uses useFormContext to read filters and selectedLeadIds
// -----------------------------
const LeadAssignmentTable = () => {
  const { watch, setValue, getValues } = useFormContext<AssignmentFormValues>();

  // watch all filter fields + selection
  const [
    keyword,
    selectedLeadIds,
    agentsSelected,
    countriesSelected,
    leadType,
    status,
    dateRange,
    unassignedOnly,
  ] = watch([
    'keyword',
    'selectedLeadIds',
    'agents',
    'countries',
    'leadType',
    'status',
    'dateRange',
    'unassignedOnly',
  ] as const);

  // compute filtered leads reactively
  const filteredLeads = useMemo(() => {
    let results = leadsData.slice();

    if (keyword?.trim()) {
      const k = keyword.trim().toLowerCase();
      results = results.filter(
        (l) =>
          l.name.toLowerCase().includes(k) ||
          l.email.toLowerCase().includes(k) ||
          l.id.toLowerCase().includes(k)
      );
    }

    if (countriesSelected && countriesSelected.length > 0) {
      const cs = countriesSelected.map((c) => c.value);
      results = results.filter((l) =>
        cs.includes(countryCodeFromName(l.country) ?? l.country)
      );
    }

    if (agentsSelected && agentsSelected.length > 0) {
      const as = agentsSelected.map((a) => a.value);
      results = results.filter((l) => as.includes(l.agent));
    }

    if (leadType && leadType !== 'all') {
      results = results.filter(
        (l) => l.type.toLowerCase() === leadType.toLowerCase()
      );
    }

    if (status && status !== 'all') {
      results = results.filter(
        (l) => l.status.toLowerCase() === status.toLowerCase()
      );
    }

    if (unassignedOnly) {
      results = results.filter((l) => !l.agent);
    }

    if (dateRange?.from) {
      const from = dateRange.from;
      const to = dateRange?.to ?? new Date();
      results = results.filter((l) => {
        const created = new Date(l.createdAt);
        return created >= from && created <= to;
      });
    }

    return results;
  }, [
    keyword,
    countriesSelected,
    agentsSelected,
    leadType,
    status,
    dateRange,
    unassignedOnly,
  ]);

  // select-all for visible filtered rows only
  const isAllSelected =
    filteredLeads.length > 0 &&
    (selectedLeadIds ?? []).length === filteredLeads.map((l) => l.id).length;

  const toggleSelectAllVisible = () => {
    if (isAllSelected) {
      setValue('selectedLeadIds', [], { shouldDirty: true, shouldTouch: true });
    } else {
      const ids = filteredLeads.map((l) => l.id);
      setValue('selectedLeadIds', ids, {
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  };

  const toggleSelectOne = (id: string) => {
    const current = getValues('selectedLeadIds') ?? [];
    if (current.includes(id)) {
      setValue(
        'selectedLeadIds',
        current.filter((x) => x !== id),
        { shouldDirty: true, shouldTouch: true }
      );
    } else {
      setValue('selectedLeadIds', [...current, id], {
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  };

  return (
    <div>
      {/* Table container: restrict to container width and allow internal horizontal scroll */}
      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto w-full">
          <Table className="min-w-full table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px] text-center">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={toggleSelectAllVisible}
                      className="form-checkbox"
                    />
                  </label>
                </TableHead>
                <TableHead className="min-w-32">Lead Type</TableHead>
                <TableHead className="min-w-48">Name</TableHead>
                <TableHead className="min-w-56 hidden md:table-cell">
                  Email
                </TableHead>
                <TableHead className="min-w-40 hidden lg:table-cell">
                  Phone
                </TableHead>
                <TableHead className="min-w-40">Country</TableHead>
                <TableHead className="min-w-40 hidden md:table-cell">
                  Source
                </TableHead>
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
              {filteredLeads.map((lead) => {
                const currentSelected = (selectedLeadIds ?? []) as string[];
                const isChecked = currentSelected.includes(lead.id);
                return (
                  <TableRow
                    key={lead.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="text-center font-medium">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelectOne(lead.id)}
                          className="form-checkbox"
                        />
                      </label>
                    </TableCell>

                    <TableCell>
                      <Badge variant="secondary" className="capitalize">
                        {lead.type}
                      </Badge>
                    </TableCell>

                    <TableCell className="font-medium truncate max-w-[220px]">
                      <a href={`${RoutePath.Leads}/123456789`}>{lead.name}</a>
                    </TableCell>

                    <TableCell className="hidden md:table-cell truncate max-w-[300px]">
                      {lead.email}
                    </TableCell>

                    <TableCell className="hidden lg:table-cell truncate">
                      {lead.phone}
                    </TableCell>

                    <TableCell>{lead.country}</TableCell>

                    <TableCell className="hidden md:table-cell truncate">
                      {lead.source}
                    </TableCell>

                    <TableCell className="hidden md:table-cell truncate">
                      {lead.agent ? (
                        lead.agent
                      ) : (
                        <span className="text-muted-foreground">
                          Unassigned
                        </span>
                      )}
                    </TableCell>

                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline" className="capitalize">
                        {lead.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {lead.createdAt}
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button size="icon" variant="ghost">
                          <a href={`${RoutePath.Leads}/123456789`}>
                          <Eye className="h-4 w-4" /></a>
                          
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination (unchanged) */}
      <div className="mt-4">
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
      </div>
    </div>
  );
};

// -----------------------------
// BulkActionBar - reads selectedLeadIds from RHF and shows assign button
// -----------------------------
const BulkActionBar = () => {
  const { watch, setValue } = useFormContext<AssignmentFormValues>();
  const selectedLeadIds = watch('selectedLeadIds') ?? [];

  const clearSelection = () =>
    setValue('selectedLeadIds', [], { shouldDirty: true });

  const openAssignModal = () => {
    // placeholder action — in your app you'd call setCurrentDialog to open the modal component
    // setCurrentDialog({
    //   content: 'assign-leads-modal',
    //   payload: { selectedIds: selectedLeadIds },
    //   open: true,
    // });
  };

  if (!selectedLeadIds || selectedLeadIds.length === 0) return null;

  return (
    <div className="fixed bottom-10 md:bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-background border rounded-md px-4 py-3 shadow-lg flex items-center gap-3">
      <div className="text-sm font-medium hidden md:block">
        Selected: {selectedLeadIds.length} lead
        {selectedLeadIds.length > 1 ? 's' : ''}
      </div>
      <div className="flex items-center gap-2">
        <div className="min-w-[200px]">
          <ReactSelectBase
            menuPlacement="top"
            isClearable
            placeholder="Assign to agent (preview)"
            options={agents}
          />
        </div>
        <Button onClick={openAssignModal}>Assign</Button>
        <Button variant="ghost" onClick={clearSelection}>
          Clear
        </Button>
      </div>
    </div>
  );
};

// -----------------------------
// Main Page Component
// -----------------------------
export default function LeadAssignmentPage() {
  const methods = useForm<AssignmentFormValues>({
    resolver: zodResolver(assignmentFilterSchema),
    defaultValues: {
      keyword: '',
      agents: [],
      countries: [],
      leadType: 'all',
      status: 'all',
      dateRange: undefined,
      unassignedOnly: false,
      selectedLeadIds: [],
    },
  });

  return (
    <section data-testid="lead-assignment-page" className="p-4 space-y-6">
      <h2 className="text-2xl font-semibold">Lead Assignment</h2>

      <FormProvider {...methods}>
        <AssignmentFilterForm />
        <LeadAssignmentTable />
        <BulkActionBar />
      </FormProvider>
    </section>
  );
}
