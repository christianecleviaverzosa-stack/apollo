import {
  Label,
  Input,
  Textarea,
  Badge,
  Button,
  Separator,
} from '@apollo/ui';
import { useForm } from 'react-hook-form';

// These would come from your Retention Table row selection
const demoRetentionClient = {
  id: 'RET-003',
  leadId: 'LD-003',
  name: 'James Lee',
  email: 'james.lee@example.com',
  mobile: '+63 955 123 4567',
  country: 'Philippines',
  buyer: 'Client X',
  createdAt: '2025-10-18',

  // retention attributes
  retentionTier: 'VIP – Premium Client',
  riskLevel: 'Low Risk (Stable)',
  depositFrequency: 'High (6+ deposits / month)',

  // financial
  totalDeposits: 1850,
  lifetimeValue: 2450,
  latestDepositAmount: 400,
  latestDepositDate: '2025-10-28',
  latestWithdrawalAmount: 120,
  latestWithdrawalDate: '2025-10-20',

  // activity
  lastLogin: '2025-11-03 14:22',
  lastTrade: '2025-11-03',
  sessions: 21,
  openTrades: 2,
  closedTrades: 64,
};

const recentDeposits = [
  { amount: 400, date: '2025-10-28' },
  { amount: 350, date: '2025-10-20' },
  { amount: 250, date: '2025-10-10' },
];

const recentWithdrawals = [
  { amount: 120, date: '2025-10-20' },
  { amount: 80, date: '2025-10-05' },
];

