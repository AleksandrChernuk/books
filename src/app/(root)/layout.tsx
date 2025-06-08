import Footer from "@/components/modules/footer/footer";
import MainHeader from "@/components/modules/headers/MainHeader";
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
    <div className={`${geist.className} flex flex-col h-dvh`}>
      <MainHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
