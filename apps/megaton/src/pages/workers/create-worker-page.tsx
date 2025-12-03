import {
  Button,
  Separator,
  Label,
  Input,
  Textarea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  Switch,
  Form as ApolloForm,
  ReactSelectBase,
} from '@apollo/ui';

import { useForm, Controller } from 'react-hook-form';
import { RolePermissionFields } from '@apollo/features/role';

// -----------------------------
// Shared Constants
// -----------------------------
const DEPARTMENTS = [
  { value: 'sales', label: 'Sales' },
  { value: 'retention', label: 'Retention' },
  { value: 'support', label: 'Customer Support' },
  { value: 'compliance', label: 'Compliance' },
  { value: 'finance', label: 'Finance' },
  { value: 'tech', label: 'Tech / Dev' },
  { value: 'operations', label: 'Operations' },
];

const TEAMS = [
  { value: 'sales_a', label: 'Sales Team A' },
  { value: 'sales_b', label: 'Sales Team B' },
  { value: 'retention_1', label: 'Retention Tier 1' },
  { value: 'retention_2', label: 'Retention Tier 2' },
  { value: 'cs_evening', label: 'CS — Evening Shift' },
  { value: 'cs_weekend', label: 'CS — Weekend Shift' },
];

const timezones = [
  {
    label: 'North America',
    zones: [
      { value: 'est', label: 'Eastern Standard Time (EST)' },
      { value: 'cst', label: 'Central Standard Time (CST)' },
      { value: 'mst', label: 'Mountain Standard Time (MST)' },
      { value: 'pst', label: 'Pacific Standard Time (PST)' },
      { value: 'akst', label: 'Alaska Standard Time (AKST)' },
      { value: 'hst', label: 'Hawaii Standard Time (HST)' },
    ],
  },
  {
    label: 'Europe & Africa',
    zones: [
      { value: 'gmt', label: 'Greenwich Mean Time (GMT)' },
      { value: 'cet', label: 'Central European Time (CET)' },
      { value: 'eet', label: 'Eastern European Time (EET)' },
      { value: 'west', label: 'Western European Summer Time (WEST)' },
      { value: 'cat', label: 'Central Africa Time (CAT)' },
      { value: 'eat', label: 'East Africa Time (EAT)' },
    ],
  },
  {
    label: 'Asia',
    zones: [
      { value: 'msk', label: 'Moscow Time (MSK)' },
      { value: 'ist', label: 'India Standard Time (IST)' },
      { value: 'cst_china', label: 'China Standard Time (CST)' },
      { value: 'jst', label: 'Japan Standard Time (JST)' },
      { value: 'kst', label: 'Korea Standard Time (KST)' },
      { value: 'wita', label: 'Indonesia Central Standard Time (WITA)' },
    ],
  },
];

const countries = [
  {
    label: 'Asia',
    list: [
      { value: 'ph', label: 'Philippines' },
      { value: 'jp', label: 'Japan' },
      { value: 'kr', label: 'South Korea' },
      { value: 'sg', label: 'Singapore' },
      { value: 'cn', label: 'China' },
    ],
  },
];

