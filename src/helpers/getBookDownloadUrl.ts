import { getBookById } from "@/actions/book.actions";

export async function getBookDownloadUrl(bookId: string, format: string) {
  const book = await getBookById(bookId);
  if (!book) return null;
  const found = (book.formats || []).find((f) => f.format === format);
  return found?.url || null;
}