export const SingleRetentionClientForm = () => {
  const form = useForm({
    defaultValues: {
      notes: '',
    },
  });

  const { register, handleSubmit } = form;

  const onSaveNotes = (data) => {
    console.log('Saving note...', data.notes);
  };

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
      {/* ------------------------------ */}
      {/* RETENTION OVERVIEW */}
      {/* ------------------------------ */}
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">Retention Overview</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label>Retention Tier</Label>
            <Input readOnly value={demoRetentionClient.retentionTier} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Risk Level</Label>
            <Input readOnly value={demoRetentionClient.riskLevel} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Deposit Frequency</Label>
            <Input readOnly value={demoRetentionClient.depositFrequency} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Assigned Agent</Label>
            <Input readOnly value="Sales 1" />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Account Status</Label>
            <Badge className="w-fit" variant="default">
              Active
            </Badge>
          </div>
        </div>
      </div>

      {/* ------------------------------ */}
      {/* PERSONAL & BUYER INFO */}
      {/* ------------------------------ */}
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">Client Information</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label>Lead ID</Label>
            <Input readOnly value={demoRetentionClient.leadId} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Registered On</Label>
            <Input readOnly value={demoRetentionClient.createdAt} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Full Name</Label>
            <Input readOnly value={demoRetentionClient.name} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input readOnly value={demoRetentionClient.email} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Mobile</Label>
            <Input readOnly value={demoRetentionClient.mobile} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Country</Label>
            <Input readOnly value={demoRetentionClient.country} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Buyer / Broker</Label>
            <Input readOnly value={demoRetentionClient.buyer} />
          </div>
        </div>
      </div>

      {/* ------------------------------ */}
      {/* FINANCIAL SNAPSHOT */}
      {/* ------------------------------ */}
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">Financial Snapshot</Label>
        <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg border shadow-sm">
          <div className="flex flex-col">
            <Label className="text-muted-foreground text-sm">
              Total Deposits
            </Label>
            <p className="font-medium">${demoRetentionClient.totalDeposits}</p>
          </div>

          <div className="flex flex-col">
            <Label className="text-muted-foreground text-sm">
              Lifetime Value
            </Label>
            <p className="font-medium">${demoRetentionClient.lifetimeValue}</p>
          </div>

          <div className="flex flex-col">
            <Label className="text-muted-foreground text-sm">
              Latest Deposit
            </Label>
            <p className="font-medium">
              ${demoRetentionClient.latestDepositAmount} on{' '}
              {demoRetentionClient.latestDepositDate}
            </p>
          </div>

          <div className="flex flex-col">
            <Label className="text-muted-foreground text-sm">
              Latest Withdrawal
            </Label>
            <p className="font-medium">
              ${demoRetentionClient.latestWithdrawalAmount} on{' '}
              {demoRetentionClient.latestWithdrawalDate}
            </p>
          </div>
        </div>
      </div>

      {/* ------------------------------ */}
      {/* ACTIVITY SUMMARY */}
      {/* ------------------------------ */}
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">Activity Summary</Label>
        <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 border rounded-lg shadow-sm">
          <div className="flex flex-col">
            <Label className="text-sm text-muted-foreground">Last Login</Label>
            <p className="font-medium">{demoRetentionClient.lastLogin}</p>
          </div>

          <div className="flex flex-col">
            <Label className="text-sm text-muted-foreground">Last Trade</Label>
            <p className="font-medium">{demoRetentionClient.lastTrade}</p>
          </div>

          <div className="flex flex-col">
            <Label className="text-sm text-muted-foreground">
              Trading Sessions
            </Label>
            <p className="font-medium">{demoRetentionClient.sessions}</p>
          </div>

          <div className="flex flex-col">
            <Label className="text-sm text-muted-foreground">Open Trades</Label>
            <p className="font-medium">{demoRetentionClient.openTrades}</p>
          </div>

          <div className="flex flex-col">
            <Label className="text-sm text-muted-foreground">
              Closed Trades
            </Label>
            <p className="font-medium">{demoRetentionClient.closedTrades}</p>
          </div>
        </div>
      </div>

      {/* ------------------------------ */}
      {/* RECENT DEPOSITS / WITHDRAWALS */}
      {/* ------------------------------ */}
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">Recent Deposits</Label>
        <div className="flex flex-col gap-2 bg-muted/30 p-4 border rounded-lg shadow-sm">
          {recentDeposits.map((d, i) => (
            <div
              key={i}
              className="flex justify-between border bg-background rounded p-2"
            >
              <span>${d.amount}</span>
              <span className="text-muted-foreground">{d.date}</span>
            </div>
          ))}
          <Button variant="outline" size="sm" className="mt-2">
            View Full History
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">Recent Withdrawals</Label>
        <div className="flex flex-col gap-2 bg-muted/30 p-4 border rounded-lg shadow-sm">
          {recentWithdrawals.map((w, i) => (
            <div
              key={i}
              className="flex justify-between border bg-background rounded p-2"
            >
              <span>${w.amount}</span>
              <span className="text-muted-foreground">{w.date}</span>
            </div>
          ))}
          <Button variant="outline" size="sm" className="mt-2">
            View Full History
          </Button>
        </div>
      </div>

      {/* ------------------------------ */}
      {/* NOTES & FOLLOW-UP */}
      {/* ------------------------------ */}
      <div className="flex flex-col gap-4 md:col-span-2">
        <Label className="text-muted-foreground">Follow-up & Notes</Label>
        <div className="bg-muted/30 border rounded-lg p-4 flex flex-col gap-4">
          <Textarea
            placeholder="Write your comment..."
            className="min-h-[100px] resize-none"
            {...register('notes')}
          />
          <div className="flex justify-end">
            <Button size="sm" onClick={handleSubmit(onSaveNotes)}>
              Save Comment
            </Button>
          </div>

          <Separator />

          <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1">
            {/* Example history item */}
            <div className="rounded-md bg-background border p-3 flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    agent
                  </Badge>
                  <span className="text-muted-foreground">
                    2025-11-02 14:10
                  </span>
                </div>
              </div>
              <p className="text-sm text-foreground mt-1">
                Client responded positively, follow-up tomorrow.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------ */}
      {/* STATUS & ACTIONS */}
      {/* ------------------------------ */}
      <div className="flex flex-col gap-4 md:col-span-2">
        <Label className="text-muted-foreground">Status & Actions</Label>

        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="flex flex-col gap-2">
            <Label>Retention Tier</Label>
            <Badge variant="secondary" className="w-fit">
              {demoRetentionClient.retentionTier}
            </Badge>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Account Status</Label>
            <Badge variant="default" className="w-fit">
              Active
            </Badge>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">Contact Client</Button>
          <Button variant="outline" className="text-destructive">
            Delete Client
          </Button>
        </div>
      </div>
    </form>
  );
};

export default function SingleRetentionClientPage() {
  return (
    <div data-testid="retention-client-page" className="relative space-y-6">
      {/* Sticky header */}
      <div className="sticky top-0 flex flex-col bg-background z-10 shadow-sm">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-2xl font-semibold">Retention Client Details</h2>
          <Button>Save Changes</Button>
        </div>
        <Separator />
      </div>

      <SingleRetentionClientForm />
    </div>
  );
}
