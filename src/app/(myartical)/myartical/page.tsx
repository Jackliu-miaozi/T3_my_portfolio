// 在文件顶部添加
import { type Metadata } from "next";
import { api } from "@/trpc/server";
import { Header } from "@/app/_components/header";
import { Footer } from "@/app/_components/footer";
import { cache, Suspense } from "react";

// 添加导入
import { ArticlesSkeleton } from "../../../components/articles-skeleton";
import { ArticleHeader, ArticleCards } from "@/components/article-list";

export const metadata: Metadata = {
  title: "我的文章 | Jack's 主页",
  description: "浏览Jack的技术文章、学习笔记和行业见解。",
  keywords: ["技术文章", "学习笔记", "编程教程", "行业见解"],
  openGraph: {
    title: "我的文章 | Jack's 主页",
    description: "浏览Jack的技术文章、学习笔记和行业见解。",
    url: "https://jackliu.com/myartical",
    locale: "zh_CN",
    type: "website",
  },
};

// 添加预缓存配置
export const revalidate = 3600; // 1小时后重新验证缓存

// 将数据获取逻辑封装到一个缓存函数中
// 修改数据获取函数，使用 cache 包装以提高性能
const getArticles = cache(async () => {
  const articles = await api.artical.getAll();
  return articles.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
});

// 创建一个异步组件来处理文章加载
async function ArticleCardsWrapper({
  formatDate,
}: {
  formatDate: (dateString: string) => string;
}) {
  // 这里的 await 会自动触发 Suspense
  const articles = await getArticles();

  return <ArticleCards articles={articles} formatDate={formatDate} />;
}

export default async function ArticlesPage() {
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
    <div>
      <Header />
      <div className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12">
        <ArticleHeader />
        <Suspense fallback={<ArticlesSkeleton />}>
          <ArticleCardsWrapper formatDate={formatDate} />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
