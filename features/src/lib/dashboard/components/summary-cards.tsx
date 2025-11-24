import { Card, CardContent, CardHeader, CardTitle } from '@apollo/ui';
import { TrendingUp, Users, DollarSign, Briefcase } from 'lucide-react';
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
      case 'trending-up':
        return <TrendingUp className={common} />;
      case 'dollar-sign':
        return <DollarSign className={common} />;
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

type SummaryCardsProps = HTMLAttributes<HTMLDivElement>;
export const SummaryCards = ({ ...rest }: SummaryCardsProps) => {
  const summaryStats = [
    { title: 'Total Leads', value: 502, icon: 'users' },
    { title: 'Active Clients', value: 132, icon: 'briefcase' },
    { title: 'FTD Deposits', value: '$58,200', icon: 'dollar-sign' },
    { title: 'Conversion Rate', value: '34%', icon: 'trending-up' },
  ];

  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-4')} {...rest}>
      {summaryStats.map((stat, index) => {
        return (
          <SummaryCard
            key={index}
            title={stat.title}
            icon={stat.icon}
            value={stat.value}
          />
        );
      })}
    </div>
  );
};
