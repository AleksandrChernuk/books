/* eslint-disable @typescript-eslint/no-explicit-any */
// actions/blog.actions.ts
"use server";

import { firestore } from "@/lib/firebase";
import { BlogPost } from "@/types/post.type";
import {
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  collection,
  query,
  where,
} from "firebase/firestore";

const postsCollection = collection(firestore, "posts");

export async function createPost(
  data: Omit<BlogPost, "id" | "createdAt" | "updatedAt">
) {
  const docRef = await addDoc(postsCollection, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

function convertTimestampToString(timestamp: any): string {
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
      slug: data.slug,
      sorting: data.sorting,
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
      slug: data.slug,
      sorting: data.sorting,
      createdAt: convertTimestampToString(data.createdAt),
      updatedAt: convertTimestampToString(data.updatedAt),
    };
  }
  return null;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const q = query(collection(firestore, "posts"), where("slug", "==", slug));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) return null;

  const docSnap = querySnapshot.docs[0];
  const data = docSnap.data() as BlogPost;

  return data ?? null;
}

export async function updatePost(id: string, data: Partial<BlogPost>) {
  const docRef = doc(firestore, "posts", id);
  console.log(data);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deletePost(id: string) {
  const docRef = doc(firestore, "posts", id);
  await deleteDoc(docRef);
}
