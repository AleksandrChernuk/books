import { getAllBooks, getBookBySlug } from "@/actions/book.actions";
import BackBtn from "@/components/shared/BackBtn";
import Container from "@/components/shared/Container";
import Image from "next/image";
import { notFound } from "next/navigation";
import pl from "@/assets/placeholder.webp";
import { toBase64 } from "@/helpers/toBase64";
import { shimmer } from "@/helpers/shimmer";
import CheckoutForm from "@/components/modules/checkout-form";

export type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const books = await getAllBooks();
  return books.map((book) => ({ slug: book.slug }));
}

type Props = {
  params: Params;
};

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) {
    return notFound();
  }
  const cover =
    typeof book.coverImageUrl === "string" && book.coverImageUrl
      ? book.coverImageUrl
      : pl;

  return (
    <Container>
      <div className="py-10">
        <div className="mb-4">
          <BackBtn />
        </div>

        <div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-10 ">
            <li className="relative min-h-80">
              <Image
                src={cover}
                alt={book.title}
                width={200}
                height={320}
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  shimmer(200, 320)
                )}`}
              />
            </li>
            <li>
              <ul className="flex flex-col">
                <li>
                  <h1>{book.title}</h1>
                </li>
                <li className="w-fit">
                  <CheckoutForm
                    book={book}
                    formats={book.formats.map((e) => e.format)}
                  />
                </li>
              </ul>
            </li>
          </ul>
          <div
            className="prose py-10"
            dangerouslySetInnerHTML={{ __html: book?.fullDescription || "" }}
          />{" "}
        </div>
      </div>
    </Container>
  );
}
