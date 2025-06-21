export const dynamic = "force-dynamic";

import { getAllBooks } from "@/actions/book.actions";
import BookCardPublick from "@/components/shared/BookCardPublick";
import Container from "@/components/shared/Container";
import Wrapper from "@/components/shared/Wrapper";
import { Book } from "@/types/book.types";
import { notFound } from "next/navigation";

export default async function Books() {
  const books: Book[] = await getAllBooks();

  if (!books) {
    return notFound();
  }

  return (
    <Container>
      <Wrapper>
        <h1 className="text-center">Книги</h1>
        <ul className="flex flex-col justify-center items-center sm:flex-row sm:justify-start md:items-center gap-4 flex-wrap">
          {books.map((book) => (
            <li key={book.id}>
              <BookCardPublick book={book} />
            </li>
          ))}
        </ul>
      </Wrapper>
    </Container>
  );
}
