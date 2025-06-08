import { getAllBooks } from "@/actions/book.actions";
import BookCardPublick from "@/components/shared/BookCardPublick";
import Container from "@/components/shared/Container";
import { Book } from "@/types/book.types";

export default async function BooksPage() {
  const books: Book[] = await getAllBooks();
  return (
    <Container>
      <div className="py-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="mb-0">Книги</h1>
        </div>
        <ul className="space-y-2">
          {books.map((book) => (
            <li key={book.id}>
              <BookCardPublick book={book} />
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
