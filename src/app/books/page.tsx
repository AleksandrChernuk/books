import NewsletterFormPreview from "@/components/shared/NewsletterForm";
import React from "react";

export default function BooksPage() {
  return (
    <section>
      <div className="w-5xl mx-auto px-4">
        <section>
          <div className="w-5xl mx-auto px-4 py-12 text-gray-700">
            <div className="py-12 max-w-md mx-auto">
              <NewsletterFormPreview />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
