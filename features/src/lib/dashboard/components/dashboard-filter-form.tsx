import {
  Button,
  Calendar,
  Form,
  FormControl,
  FormField,
  FormItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@apollo/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, X } from 'lucide-react';
import { useForm, useFormContext } from 'react-hook-form';
import z from 'zod';

const dashboardFilterFormSchema = z.object({
  dateRange: z
    .object({
      from: z.date(),
      to: z.date().optional(),
    })
    .optional(),
});
type DashboardFilterFormValues = z.infer<typeof dashboardFilterFormSchema>;

const ClearFilterButton = () => {
  const { watch, formState, reset } =
    useFormContext<DashboardFilterFormValues>();

  const watchedDate = watch('dateRange');
  const defaultDate = formState.defaultValues?.dateRange;

  const hasChanged =
    watchedDate?.from?.getTime() !== defaultDate?.from?.getTime() ||
    watchedDate?.to?.getTime() !== defaultDate?.to?.getTime();

  return (
    hasChanged && (
      <Button onClick={() => reset()} variant="link">
        <X className="text-xs" /> Reset Filter
      </Button>
    )
  );
};

export const DashboardFilterForm = () => {
  const form = useForm<DashboardFilterFormValues>({
    defaultValues: {
      dateRange: {
        from: new Date(),
        to: new Date(),
      },
    },
    resolver: zodResolver(dashboardFilterFormSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => console.log(data))}
        className="flex flex-1 gap-2 items-center justify-end"
      >
        <ClearFilterButton />
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
