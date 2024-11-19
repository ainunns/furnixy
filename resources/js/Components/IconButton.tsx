import { cn } from "@/Lib/utils";
import { Loader2, LucideIcon } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import * as React from "react";

const IconButtonVariant = [
  "primary",
  "secondary",
  "danger",
  "outline",
  "ghost",
  "warning",
] as const;
const IconButtonSize = ["sm", "base", "lg"] as const;

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  variant?: (typeof IconButtonVariant)[number];
  size?: (typeof IconButtonSize)[number];
  icon?: LucideIcon;
  iconClassName?: string;
};

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      children,
      className = "",
      disabled: buttonDisabled,
      isLoading,
      variant = "primary",
      size = "base",
      icon: Icon,
      iconClassName = "",
      type = "button",
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        {...rest}
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium",
          "focus:outline-none focus-visible:ring",
          "shadow-sm",
          "transition-colors duration-75",
          //#region  //*=========== Size ===========
          [
            size === "lg" && [
              "min-h-[2.75rem] px-3.5 md:min-h-[3rem]",
              "text-base",
            ],
            size === "base" && [
              "min-h-[2.25rem] px-3 md:min-h-[2.5rem]",
              "text-sm md:text-base",
            ],
            size === "sm" && [
              "min-h-[1.75rem] px-2 md:min-h-[2rem]",
              "text-xs md:text-sm",
            ],
          ],
          //#endregion  //*======== Size ===========
          //#region  //*=========== Variants ===========
          [
            variant === "primary" && [
              "bg-primary-500 text-white",
              "border border-primary-600",
              "hover:bg-primary-600 hover:text-white",
              "active:bg-primary-700",
              "disabled:bg-primary-700",
              "focus-visible:ring-primary-400",
            ],
            variant === "secondary" && [
              "bg-secondary-500 text-white",
              "border border-secondary-600",
              "hover:bg-secondary-600 hover:text-white",
              "active:bg-secondary-700",
              "disabled:bg-secondary-700",
              "focus-visible:ring-secondary-400",
            ],
            variant === "danger" && [
              "bg-red-500 text-white",
              "border border-red-600",
              "hover:bg-red-600 hover:text-white",
              "active:bg-red-700",
              "disabled:bg-red-700",
              "focus-visible:ring-red-400",
            ],
            variant === "warning" && [
              "bg-amber-500 text-white",
              "border border-amber-500",
              "hover:bg-amber-600 hover:text-white",
              "active:bg-amber-700",
              "disabled:bg-amber-700",
              "focus-visible:ring-amber-400",
            ],
            variant === "outline" && [
              "text-typo",
              "border border-gray-300",
              "hover:bg-light focus-visible:ring-primary-400 active:bg-typo-divider disabled:bg-typo-divider",
            ],
            variant === "ghost" && [
              "text-primary-500",
              "shadow-none",
              "hover:bg-primary-50 focus-visible:ring-primary-400 active:bg-primary-100 disabled:bg-primary-100",
            ],
          ],
          //#endregion  //*======== Variants ===========
          "disabled:cursor-not-allowed",
          isLoading &&
            "relative text-transparent transition-none hover:text-transparent disabled:cursor-wait",
          className
        )}
      >
        {isLoading && (
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
              ["primary", "secondary", "danger", "warning"].includes(variant)
                ? "text-white"
                : "text-primary-500"
            }`}
          >
            <Loader2 size={18} className="animate-spin" />
          </div>
        )}
        {Icon && <Icon size="1em" className={`text-base ${iconClassName}`} />}
      </button>
    );
  }
);

export default IconButton;
