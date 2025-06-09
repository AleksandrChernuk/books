export type TSales = {
  bookId: string;
  format: string;
  orderId: string;
  userId?: string | null;
  status?: "pending" | "paid" | "failed";
};
