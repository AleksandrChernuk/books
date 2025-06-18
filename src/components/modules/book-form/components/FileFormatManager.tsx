import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Trash2, PlusCircle, Paperclip } from "lucide-react";
import {
  type Control,
  type FieldArrayWithId,
  type UseFieldArrayAppend,
  type UseFieldArrayRemove,
  type UseFormRegister,
  type FieldErrors,
  useFormContext,
} from "react-hook-form";
import { BookFormData } from "@/schema/admin.schema";
import { nanoid } from "nanoid";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface FileFormatManagerProps {
  control: Control<BookFormData>;
  register: UseFormRegister<BookFormData>;
  fields: FieldArrayWithId<BookFormData, "formats", "id">[];
  append: UseFieldArrayAppend<BookFormData, "formats">;
  remove: UseFieldArrayRemove;
  errors: FieldErrors<BookFormData>;
}

export default function FileFormatManager({
  control,
  fields,
  append,
  remove,
  errors,
}: FileFormatManagerProps) {
  const allFormats = ["pdf", "epub", "fb2", "mobi"] as const;
  const { setValue } = useFormContext();

  const usedFormats = fields.map((f) => f.format);

  const availableFormats = allFormats.filter((f) => !usedFormats.includes(f));

  const addFormat = () => {
    append({
      id: nanoid(),
      format: availableFormats[0],
      filename: "",
      file: undefined,
    });
  };

  return (
    <div className="flex flex-col space-y-2">
      <span className="text-lg font-medium">Формати</span>
      <div>
        <FormField
          control={control}
          name="paperFormat"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="paperFormat"
                    defaultChecked
                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                  />
                  <div className="grid gap-1.5 font-normal">
                    <p className="text-sm leading-none font-medium">
                      Додати паперову версію книги
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Дозволити покупцям замовляти друкований варіант із
                      доставкою
                    </p>
                  </div>
                </Label>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {fields.map((item, index) => (
        <div
          key={item.id}
          className="flex flex-col items-start gap-4 p-2 border rounded-md bg-card"
        >
          <div className="flex items-start justify-between w-full">
            <div>
              <FormField
                control={control}
                name={`formats.${index}.format`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <span className="text-md font-bold p-1 flex items-center">
                        .{field.value}
                      </span>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => remove(index)}
                className="flex-shrink-0 mt-2 md:mt-0"
                aria-label="Remove format"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FormField
              control={control}
              name={`formats.${index}.file`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <Input
                        id={`formats.${index}.file`}
                        type="file"
                        accept={`.${item.format}`}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file ?? undefined);
                          setValue(`formats.${index}.filename`, file?.name);
                        }}
                      />{" "}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`formats.${index}.filename`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <span className="text-xs p-1 flex items-center">
                      {field.value ? (
                        <div className="flex items-center">
                          <Paperclip size={14} />
                          {field.value}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">
                          Назва не вказана
                        </span>
                      )}
                    </span>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addFormat}
        className="mt-2"
        disabled={availableFormats.length === 0}
      >
        <PlusCircle className="mr-2 h-4 w-4" /> Додати формат
      </Button>
      {errors.formats && typeof errors.formats.message === "string" && (
        <p className="text-sm text-destructive mt-1">
          {errors.formats.message}
        </p>
      )}
    </div>
  );
}
