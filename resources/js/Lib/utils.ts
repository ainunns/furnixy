import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(...args));
}

export function numberToCurrency(
  number: number,
  options: Intl.NumberFormatOptions & { trailingZeroDisplay?: string } = {},
  withCurrency: boolean = true,
  /** Display currency if true, default true */
) {
  return new Intl.NumberFormat("id-ID", {
    trailingZeroDisplay: "stripIfInteger",
    ...(withCurrency && { style: "currency", currency: "IDR" }),
    ...options,
  }).format(number);
}
