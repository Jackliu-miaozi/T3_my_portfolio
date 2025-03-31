import { HeroSection } from "@/app/_components/hero-section";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Jack's 主页 | 个人网站",
  description: "欢迎来到Jack的个人网站，这里有我的项目、文章和个人介绍。",
  keywords: ["个人网站", "开发者", "技术博客", "项目展示"],
  openGraph: {
    title: "Jack's 主页 | 个人网站",
    description: "欢迎来到Jack的个人网站，这里有我的项目、文章和个人介绍。",
    url: "https://jackliu.com",
    siteName: "Jack's 主页",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jack's 主页",
      },
    ],
    locale: "zh_CN",
    type: "website",
  },

  // 这是Twitter卡片的元数据配置
  // card: 定义Twitter卡片的显示样式，summary_large_image表示大图预览
  // title: Twitter分享时显示的标题
  // description: Twitter分享时显示的描述
  // images: Twitter分享时显示的图片路径
  twitter: {
    card: "summary_large_image",
    title: "Jack's 主页 | 个人网站",
    description: "欢迎来到Jack的个人网站，这里有我的项目、文章和个人介绍。",
    images: ["/og-image.jpg"],
  },
};

export default async function Home() {
  return (
    <div className="bg-background">
      <HeroSection />
    </div>
  );
}
