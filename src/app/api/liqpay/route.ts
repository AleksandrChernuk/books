/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import * as Liqpay from "liqpay-sdk-nodejs";
import { NextResponse } from "next/server";
import { IOrderBody } from "@/actions/liqpay.checkout.actions";
import { createBookSale } from "@/actions/book-sale.actions";
import { v4 as uuidv4 } from "uuid";

const liqpay = new Liqpay(
  process.env.LIQPAY_PUBLIC_KEY,
  process.env.LIQPAY_PRIVATE_KEY
);

export async function POST(req: Request) {
  const data = (await req.json()) as IOrderBody;

  const orderId = uuidv4();
  try {
    await createBookSale({
      bookId: data.book.id,
      format: data.format,
      orderId: orderId,
      status: "pending",
    });

    const params = liqpay.cnb_params({
      action: "pay",
      amount: data.book.price,
      currency: "UAH",
      description: `Оплата за книгу ${data.book.title}`,
      order_id: orderId,
      version: "3",
      result_url: `${data.result_url}/${orderId}`,
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
