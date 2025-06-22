"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

import { DialogClose } from "@/components/ui/dialog";

import { Book } from "@/types/book.types";
import { checkout } from "@/actions/liqpay.checkout.actions";

const EbookSchema = z.object({
  type: z.enum(["ebook", "paper"]),
  format: z.enum(["pdf", "epub", "fb2", "mobi"]),
  email: z
    .string()
    .min(1, { message: "Обовʼязково вказати імʼя" })
    .email({ message: "Некоректна email адреса" }),
});

type Props = {
  book: Book;
  formats: Array<"pdf" | "epub" | "fb2" | "mobi">;
};

type FormValues = z.infer<typeof EbookSchema>;

export default function EbookForm({ book, formats }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(EbookSchema),
    defaultValues: {
      type: "ebook",
      format: formats[0],
      email: "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      if (!book.price || book.price <= 0) {
        throw new Error("Ціна книги не вказана або недійсна");
      }
      const response = await checkout({
        type: "ebook",
        bookId: book.id,
        format: data.format,
        price: book.price || 0,
        result_url: `https://prymost.com.ua/success`,
        email: data.email,
        bookName: book.title,
      });

      window.location.href = response.url;
    } catch (err) {
      console.error("Checkout error:", err);
      setError((err as Error).message || "Щось пішло не так");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={control}
          name="format"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Оберіть доступний формат</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ""}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Оберіть формат" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {formats.map((fmt) => (
                      <SelectItem key={fmt} value={fmt}>
                        {fmt.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Вкажіть email</FormLabel>
              <FormControl>
                <Input
                  placeholder="you@example.com"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <p className="text-xs text-muted-foreground">
                На цю адресу буде надіслано електронну версію книги після
                оплати.
              </p>
            </FormItem>
          )}
        />

        {error && <p className="text-sm text-red-500 my-4 pt-2">{error}</p>}
        <div className="flex items-center gap-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="w-1/2"
              onClick={() => form.reset()}
            >
              Скасувати
            </Button>
          </DialogClose>
          <Button type="submit" disabled={loading} className="w-1/2">
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Завантаження...
              </span>
            ) : (
              "Придбати"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
