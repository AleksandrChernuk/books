"use server";
import {
  doc,
  updateDoc,
  addDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "@/lib/firebase";

export async function createBookSale(data: {
  bookId: string;
  format: string;
  orderId: string;
  userId?: string | null;
  status?: "pending" | "paid" | "failed";
}) {
  return await addDoc(collection(firestore, "sales"), {
    ...data,
    status: data.status || "pending",
  });
}

export async function updateBookSaleStatus(
  orderId: string,
  status: "paid" | "failed"
) {
  const q = query(
    collection(firestore, "sales"),
    where("orderId", "==", orderId)
  );
  const snap = await getDocs(q);
  if (!snap.empty) {
    await updateDoc(doc(firestore, "sales", snap.docs[0].id), {
      status,
    });
  }
}

export async function getBookSalePaid(bookId: string, format: string) {
  const q = query(
    collection(firestore, "sales"),
    where("bookId", "==", bookId),
    where("format", "==", format),
    where("status", "==", "paid")
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return snap.docs[0].data();
}
