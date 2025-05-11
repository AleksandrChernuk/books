import edMon from "@/assets/ed-mos.jpeg";
import evrei from "@/assets/evrei.jpeg";
import pB from "@/assets/p-b.jpg";
import sk from "@/assets/sk.jpg";
import tsn from "@/assets/tsn.jpg";
import { StaticImageData } from "next/image";

export type Tbooks = {
  title: string;
  year: number;
  language: string;
  src: StaticImageData;
};

export const booksList = [
  {
    title: "Штабна сука",
    year: 1994,
    language: "русский",
    src: sk,
  },
  {
    title: "Єврей — це фах",
    year: 2013,
    language: "український",
    src: evrei,
  },
  {
    title: "Незалежність очима ТСН",
    year: 2017,
    language: "український",
    src: tsn,
  },
  {
    title: "Приднестровский беспредел",
    year: 1996,
    language: "русский",
    src: pB,
  },

  {
    title: "Едіп московський",
    year: 2016,
    language: "український",
    src: edMon,
  },
];
