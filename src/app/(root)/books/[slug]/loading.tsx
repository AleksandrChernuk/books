import { getBookBySlug } from "@/actions/book.actions";
import LoadingPage from "@/components/shared/LoadingPage";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const book = await getBookBySlug(params.slug);

  if (!book) {
    return {
      title: "Книга не знайдена",
      description: "Обрана книга не знайдена або була видалена.",
    };
  }

  return {
    title: `${book.title} — книга Валерія Примоста`,
    description: book.title || "Детальний опис книги, автор — Валерій Примост.",
  };
}

export default function Loading() {
  return <LoadingPage text="Завантаження книги..." />;
}
