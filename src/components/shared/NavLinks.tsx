"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { TNavLinks } from "@/constans/nav.constans";
import { ScrollArea } from "../ui/scroll-area";
import { useUserStore } from "@/store/useStore";

export default function NavLinks({
  links,
  className,
}: {
  links: TNavLinks[];
  className?: string;
}) {
  const pathname = usePathname();
  const currentUser = useUserStore((state) => state.currentUser);

  return (
    <ScrollArea>
      <div className={cn(className)}>
        {links.map((link) => {
          const isActive = pathname === link.url;

          return (
            <Button
              key={link.url}
              asChild
              variant="link"
              className={cn(
                "transition-colors px-2 py-1",
                isActive && "underline text-primary font-semibold"
              )}
            >
              <Link href={link.url}>{link.title}</Link>
            </Button>
          );
        })}
        {currentUser && !pathname.startsWith("/admin") && (
          <div>
            <Button
              variant="link"
              asChild
              className={cn("transition-colors px-2 py-1")}
            >
              <Link href="/admin">Адмін панель</Link>
            </Button>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
