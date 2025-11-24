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
  RadialBar,
  RadialBarChart,
} from 'recharts';
import { HTMLAttributes } from 'react';

type FTDAchievementsProps = HTMLAttributes<HTMLDivElement>;
export const FTDAchievements = ({ ...rest }: FTDAchievementsProps) => {
  const radialData = [{ name: 'FTD', value: 72, fill: 'hsl(var(--chart-1))' }];

  // Chart Configs (required by ChartContainer)
  const radialConfig = {
    FTD: {
      label: 'FTD',
      color: 'hsl(var(--chart-1))',
    },
  };

  return (
    <Card {...rest}>
      <CardHeader>
        <CardTitle>FTD Achievement</CardTitle>
        <CardDescription>Target progress overview</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={radialConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={radialData}
            innerRadius="80%"
            outerRadius="100%"
            startAngle={180}
            endAngle={0}
          >
            <RadialBar dataKey="value" cornerRadius={10} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
          </RadialBarChart>
        </ChartContainer>
        <div className="text-center mt-4">
          <p className="text-3xl font-bold text-primary">72%</p>
          <p className="text-xs text-muted-foreground">
            of monthly deposit target reached
          </p>
        </div>
      </CardContent>
    </Card>
  );
};