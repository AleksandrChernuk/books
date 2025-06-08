export const dynamic = "force-dynamic";

import { BookFormNoSSR } from "@/components/modules/book-form";
import BackBtn from "@/components/shared/BackBtn";
import Container from "@/components/shared/Container";

export default async function CreateBook() {
  return (
    <Container>
      <div className="py-10">
        <div className="mb-4">
          <BackBtn />
        </div>
        <BookFormNoSSR />
      </div>
    </Container>
  );
}
