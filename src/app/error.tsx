"use client";

import Footer from "@/components/modules/footer/footer";
import MainHeader from "@/components/modules/headers/MainHeader";
import Container from "@/components/shared/Container";
import Wrapper from "@/components/shared/Wrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={`flex flex-col h-dvh`}>
      <MainHeader />
      <main className="flex-1">
        <Container className="h-full">
          <Wrapper className="h-full">
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <h2 className="text-lg md:text-xl font-semibold">
                Щось пішло не так
              </h2>
              <p className="mb-2">
                Виникла помилка під час завантаження ресурсу
              </p>
              <div className="flex flex-col gap-4">
                <Link href="/" className="text-blue-600 hover:underline">
                  Повернутися на головну
                </Link>
                <Button variant={"default"} onClick={() => reset()}>
                  Спробувати ще раз
                </Button>
              </div>
            </div>
          </Wrapper>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
