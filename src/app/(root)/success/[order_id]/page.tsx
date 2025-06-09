import { bookSaleStatus } from "@/actions/book-sale.actions";
import { getBookById, getOrderId } from "@/actions/book.actions";
import Container from "@/components/shared/Container";
import { Suspense } from "react";

export type Params = Promise<{ order_id: string }>;

type Props = {
  params: Params;
};
async function PaymentStatus({ order_id }: { order_id?: string }) {
  if (!order_id) {
    return <div>Не передано номер замовлення (order_id).</div>;
  }

  await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/order-status?order_id=${order_id}`,
    {
      cache: "no-store",
    }
  );

  await bookSaleStatus(order_id);
  const order = await getOrderId(order_id);

  if (order?.status === "paid") {
    const book = await getBookById(order.bookId);

    return (
      <div className="mt-4 flex items-center justify-between gap-2 flex-wrap">
        <h4 className="">Оплату успішно здійснено!</h4>

        <a
          className="border border-slate-400 rounded-md p-2"
          href={book?.formats.filter((e) => e.format === order.format)[0].url}
          target="_blank"
          download
        >
          Завантажити книгу
        </a>
      </div>
    );
  }

  if (order?.status === "pending") {
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
    <Container>
      <div className="container mx-auto py-16">
        <h1 className="text-2xl mb-8">Перевірка оплати</h1>

        <Suspense fallback={<div>Завантаження...</div>}>
          <PaymentStatus order_id={order_id} />
        </Suspense>
      </div>
    </Container>
  );
}
