import ImagesGalerry from "@/components/modules/galeryy/ImagesGalerry";
import NewsletterFormPreview from "@/components/shared/NewsletterForm";
import { booksList } from "@/constans/books";
import React from "react";

export default function BooksPage() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4">
        <section>
          <div className="max-w-6xl mx-auto px-4 py-10 md:py-15   text-gray-700">
            <ImagesGalerry list={booksList} />
          </div>
        </section>
        <section>
          <div className="max-w-6xl mx-auto px-4 pb-12 text-gray-700">
            <div className="max-w-md mx-auto">
              <NewsletterFormPreview
                title="Зацікавлені у придбанні?"
                text="Заповніть, будь ласка, форму нижче — і автор зв’яжеться з вами протягом найближчого часу."
              />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
