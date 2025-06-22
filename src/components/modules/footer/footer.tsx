import { socialLinks } from "@/constans/nav.constans";
import { icons } from "@/constans/socialIcons";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-center gap-4">
          {socialLinks.map((social) => (
            <Link
              key={social.title}
              href={social.url}
              target="_blank"
              prefetch={false}
              aria-label={social.title}
            >
              {icons[social.title]}
            </Link>
          ))}
          <Link
            href={"https://www.patreon.com/V_Prymost"}
            target="_blank"
            prefetch={false}
            aria-label={"patreon"}
            className="text-white"
          >
            Patreon
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
