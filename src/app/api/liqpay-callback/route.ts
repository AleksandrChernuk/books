// app/api/liqpay-callback/route.ts
import { NextRequest, NextResponse } from "next/server";
// import { updateBookSaleStatus } from "@/actions/book-sale.actions";

export async function POST(request: NextRequest) {
  console.log(request);
  // const { data } = await request.json();

  // if (!data) {
  //   return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  // }

  // const decoded = JSON.parse(Buffer.from(data, "base64").toString());
  // const orderId = decoded.order_id;
  // const status =
  //   decoded.status === "success" || decoded.status === "sandbox"
  //     ? "paid"
  //     : "failed";

  // await updateBookSaleStatus(orderId, status);

  return NextResponse.json({ ok: true });
}
