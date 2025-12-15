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

import { RadialBar, RadialBarChart } from 'recharts';
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
    <Card className="flex flex-col" {...rest}>
      <CardHeader>
        <CardTitle>FTD Achievement</CardTitle>
        <CardDescription>Target progress overview</CardDescription>
      </CardHeader>
      <CardContent className="relative flex flex-1 flex-col items-center justify-center">
        <ChartContainer
          config={radialConfig}
          className="mx-auto aspect-square w-[250px]"
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
        <div className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-8">
          <p className="text-3xl font-bold text-primary">72%</p>
          <p className="text-xs text-muted-foreground">
            of monthly deposit target reached
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
