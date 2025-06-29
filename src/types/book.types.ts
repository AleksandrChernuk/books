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
  price?: number;
  price_paper?: number;
  fullDescription: string;
  formats: BookFormat[];
  coverImageUrl?: string;
  createdAt: string;
  updatedAt: string;
  paperFormat?: boolean;
  sorting: number;
};

export type BookFormatClientData = {
  id: string;
  format: "pdf" | "epub" | "fb2" | "mobi";
  filename: string;
  url?: string;
  file?: File;
};
