import { Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-center gap-4">
          <Link
            href={"https://www.facebook.com/vprimost/?locale=uk_UA"}
            target="_blank"
          >
            <Facebook stroke="white" />
          </Link>
          <Link
            href={"https://www.facebook.com/vprimost/?locale=uk_UA"}
            target="_blank"
          >
            <Instagram stroke="white" />
          </Link>

          <Link
            href={
              "https://www.linkedin.com/in/%D0%B2%D0%B0%D0%BB%D0%B5%D1%80%D0%B8%D0%B9-%D0%BF%D1%80%D0%B8%D0%BC%D0%BE%D1%81%D1%82-a412a950/"
            }
            target="_blank"
          >
            <Linkedin stroke="white" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
