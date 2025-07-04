export const dynamic = "force-dynamic";

import { getAllBooks, getBookBySlug } from "@/actions/book.actions";
import BackBtn from "@/components/shared/BackBtn";
import Container from "@/components/shared/Container";
import Image from "next/image";
import { notFound } from "next/navigation";
import pl from "@/assets/placeholder.webp";
import { toBase64 } from "@/helpers/toBase64";
import { shimmer } from "@/helpers/shimmer";
import CheckoutForm from "@/components/modules/checkout-form";
import Wrapper from "@/components/shared/Wrapper";

export type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;

  const book = await getBookBySlug(slug);

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
      <Wrapper className="pb-20">
        <div className="mb-4">
          <BackBtn />
        </div>

        <div>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-10 ">
            <li className="relative min-h-80 sm:col-span-2">
              <div className="w-[320px] h-[400px]">
                <Image
                  src={cover}
                  alt={book.title}
                  placeholder={`data:image/svg+xml;base64,${toBase64(
                    shimmer(200, 200)
                  )}`}
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
            </li>
            <li>
              <ul className="flex flex-col">
                <li>
                  <h1 className="text-2xl">{book.title}</h1>
                </li>
                <li className="w-full">
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
      </Wrapper>
    </Container>
  );
}
