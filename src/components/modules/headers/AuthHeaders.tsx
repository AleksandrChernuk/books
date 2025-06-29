"use client";

import Container from "@/components/shared/Container";
import NavLinks from "@/components/shared/NavLinks";
import { privateLinks } from "@/constans/nav.constans";
// import { UserButton } from "@clerk/nextjs";
import { AuthMobile } from "../mobile-menu/AuthMobile";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useStore";

export default function AuthHeader() {
  const clearUserStore = useUserStore((state) => state.clearUserStore);

  const router = useRouter();
  const handleLogOut = async () => {
    await auth.signOut();
    clearUserStore();
    router.push("/");
  };

  return (
    <header className="border border-b-zinc-200 shadow-sm">
      <Container>
        <div className="py-4">
          <div className="flex items-center justify-between">
            <div className="md:hidden">
              <AuthMobile />
            </div>
            <NavLinks links={privateLinks} className="hidden md:block" />

            <Button onClick={handleLogOut}>Вихід</Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
