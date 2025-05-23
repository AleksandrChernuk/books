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
import { Facebook, Instagram, Linkedin, Menu } from "lucide-react";
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
          <nav className="flex items-center gap-4 text-xl p-4">
            <Button
              asChild
              variant={"link"}
              size={"sm"}
              className={`${pahname === "/" && "underline"}`}
            >
              <Link href={"/"}>Головна</Link>
            </Button>
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

          <div className="flex items-center justify-center gap-4 pb-4">
            <Link
              href={"https://www.facebook.com/vprimost/?locale=uk_UA"}
              target="_blank"
            >
              <Facebook stroke="black" />
            </Link>
            <Link
              href={"https://www.facebook.com/vprimost/?locale=uk_UA"}
              target="_blank"
            >
              <Instagram stroke="black" />
            </Link>

            <Link
              href={
                "https://www.linkedin.com/in/%D0%B2%D0%B0%D0%BB%D0%B5%D1%80%D0%B8%D0%B9-%D0%BF%D1%80%D0%B8%D0%BC%D0%BE%D1%81%D1%82-a412a950/"
              }
              target="_blank"
            >
              <Linkedin stroke="black" />
            </Link>
          </div>
          <DrawerHeader className="sr-only">
            <DrawerTitle className="sr-only"></DrawerTitle>
            <DrawerDescription className="sr-only"> </DrawerDescription>
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
