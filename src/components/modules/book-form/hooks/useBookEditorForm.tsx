"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { Book, BookFormat } from "@/types/book.types";
import { useRouter } from "next/navigation";
import { createBook, updateBook } from "@/actions/book.actions";
import { toast } from "sonner";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { deleteFileFromStorage } from "@/lib/firebase-upload";
import slugify from "slugify";
import { useEffect, useRef, useState } from "react";
import { BookFormData, BookFormSchema } from "@/schema/admin.schema";
import { nanoid } from "nanoid";

type Props = { book?: Book };

export default function useBookEditorForm({ book }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const prevFormats = useRef<BookFormat[]>(book?.formats ?? []);

  const defaultValues: BookFormData = book
    ? {
        title: book.title,
        price: book.price,
        price_paper: book.price_paper,
        fullDescription: book.fullDescription,
        formats: book.formats.map((f) => ({ ...f, file: undefined })),
        paperFormat: book.paperFormat || false,
        coverImageUrl: book.coverImageUrl ?? "",
      }
    : {
        title: "",
        price: 0,
        price_paper: 0,
        fullDescription: "<p></p>",
        paperFormat: false,
        formats: [
          { id: nanoid(), format: "pdf", filename: "", file: undefined },
        ],
        coverImageUrl: "",
      };

  const form = useForm<BookFormData>({
    resolver: zodResolver(BookFormSchema),
    defaultValues,
  });
  useEffect(() => {
    if (book) {
      form.reset(defaultValues);
      prevFormats.current = book.formats;
    } else {
      form.reset(defaultValues);
      prevFormats.current = [];
    }
    // eslint-disable-next-line
  }, [book]);
  const onBookEditorSubmit = async (values: BookFormData) => {
    setIsLoading(true);

    try {
      const storage = getStorage();
      const isEdit = Boolean(book?.id);
      const newId = isEdit ? book!.id : uuidv4();

      // ✅ Проверка: если не бумажная книга, то должен быть хотя бы один формат
      if (
        !values.paperFormat &&
        (!values.formats || values.formats.length === 0)
      ) {
        toast.error("Додайте хоча б один електронний формат книги.");
        return;
      }

      const safeFormats = values.formats ?? [];

      // ✅ Удаление старых форматов, если редактируем
      if (isEdit) {
        const newIds = new Set(safeFormats.map((f) => f.id));
        for (const old of prevFormats.current) {
          if (!newIds.has(old.id) && old.url) {
            await deleteFileFromStorage(old.url);
          }
        }
      }

      // ✅ Загрузка и сбор новых форматов
      const formats: BookFormat[] = await Promise.all(
        safeFormats.map(async (f) => {
          if (f.file instanceof File) {
            const prev = book?.formats.find((x) => x.id === f.id);
            if (prev?.url) await deleteFileFromStorage(prev.url);

            const ext = f.file.name.split(".").pop()!;
            const ref = storageRef(
              storage,
              `books/${newId}-${f.format}.${ext}`
            );
            await uploadBytes(ref, f.file);
            const url = await getDownloadURL(ref);
            return { id: f.id, format: f.format, filename: f.file.name, url };
          }

          return {
            id: f.id,
            format: f.format,
            filename: f.filename,
            url: f.url!,
          };
        })
      );

      // ✅ Обработка обложки
      let coverUrl = "";

      if (!values.coverImageUrl) {
        if (book?.coverImageUrl) {
          await deleteFileFromStorage(book.coverImageUrl);
        }
      } else if (values.coverImageUrl instanceof File) {
        if (book?.coverImageUrl) {
          await deleteFileFromStorage(book.coverImageUrl);
        }
        const ext = values.coverImageUrl.name.split(".").pop() || "jpg";
        const ref = storageRef(storage, `book-covers/${newId}.${ext}`);
        await uploadBytes(ref, values.coverImageUrl);
        coverUrl = await getDownloadURL(ref);
      } else if (typeof values.coverImageUrl === "string") {
        coverUrl = values.coverImageUrl;
      }

      const slug = slugify(values.title, { lower: true, strict: true });

      const payload = {
        id: newId,
        title: values.title,
        slug,
        price: values.price,
        price_paper: values.price_paper,
        fullDescription: values.fullDescription,
        formats,
        paperFormat: values.paperFormat,
        coverImageUrl: coverUrl,
      };

      if (isEdit) {
        await updateBook(newId, payload);
        toast.success("Книгу оновлено!");
      } else {
        await createBook(payload);
        toast.success("Книгу створено!");
      }

      router.push("/admin/books-edit");
    } catch (err) {
      console.error(err);
      toast.error("Помилка при збереженні книги.");
    } finally {
      setIsLoading(false);
    }
  };

  return { form, isLoading, onBookEditorSubmit };
}
