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
import { Controller, useForm } from 'react-hook-form';
import { CalendarIcon, Eye, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { countries, RoutePath } from '@apollo/constants';

export const LeadsFilterForm = () => {
  const form = useForm({
    defaultValues: {
      keyword: '',
      leadType: '',
      agents: [],
      verified: '',
      countries: [],
      dateRange: undefined,
      affiliate: '',
      offerName: '',
      deviceType: '',
      lastContactRange: undefined,
      sortBy: '',
      leadStatus: '',
    },
  });

  return (
    <Form {...form}>
      <form className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
        <Input
          placeholder="Search name, email, or ID"
          {...form.register('keyword')}
        />

        <Input placeholder="Offer name" {...form.register('offerName')} />

        <FormField
          control={form.control}
          name="leadType"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Lead Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="demo">Demo</SelectItem>
                    <SelectItem value="trial">Trial</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="agents"
          render={({ field }) => (
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

        <FormField
          control={form.control}
          name="verified"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Verification Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      All (Verified & Unverified)
                    </SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="email_verified">
                      Email Verified
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
          name="countries"
          render={({ field }) => (
            <FormItem>
              <Controller
                control={form.control}
                name="countries"
                render={({ field }) => (
                  <ReactSelectBase
                    {...field}
                    isMulti
                    placeholder="Select country"
                    options={countries}
                    onChange={(val) => field.onChange(val)}
                  />
                )}
              />
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
                    <Button variant="outline" className="justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value?.from ? (
                        field.value?.to ? (
                          <>
                            {format(field.value.from, 'LLL dd, y')} -{' '}
                            {format(field.value.to, 'LLL dd, y')}
                          </>
                        ) : (
                          format(field.value.from, 'LLL dd, y')
                        )
                      ) : (
                        'Created Date (Range)'
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
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

        <FormField
          control={form.control}
          name="lastContactRange"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" className="justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value?.from ? (
                        field.value?.to ? (
                          <>
                            {format(field.value.from, 'LLL dd, y')} -{' '}
                            {format(field.value.to, 'LLL dd, y')}
                          </>
                        ) : (
                          format(field.value.from, 'LLL dd, y')
                        )
                      ) : (
                        'Last Contact Range'
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
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

        <FormField
          control={form.control}
          name="leadStatus"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Lead Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="follow_up">Follow-up</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deviceType"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Device Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desktop">Desktop</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                    <SelectItem value="tablet">Tablet</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="button" onClick={() => form.reset()}>
          Reset Filters
        </Button>
        <Button type="button">Export Data</Button>
      </form>
    </Form>
  );
};

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

const leadsData = [
  {
    id: '00000001',
    leadType: 'Demo',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: '+1 202 555 0183',
    country: 'United States',
    assignedAgent: 'Sales 1',
    status: 'New',
    affiliate: 'Affiliate Pro',
    offerName: 'Crypto Starter Pack',
    ipAddress: '192.168.1.45',
    device: 'Windows 11 · Chrome 127',
    lastContacted: '2025-10-23',
    lastNoteAt: '2025-10-24',
    createdAt: '2025-10-25',
  },
  {
    id: '00000002',
    leadType: 'Active',
    firstName: 'Maria',
    lastName: 'Garcia',
    email: 'maria.garcia@example.com',
    phone: '+34 601 555 214',
    country: 'Spain',
    assignedAgent: 'Sales 1',
    status: 'Follow-up',
    affiliate: 'LeadBoost EU',
    offerName: 'Forex Accelerator',
    ipAddress: '83.45.201.12',
    device: 'iPhone 14 · Safari',
    lastContacted: '2025-10-21',
    lastNoteAt: '2025-10-20',
    createdAt: '2025-10-20',
  },
  {
    id: '00000003',
    leadType: 'Demo',
    firstName: 'James',
    lastName: 'Lee',
    email: 'james.lee@example.com',
    phone: '+63 917 555 8877',
    country: 'Philippines',
    assignedAgent: 'Sales 1',
    status: 'Converted',
    affiliate: 'Direct',
    offerName: 'Welcome Bonus 50%',
    ipAddress: '112.201.14.33',
    device: 'Android 13 · Chrome Mobile',
    lastContacted: '2025-10-18',
    lastNoteAt: '2025-10-18',
    createdAt: '2025-10-18',
  },
  {
    id: '00000004',
    leadType: 'Trial',
    firstName: 'Sofia',
    lastName: 'Martinez',
    email: 'sofia.martinez@example.com',
    phone: '+52 998 233 6744',
    country: 'Mexico',
    assignedAgent: 'Sales 1',
    status: 'Pending',
    affiliate: 'LATAM Leads',
    offerName: 'Trial Funnel Entry',
    ipAddress: '186.77.91.201',
    device: 'Windows 10 · Edge',
    lastContacted: '2025-10-17',
    lastNoteAt: '2025-10-17',
    createdAt: '2025-10-17',
  },
  {
    id: '00000005',
    leadType: 'Active',
    firstName: 'David',
    lastName: 'Kim',
    email: 'david.kim@example.com',
    phone: '+82 10 3456 7890',
    country: 'South Korea',
    assignedAgent: 'Sales 1',
    status: 'Follow-up',
    affiliate: 'AsiaPrime',
    offerName: 'K-Forex Lite',
    ipAddress: '14.55.220.11',
    device: 'Galaxy S22 · Samsung Browser',
    lastContacted: '2025-10-15',
    lastNoteAt: '2025-10-15',
    createdAt: '2025-10-15',
  },
  {
    id: '00000006',
    leadType: 'Demo',
    firstName: 'Emma',
    lastName: 'Johnson',
    email: 'emma.johnson@example.com',
    phone: '+44 7700 900125',
    country: 'United Kingdom',
    assignedAgent: 'Sales 1',
    status: 'New',
    affiliate: 'UKFunnels',
    offerName: 'Beginner FX Bootcamp',
    ipAddress: '51.39.88.72',
    device: 'MacOS 14 · Chrome',
    lastContacted: '2025-10-14',
    lastNoteAt: '2025-10-14',
    createdAt: '2025-10-14',
  },
  {
    id: '00000007',
    leadType: 'Active',
    firstName: 'Ahmed',
    lastName: 'Hassan',
    email: 'ahmed.hassan@example.com',
    phone: '+971 50 123 4567',
    country: 'United Arab Emirates',
    assignedAgent: 'Sales 1',
    status: 'Converted',
    affiliate: 'GCC Traffic Hub',
    offerName: 'MENA FX Elite',
    ipAddress: '92.96.44.201',
    device: 'Windows 11 · Chrome',
    lastContacted: '2025-10-12',
    lastNoteAt: '2025-10-12',
    createdAt: '2025-10-12',
  },
  {
    id: '00000008',
    leadType: 'Demo',
    firstName: 'Luca',
    lastName: 'Bianchi',
    email: 'luca.bianchi@example.com',
    phone: '+39 331 456 7890',
    country: 'Italy',
    assignedAgent: 'Sales 1',
    status: 'Follow-up',
    affiliate: 'EuroLeads',
    offerName: 'FX Trial Conversion',
    ipAddress: '95.233.77.19',
    device: 'iPadOS · Safari',
    lastContacted: '2025-10-11',
    lastNoteAt: '2025-10-11',
    createdAt: '2025-10-11',
  },
  {
    id: '00000009',
    leadType: 'Active',
    firstName: 'Hiroshi',
    lastName: 'Tanaka',
    email: 'hiroshi.tanaka@example.com',
    phone: '+81 90 1234 5678',
    country: 'Japan',
    assignedAgent: 'Sales 1',
    status: 'Pending',
    affiliate: 'ZenLeads JP',
    offerName: 'JPY Starter Pack',
    ipAddress: '133.203.17.22',
    device: 'Android 14 · Chrome',
    lastContacted: '2025-10-10',
    lastNoteAt: '2025-10-10',
    createdAt: '2025-10-10',
  },
  {
    id: '00000010',
    leadType: 'Trial',
    firstName: 'Olivia',
    lastName: 'Brown',
    email: 'olivia.brown@example.com',
    phone: '+1 415 555 2299',
    country: 'United States',
    assignedAgent: 'Sales 1',
    status: 'New',
    affiliate: 'Direct',
    offerName: 'Account Opening Promo',
    ipAddress: '172.88.44.19',
    device: 'MacOS · Safari',
    lastContacted: '2025-10-09',
    lastNoteAt: '2025-10-09',
    createdAt: '2025-10-09',
  },
];

const LeadsTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60px] text-center">#</TableHead>
          <TableHead className="min-w-28">Lead Type</TableHead>
          <TableHead className="min-w-40">First Name</TableHead>
          <TableHead className="min-w-40">Last Name</TableHead>
          <TableHead className="min-w-56 hidden md:table-cell">Email</TableHead>
          <TableHead className="min-w-40 hidden lg:table-cell">Phone</TableHead>
          <TableHead className="min-w-40 hidden lg:table-cell">
            Country
          </TableHead>

          <TableHead className="min-w-40 hidden xl:table-cell">
            Affiliate
          </TableHead>
          <TableHead className="min-w-48 hidden xl:table-cell">
            Offer Name
          </TableHead>

          <TableHead className="min-w-40 hidden 2xl:table-cell">
            IP Address
          </TableHead>
          <TableHead className="min-w-56 hidden 2xl:table-cell">
            Device / OS / Browser
          </TableHead>

          <TableHead className="min-w-36 hidden lg:table-cell">
            Last Note
          </TableHead>
          <TableHead className="min-w-36 hidden lg:table-cell">
            Last Contact
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
        {leadsData.map((lead) => {
          return (
            <TableRow
              key={lead.id}
              className="hover:bg-muted/50 transition-colors"
            >
              <TableCell className="text-center font-medium">
                {lead.id}
              </TableCell>

              <TableCell>
                <Badge variant="secondary" className="capitalize">
                  {lead.leadType}
                </Badge>
              </TableCell>

              <TableCell className="font-medium">
                <a href={RoutePath.Lead(lead.id)}>{lead.firstName}</a>
              </TableCell>

              <TableCell className="font-medium">{lead.lastName}</TableCell>

              <TableCell className="hidden md:table-cell">
                {lead.email}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {lead.phone}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {lead.country}
              </TableCell>

              {/* Affiliate */}
              <TableCell className="hidden xl:table-cell">
                {lead.affiliate}
              </TableCell>

              {/* Offer Name */}
              <TableCell className="hidden xl:table-cell">
                {lead.offerName}
              </TableCell>

              {/* IP */}
              <TableCell className="hidden 2xl:table-cell">
                {lead.ipAddress}
              </TableCell>

              {/* Device */}
              <TableCell className="hidden 2xl:table-cell">
                {lead.device}
              </TableCell>

              {/* Last Note */}
              <TableCell className="hidden lg:table-cell text-muted-foreground">
                {lead.lastNoteAt}
              </TableCell>

              {/* Last Contact */}
              <TableCell className="hidden lg:table-cell text-muted-foreground">
                {lead.lastContacted}
              </TableCell>

              {/* Agent */}
              <TableCell className="hidden md:table-cell">
                {lead.assignedAgent}
              </TableCell>

              {/* Status */}
              <TableCell className="hidden md:table-cell">
                <Badge variant="outline">{lead.status}</Badge>
              </TableCell>

              {/* Created At */}
              <TableCell className="hidden md:table-cell text-muted-foreground">
                {lead.createdAt}
              </TableCell>

              {/* Actions */}
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <a href={RoutePath.Lead(lead.id)}>
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
          );
        })}
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
