"use client";

import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function CreateButton({ href }: { href: string }) {
  const [loading, setLoading] = useState(false);

  return (
    <Button asChild>
      <Link
        href={href}
        prefetch={false}
        onClick={() => setLoading(true)}
        className="flex items-center gap-2"
      >
        Додати
        {loading && <LoaderCircle size={16} className="animate-spin" />}
      </Link>
    </Button>
  );
}
