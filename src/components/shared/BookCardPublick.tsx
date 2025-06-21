"use client";

import { Book } from "@/types/book.types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { shimmer } from "@/helpers/shimmer";
import { toBase64 } from "@/helpers/toBase64";

type BookCardProps = {
  book: Book;
};

export default function BookCardPublick({ book }: BookCardProps) {
  const router = useRouter();

  const handleClick = async () => {
    router.push(`books/${book.slug}`);
  };

  return (
    <ul
      className="rounded-md shadow-xl hover:scale-105 transition-all cursor-pointer "
      onClick={handleClick}
    >
      <li className="  relative aspect-[3/4] w-56">
        <Image
          src={book.coverImageUrl || "images/placeholder.webp"}
          alt={book.title}
          fill
          sizes="(max-width: 768px) 100vw"
          className="object-cover"
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(300, 400)
          )}`}
        />
      </li>
    </ul>
  );
}
