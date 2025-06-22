/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/firestore/loadOrderDetails.ts
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { fetchInvoiceStatus } from "./invoice.status";

export async function loadOrderDetails(orderId: string) {
  if (!orderId) return null;

  const q = query(
    collection(firestore, "sales"),
    where("orderId", "==", orderId)
  );

  const snapshot = await getDocs(q);
  const saleDoc = snapshot.docs[0];

  if (!saleDoc) return null;

  const sale = saleDoc.data();
  const invoiceId = sale.invoiceId;
  const bookId = sale.bookId;
  const format = sale.format;

  let status: string | null = null;
  let bookUrl: string | null = null;
  let filename: string | null = null;

  if (invoiceId) {
    status = await fetchInvoiceStatus(invoiceId);
    console.log(status);
  }

  if (bookId && format) {
    const bookSnap = await getDocs(
      query(collection(firestore, "books"), where("id", "==", bookId))
    );
    const bookData = bookSnap.docs[0]?.data();

    if (bookData) {
      const formatEntry = bookData.formats?.find(
        (f: any) => f.format === format
      );
      if (formatEntry?.url) {
        bookUrl = formatEntry.url;
        filename = formatEntry.filename;
      }
    }
  }

  return { status, bookUrl, filename };
}
