// app/api/invoice-status/route.ts
import { NextRequest, NextResponse } from "next/server";
import https from "https";
import { bookSaleStatus } from "@/actions/book-sale.actions";
import { getBookById } from "@/actions/book.actions";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const invoiceId = searchParams.get("invoiceId");

  if (!invoiceId) {
    return NextResponse.json({ error: "Missing invoiceId" }, { status: 400 });
  }

  const token = process.env.MONO_KEY;
  if (!token) {
    return NextResponse.json({ error: "Missing MONO_KEY" }, { status: 500 });
  }

  const sale = await bookSaleStatus(invoiceId);

  if (!sale?.invoiceId) {
    return NextResponse.json({ error: "Sale not found" }, { status: 404 });
  }

  // Запит статусу до API Монобанку
  const options = {
    hostname: "api.monobank.ua",
    path: `/api/merchant/invoice/status?invoiceId=${sale.invoiceId}`,
    method: "GET",
    headers: { "X-Token": token },
  };

  try {
    const status = await new Promise<string | null>((resolve, reject) => {
      const reqMono = https.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            resolve(json.status || null);
          } catch (err) {
            reject(err);
          }
        });
      });

      reqMono.on("error", (err) => reject(err));
      reqMono.end();
    });

    let bookUrl: string | null = null;

    if (status === "success" && sale.type === "ebook") {
      const book = await getBookById(sale.bookId);

      const formatData = book?.formats.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (f: any) => f.format === sale.format
      );
      if (formatData?.url) {
        bookUrl = formatData.url;
      }
    }

    return NextResponse.json({ status, bookUrl, salesType: sale.type });
  } catch (err) {
    console.error("Error fetching status:", err);
    return NextResponse.json(
      { error: "Failed to fetch status" },
      { status: 500 }
    );
  }
}
