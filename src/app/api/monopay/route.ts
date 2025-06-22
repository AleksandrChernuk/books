/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { NextResponse } from "next/server";
import { IOrderBody } from "@/actions/liqpay.checkout.actions";
import { createBookSale } from "@/actions/book-sale.actions";
import https from "https";
import { nanoid } from "nanoid";

const key = process.env.MONO_KEY;

export async function POST(req: Request) {
  const data = (await req.json()) as IOrderBody;
  const orderId = nanoid();

  try {
    const orderData = JSON.stringify({
      amount: data.price * 100,
      ccy: 980,
      redirectUrl: `${data.result_url}?orderId=${orderId}`,
      webHookUrl:
        "https://us-central1-books-30c50.cloudfunctions.net/monoWebhook",
      validity: 3600,
      paymentType: "debit",
    });

    const options = {
      hostname: "api.monobank.ua",
      path: "/api/merchant/invoice/create",
      method: "POST",
      headers: {
        "X-Token": key!,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(orderData),
      },
    };

    const invoiceResponse = await new Promise<{
      invoiceUrl: string;
      invoiceId: string;
    }>((resolve, reject) => {
      const reqMono = https.request(options, (res) => {
        let body = "";
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => {
          try {
            const parsed = JSON.parse(body);
            if (parsed.pageUrl && parsed.invoiceId) {
              resolve({
                invoiceUrl: parsed.pageUrl,
                invoiceId: parsed.invoiceId,
              });
            } else {
              reject(new Error("invoiceId or pageUrl not found in response"));
            }
          } catch (err) {
            reject(err);
          }
        });
      });

      reqMono.on("error", (err) => {
        reject(err);
      });

      reqMono.write(orderData);
      reqMono.end();
    });

    // Сохраняем заказ с invoiceId
    await createBookSale({
      orderId,
      bookId: data.bookId,
      type: data.type,
      price: data.price,
      status: "pending",
      invoiceId: invoiceResponse.invoiceId,
      bookName: data.bookName,

      ...(data.format && { format: data.format }),
      ...(data.firstName && { firstName: data.firstName }),
      ...(data.lastName && { lastName: data.lastName }),
      ...(data.phone && { phone: data.phone }),
      ...(data.address && { address: data.address }),
      ...(data.email && { email: data.email }),
    });

    return NextResponse.json(
      { url: invoiceResponse.invoiceUrl },
      { status: 200 }
    );
  } catch (error) {
    console.error("Monobank error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
