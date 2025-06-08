export interface BookFormat {
  id: string;
  format: "pdf" | "epub" | "fb2" | "mobi";
  filename: string;
  url: string;
}

export type Book = {
  id: string;
  title: string;
  slug: string;
  price: number;
  fullDescription: string;
  formats: BookFormat[];
  coverImageUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type BookFormatClientData = {
  id: string;
  format: "pdf" | "epub" | "fb2" | "mobi";
  filename: string;
  url?: string;
  file?: File;
};
