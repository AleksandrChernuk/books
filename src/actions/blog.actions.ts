"use server";

import { firestore, TTimestamp } from "@/lib/firebase";
import { BlogPost } from "@/types/post.type";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

const postsCollection = collection(firestore, "posts");

function convertTimestampToString(timestamp: TTimestamp): string {
  return timestamp?.seconds
    ? new Date(timestamp.seconds * 1000).toISOString()
    : "";
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const querySnapshot = await getDocs(postsCollection);
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      description: data.description,
      content: data.content,
      createdAt: convertTimestampToString(data.createdAt),
      updatedAt: convertTimestampToString(data.updatedAt),
    };
  });
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const docRef = doc(firestore, "posts", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      title: data.title,
      description: data.description,
      content: data.content,
      createdAt: convertTimestampToString(data.createdAt),
      updatedAt: convertTimestampToString(data.updatedAt),
    };
  }
  return null;
}
