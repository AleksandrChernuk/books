import LoadingPage from "@/components/shared/LoadingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Завантаження — книги Валерія Примоста",
  description: "Зачекайте, поки завантажуються книги Валерія Примоста.",
  robots: "noindex",
};

export default function Loading() {
  return <LoadingPage text="Завантаження книг..." />;
}
