export type IOrderBody = {
  bookId: string;
  format: string;
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
  const normalizeData = {
    bookId: body.bookId,
    format: body.format,
    type: body.type,
    result_url: body.result_url,
    price: body.price,
    ...(body.firstName && { firstName: body.firstName }),
    ...(body.lastName && { lastName: body.lastName }),
    ...(body.phone && { phone: body.phone }),
    ...(body.address && { address: body.address }),
    ...(body.email && { email: body.email }),
  };
  try {
    const response = await fetch(`/api/monopay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(normalizeData),
    });

    if (!response.ok) {
      throw new Error("Checkout failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
