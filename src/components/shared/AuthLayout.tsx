"use client";

import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useUserStore } from "@/store/useStore";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const setUser = useUserStore((state) => state.setUserStore);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/sign-in");
      } else {
        const uid = user.uid;
        setUser({ uid });
        setLoading(false);
      }
    });
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  if (loading) {
    return (
      <div className="py-5 flex items-center justify-center min-h-dvh">
        <LoaderCircle size={40} className="animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
