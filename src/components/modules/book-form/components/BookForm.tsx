"use client";

import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Book } from "@/types/book.types";
import { TextField } from "@/components/shared/TextField";
import useBookEditorForm from "../hooks/useBookEditorForm";
import FormatsArray from "./FormatsArray";
import FileUploadField from "@/components/shared/FileInput";
import { TextEditorField } from "@/components/shared/TextEditorField";
import { LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input copy";
import { Controller } from "react-hook-form";

type Props = {
  book?: Book;
  onAfterSubmit?: () => void;
};

export default function BookForm({ book }: Props) {
  const { form, onBookEditorSubmit, isLoading } = useBookEditorForm({ book });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onBookEditorSubmit)}
        className="space-y-8 "
      >
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3">
              <TextField name="title" label="Назва" />
            </div>
            <div>
              <Controller
                name="sorting"
                control={form.control}
                render={({ field, fieldState }) => {
                  return (
                    <FormItem className="grid gap-2 ">
                      <FormLabel htmlFor="title">Порядок сортування</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          id="sorting"
                          aria-invalid={!!fieldState.error}
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <TextField
              name="price"
              inputProps={{ type: "number" }}
              label="Ціна електронної кники"
            />
            <TextField
              name="price_paper"
              inputProps={{ type: "number" }}
              label="Ціна паперової кники"
            />
          </div>
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
          <Button variant="default" type="submit" disabled={isLoading}>
            {book?.id ? "Оновити" : "Додати"}
            {isLoading && <LoaderCircle size={16} className="animate-spin" />}
          </Button>
        </div>
      </form>
    </Form>
  );
}
