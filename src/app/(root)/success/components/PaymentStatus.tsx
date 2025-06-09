// /* eslint-disable prefer-const */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import { bookSaleStatus } from "@/actions/book-sale.actions";
// import { useEffect, useState } from "react";

// type SaleStatus = "pending" | "paid" | "failed";

// type Props = {
//   order_id: string;
// };

// type BookFormat = { url: string };
// type Book = { formats: BookFormat[] };

// export default function PaymentStatus({ order_id }: Props) {
//   const [status, setStatus] = useState<SaleStatus>(null);
//   const [book, setBook] = useState<Book | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     let stopped = false;

//     async function fetchStatus() {
//       try {
//         await fetch(`/api/order-status?order_id=${order_id}`, {
//           cache: "no-store",
//         });

//         const saleStatus = await bookSaleStatus(order_id);
//         if (saleStatus) {
//           setStatus(saleStatus.status);
//         }

//         if (saleStatus?.status === "paid") {
//           const bookRes = await fetch(
//             `/api/book-by-order?order_id=${order_id}`
//           );
//           const book = await bookRes.json();
//           setBook(book);
//           stopped = true;
//         }
//       } catch (err) {
//         setError("Помилка при перевірці статусу оплати.");
//         stopped = true;
//       }
//     }

//     fetchStatus();
//     interval = setInterval(() => {
//       if (!stopped) fetchStatus();
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [order_id]);

//   if (error) return <div>{error}</div>;

//   if (status === "paid" && book) {
//     return (
//       <div>
//         <h2>Оплату успішно здійснено!</h2>
//         <a
//           className="border border-slate-400 rounded-md p-2"
//           href={book.formats[0].url}
//           target="_blank"
//           download
//         >
//           Завантажити книгу
//         </a>
//       </div>
//     );
//   }

//   if (status === "pending") {
//     return (
//       <div>
//         Оплата ще обробляється. Зачекайте кілька хвилин... (статус оновлюється)
//       </div>
//     );
//   }

//   if (status === "failed") {
//     return <div>Оплата не пройшла. Спробуйте ще раз.</div>;
//   }

//   return <div>Завантаження...</div>;
// }
