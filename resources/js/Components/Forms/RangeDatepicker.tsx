import get from "lodash.get";
import { Calendar, XCircle } from "lucide-react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";
import { cn } from "@/Lib/utils";
import * as React from "react";
import DatePicker, { DatePickerProps } from "react-datepicker";
import Typography from "../Typography";

type ReactDatePickerProps = {
  validation?: RegisterOptions;
  label: string | null;
  id: string;
  placeholder?: string;
  defaultYear?: number;
  defaultMonth?: number;
  helperText?: string;
  readOnly?: boolean;
  /** Disable error style (not disabling error validation) */
  hideError?: boolean;
  containerClassName?: string;
  onClearDate?: () => void;
} & Omit<DatePickerProps, "onChange">;

export default function RangeDatePicker({
  validation,
  label,
  id,
  placeholder,
  defaultYear,
  defaultMonth,
  helperText,
  readOnly = false,
  hideError = false,
  disabled,
  isClearable,
  onClearDate,
  containerClassName,
}: ReactDatePickerProps) {
  const {
    formState: { errors },
    control,
  } = useFormContext();
  const error = get(errors, id);
  const withLabel = label !== null;

  const defaultDate = React.useMemo(() => {
    const date = new Date();
    if (defaultYear) date.setFullYear(defaultYear);
    if (defaultMonth) date.setMonth(defaultMonth);
    return date;
  }, [defaultYear, defaultMonth]);

  const safeConvertToDate = (dateValue: unknown) => {
    if (!dateValue) return undefined;

    if (dateValue instanceof Date) return dateValue;

    try {
      const parsedDate = new Date(dateValue as string | number);
      return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
    } catch {
      return undefined;
    }
  };

  return (
    <div className={cn("relative", containerClassName)}>
      {withLabel && (
        <Typography as="label" variant="s3" className="block">
          {label}
        </Typography>
      )}

      <Controller
        control={control}
        rules={validation}
        name={id}
        render={({ field: { onChange, onBlur, value } }) => {
          const startDate = Array.isArray(value)
            ? safeConvertToDate(value[0])
            : safeConvertToDate(value);

          const endDate =
            Array.isArray(value) && value[1]
              ? safeConvertToDate(value[1])
              : undefined;

          return (
            <>
              <div className={cn("relative", withLabel && "mt-1")}>
                <DatePicker
                  name={id}
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={startDate}
                  startDate={startDate}
                  endDate={endDate}
                  className={cn(
                    "flex w-full rounded-lg shadow-sm",
                    "min-h-[2.5rem] py-0 md:min-h-[2.75rem]",
                    "border-gray-300 focus:border-primary-500 focus:ring-primary-500",
                    (readOnly || disabled) &&
                      "cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0",
                    error &&
                      "border-red-500 focus:border-red-500 focus:ring-red-500",
                  )}
                  placeholderText={placeholder}
                  aria-describedby={id}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  openToDate={startDate || defaultDate}
                  dateFormat="dd/MM/yyyy"
                  readOnly={readOnly}
                  disabled={disabled}
                  selectsRange
                />
                <div className="absolute flex gap-2 right-4 top-1/2 -translate-y-1/2 transform text-typo-icons">
                  {isClearable && (
                    <button type="button" onClick={() => onClearDate?.()}>
                      <XCircle size={16} className="text-typo-icons" />
                    </button>
                  )}
                  <Calendar size={18} />
                </div>
              </div>
              {helperText && (
                <Typography variant="c1" color="secondary" className="mt-1">
                  {helperText}
                </Typography>
              )}
              {!hideError && error && (
                <Typography variant="c1" color="danger" className="mt-1">
                  {error?.message?.toString()}
                </Typography>
              )}
            </>
          );
        }}
      />
    </div>
  );
}
