"use client";

import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import MinimalTiptapThree from "@/components/modules/minimal-tiptap/minimal-tiptap-three";
import { useForm, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { createPost, updatePost } from "@/actions/blog.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BlogPost } from "@/types/post.type";

type FormValues = {
  title: string;
  content: string;
  description: string;
};

type BlogFormProps = {
  initialData?: BlogPost;
  id?: string;
  typSubmit: "create" | "update";
  buttonText?: string;
};

export default function BlogForm({
  initialData,
  typSubmit,
  id,
  buttonText = "Зберегти",
}: BlogFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const router = useRouter();

  const form = useForm<FormValues>({
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      content: initialData?.content || "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

 
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      if (typSubmit === "create") {
        await createPost(data);
      } else if (typSubmit === "update" && id) {
        await updatePost(id, data);
      }

      router.push("/blog");
    } catch (error) {
      const message =
        typeof error === "string"
          ? error
          : error instanceof Error
          ? error.message
          : "Сталася помилка при збереженні.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        autoComplete="off"
      >
        <Controller
          name="title"
          control={control}
          render={({ field }) => {
            const errorId = "title-error";
            return (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="title">Заголовок</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="title"
                    aria-invalid={!!errors.title}
                    aria-describedby={errors.title ? errorId : undefined}
                  />
                </FormControl>
                <FormMessage id={errorId} />
              </FormItem>
            );
          }}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => {
            const errorId = "description-error";
            return (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="description">Короткий опис</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    id="description"
                    maxLength={300}
                    aria-invalid={!!errors.description}
                    aria-describedby={errors.description ? errorId : undefined}
                  />
                </FormControl>
                <FormMessage id={errorId} />
              </FormItem>
            );
          }}
        />

        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel htmlFor="content">Текст</FormLabel>
              <FormControl>
                <MinimalTiptapThree
                  value={field.value}
                  immediatelyRender={false}
                  onChange={(val) => {
                    field.onChange(val);
                  }}
                  editorClassName="focus:outline-none px-5 py-4 h-full"
                  className={cn("h-full min-h-56 w-full rounded-xl")}
                  editorContentClassName="overflow-auto h-full"
                />
              </FormControl>
            </FormItem>
          )}
        />

        {error && (
          <p className="text-sm text-destructive text-right">{error}</p>
        )}

        <div className="flex justify-end mt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Збереження..." : buttonText}
          </Button>
        </div>
      </form>
    </Form>
  );
}
