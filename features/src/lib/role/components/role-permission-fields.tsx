import { Label, Switch, FormField, FormItem, FormControl } from '@apollo/ui';
import { useFormContext } from 'react-hook-form';

export const RolePermissionFields = () => {
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
