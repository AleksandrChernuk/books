import PaymentStatus from "./components/PaymentStatus";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId: string }>;
}) {
  const { orderId } = await searchParams;

  return <PaymentStatus orderId={orderId} />;
}
