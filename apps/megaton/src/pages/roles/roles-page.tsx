import {
  Button,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  Switch,
  Badge,
} from '@apollo/ui';
import { useState } from 'react';
import { RoutePath } from '@apollo/constants';
import { Eye, Trash2 } from 'lucide-react';

const initialRoles = [
  {
    role: 'Admin',
    roleId: 'SYS-ROLE-ADMIN',
    users: 3,
    createdAt: '2024-01-11',
    updatedAt: '2024-11-20',
    showInSidebar: true,
  },
  {
    role: 'Manager',
    roleId: 'SYS-ROLE-MANAGER',
    users: 6,
    createdAt: '2024-01-15',
    updatedAt: '2024-11-15',
    showInSidebar: true,
  },
  {
    role: 'Sales',
    roleId: 'SYS-ROLE-SALES',
    users: 24,
    createdAt: '2024-01-21',
    updatedAt: '2024-10-30',
    showInSidebar: true,
  },
];

export default function RolesPage() {
  const [roles, setRoles] = useState(initialRoles);

  return (
    <section data-testid="roles-page" className="p-4 space-y-6">
      {/* Page Title + Create Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">All Roles</h2>
        <a href={RoutePath.CreateRole}>
          <Button>Create Role</Button>
        </a>
      </div>

      {/* Roles Table */}
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-40">Role</TableHead>
              <TableHead className="min-w-40">Role ID</TableHead>
              <TableHead className="min-w-28">Users</TableHead>
              <TableHead className="min-w-36">Created At</TableHead>
              <TableHead className="min-w-36">Updated At</TableHead>
              <TableHead className="min-w-32 text-center">
                Show in Sidebar
              </TableHead>
              <TableHead className="min-w-24 text-right" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {roles.map((r) => (
              <TableRow key={r.roleId} className="hover:bg-muted/50">
                <TableCell className="font-medium">
                  <a href={RoutePath.Role(r.role)} className="hover:underline">
                    {r.role}
                  </a>
                </TableCell>

                <TableCell>{r.roleId}</TableCell>

                <TableCell>
                  <Badge variant="secondary">{r.users}</Badge>
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {r.createdAt}
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {r.updatedAt}
                </TableCell>

                {/* Show in Sidebar Toggle */}
                <TableCell className="text-center">
                  <Switch
                    checked={r.showInSidebar}
                    onCheckedChange={(val) =>
                      setRoles((prev) =>
                        prev.map((x) =>
                          x.roleId === r.roleId
                            ? { ...x, showInSidebar: val }
                            : x
                        )
                      )
                    }
                  />
                </TableCell>

                {/* Action Buttons */}
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <a href={RoutePath.Role(r.role)}>
                      <Button size="icon" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </a>

                    <Button size="icon" variant="ghost">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
