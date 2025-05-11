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
import { usePathname } from "next/navigation";

export function MobileMenu() {
  const pahname = usePathname();
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size={"default"}>
          <Menu size={40} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <nav className="flex items-center gap-4 text-xl">
            <Button
              asChild
              variant={"link"}
              size={"sm"}
              className={`${pahname === "/about" && "underline"}`}
            >
              <Link href={"/about"}>Про автора</Link>
            </Button>
            <Button asChild variant={"link"} size={"sm"}>
              <Link
                href={"/books"}
                className={`${pahname === "/books" && "underline"}`}
              >
                Книги
              </Link>
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
