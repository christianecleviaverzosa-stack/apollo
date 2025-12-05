import { useMemo } from "react";
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
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  TableBody,
  TableCell,
  Badge,
  ReactSelectBase,
} from "@apollo/ui";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import z from "zod";
import {  Eye } from "lucide-react";
import { countries, RoutePath } from "@apollo/constants";

// -------------------------
// SCHEMA
// -------------------------
const assignmentFilterSchema = z.object({
  keyword: z.string().optional(),
  agents: z.array(z.any()).optional(),
  countries: z.array(z.any()).optional(),
  leadType: z.string().optional(),
  status: z.string().optional(),
  unassignedOnly: z.boolean().optional(),
  dateRange: z
    .object({
      from: z.date(),
      to: z.date().optional(),
    })
    .optional(),

  selectedLeadIds: z.array(z.string()).optional(),
});

type AssignmentFormValues = z.infer<typeof assignmentFilterSchema>;

// -------------------------
// OPTIONS
// -------------------------
const agents = [
  {
    label: "Managers",
    options: [
      { value: "Manager 1", label: "Manager 1" },
      { value: "Manager 2", label: "Manager 2" },
    ],
  },
  {
    label: "Sales",
    options: [
      { value: "Sales 1", label: "Sales 1" },
      { value: "Sales 2", label: "Sales 2" },
      { value: "Sales 3", label: "Sales 3" },
    ],
  },
];

const leadTypes = [
  { value: "all", label: "All Lead Types" },
  { value: "demo", label: "Demo" },
  { value: "active", label: "Active" },
  { value: "trial", label: "Trial" },
];

const statuses = [
  { value: "all", label: "All Status" },
  { value: "new", label: "New" },
  { value: "follow-up", label: "Follow-up" },
  { value: "pending", label: "Pending" },
  { value: "converted", label: "Converted" },
];

// -------------------------
// LEADS DATA
// -------------------------
const leadsData = [
  {
    id: "00000001",
    leadType: "Demo",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    phone: "+1 202 555 0183",
    country: "United States",
    assignedAgent: "Sales 1",
    status: "New",
    createdAt: "2025-10-25",
  },
  {
    id: "00000002",
    leadType: "Active",
    firstName: "Maria",
    lastName: "Garcia",
    email: "maria.garcia@example.com",
    phone: "+34 601 555 214",
    country: "Spain",
    assignedAgent: "Sales 1",
    status: "Follow-up",
    createdAt: "2025-10-20",
  },
  {
    id: "00000003",
    leadType: "Demo",
    firstName: "James",
    lastName: "Lee",
    email: "james.lee@example.com",
    phone: "+63 917 555 8877",
    country: "Philippines",
    assignedAgent: "Sales 1",
    status: "Converted",
    createdAt: "2025-10-18",
  },
  {
    id: "00000004",
    leadType: "Trial",
    firstName: "Sofia",
    lastName: "Martinez",
    email: "sofia.martinez@example.com",
    phone: "+52 998 233 6744",
    country: "Mexico",
    assignedAgent: "Sales 1",
    status: "Pending",
    createdAt: "2025-10-17",
  },
];

// -------------------------
// FILTER FORM
// -------------------------
const AssignmentFilterForm = () => {
  const { control, register, reset } = useFormContext<AssignmentFormValues>();

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
      <Input placeholder="Search name, email, or ID" {...register("keyword")} />

      {/* AGENTS */}
      <FormField
        control={control}
        name="agents"
        render={() => (
          <FormItem>
            <Controller
              control={control}
              name="agents"
              render={({ field }) => (
                <ReactSelectBase {...field} isMulti placeholder="Select agents" options={agents} />
              )}
            />
          </FormItem>
        )}
      />

      {/* COUNTRIES */}
      <FormField
        control={control}
        name="countries"
        render={() => (
          <FormItem>
            <Controller
              control={control}
              name="countries"
              render={({ field }) => (
                <ReactSelectBase {...field} isMulti placeholder="Select countries" options={countries} />
              )}
            />
          </FormItem>
        )}
      />

      {/* LEAD TYPE */}
      <FormField
        control={control}
        name="leadType"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
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

      {/* STATUS */}
      <FormField
        control={control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
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

      <Button type="button" onClick={() => reset()}>
        Reset Filters
      </Button>
      <Button type="button">Apply Filters</Button>
    </form>
  );
};

