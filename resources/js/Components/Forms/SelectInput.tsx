import { cn } from "@/Lib/utils";
import { ExtractProps } from "@/types/helper";
import get from "lodash.get";
import { ChevronDown, X } from "lucide-react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import Select, { components, MultiValue, StylesConfig } from "react-select";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";

export type SearchableSelectInputProps = {
  label: string | null;
  id: string;
  placeholder?: React.ReactNode;
  helperText?: string;
  type?: string;
  isMulti?: boolean;
  readOnly?: boolean;
  hideError?: boolean;
  validation?: RegisterOptions;
  options: { value: string; label: string }[];
  containerClassName?: string;
} & React.ComponentPropsWithoutRef<"select"> &
  ExtractProps<Select>;

export default function SearchableSelectInput({
  disabled,
  readOnly,
  label,
  helperText,
  id,
  isMulti = false,
  placeholder,
  validation,
  options,
  hideError = false,
  containerClassName,
  ...rest
}: SearchableSelectInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, id);

  const withLabel = label !== null;

  //#region  //*=========== Styles ===========
  const customStyles: StylesConfig = {
    control: (styles) => ({
      ...styles,
      // red-500 and gray-300
      border: `1px solid ${error ? "#EF4444" : "#D1D5DB"}`,
      "&:hover": {
        border: `1px solid ${error ? "#EF4444" : "#D1D5DB"}`,
      },
      boxShadow: "none",
      transition: "none",
      "&:focus-within": {
        border: `1px solid ${error ? "#EF4444" : "var(--color-primary-500)"}`,
        boxShadow: `0 0 0 1px ${
          error ? "#EF4444" : "var(--color-primary-500)"
        }`,
      },
      "*": {
        boxShadow: "none !important",
      },
      borderRadius: "0.5rem",
      padding: "0 0.75rem",
      background: disabled || readOnly ? "#F3F4F6" : undefined,
      cursor: "pointer",
    }),
    valueContainer: (styles) => ({
      ...styles,
      padding: 0,
      gap: "0.5rem",
    }),
    input: (styles) => ({
      ...styles,
      padding: 0,
      margin: 0,
      caretColor: "var(--color-primary-500)",
      color: "#1F201D",
      "::placeholder": {
        color: "#5a5d56",
      },
    }),
    indicatorsContainer: (styles) => ({
      ...styles,
      "&>div": {
        padding: 0,
      },
    }),
    dropdownIndicator: (styles) => ({
      ...styles,
      color: "#878787",
      "&:hover": {
        color: "#878787",
      },
    }),
    option: (styles, state) => ({
      ...styles,
      color: "black",
      background: state.isFocused
        ? "var(--color-primary-50)"
        : state.isSelected
          ? "var(--color-primary-100)"
          : "white",
      ":hover": {
        background: "#E5E7EB",
      },
      cursor: "pointer",
    }),
    multiValue: (styles) => ({
      ...styles,
      display: "flex",
      alignItems: "center",
      gap: "0.25rem",
      background: "var(--color-primary-100)",
      borderRadius: "0.375rem",
      padding: "0.25rem 0.75rem",
      margin: 0,
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: "var(--color-primary-700)",
      padding: 0,
      paddingLeft: 0,
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: "var(--color-primary-700)",
      padding: 0,
      paddingLeft: "0.5rem",
      "&:hover": {
        color: "var(--color-primary-700)",
        backgroundColor: "transparent",
      },
    }),
    menu: (styles) => ({
      ...styles,
      borderRadius: "0.5rem",
      overflow: "hidden",
    }),
  };

  //#endregion  //*======== Styles ===========

  return (
    <div className={containerClassName}>
      {withLabel && (
        <Label htmlFor={id} required={!!validation?.required}>
          {label}
        </Label>
      )}
      <div
        className={cn(
          "relative",
          withLabel && "mt-1",
          (disabled || readOnly) && "cursor-not-allowed",
        )}
      >
        <Controller
          name={id}
          control={control}
          rules={validation}
          render={({ field }) => {
            return (
              <Select
                {...field}
                value={
                  //? null is needed so if the selected value is not found in the options, it will clear the value
                  isMulti
                    ? field.value?.map(
                        (value: unknown) =>
                          options.find((option) => option.value === value) ??
                          null,
                      )
                    : (options.find((opt) => opt.value === field.value) ?? null)
                }
                onChange={(selectedOptions) => {
                  isMulti
                    ? field.onChange(
                        (
                          selectedOptions as MultiValue<
                            (typeof options)[number]
                          >
                        ).map((option) => option?.value ?? ""),
                      )
                    : field.onChange(
                        (selectedOptions as (typeof options)[number])?.value ??
                          "",
                      );
                }}
                isDisabled={disabled}
                isClearable
                isMulti={isMulti}
                closeMenuOnSelect={!isMulti}
                placeholder={placeholder}
                options={options}
                classNames={{
                  control: () => "!min-h-[2.25rem] md:!min-h-[2.5rem]",
                }}
                styles={customStyles}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: (props) => (
                    <components.DropdownIndicator {...props}>
                      <ChevronDown size={18} />
                    </components.DropdownIndicator>
                  ),
                  ClearIndicator: (props) => (
                    <components.ClearIndicator {...props}>
                      <X
                        size={18}
                        className="mr-0.5 text-typo-icons hover:text-typo-secondary"
                      />
                    </components.ClearIndicator>
                  ),
                  MultiValueRemove: (props) => (
                    <components.MultiValueRemove {...props}>
                      <X size={18} />
                    </components.MultiValueRemove>
                  ),
                }}
                {...rest}
              />
            );
          }}
        />
        {!hideError && error && (
          <ErrorMessage>{error?.message?.toString()}</ErrorMessage>
        )}
      </div>
    </div>
  );
}
