/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Некоректний email" }),
  password: z
    .string()
    .min(6, { message: "Пароль має містити мінімум 6 символів" })
    .regex(/[a-zA-Z0-9]/, {
      message: "Пароль має бути латинськими літерами та цифрами",
    }),
});

export default function SignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast.success("Ви успішно увійшли!");
      router.replace("/admin");
    } catch (error: any) {
      let message = "Не вдалося увійти. Спробуйте ще раз.";
      if (error.code === "auth/user-not-found") {
        message = "Користувача з таким email не знайдено.";
      } else if (error.code === "auth/wrong-password") {
        message = "Неправильний пароль.";
      } else if (error.code === "auth/too-many-requests") {
        message = "Забагато спроб входу. Спробуйте пізніше.";
      }
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-[50vh] h-full w-full items-center justify-center px-4 ">
      <Card className="mx-auto min-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Вхід</CardTitle>
          <CardDescription>
            Введіть свій email і пароль для входу в акаунт.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="johndoe@mail.com"
                          type="email"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="password">Пароль</FormLabel>
                      <FormControl>
                        <PasswordInput
                          id="password"
                          placeholder="******"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin w-4 h-4" />{" "}
                      Завантаження...
                    </span>
                  ) : (
                    "Увійти"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
