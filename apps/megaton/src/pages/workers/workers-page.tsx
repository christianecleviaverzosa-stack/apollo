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
  TableBody,
  TableCell,
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
  setCurrentDialog,
} from '@apollo/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext } from 'react-hook-form';
import z from 'zod';
import { Pencil, Power, LogIn } from 'lucide-react';
import { useContext } from 'react';

const workersFilterFormSchema = z.object({
  keyword: z.string(),
  role: z.string(),
  status: z.string(),
  manager: z.string(),
  leadRange: z.string(),
});
type WorkersFilterFormValues = z.infer<typeof workersFilterFormSchema>;

const SearchKeywordInput = () => {
  const { register } = useFormContext<WorkersFilterFormValues>();
  return (
    <Input placeholder="Search name, email, or ID" {...register('keyword')} />
  );
};

const RoleSelectField = () => {
  const { control } = useFormContext<WorkersFilterFormValues>();
  return (
    <FormField
      control={control}
      name="role"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

const AutoLeadRangeSelectField = () => {
  const { control } = useFormContext<WorkersFilterFormValues>();
  return (
    <FormField
      control={control}
      name="leadRange"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Auto Lead Range</SelectItem>
                <SelectItem value="1-20">1-20 Auto Leads</SelectItem>
                <SelectItem value="21-40">21-40 Auto Leads</SelectItem>
                <SelectItem value="41-60">41-60 Auto Leads</SelectItem>
                <SelectItem value="61-80">61-80 Auto Leads</SelectItem>
                <SelectItem value="80-100">80-100+ Auto Leads</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

const ManagerSelectField = () => {
  const { control } = useFormContext<WorkersFilterFormValues>();
  return (
    <FormField
      control={control}
      name="manager"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Managers</SelectItem>
                <SelectItem value="mike">Mike Macabulos</SelectItem>
                <SelectItem value="patrick">Patrick Manzon</SelectItem>
                <SelectItem value="christian">Chrisitan Verzosa</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

const WorkerStatusSelectField = () => {
  const { control } = useFormContext<WorkersFilterFormValues>();
  return (
    <FormField
      control={control}
      name="status"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Account Status</SelectItem>
                <SelectItem value="online">Active</SelectItem>
                <SelectItem value="suspeneded">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
const WorkersFilterForm = () => {
  const form = useForm<WorkersFilterFormValues>({
    defaultValues: {
      role: 'all',
      status: 'all',
      manager: 'all',
      leadRange: 'all',
    },
    resolver: zodResolver(workersFilterFormSchema),
  });

  return (
    <Form {...form}>
      <form className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        <SearchKeywordInput />
        <RoleSelectField />
        <ManagerSelectField />
        <AutoLeadRangeSelectField />
        <WorkerStatusSelectField />
        <Button>Reset Filters</Button>
      </form>
    </Form>
  );
};

// ---------- Types ----------
type WorkerRole = 'Super Admin' | 'Admin' | 'Manager' | 'Sales';

type Worker = {
  id: string;
  name: string;
  role: WorkerRole;
  manager: string;
  geo: string;
  autoLead: number;
  activeLeads: number;
  email: string;
  status: string;
};

// ---------- Dummy Data ----------
const workersData: Worker[] = [
  {
    id: '1',
    name: 'Super Admin',
    role: 'Super Admin',
    manager: '-',
    geo: 'AF',
    autoLead: 10,
    activeLeads: 45,
    email: 'superadmin@email.com',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Mike Macabulos',
    role: 'Manager',
    manager: '-',
    geo: 'AX, DZ, AD',
    autoLead: 100,
    activeLeads: 30,
    email: 'mike@email.com',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Patrick Manzon',
    role: 'Manager',
    manager: '-',
    geo: 'AF, AL, DZ, DK, DE',
    autoLead: 2,
    activeLeads: 15,
    email: 'patrick@email.com',
    status: 'Active',
  },
  {
    id: '4',
    name: 'Christian Verzosa',
    role: 'Manager',
    manager: '-',
    geo: 'AS, AD',
    autoLead: 5,
    activeLeads: 22,
    email: 'christian@email.com',
    status: 'Active',
  },
  {
    id: '5',
    name: 'Jannik Sinner',
    role: 'Sales',
    manager: 'Mike Macabulos',
    geo: 'AF, DE',
    autoLead: 8,
    activeLeads: 18,
    email: 'jannik@email.com',
    status: 'Active',
  },
  {
    id: '6',
    name: 'Henry Alcaraz',
    role: 'Sales',
    manager: 'Mike Macabulos',
    geo: 'AF, DE, FR',
    autoLead: 0,
    activeLeads: 0,
    email: 'henry@email.com',
    status: 'Active',
  },
  {
    id: '7',
    name: 'Oliva Sway',
    role: 'Sales',
    manager: 'Mike Macabulos',
    geo: 'AS',
    autoLead: 4,
    activeLeads: 12,
    email: 'olivia@email.com',
    status: 'Suspended',
  },
];

const WorkerTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="min-w-32 md:min-w-64">User</TableHead>
        <TableHead>Role</TableHead>
        <TableHead>Manager</TableHead>
        <TableHead className="min-w-32">Auto Lead</TableHead>
        <TableHead className="min-w-32">Active Leads</TableHead>
        <TableHead className="min-w-32">Geo</TableHead>
        <TableHead>Status</TableHead>
        <TableHead />
      </TableRow>
    </TableHeader>
  );
};
// ---------- Main Table ----------
const WorkersTable = () => {
  return (
    <Table>
      <WorkerTableHeader />
      <TableBody>
        {workersData.map((worker) => (
          <TableRow key={worker.id}>
            {/* User */}
            <TableCell className="flex flex-col">
              <p className="text-sm">{worker.name}</p>
              <a
                href={`mailto:${worker.email}`}
                className="text-xs text-blue-600 hover:underline"
              >
                {worker.email}
              </a>
            </TableCell>

            {/* Role */}
            <TableCell>{worker.role}</TableCell>

            {/* Manager */}
            <TableCell>{worker.manager}</TableCell>

            {/* Auto Lead */}
            <TableCell>{worker.autoLead}</TableCell>

            {/* Active Leads */}
            <TableCell>{worker.activeLeads}</TableCell>

            {/* Geo */}
            <TableCell>{worker.geo}</TableCell>

            {/* Account Status */}
            <TableCell>{worker.status}</TableCell>

            {/* Actions */}
            <TableCell className="flex justify-end">
              <div className="flex gap-2">
                <Button
                  onClick={() =>
                    setCurrentDialog({ content: 'edit-worker', open: true })
                  }
                  variant="ghost"
                  size="icon"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() =>
                    setCurrentDialog({ content: 'suspend-worker', open: true })
                  }
                  variant="ghost"
                  size="icon"
                >
                  <Power className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <LogIn className="h-4 w-4" />
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

export default function WorkersPage() {
  return (
    <section data-testid="workers-page" className="space-y-6">
      <h2 className="text-2xl font-semibold">Workers List</h2>
      <WorkersFilterForm />
      <div className="relative w-full">
        <div className="absolute space-y-4 left-0 top-0 w-full pb-4">
          <div className="rounded-md border">
            <WorkersTable />
          </div>
          <TablePagination />
        </div>
      </div>
    </section>
  );
}
