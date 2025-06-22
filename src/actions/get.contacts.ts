"use server";

import { firestore } from "@/lib/firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
  limit,
  Timestamp,
} from "firebase/firestore";

export type Contact = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

function convertTimestampToString(timestamp?: Timestamp): string {
  return timestamp ? new Date(timestamp.seconds * 1000).toISOString() : "";
}

export async function getContacts(): Promise<Contact[]> {
  try {
    const q = query(
      collection(firestore, "contacts"),
      orderBy("createdAt", "desc"),
      limit(20)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
      const data = doc.data() as {
        name: string;
        email: string;
        message: string;
        createdAt?: Timestamp;
      };
      return {
        id: doc.id,
        name: data.name,
        email: data.email,
        message: data.message,
        createdAt: convertTimestampToString(data.createdAt),
      };
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
}
