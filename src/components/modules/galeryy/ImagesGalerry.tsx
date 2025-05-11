import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { booksList } from "@/constans/books";
import Image from "next/image";

export default function ImagesGalerry() {
  return (
    <ul className="flex items-center justify-between gap-4">
      {booksList.slice(0, 3).map((e) => (
        <Card key={e.title} className="p-2">
          <CardTitle>{e.title}</CardTitle>
          <CardContent>
            <Image src={e.src} alt={e.title} width={200} height={200} />
          </CardContent>
          <CardFooter>
            <ul className="flex items-center gap-2">
              <li>{e.language}</li>
              <li>{e.year}</li>
            </ul>
          </CardFooter>
        </Card>
      ))}
    </ul>
  );
}
