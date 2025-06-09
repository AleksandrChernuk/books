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
import { MenuIcon } from "lucide-react";
import { privateLinks } from "@/constans/nav.constans";
import NavLinks from "@/components/shared/NavLinks";

export function AuthMobile() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <MenuIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="sr-only">
            <DrawerTitle className="sr-only"></DrawerTitle>
            <DrawerDescription className="sr-only"></DrawerDescription>
          </DrawerHeader>
          <div className="p-4 overflow-x-scroll">
            <NavLinks links={privateLinks} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
