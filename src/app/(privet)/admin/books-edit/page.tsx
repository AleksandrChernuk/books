import { getAllBooks } from "@/actions/book.actions";
import BookCard from "@/components/shared/BookCard";
import Container from "@/components/shared/Container";
import CreateButton from "@/components/shared/CreateButton";
import { Book } from "@/types/book.types";

export default async function BooksEdit() {
  const books: Book[] = await getAllBooks();

  return (
    <Container>
      <div className="py-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="mb-0">Книги</h1>

          <CreateButton href="/admin/books-edit/create" />
        </div>
        <ul className="space-y-2">
          {books.map((book) => (
            <li key={book.id}>
              <BookCard book={book} />
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
