import { host } from "@/lib/config";
import { Suspense } from "react";

export type Params = Promise<{ order_id: string }>;

type Props = {
  params: Params;
};
async function PaymentStatus({ order_id }: { order_id?: string }) {
  if (!order_id) {
    return <div>Не передан номер заказа (order_id).</div>;
  }

  const response = await fetch(
    `${host}/api/order-status?order_id=${order_id}`,
    {
      cache: "no-store",
    }
  );

  const { status, bookDownloadUrl } = await response.json();

  if (status === "paid" || status === "success") {
    return (
      <div>
        <h2>Оплата прошла успешно!</h2>
        <a className="btn" href={bookDownloadUrl} download>
          Скачать книгу
        </a>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div>
        Оплата ещё обрабатывается. Подождите пару минут и обновите страницу.
      </div>
    );
  }

  return <div>Ошибка оплаты или заказ не найден.</div>;
}

export default async function SuccessPage({ params }: Props) {
  const { order_id } = await params;

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-2xl mb-8">Проверка оплаты</h1>
      <Suspense fallback={<div>Загрузка...</div>}>
        <PaymentStatus order_id={order_id} />
      </Suspense>
    </div>
  );
}
