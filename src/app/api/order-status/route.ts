/* eslint-disable @typescript-eslint/ban-ts-comment */
// app/api/order-status/route.ts
import { NextRequest, NextResponse } from "next/server";
import { updateBookSaleStatus } from "@/actions/book-sale.actions";
// @ts-ignore
import * as Liqpay from "liqpay-sdk-nodejs";

const liqpay = new Liqpay(
  process.env.LIQPAY_PUBLIC_KEY,
  process.env.LIQPAY_PRIVATE_KEY
);

export async function GET(req: NextRequest) {
  const order_id = req.nextUrl.searchParams.get("order_id");
  if (!order_id)
    return NextResponse.json({ status: "not_found" }, { status: 400 });

  const requestData = {
    action: "status",
    version: "3",
    public_key: process.env.LIQPAY_PUBLIC_KEY,
    order_id,
  };
  const json = JSON.stringify(requestData);
  const data = Buffer.from(json).toString("base64");
  const signature = liqpay.str_to_sign(
    process.env.LIQPAY_PRIVATE_KEY + data + process.env.LIQPAY_PRIVATE_KEY
  );

  const response = await fetch("https://www.liqpay.ua/api/request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data, signature }),
  });

  const liqpayData = await response.json();
  const status = liqpayData.status;

  if (status === "success") {
    await updateBookSaleStatus(order_id, "paid");
  }

  return NextResponse.json({
    status,
    liqpay: liqpayData,
    bookDownloadUrl:
      status === "success" ? "https://your-domain.com/path/to/book.pdf" : null,
  });
}
