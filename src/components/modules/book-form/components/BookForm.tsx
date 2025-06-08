"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Book } from "@/types/book.types";
import { TextField } from "@/components/shared/TextField";
import useBookEditorForm from "../hooks/useBookEditorForm";
import FormatsArray from "./FormatsArray";
import FileUploadField from "@/components/shared/FileInput";
import { TextEditorField } from "@/components/shared/TextEditorField";
import { LoaderCircle } from "lucide-react";

type Props = {
  book?: Book;
  onAfterSubmit?: () => void;
};

export default function BookForm({ book }: Props) {
  const { form, onBookEditorSubmit, isLoading } = useBookEditorForm({ book });

  if (isLoading) {
    return (
      <div className="py-5 flex items-center justify-center min-h-dvh">
        <LoaderCircle size={40} className="animate-spin" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onBookEditorSubmit)}
        className="space-y-8 "
      >
        <div className="flex gap-4">
          <TextField name="title" label="Назва" />
          <TextField
            name="price"
            inputProps={{ type: "number" }}
            label="Ціна"
          />
        </div>
        <div className="grid grid-cols-2">
          <div>
            <FileUploadField name="coverImageUrl" />
          </div>
          <div>
            <FormatsArray />
          </div>
        </div>

        <TextEditorField name="fullDescription" label="Опис" />

        <div className="flex justify-end">
          <Button variant="default" disabled={isLoading}>
            {book?.id ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
