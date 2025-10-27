// TODO: This must be a dumb component, currently placeholder contents

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Form,
  FormControl,
  FormField,
  FormItem,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  Calendar,
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
import {
  TrendingUp,
  Users,
  DollarSign,
  Briefcase,
  CalendarIcon,
  X,
} from 'lucide-react';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import {cn} from "@apollo/utils"
import { HTMLAttributes } from 'react';

const dashboardFilterFormSchema = z.object({
  dateRange: z
    .object({
      from: z.date(),
      to: z.date().optional(),
    })
    .optional(),
});
type DashboardFilterFormValues = z.infer<typeof dashboardFilterFormSchema>;

const FilterForm = () => {
  const form = useForm<DashboardFilterFormValues>({
    defaultValues: {
      dateRange: {
        from: new Date(),
        to: new Date(),
      },
    },
    resolver: zodResolver(dashboardFilterFormSchema),
  });

  const watchedDate = form.watch('dateRange');
  const defaultDate = form.formState.defaultValues?.dateRange;

  const hasChanged =
    watchedDate?.from?.getTime() !== defaultDate?.from?.getTime() ||
    watchedDate?.to?.getTime() !== defaultDate?.to?.getTime();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => console.log(data))}
        className="flex flex-1 gap-2 items-center justify-end"
      >
        {hasChanged && (
          <Button size="sm" onClick={() => form.reset()} variant="link">
            <X className="text-xs" /> Reset Filter
          </Button>
        )}

        <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className="justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value?.from ? (
                        field.value.to ? (
                          field.value.from.getTime() ===
                          field.value.to.getTime() ? (
                            format(field.value.from, 'LLL dd, y')
                          ) : (
                            <>
                              {format(field.value.from, 'LLL dd, y')} -{' '}
                              {format(field.value.to, 'LLL dd, y')}
                            </>
                          )
                        ) : (
                          format(field.value.from, 'LLL dd, y')
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="range"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};


type SummaryCardProps = HTMLAttributes<HTMLDivElement> & {
  title: string,
  value: number | string,
  icon: string
}


const SummaryCard = ({title, value, icon,...rest}: SummaryCardProps) => {

  const common = "h-4 w-4 text-muted-foreground";
  const iconLookup = (icon:string) => {
      switch (icon) {
        case 'users':
          return <Users  className={common}/>;
        case 'trending-up':
          return <TrendingUp className={common}/>;
        case 'dollar-sign':
          return <DollarSign className={common}/>;
        default:
          return <Briefcase className={common}/>
      }
  }

  return (
    <Card key={title} className="hover:shadow-md transition" {...rest}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {iconLookup(icon) }
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          Updated just now
        </p>
      </CardContent>
    </Card>
  )
}

type SummaryCardsProps = HTMLAttributes<HTMLDivElement> 


const SummaryCards = ({...rest}:SummaryCardsProps) => {
  
    const summaryStats = [
    { title: 'Total Leads', value: 502, icon: 'users' },
    { title: 'Active Clients', value: 132, icon: 'briefcase' },
    { title: 'FTD Deposits', value: '$58,200', icon: 'dollar-sign' },
    { title: 'Conversion Rate', value: '34%', icon: 'trending-up' },
  ];
// 
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-4')} {...rest} >
          {summaryStats.map((stat) => {
            return (
             <SummaryCard title={stat.title} icon={stat.icon} value={stat.value} />
            );
          })}
        </div>
  )
}

const FtdAchievement = () => {

  const radialData = [{ name: 'FTD', value: 72, fill: 'hsl(var(--chart-1))' }];

  // Chart Configs (required by ChartContainer)
  const radialConfig = {
    FTD: {
      label: 'FTD',
      color: 'hsl(var(--chart-1))',
    },
  };

  return (
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
  )
}

const WeeklyTradingVolume = () => {

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
  )
}


export default function DashboardPage() {
  // Mock data
  const summaryStats = [
    { title: 'Total Leads', value: 502, icon: Users },
    { title: 'Active Clients', value: 132, icon: Briefcase },
    { title: 'FTD Deposits', value: '$58,200', icon: DollarSign },
    { title: 'Conversion Rate', value: '34%', icon: TrendingUp },
  ];





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
    <section data-testid="dashboard-page" className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row justify-between">
        <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
        <FilterForm />
      </div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Charts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Radial Chart */}
        <FtdAchievement />

        {/* Bar Chart */}
        <WeeklyTradingVolume />

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
