"use client";

import React, { useState, useTransition } from "react";
import { Book } from "@/types/book.types";
import { useRouter } from "next/navigation";
import { deleteBookWithFiles } from "@/actions/book.actions";
import Image from "next/image";
import { Button } from "../ui/button";
import { Loader, SquarePen, Trash } from "lucide-react";
import pl from "@/assets/placeholder.webp";
import { shimmer } from "@/helpers/shimmer";
import { toBase64 } from "@/helpers/toBase64";

type BookCardProps = {
  book: Book;
};

export default function BookCard({ book }: BookCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      await deleteBookWithFiles(book.id);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Не вдалося видалити книгу."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    startTransition(() => {
      router.push(`/books/edit/${book.id}`);
    });
  };

  const cover =
    typeof book.coverImageUrl === "string" && book.coverImageUrl
      ? book.coverImageUrl
      : pl;

  return (
    <ul className=" rounded-md  w-56 shadow-xl hover:scale-105 transition-all">
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

        <li className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader className="animate-spin" />
            ) : (
              <Trash size={24} className="stroke-red-500" />
            )}
          </Button>
          <Button onClick={handleEdit} disabled={isPending} variant="default">
            {isPending ? (
              <Loader className="animate-spin" />
            ) : (
              <SquarePen size={24} />
            )}
          </Button>
        </li>
      </ul>
      <div className="my-3 flex justify-center"></div>

      {error && (
        <p className="text-sm text-destructive text-right px-4 pb-2">{error}</p>
      )}
    </ul>
  );
}
