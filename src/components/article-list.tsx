
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/app/_components/ui/card";
import { AnimatedSection } from "@/app/_components/animated-section";

// 定义文章类型
type Article = {
  id: number;
  title: string | null;
  summary: string | null;
  image: string | null;
  category?: string | null;
  createdAt: Date;
};

// 定义组件props
interface ArticleListProps {
  articles: Article[];
  formatDate: (dateString: string) => string;
}

// 修改 ArticleList 组件，将标题部分和卡片列表部分分开
export function ArticleList({ articles, formatDate }: ArticleListProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12">
      <ArticleHeader />
      <ArticleCards articles={articles} formatDate={formatDate} />
    </div>
  );
}

// 新增标题组件
export function ArticleHeader() {
  return (
    <div className="flex flex-col items-center space-y-4 text-center">
      <AnimatedSection>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            我的博客
          </h1>
          <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            分享我的技术心得、学习笔记和行业见解
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}

// 新增卡片列表组件
export function ArticleCards({ articles, formatDate }: ArticleListProps) {
  return (
    <AnimatedSection delay={200}>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles?.map((article, index) => (
          <AnimatedSection key={article.id} delay={(index + 1) * 100}>
            <Card
              key={article.id}
              className="flex flex-col overflow-hidden pt-0 pb-6"
            >
              {/* 卡片内容保持不变 */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={article.image!}
                  alt={article.title!}
                  fill={true}
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
                <CardTitle className="mt-2 text-xl">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3">
                  {article.summary}
                </CardDescription>
              </CardContent>
              <CardFooter className="mt-auto">
                <Link
                  href={`/myartical/${article.id}`}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  阅读更多 →
                </Link>
              </CardFooter>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </AnimatedSection>
  );
}