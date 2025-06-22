"use server";

import { addDoc, getDocs, collection, query, where } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { TSales } from "@/types/sales.types";

export async function createBookSale(data: {
  bookId: string;
  format?: string;
  orderId: string;
  type: "ebook" | "paper";
  price: number;
  status?: "pending" | "paid" | "failed";
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  email?: string;
  invoiceId?: string;
  bookName: string;
}) {
  return await addDoc(collection(firestore, "sales"), {
    ...data,
    status: data.status || "pending",
    createdAt: new Date().toISOString(),
  });
}

export async function bookSaleStatus(orderId: string) {
  const q = query(
    collection(firestore, "sales"),
    where("orderId", "==", orderId)
  );
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) return null;
  const docSnap = querySnapshot.docs[0];
  const data = docSnap.data();

  return data as TSales;
}
