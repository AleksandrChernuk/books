export type IOrderBody = {
  bookId: string;
  format?: string;
  type: "ebook" | "paper";
  result_url: string;
  price: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  email?: string;
};

type CheckoutResponse = { url: string };

export async function checkout(body: IOrderBody): Promise<CheckoutResponse> {
  console.log(body);
  try {
    const response = await fetch(`/api/monopay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    console.log(response);
    if (!response.ok) {
      throw new Error("Checkout failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
