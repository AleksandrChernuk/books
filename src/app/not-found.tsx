import Footer from "@/components/modules/footer/footer";
import MainHeader from "@/components/modules/headers/MainHeader";
import Container from "@/components/shared/Container";
import Wrapper from "@/components/shared/Wrapper";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className={`flex flex-col h-dvh`}>
      <MainHeader />
      <main className="flex-1">
        <Container className="h-full">
          <Wrapper className="h-full">
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <h2 className="text-lg md:text-xl font-semibold">
                Сторінку не знайдено
              </h2>
              <p>Не вдалося знайти запитаний ресурс</p>
              <Link href="/" className="text-blue-600 hover:underline">
                Повернутися на головну
              </Link>
            </div>
          </Wrapper>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
