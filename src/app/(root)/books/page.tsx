export const dynamic = "force-dynamic";

import { getAllBooks } from "@/actions/book.actions";
import BookCardPublick from "@/components/shared/BookCardPublick";
import Container from "@/components/shared/Container";
import Wrapper from "@/components/shared/Wrapper";
import { Book } from "@/types/book.types";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Книга Валерія Примоста`,
    description: "Детальний опис книги, автор — Валерій Примост.",
  };
}

export default async function Books() {
  const books: Book[] = await getAllBooks();

  if (!books) {
    return notFound();
  }

  return (
    <>
      <section>
        <Container>
          <Wrapper className="pb-20">
            <h1 className="text-center">Книги</h1>
            <ul className="flex flex-col justify-center items-center sm:flex-row md:items-center gap-4 flex-wrap">
              {books
                .sort((a, b) => (b.sorting ?? 0) - (a.sorting ?? 0))
                .map((book) => (
                  <li key={book.id}>
                    <BookCardPublick book={book} />
                  </li>
                ))}
            </ul>
          </Wrapper>
        </Container>
      </section>
    </>
  );
}
