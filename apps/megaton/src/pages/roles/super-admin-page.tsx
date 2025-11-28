import {
  Label,
  Input,
  Textarea,
  Switch,
  Button,
  Separator,
  Form as ApolloForm,
  FormField,
  FormItem,
  FormControl,
} from '@apollo/ui';
import { useForm, useFormContext } from 'react-hook-form';

const RolePermissions = () => {
  const MODULES = {
    workers: {
      label: 'Workers Management',
      permissions: [
        { value: 'read', text: 'Read Workers' },
        { value: 'create', text: 'Create Worker' },
        { value: 'edit', text: 'Edit Worker' },
        { value: 'suspend', text: 'Suspend / Reactivate Worker' },
        { value: 'reset_password', text: 'Reset Password' },
        { value: 'manage_roles', text: 'Manage Worker Roles' },
      ],
    },
    leads: {
      label: 'Leads & Clients',
      permissions: [
        { value: 'read', text: 'Read Leads / Clients' },
        { value: 'edit', text: 'Edit Lead Information' },
        { value: 'assign', text: 'Assign / Reassign Leads' },
        { value: 'delete', text: 'Delete Leads' },
        { value: 'view_ftd', text: 'View FTD Clients' },
        { value: 'view_retention', text: 'View Retention Clients' },
        { value: 'export', text: 'Export Leads / Clients' },
      ],
    },
    trading: {
      label: 'Trading Activity',
      permissions: [
        { value: 'read_orders', text: 'View Orders' },
        { value: 'view_deposits', text: 'View Deposits' },
        { value: 'view_withdrawals', text: 'View Withdrawals' },
        { value: 'view_transfers', text: 'View Internal Transfers' },
        { value: 'view_summary', text: 'View Trading Summary' },
        { value: 'export_tx', text: 'Export Transactions' },
        { value: 'manage_sltp', text: 'Manage SL / TP' },
      ],
    },
    access: {
      label: 'Access & Security',
      permissions: [
        { value: 'view_sessions', text: 'View Login Sessions' },
        { value: 'force_logout', text: 'Force Logout Users' },
        { value: 'view_logs', text: 'View Activity Logs' },
        { value: 'view_access_control', text: 'View Access Control' },
        { value: 'edit_access_control', text: 'Edit Access Control' },
      ],
    },
    system: {
      label: 'System Settings',
      permissions: [
        { value: 'modify_platform', text: 'Modify Platform Configuration' },
        { value: 'modify_notifications', text: 'Modify Notifications' },
        { value: 'modify_integrations', text: 'Modify Integrations' },
        { value: 'view_system_logs', text: 'View System Logs' },
      ],
    },
  };

  const { control } = useFormContext();

  return (
    <div className="space-y-6">
      <Label className="text-muted-foreground">Role Permissions</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {Object.entries(MODULES).map(([moduleKey, module]) => (
          <div key={moduleKey} className="rounded-md border p-4 bg-muted/30">
            <div className="font-medium mb-3">{module.label}</div>
            <div className="space-y-3">
              {module.permissions.map((p, index) => (
                <FormField
                  key={index}
                  control={control}
                  name={`moduleScopes.${moduleKey}.${p.value}`}
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between px-1">
                      <Label>{p.text}</Label>
                      <FormControl>
                        <Switch
                          checked={!!field.value}
                          onCheckedChange={(val) => field.onChange(val)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RoleMetadataCoreSettings = () => {
  const { register, watch } = useFormContext();
  const ipWhitelistEnabled = watch('enableIPWhitelist');

  return ( 
    <div className="space-y-6">
      <Label className="text-muted-foreground">
        Role Metadata & Core Settings
      </Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Static Display Fields */}
          <div className="space-y-1">
            <Label>Role Name</Label>
            <p>{watch('role')}</p>
          </div>
          <div className="space-y-1">
            <Label>Role ID</Label>
            <p>{watch('roleId')}</p>
          </div>
          <div className="space-y-1">
            <Label>Priority Level</Label>
            <p>1</p>
          </div>
          {/* Require 2FA */}
          <div className="flex items-center justify-between">
            <Label>Require Two-Factor Authentication</Label>
            <Switch {...register('require2FA')} />
          </div>
          {/* Enable IP Whitelist */}
          <div className="flex items-center justify-between">
            <Label>Enable IP Whitelist</Label>
            <Switch {...register('enableIPWhitelist')} />
          </div>
          {/* IP List Input (Conditional) */}
          {ipWhitelistEnabled && (
            <div className="flex flex-col gap-2">
              <Label>Allowed IPs (comma-separated)</Label>
              <Textarea
                className="min-h-[80px]"
                placeholder="e.g. 192.168.1.1, 10.0.0.5"
                {...register('ipList')}
              />
            </div>
          )}
        </div>
        <div className="space-y-6">
          {/* Editable Fields */}
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
          {/* Static Display Fields */}
          <div className="space-y-1">
            <Label>Role Status</Label>
            <p>Locked (System Role)</p>
          </div>
          <div className="space-y-1">
            <Label>Server Scope</Label>
            <p>All Trading Servers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function SuperAdminPage() {
  const form = useForm({
    defaultValues: {
      role: 'Super Admin',
      roleId: 'SYS-ROLE-SUPERADMIN',
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
          <h2 className="text-2xl font-semibold">Super Admin</h2>
          <Button form="super-admin-form" type="submit">
            Save Changes
          </Button>
        </div>
        <Separator />
      </div>
      <ApolloForm {...form}>
        <form id="super-admin-form" className="space-y-10 p-4">
          <RoleMetadataCoreSettings />
          <RolePermissions />
        </form>
      </ApolloForm>
    </section>
  );
}
