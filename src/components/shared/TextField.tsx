import React from "react";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";

type Props = {
  name: string;
  label?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
  maxLength?: number;
  inputProps?: React.ComponentProps<typeof Input>;
};

export const TextField = ({
  name,
  label,
  disabled,
  autoFocus,
  placeholder,
  maxLength,
  inputProps,
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
            <Input
              id={name}
              {...field}
              autoFocus={autoFocus}
              placeholder={placeholder}
              disabled={disabled}
              maxLength={maxLength}
              {...inputProps}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
