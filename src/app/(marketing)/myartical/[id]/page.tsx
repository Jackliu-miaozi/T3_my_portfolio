import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { api, HydrateClient } from "@/trpc/server";
import { Button } from "@/app/_components/ui/button";
import { type Metadata, type ResolvingMetadata } from "next";

// 动态生成metadata
export async function generateMetadata(
  { params }: { params: { id: string } },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    // 获取文章详情
    const article = await api.artical.getById({ id: params.id });
    
    // 如果文章不存在，返回默认metadata
    if (!article) {
      return {
        title: "文章不存在 | Jack's 主页",
        description: "抱歉，您请求的文章不存在。",
      };
    }
    
    // 使用文章信息生成metadata
    return {
      title: `${article.title} | Jack's 主页`,
      description: article.summary ?? "阅读Jack的文章",
      keywords: article.category ? [article.category, "文章", "博客"] : ["文章", "博客"],
      openGraph: {
        title: `${article.title} | Jack's 主页`,
        description: article.summary ?? "阅读Jack的文章",
        url: `https://jackliu.com/myartical/${params.id}`,
        images: article.image ? [
          {
            url: article.image,
            width: 1200,
            height: 630,
            alt: article.title ?? "文章封面",
          }
        ] : undefined,
        locale: "zh_CN",
        type: "article",
        publishedTime: article.createdAt.toISOString(),
        tags: article.category ? [article.category] : undefined,
      },
    };
  } catch (error) {
    console.error("生成文章metadata失败:", error);
    return {
      title: "文章 | Jack's 主页",
      description: "阅读Jack的文章",
    };
  }
}

export default async function ArticleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    // 获取文章详情
    const article = await api.artical.getById({ id: params.id });

    // 如果文章不存在，返回404
    if (!article) {
      return notFound();
    }

    // 格式化日期
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
    };

    return (
      <HydrateClient>
        <div className="container mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-12">
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
          <div className="mb-8">
            <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              {article.title}
            </h1>
            <div className="text-muted-foreground flex items-center space-x-4">
              <time dateTime={article.createdAt.toString()}>
                {formatDate(article.createdAt.toString())}
              </time>
              {article.category && (
                <div className="bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-xs font-medium">
                  {article.category}
                </div>
              )}
            </div>
          </div>

          {/* 文章封面图
          {article.image && (
            <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-lg">
              <Image
                src={article.image}
                alt={article.title ?? "文章封面"}
                fill={true}
                className="object-cover"
                priority
              />
            </div>
          )} */}

          {/* 文章内容 */}
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {/* 如果内容是HTML格式，可以使用dangerouslySetInnerHTML */}
            {article.content ? (
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            ) : (
              <p>{article.summary}</p>
            )}
          </div>
        </div>
      </HydrateClient>
    );
  } catch (error) {
    console.error("获取文章详情失败:", error);
    return notFound();
  }
}
