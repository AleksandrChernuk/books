"use client";

import { LoaderCircle } from "lucide-react";
import dynamic from "next/dynamic";

export const BookFormNoSSR = dynamic(() => import("./components/BookForm"), {
  ssr: false,
  loading: () => (
    <div className="py-5 flex items-center justify-center">
      <LoaderCircle size={40} className="animate-spin" />
    </div>
  ),
});

export default function BookForm() {
  return (
    <div>
      <BookFormNoSSR />
    </div>
  );
}
