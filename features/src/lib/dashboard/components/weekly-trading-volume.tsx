import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@apollo/ui';

import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
} from 'recharts';
import { HTMLAttributes } from 'react';


type WeeklyTradingVolumeProps = HTMLAttributes<HTMLDivElement>;
export const WeeklyTradingVolume = ({ ...rest }: WeeklyTradingVolumeProps) => {
  const barConfig = {
    value: {
      label: 'Trading Volume',
      color: 'hsl(var(--chart-2))',
    },
  };
  const volumeData = [
    { name: 'Mon', value: 2400 },
    { name: 'Tue', value: 1398 },
    { name: 'Wed', value: 9800 },
    { name: 'Thu', value: 3908 },
    { name: 'Fri', value: 4800 },
    { name: 'Sat', value: 3800 },
    { name: 'Sun', value: 4300 },
  ];
  return (
    <Card {...rest}>
      <CardHeader>
        <CardTitle>Weekly Trading Volume</CardTitle>
        <CardDescription>In USD ($)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={barConfig} className="aspect-[2/1]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={volumeData}>
              <XAxis dataKey="name" />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};