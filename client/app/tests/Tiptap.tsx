"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Blockquote from "@tiptap/extension-blockquote";
import React from "react";
import { Button } from "@/components/ui/button";
import ListItem from "@tiptap/extension-list-item";
import { BoldIcon, Code, LayoutTemplate, List } from "lucide-react";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlock from "@tiptap/extension-code-block";
import Bold from "@tiptap/extension-bold";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { all, createLowlight } from "lowlight";

const lowlight = createLowlight(all);

// This is only an example, all supported languages are already loaded above
// but you can also register only specific languages to reduce bundle-size
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Blockquote,
      BulletList,
      ListItem,
      CodeBlock,
      CodeBlock.configure({
        languageClassPrefix: "language-javascript",
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Bold,
    ],
    content: `
      <blockquote>
        Nothing is impossible, the word itself says “I’m possible!”
      </blockquote>
      <p>Audrey Hepburn</p>
      <ul>
          <li>A list item</li>
          <li>And another one</li>
        </ul>
    `,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="p-6 ">
      <div className="control-group">
        <div className="flex gap-2">
          <Button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "text-blue-500" : ""}
            variant={"tiptap"}
            size={"icon"}
          >
            <LayoutTemplate />
          </Button>

          <Button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "text-blue-500" : ""}
            variant={"tiptap"}
            size={"icon"}
          >
            <List />
          </Button>

          <Button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive("codeBlock") ? "text-blue-500" : ""}
            variant={"tiptap"}
            size={"icon"}
          >
            <Code />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "text-blue-500" : ""}
            variant={"tiptap"}
            size={"icon"}
          >
            <BoldIcon />
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <EditorContent editor={editor} className="focus-within:border-none" />
      </div>
    </div>
  );
};

export default Tiptap;
