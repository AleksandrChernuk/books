import React from "react";

export default function AboutPage() {
  return (
    <>
      <section>
        <div className="max-w-6xl mx-auto px-4 text-gray-700">
          <div className="pt-10 md:pt-20">
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
          </div>
        </div>
      </section>
    </>
  );
}
