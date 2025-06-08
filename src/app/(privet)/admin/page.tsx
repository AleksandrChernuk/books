import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function AdminPage() {
  return (
    <Container>
      <div className="py-10">
        <h1 className="text-2xl font-bold mb-4">Керування публікаціями</h1>
        <p className="text-base text-muted-foreground mb-2">
          Ласкаво просимо до розділу керування публікаціями. Тут ви можете
          створювати нові статті, редагувати вже опубліковані матеріали та
          видаляти застарілий або непотрібний контент.
        </p>
        <p className="text-base text-muted-foreground mb-2">
          Усі зміни миттєво відображаються на сайті, що дозволяє вам
          підтримувати актуальність та якість інформації для відвідувачів.
        </p>
        <p className="text-base text-muted-foreground">
          Для створення або редагування використовується зручний вбудований
          редактор з підтримкою форматування тексту, зображень та попереднього
          перегляду.
        </p>
      </div>

      <div className="py-10">
        <h3 className="text-2xl font-bold mb-4">Посилання на сторінки сайту</h3>
        <div className="flex gap-4">
          <Button asChild>
            <Link prefetch={false} href={"/"}>
              Головна
            </Link>
          </Button>
          <Button asChild>
            <Link prefetch={false} href={"/blog"}>
              Публікації
            </Link>
          </Button>
          <Button asChild>
            <Link prefetch={false} href={"/books"}>
              Книги
            </Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
