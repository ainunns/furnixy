import * as React from "react";
import Typography from "./Typography";

export default function Badge({
  children,
  className,
}: { children: React.ReactNode; className?: string }) {
  return (
    <div className="py-1 px-3 bg-secondary-500 border-primary-500 border rounded-lg">
      <Typography variant="s3" className={className}>
        {children}
      </Typography>
    </div>
  );
}
