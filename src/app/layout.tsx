import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
