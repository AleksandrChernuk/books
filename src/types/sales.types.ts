export type TSales = {
  bookId: string;
  bookName: string;
  format: string;
  orderId: string;
  price: number;
  status: "pending" | "paid" | "failed";
  type: "ebook" | "paper";
  invoiceId: string;
  email?: string;
};
