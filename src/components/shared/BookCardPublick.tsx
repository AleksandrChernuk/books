"use client";

import { Book } from "@/types/book.types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { shimmer } from "@/helpers/shimmer";
import { toBase64 } from "@/helpers/toBase64";
import pl from "@/assets/placeholder.webp";

type BookCardProps = {
  book: Book;
};

export default function BookCardPublick({ book }: BookCardProps) {
  const router = useRouter();

  const handleClick = async () => {
    router.push(`books/${book.slug}`);
  };

  const cover =
    typeof book.coverImageUrl === "string" && book.coverImageUrl
      ? book.coverImageUrl
      : pl;

  return (
    <ul
      className="rounded-md shadow-xl hover:scale-105 transition-all cursor-pointer "
      onClick={handleClick}
    >
      <li className="  relative aspect-[3/4] w-56">
        <Image
          src={cover}
          alt={book.title}
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(200, 200)
          )}`}
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </li>
    </ul>
  );
}
