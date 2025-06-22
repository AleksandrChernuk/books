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
    url: "https://www.linkedin.com/in/valerii-prymost-a3a05545/",
  },
];

export type TNavLinks = {
  title: string;
  url: string;
};
