import Container from "@/components/shared/Container";
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
    </Container>
  );
}
