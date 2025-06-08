import AuthHeader from "@/components/modules/headers/AuthHeaders";
import { FirebaseSignInSync } from "@/components/shared/Token";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <div className={`flex flex-col h-dvh`}>
        <AuthHeader />
        <main className="flex-1">{children}</main>
        <FirebaseSignInSync />
      </div>
    </ClerkProvider>
  );
}
