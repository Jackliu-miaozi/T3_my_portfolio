'use cache'
import { HeroSection } from "@/app/_components/hero-section";

export default async function Home() {
  // 预加载文章列表数据

  return (
    <div className="bg-background">
      <HeroSection />
    </div>
  );
}
