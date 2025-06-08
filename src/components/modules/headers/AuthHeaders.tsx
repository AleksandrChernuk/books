"use client";

import Container from "@/components/shared/Container";
import NavLinks from "@/components/shared/NavLinks";
import { privateLinks } from "@/constans/nav.constans";
// import { UserButton } from "@clerk/nextjs";
import { AuthMobile } from "../mobile-menu/AuthMobile";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function AuthHeader() {
  const router = useRouter();
  const handleLogOut = async () => {
    await auth.signOut();
    router.push("/");
  };

  return (
    <header className="border border-b-zinc-200 shadow-sm">
      <Container>
        <div className="py-4">
          <div className="flex items-center justify-between">
            <NavLinks links={privateLinks} className="hidden md:block" />
            <div className="md:hidden">
              <AuthMobile />
            </div>
            <Button onClick={handleLogOut}>Вихід</Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