// -------------------------
// TABLE — SAME AS LEADS PAGE LAYOUT
// -------------------------
const AssignmentTable = () => {
  const { watch, setValue, getValues } = useFormContext<AssignmentFormValues>();

  const [keyword, agentsSelected, leadType, status, selectedLeadIds] = watch([
    "keyword",
    "agents",
    "leadType",
    "status",
    "selectedLeadIds",
  ]);

  // FILTER
  const filtered = useMemo(() => {
    let r = leadsData.slice();

    if (keyword?.trim()) {
      const k = keyword.toLowerCase();
      r = r.filter(
        (l) =>
          l.firstName.toLowerCase().includes(k) ||
          l.lastName.toLowerCase().includes(k) ||
          l.email.toLowerCase().includes(k) ||
          l.id.toLowerCase().includes(k)
      );
    }

    if (agentsSelected?.length) {
      const as = agentsSelected.map((a) => a.label);
      r = r.filter((l) => as.includes(l.assignedAgent));
    }

    if (leadType && leadType !== "all") {
      r = r.filter((l) => l.leadType.toLowerCase() === leadType.toLowerCase());
    }

    if (status && status !== "all") {
      r = r.filter((l) => l.status.toLowerCase() === status.toLowerCase());
    }

    return r;
  }, [keyword, agentsSelected, leadType, status]);

  // SELECTION
  const allIds = filtered.map((l) => l.id);
  const isAllSelected = selectedLeadIds?.length === allIds.length;

  const toggleSelectAll = () => {
    setValue("selectedLeadIds", isAllSelected ? [] : allIds);
  };

  const toggleSelectOne = (id: string) => {
    const current = getValues("selectedLeadIds") ?? [];
    if (current.includes(id)) {
      setValue(
        "selectedLeadIds",
        current.filter((x) => x !== id)
      );
    } else {
      setValue("selectedLeadIds", [...current, id]);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60px] text-center">
            <input type="checkbox" checked={isAllSelected} onChange={toggleSelectAll} />
          </TableHead>

          <TableHead className="min-w-28">Lead Type</TableHead>
          <TableHead className="min-w-40">First</TableHead>
          <TableHead className="min-w-40">Last</TableHead>
          <TableHead className="min-w-56 hidden md:table-cell">Email</TableHead>
          <TableHead className="min-w-40 hidden lg:table-cell">Phone</TableHead>
          <TableHead className="min-w-40">Country</TableHead>
          <TableHead className="min-w-40 hidden md:table-cell">Agent</TableHead>
          <TableHead className="min-w-32 hidden md:table-cell">Status</TableHead>
          <TableHead className="min-w-40 hidden md:table-cell">Created</TableHead>

          <TableHead className="w-[100px] text-right"></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {filtered.map((l) => {
          const checked = selectedLeadIds?.includes(l.id);

          return (
            <TableRow key={l.id} className="hover:bg-muted/50">
              <TableCell className="text-center">
                <input type="checkbox" checked={checked} onChange={() => toggleSelectOne(l.id)} />
              </TableCell>

              <TableCell>
                <Badge variant="secondary">{l.leadType}</Badge>
              </TableCell>

              <TableCell>{l.firstName}</TableCell>
              <TableCell>{l.lastName}</TableCell>

              <TableCell className="hidden md:table-cell">{l.email}</TableCell>
              <TableCell className="hidden lg:table-cell">{l.phone}</TableCell>

              <TableCell>{l.country}</TableCell>

              <TableCell className="hidden md:table-cell">
                {l.assignedAgent || <span className="text-muted-foreground">Unassigned</span>}
              </TableCell>

              <TableCell className="hidden md:table-cell">
                <Badge variant="outline">{l.status}</Badge>
              </TableCell>

              <TableCell className="hidden md:table-cell text-muted-foreground">{l.createdAt}</TableCell>

              <TableCell className="text-right">
                <a href={RoutePath.Lead(l.id)}>
                  <Button size="icon" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                </a>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

// -------------------------
// BULK ACTION BAR
// -------------------------
const BulkActionBar = () => {
  const { watch, setValue } = useFormContext<AssignmentFormValues>();
  const selected = watch("selectedLeadIds") ?? [];

  if (selected.length === 0) return null;

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-background border rounded-md px-4 py-3 shadow-lg flex items-center gap-3 z-50">
      <div className="text-sm hidden md:block">Selected: {selected.length}</div>

      <ReactSelectBase
        className="min-w-[220px]"
        isClearable
        placeholder="Assign to agent"
        options={agents}
        menuPlacement="top"
      />

      <Button>Assign</Button>

      <Button variant="ghost" onClick={() => setValue("selectedLeadIds", [])}>
        Clear
      </Button>
    </div>
  );
};

// -------------------------
// PAGE
// -------------------------
export default function LeadAssignmentPage() {
  const methods = useForm<AssignmentFormValues>({
    resolver: zodResolver(assignmentFilterSchema),
    defaultValues: {
      keyword: "",
      agents: [],
      countries: [],
      leadType: "all",
      status: "all",
      selectedLeadIds: [],
    },
  });

  return (
    <section className="p-4 space-y-6">
      <h2 className="text-2xl font-semibold">Lead Assignment</h2>

      <FormProvider {...methods}>
        <AssignmentFilterForm />

        {/* SAME AS LEADS PAGE */}
        <div className="relative w-full">
          <div className="absolute left-0 top-0 w-full space-y-4 pb-4">
            <div className="rounded-md border overflow-x-auto">
              <AssignmentTable />
            </div>

            {/* PAGINATION */}
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
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>

        <BulkActionBar />
      </FormProvider>
    </section>
  );
}
