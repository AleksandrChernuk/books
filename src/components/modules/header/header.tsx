import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Caveat } from "next/font/google";
import { MobileMenu } from "../mobile-menu/mobile-drawer";

const geist = Caveat({
  weight: "400",
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
  display: "swap",
});

function Header() {
  return (
    <header>
      <div className="max-w-6xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className={`text-4xl`}>
            <Link href={"/"} className={`${geist.className}`}>
              Валерій Примост
            </Link>
          </div>
          <nav className="hidden md:flex items-center justify-between gap-4 ">
            <Button asChild variant={"link"} size={"sm"}>
              <Link href={"/blog"}>Блог</Link>
            </Button>
            <Button asChild variant={"link"} size={"sm"}>
              <Link href={"/books"}>Книги</Link>
            </Button>
            <Button asChild variant={"link"} size={"sm"}>
              <Link href={"/about"}>Про автора</Link>
            </Button>
          </nav>
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
