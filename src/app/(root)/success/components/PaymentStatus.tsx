"use client";

import Container from "@/components/shared/Container";
import Wrapper from "@/components/shared/Wrapper";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  orderId: string;
};

type OrderResponse = {
  status: string | null;
  bookUrl: string | null;
  filename?: string | null;
  salesType: string | null;
};

export default function PaymentStatus({ orderId }: Props) {
  const [downloading, setDownloading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [bookUrl, setBookUrl] = useState<string | null>(null);
  const [salesType, setSalesType] = useState<string | null>(null);

  const [filename, setFilename] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/invoice-status?invoiceId=${orderId}`);
        const data: OrderResponse = await res.json();
        setStatus(data.status);
        setBookUrl(data.bookUrl || null);
        setFilename(data.filename || null);
        setSalesType(data.salesType || null);
      } catch (err) {
        console.error("Помилка при завантаженні статусу:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [orderId]);

  if (loading)
    return (
      <section className="h-full">
        <Container className="h-full">
          <Wrapper className="h-full">
            <div className="flex items-center justify-center h-full">
              <p>Завантаження...</p>
            </div>
          </Wrapper>
        </Container>
      </section>
    );

  if (!status)
    return (
      <section className="h-full">
        <Container className="h-full">
          <Wrapper className="h-full">
            <div className="flex items-center justify-center gap-4 h-full">
              <p>Статус не визначено</p>
              <Button onClick={() => router.refresh()} variant={"default"}>
                Спробувати ще
              </Button>
            </div>
          </Wrapper>
        </Container>
      </section>
    );

  if (status !== "success")
    return (
      <section className="h-full">
        <Container className="h-full">
          <Wrapper className="h-full">
            <div className="flex flex-col items-center justify-center gap-4 h-full text-center">
              <p className="text-lg font-medium">
                На жаль, оплата не була успішною або статус недоступний.
              </p>
              <Button onClick={() => router.push("/books")} variant="default">
                Спробувати ще раз
              </Button>
              <Button onClick={() => router.push("/")} variant="outline">
                На головну
              </Button>
            </div>
          </Wrapper>
        </Container>
      </section>
    );

  const handleDownload = async () => {
    setDownloading(true);
    if (bookUrl) {
      try {
        const response = await fetch(bookUrl); // CORS потрібний
        if (!response.ok) throw new Error("Файл недоступний");
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename || "ebook";
        document.body.appendChild(link);
        link.click();
        link.remove();

        // Звільняємо ресурси
        URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error("Помилка при скачуванні файлу:", error);
        setDownloading(false);
      } finally {
        setDownloading(false);
      }
    }
  };

  return (
    <section className="h-full">
      <Container className="h-full">
        <Wrapper className="py-16 h-full flex items-center justify-center flex-col text-center space-y-4">
          <h1 className="text-2xl font-semibold mb-4">
            🎉 Оплата пройшла успішно!
          </h1>

          {status === "success" && salesType === "ebook" && bookUrl && (
            <div className="space-y-4">
              <p className="text-base text-muted-foreground">
                Дякуємо за покупку електронної книги! Ви можете завантажити її
                одразу, натиснувши на кнопку нижче.
              </p>
              <Button
                onClick={handleDownload}
                variant="outline"
                disabled={downloading}
              >
                {downloading ? "Завантаження..." : "📥 Завантажити книгу"}
              </Button>
              <p className="text-sm text-muted-foreground">
                📧 Копія книги також була відправлена на вашу електронну пошту.
              </p>
              <Button onClick={() => router.push("/")} variant="default">
                На головну
              </Button>
            </div>
          )}

          {salesType === "paper" && (
            <div className="space-y-2">
              <h5 className="text-xl font-medium">
                Дякуємо за замовлення паперової книги! 📚
              </h5>
              <p className="text-base text-muted-foreground">
                Ми отримали вашу оплату та найближчим часом надішлемо книгу на
                вказану адресу. Слідкуйте за оновленнями — повідомимо вас, щойно
                відправимо посилку.
              </p>
              <Button onClick={() => router.push("/")} variant="default">
                На головну
              </Button>
            </div>
          )}
        </Wrapper>
      </Container>
    </section>
  );
}
