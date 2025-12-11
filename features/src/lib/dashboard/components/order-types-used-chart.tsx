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

type OrderTypesUsedChartProps = HTMLAttributes<HTMLDivElement>;

export const OrderTypesUsedChart = ({
  ...rest
}: OrderTypesUsedChartProps) => {
  const chartConfig = {
    count: {
      label: 'Order Count',
      color: 'hsl(var(--chart-4))',
    },
  };

  const data = [
    { type: 'Market', count: 420 },
    { type: 'Limit', count: 310 },
    { type: 'Stop', count: 150 },
    { type: 'Stop Limit', count: 90 },
  ];

  return (
    <Card {...rest}>
      <CardHeader>
        <CardTitle>Order Types Used</CardTitle>
        <CardDescription>Distribution of executed order types</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-[2/1]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="type" tickLine={false} axisLine={false} />
              <Bar
                dataKey="count"
                radius={[4, 4, 0, 0]}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
