import Link from "next/link";
import Image from "next/image";
import { api, HydrateClient } from "@/trpc/server";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/app/_components/ui/card";

export default async function ArticlesPage() {
  // 模拟文章数据
  void api.artical.getAll.prefetch();
  const articles = await api.artical.getAll();

  // 按日期降序排序文章
  articles.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

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
          {articles?.map((article) => (
            <Card key={article.id} className="flex h-full flex-col">
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                <Image
                  src={article.image!}
                  alt={article.title!}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="text-muted-foreground text-sm">
                    {formatDate(article.createdAt.toString())}
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
                  href={"/#"}
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
