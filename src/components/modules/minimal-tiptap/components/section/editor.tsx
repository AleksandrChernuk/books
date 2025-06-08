import { Editor } from "@tiptap/react"; // ← так правильно для Tiptap!
import { Button } from "@/components/ui/button";
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";

export const AlignButtons = ({ editor }: { editor: Editor }) => (
  <div className="flex gap-1">
    <Button
      type="button"
      size="icon"
      variant={editor.isActive({ textAlign: "left" }) ? "secondary" : "ghost"}
      onClick={() => editor.chain().focus().setTextAlign("left").run()}
      aria-label="Align left"
    >
      <AlignLeft className="h-4 w-4" />
    </Button>
    <Button
      type="button"
      size="icon"
      variant={editor.isActive({ textAlign: "center" }) ? "secondary" : "ghost"}
      onClick={() => editor.chain().focus().setTextAlign("center").run()}
      aria-label="Align center"
    >
      <AlignCenter className="h-4 w-4" />
    </Button>
    <Button
      type="button"
      size="icon"
      variant={editor.isActive({ textAlign: "right" }) ? "secondary" : "ghost"}
      onClick={() => editor.chain().focus().setTextAlign("right").run()}
      aria-label="Align right"
    >
      <AlignRight className="h-4 w-4" />
    </Button>
    <Button
      type="button"
      size="icon"
      variant={
        editor.isActive({ textAlign: "justify" }) ? "secondary" : "ghost"
      }
      onClick={() => editor.chain().focus().setTextAlign("justify").run()}
      aria-label="Align justify"
    >
      <AlignJustify className="h-4 w-4" />
    </Button>
  </div>
);
