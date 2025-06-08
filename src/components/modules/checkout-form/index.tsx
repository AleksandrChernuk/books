"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { allFormats } from "@/constans/allFormats";
import { Book } from "@/types/book.types";
import { checkout } from "@/actions/liqpay.checkout.actions";

type FormValues = { format: string };
type BlogFormProps = { book: Book };

export default function CheckoutForm({ book }: BlogFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    defaultValues: { format: "pdf" },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (formData: FormValues) => {
    try {
      setLoading(true);
      const { data, signature } = await checkout({
        book: book,
        format: formData.format,
        result_url: `http://localhost:3000/books/${book.slug}`,
        server_url: `http://localhost:3000/api/liqpay-callback`,
      });

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://www.liqpay.ua/api/3/checkout";
      form.style.display = "none";

      const addInput = (name: string, value: string) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        form.appendChild(input);
      };

      addInput("data", data);
      addInput("signature", signature);

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      setLoading(false);

      setError(error as string);
    } finally {
      setLoading(false);
    }
  };
  console.log(error);
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        autoComplete="off"
      >
        <div className="flex items-center gap-4">
          <p>{book.price} UAH</p>{" "}
          <Button type="submit" disabled={loading}>
            {loading ? "..." : "Придбати"}
          </Button>
        </div>
        <Controller
          name="format"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Формат книги</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Оберіть формат" />
                  </SelectTrigger>
                  <SelectContent>
                    {allFormats.map((e) => (
                      <SelectItem key={e} value={e}>
                        {e}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
