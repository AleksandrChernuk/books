"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

export default function BackBtn() {
  const router = useRouter();

  return (
    <Button
      variant="link"
      onClick={() => router.back()}
      className="inline-flex items-center gap-1 hover:underline px-0"
    >
      <ArrowLeft size={16} strokeWidth={1.5} />
      Назад
    </Button>
  );
}
