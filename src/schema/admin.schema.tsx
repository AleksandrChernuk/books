import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email({ message: "Некоректна електронна пошта" }),
  password: z
    .string()
    .min(6, { message: "Пароль має містити щонайменше 6 символів" }),
});

export const BookFormatClientSchema = z.object({
  id: z.string(),
  format: z.enum(["pdf", "epub", "fb2", "mobi"]),
  filename: z.string().min(1, "Дойте файл"),
  url: z.string().optional(),
  file: z.any().optional(),
});

export const BookFormSchema = z.object({
  title: z.string().min(1, "Вкажіть назву книги"),
  price: z.coerce.number().min(1, "Ціна не може дорівнювати 0"),
  fullDescription: z.string().min(1, "Опис обов'язковий"),
  formats: z
    .array(BookFormatClientSchema)
    .min(1, "Додайте хоча б один формат файлу"),
  coverImageUrl: z
    .any()
    .refine(
      (v) => v === undefined || typeof v === "string" || v instanceof File,
      "Має бути файлом або посиланням на файл"
    )
    .optional(),
});

export type BookFormData = z.infer<typeof BookFormSchema>;
