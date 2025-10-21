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
  BarChart,
  Bar,
  XAxis,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Users, DollarSign, Briefcase } from 'lucide-react';

export default function DashboardPage() {
  // Mock data
  const summaryStats = [
    { title: 'Total Leads', value: 502, icon: Users },
    { title: 'Active Clients', value: 132, icon: Briefcase },
    { title: 'FTD Deposits', value: '$58,200', icon: DollarSign },
    { title: 'Conversion Rate', value: '34%', icon: TrendingUp },
  ];

  const radialData = [{ name: 'FTD', value: 72, fill: 'hsl(var(--chart-1))' }];

  const volumeData = [
    { name: 'Mon', value: 2400 },
    { name: 'Tue', value: 1398 },
    { name: 'Wed', value: 9800 },
    { name: 'Thu', value: 3908 },
    { name: 'Fri', value: 4800 },
    { name: 'Sat', value: 3800 },
    { name: 'Sun', value: 4300 },
  ];

  const tradingAssets = [
    { name: 'Forex', value: 400 },
    { name: 'Crypto', value: 300 },
    { name: 'Commodities', value: 200 },
    { name: 'Indices', value: 100 },
  ];
  const COLORS = ['#2563eb', '#f43f5e', '#facc15', '#10b981'];

  // Chart Configs (required by ChartContainer)
  const radialConfig = {
    FTD: {
      label: 'FTD',
      color: 'hsl(var(--chart-1))',
    },
  };

  const barConfig = {
    value: {
      label: 'Trading Volume',
      color: 'hsl(var(--chart-2))',
    },
  };

  const pieConfig = {
    value: {
      label: 'Asset Distribution',
      color: 'hsl(var(--chart-3))',
    },
  };

  return (
    <section data-testid="dashboard-page" className="space-y-6">
      <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
      <p className="text-sm text-muted-foreground">
        Get a quick snapshot of your platform’s performance — including user
        activity, lead stats, and trading metrics.
      </p>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-md transition">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  Updated just now
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Radial Chart */}
        <Card>
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

        {/* Bar Chart */}
        <Card>
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
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
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
                    {tradingAssets.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
