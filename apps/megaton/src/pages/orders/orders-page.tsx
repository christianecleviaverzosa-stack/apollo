import { RoutePath } from '@apollo/constants';
import {
  Badge,
  Button,
  Calendar,
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ReactSelectBase,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@apollo/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Eye, Trash2 } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

const orders = [
  {
    id: 'ORD-1001',
    client: 'John Smith',
    symbol: 'EURUSD',
    type: 'buy',
    volume: 1.25,
    openPrice: 1.08245,
    closePrice: null,
    profit: null,
    status: 'open',
    openedAt: '2025-02-10 14:25',
  },
  {
    id: 'ORD-1002',
    client: 'Maria Lopez',
    symbol: 'XAUUSD',
    type: 'sell',
    volume: 0.5,
    openPrice: 2042.1,
    closePrice: 2038.75,
    profit: '+$167.50',
    status: 'closed',
    openedAt: '2025-02-10 13:10',
  },
  {
    id: 'ORD-1003',
    client: 'Alex Johnson',
    symbol: 'BTCUSD',
    type: 'buy',
    volume: 0.02,
    openPrice: 47250.0,
    closePrice: 47100.0,
    profit: '-$30.00',
    status: 'closed',
    openedAt: '2025-02-10 09:57',
  },
  {
    id: 'ORD-1004',
    client: 'Emily Davis',
    symbol: 'GBPJPY',
    type: 'sell',
    volume: 2.0,
    openPrice: 187.25,
    closePrice: null,
    profit: null,
    status: 'open',
    openedAt: '2025-02-10 15:48',
  },
  {
    id: 'ORD-1005',
    client: 'Daniel Kim',
    symbol: 'USDJPY',
    type: 'buy',
    volume: 1.0,
    openPrice: 148.32,
    closePrice: 148.9,
    profit: '+$580.00',
    status: 'closed',
    openedAt: '2025-02-09 11:25',
  },
  {
    id: 'ORD-1006',
    client: 'Sophia Chen',
    symbol: 'ETHUSD',
    type: 'buy',
    volume: 0.5,
    openPrice: 2480.0,
    closePrice: 2462.5,
    profit: '-$87.50',
    status: 'closed',
    openedAt: '2025-02-10 08:44',
  },
  {
    id: 'ORD-1007',
    client: 'Michael Brown',
    symbol: 'AUDUSD',
    type: 'sell',
    volume: 3.0,
    openPrice: 0.6612,
    closePrice: 0.6597,
    profit: '+$450.00',
    status: 'closed',
    openedAt: '2025-02-11 12:17',
  },
  {
    id: 'ORD-1008',
    client: 'Hannah Lee',
    symbol: 'EURJPY',
    type: 'buy',
    volume: 1.5,
    openPrice: 159.75,
    closePrice: null,
    profit: null,
    status: 'open',
    openedAt: '2025-02-11 16:03',
  },
  {
    id: 'ORD-1009',
    client: 'Chris Miller',
    symbol: 'US30',
    type: 'buy',
    volume: 0.1,
    openPrice: 38650,
    closePrice: 38690,
    profit: '+$40.00',
    status: 'closed',
    openedAt: '2025-02-09 09:40',
  },
  {
    id: 'ORD-1010',
    client: 'Isabella Rivera',
    symbol: 'GBPUSD',
    type: 'sell',
    volume: 2.5,
    openPrice: 1.2735,
    closePrice: 1.275,
    profit: '-$375.00',
    status: 'closed',
    openedAt: '2025-02-10 07:55',
  },
  {
    id: 'ORD-1011',
    client: 'Kevin Wilson',
    symbol: 'XAGUSD',
    type: 'buy',
    volume: 10,
    openPrice: 22.45,
    closePrice: null,
    profit: null,
    status: 'open',
    openedAt: '2025-02-11 11:22',
  },
  {
    id: 'ORD-1012',
    client: 'Natalie Young',
    symbol: 'EURGBP',
    type: 'sell',
    volume: 1.0,
    openPrice: 0.8521,
    closePrice: 0.851,
    profit: '+$110.00',
    status: 'closed',
    openedAt: '2025-02-08 17:03',
  },
  {
    id: 'ORD-1013',
    client: 'Jason Carter',
    symbol: 'USDCHF',
    type: 'buy',
    volume: 0.75,
    openPrice: 0.8662,
    closePrice: 0.865,
    profit: '-$90.00',
    status: 'closed',
    openedAt: '2025-02-10 10:14',
  },
  {
    id: 'ORD-1014',
    client: 'Laura White',
    symbol: 'AAPL',
    type: 'buy',
    volume: 5,
    openPrice: 193.5,
    closePrice: 194.2,
    profit: '+$3.50',
    status: 'closed',
    openedAt: '2025-02-07 14:40',
  },
  {
    id: 'ORD-1015',
    client: 'Ethan Walker',
    symbol: 'NAS100',
    type: 'sell',
    volume: 0.2,
    openPrice: 17520,
    closePrice: null,
    profit: null,
    status: 'open',
    openedAt: '2025-02-11 13:33',
  },
];

const symbols = [
  {
    label: 'Symbols',
    options: [
      { value: 'ADNOCGAS', label: 'ADNOCGAS' },
      { value: 'EURUSD', label: 'EURUSD' },
      { value: 'BTCUSDT', label: 'BTCUSDT' },
      { value: 'GBPUSD', label: 'GBPUSD' },
      { value: 'USDJPY', label: 'USDJPY' },
    ],
  },
];

