import {
  FormControl,
  FormField,
  FormItem,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Form,
  Checkbox,
  SelectGroup,
  SelectLabel,
  Badge,
} from '@apollo/ui';
import { Controller, useForm } from 'react-hook-form';

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

export const EditWorkerForm = () => {
  const form = useForm();

  return (
    <Form {...form}>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        {/** Worker Information */}
        <div className="flex flex-col gap-4">
          <Label className="text-muted-foreground">Worker Information</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Email Address</Label>
              <Input placeholder="Enter email address (e.g. alex.step@example.com)" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Worker Role</Label>
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
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
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Full Name</Label>
              <Input placeholder="Enter full name (e.g. Alex Step)" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Username</Label>
              <Input placeholder="Enter username (e.g. alex.step)" />
            </div>
          </div>
        </div>
        {/** Performance & Assignment */}
        <div className="flex flex-col gap-4">
          <Label className="text-muted-foreground">
            Performance & Assignment
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Assigned Manager</Label>
              <FormField
                control={form.control}
                name="manager"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Managers</SelectItem>
                          <SelectItem value="mike">Mike Macabulos</SelectItem>
                          <SelectItem value="patrick">
                            Patrick Manzon
                          </SelectItem>
                          <SelectItem value="christian">
                            Chrisitan Verzosa
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Lead Limit / Quota</Label>
              <Input type="number" placeholder="Max leads assigned per day" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Account Status</Label>
              <Badge variant="default" className="w-fit text-sm">
                Active
              </Badge>
            </div>
          </div>
        </div>
        {/** Contact & System Info */}
        <div className="flex flex-col gap-4">
          <Label className="text-muted-foreground">Contact & System Info</Label>
          <div className="grid grid-cols-2 gap-4 items-start">
            <div className="flex flex-col gap-2">
              <Label>Timezone</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a timezone" />
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
            </div>
            <div className="flex flex-col gap-2">
              <Label>Country</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((region) => (
                    <SelectGroup key={region.label}>
                      <SelectLabel>{region.label}</SelectLabel>
                      {region.list.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>WhatsApp Number</Label>
              <Input placeholder="+63 900 000 0000" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>VOIP Extension</Label>
              <Input placeholder="Enter VOIP extension (e.g. 1023)" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Telegram Handle</Label>
              <Input placeholder="@alexstep" />
            </div>
          </div>
        </div>
        {/** Account & Permissions */}
        <div className="flex flex-col gap-4">
          <Label className="text-muted-foreground">Account & Permissions</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Controller
                name="test-1"
                control={form.control}
                render={({ field }) => <Checkbox checked={field.value} />}
              />
              <Label>Access FTD</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Controller
                name="test-2"
                control={form.control}
                render={({ field }) => <Checkbox checked={field.value} />}
              />
              <Label>Can Manage Workers</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Controller
                name="test-3"
                control={form.control}
                render={({ field }) => <Checkbox checked={field.value} />}
              />
              <Label>Can View Trading Reports</Label>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
