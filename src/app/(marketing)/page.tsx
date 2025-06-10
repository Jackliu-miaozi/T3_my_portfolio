"use cache";
import { HeroSection } from "@/app/_components/hero-section";

export default async function Home() {
  // 预加载文章列表数据

  return (
    <div className="bg-background">
      <meta property="og:image" content="<generated>" />
      <meta property="og:image:type" content="<generated>" />
      <meta property="og:image:width" content="<generated>" />
      <meta property="og:image:height" content="<generated>" />
      <HeroSection />
    </div>
  );
}
