import { Button, Separator, Form as ApolloForm } from '@apollo/ui';
import { useForm } from 'react-hook-form';
import {
  RoleMetadataCoreFields,
  RolePermissionFields,
} from '@apollo/features/role';

export default function SalesPage() {
  const form = useForm({
    defaultValues: {
      role: 'Sales',
      roleId: 'ROLE-SALES',

      require2FA: false,
      enableIPWhitelist: false,
      ipList: '',
      sessionTimeout: 30,
      maxSessions: 1,

      moduleScopes: {
        workers: {
          read: true,
          create: false,
          edit: false,
          suspend: false,
          reset_password: false,
          manage_roles: false,
        },
        leads: {
          read: true,
          edit: true,
          assign: true,
          delete: false,
          view_ftd: true,
          view_retention: true,
          export: false,
        },
        trading: {
          read_orders: true,
          view_deposits: true,
          view_withdrawals: false,
          view_transfers: false,
          view_summary: true,
          export_tx: false,
          manage_sltp: false,
        },
        access: {
          view_sessions: false,
          force_logout: false,
          view_logs: false,
          view_access_control: false,
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
    <section data-testid="sales-role-page" className="relative space-y-6">
      <div className="sticky top-0 flex flex-col bg-background z-10 shadow-sm">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-2xl font-semibold">Sales Role</h2>
          <Button form="sales-role-form" type="submit">
            Save Changes
          </Button>
        </div>

        <Separator />
      </div>

      <ApolloForm {...form}>
        <form id="sales-role-form" className="space-y-10 p-4">
          <RoleMetadataCoreFields />
          <RolePermissionFields />
        </form>
      </ApolloForm>
    </section>
  );
}
