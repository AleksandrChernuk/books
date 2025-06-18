import Container from "@/components/shared/Container";

export type Params = Promise<{ order_id: string }>;

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SuccessPage({ searchParams }: Props) {
  const { orderId } = await searchParams;
  return (
    <Container>
      <div className="container mx-auto py-16">
        <h1 className="text-2xl mb-8">Перевірка оплати</h1>
        {orderId ? <div>{orderId}</div> : <div>null</div>}
      </div>
    </Container>
  );
}
