export const publicLinks = [
  {
    title: "Головна",
    url: "/",
  },
  {
    title: "Блог",
    url: "/blog",
  },
  {
    title: "Книги",
    url: "/books",
  },
  {
    title: "Про себе",
    url: "/about",
  },
];

export const privateLinks = [
  {
    title: "На сайт",
    url: "/",
  },
  {
    title: "Публікації",
    url: "/admin/blog-edit",
  },
  {
    title: "Книги",
    url: "/admin/books-edit",
  },
];

export const socialLinks = [
  {
    title: "facebook",
    url: "https://www.facebook.com/vprimost/?locale=uk_UA",
  },
  {
    title: "instagram",
    url: "https://www.facebook.com/vprimost/?locale=uk_UA",
  },
  {
    title: "linkedin",
    url: "https://www.linkedin.com/in/%D0%B2%D0%B0%D0%BB%D0%B5%D1%80%D0%B8%D0%B9-%D0%BF%D1%80%D0%B8%D0%BC%D0%BE%D1%81%D1%82-a412a950/",
  },
];

export type TNavLinks = {
  title: string;
  url: string;
};