const orderTypes = [
  { value: 'buy', label: 'Buy' },
  { value: 'sell', label: 'Sell' },
  { value: 'buy-limit', label: 'Buy Limit' },
  { value: 'sell-limit', label: 'Sell Limit' },
  { value: 'buy-stop', label: 'Buy Stop' },
  { value: 'sell-stop', label: 'Sell Stop' },
  { value: 'buy-stop-limit', label: 'Buy Stop Limit' },
  { value: 'sell-stop-limit', label: 'Sell Stop Limit' },
];

const ordersFilterFormSchema = z.object({
  orderId: z.string(),
  symbols: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
  orderTypes: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
  dateRange: z
    .object({
      from: z.date(),
      to: z.date().optional(),
    })
    .optional(),
  minVolume: z.string(),
  maxVolume: z.string(),
});

type OrdersFilterFormValues = z.infer<typeof ordersFilterFormSchema>;

const OrdersFilterForm = () => {
  const form = useForm<OrdersFilterFormValues>({
    defaultValues: {},
    resolver: zodResolver(ordersFilterFormSchema),
  });

  return (
    <Form {...form}>
      <form className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
        <Input placeholder="Search order ID" {...form.register('orderId')} />
        <FormField
          control={form.control}
          name="symbols"
          render={() => (
            <FormItem>
              <Controller
                control={form.control}
                name="symbols"
                render={({ field }) => (
                  <ReactSelectBase
                    {...field}
                    isMulti
                    placeholder="Select symbols"
                    options={symbols}
                    onChange={(val) => field.onChange(val)}
                  />
                )}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="orderTypes"
          render={() => (
            <FormItem>
              <Controller
                control={form.control}
                name="orderTypes"
                render={({ field }) => (
                  <ReactSelectBase
                    {...field}
                    isMulti
                    placeholder="Select order types"
                    options={orderTypes}
                    onChange={(val) => field.onChange(val)}
                  />
                )}
              />
            </FormItem>
          )}
        />
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
                        <span>Created at (date range)</span>
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
        <Input
          type="number"
          placeholder="Min Volume (e.g. 0.01)"
          {...form.register('minVolume')}
        />
        <Input
          type="number"
          placeholder="Max Volume (e.g. 10.00)"
          {...form.register('maxVolume')}
        />
        <Button onClick={() => form.reset()} type="button">
          Reset Filters
        </Button>
        <Button type="button">Export Data</Button>
      </form>
    </Form>
  );
};

const TablePagination = () => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

const OrdersTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60px] text-center">#</TableHead>
          <TableHead className="min-w-40">Client</TableHead>
          <TableHead className="min-w-28">Symbol</TableHead>
          <TableHead className="min-w-28 hidden md:table-cell">Type</TableHead>
          <TableHead className="min-w-28">Volume</TableHead>
          <TableHead className="min-w-32 hidden lg:table-cell">
            Open Price
          </TableHead>
          <TableHead className="min-w-32 hidden lg:table-cell">
            Close Price
          </TableHead>
          <TableHead className="min-w-32 hidden md:table-cell">
            Profit
          </TableHead>
          <TableHead className="min-w-40 hidden md:table-cell">
            Status
          </TableHead>
          <TableHead className="min-w-40 hidden md:table-cell">
            Opened At
          </TableHead>
          <TableHead className="w-[100px] text-right"></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders.map((order, i) => (
          <TableRow
            key={order.id}
            className="hover:bg-muted/50 transition-colors"
          >
            <TableCell className="text-center font-medium">{i + 1}</TableCell>

            <TableCell className="font-medium">{order.client}</TableCell>

            <TableCell>{order.symbol}</TableCell>

            <TableCell className="hidden md:table-cell">
              <Badge variant="secondary" className="capitalize">
                {order.type}
              </Badge>
            </TableCell>

            <TableCell>{order.volume}</TableCell>

            <TableCell className="hidden lg:table-cell">
              {order.openPrice?.toLocaleString()}
            </TableCell>

            <TableCell className="hidden lg:table-cell">
              {order.closePrice ? order.closePrice.toLocaleString() : '-'}
            </TableCell>

            <TableCell
              className={`hidden md:table-cell font-medium ${
                order.profit?.startsWith('+')
                  ? 'text-green-600'
                  : order.profit?.startsWith('-')
                  ? 'text-red-600'
                  : 'text-muted-foreground'
              }`}
            >
              {order.profit || '-'}
            </TableCell>

            <TableCell className="hidden md:table-cell">
              <Badge
                variant={order.status === 'open' ? 'default' : 'outline'}
                className="capitalize"
              >
                {order.status}
              </Badge>
            </TableCell>

            <TableCell className="hidden md:table-cell text-muted-foreground">
              {order.openedAt}
            </TableCell>

            <TableCell className="text-right">
              <div className="flex justify-end gap-1">
                <a href={`${RoutePath.Orders}/123456789`}>
                  <Button size="icon" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                </a>

                <Button size="icon" variant="ghost">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default function OrdersPage() {
  return (
    <section data-testid="workers-page" className="p-4 space-y-6">
      <h2 className="text-2xl font-semibold">Orders</h2>
      <OrdersFilterForm />
      <div className="relative w-full">
        <div className="absolute space-y-4 left-0 top-0 w-full pb-4">
          <div className="rounded-md border">
            <OrdersTable />
          </div>
          <TablePagination />
        </div>
      </div>
    </section>
  );
}
