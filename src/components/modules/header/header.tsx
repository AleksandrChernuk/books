import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Caveat } from "next/font/google";

const geist = Caveat({
  weight: "400",
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
  display: "swap",
});

function Header() {
  return (
    <header>
      <div className="w-7xl mx-auto px-4 py-2 ">
        <div className="flex items-center justify-between">
          <div className={`text-4xl`}>
            <Link href={"/"} className={`${geist.className}`}>
              Валерій Примост
            </Link>
          </div>
          <nav className="flex items-center justify-between gap-4">
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
        </div>
      </div>
    </header>
  );
}

export default Header;
