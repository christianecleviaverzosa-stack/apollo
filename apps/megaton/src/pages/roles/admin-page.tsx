import { Button, Separator, Form as ApolloForm } from '@apollo/ui';
import { useForm } from 'react-hook-form';
import {
  RoleMetadataCoreFields,
  RolePermissionFields,
} from '@apollo/features/role';

export default function AdminPage() {
  const form = useForm({
    defaultValues: {
      role: 'Admin',
      roleId: 'ROLE-ADMIN',

      require2FA: true,
      enableIPWhitelist: false,
      ipList: '',
      sessionTimeout: 30,
      maxSessions: 2,

      moduleScopes: {
        workers: {
          read: true,
          create: true,
          edit: true,
          suspend: true,
          reset_password: true,
          manage_roles: false,
        },
        leads: {
          read: true,
          edit: true,
          assign: true,
          delete: false,
          view_ftd: true,
          view_retention: true,
          export: true,
        },
        trading: {
          read_orders: true,
          view_deposits: true,
          view_withdrawals: true,
          view_transfers: true,
          view_summary: true,
          export_tx: true,
          manage_sltp: false,
        },
        access: {
          view_sessions: true,
          force_logout: true,
          view_logs: true,
          view_access_control: true,
          edit_access_control: false,
        },
        system: {
          modify_platform: false,
          modify_notifications: false,
          modify_integrations: false,
          view_system_logs: false,
        },
      },
    },
  });

  return (
    <section data-testid="admin-role-page" className="relative space-y-6">
      <div className="sticky top-0 flex flex-col bg-background z-10 shadow-sm">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-2xl font-semibold">Admin Role</h2>
          <Button form="admin-role-form" type="submit">
            Save Changes
          </Button>
        </div>
        <Separator />
      </div>

      <ApolloForm {...form}>
        <form id="admin-role-form" className="space-y-10 p-4">
          <RoleMetadataCoreFields />
          <RolePermissionFields />
        </form>
      </ApolloForm>
    </section>
  );
}
