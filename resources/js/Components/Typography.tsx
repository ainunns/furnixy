import type { HTMLAttributes } from "react";

const TypographyVariant = [
  "j1",
  "j2",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "s1",
  "s2",
  "s3",
  "s4",
  "b1",
  "b2",
  "b3",
  "c1",
  "c2",
  "l1",
  "l2",
] as const;

const TypographyColor = [
  "primary",
  "secondary",
  "tertiary",
  "danger",
  "white",
] as const;

type TypographyProps = HTMLAttributes<HTMLParagraphElement> & {
  variant?: (typeof TypographyVariant)[number];
  /**
   * | Variant | Size Class | Font Size | Font Weight |
   * | :------ | :--------- | :-------- | :---------- |
   * | j1      | text-4xl   | 36px      | 700         |
   * | j2      | text-3xl   | 30px      | 700         |
   * | h1      | text-2xl   | 24px      | 600         |
   * | h2      | text-xl    | 20px      | 600         |
   * | h3      | text-lg    | 18px      | 600         |
   * | h4      | text-base  | 16px      | 700         |
   * | h5      | text-base  | 16px      | 600         |
   * | h6      | text-sm    | 14px      | 600         |
   * | s1      | text-lg    | 18px      | 500         |
   * | s2      | text-base  | 16px      | 500         |
   * | s3      | text-sm    | 14px      | 500         |
   * | s4      | text-xs    | 12px      | 500         |
   * | b1      | text-lg    | 18px      | 400         |
   * | b2      | text-base  | 16px      | 400         |
   * | b3      | text-sm    | 14px      | 400         |
   * | c1      | text-xs    | 12px      | 400         |
   * | c2      | -          | 11px      | 400         |
   */
  color?: (typeof TypographyColor)[number];
  as?: React.ElementType;
  children: React.ReactNode;
};

export default function Typography({
  variant = "b2",
  color = "primary",
  as: Component = "p",
  className = "",
  children,
  ...props
}: TypographyProps) {
  const variantClasses = {
    j1: "text-4xl font-bold",
    j2: "text-3xl font-bold",
    h1: "text-2xl font-semibold",
    h2: "text-xl font-semibold",
    h3: "text-lg font-semibold",
    h4: "text-base font-bold",
    h5: "text-base font-semibold",
    h6: "text-sm font-semibold",
    s1: "text-lg font-medium",
    s2: "text-base font-medium",
    s3: "text-sm font-medium",
    s4: "text-xs font-medium",
    b1: "text-lg",
    b2: "text-base",
    b3: "text-sm",
    c1: "text-xs",
    c2: "text-[11px] leading-[14px]",
    l1: "text-lg font-light",
    l2: "text-base font-light",
  };

  const colorClasses = {
    primary: "text-black",
    secondary: "text-gray-700",
    tertiary: "text-gray-500",
    danger: "text-red-500",
    white: "text-white",
  };

  return (
    <Component
      {...props}
      className={`font-sans ${variantClasses[variant]} ${colorClasses[color]} ${className}`}
    >
      {children}
    </Component>
  );
}
