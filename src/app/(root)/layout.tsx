import Footer from "@/components/modules/footer/footer";
import MainHeader from "@/components/modules/headers/MainHeader";
import { FirebaseSignInSync } from "@/components/shared/Token";
import { ClerkProvider } from "@clerk/nextjs";
import { Playpen_Sans } from "next/font/google";

const geist = Playpen_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["emoji", "latin", "latin-ext", "math", "vietnamese"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <div className={`${geist.className} flex flex-col h-dvh`}>
        <MainHeader />
        <main className="flex-1">{children}</main>
        <Footer />
        <FirebaseSignInSync />
      </div>
    </ClerkProvider>
  );
}
