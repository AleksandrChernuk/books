import Image from "next/image";
import mainImg from "@/assets/title.webp";
import booksOll from "@/assets/books_all.png";
import Container from "@/components/shared/Container";
import Wrapper from "@/components/shared/Wrapper";

export const metadata = {
  title: "Валерій Примост — стратегічний аналітик, автор, сторітелер",
  description:
    "Офіційна сторінка Валерія Примоста — аналітика, автора методології «5 Принципів Ефективності» та книг про цивілізаційний розвиток. Досвід, сторітелінг, прогнози, відео та добірка книжок.",
};

export default function MainPage() {
  return (
    <>
      <section>
        <Container>
          <Wrapper className="py-20 md:py-28 ">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-center justify-center">
                <Image
                  src={mainImg}
                  alt="Автор"
                  priority
                  draggable={false}
                  className="mb-0 w-auto max-h-[300px]"
                />
              </li>
              <li className="content-start">
                <h1 className="text-xl font-normal">
                  {`Валерій Примост — стратегічний аналітик із багаторічним
                  досвідом геополітичного прогнозування та автор унікальної
                  методології "5 Принципів Ефективності" для аналізу розвитку
                  націй та організацій.`}
                </h1>
              </li>
            </ul>
            <ul className="flex flex-col gap-3 mt-8 text-center ">
              <li>
                <p className="text-md text-slate-600">
                  Маючи доведений track record точних довгострокових прогнозів
                  (включно з передбаченням повномасштабної війни в Україні у
                  2013 році та президентства Зеленського у 2015-му), він поєднує
                  глибоку аналітичну експертизу з майстерністю сторітелінгу.{" "}
                </p>
              </li>
              <li>
                <p className="text-md text-slate-600">
                  Як багатогранний творець наративів, Валерій успішно працює у
                  різноманітних сферах — від написання книг з цивілізаційного
                  аналізу та сценаріїв для телевізійних серіалів до розробки
                  рекламних кампаній, освітніх лекцій, ігрових механік та
                  інтерактивних додатків.
                </p>
              </li>
              <li>
                <p className="text-md text-slate-600">
                  Його унікальна здатність перетворювати складні стратегічні
                  концепції на зрозумілі та переконливі історії робить його
                  затребуваним консультантом для decision-makers у бізнесі,
                  політиці та інвестиціях, яким необхідно розуміти довгострокові
                  тренди та приймати обґрунтовані стратегічні рішення
                </p>
              </li>
            </ul>
          </Wrapper>
        </Container>
      </section>
      <section>
        <Container>
          <Wrapper className="py-0 md:py-0">
            <ul className="flex flex-col md:flex-row items-center justify-between gap-4">
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
                    <p>{`"Хозяева Вселенной. Сторителлинг и Цивилизация”`}</p>
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
                  style={{ width: "100%", height: "auto", maxWidth: 400 }}
                />
              </li>
            </ul>
          </Wrapper>
        </Container>
      </section>
      <section>
        <Container>
          <Wrapper className="py-20 md:py-28">
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
          </Wrapper>
        </Container>
      </section>
    </>
  );
}
