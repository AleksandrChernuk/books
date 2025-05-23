import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/modules/header/header";
import Footer from "@/components/modules/footer/footer";
import { Playpen_Sans } from "next/font/google";

const geist = Playpen_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["emoji", "latin", "latin-ext", "math", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "ВАЛЕРІЙ ПРИМОСТ — Письменник | Сценарист | Креативний директор | Сторітеллер",
  description:
    "Офіційний сайт Валерія Примоста: письменника, сценариста, креативного директора та майстра сторітелінгу. Проекти, портфоліо, блог та контакти.",
  icons: {
    icon: [
      { url: "images/favicon.ico" },
      { url: "images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "images/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "images/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [{ url: "images/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className}`} suppressHydrationWarning>
        <div className="flex flex-col h-dvh">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
