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

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { HTMLAttributes } from 'react';

type TradingAssetsDistributionProps = HTMLAttributes<HTMLDivElement>;
export const TradingAssetsDistribution = ({
  ...rest
}: TradingAssetsDistributionProps) => {
  const tradingAssets = [
    { name: 'Forex', value: 400 },
    { name: 'Crypto', value: 300 },
    { name: 'Commodities', value: 200 },
    { name: 'Indices', value: 100 },
  ];
  const COLORS = ['#2563eb', '#f43f5e', '#facc15', '#10b981'];

  const pieConfig = {
    value: {
      label: 'Asset Distribution',
      color: 'hsl(var(--chart-3))',
    },
  };

  return (
    <Card {...rest}>
      <CardHeader>
        <CardTitle>Trading Asset Distribution</CardTitle>
        <CardDescription>By category</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={pieConfig} className="aspect-square">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={tradingAssets}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
              >
                {tradingAssets.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
