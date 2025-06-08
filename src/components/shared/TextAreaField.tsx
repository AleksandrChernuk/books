import React from "react";
import { FormField, FormItem, FormLabel, FormControl } from "../ui/form";
import { useFormContext } from "react-hook-form";
import { Textarea } from "../ui/textarea";

type Props = {
  name: string;
  label?: string;
  maxLength?: number;
  rows?: number;
  disabled?: boolean;
  placeholder?: string;
};

export const TextAreaField = ({
  name,
  label,
  maxLength,
  rows = 4,
  disabled,
  placeholder,
}: Props) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="grid gap-2 w-full">
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <FormControl>
            <Textarea
              {...field}
              id={name}
              maxLength={maxLength}
              rows={rows}
              disabled={disabled}
              placeholder={placeholder}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
