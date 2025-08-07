import { icons } from "@/constans/socialIcons";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-center gap-4">
          <Link
            href="https://www.facebook.com/vprimost/?locale=uk_UA"
            target="_blank"
            prefetch={false}
            aria-label="facebook"
          >
            {icons["facebook"]}
          </Link>
          <Link
            href={"https://linktr.ee/Prymost"}
            target="_blank"
            prefetch={false}
            aria-label={"patreon"}
            className="text-white"
          >
            Patreon
          </Link>
          <Link
            href={"https://www.linkedin.com/in/valerii-prymost-a3a05545/"}
            target="_blank"
            prefetch={false}
            aria-label="linkedin"
          >
            {icons["linkedin"]}
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
