"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import Link from "next/link";

export function MobileMenu() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <nav className="flex items-center justify-between gap-4">
            <Button asChild variant={"link"} size={"sm"}>
              <Link href={"/about"}>Про автора</Link>
            </Button>
            <Button asChild variant={"link"} size={"sm"}>
              <Link href={"/blog"}>Блог</Link>
            </Button>
            <Button asChild variant={"link"} size={"sm"}>
              <Link href={"/books"}>Книги</Link>
            </Button>
          </nav>

          <DrawerHeader>
            <DrawerTitle className="sr-only"></DrawerTitle>
            <DrawerDescription className="sr-only"> </DrawerDescription>
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
