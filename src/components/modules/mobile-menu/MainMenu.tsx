"use client";

import NavLinks from "@/components/shared/NavLinks";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { publicLinks } from "@/constans/nav.constans";
import { icons } from "@/constans/socialIcons";
import { Menu } from "lucide-react";
import Link from "next/link";
import React from "react";

export function MainMenu() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size={"default"}>
          <Menu size={40} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm ">
          <nav className="flex items-center gap-4 text-xl p-4 overflow-x-scroll">
            <NavLinks className="flex items-center gap-2" links={publicLinks} />
          </nav>
          <div className="flex items-center justify-center gap-2 pb-4">
            <Link
              href="https://www.facebook.com/vprimost/?locale=uk_UA"
              target="_blank"
              prefetch={false}
              aria-label="facebook"
            >
              {React.cloneElement(icons["facebook"], {
                className: "w-6 h-6 stroke-black",
              })}
            </Link>
            <Link
              href={"https://www.patreon.com/V_Prymost"}
              target="_blank"
              prefetch={false}
              aria-label={"patreon"}
              className="text-black"
            >
              Patreon
            </Link>
            <Link
              href={"https://www.linkedin.com/in/valerii-prymost-a3a05545/"}
              target="_blank"
              prefetch={false}
              aria-label="linkedin"
            >
              {React.cloneElement(icons["linkedin"], {
                className: "w-6 h-6 stroke-black",
              })}
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
