import Link from "next/link";
import Image from "next/image";
import { HydrateClient } from "@/trpc/server";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/app/_components/ui/card";

type Article = {
  id: string;
  title: string;
  date: string;
  summary: string;
  link: string;
  category?: string;
  image: string;
};

export default function ArticlesPage() {
  // 模拟文章数据
  const articles: Article[] = [
    {
      id: "1",
      title: "如何优化React应用性能",
      date: "2023-06-15",
      summary:
        "探索提高React应用性能的最佳实践，包括代码分割、懒加载和memo优化。本文将深入分析React性能瓶颈，并提供实用的优化技巧。",
      link: "/myartical/react-performance",
      category: "React",
      image: "/images/articles/article1.jpg",
    },
    {
      id: "2",
      title: "Next.js 13新特性详解",
      date: "2023-05-22",
      summary:
        "深入了解Next.js 13带来的App Router、Server Components和Streaming等革命性变化。这些新特性如何改变我们构建Web应用的方式？",
      link: "/myartical/nextjs-13-features",
      category: "Next.js",
      image: "/images/articles/article2.jpg",
    },
    {
      id: "3",
      title: "现代CSS技巧与最佳实践",
      date: "2023-04-10",
      summary:
        "探讨CSS Grid、Flexbox、CSS变量和媒体查询等现代CSS技术的实际应用。通过实例学习如何创建响应式、灵活的布局。",
      link: "/myartical/modern-css-tips",
      category: "CSS",
      image: "/images/articles/article3.jpg",
    },
    {
      id: "4",
      title: "TypeScript高级类型系统详解",
      date: "2023-03-18",
      summary:
        "深入TypeScript的类型系统，包括泛型、条件类型、映射类型和类型推断。掌握这些高级特性，让你的代码更加健壮。",
      link: "/myartical/typescript-advanced-types",
      category: "TypeScript",
      image: "/images/articles/article4.jpg",
    },
    {
      id: "5",
      title: "Web性能优化全指南",
      date: "2023-02-05",
      summary:
        "从网络、渲染、资源加载到代码执行，全方位解析Web性能优化策略。学习如何使用现代工具分析和提升网站性能。",
      link: "/myartical/web-performance-guide",
      category: "性能优化",
      image: "/images/articles/article5.jpg",
    },
    {
      id: "6",
      title: "React Server Components实战",
      date: "2023-01-12",
      summary:
        "React Server Components如何改变前端开发模式？本文通过实际案例，展示RSC的优势、使用场景和最佳实践。",
      link: "/myartical/react-server-components",
      category: "React",
      image: "/images/articles/article6.jpg",
    },
  ];

  // 格式化日期函数
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
      <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              我的文章
            </h1>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              分享我的技术心得、学习笔记和行业见解
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Card key={article.id} className="flex h-full flex-col">
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="text-muted-foreground text-sm">
                    {formatDate(article.date)}
                  </div>
                  {article.category && (
                    <div className="bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-xs font-medium">
                      {article.category}
                    </div>
                  )}
                </div>
                <CardTitle className="mt-2 text-xl">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3">
                  {article.summary}
                </CardDescription>
              </CardContent>
              <CardFooter className="mt-auto">
                <Link
                  href={article.link}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  阅读更多 →
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </HydrateClient>
  );
}
