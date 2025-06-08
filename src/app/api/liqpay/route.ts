/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import * as Liqpay from "liqpay-sdk-nodejs";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { IOrderBody } from "@/actions/liqpay.checkout.actions";
import { createBookSale } from "@/actions/book-sale.actions";

const liqpay = new Liqpay(
  process.env.LIQPAY_PUBLIC_KEY,
  process.env.LIQPAY_PRIVATE_KEY
);

export async function POST(req: Request) {
  const id = randomUUID();

  console.log(req);
  try {
    const data = (await req.json()) as IOrderBody;

    await createBookSale({
      bookId: data.book.id,
      format: data.format,
      orderId: id,
      status: "pending",
    });

    console.log(data);

    const params = liqpay.cnb_params({
      action: "pay",
      amount: data.book.price,
      currency: "UAH",
      description: "Оплата за квитки",
      order_id: id,
      version: "3",
      result_url: data.result_url,
      server_url: data.server_url,
    });

    const liqpaydata = Buffer.from(JSON.stringify(params)).toString("base64");
    const signature = liqpay.str_to_sign(
      process.env.LIQPAY_PRIVATE_KEY +
        liqpaydata +
        process.env.LIQPAY_PRIVATE_KEY
    );
    return NextResponse.json({ data: liqpaydata, signature });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
