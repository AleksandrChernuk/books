export const dynamic = "force-dynamic";

import { getAllBooks, getBookById } from "@/actions/book.actions";
import { BookFormNoSSR } from "@/components/modules/book-form";
import BackBtn from "@/components/shared/BackBtn";
import Container from "@/components/shared/Container";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const books = await getAllBooks();
  return books.map((book) => ({ slug: book.slug }));
}

export default async function EditPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const book = await getBookById(id);

  if (!book) {
    return notFound();
  }

  return (
    <Container>
      <div className="py-10">
        <div className="mb-4">
          <BackBtn />
        </div>
        <BookFormNoSSR book={book} />
      </div>
    </Container>
  );
}
