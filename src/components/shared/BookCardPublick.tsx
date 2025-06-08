"use client";

import { Book } from "@/types/book.types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import pl from "@/assets/placeholder.webp";
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

  const cover =
    typeof book.coverImageUrl === "string" && book.coverImageUrl
      ? book.coverImageUrl
      : pl;

  return (
    <ul
      className=" rounded-md  w-56 shadow-xl hover:scale-105 transition-all cursor-pointer "
      onClick={handleClick}
    >
      <li className="relative min-h-80">
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
      <ul className="p-4">
        <ul className="flex flex-col items-start">
          <li className="mb-2">{book.title}</li>
          <li className="p-1 rounded-md bg-slate-200 flex">{book.price} UAH</li>
        </ul>
      </ul>
    </ul>
  );
}
