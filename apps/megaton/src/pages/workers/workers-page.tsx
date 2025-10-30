// TODO: This must be a dumb component, currently placeholder contents

import {
  Form,
  FormField,
  FormItem,
  Input,
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
  ReactSelectBase,
} from '@apollo/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import z from 'zod';
import { Pencil, Power, LogIn } from 'lucide-react';

const roles = [
  {
    label: 'Worker Roles',
    options: [
      { value: 'admin', label: 'Admin' },
      { value: 'manager', label: 'Manager' },
      { value: 'sales', label: 'Sales' },
    ],
  },
];

const status = [
  {
    label: 'Worker Status',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'suspended', label: 'Suspended' },
    ],
  },
];

const managers = [
  {
    label: 'Worker Managers',
    options: [
      { value: 'mike', label: 'Mike Macabulos' },
      { value: 'patrick', label: 'Patrick Manzon' },
      { value: 'christian', label: 'Christian Verzosa' },
    ],
  },
];

const workersFilterFormSchema = z.object({
  keyword: z.string(),
  status: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
  managers: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
  roles: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
});
type WorkersFilterFormValues = z.infer<typeof workersFilterFormSchema>;

const SearchKeywordInput = () => {
  const { register } = useFormContext<WorkersFilterFormValues>();
  return (
    <Input placeholder="Search name, email, or ID" {...register('keyword')} />
  );
};
const WorkersFilterForm = () => {
  const form = useForm<WorkersFilterFormValues>({
    defaultValues: {
      status: [],
      managers: [],
      roles: [],
    },
    resolver: zodResolver(workersFilterFormSchema),
  });

  return (
    <Form {...form}>
      <form className="flex flex-col md:flex-row flex-wrap gap-2">
        <SearchKeywordInput />
        <FormField
          control={form.control}
          name="roles"
          render={() => (
            <FormItem>
              <Controller
                control={form.control}
                name="roles"
                render={({ field }) => (
                  <ReactSelectBase
                    {...field}
                    isMulti
                    placeholder="Select worker roles"
                    options={roles}
                    onChange={(val) => field.onChange(val)}
                  />
                )}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={() => (
            <FormItem>
              <Controller
                control={form.control}
                name="status"
                render={({ field }) => (
                  <ReactSelectBase
                    {...field}
                    isMulti
                    placeholder="Select worker status"
                    options={status}
                    onChange={(val) => field.onChange(val)}
                  />
                )}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="managers"
          render={() => (
            <FormItem>
              <Controller
                control={form.control}
                name="managers"
                render={({ field }) => (
                  <ReactSelectBase
                    {...field}
                    isMulti
                    placeholder="Select worker managers"
                    options={managers}
                    onChange={(val) => field.onChange(val)}
                  />
                )}
              />
            </FormItem>
          )}
        />
        <Button type="button" onClick={() => form.reset()} className="flex-1">
          Reset Filters
        </Button>
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

// ---------- Main Table ----------
const WorkersTable = () => {
  return (
    <Table>
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
    <section data-testid="workers-page" className="p-4 space-y-6">
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
