import {
  Label,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Textarea,
  Badge,
  Button,
  Separator,
  SelectGroup,
  SelectLabel,
  setCurrentDialog,
} from '@apollo/ui';
import { useForm, Controller } from 'react-hook-form';

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

export const LeadClientForm = () => {
  const form = useForm({
    defaultValues: {
      accountId: 'LD-001',
      salesStatus: 'new',
      manager: 'manager-1',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      mobile: '+1 202 555 0183',
      country: 'us',
      age: 30,
      campaign: 'Demo Campaign',
      source: 'Ad Campaign',
      affiliate: 'affiliate-1',
      notes: '',
    },
  });

  const { register, handleSubmit, control } = form;

  const onSubmit = (data) => {
    console.log('Saving changes...', data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4"
    >
      {/* Lead Overview */}
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">Lead Overview</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label>Account ID</Label>
            <Input
              placeholder="Auto-generated or manual input"
              {...register('accountId')}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Sales Status</Label>
            <Controller
              name="salesStatus"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Manager</Label>
            <Controller
              name="manager"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select manager" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager-1">Manager 1</SelectItem>
                    <SelectItem value="manager-2">Manager 2</SelectItem>
                    <SelectItem value="manager-3">Manager 3</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">Personal Information</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label>First Name</Label>
            <Input placeholder="Enter first name" {...register('firstName')} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Last Name</Label>
            <Input placeholder="Enter last name" {...register('lastName')} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Email Address</Label>
            <Input
              type="email"
              placeholder="Enter email address (e.g. alex.step@example.com)"
              {...register('email')}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Mobile Number</Label>
            <Input placeholder="+63 900 000 0000" {...register('mobile')} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Country</Label>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
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
            <Label>Age</Label>
            <Input type="number" placeholder="Enter age" {...register('age')} />
          </div>
        </div>
      </div>

      {/* Campaign Info */}
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">Campaign Information</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label>Campaign Name</Label>
            <Input
              placeholder="Enter campaign name"
              {...register('campaign')}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Source</Label>
            <Input
              placeholder="e.g. Ad Campaign, Referral, Organic"
              {...register('source')}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Affiliate</Label>
            <Controller
              name="affiliate"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Affiliate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="affiliate-1">Affiliate 1</SelectItem>
                    <SelectItem value="affiliate-2">Affiliate 2</SelectItem>
                    <SelectItem value="affiliate-3">Affiliate 3</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
      </div>

      {/* Financial Info */}
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">
          Financial & Account Info
        </Label>
        <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg border shadow-sm">
          {[
            { label: 'Balance', value: '$1,000.00' },
            { label: 'Total Deposit', value: '$2,000.00' },
            {
              label: 'Profit / Loss',
              value: '+$200.00',
              color: 'text-green-600',
            },
            { label: 'Margin Level', value: '85%' },
            { label: 'Equity', value: '$1,800.00' },
            { label: 'Bonus', value: '$150.00' },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <Label className="text-sm text-muted-foreground">
                {item.label}
              </Label>
              <p className={`font-medium ${item.color || 'text-foreground'}`}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Follow-up & Notes */}
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">Follow-up & Notes</Label>
        <div className="bg-muted/30 border rounded-lg p-4 flex flex-col gap-4">
          <Textarea
            placeholder="Write your comment..."
            className="min-h-[100px] resize-none"
            {...register('notes')}
          />
          <div className="flex justify-end">
            <Button size="sm">Save Comment</Button>
          </div>

          <Separator />
          <div className="flex flex-col gap-3">
            <Label className="text-sm font-medium text-muted-foreground">
              History
            </Label>
            <div className="max-h-60 overflow-y-auto flex flex-col gap-3 pr-1">
              <div className="rounded-md bg-background border p-3 flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      admin
                    </Badge>
                    <span className="text-muted-foreground">
                      2025-10-29 15:30
                    </span>
                  </div>
                </div>
                <p className="text-sm text-foreground mt-1">
                  Test comment content here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status & Actions  */}
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">Status & Actions</Label>
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="flex flex-col gap-2">
            <Label>Lead Conversion</Label>
            <Badge variant="secondary" className="w-fit">
              Demo Lead
            </Badge>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Account Status</Label>
            <Badge variant="default" className="w-fit">
              Active
            </Badge>
          </div>
        </div>

        <Button
          size="sm"
          variant="outline"
          className="text-destructive"
          onClick={() =>
            setCurrentDialog({ content: 'delete-lead', open: true })
          }
        >
          Delete Lead
        </Button>
      </div>
    </form>
  );
};

export default function LeadPage() {
  return (
    <div data-testid="lead-page" className="relative space-y-6">
      <div className="sticky top-0 flex flex-col bg-background z-10 shadow-sm">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-2xl font-semibold">Lead Details</h2>
          <Button>Save Changes</Button>
        </div>
        <Separator />
      </div>
      <LeadClientForm />
    </div>
  );
}
