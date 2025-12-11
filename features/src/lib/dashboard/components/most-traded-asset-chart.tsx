import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@apollo/ui";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import { HTMLAttributes } from "react";

type MostTradedAssetsChartProps = HTMLAttributes<HTMLDivElement>;

export const MostTradedAssetsChart = ({
  ...rest
}: MostTradedAssetsChartProps) => {
  // Mock data — replace with real API later
  const assetData = [
    { asset: "EURUSD", trades: 1820 },
    { asset: "BTCUSD", trades: 1350 },
    { asset: "XAUUSD", trades: 980 },
    { asset: "GBPUSD", trades: 740 },
    { asset: "US30", trades: 520 },
    { asset: "ETHUSD", trades: 410 },
  ];

  const barConfig = {
    trades: {
      label: "Number of Trades",
      color: "hsl(var(--chart-4))",
    },
  };

  return (
    <Card {...rest}>
      <CardHeader>
        <CardTitle>Most Traded Assets</CardTitle>
        <CardDescription>Based on total executed orders</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={barConfig} className="aspect-[2/1]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={assetData}
              layout="vertical"
              margin={{ left: 20, right: 20 }}
            >
              <YAxis dataKey="asset" type="category" width={80} />
              <XAxis dataKey="trades" type="number" />
              <Bar
                dataKey="trades"
                radius={[4, 4, 4, 4]}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
