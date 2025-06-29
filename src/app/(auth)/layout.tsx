import Container from "@/components/shared/Container";
import Wrapper from "@/components/shared/Wrapper";
import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`flex flex-col h-dvh`}>
      <main className="flex-1">
        <Container className="h-dvh">
          <Wrapper className="h-dvh flex items-center justify-center">
            {children}
          </Wrapper>
        </Container>

        {/* <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6"></div>
      </div> */}
      </main>
    </div>
  );
}
