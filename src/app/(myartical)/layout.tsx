import "@/styles/globals.css";

import { type Metadata } from "next";
import { ThemeScript } from "../_components/theme-script";

import { HeaderMobile } from "@/components/header-mobile";
import { Header } from "@/app/_components/header";

export const metadata: Metadata = {
  title: "我的文章 | Jack's 主页",
  description: "浏览Jack的技术文章、学习笔记和行业见解。",
  keywords: ["技术文章", "学习笔记", "编程教程", "行业见解"],
  openGraph: {
    title: "我的文章 | Jack's 主页",
    description: "浏览Jack的技术文章、学习笔记和行业见解。",
    url: "https://www.jackliu.asia",
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: "/public/avatar.png",
      },
    ],
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};



export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeScript />
      <Header />
      <div className="block md:hidden">
        <HeaderMobile />
      </div>
      {children}

    </html>
  );
}
