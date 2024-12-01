import * as React from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import RangeDatePicker from "./Forms/RangeDatepicker";

export type PopupFilterProps = {
  date: Date[];
  setDate: React.Dispatch<React.SetStateAction<Date[]>>;
  onResetFilter?: () => void;
} & React.ComponentPropsWithoutRef<"div">;

type FormData = {
  filter: Date[];
};

export default function DatepickerFilter({
  date,
  setDate,
  onResetFilter,
}: PopupFilterProps) {
  //#region  //*=========== Form ===========t
  const methods = useForm<FormData>({
    mode: "onTouched",
    defaultValues: {
      filter: date,
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
    setDate(filter);
  }, [filter]);

  const resetFilter = () => {
    onResetFilter?.();
    setValue("filter", []);
  };

  return (
    <FormProvider {...methods}>
      <div className="relative w-80">
        <RangeDatePicker
          id="filter"
          label={null}
          placeholder="Filter by date"
          containerClassName="w-full"
          isClearable={filter.length > 0}
          onClearDate={resetFilter}
        />
      </div>
    </FormProvider>
  );
}
