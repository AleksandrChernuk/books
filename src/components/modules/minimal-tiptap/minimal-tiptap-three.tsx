"use client";

import * as React from "react";

import type { Content, Editor } from "@tiptap/react";
import type { UseMinimalTiptapEditorProps } from "@/components/modules/minimal-tiptap/hooks/use-minimal-tiptap";
import { EditorContent } from "@tiptap/react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { SectionOne } from "@/components/modules/minimal-tiptap/components/section/one";
import { SectionTwo } from "@/components/modules/minimal-tiptap/components/section/two";
import { SectionThree } from "@/components/modules/minimal-tiptap/components/section/three";
import { SectionFour } from "@/components/modules/minimal-tiptap/components/section/four";
import { SectionFive } from "@/components/modules/minimal-tiptap/components/section/five";
import { LinkBubbleMenu } from "@/components/modules/minimal-tiptap/components/bubble-menu/link-bubble-menu";
import { useMinimalTiptapEditor } from "@/components/modules/minimal-tiptap/hooks/use-minimal-tiptap";
import { MeasuredContainer } from "./components/measured-container";
import SkeletonTextEditor from "@/components/shared/SkeletonTextEditor";
import { AlignButtons } from "./components/section/editor";

export interface MinimalTiptapProps
  extends Omit<UseMinimalTiptapEditorProps, "onUpdate"> {
  value?: Content;
  onChange?: (value: Content) => void;
  className?: string;
  editorContentClassName?: string;
}

const Toolbar = ({ editor }: { editor: Editor }) => (
  <div className="shrink-0 overflow-x-auto border-b border-border p-2">
    <div className="flex flex-wrap w-max items-center gap-px">
      <SectionOne editor={editor} activeLevels={[1, 2, 3]} variant="outline" />

      <Separator orientation="vertical" className="mx-2 h-7" />
      <AlignButtons editor={editor} />

      <SectionTwo
        editor={editor}
        activeActions={[
          "italic",
          "bold",
          "underline",
          "code",
          "strikethrough",
          "clearFormatting",
        ]}
        mainActionCount={5}
        variant="outline"
      />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionThree editor={editor} variant="outline" />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionFour
        editor={editor}
        activeActions={["bulletList", "orderedList"]}
        mainActionCount={2}
        variant="outline"
      />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionFive
        editor={editor}
        activeActions={["blockquote", "codeBlock", "horizontalRule"]}
        mainActionCount={3}
        variant="outline"
      />
    </div>
  </div>
);

export const MinimalTiptapThree = React.forwardRef<
  HTMLDivElement,
  MinimalTiptapProps
>(({ value, onChange, className, editorContentClassName, ...props }, ref) => {
  const editor = useMinimalTiptapEditor({
    value,
    onUpdate: onChange,
    ...props,
  });

  if (!editor) {
    return <SkeletonTextEditor />;
  }

  return (
    <MeasuredContainer
      as="div"
      name="editor"
      ref={ref}
      className={cn(
        "flex h-auto min-h-72 w-full flex-col rounded-md border border-input shadow-xs focus-within:ring-ring/50  p-4 focus-visible:border-ring focus-visible:ring-ring/50 focus-within:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
        className
      )}
    >
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        className={cn("minimal-tiptap-editor", editorContentClassName)}
      />
      <LinkBubbleMenu editor={editor} />
    </MeasuredContainer>
  );
});

MinimalTiptapThree.displayName = "MinimalTiptapThree";

export default MinimalTiptapThree;