// -----------------------------
// Default Values for CREATE
// -----------------------------
const defaultValues = {
  email: '',
  fullName: '',
  username: '',
  workerRole: 'sales',
  employmentType: 'full_time',

  departments: [],
  teams: [],
  managerId: '',
  leadQuota: 0,
  conversionTarget: 0,

  country: '',
  timezone: '',
  whatsapp: '',
  telegram: '',
  discord: '',

  require2FA: false,
  enableIPWhitelist: false,
  ipWhitelist: '',
  maxSessions: 1,
  sessionTimeout: 30,

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

// =======================================================================
// PAGE COMPONENT
// =======================================================================
export default function CreateWorkerPage() {
  const form = useForm({ defaultValues });
  const { register, control, watch } = form;

  const ipWhiteEnabled = watch('enableIPWhitelist');

  return (
    <section data-testid="create-worker-page" className="relative space-y-6">
      {/* Sticky Header */}
      <div className="sticky top-0 flex flex-col bg-background z-10 shadow-sm">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-2xl font-semibold">Create Worker</h2>
          <Button form="create-worker-form" type="submit">
            Create Worker
          </Button>
        </div>
        <Separator />
      </div>

      {/* Content */}
      <ApolloForm {...form}>
        <form id="create-worker-form" className="flex flex-col gap-10 p-4">
          {/* Worker Information */}
          <div className="flex flex-col gap-4">
            <Label className="text-muted-foreground">Worker Information</Label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Email Address</Label>
                <Input placeholder="email@example.com" {...register('email')} />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Full Name</Label>
                <Input placeholder="John Doe" {...register('fullName')} />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Username</Label>
                <Input placeholder="johndoe" {...register('username')} />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Worker Role</Label>
                <Controller
                  control={control}
                  name="workerRole"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Employment Type</Label>
                <Controller
                  control={control}
                  name="employmentType"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full_time">Full-Time</SelectItem>
                        <SelectItem value="part_time">Part-Time</SelectItem>
                        <SelectItem value="contractor">Contractor</SelectItem>
                        <SelectItem value="intern">Intern</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Assignment & Performance */}
          <div className="flex flex-col gap-4">
            <Label className="text-muted-foreground">
              Assignment & Performance
            </Label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Departments</Label>
                  <Controller
                    name="departments"
                    control={control}
                    render={({ field }) => (
                      <ReactSelectBase
                        isMulti
                        options={DEPARTMENTS}
                        value={DEPARTMENTS.filter((opt) =>
                          field.value.includes(opt.value)
                        )}
                        onChange={(val) =>
                          field.onChange(val.map((v) => v.value))
                        }
                      />
                    )}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Teams</Label>
                  <Controller
                    name="teams"
                    control={control}
                    render={({ field }) => (
                      <ReactSelectBase
                        isMulti
                        options={TEAMS}
                        value={TEAMS.filter((opt) =>
                          field.value.includes(opt.value)
                        )}
                        onChange={(val) =>
                          field.onChange(val.map((v) => v.value))
                        }
                      />
                    )}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Assigned Manager</Label>
                  <Controller
                    control={control}
                    name="managerId"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select manager" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mike">Mike Macabulos</SelectItem>
                          <SelectItem value="patrick">
                            Patrick Manzon
                          </SelectItem>
                          <SelectItem value="christian">
                            Christian Verzosa
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Daily Lead Quota</Label>
                  <Input
                    type="number"
                    {...register('leadQuota', { valueAsNumber: true })}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Monthly Conversion Target</Label>
                  <Input
                    type="number"
                    {...register('conversionTarget', { valueAsNumber: true })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact & System Info */}
          <div className="flex flex-col gap-4">
            <Label className="text-muted-foreground">
              Contact & System Info
            </Label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Contact left column */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Country</Label>
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((region) => (
                            <SelectGroup key={region.label}>
                              <SelectLabel>{region.label}</SelectLabel>
                              {region.list.map((c) => (
                                <SelectItem key={c.value} value={c.value}>
                                  {c.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Timezone</Label>
                  <Controller
                    name="timezone"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          {timezones.map((group) => (
                            <SelectGroup key={group.label}>
                              <SelectLabel>{group.label}</SelectLabel>
                              {group.zones.map((zone) => (
                                <SelectItem key={zone.value} value={zone.value}>
                                  {zone.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>WhatsApp</Label>
                  <Input
                    placeholder="+63 900 000 0000"
                    {...register('whatsapp')}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Telegram</Label>
                  <Input placeholder="@username" {...register('telegram')} />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Discord</Label>
                  <Input placeholder="discord#0001" {...register('discord')} />
                </div>
              </div>

              {/* System right column */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <Label>Require 2FA</Label>
                  <Switch {...register('require2FA')} />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Enable IP Whitelist</Label>
                  <Switch {...register('enableIPWhitelist')} />
                </div>

                {ipWhiteEnabled && (
                  <div className="flex flex-col gap-2">
                    <Label>IP Whitelist (comma separated)</Label>
                    <Textarea
                      className="min-h-[80px]"
                      placeholder="192.168.1.1, 10.0.0.5"
                      {...register('ipWhitelist')}
                    />
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <Label>Max Concurrent Sessions</Label>
                  <Input
                    type="number"
                    {...register('maxSessions', { valueAsNumber: true })}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Session Timeout (minutes)</Label>
                  <Input
                    type="number"
                    {...register('sessionTimeout', { valueAsNumber: true })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Role Permissions */}
          <RolePermissionFields />
        </form>
      </ApolloForm>
    </section>
  );
}
