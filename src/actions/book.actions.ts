/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";
import { firestore, TTimestamp } from "@/lib/firebase";
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { deleteFileFromStorage } from "@/lib/firebase-upload";
import { Book, BookFormat } from "@/types/book.types";

function convertTimestampToString(timestamp: TTimestamp): string {
  return timestamp?.seconds
    ? new Date(timestamp.seconds * 1000).toISOString()
    : "";
}

export async function getAllBooks(): Promise<Book[]> {
  const querySnapshot = await getDocs(collection(firestore, "books"));
  return querySnapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      title: data.title,
      slug: data.slug,
      price: data.price,
      paperFormat: data.paperFormat,
      price_paper: data.price_paper,

      shortDescription: data.shortDescription,
      fullDescription: data.fullDescription,
      formats: (data.formats || []).map((f: any) => ({
        id: f.id,
        format: f.format,
        filename: f.filename,
      })) as BookFormat[],
      coverImageUrl: data.coverImageUrl,
      createdAt: convertTimestampToString(data.createdAt),
      updatedAt: convertTimestampToString(data.updatedAt),
    };
  });
}

export async function getBookById(id: string): Promise<Book | null> {
  const docRef = doc(firestore, "books", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;
  const data = docSnap.data();
  return {
    id: docSnap.id,
    title: data.title,
    slug: data.slug,
    price: data.price,
    price_paper: data.price_paper,

    paperFormat: data.paperFormat,
    fullDescription: data.fullDescription,
    formats: (data.formats || []).map((f: any) => ({
      id: f.id,
      format: f.format,
      filename: f.filename,
      url: f.url,
    })) as BookFormat[],
    coverImageUrl: data.coverImageUrl,
    createdAt: convertTimestampToString(data.createdAt),
    updatedAt: convertTimestampToString(data.updatedAt),
  };
}

export async function createBook(data: Omit<Book, "createdAt" | "updatedAt">) {
  const docRef = doc(firestore, "books", data.id);
  await setDoc(docRef, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return data.id;
}

export async function updateBook(
  id: string,
  data: Partial<Omit<Book, "id" | "createdAt" | "updatedAt">>
) {
  const docRef = doc(firestore, "books", id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteBookWithFiles(id: string) {
  const docRef = doc(firestore, "books", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return;
  const data = docSnap.data();
  if (Array.isArray(data.formats)) {
    for (const format of data.formats) {
      if (format.url) await deleteFileFromStorage(format.url);
    }
  }
  if (data.coverImageUrl) await deleteFileFromStorage(data.coverImageUrl);
  await deleteDoc(docRef);
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  const q = query(collection(firestore, "books"), where("slug", "==", slug));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) return null;
  const docSnap = querySnapshot.docs[0];
  const data = docSnap.data();

  return {
    id: docSnap.id,
    title: data.title,
    slug: data.slug,
    price: data.price,
    price_paper: data.price_paper,

    paperFormat: data.paperFormat,
    shortDescription: data.shortDescription,
    fullDescription: data.fullDescription,
    formats: (data.formats || []).map((f: any) => ({
      id: f.id,
      format: f.format,
      filename: f.filename,
    })),
    coverImageUrl: data.coverImageUrl,
    createdAt: convertTimestampToString(data.createdAt),
    updatedAt: convertTimestampToString(data.updatedAt),
  } as Book;
}

export async function getOrderId(id: string): Promise<TOrder | null> {
  const q = query(collection(firestore, "sales"), where("orderId", "==", id));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) return null;
  const docSnap = querySnapshot.docs[0];
  const data = docSnap.data();

  return data as TOrder;
}

type TOrder = {
  bookId: string;
  format: string;
  paperFormat: boolean;
  email?: string;
  phone?: string;
  adress?: string;
  firstName?: string;
  lastName?: string;
  orderId: string;
  status?: "pending" | "paid" | "failed";
};
