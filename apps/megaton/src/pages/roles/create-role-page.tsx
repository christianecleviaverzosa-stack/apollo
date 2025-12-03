import {
  Button,
  Separator,
  Label,
  Input,
  Textarea,
  Switch,
  Form as ApolloForm,
} from '@apollo/ui';
import { useForm } from 'react-hook-form';
import { RolePermissionFields } from '@apollo/features/role';

const defaultValues = {
  role: '',
  roleId: '',
  require2FA: false,
  enableIPWhitelist: false,
  ipList: '',
  sessionTimeout: 30,
  maxSessions: 1,

  moduleScopes: {
    workers: {
      read: false,
      create: false,
      edit: false,
      suspend: false,
      reset_password: false,
      manage_roles: false,
    },
    leads: {
      read: false,
      edit: false,
      assign: false,
      delete: false,
      view_ftd: false,
      view_retention: false,
      export: false,
    },
    trading: {
      read_orders: false,
      view_deposits: false,
      view_withdrawals: false,
      view_transfers: false,
      view_summary: false,
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
};

export default function CreateRolePage() {
  const form = useForm({ defaultValues });
  const { register, watch } = form;

  const ipWhiteEnabled = watch('enableIPWhitelist');

  return (
    <section data-testid="create-role-page" className="relative space-y-6">
      {/* Sticky Header */}
      <div className="sticky top-0 flex flex-col bg-background z-10 shadow-sm">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-2xl font-semibold">Create Role</h2>
          <Button form="create-role-form" type="submit">
            Create Role
          </Button>
        </div>
        <Separator />
      </div>

      <ApolloForm {...form}>
        <form id="create-role-form" className="flex flex-col gap-10 p-4">
          {/* =======================
              ROLE METADATA SECTION
          ======================== */}
          <div className="flex flex-col gap-4">
            <Label className="text-muted-foreground">
              Role Metadata & Core Settings
            </Label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Role Name</Label>
                  <Input placeholder="Enter role name" {...register('role')} />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Role ID</Label>
                  <Input
                    placeholder="Optional — auto-generated if empty"
                    {...register('roleId')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Require Two-Factor Authentication</Label>
                  <Switch {...register('require2FA')} />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Enable IP Whitelist</Label>
                  <Switch {...register('enableIPWhitelist')} />
                </div>

                {ipWhiteEnabled && (
                  <div className="flex flex-col gap-2">
                    <Label>Allowed IPs (comma-separated)</Label>
                    <Textarea
                      className="min-h-[80px]"
                      placeholder="192.168.1.1, 10.0.0.5"
                      {...register('ipList')}
                    />
                  </div>
                )}
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Session Timeout (minutes)</Label>
                  <Input
                    type="number"
                    {...register('sessionTimeout', { valueAsNumber: true })}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Max Concurrent Sessions</Label>
                  <Input
                    type="number"
                    {...register('maxSessions', { valueAsNumber: true })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* =======================
              PERMISSIONS SECTION
          ======================== */}
          <RolePermissionFields />
        </form>
      </ApolloForm>
    </section>
  );
}
