import { Card, CardContent, CardHeader, CardTitle } from '@apollo/ui';
import {
  TrendingUp,
  Users,
  DollarSign,
  Briefcase,
  ArrowDownCircle,
  ArrowUpCircle,
  Activity,
  AlertTriangle,
  BarChart3,
} from 'lucide-react';
import { cn } from '@apollo/utils';
import { HTMLAttributes } from 'react';

type SummaryCardProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  value: number | string;
  icon: string;
};

const SummaryCard = ({ title, value, icon, ...rest }: SummaryCardProps) => {
  const common = 'h-4 w-4 text-muted-foreground';
  const iconLookup = (icon: string) => {
    switch (icon) {
      case 'users':
        return <Users className={common} />;
      case 'briefcase':
        return <Briefcase className={common} />;
      case 'dollar-sign':
        return <DollarSign className={common} />;
      case 'arrow-up':
        return <ArrowUpCircle className={common} />;
      case 'arrow-down':
        return <ArrowDownCircle className={common} />;
      case 'activity':
        return <Activity className={common} />;
      case 'alert':
        return <AlertTriangle className={common} />;
      case 'bar-chart':
        return <BarChart3 className={common} />;
      case 'trending-up':
        return <TrendingUp className={common} />;
      default:
        return <Briefcase className={common} />;
    }
  };

  return (
    <Card key={title} className="hover:shadow-md transition" {...rest}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {iconLookup(icon)}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">Updated just now</p>
      </CardContent>
    </Card>
  );
};

export const SummaryCards = ({ ...rest }) => {
  const summaryStats = [
    { title: 'Total Leads', value: 502, icon: 'users' },
    { title: 'Active Clients', value: 132, icon: 'briefcase' },
    { title: 'FTD Count', value: 89, icon: 'dollar-sign' },
    { title: 'Total Deposits', value: '$182,000', icon: 'arrow-up' },
    { title: 'Total Withdrawals', value: '$76,500', icon: 'arrow-down' },
    { title: 'Conversion Rate', value: '34%', icon: 'trending-up' },
    { title: 'Active Traders Today', value: 42, icon: 'activity' },
    { title: 'Open Trades Count', value: 128, icon: 'bar-chart' },
    { title: 'Closed Trades Count', value: 311, icon: 'bar-chart' },
    { title: 'Margin Call Alerts', value: 6, icon: 'alert' },
  ];

  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-5')} {...rest}>
      {summaryStats.map((stat, index) => (
        <SummaryCard
          key={index}
          title={stat.title}
          icon={stat.icon}
          value={stat.value}
        />
      ))}
    </div>
  );
};
