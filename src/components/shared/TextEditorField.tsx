import React from "react";
import { FormField, FormItem, FormLabel, FormControl } from "../ui/form";
import { useFormContext } from "react-hook-form";
import MinimalTiptapThree from "../modules/minimal-tiptap/minimal-tiptap-three";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  label?: string;
  maxLength?: number;
  rows?: number;
  disabled?: boolean;
  placeholder?: string;
};

export const TextEditorField = ({ name, label }: Props) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="grid gap-2">
          {label && <FormLabel htmlFor="content">{label}</FormLabel>}
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
  );
};
