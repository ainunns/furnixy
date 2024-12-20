import ApplicationLogo from "@/Components/ApplicationLogo";
import UnstyledLink from "@/Components/UnstyledLink";
import type { PropsWithChildren } from "react";

export default function GuestLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
      <div>
        <UnstyledLink href="/">
          <ApplicationLogo height="80" width="80" />
        </UnstyledLink>
      </div>

      <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
        {children}
      </div>
    </div>
  );
}
