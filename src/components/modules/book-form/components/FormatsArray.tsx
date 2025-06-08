"use client";
import FileFormatManager from "@/components/modules/book-form/components/FileFormatManager";
import { BookFormData } from "@/schema/admin.schema";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function FormatsArray() {
  const form = useFormContext<BookFormData>();
  const { control, register, formState } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "formats",
  });

  return (
    <FileFormatManager
      control={control}
      register={register}
      fields={fields}
      append={append}
      remove={remove}
      errors={formState.errors}
    />
  );
}
