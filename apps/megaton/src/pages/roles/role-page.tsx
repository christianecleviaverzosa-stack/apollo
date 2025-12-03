import { Button, Separator, Form as ApolloForm } from '@apollo/ui';
import { useForm } from 'react-hook-form';
import {
  RoleMetadataCoreFields,
  RolePermissionFields,
} from '@apollo/features/role';
import { useParams } from 'react-router-dom';

export default function RolePage() {
  const { id } = useParams();
  const form = useForm({
    defaultValues: {
      role: id,
      roleId: `SYS-ROLE-${id}`,
      require2FA: true,
      enableIPWhitelist: true,
      ipList: '',
      sessionTimeout: 30,
      maxSessions: 1,

      moduleScopes: {
        workers: {
          read: true,
          create: true,
          edit: true,
          suspend: true,
          reset_password: true,
          manage_roles: true,
        },
        leads: {
          read: true,
          edit: true,
          assign: true,
          delete: true,
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
          manage_sltp: true,
        },
        access: {
          view_sessions: true,
          force_logout: true,
          view_logs: true,
          view_access_control: true,
          edit_access_control: true,
        },
        system: {
          modify_platform: true,
          modify_notifications: true,
          modify_integrations: true,
          view_system_logs: true,
        },
      },
    },
  });

  return (
    <section data-testid="super-admin-page" className="relative space-y-6">
      <div className="sticky top-0 flex flex-col bg-background z-10 shadow-sm">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-2xl font-semibold capitalize">{id}</h2>
            <Button type='button'>
              Save Changes
            </Button>
        </div>
        <Separator />
      </div>
      <ApolloForm {...form}>
        <form id="super-admin-form" className="space-y-10 p-4">
          <RoleMetadataCoreFields />
          <RolePermissionFields />
          <Button className='text-destructive' variant='link'>Delete Role</Button>
        </form>
      </ApolloForm>
    </section>
  );
}
