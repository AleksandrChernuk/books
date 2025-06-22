"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "@/lib/firebase";

const contactSchema = z.object({
  name: z.string().min(1, { message: "Обовʼязково вказати імʼя" }),
  email: z
    .string()
    .min(1, { message: "Обовʼязково вказати імʼя" })
    .email({ message: "Некоректна email адреса" }),
  massege: z.string().min(5, { message: "Обовʼязково вказати текст" }),
});
type FormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      massege: "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    console.log("onSubmit");
    try {
      await addDoc(collection(firestore, "contacts"), {
        ...data,
        createdAt: new Date(),
      });

      toast.success("Дякуємо! Ваше повідомлення надіслано.");
    } catch (error) {
      toast.error("Не вдалося надіслати повідомлення.");
      setError(error as string);
    } finally {
      setLoading(false);
      form.reset();
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{`Зворотний зв'язок`}</CardTitle>
        <CardDescription>Напишіть нам своє повідомлення нижче.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={control}
              name="name"
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
              name="massege"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Адреса доставки</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Текст повідомлення"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {error && <p className="text-sm text-red-500 my-4 pt-2">{error}</p>}{" "}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Завантаження...
                </span>
              ) : (
                "Надіслати"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
