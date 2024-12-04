import Button from "@/Components/Button";
import Checkbox from "@/Components/Forms/Checkbox";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/Popover";
import Typography from "@/Components/Typography";
import { cn } from "@/Lib/utils";
import { ChevronDown, Filter, X } from "lucide-react";
import * as React from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";

export type PopupFilterProps<T extends Record<string, string[]>> = {
  filterOption: {
    id: Extract<keyof T, string>;
    name: string;
    options: {
      id: string;
      name: string;
    }[];
  }[];
  filterQuery: T;
  setFilterQuery: React.Dispatch<React.SetStateAction<T>>;
  onResetFilter?: () => void;
  title?: string;
} & React.ComponentPropsWithoutRef<"div">;

type FormData = {
  filter: string[];
};

export default function PopupFilter<T extends Record<string, string[]>>({
  filterOption,
  filterQuery,
  setFilterQuery,
  onResetFilter,
  title = "Filter",
  className,
}: PopupFilterProps<T>) {
  //#region  //*=========== Form ===========
  const defaultFilterValues = React.useMemo(() => {
    return Object.entries(filterQuery).reduce((acc, [key, values]) => {
      return [...acc, ...values.map((value) => `${key}.${value}`)];
    }, [] as string[]);
  }, [filterQuery]);

  const methods = useForm<FormData>({
    mode: "onTouched",
    defaultValues: {
      filter: defaultFilterValues,
    },
  });
  const { control, setValue } = methods;

  const filter =
    useWatch({
      control,
      name: "filter",
    }) ?? [];
  //#endregion  //*======== Form ===========

  React.useEffect(() => {
    const defaultFilter = filterOption.reduce((acc, curr) => {
      return { ...acc, [curr.id]: [] };
    }, {} as T);

    const parsedFilter =
      filter?.reduce((acc, curr) => {
        const [key, value] = curr.split(".");
        acc[key].push(value);
        return acc;
      }, defaultFilter) ?? defaultFilter;

    setFilterQuery(parsedFilter);
  }, [filter, filterOption, setFilterQuery]);

  const resetFilter = () => {
    onResetFilter?.();
    setValue("filter", []);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          leftIcon={Filter}
          rightIcon={ChevronDown}
          className={cn("bg-primary-100", className)}
        >
          {title} {filter?.length > 0 && `(${filter.length})`}
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" className="w-md">
        <FormProvider {...methods}>
          <div className="flex items-center justify-between">
            <Typography variant="h6">Filter by</Typography>
            <div className="flex items-center gap-3">
              <Typography
                as="button"
                variant="b3"
                onClick={resetFilter}
                className="cursor-pointer font-semibold text-primary-500 underline"
              >
                Reset Filter
              </Typography>
              <PopoverClose>
                <X />
              </PopoverClose>
            </div>
          </div>
          {filterOption.map((item) => (
            <div key={item.id}>
              <Typography variant="s3" color="secondary" className="mt-4">
                {item.name}
              </Typography>
              <div className="mt-2">
                {item.options.map((option) => (
                  <Checkbox
                    key={`${item.id}.${option.id}`}
                    size="sm"
                    name="filter"
                    value={`${item.id}.${option.id}`}
                    label={option.name}
                  />
                ))}
              </div>
            </div>
          ))}
        </FormProvider>
      </PopoverContent>
    </Popover>
  );
}
