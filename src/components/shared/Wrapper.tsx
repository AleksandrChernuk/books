import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

export default function Wrapper({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("py-10 md:py-20", className)}>{children}</div>;
}
