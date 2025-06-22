import ContactForm from "@/components/modules/contact-form";
import Container from "@/components/shared/Container";
import Wrapper from "@/components/shared/Wrapper";
import React from "react";

export default function AboutPage() {
  return (
    <>
      <section>
        <Container>
          <Wrapper className="text-gray-700">
            <h3 className="text-center">Основні досягнення</h3>
            <ul className="pl-5 space-y-2 mt-4">
              <li>
                <h4 className="font-semibold">Письменник:</h4>
                <ul className="list-disc pl-5 mt-2">
                  <li>35 років досвіду</li>
                  <li>17 книжок (українською, англійською, російською)</li>
                  <li>150 000+ примірників</li>
                </ul>
              </li>
              <li>
                <h4 className="font-semibold">Рекламіст і маркетолог:</h4>
                <ul className="list-disc pl-5 mt-2">
                  <li>30 років досвіду</li>
                  <li>Креативний директор трьох мережевих агенцій</li>
                  <li>
                    Десятки рекламних кампаній для української та
                    загальноєвропейської аудиторій
                  </li>
                  <li>
                    Маркетингові стратегії для великих національних бізнесів
                  </li>
                </ul>
              </li>
              <li>
                <h4 className="font-semibold">Сценарист:</h4>
                <ul className="list-disc pl-5 mt-2">
                  <li>25 років досвіду</li>
                  <li>10 сценаріїв ТВ-фільмів та серіалів</li>
                  <li>Багатомільйонні аудиторії</li>
                </ul>
              </li>
              <li>
                <h4 className="font-semibold">Стратегічний аналітик:</h4>
                <ul className="list-disc pl-5 mt-2">
                  <li>15 років досвіду</li>
                  <li>Власна методологія «5 Принципів Ефективності»</li>
                  <li>Низка точних передбачень</li>
                </ul>
              </li>
              <li>Мислитель, який розуміє закони, що рухають нашим світом.</li>
              <li>
                Сторітеллер, який захопливо розповість вам про те, як усе
                працює.
              </li>
              <li>Велика душа, яка щиро прагне змінити цей світ на краще.</li>
            </ul>
          </Wrapper>
        </Container>
      </section>
      <section>
        <Container>
          <Wrapper className="text-gray-700 flex items-center justify-center py-10">
            <ContactForm />
          </Wrapper>
        </Container>
      </section>
    </>
  );
}
