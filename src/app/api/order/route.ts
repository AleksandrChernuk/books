/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, orderId, orderDescription, callbackUrl, redirectUrl } =
      body;

    const token = process.env.MONO_CHECKOUT_TOKEN;
    if (!token) {
      return NextResponse.json({ error: "No MONO token" }, { status: 500 });
    }

    const payload = {
      order_ref: orderId,
      amount: amount,
      count: 1,
      products: [
        {
          name: orderDescription,
          cnt: 1,
          price: amount,
        },
      ],
      redirectUrl,
      webHookUrl: callbackUrl,
      paymentType: "debit",
    };

    // const res = await fetch("https://api.monobank.ua/personal/checkout/order", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "X-Token": token,
    //   },
    //   body: JSON.stringify(payload),
    // });

    // const data = await res.json();
    // if (!res.ok) {
    //   return NextResponse.json({ error: data }, { status: res.status });
    // }

    return NextResponse.json(payload);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
