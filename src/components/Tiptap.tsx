"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text],
    content: "<p>Example Text</p>",
    autofocus: true,
    editable: true,
    injectCSS: false,
  });

  return (
    <div className="element">
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
