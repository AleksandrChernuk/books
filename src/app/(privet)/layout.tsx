import AuthHeader from "@/components/modules/headers/AuthHeaders";

import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`flex flex-col h-dvh`}>
      <AuthHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}
