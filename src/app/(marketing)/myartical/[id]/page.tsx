import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { api } from "@/trpc/server";
import { Button } from "@/app/_components/ui/button";
import { type Metadata, type ResolvingMetadata } from "next";

// 动态生成 metadata
export async function generateMetadata(
  { params }: { params: { id: string } },
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  try {
    const article = await api.artical.getById({ id: params.id });
    if (!article) {
      return {
        title: "文章不存在 | Jack's 主页",
        description: "抱歉，您请求的文章不存在。",
      };
    }

    return {
      title: `${article.title} | Jack's 主页`,
      description: article.summary ?? "阅读Jack的文章",
      openGraph: {
        title: `${article.title} | Jack's 主页`,
        description: article.summary ?? "阅读Jack的文章",
        type: "article",
      },
    };
  } catch (error) {
    return {
      title: "文章 | Jack's 主页",
      description: "阅读Jack的文章",
    };
  }
}

// 删除这个类型定义
// type SearchParams = Record<string, string | string[] | undefined>;

interface PageProps {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function ArticlePage({
  params,
}: PageProps) {  // 移除 searchParams 参数，因为我们没有使用它
  try {
    const article = await api.artical.getById({ id: params.id });
    // 删除这行，因为我们不需要它
    // const resolvedSearchParams = await searchParams;
    
    if (!article) {
      return notFound();
    }

    const formatDate = (date: Date) => {
      return new Intl.DateTimeFormat("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
    };

    return (
      <article className="container mx-auto max-w-4xl px-4 py-8">
        {/* 返回按钮 */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/myartical" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              返回文章列表
            </Link>
          </Button>
        </div>

        {/* 文章标题和元信息 */}
        <header className="mb-8">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <time dateTime={article.createdAt.toISOString()}>
              {formatDate(article.createdAt)}
            </time>
            {article.category && (
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                {article.category}
              </span>
            )}
          </div>
        </header>

        {/* 文章封面图 */}
        {article.image && (
          <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={article.image}
              alt={article.title!}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* 文章内容 */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {article.content ? (
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          ) : (
            <p>{article.summary}</p>
          )}
        </div>
      </article>
    );
  } catch (error) {
    return notFound();
  }
}
