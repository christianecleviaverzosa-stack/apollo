import React from 'react';
import {
  Label,
  Input,
  Textarea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Button,
  Separator,
  Form as ApolloForm,
  FormField,
  FormItem,
  FormControl,
  ReactSelectBase,
  Badge,
} from '@apollo/ui';
import { useForm, Controller } from 'react-hook-form';

export type RoleFormValues = {
  roleName: string;
  description?: string;
  accessLevel: 'full' | 'restricted' | 'read-only';
  priority: number;
  notes?: string;
  allowedGeos: { value: string; label: string }[];
  moduleScopes: {
    workers?: string[];
    leads?: string[];
    trading?: string[];
    access?: string[];
    system?: string[];
  };
};


const SCOPE_OPTIONS: Record<string, { value: string; label: string }[]> = {
  workers: [
    { value: 'read', label: 'Read' },
    { value: 'create', label: 'Create' },
    { value: 'edit', label: 'Edit' },
    { value: 'suspend', label: 'Suspend / Reactivate' },
    { value: 'reset_password', label: 'Reset Password' },
    { value: 'manage_roles', label: 'Manage Roles' },
  ],
  leads: [
    { value: 'read', label: 'Read' },
    { value: 'edit', label: 'Edit' },
    { value: 'assign', label: 'Assign / Reassign' },
    { value: 'delete', label: 'Delete' },
    { value: 'view_ftd', label: 'View FTD Clients' },
    { value: 'view_retention', label: 'View Retention Clients' },
    { value: 'export', label: 'Export' },
  ],
  trading: [
    { value: 'read_orders', label: 'View Orders' },
    { value: 'view_deposits', label: 'View Deposits' },
    { value: 'view_withdrawals', label: 'View Withdrawals' },
    { value: 'view_transfers', label: 'View Internal Transfers' },
    { value: 'view_summary', label: 'View Trading Summary' },
    { value: 'export_tx', label: 'Export Transactions' },
    { value: 'manage_sltp', label: 'Manage SL/TP' },
  ],
  access: [
    { value: 'view_sessions', label: 'View Sessions' },
    { value: 'force_logout', label: 'Force Logout' },
    { value: 'view_logs', label: 'View Activity Logs' },
    { value: 'view_access_control', label: 'View Access Control' },
    { value: 'edit_access_control', label: 'Edit Access Control' },
  ],
  system: [
    { value: 'modify_platform', label: 'Modify Platform Config' },
    { value: 'modify_notifications', label: 'Modify Notifications' },
    { value: 'modify_integrations', label: 'Modify Integrations' },
    { value: 'view_system_logs', label: 'View System Logs' },
  ],
};

/**
 * Countries / geos options
 */
const GEO_OPTIONS = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'ph', label: 'Philippines' },
  { value: 'jp', label: 'Japan' },
  { value: 'kr', label: 'South Korea' },
  { value: 'ae', label: 'United Arab Emirates' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
];

/**
 * Default values (mocked)
 */
const defaultValues: RoleFormValues = {
  roleName: 'Super Admin',
  description:
    'Has full access to all modules, settings, workers, clients, and system operations.',
  accessLevel: 'full',
  priority: 1,
  notes: '',
  allowedGeos: GEO_OPTIONS,
  moduleScopes: {
    workers: SCOPE_OPTIONS.workers.map((s) => s.value),
    leads: SCOPE_OPTIONS.leads.map((s) => s.value),
    trading: SCOPE_OPTIONS.trading.map((s) => s.value),
    access: SCOPE_OPTIONS.access.map((s) => s.value),
    system: SCOPE_OPTIONS.system.map((s) => s.value),
  },
};

