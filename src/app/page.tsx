import Image from "next/image";
import mainImg from "@/assets/title.webp";
import ImagesGalerry from "@/components/modules/galeryy/ImagesGalerry";
import NewsletterFormPreview from "@/components/shared/NewsletterForm";
import { booksList } from "@/constans/books";

export default function Home() {
  return (
    <div>
      <section>
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-20">
          <ul className="flex flex-col md:flex-row items-center justify-between gap-10">
            <li>
              <Image
                src={mainImg}
                alt="Автор"
                priority
                width={400}
                height={400}
                draggable={false}
              />
            </li>
            <li>
              <h1 className="text-4xl text-slate-800 mb-4">
                Слова, що пробуджують думки
              </h1>
              <p className="text-2xl text-slate-800">
                Від історій — до історії. Пориньте в творчий світ Валерія
                Примоста.
              </p>
            </li>
          </ul>
        </div>
      </section>
      <section>
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-20   text-gray-700">
          <ImagesGalerry list={booksList.slice(0, 3)} />
        </div>
      </section>

      <section>
        <div className="max-w-6xl mx-auto px-4 pb-6 md:pb-12 text-gray-700">
          <div className="max-w-lg mx-auto">
            <NewsletterFormPreview
              title="Зв’яжіться з автором"
              text="Маєте питання щодо творчості чи пропозиції співпраці? Заповніть
          форму нижче, і автор зв’яжеться з вами в найкоротший термін."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
