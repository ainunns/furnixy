import * as React from "react";
import Typography from "../Typography";

type ErrorMessageProps = {
  children: React.ReactNode;
} & React.ComponentPropsWithRef<"div">;

export default function ErrorMessage({
  children,
  ...props
}: ErrorMessageProps) {
  return (
    <div className="flex space-x-1" {...props}>
      <Typography variant="c1" color="danger" className="mt-1">
        {children}
      </Typography>
    </div>
  );
}
