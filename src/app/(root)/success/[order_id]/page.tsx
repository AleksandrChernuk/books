import { getBookById } from "@/actions/book.actions";
import { host } from "@/lib/config";
import { Suspense } from "react";

export type Params = Promise<{ order_id: string }>;

type Props = {
  params: Params;
};
async function PaymentStatus({ order_id }: { order_id?: string }) {
  if (!order_id) {
    return <div>Не передано номер замовлення (order_id).</div>;
  }

  const response = await fetch(
    `${host}/api/order-status?order_id=${order_id}`,
    {
      cache: "no-store",
    }
  );
  const { res } = await response.json();

  const book = await getBookById(order_id);

  if (res.status === "success") {
    return (
      <div>
        <h2>Оплату успішно здійснено!</h2>

        <a
          className="border border-slate-400 rounded-md p-2"
          href={book?.formats[0].url}
          target="_blank"
          download
        >
          Завантажити книгу
        </a>
      </div>
    );
  }

  if (res.status === "pending") {
    return (
      <div>
        Оплата ще обробляється. Зачекайте кілька хвилин і оновіть сторінку.
      </div>
    );
  }

  return <div>Помилка оплати або замовлення не знайдено.</div>;
}

export default async function SuccessPage({ params }: Props) {
  const { order_id } = await params;

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-2xl mb-8">Перевірка оплати</h1>

      <Suspense fallback={<div>Завантаження...</div>}>
        <PaymentStatus order_id={order_id} />
      </Suspense>
    </div>
  );
}
