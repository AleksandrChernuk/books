"use client";

import Container from "@/components/shared/Container";
import NavLinks from "@/components/shared/NavLinks";
import { Skeleton } from "@/components/ui/skeleton";
import { privateLinks } from "@/constans/nav.constans";
// import { UserButton } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import React from "react";
import { AuthMobile } from "../mobile-menu/AuthMobile";

export const ClerkUserButtonNoSSR = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.UserButton),

  {
    ssr: false,
    loading: () => <Skeleton className="size-7 rounded-full bg-gray-200" />,
  }
);

export default function AuthHeader() {
  return (
    <header className="border border-b-zinc-200 shadow-sm">
      <Container>
        <div className="py-4">
          <div className="flex items-center justify-between">
            <NavLinks links={privateLinks} className="hidden md:block" />
            <div className="md:hidden">
              <AuthMobile />
            </div>
            {/* <UserButton /> */}
          </div>
        </div>
      </Container>
    </header>
  );
}
