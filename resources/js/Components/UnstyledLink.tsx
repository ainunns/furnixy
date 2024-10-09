import { cn } from "@/Lib/utils";
import { InertiaLinkProps, Link } from "@inertiajs/react";
import * as React from "react";

export type UnstyledLinkProps = {
  href: string;
  children: React.ReactNode;
  openNewTab?: boolean;
  className?: string;
  inertiaLinkProps?: Omit<InertiaLinkProps, "href">;
} & React.ComponentPropsWithRef<"a">;

const UnstyledLink = React.forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  (
    { children, href, openNewTab, className, inertiaLinkProps, ...rest },
    ref,
  ) => {
    const isNewTab =
      openNewTab !== undefined
        ? openNewTab
        : href && !href.startsWith("/") && !href.startsWith("#");

    if (!isNewTab) {
      return (
        <Link href={href} ref={ref} className={className} {...inertiaLinkProps}>
          {children}
        </Link>
      );
    }

    return (
      <a
        ref={ref}
        target="_blank"
        rel="noopener noreferrer"
        href={href}
        {...rest}
        className={cn(className)}
      >
        {children}
      </a>
    );
  },
);

export default UnstyledLink;
