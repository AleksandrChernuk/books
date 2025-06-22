"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import parsePhoneNumberFromString from "libphonenumber-js";

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

import { Loader2 } from "lucide-react";

import { DialogClose } from "@/components/ui/dialog";

import { Book } from "@/types/book.types";
import { checkout } from "@/actions/liqpay.checkout.actions";
import { PhoneInput } from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea";

const paperSchema = z.object({
  type: z.literal("paper"),
  firstName: z.string().min(1, { message: "Обовʼязково вказати імʼя" }),
  lastName: z.string().min(1, { message: "Обовʼязково вказати прізвище" }),
  phone: z
    .string()
    .min(8, { message: "required" })
    .refine(
      (value) => {
        const phoneNumber = parsePhoneNumberFromString(value);
        return phoneNumber ? phoneNumber.isValid() : false;
      },
      { message: "Обовʼязково вказати телефон" }
    ),
  email: z
    .string()
    .min(1, { message: "Обовʼязково вказати імʼя" })
    .email({ message: "Некоректна email адреса" }),
  address: z.string().min(5, { message: "Обовʼязково вказати адресу" }),
});

type FormValues = z.infer<typeof paperSchema>;

type CheckoutFormProps = {
  book: Book;
};
export default function PaperForm({ book }: CheckoutFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(paperSchema),
    defaultValues: {
      type: "paper",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      email: "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);

      if (!book.price_paper || book.price_paper <= 0) {
        throw new Error("Ціна книги не вказана або недійсна");
      }

      const commonData = {
        bookId: book.id,
        type: data.type,
        result_url: `https://prymost.com.ua/success`,
        price: book.price_paper || 0,
      };

      const response = await checkout({
        ...commonData,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        address: data.address,
        bookName: book.title,
        email: data.email,
      });

      window.location.href = response.url;
    } catch (err) {
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
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Імʼя</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ваше імʼя"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Прізвище</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ваше прізвище"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Телефон</FormLabel>
              <FormControl>
                <PhoneInput {...field} defaultCountry="UA" />
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
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Адреса та номер відділення Нової пошти</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Будь ласка, вкажіть номер та адресу відділення Нової пошти"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
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
