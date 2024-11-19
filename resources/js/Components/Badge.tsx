import * as React from "react";
import Typography from "./Typography";

export default function Badge({ children }: {children: React.ReactNode}) {
  return (
    <div className="py-1 px-3 bg-secondary-500 border-primary-500 border rounded-lg">
      <Typography variant="s3" className="">
        {children}
      </Typography>
    </div>
  );
}
