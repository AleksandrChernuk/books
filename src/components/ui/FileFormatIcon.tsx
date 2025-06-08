import { BookFormat } from "@/types/book.types";
import {
  FileText,
  BookOpenCheck,
  FileCode2,
  Smartphone,
  FileQuestion,
} from "lucide-react";

interface FileFormatIconProps {
  format: BookFormat["format"];
  className?: string;
}

export default function FileFormatIcon({
  format,
  className = "h-5 w-5",
}: FileFormatIconProps) {
  switch (format) {
    case "pdf":
      return <FileText className={className} aria-label="PDF" />;
    case "epub":
      return <BookOpenCheck className={className} aria-label="EPUB" />;
    case "fb2":
      return <FileCode2 className={className} aria-label="FB2" />;
    case "mobi":
      return <Smartphone className={className} aria-label="MOBI" />;
    default:
      return <FileQuestion className={className} aria-label="Unknown" />;
  }
}
