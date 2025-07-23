import Link from "next/link";
import { MainMenu } from "../mobile-menu/MainMenu";
import { publicLinks } from "@/constans/nav.constans";
import NavLinks from "@/components/shared/NavLinks";

function MainHeader() {
  return (
    <header>
      <div className="max-w-6xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div>
            <Link
              href={"/"}
              prefetch={false}
              className={`text-2xl text-shadow-slate-900 sm:text-lg md:text-2xl`}
            >
              Валерій Примост
            </Link>
          </div>

          <nav className="hidden md:flex items-center justify-between gap-4 ">
            <NavLinks links={publicLinks} className="flex items-center gap-4" />
          </nav>
          <div className="md:hidden">
            <MainMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

export default MainHeader;
