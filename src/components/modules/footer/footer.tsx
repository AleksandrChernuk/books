import { Facebook, Instagram, Linkedin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-center gap-4">
          <Facebook stroke="white" />
          <Instagram stroke="white" />
          <Linkedin stroke="white" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
