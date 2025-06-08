"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { TNavLinks } from "@/constans/nav.constans";

export default function NavLinks({
  links,
  className,
}: {
  links: TNavLinks[];
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <div className={cn(className)}>
      {links.map((link) => {
        const isActive = pathname === link.url;

        return (
          <Button
            key={link.url}
            asChild
            variant="link"
            className={cn(
              "transition-colors",
              isActive && "underline text-primary font-semibold"
            )}
          >
            <Link href={link.url}>{link.title}</Link>
          </Button>
        );
      })}
    </div>
  );
}
