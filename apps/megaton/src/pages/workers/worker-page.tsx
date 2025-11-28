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
  Badge,
  Switch,
  Form as ApolloForm,
  setCurrentDialog,
  ReactSelectBase,
} from '@apollo/ui';

import { useForm, Controller } from 'react-hook-form';
import { RolePermissionFields } from '@apollo/features/role';

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
  {
    label: 'Australia & Pacific',
    zones: [
      { value: 'awst', label: 'Australian Western Standard Time (AWST)' },
      { value: 'acst', label: 'Australian Central Standard Time (ACST)' },
      { value: 'aest', label: 'Australian Eastern Standard Time (AEST)' },
      { value: 'nzst', label: 'New Zealand Standard Time (NZST)' },
      { value: 'fjt', label: 'Fiji Time (FJT)' },
    ],
  },
  {
    label: 'South America',
    zones: [
      { value: 'art', label: 'Argentina Time (ART)' },
      { value: 'bot', label: 'Bolivia Time (BOT)' },
      { value: 'brt', label: 'Brasilia Time (BRT)' },
      { value: 'clt', label: 'Chile Standard Time (CLT)' },
    ],
  },
];

const countries = [
  {
    label: 'North America',
    list: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'mx', label: 'Mexico' },
    ],
  },
  {
    label: 'Europe',
    list: [
      { value: 'uk', label: 'United Kingdom' },
      { value: 'de', label: 'Germany' },
      { value: 'fr', label: 'France' },
      { value: 'es', label: 'Spain' },
      { value: 'it', label: 'Italy' },
      { value: 'nl', label: 'Netherlands' },
    ],
  },
  {
    label: 'Asia',
    list: [
      { value: 'cn', label: 'China' },
      { value: 'jp', label: 'Japan' },
      { value: 'kr', label: 'South Korea' },
      { value: 'ph', label: 'Philippines' },
      { value: 'sg', label: 'Singapore' },
      { value: 'in', label: 'India' },
      { value: 'id', label: 'Indonesia' },
    ],
  },
  {
    label: 'Middle East & Africa',
    list: [
      { value: 'ae', label: 'United Arab Emirates' },
      { value: 'sa', label: 'Saudi Arabia' },
      { value: 'eg', label: 'Egypt' },
      { value: 'za', label: 'South Africa' },
      { value: 'ng', label: 'Nigeria' },
    ],
  },
  {
    label: 'Oceania',
    list: [
      { value: 'au', label: 'Australia' },
      { value: 'nz', label: 'New Zealand' },
      { value: 'fj', label: 'Fiji' },
    ],
  },
  {
    label: 'South America',
    list: [
      { value: 'br', label: 'Brazil' },
      { value: 'ar', label: 'Argentina' },
      { value: 'cl', label: 'Chile' },
      { value: 'pe', label: 'Peru' },
    ],
  },
];

const defaultValues = {
  email: 'alex.step@example.com',
  fullName: 'Alex Step',
  username: 'alex.step',
  workerRole: 'sales',
  employmentType: 'full_time',

  departments: ['sales'],
  teams: ['sales_a'],
  managerId: 'mike',
  leadQuota: 40,
  conversionTarget: 15,

  country: 'ph',
  timezone: 'pst',
  whatsapp: '+63 900 123 4567',
  telegram: '@alexstep',
  discord: 'alex#3049',

  require2FA: false,
  enableIPWhitelist: false,
  ipWhitelist: '',
  maxSessions: 2,
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
      read: true,
      edit: true,
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

export default function WorkerPage() {
  const form = useForm({ defaultValues });
  const { register, control, watch } = form;

  const ipWhiteEnabled = watch('enableIPWhitelist');

  const workerId = 'WKR-393021';
  const createdAt = '2024-09-12 14:20';
  const lastLogin = '2024-11-12 09:41';
  const lastLoginIp = '185.199.22.11';
  const accountStatus = 'Active';

  return (
    <section data-testid="worker-page" className="relative space-y-6">
      <div className="sticky top-0 flex flex-col bg-background z-10 shadow-sm">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-2xl font-semibold">Worker Profile</h2>
          <Button form="worker-form" type="submit">
            Save Changes
          </Button>
        </div>
        <Separator />
      </div>

      <ApolloForm {...form}>
        <form id="worker-form" className="flex flex-col gap-10 p-4">
          <div className="flex flex-col gap-4">
            <Label className="text-muted-foreground">Worker Identity</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left column - static fields */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <Label>Worker ID</Label>
                  <p className="text-sm font-medium">{workerId}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <Label>Created At</Label>
                  <p className="text-sm font-medium">{createdAt}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <Label>Last Login</Label>
                  <p className="text-sm font-medium">{lastLogin}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <Label>Last Login IP</Label>
                  <p className="text-sm font-medium">{lastLoginIp}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <Label>Account Status</Label>
                    <Badge className="w-fit">{accountStatus}</Badge>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="text-destructive"
                    onClick={() =>
                      setCurrentDialog({
                        content: 'suspend-worker',
                        open: true,
                      })
                    }
                  >
                    Suspend Worker
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Email Address</Label>
                  <Input
                    placeholder="alex.step@example.com"
                    {...register('email')}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Full Name</Label>
                  <Input placeholder="Alex Step" {...register('fullName')} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Username</Label>
                  <Input placeholder="alex.step" {...register('username')} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Worker Role</Label>
                  <Controller
                    control={control}
                    name="workerRole"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue />
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue />
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
          </div>
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
          <div className="flex flex-col gap-4">
            <Label className="text-muted-foreground">
              Contact & System Info
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          <SelectValue placeholder="Select a country" />
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
          <div className="flex flex-col gap-4">
            <Label className="text-muted-foreground">Role Permissions</Label>
            <RolePermissionFields />
          </div>
        </form>
      </ApolloForm>
    </section>
  );
}
