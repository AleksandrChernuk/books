"use client";

import { Button } from "@/components/ui/button";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Book } from "@/types/book.types";
import { useState } from "react";
import PaperForm from "./PaperForm";
import EbookForm from "./EbookForm";

type CheckoutFormProps = {
  book: Book;
  formats: Array<"pdf" | "epub" | "fb2" | "mobi">;
};

export default function CheckoutForm({ book, formats }: CheckoutFormProps) {
  const [type, setType] = useState<"ebook" | "paper">("ebook");
  return (
    <div className="p-4 border border-slate-200 rounded-2xl">
      <ul className="flex gap-4 mb-4 w-full">
        {book.price !== undefined && book.price > 0 && (
          <li className="p-1 rounded-md bg-slate-200 w-1/2">
            <p className="mr-4 text-xs">Електронна</p>
            <p>{book.price} UAH</p>
          </li>
        )}
        {book.paperFormat &&
          book.price_paper !== undefined &&
          book.price_paper > 0 && (
            <li className="p-1 rounded-md bg-slate-200 w-1/2">
              <p className="mr-4 text-xs">Паперова</p>
              <p>{book.price_paper} UAH</p>
            </li>
          )}
      </ul>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" className="w-full">
            Придбати
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Оформлення замовлення</DialogTitle>
          </DialogHeader>

          <Tabs
            value={type}
            onValueChange={(val) => setType(val as "ebook" | "paper")}
          >
            <TabsList className="w-full">
              {book.price && book.price > 0 ? (
                <TabsTrigger value="ebook">Електронна</TabsTrigger>
              ) : null}

              {book.paperFormat && book.price_paper && book.price_paper > 0 ? (
                <TabsTrigger value="paper">Паперова</TabsTrigger>
              ) : null}
            </TabsList>

            <TabsContent value="ebook" className="mt-4 flex flex-col gap-4">
              <EbookForm book={book} formats={formats} />
            </TabsContent>

            <TabsContent value="paper" className="flex flex-col gap-4">
              <PaperForm book={book} />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
