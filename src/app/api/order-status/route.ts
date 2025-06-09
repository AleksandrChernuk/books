/* eslint-disable @typescript-eslint/ban-ts-comment */
// app/api/order-status/route.ts
import { NextRequest, NextResponse } from "next/server";
// @ts-ignore
import * as Liqpay from "liqpay-sdk-nodejs";
import { updateBookSaleStatus } from "@/actions/book-sale.actions";

export interface PaymentData {
  action: string;
  payment_id: number;
  status: string;
  version: number;
  type: string;
  paytype: string;
  public_key: string;
  acq_id: number;
  order_id: string;
  liqpay_order_id: string;
  description: string;
  sender_phone: string;
  sender_card_mask2: string;
  sender_card_bank: string;
  sender_card_type: string;
  sender_card_country: number;
  ip: string;
  card_token: string;
  info: string;
  amount: number;
  currency: string;
  sender_commission: number;
  receiver_commission: number;
  agent_commission: number;
  amount_debit: number;
  amount_credit: number;
  commission_debit: number;
  commission_credit: number;
  currency_debit: string;
  currency_credit: string;
  sender_bonus: number;
  amount_bonus: number;
  bonus_type: string;
  bonus_procent: number;
  authcode_debit: string;
  authcode_credit: string;
  rrn_debit: string;
  rrn_credit: string;
  mpi_eci: string;
  is_3ds: boolean;
  create_date: number;
  end_date: number;
  moment_part: boolean;
  transaction_id: number;
}

const liqpay = new Liqpay(
  process.env.LIQPAY_PUBLIC_KEY,
  process.env.LIQPAY_PRIVATE_KEY
);

export async function GET(req: NextRequest) {
  const order_id = req.nextUrl.searchParams.get("order_id");
  if (!order_id)
    return NextResponse.json({ status: "not_found" }, { status: 400 });

  const res = await liqpay.api(
    "request",
    {
      action: "status",
      version: "3",
      order_id: `${order_id}`,
    },
    function (data: PaymentData) {
      return data;
    }
  );

  if (res.status === "success") {
    try {
      await updateBookSaleStatus(order_id, "paid");
    } catch (error) {
      console.log(error);
      return NextResponse.json({ status: "error" }, { status: 400 });
    }
  }

  if (res.status !== "success") {
    try {
      await updateBookSaleStatus(order_id, "failed");
    } catch (error) {
      console.log(error);
      return NextResponse.json({ status: "error" }, { status: 400 });
    }
  }

  return NextResponse.json({
    res,
  });
}
