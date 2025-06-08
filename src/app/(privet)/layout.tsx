import AuthHeader from "@/components/modules/headers/AuthHeaders";
import ProtectedLayout from "@/components/shared/AuthLayout";

import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedLayout>
      <div className={`flex flex-col h-dvh`}>
        <AuthHeader />
        <main className="flex-1">{children}</main>
      </div>
    </ProtectedLayout>
  );
}
