"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { signInWithCustomToken } from "firebase/auth";
import { auth as firebaseAuth } from "@/lib/firebase";

export function FirebaseSignInSync() {
  const { getToken, userId } = useAuth();

  useEffect(() => {
    if (!userId) return;
    (async () => {
      const customToken = await getToken({ template: "integration_firebase" });
      if (customToken) {
        try {
          await signInWithCustomToken(firebaseAuth, customToken);
        } catch (err) {
          console.error("Ошибка входа в Firebase:", err);
        }
      }
    })();
  }, [userId, getToken]);

  return null;
}
