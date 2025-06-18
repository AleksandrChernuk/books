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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { Book } from "@/types/book.types";
import { checkout } from "@/actions/liqpay.checkout.actions";
import { PhoneInput } from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea";

const baseSchema = z.object({
  type: z.enum(["ebook", "paper"]),
  format: z.enum(["pdf", "epub", "fb2", "mobi"]),
});

const ebookSchema = baseSchema.extend({
  type: z.literal("ebook"),
  email: z
    .string()
    .min(1, { message: "Обовʼязково вказати імʼя" })
    .email({ message: "Некоректна email адреса" }),
});

const paperSchema = baseSchema.extend({
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
  address: z.string().min(5, { message: "Обовʼязково вказати адресу" }),
});

const formSchema = z.discriminatedUnion("type", [ebookSchema, paperSchema]);

type FormValues = z.infer<typeof formSchema>;

type CheckoutFormProps = {
  book: Book;
  formats: Array<"pdf" | "epub" | "fb2" | "mobi">;
};
export default function CheckoutForm({ book, formats }: CheckoutFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: book.paperFormat
      ? {
          type: "paper",
          format: formats[0],
          firstName: "",
          lastName: "",
          phone: "",
          address: "",
        }
      : {
          type: "ebook",
          format: formats[0],
          email: "",
        },
  });

  const { handleSubmit, control, watch, setValue } = form;
  const selectedType = watch("type");

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      const price =
        data.type === "ebook" ? book.price : book.price_paper || book.price;

      if (!price || price <= 0) {
        throw new Error("Ціна книги не вказана або недійсна");
      }

      const commonData = {
        bookId: book.id,
        format: data.format,
        type: data.type,
        result_url: `http://localhost:3000/success`,
        price,
      };

      let response;

      if (data.type === "ebook") {
        response = await checkout({
          ...commonData,
          email: data.email,
        });
      } else {
        response = await checkout({
          ...commonData,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          address: data.address,
        });
      }

      window.location.href = response.url;
    } catch (err) {
      console.error("Checkout error:", err);
      setError((err as Error).message || "Щось пішло не так");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4 border border-slate-200 rounded-2xl">
      <ul className="flex gap-4 mb-4">
        {book.price !== undefined && book.price > 0 && (
          <li className="p-1 rounded-md bg-slate-200 ">
            <p className="mr-4 text-xs">Електронна</p>
            <p>{book.price} UAH</p>
          </li>
        )}
        {book.price_paper !== undefined && book.price_paper > 0 && (
          <li className="p-1 rounded-md bg-slate-200">
            <p className="mr-4 text-xs">Паперова</p>
            <p>{book.price_paper} UAH</p>
          </li>
        )}
      </ul>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" className="w-full">
            Придбати
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Оформлення замовлення</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Tabs
                value={selectedType}
                onValueChange={(val) =>
                  setValue("type", val as "ebook" | "paper")
                }
              >
                <TabsList className="w-full">
                  {book.price && book.price > 0 ? (
                    <TabsTrigger value="ebook">Електронна</TabsTrigger>
                  ) : null}

                  {book.price_paper && book.price_paper > 0 ? (
                    <TabsTrigger value="paper">Паперова</TabsTrigger>
                  ) : null}
                </TabsList>

                {/* 📘 Електронна */}
                <TabsContent value="ebook" className="mt-4 flex flex-col gap-4">
                  <FormField
                    control={control}
                    name="format"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Оберіть доступний формат</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
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
                          На цю адресу буде надіслано електронну версію книги
                          після оплати.
                        </p>
                      </FormItem>
                    )}
                  />
                </TabsContent>

                {book.paperFormat && (
                  <TabsContent value="paper" className="flex flex-col gap-4">
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
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Адреса доставки</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Повна адреса доставки або відділення Нової пошти"
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                )}
              </Tabs>
              {error && (
                <p className="text-sm text-red-500 my-4 pt-2">{error}</p>
              )}
              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button variant="outline">Скасувати</Button>
                </DialogClose>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />{" "}
                      Завантаження...
                    </span>
                  ) : (
                    "Придбати"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