export default function SuperAdminRolePage() {
  const form = useForm<RoleFormValues>({
    defaultValues,
    mode: 'onBlur',
  });

  const { register, control, handleSubmit, watch } = form;
  const watchedAccessLevel = watch('accessLevel');

  const moduleLabel: Record<string, string> = {
    workers: 'Workers Management',
    leads: 'Leads & Clients',
    trading: 'Trading Activity',
    access: 'Access & Security',
    system: 'System Settings',
  };

  const onSubmit = (data: RoleFormValues) => {
    console.log('UI-only role payload:', data);
  };

  return (
    <section data-testid="super-admin-role-page" className="relative space-y-6">
      {/* Sticky Header */}
      <div className="sticky top-0 flex flex-col bg-background z-10 shadow-sm">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-2xl font-semibold">Super Admin Role</h2>
          <Button form="super-admin-role-form" type="submit">
            Save Changes
          </Button>
        </div>
        <Separator />
      </div>

      <ApolloForm {...form}>
        <form
          id="super-admin-role-form"
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4"
        >
          {/* LEFT SIDE */}
          <div className="space-y-4">
            <Label className="text-muted-foreground">Role Information</Label>

            <div className="flex flex-col gap-2">
              <Label>Role Name</Label>
              <Input placeholder="Role name" {...register('roleName')} />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Description</Label>
              <Textarea
                className="min-h-[90px]"
                placeholder="Short description"
                {...register('description')}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={control}
                name="accessLevel"
                render={({ field }) => (
                  <FormItem>
                    <Label>Access Level</Label>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">Full Access</SelectItem>
                          <SelectItem value="restricted">
                            Restricted
                          </SelectItem>
                          <SelectItem value="read-only">Read Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-2">
                <Label>Priority Level</Label>
                <Input
                  type="number"
                  {...register('priority', { valueAsNumber: true })}
                />
              </div>
            </div>

            <FormField
              control={control}
              name="allowedGeos"
              render={() => (
                <FormItem>
                  <Label>Allowed Geos</Label>
                  <Controller
                    control={control}
                    name="allowedGeos"
                    render={({ field }) => (
                      <ReactSelectBase
                        {...field}
                        isMulti
                        options={GEO_OPTIONS}
                        onChange={(val) => field.onChange(val)}
                      />
                    )}
                  />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-2">
              <Label>Notes</Label>
              <Textarea
                className="min-h-[100px]"
                placeholder="Internal notes"
                {...register('notes')}
              />
            </div>

            <Separator />
            <Button variant="outline" className="text-destructive" size="sm">
              Delete Role
            </Button>
          </div>

          {/* RIGHT SIDE - PERMISSIONS */}
          <div className="space-y-4">
            <Label className="text-muted-foreground">
              Permissions (Module Scopes)
            </Label>

            {Object.keys(SCOPE_OPTIONS).map((moduleKey) => (
              <div
                key={moduleKey}
                className="rounded-md border p-4 bg-muted/30 space-y-2"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">
                      {moduleLabel[moduleKey] ?? moduleKey}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Select allowed scopes
                    </div>
                  </div>

                  <Badge variant="secondary">
                    {watchedAccessLevel === 'full' ? 'Full' : 'Custom'}
                  </Badge>
                </div>

                <FormField
                  control={control}
                  name={`moduleScopes.${moduleKey}` as any}
                  render={() => (
                    <FormItem>
                      <Controller
                        control={control}
                        name={`moduleScopes.${moduleKey}` as any}
                        render={({ field }) => (
                          <ReactSelectBase
                            {...field}
                            isMulti
                            placeholder="Select scopes"
                            options={SCOPE_OPTIONS[moduleKey]}
                            onChange={(selected) =>
                              field.onChange(
                                Array.isArray(selected)
                                  ? selected.map((s: any) => s.value)
                                  : []
                              )
                            }
                            value={
                              (field.value ?? []).map((v: string) => {
                                const found =
                                  SCOPE_OPTIONS[moduleKey].find(
                                    (o) => o.value === v
                                  );
                                return found ?? { value: v, label: v };
                              }) as any
                            }
                          />
                        )}
                      />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
        </form>
      </ApolloForm>
    </section>
  );
}
