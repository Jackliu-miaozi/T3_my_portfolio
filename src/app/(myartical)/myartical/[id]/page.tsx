// src/app/myartical/[id]/page.tsx

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
import { cn } from "@/lib/utils";
import { Footer } from "@/app/_components/footer";

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

  // --- Sanitization (No changes needed, ensure your config is correct) ---
  const sanitizedContent = DOMPurify.sanitize(article.content!, {
    ALLOWED_TAGS: [
      "h1", "h2", "h3", "h4", "h5", "h6", "p", "br", "strong", "em",
      "ul", "ol", "li", "code", "pre", "blockquote", "a", "img", "div", "span",
      // Add any other tags you absolutely need, e.g., 'figure', 'figcaption'
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "target", "rel", "style"], // Be cautious with 'style'
    FORBID_TAGS: ["script", "style", "iframe", "form", "object", "embed"], // Keep forbidding dangerous tags
    ADD_ATTR: ['target="_blank"', 'rel="noopener noreferrer"'], // Good for external links
    // Consider USE_PROFILES: { html: true } for a standard set of safe HTML
  });

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-950"> {/* Added base background */}
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
            <AnimatedSection delay={100}>
              <Link href="/myartical" className="inline-block mb-4">
                <Button
                  variant="outline"
                  size="sm" // Slightly smaller button might look cleaner
                  className="flex items-center gap-1.5 border-white/50 bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  返回列表
                </Button>
              </Link>
            </AnimatedSection>

            {/* Title */}
            <AnimatedSection delay={200}>
              <h1 className="mb-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {article.title}
              </h1>
            </AnimatedSection>

            {/* Metadata */}
            <AnimatedSection delay={300}>
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
                 {article.category && ( // Only show if category exists
                    <div className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
                    {article.category}
                    </div>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </header>

      {/* === Main Content Area (Refactored Design) === */}
      <div className="relative z-10 -mt-10 md:-mt-16"> {/* Adjust overlap amount */}
        <div className="container mx-auto max-w-4xl px-4">
          {/* The main content card */}
          <main className="bg-background shadow-xl rounded-lg overflow-hidden border border-border/10"> {/* Use theme background, add shadow/border */}
             {/* Optional: Article Summary inside the card */}
            {article.summary && (
                <AnimatedSection delay={400}>
                    <div className="border-b border-border/10 bg-muted/30 p-6 md:p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow"> {/* Subtle background, padding, border bottom */}
                        <p className="text-base md:text-lg font-medium text-muted-foreground italic leading-relaxed">
                         {/* Optional: Add quote icon or style as blockquote */}
                        &ldquo;{article.summary}&rdquo;
                        </p>
                    </div>
              </AnimatedSection>
            )}

            {/* Article Body */}
            <AnimatedSection delay={500}>
              <article
                className={cn(
                  // Base Prose styles
                  "prose prose-lg prose-gray dark:prose-invert max-w-none",
                  // Add padding within the article container
                  "px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12",
                  // Headings
                  "prose-headings:font-semibold prose-headings:text-foreground prose-headings:scroll-mt-20", // Adjusted scroll margin top if you have a sticky header
                  // Paragraphs
                  "prose-p:text-foreground/80 prose-p:leading-relaxed",
                  // Links
                  "prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline",
                  // Strong / Emphasis
                  "prose-strong:text-foreground prose-em:text-foreground/90",
                  // Code blocks
                  "prose-code:text-foreground prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded",
                  "prose-pre:bg-muted/70 prose-pre:text-foreground/90 prose-pre:p-4 prose-pre:rounded-md prose-pre:overflow-x-auto", // Ensure code blocks are scrollable
                  // Blockquotes
                  "prose-blockquote:border-l-4 prose-blockquote:border-primary/50 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground",
                  // Images within content
                  "prose-img:rounded-md prose-img:shadow-sm",
                   // Lists
                  "prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6",
                  "prose-li:my-1" // Adjust list item spacing
                )}
                // IMPORTANT: Ensure sanitizedContent is genuinely safe before using dangerouslySetInnerHTML
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              />
            </AnimatedSection>

            {/* Share Section */}
            <AnimatedSection delay={600}>
              <aside className="border-t border-border/10 px-6 py-8 md:px-8 lg:px-10"> {/* Use aside, add padding, border top */}
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  分享这篇文章
                </h2>
                <div className="flex items-center gap-3">
                  <CopyLinkButton />
                  {/* Add more share buttons here if needed */}
                  {/* Example: <Button variant="outline">分享到 X</Button> */}
                </div>
              </aside>
            </AnimatedSection>
          </main>
        </div>
      </div>

      {/* Add some space at the bottom */}
      <div className="h-20 md:h-32" />
      <Footer/>
    </div>
  );
}