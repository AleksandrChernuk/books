/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { NextResponse } from "next/server";
import { IOrderBody } from "@/actions/liqpay.checkout.actions";
import { createBookSale } from "@/actions/book-sale.actions";
import { v4 as uuidv4 } from "uuid";
import https from "https";

const key = process.env.MONO_KEY;

export async function POST(req: Request) {
  const data = (await req.json()) as IOrderBody;
  const orderId = uuidv4();

  try {
    await createBookSale({
      type: data.type,
      bookId: data.bookId,
      format: data.format!,
      orderId,
      status: "pending",
      price: data.price,
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      phone: data.phone || "",
      address: data.address || "",
      email: data.email || "",
    });
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

    const invoiceResponse = await new Promise<{ invoiceUrl: string }>(
      (resolve, reject) => {
        const reqMono = https.request(options, (res) => {
          let body = "";
          res.on("data", (chunk) => {
            body += chunk;
          });
          res.on("end", () => {
            try {
              const parsed = JSON.parse(body);
              console.log("parsed", parsed);
              if (parsed.pageUrl) {
                resolve({ invoiceUrl: parsed.pageUrl });
              } else {
                reject(new Error("pageUrl not found in response"));
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
      }
    );

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
