import { Book } from "@/types/book.types";

export type IOrderBody = {
  book: Book;
  format: string;
  result_url: string;
};

export async function checkout(body: IOrderBody) {
  try {
    const response = await fetch(`/api/liqpay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Checkout failed");
    }
    const data = await response.json();
    return data as { data: string; signature: string };
  } catch (error) {
    throw error;
  }
}
