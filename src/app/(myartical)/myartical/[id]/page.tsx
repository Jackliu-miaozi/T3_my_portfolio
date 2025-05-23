// src/app/myartical/[id]/page.tsx
"use cache";

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/server/db";
import { myartical } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import DOMPurify from "isomorphic-dompurify";

import { Button } from "@/app/_components/ui/button";
import { CopyLinkButton } from "@/app/_components/copy-link-button";
import { AnimatedSection } from "@/app/_components/animated-section";

import { Footer } from "@/app/_components/footer";

import '@wangeditor/editor/dist/css/style.css';
import { ArticleContent } from "@/components/article-content";
import LikeButton from "@/components/like-button";
import ViewCounter from "@/components/view-counter"; // 导入阅读量计数器组件


// --- Metadata Generation (No changes needed) ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const article = await getArticle(resolvedParams.id);

  if (!article) {
    return {
      title: "文章不存在",
      description: "找不到请求的文章",
    };
  }

  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title!,
      description: article.summary!,
      images: article.image ? [article.image] : [],
    },
  };
}

// --- Data Fetching (No changes needed) ---
async function getArticle(id: string) {
  try {
    const article = await db.query.myartical.findFirst({
      where: eq(myartical.id, Number.parseInt(id)),
    });
    return article;
  } catch (error) {
    console.error("获取文章失败:", error);
    return null;
  }
}

// --- Article Page Component (Refactored) ---
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const article = await getArticle(resolvedParams.id);

  if (!article) {
    notFound();
  }

  // --- Sanitization with enhanced configuration ---
  const sanitizedContent = DOMPurify.sanitize(article.content!, {
    ALLOWED_TAGS: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "br",
      "strong",
      "em",
      "b",
      "i",
      "ul",
      "ol",
      "li",
      "code",
      "pre",
      "blockquote",
      "a",
      "img",
      "div",
      "span",
      "figure",
      "figcaption",
      "table",
      "tr",
      "td",
      "th",
      "thead",
      "tbody",
      "mark",
      "hr",
      "sup",
      "sub",
      "dl",
      "dt",
      "dd",
    ],
    ALLOWED_ATTR: [
      "href",
      "src",
      "alt",
      "title",
      "class",
      "target",
      "rel",
      "style",
      "width",
      "height",
      "colspan",
      "rowspan",
      "id",
      "name",
      "align",
      "valign",
      "border",
      "cellpadding",
      "cellspacing",
    ],
    FORBID_TAGS: ["script", "iframe", "form", "object", "embed"], // Allow style for custom formatting
    ADD_ATTR: ['target="_blank"', 'rel="noopener noreferrer"'],
    USE_PROFILES: { html: true }, // Use standard HTML profile for better compatibility
  });

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-950">
      {" "}
      {/* Added base background */}
      {/* === Hero Section (Largely Unchanged) === */}
      <header className="relative h-[60vh] w-full overflow-hidden">
        {article.image && (
          <Image
            src={article.image}
            alt={article.title!}
            fill
            className="object-cover"
            priority // Keep priority for LCP
          />
        )}
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80"
          aria-hidden="true"
        />

        {/* Content within Hero */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container mx-auto max-w-4xl px-4 pb-12 md:pb-16">
            {/* Back Button */}

              <Link href="/myartical" className="mb-4 inline-block">
                <Button
                  variant="outline"
                  size="sm" // Slightly smaller button might look cleaner
                  className="flex items-center gap-1.5 border-white/50 bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  返回列表
                </Button>
              </Link>
              <h1 className="mb-3 text-3xl leading-tight font-extrabold text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/80">
                <div className="flex items-center gap-1.5">
                  {/* Optional: Add an icon e.g., <User className="h-4 w-4" /> */}
                  <span>作者: {article.createdBy ?? "未知"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {/* Optional: Add an icon e.g., <Calendar className="h-4 w-4" /> */}
                  <time dateTime={new Date(article.createdAt).toISOString()}>
                    {format(new Date(article.createdAt), "yyyy年MM月dd日", {})}
                  </time>
                </div>
                <div className="flex items-center gap-1.5">
                  {/* 添加阅读量计数器 */}
                  <ViewCounter articleId={resolvedParams.id} />
                </div>
                {article.category && ( // Only show if category exists
                  <div className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
                    {article.category}
                  </div>
                )}
              </div>

          </div>
        </div>
      </header>
      {/* === Main Content Area (Refactored Design) === */}
      <div className="relative z-10 -mt-10 md:-mt-16">
        {" "}
        {/* Adjust overlap amount */}
        <div className="container mx-auto max-w-4xl px-4">
          {/* The main content card */}
          <main className="bg-background border-border/10 overflow-hidden rounded-lg border shadow-xl">
            {" "}
            {/* Use theme background, add shadow/border */}
            {/* Optional: Article Summary inside the card */}
            {article.summary && (

                <div className="border-border/10 bg-muted/30 rounded-lg border-b p-6 shadow-sm transition-shadow hover:shadow-lg md:p-8">
                  {" "}
                  {/* Subtle background, padding, border bottom */}
                  <p className="text-muted-foreground text-base leading-relaxed font-medium italic md:text-lg">
                    {/* Optional: Add quote icon or style as blockquote */}
                    &ldquo;{article.summary}&rdquo;
                  </p>
                </div>

            )}
            {/* Article Body */}

              <ArticleContent content={sanitizedContent} />

            {/* Share Section */}

              <aside className="border-border/10 border-t px-6 -mt-8 pb-8 md:px-8 lg:px-10">
                {" "}
                {/* Use aside, add padding, border top */}
                <div className="flex items-center justify-between mt-10 mb-2">
                  <LikeButton articleId={resolvedParams.id} />
                  <div className="flex items-center gap-4">
                    <ViewCounter articleId={resolvedParams.id} />
                  </div>
                </div>
                {/* <div className="border-t my-4"></div> */}
                <div>
                  {/* <h2 className="text-foreground my-4 text-xl font-semibold">
                    分享这篇文章
                  </h2> */}
                  <div className="flex items-center gap-3">
                    <CopyLinkButton />
                    {/* Add more share buttons here if needed */}
                    {/* Example: <Button variant="outline">分享到 X</Button> */}
                  </div>
                </div>
              </aside>

          </main>
        </div>
      </div>
      {/* Add some space at the bottom */}
      {/* === Footer Message & Quote === */}
      <footer className="container mx-auto max-w-3xl px-4 py-16 text-center md:py-24">
        {" "}
        {/* Centered container */}
        <p className="text-muted-foreground mb-8 text-base md:text-lg">
          Thank you for taking the time to read this article.
        </p>
        <blockquote className="relative mx-auto max-w-2xl">
          {/* Optional decorative quotes */}
          <span
            className="text-muted/20 absolute -top-2 -left-4 font-serif text-6xl opacity-50"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <p className="text-foreground/80 mb-3 text-lg leading-relaxed italic md:text-xl">
            Hope is like a path in the countryside: originally there was no
            path, but once people begin to pass, a way appears.
            {/* 希望本是无所谓有，无所谓无的。这正如地上的路；其实地上本没有路，走的人多了，也便成了路。 */}
          </p>
          <span
            className="text-muted/20 absolute -right-4 -bottom-6 font-serif text-6xl opacity-50"
            aria-hidden="true"
          >
            &rdquo;
          </span>
          <cite className="text-muted-foreground mt-4 block text-sm not-italic">
            — Lu Xun (鲁迅)
          </cite>
        </blockquote>
      </footer>
      <Footer />
    </div>
  );
}
