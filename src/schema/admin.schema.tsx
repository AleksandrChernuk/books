import { z } from "zod";

export const BookFormatClientSchema = z.object({
  id: z.string(),
  format: z.enum(["pdf", "epub", "fb2", "mobi"]),
  filename: z.string().min(1, "Додайте файл"),
  url: z.string().optional(),
  file: z.any().optional(),
});

export const BookFormSchema = z
  .object({
    title: z.string().min(1, "Вкажіть назву книги"),
    price: z.coerce.number().optional(), // временно необязательная, проверим вручную
    price_paper: z.coerce.number().optional(),
    fullDescription: z.string().min(1, "Опис обов'язковий"),
    paperFormat: z.boolean().optional(),
    formats: z.array(BookFormatClientSchema).optional(),
    coverImageUrl: z
      .any()
      .refine(
        (v) => v === undefined || typeof v === "string" || v instanceof File,
        "Має бути файлом або посиланням на файл"
      )
      .optional(),
  })
  .superRefine((data, ctx) => {
    const hasPaper = !!data.paperFormat;
    const hasFormats = Array.isArray(data.formats) && data.formats.length > 0;

    // 💸 Цена на бумажную версию обязательна, если выбран бумажный формат
    if (
      hasPaper &&
      (data.price_paper === undefined || isNaN(data.price_paper))
    ) {
      ctx.addIssue({
        path: ["price_paper"],
        code: z.ZodIssueCode.custom,
        message:
          "Ціна паперової версії обов’язкова при увімкненому форматі паперової книги",
      });
    }

    // 📁 Должен быть хотя бы формат или бумажная версия
    if (!hasPaper && !hasFormats) {
      ctx.addIssue({
        path: ["formats"],
        code: z.ZodIssueCode.custom,
        message:
          "Додайте хоча б один формат файлу або увімкніть паперову версію",
      });
    }

    // 💰 Цена на електронну версію обов’язкова, якщо є формати
    if (
      hasFormats &&
      (data.price === undefined || isNaN(data.price) || data.price <= 0)
    ) {
      ctx.addIssue({
        path: ["price"],
        code: z.ZodIssueCode.custom,
        message: "Ціна електронної версії обов’язкова при наявності файлів",
      });
    }
  });

export type BookFormData = z.infer<typeof BookFormSchema>;
