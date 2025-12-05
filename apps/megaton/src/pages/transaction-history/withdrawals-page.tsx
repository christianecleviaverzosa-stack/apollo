import {
  Form,
  FormField,
  FormItem,
  FormControl,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Calendar,
  ReactSelectBase,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Badge,
  Pagination,
  PaginationItem,
  PaginationContent,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@apollo/ui";

import { Controller, useForm } from "react-hook-form";
import { CalendarIcon, Eye } from "lucide-react";
import { format } from "date-fns";
import { RoutePath, countries } from "@apollo/constants";

/* --------------------------------
   FILTER CONFIG
---------------------------------- */

const withdrawalStatuses = [
  { value: "all", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "processing", label: "Processing" },
];

const payoutMethods = [
  { value: "all", label: "All Methods" },
  { value: "bank", label: "Bank Transfer" },
  { value: "crypto", label: "Crypto USDT" },
];

const currencies = [
  { value: "all", label: "All Currencies" },
  { value: "usd", label: "USD" },
  { value: "eur", label: "EUR" },
  { value: "gbp", label: "GBP" },
  { value: "php", label: "PHP" },
];

/* --------------------------------
   FILTER FORM (NO ZOD)
---------------------------------- */

export const WithdrawalsFilterForm = () => {
  const form = useForm({
    defaultValues: {
      keyword: "",
      method: "all",
      status: "all",
      currency: "all",
      country: [],
      minAmount: "",
      maxAmount: "",
      dateRange: undefined,
    },
  });

  return (
    <Form {...form}>
      <form className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
        {/* Keyword Search */}
        <Input
          placeholder="Search name, email, client ID, transaction"
          {...form.register("keyword")}
        />

        {/* Method */}
        <FormField
          control={form.control}
          name="method"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Withdrawal Method" />
                  </SelectTrigger>
                  <SelectContent>
                    {payoutMethods.map((m) => (
                      <SelectItem key={m.value} value={m.value}>
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Status */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {withdrawalStatuses.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Currency */}
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Country */}
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <Controller
                control={form.control}
                name="country"
                render={({ field }) => (
                  <ReactSelectBase
                    {...field}
                    isMulti
                    placeholder="Country"
                    options={countries}
                  />
                )}
              />
            </FormItem>
          )}
        />

        {/* Amount Range */}
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min Amount"
            {...form.register("minAmount")}
          />
          <Input
            type="number"
            placeholder="Max Amount"
            {...form.register("maxAmount")}
          />
        </div>

        {/* Date Range */}
        <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" className="justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value?.from
                        ? field.value.to
                          ? `${format(
                              field.value.from,
                              "LLL dd, y"
                            )} - ${format(field.value.to, "LLL dd, y")}`
                          : format(field.value.from, "LLL dd, y")
                        : "Withdrawal Date Range"}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="range"
                    selected={field.value}
                    onSelect={field.onChange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />

        {/* Reset */}
        <Button type="button" onClick={() => form.reset()}>
          Reset Filters
        </Button>

        {/* Export */}
        <Button type="button">Export</Button>
      </form>
    </Form>
  );
};

/* --------------------------------
   TABLE + DATA
---------------------------------- */

const withdrawalsData = [
  {
    id: "WD-0012",
    clientName: "John Smith",
    country: "United States",
    amount: 300,
    currency: "USD",
    method: "Bank Transfer",
    provider: "Manual Review",
    status: "Pending",
    agent: "Sales 1",
    createdAt: "2025-10-24 14:20",
  },
  {
    id: "WD-0013",
    clientName: "Maria Garcia",
    country: "Spain",
    amount: 200,
    currency: "EUR",
    method: "Crypto",
    provider: "Coinspaid",
    status: "Approved",
    agent: "Sales 2",
    createdAt: "2025-10-22 09:10",
  },
];

const statusVariant = {
  Approved: "default",
  Pending: "secondary",
  Rejected: "destructive",
  Processing: "secondary",
};

const WithdrawalsTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60px] text-center">#</TableHead>
          <TableHead className="min-w-40">ID</TableHead>
          <TableHead className="min-w-48">Client Name</TableHead>
          <TableHead className="min-w-40 hidden md:table-cell">
            Country
          </TableHead>
          <TableHead className="min-w-32">Amount</TableHead>
          <TableHead className="min-w-24 hidden md:table-cell">Currency</TableHead>
          <TableHead className="min-w-48 hidden lg:table-cell">
            Method
          </TableHead>
          <TableHead className="min-w-40 hidden lg:table-cell">
            Provider
          </TableHead>
          <TableHead className="min-w-32">Status</TableHead>
          <TableHead className="min-w-40 hidden md:table-cell">
            Agent
          </TableHead>
          <TableHead className="min-w-40 hidden md:table-cell">
            Created At
          </TableHead>
          <TableHead className="w-[80px] text-right"></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {withdrawalsData.map((w, i) => (
          <TableRow key={w.id} className="hover:bg-muted/50 transition-colors">
            <TableCell className="text-center font-medium">{i + 1}</TableCell>

            <TableCell className="font-medium">{w.id}</TableCell>

            <TableCell>{w.clientName}</TableCell>

            <TableCell className="hidden md:table-cell">{w.country}</TableCell>

            <TableCell className="font-medium">
              ${w.amount.toLocaleString()}
            </TableCell>

            <TableCell className="hidden md:table-cell">{w.currency}</TableCell>

            <TableCell className="hidden lg:table-cell">{w.method}</TableCell>

            <TableCell className="hidden lg:table-cell">{w.provider}</TableCell>

            <TableCell>
              <Badge
                variant={statusVariant[w.status] || "secondary"}
                className="capitalize"
              >
                {w.status}
              </Badge>
            </TableCell>

            <TableCell className="hidden md:table-cell">{w.agent}</TableCell>

            <TableCell className="hidden md:table-cell text-muted-foreground">
              {w.createdAt}
            </TableCell>

            <TableCell className="text-right">
              <a href={`${RoutePath.Withdrawals}/${w.id}`}>
                <Button size="icon" variant="ghost">
                  <Eye className="h-4 w-4" />
                </Button>
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

/* --------------------------------
   PAGE
---------------------------------- */

const TablePagination = () => (
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
        <PaginationNext href="#" />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
);

export default function WithdrawalsPage() {
  return (
    <section data-testid="withdrawals-page" className="p-4 space-y-6">
      <h2 className="text-2xl font-semibold">Withdrawals</h2>
      <WithdrawalsFilterForm />
      <div className="relative w-full">
        <div className="absolute left-0 top-0 w-full space-y-4 pb-4">
          <div className="rounded-md border">
            <WithdrawalsTable />
          </div>
          <TablePagination />
        </div>
      </div>
    </section>
  );
}
