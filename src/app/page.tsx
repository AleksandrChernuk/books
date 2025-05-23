import Image from "next/image";
import mainImg from "@/assets/title.webp";
import booksOll from "@/assets/books_all.png";

export default function Home() {
  return (
    <div>
      <section>
        <div className="max-w-6xl mx-auto px-4">
          <div className="py-10 md:py-20">
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <li className="content-start">
                <h1 className="text-slate-800 text-xl ">
                  Сторітеллер світового класу з десятиліттями досвіду створення
                  переконливих наративів у різних медіа: серіалах, книгах,
                  рекламі, іграх і додатках.
                </h1>
              </li>
              <li className="flex items-center justify-center">
                <Image
                  src={mainImg}
                  alt="Автор"
                  priority
                  width={300}
                  height={300}
                  draggable={false}
                />
              </li>
              <li className="content-end items-end">
                <p className=" text-slate-800">
                  Надихаюся синтезом драматичної глибини, продуманого
                  стратегічного підходу та емоційної залученості в інтерактивний
                  наратив.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-6xl mx-auto px-4">
          <ul className="flex flex-col md:flex-row items-center justify-between gap-4 py-10 md:py-20">
            <li className="md:w-1/2">
              <h3 className="text-center md:text-start">Деякі з Книжок</h3>
              <ul className="text-center md:text-start">
                <li>
                  <p>{`“Штабная сука” (про службу в Радянській армії)`}</p>
                </li>
                <li>
                  <p>{`“Єврей - це фах” (нариси історії євреїв в Україні)`}</p>
                </li>
                <li>
                  <p>{`“Едіп Московський” (нариси історії росіян)`}</p>
                </li>
                <li>
                  <p>{`“Незалежність очима ТСН”`}</p>
                </li>
                <li>
                  <p>{`"Хозяева мира. Сторителлинг и Цивилизация”`}</p>
                </li>
                <li>
                  <p>{`“Jopa Mira... або Шлях до зірок” (нариси майбутньої України)`}</p>
                </li>
                <li>
                  <p>{`“Born to Be a Man” (ghostwriting)`}</p>
                </li>
              </ul>
            </li>
            <li className="md:w-1/2 flex items-center justify-center  md:justify-end">
              <Image
                src={booksOll}
                alt="Автор"
                priority
                width={400}
                height={400}
                draggable={false}
              />
            </li>
          </ul>
        </div>
      </section>

      <section>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:content-around py-10 md:py-20">
            <div className="flex flex-col items-center justify-center">
              <h4 className="text-center md:text-start">
                Сторітелінг та нація. Як створити країну-лідера
              </h4>
              <div className="w-full max-w-[560px] aspect-video">
                <iframe
                  className="w-full h-full rounded-xl shadow-lg"
                  src="https://www.youtube.com/embed/q1DwdfTZ4mM?si=x0g5rxZuZmRFrHp1"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className="text-center">
              <h4>ЧОМУ Я?</h4>
              <ul className="space-y-2">
                <li>
                  📚 Майстер сторітелінгу — глибока експертиза у створенні
                  наративного контенту
                </li>
                <li>
                  🎮 📺 📖 Досвід у різних індустріях — ігри, ТБ, книжки,
                  реклама
                </li>
                <li>
                  🏆 Підтверджене лідерство — керування командами до 80 осіб
                </li>
                <li>
                  🌍 Глобальне бачення — проєкти для аудиторій по всьому світу
                </li>
                <li>✨ Готовий давати історіям життя</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
