import * as React from "react";
import Typography from "../Typography";

type LabelProps = {
  children: React.ReactNode;
  required?: boolean;
} & React.ComponentPropsWithRef<"label">;

export default function Label({ children, required, ...props }: LabelProps) {
  return (
    <label {...props}>
      <Typography variant="s3" className="block">
        {children}
        {required && <span className="text-red-500">*</span>}
      </Typography>
    </label>
  );
}
