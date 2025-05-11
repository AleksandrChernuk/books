import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Tbooks } from "@/constans/books";
import Image from "next/image";

type Props = {
  list: Tbooks[];
};

export default function ImagesGalerry({ list }: Props) {
  return (
    <ul className="grid md:grid-cols-3 gap-10">
      {list.map((e) => (
        <Card key={e.title} className="flex items-center justify-center p-2">
          <CardTitle className="text-xl text-slate-800">{e.title}</CardTitle>
          <CardContent>
            <Image
              placeholder="blur"
              src={e.src}
              alt={e.title}
              width={200}
              height={200}
            />
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
