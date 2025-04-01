import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from 'lucide-react';
import { api } from "@/trpc/server";
import { Button } from "@/app/_components/ui/button";

// Define article type interface
interface Article {
  id: string;
  title: string | null;
  category: string | null;
  summary: string | null;
  content: string | null;
  image: string | null;
  name: string | null;
  createdBy: string | null;
  createdAt: Date;
}

// Format date function
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

// Use the exact same interface structure as your original code
interface ArticleDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  try {
    // Get article details
    const article = await api.artical.getById({ id: params.id });

    // If article doesn't exist, return 404
    if (!article) {
      return notFound();
    }

    return (
      <div className="container mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-12">
        {/* Back button */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/myartical" className="flex items-center">
              <ChevronLeft className="mr-2 h-4 w-4" />
              返回文章列表
            </Link>
          </Button>
        </div>

        {/* Article title and metadata */}
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            {article.title}
          </h1>
          <div className="flex items-center space-x-4 text-muted-foreground">
            <time dateTime={article.createdAt.toISOString()}>
              {formatDate(article.createdAt)}
            </time>
            {article.category && (
              <div className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {article.category}
              </div>
            )}
          </div>
        </div>

        {/* Article content */}
        <div className="prose prose-slate max-w-none dark:prose-invert">
          {article.content ? (
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          ) : (
            <p>{article.summary ?? ""}</p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("获取文章详情失败:", error);
    return notFound();
  }
}