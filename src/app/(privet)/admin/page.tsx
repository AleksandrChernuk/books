import ContactsList from "@/components/shared/ContactsList";
import Container from "@/components/shared/Container";
import Wrapper from "@/components/shared/Wrapper";
import React, { Suspense } from "react";

export default async function AdminPage() {
  return (
    <Container>
      <Wrapper>
        <div>
          <h2>Зворотій зв`язок</h2>
          <Suspense>
            <ContactsList />
          </Suspense>
        </div>
      </Wrapper>
    </Container>
  );
}
