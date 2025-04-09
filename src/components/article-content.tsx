"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';


interface ArticleContentProps {
  content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  return (
    <article
      className={cn(
        "prose prose-lg prose-gray dark:prose-invert max-w-none",
        "px-4 md:px-8  lg:px-10",
        "prose-headings:font-semibold prose-headings:text-foreground prose-headings:scroll-mt-20",
        "prose-p:text-foreground/80 prose-p:leading-relaxed",
        "prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline",
        "prose-strong:text-foreground prose-em:text-foreground/90",
        // 修改代码相关样式
        "prose-code:text-foreground prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:w-full",
        "prose-pre:bg-[#2d2d2d] prose-pre:text-foreground/90 prose-pre:p-4 prose-pre:rounded-md prose-pre:overflow-x-auto prose-pre:whitespace-pre-wrap prose-pre:w-full",
        "prose-blockquote:border-l-4 prose-blockquote:border-primary/50 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground",
        "prose-img:rounded-md prose-img:shadow-sm prose-img:mx-auto",
        "prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6",
        "prose-li:my-1",
        "prose-table:border-collapse prose-table:w-full",
        "prose-th:border prose-th:border-border/50 prose-th:p-2 prose-th:bg-muted/30",
        "prose-td:border prose-td:border-border/50 prose-td:p-2",
        "prose-hr:border-border/30 prose-hr:my-8",
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}